import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import { useChatStore } from './store/chatStore';
import { generateAIResponse } from './utils/aiApi';
import Modal from './components/Modal';

function App() {
  const { chats, activeChatId, createChat, addMessage, apiKey, setApiKey } = useChatStore();
  const [selectedModel, setSelectedModel] = useState('neural-nexus');
  const [isTyping, setIsTyping] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // If no chats exist, optionally create one on mount
  useEffect(() => {
    if (chats.length === 0) {
      createChat();
    }
  }, [chats.length, createChat]);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const handleSendMessage = async (content) => {
    if (!activeChatId) return;

    // Add User Message
    addMessage(activeChatId, { role: 'user', content });
    
    // Simulate thinking/typing state
    setIsTyping(true);

    try {
      const responseContent = await generateAIResponse(content, selectedModel);
      // Add AI Message
      addMessage(activeChatId, { role: 'ai', content: responseContent });
    } catch (error) {
      addMessage(activeChatId, { role: 'ai', content: `Oops! Something went wrong while connecting to the AI.\n\nError Details: ${error.message}` });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full bg-white">
        <Header 
          selectedModel={selectedModel} 
          setSelectedModel={setSelectedModel} 
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
        <ChatArea chat={activeChat} />
        {activeChat && (
          <ChatInput onSendMessage={handleSendMessage} isLoading={isTyping} />
        )}
      </div>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Settings">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              Save & Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
