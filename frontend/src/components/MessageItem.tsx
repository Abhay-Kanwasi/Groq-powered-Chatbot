import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={`py-4 px-6 ${
        isUser ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-900'
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
          }`}>
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="font-medium">
              {isUser ? 'You' : 'Assistant'}
            </div>
            
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
            
            {message.timestamp && (
              <div className="text-xs text-gray-500">
                {message.timestamp.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
