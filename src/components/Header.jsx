import React from 'react';
import { Settings, User, Sparkles } from 'lucide-react';

const AI_ENGINES = [
  { id: 'neural-nexus', name: 'Neural Nexus', icon: Sparkles },
  { id: 'cerebral-prime', name: 'Cerebral Prime', icon: Sparkles },
  { id: 'synapse-ultra', name: 'Synapse Ultra', icon: Sparkles },
  { id: 'logic-core', name: 'Logic Core', icon: Sparkles },
];

export default function Header({ selectedModel, setSelectedModel, onOpenSettings }) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <label htmlFor="ai-model" className="text-sm font-medium text-gray-500 hidden md:block">
          AI Engine:
        </label>
        <div className="relative">
          <select
            id="ai-model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2 pr-8 font-medium cursor-pointer"
          >
            {AI_ENGINES.map((engine) => (
              <option key={engine.id} value={engine.id}>
                {engine.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenSettings}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Settings size={20} />
        </button>
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-sm ring-2 ring-white cursor-pointer">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}
