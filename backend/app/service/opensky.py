from ..config import settings
from .. import db, logger
import httpx

OPENSKY_TOKEN_URL = "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token"


def opensky_get_token() -> str | None:
    payload = {
        "grant_type": "client_credentials",
        "client_id": settings.opensky_client_id,
        "client_secret": settings.opensky_client_secret,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    try:
        response = httpx.post(OPENSKY_TOKEN_URL, data=payload, headers=headers)
        response.raise_for_status()
        token = response.json().get("access_token")
        if not token:
            logger.error("No access_token in response from OpenSky")
            return None
        db["TOKENS"].update_one(
            {"name": "opensky_token"},
            {"$set": {"token": token}},
            upsert=True,
        )
        logger.info("OpenSky token stored or updated successfully")
        return token
    except Exception as exc:
        logger.error(f"Failed to retrieve OpenSky token: {exc}")
        raise
