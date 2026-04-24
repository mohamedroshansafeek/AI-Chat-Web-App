import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export const useChatStore = create(
  persist(
    (set) => ({
      chats: [],
      activeChatId: null,
      apiKey: '',

      setApiKey: (key) => set({ apiKey: key }),

      createChat: () =>
        set((state) => {
          const newChat = {
            id: uuidv4(),
            title: 'New Chat',
            messages: [],
            createdAt: Date.now(),
          };
          return {
            chats: [newChat, ...state.chats],
            activeChatId: newChat.id,
          };
        }),

      deleteChat: (id) =>
        set((state) => {
          const filteredChats = state.chats.filter((c) => c.id !== id);
          return {
            chats: filteredChats,
            activeChatId:
              state.activeChatId === id
                ? filteredChats.length > 0
                  ? filteredChats[0].id
                  : null
                : state.activeChatId,
          };
        }),

      renameChat: (id, newTitle) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === id ? { ...c, title: newTitle } : c
          ),
        })),

      setActiveChat: (id) => set({ activeChatId: id }),

      addMessage: (chatId, message) =>
        set((state) => ({
          chats: state.chats.map((c) => {
            if (c.id === chatId) {
              return {
                ...c,
                messages: [
                  ...c.messages,
                  { ...message, id: uuidv4(), timestamp: Date.now() },
                ],
                // Optionally update chat title based on first message
                title:
                  c.messages.length === 0 && message.role === 'user'
                    ? message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '')
                    : c.title,
              };
            }
            return c;
          }),
        })),

      updateMessage: (chatId, messageId, newContent) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, content: newContent } : m
                  ),
                }
              : c
          ),
        })),

      deleteMessage: (chatId, messageId) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId
              ? {
                  ...c,
                  messages: c.messages.filter((m) => m.id !== messageId),
                }
              : c
          ),
        })),
    }),
    {
      name: 'daivai-chat-store',
    }
  )
);
