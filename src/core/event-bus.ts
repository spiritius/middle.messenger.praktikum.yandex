type Callback = (...args: any[]) => void;

class EventBus {
  private listeners: { [event: string]: Array<Callback> } = {};

  on(event: string, callback: Callback): void {
    if (!this.listeners[event])
      this.listeners[event] = [];

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Callback): void {
    if (!this.listeners[event])
      throw new Error(`Нет события: ${event}`);

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) 
      return;
    

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}

export default EventBus;
