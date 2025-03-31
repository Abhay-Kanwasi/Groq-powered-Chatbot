import { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '../api/chatApi';
import { useChatStore } from '../store/chatStore';
import { Send } from 'lucide-react';

export function ChatInput() {
  const [input, setInput] = useState('');
  const { messages, settings, addMessage, setLoading, setError } = useChatStore();
  
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const allMessages = [
        ...messages, 
        { role: 'user' as const, content }
      ];
      return sendChatMessage(allMessages, settings);
    },
    onSuccess: (response) => {
      addMessage({ role: 'assistant', content: response });
      setLoading(false);
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
    }
  });
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sendMessageMutation.isPending) return;
    
    addMessage({ role: 'user', content: input });
    setLoading(true);
    sendMessageMutation.mutate(input);
    setInput('');
  };
  
  return (
    <div className='pb-14'>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={sendMessageMutation.isPending}
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
            disabled={!input.trim() || sendMessageMutation.isPending}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
