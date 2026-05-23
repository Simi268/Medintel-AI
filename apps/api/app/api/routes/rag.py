from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag.pipeline import ask_medical_question

router = APIRouter(
    prefix="/rag",
    tags=["RAG"]
)


class RAGRequest(BaseModel):
    question: str


@router.post("/ask")
async def ask_rag(request: RAGRequest):

    response = ask_medical_question(
        request.question
    )

    return response