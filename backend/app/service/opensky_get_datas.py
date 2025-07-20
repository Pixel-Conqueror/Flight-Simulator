from concurrent.futures import ThreadPoolExecutor
from .. import db, logger
import httpx  # type: ignore

OPENSKY_STATES_URL = "https://opensky-network.org/api/states/all"


def get_opensky_datas() -> list[dict] | None:
    """Retrieve current flight states from OpenSky and return cleaned list."""
    token_doc = db["TOKENS"].find_one({"name": "opensky_token"})
    token = token_doc.get("token") if token_doc else None
    if not token:
        logger.error("No OpenSky token available in database")
        return None

    headers = {"Authorization": f"Bearer {token}"}
    params = {"lamin": 41.0, "lomin": -5.0, "lamax": 51.5, "lomax": 10.0}

    try:
        resp = httpx.get(OPENSKY_STATES_URL, headers=headers, params=params)
        resp.raise_for_status()
        data = resp.json()
    except Exception as exc:
        logger.error(f"Failed to fetch OpenSky data: {exc}")
        return None

    request_time = data.get("time")
    states = data.get("states", [])

    keys = [
        "icao24",
        "callsign",
        "origin_country",
        "time_position",
        "last_contact",
        "longitude",
        "latitude",
        "baro_altitude",
        "on_ground",
        "velocity",
        "heading",
        "vertical_rate",
        "sensors",
        "geo_altitude",
        "squawk",
        "spi",
        "position_source",
    ]

    def process(state: list) -> dict:
        entry = dict(zip(keys, state))
        entry["request_time"] = request_time
        return entry

    with ThreadPoolExecutor() as executor:
        cleaned = list(executor.map(process, states))

    return cleaned
