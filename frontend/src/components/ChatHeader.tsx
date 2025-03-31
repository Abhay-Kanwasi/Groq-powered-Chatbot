import { useState } from 'react';
import { Cog, X, Trash2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useQuery } from '@tanstack/react-query';
import { fetchModels } from '../api/chatApi';
import { Slider } from './ui/Slider';
import { Switch } from './ui/Switch';

export function ChatHeader() {
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSettings, clearMessages } = useChatStore();
  
  const { data: models = [] } = useQuery({
    queryKey: ['models'],
    queryFn: fetchModels,
    staleTime: Infinity,
  });

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
      <h1 className="text-xl font-bold">Groq Chatbot</h1>
      
      <div className="flex items-center gap-3">
        <button
          onClick={clearMessages}
          className="p-2 rounded-lg text-white hover:bg-white/20 transition"
          title="Clear Chat"
        >
          <Trash2 size={20} />
        </button>
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
          aria-label="Settings"
        >
          <Cog size={20} />
        </button>
      </div>
      
      {showSettings && (
        <div className="absolute right-4 top-16 w-96 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-5 z-20 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Model</label>
              <select
                value={settings.model || models[0]}
                onChange={(e) => updateSettings({ model: e.target.value })}
                className="w-full p-2 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model.charAt(0).toUpperCase() + model.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-1">
                <label className="text-sm font-medium">Temperature: {settings.temperature.toFixed(1)}</label>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[settings.temperature]}
                onValueChange={(value) => updateSettings({ temperature: value[0] })}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-1">
                <label className="text-sm font-medium">Max Tokens: {settings.maxTokens}</label>
              </div>
              <Slider
                min={100}
                max={2000}
                step={100}
                value={[settings.maxTokens]}
                onValueChange={(value) => updateSettings({ maxTokens: value[0] })}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Short</span>
                <span>Long</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Stream Response</label>
              <Switch
                checked={settings.stream}
                onCheckedChange={(checked) => updateSettings({ stream: checked })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
