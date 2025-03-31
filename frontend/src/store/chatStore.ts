import { create } from 'zustand';
import { Message, ChatState, ChatSettings } from '../types';

interface ChatStore extends ChatState {
  settings: ChatSettings;
  addMessage: (message: Message) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateSettings: (settings: Partial<ChatSettings>) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  settings: {
    model: 'deepseek-r1-distill-llama-70b',
    temperature: 0.7,
    maxTokens: 800,
    stream: false,
  },
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, timestamp: new Date() }],
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  clearMessages: () => set({ messages: [] }),
}));
