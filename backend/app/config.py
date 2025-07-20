# backend/app/config.py
from pydantic_settings import BaseSettings  # type: ignore
from pydantic import Field  # type: ignore
import os


class Settings(BaseSettings):
    # MongoDB (initdb et accès application)
    mongo_initdb_root_username: str = Field(...,
                                            env="MONGO_INITDB_ROOT_USERNAME")
    mongo_initdb_root_password: str = Field(...,
                                            env="MONGO_INITDB_ROOT_PASSWORD")
    mongo_initdb_database: str = Field(..., env="MONGO_INITDB_DATABASE")

    mongo_username: str = Field(..., env="MONGO_USERNAME")
    mongo_password: str = Field(..., env="MONGO_PASSWORD")
    mongo_db: str = Field(..., env="MONGO_DB")
    mongo_uri: str = Field(..., env="MONGO_URI")

    # Redis / Celery
    redis_url: str = Field(..., env="REDIS_URL")

    # Flower
    flower_unauthenticated_api: bool = Field(
        True, env="FLOWER_UNAUTHENTICATED_API")
    flower_user: str = Field(..., env="FLOWER_USER")
    flower_password: str = Field(..., env="FLOWER_PASSWORD")

    # Front-end
    vite_api_url: str = Field(..., env="VITE_API_URL")

    # JWT Auth
    jwt_secret: str = Field(..., env="JWT_SECRET")
    jwt_algorithm: str = Field("HS256", env="JWT_ALGORITHM")
    jwt_exp_delta_seconds: int = Field(3600,  env="JWT_EXP_DELTA_SECONDS")

    # OpenSky API
    opensky_client_id: str = Field(..., env="OPENSKY_CLIENT_ID")
    opensky_client_secret: str = Field(..., env="OPENSKY_CLIENT_SECRET")

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


settings = Settings()
