import React, { useState } from 'react';
import { MessageSquare, MoreVertical, Edit2, Trash2, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { useChatStore } from '../store/chatStore';
import Modal from './Modal';

export default function ChatItem({ chat }) {
  const { activeChatId, setActiveChat, renameChat, deleteChat } = useChatStore();
  const isActive = activeChatId === chat.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      renameChat(chat.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleRenameCancel = () => {
    setEditTitle(chat.title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteChat(chat.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div
        className={clsx(
          'group relative flex items-center gap-2 p-3 my-1 rounded-lg cursor-pointer transition-all duration-200',
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )}
        onClick={() => {
          if (!isEditing) setActiveChat(chat.id);
        }}
      >
        <MessageSquare size={18} className={clsx('flex-shrink-0', isActive ? 'text-blue-600' : 'text-gray-400')} />
        
        <div className="flex-1 overflow-hidden">
          {isEditing ? (
            <form onSubmit={handleRenameSubmit} className="flex items-center gap-1">
              <input
                autoFocus
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-white border border-blue-300 rounded px-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
              <button type="submit" className="p-1 text-green-600 hover:bg-green-100 rounded">
                <Check size={14} />
              </button>
              <button type="button" onClick={handleRenameCancel} className="p-1 text-red-600 hover:bg-red-100 rounded">
                <X size={14} />
              </button>
            </form>
          ) : (
            <div className="truncate text-sm font-medium">{chat.title}</div>
          )}
        </div>

        {!isEditing && isActive && (
          <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-black/5 transition-all text-gray-500"
            >
              <MoreVertical size={16} />
            </button>
            
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit2 size={14} /> Rename
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Chat"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{chat.title}"? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
