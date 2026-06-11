from sqlalchemy import Column, Integer, String, Boolean, DateTime, func

from app.database import Base


class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(String(50), unique=True, index=True)
    theme = Column(String(20), default="system")  # 'light', 'dark', 'system'
    font_size = Column(String(20), default="Medium (Default)")
    dashboard_density = Column(String(20), default="Comfortable")
    language = Column(String(50), default="English (US)")
    region = Column(String(50), default="India")
    timezone = Column(String(50), default="(UTC+05:30) IST")
    weather_alerts = Column(Boolean, default=True)
    disease_alerts = Column(Boolean, default=True)
    market_alerts = Column(Boolean, default=True)
    export_preference = Column(String(100), default="Monthly Detailed Report")
    download_format = Column(String(20), default="PDF")
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
