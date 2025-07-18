from fastapi import FastAPI
from .tasks import add

app = FastAPI()

@app.get("/")
async def root():
    result = add.delay(1, 2)
    return {"message": "Hello, World!", "task_id": result.id}
