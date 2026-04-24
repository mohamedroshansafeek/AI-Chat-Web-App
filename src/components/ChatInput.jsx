import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 shrink-0">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-end gap-2 bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all p-2 pr-12"
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message to DaivAI..."
          disabled={isLoading}
          rows={1}
          className="w-full max-h-[200px] bg-transparent resize-none outline-none py-2 px-3 text-[15px] text-gray-800 placeholder:text-gray-400 disabled:opacity-50"
        />
        
        <div className="absolute right-2 bottom-2">
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="p-2.5 rounded-xl bg-blue-600 text-white disabled:bg-gray-100 disabled:text-gray-400 hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} className="ml-0.5" />
            )}
          </button>
        </div>
      </form>
      <div className="text-center text-xs text-gray-400 mt-3 pb-2">
        DaivAI can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
}
