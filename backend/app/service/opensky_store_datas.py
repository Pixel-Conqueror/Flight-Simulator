from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from .. import db


def store_opensky_datas(states: list[dict]) -> None:
    """Persist OpenSky states into MongoDB collections."""
    if not states:
        return

    request_time = states[0].get("request_time")
    threshold = request_time - 300 if request_time else None

    if threshold is not None:
        db["LIVE_STATES"].delete_many({"request_time": {"$lt": threshold}})

    meta_col = db["FLIGHTS_META"]

    iso_time = (
        datetime.utcfromtimestamp(request_time).isoformat() + "Z" if request_time else None
    )

    def persist(state: dict) -> None:
        icao24 = state.get("icao24")
        if not icao24:
            return
        db["LIVE_STATES"].update_one({"icao24": icao24}, {"$set": state}, upsert=True)
        db["HISTORICAL_STATES"].insert_one(state)

        update = {
            "$set": {
                "origin_country": state.get("origin_country"),
                "last_seen": iso_time,
            },
            "$setOnInsert": {
                "first_seen": request_time,
                "callsigns": [],
            },
        }
        callsign = state.get("callsign")
        if callsign:
            update.setdefault("$addToSet", {})["callsigns"] = callsign
            update["$set"]["last_known_callsign"] = callsign
        else:
            update["$set"]["last_known_callsign"] = None

        meta_col.update_one({"_id": icao24}, update, upsert=True)

    with ThreadPoolExecutor() as executor:
        list(executor.map(persist, states))
