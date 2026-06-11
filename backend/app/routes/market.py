from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.market import MarketPriceResponse
from app.services.market_service import get_latest_market_prices

router = APIRouter(prefix="/market", tags=["Market Intelligence"])


@router.get("/prices", response_model=List[MarketPriceResponse])
def get_prices(db: Session = Depends(get_db)):
    prices = get_latest_market_prices(db)
    return prices
