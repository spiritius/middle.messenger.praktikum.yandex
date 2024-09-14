import { ChatApi } from '@/api/chat-api';
import { AddChat } from '@/api/types';

const chatApi = new ChatApi();

export const getChats = async () => {
  window.store.set({ isLoading: true });
  try {
    const response = await chatApi.getChats();
    return response;
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason });
    throw error;
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const addChat = async (model: AddChat) => {
  window.store.set({ isLoading: true });
  try {
    await chatApi.addChat(model);
    window.store.set({ popoverIsOpen: '' });
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason, popoverIsOpen: 'addchat' });
  } finally {
    window.store.set({ isLoading: false });
  }
};
