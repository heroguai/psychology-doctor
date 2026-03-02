/**
 * 聊天 API 接口
 * 与后端 FastAPI 服务通信
 */

const API_BASE_URL = 'http://localhost:8000';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  response: string;
}

/**
 * 发送聊天消息到后端
 * @param message 用户消息
 * @param history 对话历史（可选）
 * @returns AI 响应
 */
export async function sendMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
      } as ChatRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }

    const data: ChatResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('发送消息失败:', error);
    throw error;
  }
}

/**
 * 检查后端服务是否可用
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/docs`);
    return response.ok;
  } catch {
    return false;
  }
}
