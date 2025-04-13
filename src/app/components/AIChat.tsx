'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AIChat() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai',
    onError: (error) => {
      toast.error('An error occurred while getting AI response');
    }
  });

  return (
    <div className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${isExpanded ? 'h-[600px]' : 'h-[400px]'}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold">AI Assistant</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          {isExpanded ? '↓' : '↑'}
        </button>
      </div>

      <div className="h-[calc(100%-8rem)] overflow-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === 'assistant' ? 'text-blue-600' : 'text-gray-800'
            }`}
          >
            <span className="font-semibold">{message.role === 'assistant' ? 'AI: ' : 'You: '}</span>
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
