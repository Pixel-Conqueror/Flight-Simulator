from fastapi import FastAPI  # type: ignore
from pymongo.errors import PyMongoError  # type: ignore
from .tasks import celery_app
from . import db, logger
from .config import settings
import httpx  # type: ignore

app = FastAPI()


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

    # CELERY
    try:
        res = celery_app.control.ping(timeout=3)
        if res:
            status["worker"] = True
    except Exception:
        pass

    return {"ok": all(status.values()), "services": status}
