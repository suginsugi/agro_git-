from pydantic_settings import BaseSettings
from functools import lru_cache
import os


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/agrovision"
    SECRET_KEY: str = "agrovision-super-secret-key-change-in-production"
    OPENWEATHER_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    UPLOAD_DIR: str = "uploads"
    DEFAULT_LATITUDE: float = 12.9716
    DEFAULT_LONGITUDE: float = 79.9497
    DEFAULT_LOCATION: str = "Sriperumbudur, Tamil Nadu"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    class Config:
        env_file = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env")


@lru_cache()
def get_settings() -> Settings:
    return Settings()
