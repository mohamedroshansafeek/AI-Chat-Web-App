import React, { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import MessageBubble from './MessageBubble';

export default function ChatArea({ chat }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 overflow-hidden bg-white">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
          <Bot size={32} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to DaivAI</h2>
        <p className="text-sm">Select a chat or start a new one to begin.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center pt-8 pb-12">
        {chat.messages.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-20 max-w-md">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-100 to-indigo-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-blue-100/50">
              <Bot size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How can I help you today?</h2>
            <p className="text-gray-500 text-[15px]">
              I am your AI assistant. Send a message to start our conversation.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            {chat.messages.map((message) => (
              <MessageBubble key={message.id} message={message} chatId={chat.id} />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
}
