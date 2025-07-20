from celery import Celery  # type: ignore
from .config import settings

redis_url = settings.redis_url
if not redis_url:
    raise RuntimeError("redis_url is required")

celery = Celery(
    "worker",
    broker=redis_url,
    backend=redis_url,
)

# Indique à Celery de charger les tâches définies dans app.tasks
celery.autodiscover_tasks(["app.tasks"])
