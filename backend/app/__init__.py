from pymongo import MongoClient  # type: ignore
from .celery_app import celery
from .config import settings
import logging

logger = logging.getLogger("flight-simulator")
logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s %(levelname)s — %(message)s")

mongo_client = MongoClient(
    "mongodb://flightsimulator:flightpassword@mongo:27017/flightsimulator?authSource=admin")
db = mongo_client.get_default_database()
logger.info(f"Connected to MongoDB '{db.name}'")
