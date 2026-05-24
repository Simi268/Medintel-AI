from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.chat import router as chat_router
from app.api.routes.rag import router as rag_router
from app.api.routes.report import router as report_router

app = FastAPI(title="MedIntel AI")
app.include_router(report_router, prefix="/report")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(rag_router)
app.include_router(report_router)


@app.get("/")
def root():
    return {
        "message": "MedIntel AI Backend Running"
    }