import EventBus from './event-bus';

export enum StoreEvents {
  Updated = 'Updated'
}

export class Store extends EventBus {
  private static __instance: Store;
  private state: any = {};

  constructor(defaultState: any) {
    if (Store.__instance) 
      return Store.__instance;
    
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: any) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };
    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
