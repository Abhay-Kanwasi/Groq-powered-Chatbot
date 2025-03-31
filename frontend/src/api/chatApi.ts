import axios from 'axios';
import { Message, ChatSettings } from '../types';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const fetchModels = async (): Promise<string[]> => {
  const response = await axios.get(`${API_BASE_URL}/models`);
  return response.data.models;
};

export const sendChatMessage = async (
  messages: Message[],
  settings: ChatSettings
): Promise<string> => {
  const response = await axios.post(`${API_BASE_URL}/chat`, {
    messages: messages.map(({ role, content }) => ({ role, content })),
    model: settings.model,
    temperature: settings.temperature,
    max_tokens: settings.maxTokens,
    stream: settings.stream,
  });
  
  return response.data.response;
};
