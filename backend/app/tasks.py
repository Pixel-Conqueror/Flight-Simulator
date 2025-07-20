from celery import Celery  # type: ignore
import os

from .service.opensky_get_token import opensky_get_token
from .service.opensky_get_datas import get_opensky_datas
from .service.opensky_store_datas import store_opensky_datas
from . import logger

broker_url = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
backend_url = os.getenv("CELERY_RESULT_BACKEND", broker_url)

celery_app = Celery("worker", broker=broker_url, backend=backend_url)


@celery_app.task(name="opensky_auth")
def opensky_auth():
    """Retrieve and store OpenSky token."""
    try:
        token = opensky_get_token()
        logger.info("opensky_auth task completed")
        return {"token": token}
    except Exception as exc:
        logger.error(f"opensky_auth task failed: {exc}")
        raise


@celery_app.task(name="opensky_datas")
def opensky_datas():
    """Fetch latest OpenSky states and store them in MongoDB."""
    try:
        states = get_opensky_datas()
        if states is not None:
            store_opensky_datas(states)
        logger.info("opensky_datas task completed")
    except Exception as exc:
        logger.error(f"opensky_datas task failed: {exc}")
        raise
