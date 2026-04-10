from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from app.services.auth import (
    authenticate_user,
    create_access_token,
    get_university_name,
)
from app.dependencies import require_auth
from app.schemas import LoginRequest, LoginResponse

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    user = await authenticate_user(request.email, request.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    univ_nm = await get_university_name(user["user_id"])

    if not univ_nm:
        raise HTTPException(status_code=404, detail="University not found")

    access_token = create_access_token(
        data={"sub": str(user["user_cd"]), "univ_nm": univ_nm}
    )

    return LoginResponse(access_token=access_token, univ_nm=univ_nm)


@router.get("/me")
async def get_current_user_info(current_user: dict = Depends(require_auth)):
    return current_user
