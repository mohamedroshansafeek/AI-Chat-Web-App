import React from 'react';
import { Plus, Bot } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import ChatItem from './ChatItem';

export default function Sidebar({ isOpen, onClose }) {
  const { chats, createChat } = useChatStore();

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 md:w-72 bg-gray-50 border-r border-gray-200 flex flex-col h-full transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl md:shadow-none' : '-translate-x-full'}`}>
      {/* Sidebar Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-200">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
          <Bot size={20} />
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight shrink-0">DaivAI</h1>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={createChat}
          className="w-full flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 group font-medium"
        >
          <Plus size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="text-xs font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider">
          Recent
        </div>
        {chats.length > 0 ? (
          chats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
        ) : (
          <div className="text-sm text-gray-400 text-center py-8 px-4">
            No chats yet. Start a new conversation!
          </div>
        )}
      </div>
      
      {/* Footer Area (Optional) */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-400 text-center">
          Powered by DaivAI Framework
        </div>
      </div>
    </div>
  );
}
