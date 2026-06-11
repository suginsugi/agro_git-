import os
import sys

# Add parent directory to path to allow running as script
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.farmer import Farmer
from app.models.user_settings import UserSettings
from app.models.market_price import MarketPrice

# Import all models to ensure they are registered with Base
import app.models

def seed_data():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Seed Farmer
        farmer_id = "AGR-88219-X"
        existing_farmer = db.query(Farmer).filter(Farmer.farmer_id == farmer_id).first()
        
        if not existing_farmer:
            print(f"Seeding farmer {farmer_id}...")
            farmer = Farmer(
                farmer_id=farmer_id,
                name="Raj Singh",
                mobile="+91 98765 43210",
                email="raj.singh@example.com",
                address="Vill. Madhavpur, Dist. Karnal, Haryana",
                land_area="12.5 Acres",
                crop_types="Wheat, Rice, Sugarcane",
                soil_type="Alluvial, Clay Loam",
                irrigation_type="Canal, Tube Well"
            )
            db.add(farmer)
            
            # Seed Settings for this farmer
            settings = UserSettings(
                farmer_id=farmer_id,
                theme="system",
                font_size="Medium (Default)",
                dashboard_density="Comfortable",
                language="English (US)",
                region="India",
                timezone="(UTC+05:30) IST"
            )
            db.add(settings)
            
        # Seed Market Prices
        existing_prices = db.query(MarketPrice).count()
        if existing_prices == 0:
            print("Seeding market prices...")
            prices = [
                MarketPrice(commodity="Wheat", price=2125.0, previous_price=2100.0, trend="up", market="Karnal Mandi"),
                MarketPrice(commodity="Paddy (Common)", price=2040.0, previous_price=2040.0, trend="stable", market="Kurukshetra Mandi"),
                MarketPrice(commodity="Sugarcane", price=340.0, previous_price=330.0, trend="up", market="Local Mill"),
                MarketPrice(commodity="Mustard", price=5450.0, previous_price=5600.0, trend="down", market="Hisar Mandi"),
                MarketPrice(commodity="Tomato", price=1200.0, previous_price=1100.0, trend="up", market="Azadpur Mandi")
            ]
            db.add_all(prices)
            
        db.commit()
        print("Seeding complete!")
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
