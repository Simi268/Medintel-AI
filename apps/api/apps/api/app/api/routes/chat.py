from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.llm.chat_service import generate_response

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    response = generate_response(request.message)
    return ChatResponse(response=response)