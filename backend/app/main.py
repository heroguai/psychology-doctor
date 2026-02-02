from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import chat

app = FastAPI(
    title="Psychology Doctor API",
    description="基于 GLM 4.7 的心理健康智能体后端",
    version="1.0.0"
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(chat.router, prefix="/api", tags=["chat"])


@app.get("/")
async def root():
    return {"message": "Psychology Doctor API", "version": "1.0.0"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
