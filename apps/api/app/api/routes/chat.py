from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.models.chat import Message
from app.models.conversation import Conversation


router = APIRouter()


# =====================================================
# DATABASE
# =====================================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =====================================================
# CREATE CONVERSATION
# =====================================================

@router.post("/conversation")

def create_conversation(

    question: str,
    user_id: int,

    db: Session = Depends(get_db)

):

    title = question.strip()
    if len(title) > 40:
        title = title[:40] + "..."


    # =====================================================
    # CREATE CONVERSATION
    # =====================================================

    conversation = Conversation(

        title=title,

        user_id=user_id
    )

    db.add(conversation)

    db.commit()

    db.refresh(conversation)

    return conversation

# =====================================================
# GET CONVERSATIONS
# =====================================================

@router.get("/conversations")

def get_conversations(
    user_id: int,

    db: Session = Depends(get_db)
):

    conversations = db.query(
        Conversation
    ).filter(
    Conversation.user_id == user_id
    ).order_by(
        Conversation.created_at.desc()
    ).all()

    return conversations


# =====================================================
# SAVE MESSAGE
# =====================================================

@router.post("/message")

def save_message(

    conversation_id: int,

    role: str,

    content: str,

    image_url: str = None,

    db: Session = Depends(get_db)
):

    message = Message(

        conversation_id=conversation_id,

        role=role,

        content=content,

        image_url=image_url,
    )

    db.add(message)

    db.commit()

    db.refresh(message)

    return message


# =====================================================
# GET MESSAGES
# =====================================================

@router.get("/messages/{conversation_id}")

def get_messages(

    conversation_id: int,

    db: Session = Depends(get_db)
):

    messages = db.query(
        Message
    ).filter(
        Message.conversation_id
        == conversation_id
    ).order_by(
        Message.created_at.asc()
    ).all()

    return messages
@router.put("/conversation/{conversation_id}")

def update_conversation_title(

    conversation_id: int,

    title: str,

    db: Session = Depends(get_db)
):

    conversation = db.query(
        Conversation
    ).filter(
        Conversation.id == conversation_id
    ).first()

    if conversation:

        conversation.title = title

        db.commit()

    return {
        "message": "updated"
    }
# =====================================================
# DELETE CONVERSATION
# =====================================================

@router.delete("/conversation/{conversation_id}")

def delete_conversation(

    conversation_id: int,

    db: Session = Depends(get_db)
):

    conversation = db.query(
        Conversation
    ).filter(
        Conversation.id == conversation_id
    ).first()

    if not conversation:

        return {
            "message": "Conversation not found"
        }

    # DELETE MESSAGES FIRST

    db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).delete()

    # DELETE CONVERSATION

    db.delete(conversation)

    db.commit()

    return {
        "message": "Conversation deleted"
    }
