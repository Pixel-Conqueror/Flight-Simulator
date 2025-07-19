from fastapi import FastAPI
import os
from pymongo import MongoClient
import httpx
from .tasks import add, celery_app

app = FastAPI()

@app.get("/")
async def root():
    result = add.delay(1, 2)
    return {"message": "Hello, World!", "task_id": result.id}


@app.get("/health")
async def health():
    status = {"flower": False, "mongo": False, "worker": False}

    flower_user = os.getenv("FLOWER_USER")
    flower_password = os.getenv("FLOWER_PASSWORD")
    flower_url = os.getenv("FLOWER_URL", "http://flower:5555/flower/api/workers")

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                flower_url,
                auth=(flower_user, flower_password),
                timeout=3,
            )
            if resp.status_code == 200:
                status["flower"] = True
    except Exception:
        pass

    mongo_uri = os.getenv(
        "MONGO_URI", "mongodb://flightsimulator:flightpassword@mongo:27017"
    )
    try:
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=3000)
        client.admin.command("ping")
        status["mongo"] = True
    except Exception:
        pass
    finally:
        try:
            client.close()
        except Exception:
            pass

    try:
        res = celery_app.control.ping(timeout=3)
        if res:
            status["worker"] = True
    except Exception:
        pass

    return {"ok": all(status.values()), "services": status}
