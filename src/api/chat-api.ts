/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import HTTP from '@/core/httpTransport';
import { BaseAPI } from './base-api';
import { AddChat, AddUserToChat, ChatId, OpenChatData } from './types';

export class ChatApi extends BaseAPI {
  private chatApiInstance: HTTP;
  private socket: WebSocket | undefined;

  constructor() {
    super();
    this.chatApiInstance = new HTTP('/api/v2/chats');
    this.socket = undefined;
  }

  async getChats() {
    return this.chatApiInstance.get('/');
  }
  async addChat(data: AddChat) {
    return this.chatApiInstance.post('/', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  async getChatUsers(chat_id: number) {
    return this.chatApiInstance.get(`/${chat_id}/users`);
  }

  async addUser(data: AddUserToChat) {
    return this.chatApiInstance.put('/users', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  async deleteUser(data: AddUserToChat) {
    return this.chatApiInstance.delete('/users', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  async deleteChat(data: ChatId) {
    return this.chatApiInstance.delete('/', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async openChat (data: OpenChatData, callback: Function) {
    const response: any = await this.chatApiInstance.post(`/token/${data.chatid}`,
      {
        data,
        headers: {
          'Content-Type': 'application/json',
          'cookie': 'string'
        }
      }
    );

    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${data.user.id}/${data.chatid}/${response.token}`);

    let pingInterval: string | number | NodeJS.Timeout | undefined;

    this.socket.onopen = () => {
      console.log('Соединение установлено');
      
      this.socket?.send(JSON.stringify({
        content: '0',
        type: 'get old'
      }));

      const sendBtn = document.getElementById('send-btn');
      
      sendBtn?.addEventListener('click', () => {
        const textArea = document.getElementById('message') as HTMLInputElement;
        if (textArea.value === '') return;

        this.socket?.send(JSON.stringify({
          content: textArea.value,
          type: 'message',
        }));
        textArea.value = '';
      });

      const ping = () => {
        this.socket?.send(JSON.stringify({
          type: 'ping'
        }));
      };
      pingInterval = setInterval(ping, 30000);
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) 
        console.log('Соединение закрыто чисто');
      else 
        console.log('Обрыв соединения');

      console.log(`Код: ${ event.code } | Причина: ${ event.reason }`);
      clearInterval(pingInterval);
    };

    this.socket.onmessage = (event) => {
      // console.log('Получены данные', event.data);
      console.log('Получены данные');
      const messages = JSON.parse(event.data);
      handleMessage(messages, undefined, callback);
    };

    this.socket.onerror = (event) => {
      console.log('Ошибка', event);
    };
  }

  async closeChat() {
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }
  }
}

function handleMessage(data: any, temp: object[] | undefined, callback: Function) {
  if (Array.isArray(data)) {
    data.forEach((item) => handleMessage(item, temp, callback));
    return;
  }
  
  if (data.type === 'pong') return;
  if (data.content === '') return;
  
  callback(data);
}
