import { StoreEvents } from '@/core/store';
import isEqual from './isEqual';

export function connect(mapStateToProps: (arg0: any) => any) {
  return function(Component: any) {
    return class extends Component{
      onChangeStoreCallback: () => void;
      constructor(props: any) {
        const store = window.store;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());
  
        super({ ...props, ...state });

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
