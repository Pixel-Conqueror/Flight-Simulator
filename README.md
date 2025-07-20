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

## Backend API

The FastAPI backend exposes several endpoints under `/api`:

| Route | Query Parameters | Description |
|-------|-----------------|-------------|
|`/api/state_liste`|`collection` – one of `live_state`, `historical_state`, `flights_meta`|Returns a list of identifiers for the chosen collection.|
|`/api/live_state`|`icao24` *(optional)*, `page` *(default 1)*|List of current states paginated by 100. If `icao24` is provided, returns the matching document.|
|`/api/historical_state`|`icao24` *(optional)*, `page` *(default 1)*|Historical states sorted by newest first, paginated by 100. When `icao24` is provided only entries for that aircraft are returned.|
|`/api/flights_meta`|`icao24` *(optional)*, `page` *(default 1)*|Metadata about known flights paginated by 100. If `icao24` is provided, the document with that id is returned.|

Interactive documentation is available at `/docs` when the backend is running.

