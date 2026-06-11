from sqlalchemy import Column, Integer, String, Float, DateTime, func

from app.database import Base


class MarketPrice(Base):
    __tablename__ = "market_prices"

    id = Column(Integer, primary_key=True, index=True)
    commodity = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    unit = Column(String(50), default="₹/qtl")
    trend = Column(String(20))  # 'up', 'down', 'stable'
    market = Column(String(200))
    previous_price = Column(Float)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
