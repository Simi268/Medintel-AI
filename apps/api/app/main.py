from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.chat import router as chat_router
from app.api.routes.rag import router as rag_router
from app.api.routes.report import router as report_router

from app.db.database import engine, Base
from app.models.conversation import Conversation

from app.models.chat import Message
from app.models.conversation import Conversation
from app.api.routes import chat

from app.models.user import User

from app.api.routes import auth

from app.api.routes.vision import (
    router as vision_router
)



# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MedIntel AI",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(

    auth.router,

    prefix="/auth",

    tags=["Auth"]
)
app.include_router(chat_router)
app.include_router(
    chat.router,
    prefix="/chat",
    tags=["Chat"]
)

app.include_router(
    rag_router,
    prefix="/rag",
    tags=["RAG"]
)

app.include_router(
    report_router,
    prefix="/report",
    tags=["Reports"]
)

app.include_router(
    vision_router,
    prefix="/vision",
    tags=["Vision AI"]
)
# Root Endpoint
@app.get("/")
def root():
    return {
        "message": "MedIntel AI Backend Running 🚀"
    }
