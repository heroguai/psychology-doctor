import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ChatMessage } from '@/api/chat';
import { sendMessage } from '@/api/chat';

export const useChatStore = defineStore('chat', () => {
  // 状态
  const messages = ref<ChatMessage[]>([
    {
      role: 'assistant',
      content: '您好！我是您的心理健康助手。很高兴为您提供帮助。请告诉我您今天感觉如何？',
    },
  ]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // 计算属性
  const hasMessages = computed(() => messages.value.length > 0);
  const lastMessage = computed(() => messages.value[messages.value.length - 1]);

  /**
   * 发送消息
   */
  async function sendMessageToApi(userMessage: string) {
    if (!userMessage.trim()) {
      return;
    }

    // 添加用户消息
    messages.value.push({
      role: 'user',
      content: userMessage,
    });

    // 清空之前的错误
    error.value = null;

    // 设置加载状态
    isLoading.value = true;

    try {
      // 调用 API
      const response = await sendMessage(userMessage, messages.value);

      // 添加 AI 响应
      messages.value.push({
        role: 'assistant',
        content: response,
      });
    } catch (err) {
      console.error('发送消息失败:', err);
      error.value = err instanceof Error ? err.message : '发送消息失败，请稍后重试';

      // 如果出错，移除用户消息（可选）
      // messages.value.pop();
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * 清空对话历史
   */
  function clearHistory() {
    messages.value = [
      {
        role: 'assistant',
        content: '对话已清空。我是您的心理健康助手，请问有什么可以帮助您的？',
      },
    ];
    error.value = null;
  }

  /**
   * 重试最后一条消息
   */
  async function retryLastMessage() {
    const userMessages = messages.value.filter((m) => m.role === 'user');
    if (userMessages.length === 0) return;

    const lastUserMessage = userMessages[userMessages.length - 1];

    // 移除最后的用户消息和可能的错误响应
    messages.value = messages.value.slice(0, -2);

    // 重新发送
    await sendMessageToApi(lastUserMessage.content);
  }

  return {
    // 状态
    messages,
    isLoading,
    error,
    // 计算属性
    hasMessages,
    lastMessage,
    // 方法
    sendMessageToApi,
    clearHistory,
    retryLastMessage,
  };
});
