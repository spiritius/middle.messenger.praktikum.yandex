import HTTP from '@/core/httpTransport';
import { BaseAPI } from './base-api';
import { AddChat, OpenChatData } from './types';

export class ChatApi extends BaseAPI {
  private chatApiInstance: HTTP;

  constructor() {
    super();
    this.chatApiInstance = new HTTP('/api/v2/chats');
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

  async openChat (data: OpenChatData) {
    const response: any = await this.chatApiInstance.post(`/token/${data.chatid}`,
      {
        data,
        headers: {
          'Content-Type': 'application/json',
          'cookie': 'string'
        }
      }
    );
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${data.user.id}/${data.chatid}/${response.token}`);

    const messages = document.getElementById('chats');
    const div = document.createElement('div');
    const textArea = document.getElementById('messages') as HTMLInputElement;
    const sendBtn = document.getElementById('send-message');

    socket.onopen = () => {
      console.log('Соединение установлено');

      sendBtn?.addEventListener('click', () => {
        socket.send(JSON.stringify({
          content: textArea.value,
          type: 'message',
        }));
      });
    };

    socket.onclose = (event) => {
      if (event.wasClean) 
        console.log('Соединение закрыто чисто');
      else 
        console.log('Обрыв соединения');

      console.log(`Код: ${ event.code } | Причина: ${ event.reason }`);
    };

    socket.onmessage = (event) => {
      console.log('Получены данные', event.data);

      const data = JSON.parse(event.data);

      div.classList.add('message');

      if (data.user_id === me.id) 
        div.classList.add('message_me');
      
      div.innerText = data.content;

      messages?.append(div);
    };

    socket.onerror = (event) => {
      console.log('Ошибка', event);
    };
  }
}
