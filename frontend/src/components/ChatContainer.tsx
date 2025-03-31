import { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { AlertCircle } from 'lucide-react';

export function ChatContainer() {
  const { isLoading, error, setError } = useChatStore();
  
  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ChatHeader />
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center">
          <AlertCircle className="mr-2" size={20} />
          <span>{error}</span>
        </div>
      )}
      
      <MessageList />
      
      {isLoading && (
        <div className="p-4 text-center text-gray-500">
          <div className="inline-block animate-pulse">Thinking...</div>
        </div>
      )}
      
      <ChatInput />
    </div>
  );
}
