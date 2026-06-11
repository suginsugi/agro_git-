from sqlalchemy.orm import Session
from datetime import datetime

from app.models.market_price import MarketPrice

def get_latest_market_prices(db: Session):
    """
    Gets the most recent market prices from the database.
    In a real application, this might fetch from an external API like AGMARKNET
    if data is stale.
    """
    # Fetch the latest entry for each commodity
    # Using a simple query for sqlite compatibility; for postgres distinct on could be used
    commodities = db.query(MarketPrice.commodity).distinct().all()
    commodities = [c[0] for c in commodities]
    
    results = []
    for comm in commodities:
        latest = db.query(MarketPrice).filter(MarketPrice.commodity == comm).order_by(MarketPrice.recorded_at.desc()).first()
        if latest:
            results.append(latest)
            
    return results
