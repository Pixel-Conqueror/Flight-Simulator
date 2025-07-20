from fastapi import FastAPI, HTTPException  # type: ignore
from pymongo.errors import PyMongoError  # type: ignore
from apscheduler.schedulers.asyncio import AsyncIOScheduler  # type: ignore
from .tasks import celery_app, opensky_auth, opensky_datas
from .controller.state_controller import (
    collection_state_liste,
    live_state_index,
    historical_state_index,
    flights_meta_index,
)
from .service.opensky_get_token import opensky_get_token
from . import db, logger
from .config import settings
from fastapi.middleware.cors import CORSMiddleware  # type: ignore

app = FastAPI()
scheduler = AsyncIOScheduler()


@app.on_event("startup")
async def startup_event() -> None:
    try:
        opensky_get_token()
    except Exception as exc:
        logger.error(f"Failed to retrieve OpenSky token on startup: {exc}")

    scheduler.add_job(opensky_auth.delay, "interval", minutes=29)
    scheduler.add_job(opensky_datas.delay, "interval", seconds=70)
    scheduler.start()


@app.on_event("shutdown")
async def shutdown_event() -> None:
    scheduler.shutdown()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello, World!"}


@app.get("/health")
async def health():
    status = {"mongo": False, "worker": False}

    try:
        logger.info("⏳ Attempting MongoDB ping...")
        result = db.command("ping")
        logger.info("✅ MongoDB ping successful")
        status["mongo"] = True
    except PyMongoError as e:
        logger.error(f"❌ PyMongoError during ping: {e}")
    except Exception as e:
        logger.exception("🚨 Unexpected error during Mongo ping")

    try:
        res = celery_app.control.ping(timeout=3)
        if res:
            status["worker"] = True
    except Exception:
        pass

    return {"ok": all(status.values()), "services": status}


@app.get("/api/state_liste")
async def api_state_liste(collection: str):
    return await collection_state_liste(collection)


@app.get("/api/live_state")
async def api_live_state(icao24: str | None = None, page: int = 1):
    return await live_state_index(icao24, page)


@app.get("/api/historical_state")
async def api_historical_state(icao24: str | None = None, page: int = 1):
    return await historical_state_index(icao24, page)


@app.get("/api/flights_meta")
async def api_flights_meta(icao24: str | None = None, page: int = 1):
    return await flights_meta_index(icao24, page)
