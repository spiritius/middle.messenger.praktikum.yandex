import HTTP from '@/core/httpTransport';
import { BaseAPI } from './base-api';
import { AddChat } from './types';

export class ChatApi extends BaseAPI {
  private chatApiInstance: HTTP;

  constructor() {
    super();
    this.chatApiInstance = new HTTP('/api/v2/chats');
  }

  async getChats() {
    return new Promise((resolve, reject) => {
      this.chatApiInstance.get('/')
        .then((xhr) => {
          try {
            resolve(xhr.response);
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async addChat(data: AddChat) {
    return this.chatApiInstance.post('/', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
