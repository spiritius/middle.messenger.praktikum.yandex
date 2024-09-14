export class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create(_data: any) { throw new Error('Not implemented'); }

  request(_data: any) { throw new Error('Not implemented'); }

  update(_data: any) { throw new Error('Not implemented'); }

  delete(_data: any) { throw new Error('Not implemented'); }
}
