import { StoreEvents } from '@/core/store';
import isEqual from './isEqual';

// interface DispatchHandlers {
//   [key: string]: (...args: any[]) => void;
// }

export function connect(mapStateToProps: (arg0: any) => any) {
  return function(Component: any) {
    return class extends Component{
      private onChangeStoreCallback: () => void;
      constructor(props: any) {
        const store = window.store;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());
  
        super({ ...props, ...state });

        // const dispatchHandlers: DispatchHandlers = {};
        // Object.entries(dispatch || {}).forEach(([key, handler]) => {
        //   if (typeof handler === 'function') 
        //     dispatchHandlers[key] = (...args: any) => handler(window.store.set.bind(window.store), ...args);
          
        //   // dispatchhandler[key] = (...args: any) => handler(window.store.set.bind(window.store), ...args);
        // });

        // this.setProps({ ...dispatchHandlers });

        this.onChangeStoreCallback = () => {

          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) 
            this.setProps({ ...newState });
            
          // не забываем сохранить новое состояние
          state = newState;
        };
  
        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
