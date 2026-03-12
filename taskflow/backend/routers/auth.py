from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from pydantic import BaseModel
from logger import log_info, log_error

router = APIRouter()

class LoginData(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginData, db = Depends(get_db)):
    user = db.get_user_by_email(data.email)
    if not user or user["password"] != data.password:
        log_error("AuthError", "Invalid user credentials", "auth.py")
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    log_info(f"User {user['email']} logged in successfully", "auth.py")
    return {"user_id": user["id"], "email": user["email"], "name": user["name"]}
