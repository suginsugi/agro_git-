import httpx
from datetime import datetime, timedelta
import json
from sqlalchemy.orm import Session

from app.models.weather_cache import WeatherCache
from app.core.config import get_settings

settings = get_settings()

async def get_weather_data(db: Session, lat: float, lon: float, location_name: str):
    """
    Fetches weather data from Open-Meteo, using DB cache to avoid rate limits.
    Cache TTL is 10 minutes.
    """
    # Check cache first
    cache_entry = db.query(WeatherCache).filter(
        WeatherCache.latitude == lat,
        WeatherCache.longitude == lon
    ).first()

    now = datetime.utcnow()
    
    # If cache exists and is fresh (less than 10 mins old)
    if cache_entry and cache_entry.fetched_at > now - timedelta(minutes=10):
        return {
            "current": cache_entry.data,
            "forecast": cache_entry.forecast_data,
            "location": cache_entry.location,
            "cached": True
        }

    # Otherwise fetch from API
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            
            # Update or create cache entry
            if cache_entry:
                cache_entry.data = data.get("current_weather", {})
                cache_entry.forecast_data = {"hourly": data.get("hourly", {}), "daily": data.get("daily", {})}
                cache_entry.fetched_at = now
                cache_entry.location = location_name
            else:
                cache_entry = WeatherCache(
                    latitude=lat,
                    longitude=lon,
                    location=location_name,
                    data=data.get("current_weather", {}),
                    forecast_data={"hourly": data.get("hourly", {}), "daily": data.get("daily", {})},
                )
                db.add(cache_entry)
            
            db.commit()
            
            return {
                "current": cache_entry.data,
                "forecast": cache_entry.forecast_data,
                "location": cache_entry.location,
                "cached": False
            }
            
        except Exception as e:
            # If API fails but we have stale cache, return stale cache
            if cache_entry:
                return {
                    "current": cache_entry.data,
                    "forecast": cache_entry.forecast_data,
                    "location": cache_entry.location,
                    "cached": True,
                    "stale": True
                }
            # Otherwise re-raise
            raise e
