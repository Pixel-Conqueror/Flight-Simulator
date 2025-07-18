# Flight-Simulator

This repository contains a basic architecture for a web application composed of a FastAPI backend, a placeholder for a Vite frontend, and auxiliary services managed through Docker Compose.

## Structure

- `backend/` – FastAPI application and Celery worker.
- `frontend/` – placeholder for a Vite based frontend (only the Dockerfile is provided).
- `docker-compose.yml` – orchestrates all services: backend, worker, frontend, Redis, MongoDB and Flower.
- `.env` – environment variables consumed by `docker-compose`.

Build and run all services with:

```bash
docker-compose up --build
```

