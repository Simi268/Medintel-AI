from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from sqlalchemy.sql import func

from app.db.database import Base

from sqlalchemy import ForeignKey

class Conversation(Base):

    __tablename__ = "conversations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        default="New Conversation"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user_id = Column(
    Integer,
    ForeignKey("users.id")
    )