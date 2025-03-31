import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/chatStore';
import { MessageItem } from './MessageItem';

export function MessageList() {
  const { messages } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center text-gray-500">
        <div>
          <p className="mb-2">No messages yet</p>
          <p className="text-sm">Start a conversation by sending a message below.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
