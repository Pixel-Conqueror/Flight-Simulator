from fastapi import HTTPException
from bson import ObjectId  # type: ignore
from .. import db

PAGE_SIZE = 100

async def collection_state_liste(collection: str):
    collection = collection.lower()
    if collection == "live_state":
        cursor = db["LIVE_STATES"].find({}, {"_id": 0, "icao24": 1})
        return [doc.get("icao24") for doc in cursor]
    elif collection == "historical_state":
        return db["HISTORICAL_STATES"].distinct("icao24")
    elif collection == "flights_meta":
        cursor = db["FLIGHTS_META"].find({}, {"_id": 1})
        return [doc.get("_id") for doc in cursor]
    else:
        raise HTTPException(status_code=400, detail="Invalid collection")

async def live_state_index(icao24: str | None, page: int = 1):
    if icao24:
        doc = db["LIVE_STATES"].find_one({"icao24": icao24})
        if not doc:
            raise HTTPException(status_code=404, detail="icao24 not found")
        if "_id" in doc and isinstance(doc["_id"], ObjectId):
            doc["_id"] = str(doc["_id"])
        return doc
    skip = (page - 1) * PAGE_SIZE
    cursor = (
        db["LIVE_STATES"].find().skip(skip).limit(PAGE_SIZE)
    )
    docs = []
    for d in cursor:
        if "_id" in d and isinstance(d["_id"], ObjectId):
            d["_id"] = str(d["_id"])
        docs.append(d)
    return docs

async def historical_state_index(icao24: str | None, page: int = 1):
    query = {"icao24": icao24} if icao24 else {}
    skip = (page - 1) * PAGE_SIZE
    cursor = (
        db["HISTORICAL_STATES"].find(query)
        .sort("request_time", -1)
        .skip(skip)
        .limit(PAGE_SIZE)
    )
    docs = []
    for d in cursor:
        if "_id" in d and isinstance(d["_id"], ObjectId):
            d["_id"] = str(d["_id"])
        docs.append(d)
    return docs

async def flights_meta_index(icao24: str | None, page: int = 1):
    if icao24:
        doc = db["FLIGHTS_META"].find_one({"_id": icao24})
        if not doc:
            raise HTTPException(status_code=404, detail="icao24 not found")
        if "_id" in doc and isinstance(doc["_id"], ObjectId):
            doc["_id"] = str(doc["_id"])
        return doc
    skip = (page - 1) * PAGE_SIZE
    cursor = db["FLIGHTS_META"].find().skip(skip).limit(PAGE_SIZE)
    docs = []
    for d in cursor:
        if "_id" in d and isinstance(d["_id"], ObjectId):
            d["_id"] = str(d["_id"])
        docs.append(d)
    return docs
