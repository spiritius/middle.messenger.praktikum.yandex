import { ChatApi } from '@/api/chat-api';
import { AddChat, AddUserToChat, ChatId, OpenChatData } from '@/api/types';

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

export const addUser = async (model: AddUserToChat) => {
  try {
    await chatApi.addUser(model);
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteUser = async (model: AddUserToChat) => {
  try {
    await chatApi.deleteUser(model);
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteChat = async (model: ChatId) => {
  try {
    await chatApi.deleteChat(model);
  } catch (error: any) {
    console.log(error);
  }
};

export const getChatUsers = async (chat_id: number) => {
  try {
    return await chatApi.getChatUsers(chat_id);
  } catch (error: any) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const openChat = async (model: OpenChatData, callback: Function) => {
  window.store.set({ isLoading: true });
  try {
    await chatApi.openChat(model, callback);
    window.store.set({ popoverIsOpen: '' });
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason, popoverIsOpen: 'addchat' });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const closeChat = async () => {
  try {
    return chatApi.closeChat();
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason, popoverIsOpen: 'addchat' });
  }
};
