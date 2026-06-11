from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MarketPriceBase(BaseModel):
    commodity: str
    price: float
    unit: Optional[str] = "₹/qtl"
    trend: Optional[str] = None
    market: Optional[str] = None
    previous_price: Optional[float] = None


class MarketPriceCreate(MarketPriceBase):
    pass


class MarketPriceResponse(MarketPriceBase):
    id: int
    recorded_at: datetime

    class Config:
        from_attributes = True
