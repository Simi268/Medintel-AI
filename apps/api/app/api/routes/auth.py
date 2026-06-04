from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from jose import jwt
from jose import JWTError

from passlib.context import CryptContext

from datetime import datetime
from datetime import timedelta

from app.db.database import SessionLocal

from app.models.user import User


# =====================================================
# CONFIG
# =====================================================

SECRET_KEY = "medintel-secret-key"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 7 * 24 * 60


# =====================================================
# PASSWORD HASHING
# =====================================================

pwd_context = CryptContext(

    schemes=["bcrypt"],

    deprecated="auto"
)


# =====================================================
# ROUTER
# =====================================================

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
# HASH PASSWORD
# =====================================================

def hash_password(password: str):

    return pwd_context.hash(password)


# =====================================================
# VERIFY PASSWORD
# =====================================================

def verify_password(

    plain_password: str,

    hashed_password: str
):

    return pwd_context.verify(

        plain_password,

        hashed_password
    )


# =====================================================
# CREATE ACCESS TOKEN
# =====================================================

def create_access_token(

    data: dict
):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(

        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({

        "exp": expire
    })

    encoded_jwt = jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM
    )

    return encoded_jwt


# =====================================================
# SIGNUP
# =====================================================

@router.post("/signup")

def signup(

    email: str,

    password: str,

    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(

        User.email == email

    ).first()

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already registered"
        )

    hashed_password = hash_password(password)

    user = User(

        email=email,

        password=hashed_password
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    token = create_access_token({

        "user_id": user.id
    })

    return {

        "access_token": token,

        "token_type": "bearer",

        "user": {

            "id": user.id,

            "email": user.email
        }
    }


# =====================================================
# LOGIN
# =====================================================

@router.post("/login")

def login(

    email: str,

    password: str,

    db: Session = Depends(get_db)
):

    user = db.query(User).filter(

        User.email == email

    ).first()

    if not user:

        raise HTTPException(

            status_code=401,

            detail="Invalid credentials"
        )

    valid_password = verify_password(

        password,

        user.password
    )

    if not valid_password:

        raise HTTPException(

            status_code=401,

            detail="Invalid credentials"
        )

    token = create_access_token({

        "user_id": user.id
    })

    return {

        "access_token": token,

        "token_type": "bearer",

        "user": {

            "id": user.id,

            "email": user.email
        }
    }
