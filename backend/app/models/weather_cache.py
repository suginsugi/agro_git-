from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, func

from app.database import Base


class WeatherCache(Base):
    __tablename__ = "weather_cache"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(200))
    latitude = Column(Float)
    longitude = Column(Float)
    data = Column(JSON)
    forecast_data = Column(JSON)
    fetched_at = Column(DateTime(timezone=True), server_default=func.now())
