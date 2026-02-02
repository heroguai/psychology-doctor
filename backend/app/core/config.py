from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # GLM API 配置
    GLM_API_KEY: str
    GLM_API_URL: str = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
    GLM_MODEL: str = "glm-4-plus"

    # 服务器配置
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    RELOAD: bool = True

    # CORS 配置
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
