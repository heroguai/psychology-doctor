import httpx
from app.core.config import settings
from typing import List, Dict, Any


class GLMService:
    def __init__(self):
        self.api_key = settings.GLM_API_KEY
        self.api_url = settings.GLM_API_URL
        self.model = settings.GLM_MODEL

    async def chat(
        self,
        message: str,
        conversation_history: List[Dict[str, str]] = None
    ) -> str:
        """
        调用 GLM API 进行对话

        Args:
            message: 用户消息
            conversation_history: 对话历史

        Returns:
            AI 回复内容
        """
        if conversation_history is None:
            conversation_history = []

        # 构建消息列表
        messages = [
            {
                "role": "system",
                "content": "你是一位专业的心理咨询师，名为「心理医生」。你擅长倾听、分析和提供建议。请以温暖、专业、保密的态度与用户交流。"
            }
        ]
        messages.extend(conversation_history)
        messages.append({"role": "user", "content": message})

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.7,
            "top_p": 0.9,
            "max_tokens": 2000
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    json=payload
                )
                response.raise_for_status()
                result = response.json()
                return result["choices"][0]["message"]["content"]
            except httpx.HTTPError as e:
                raise Exception(f"GLM API 调用失败: {str(e)}")


# 全局实例
glm_service = GLMService()
