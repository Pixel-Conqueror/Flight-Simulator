from celery import Celery
import os

from .service.opensky import opensky_get_token
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


celery_app.conf.beat_schedule = {
    "opensky-auth-every-29-minutes": {
        "task": "app.tasks.opensky_auth",
        "schedule": 29 * 60,
    }
}
