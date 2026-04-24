import React, { useState } from 'react';
import { Edit2, Trash2, Bot, User, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { useChatStore } from '../store/chatStore';
import Modal from './Modal';

export default function MessageBubble({ message, chatId }) {
  const { updateMessage, deleteMessage } = useChatStore();
  const isUser = message.role === 'user';

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Parse dummy code blocks basically
  const formatContent = (content) => {
    if (content.includes('```')) {
      const parts = content.split('```');
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // Inside backticks
          const codeLines = part.split('\n');
          const lang = codeLines[0];
          const code = codeLines.slice(1).join('\n');
          return (
            <div key={index} className="my-3 rounded-md overflow-hidden bg-gray-900 border border-gray-700">
              <div className="px-3 py-1 bg-gray-800 text-xs text-gray-400 border-b border-gray-700 flex justify-between">
                <span>{lang || 'code'}</span>
              </div>
              <pre className="p-3 text-sm text-gray-100 overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
        // Normal text, preserve newlines
        return part.split('\n').map((line, i) => (
          <React.Fragment key={`${index}-${i}`}>
            {line}
            {i !== part.split('\n').length - 1 && <br />}
          </React.Fragment>
        ));
      });
    }
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i !== content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleEditSubmit = () => {
    if (editContent.trim()) {
      updateMessage(chatId, message.id, editContent.trim());
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className={clsx('flex gap-4 w-full py-6 group', isUser ? 'justify-end' : 'justify-start')}>
        {/* Avatar AI */}
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
            <Bot size={18} />
          </div>
        )}

        {/* Message Content Container */}
        <div
          className={clsx(
            'relative max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm',
            isUser ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
          )}
        >
          {isEditing ? (
            <div className="flex flex-col gap-2 min-w-[250px]">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-white text-gray-900 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y min-h-[80px]"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="text-[15px] leading-relaxed break-words">
              {formatContent(message.content)}
            </div>
          )}

          {/* Hover Actions (Only for user currently, but can enhance later) */}
          {isUser && !isEditing && (
            <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 bg-white border border-gray-200 text-gray-500 hover:text-blue-600 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                title="Edit message"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="p-1.5 bg-white border border-gray-200 text-gray-500 hover:text-red-600 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                title="Delete message"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Avatar User */}
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 mt-1">
            <User size={18} />
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Message"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this message?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteMessage(chatId, message.id);
              setIsDeleteModalOpen(false);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
