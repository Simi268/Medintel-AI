from fastapi import FastAPI
from app.api.routes.chat import router as chat_router

app = FastAPI(title="MedIntel AI")

app.include_router(chat_router)

@app.get("/")
def root():
    return {"message": "MedIntel AI Backend Running"}