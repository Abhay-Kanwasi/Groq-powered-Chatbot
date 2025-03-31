export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
  }
  
  export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
  }
  
  export interface ChatSettings {
    model: string;
    temperature: number;
    maxTokens: number;
    stream: boolean;
  }