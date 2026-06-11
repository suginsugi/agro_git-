from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.database import Base, engine
from app.core.config import get_settings

# Import routes
from app.routes import soil, weather, crop, disease, chat, profile, contact, settings, market, dashboard

app_settings = get_settings()

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AgroVision API",
    description="Backend API for AgroVision Agricultural Intelligence Platform",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in dev to prevent Network Errors
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directories
os.makedirs(os.path.join(app_settings.UPLOAD_DIR, "soil"), exist_ok=True)
os.makedirs(os.path.join(app_settings.UPLOAD_DIR, "crop"), exist_ok=True)
os.makedirs(os.path.join(app_settings.UPLOAD_DIR, "disease"), exist_ok=True)

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory=app_settings.UPLOAD_DIR), name="uploads")

# Include Routers
app.include_router(soil.router)
app.include_router(weather.router)
app.include_router(crop.router)
app.include_router(disease.router)
app.include_router(chat.router)
app.include_router(profile.router)
app.include_router(contact.router)
app.include_router(settings.router)
app.include_router(market.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {"message": "Welcome to AgroVision API", "docs": "/docs"}

# To seed data on startup, we could call seed_data() here, 
# but it's usually better to run it explicitly via the script.
