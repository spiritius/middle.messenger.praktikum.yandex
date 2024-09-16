type WebSocketMessage = string | Record<string, unknown>;

class WSTransport {
  private socket: WebSocket;
  private url: string;
  private reconnectInterval: number;
  private reconnectAttempts: number;
  private maxReconnectAttempts: number;
  private isConnected: boolean;
  private pingInterval: number | undefined;

  constructor(endpoint: string, token: string) {
    this.url = `wss://ya-praktikum.tech/ws/chats/${endpoint}/${token}`;
    this.reconnectInterval = 5000;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.isConnected = false;
    this.socket = this.connect();
  }

  private connect(): WebSocket {
    const socket = new WebSocket(this.url);

    socket.addEventListener('open', this.onOpen.bind(this));
    socket.addEventListener('message', this.onMessage.bind(this));
    socket.addEventListener('close', this.onClose.bind(this));
    socket.addEventListener('error', this.onError.bind(this));

    return socket;
  }

  private onOpen(): void {
    console.log('WebSocket connection opened');
    this.isConnected = true;
    this.reconnectAttempts = 0;
    this.pingInterval = window.setInterval(() => this.ping(), 10000);
  }

  private onMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data);
    console.log('Received WebSocket message:', data);
    this.handleMessage(data);
  }

  private onClose(event: CloseEvent): void {
    console.log('WebSocket connection closed:', event);
    this.isConnected = false;
    if (!event.wasClean) {
      console.warn('Unexpected WebSocket disconnection');
      this.reconnect();
    }
  }

  private onError(event: Event): void {
    console.error('WebSocket error occurred:', event);
    this.isConnected = false;
  }

  private reconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) 
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        this.reconnectAttempts++;
        this.socket = this.connect();
      }, this.reconnectInterval);
    else 
      console.error('Max reconnect attempts reached. Giving up.');
    
  }

  public sendMessage(message: WebSocketMessage): void {
    if (this.isConnected) {
      const messageToSend = typeof message === 'string' ? message : JSON.stringify(message);
      this.socket.send(messageToSend);
      console.log('Sent WebSocket message:', messageToSend);
    } else 
      console.error('Unable to send message. WebSocket is not connected.');
    
  }

  private ping(): void {
    if (this.isConnected) {
      this.sendMessage({ type: 'ping' });
      console.log('Sent ping');
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    if (typeof message === 'object' && message.type === 'pong') {
      console.log('Received pong');
      return;
    }
    // Здесь можно обрабатывать входящие сообщения, например:
    // if (message.type === 'message') {
    //   // Обработка сообщения
    // }
  }

  public close(): void {
    if (this.pingInterval) 
      clearInterval(this.pingInterval);
    
    this.socket.close();
    console.log('WebSocket connection closed manually');
  }
}

export default WSTransport;
