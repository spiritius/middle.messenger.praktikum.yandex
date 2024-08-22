import EventBus from './event-bus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

type Props = { [key: string]: any }; // обобщенный тип для props
type Children = { [key: string]: Block }; // дети будут экземплярами Block

class Block {
  static EVENTS: {[key: string]: string } = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  #element: HTMLElement | null = null;
  // #meta: { tagName?: string; props?: any } | null = null; 
  #id: string = nanoid(6);

  // типы публичных свойств
  props: Props;
  name: string;
  children: Children;
  eventBus: () => EventBus;

  constructor(propsWithChildren = {}) {
    // создается экземпляр ивент-баса
    const eventBus = new EventBus(); 
    const { props, children } = this.#getChildrenAndProps(propsWithChildren);
    // #meta хранит метаданные компонента: тег и его свойства
    // this.#meta = {
    //   tagName,
    //   props
    // };
    // все свойства компонента проходят через метод #makePropsProxy
    this.props = this.#makePropsProxy(props); 
    this.children = children;
    this.name = '';

    this.eventBus = () => eventBus;
    this.#registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  #addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((item) => {
      const [eventName, selector] = item.split('|');

      const targetElement = selector ? this.#element?.querySelector(selector) : this.#element;

      if (targetElement)
        targetElement.addEventListener(eventName, events[item]);
    });
  }

  #registerEvents(eventBus: EventBus): void {
    // этапы жизненного цикла
    eventBus.on(Block.EVENTS.INIT, this.#init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.#render.bind(this));
  }

  #init() {
    this.init();
    // запуск рендера
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init(): void {};

  #componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: Props = {}): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  #componentDidUpdate(oldProps?: Props, newProps?: Props): void {
    console.log('-- component did update');
    // вызывается при обновлении свойств компонента
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response)
      return;

    this.#render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    return true;
  }

  #getChildrenAndProps(propsWithChildren: Props): { children: Children, props: Props } {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block)
        children[key] = value;
      else
        props[key] = value;
    });

    return { children, props };
  }

  setProps = (nextProps: Props): void => {
    // обновляет свойства компонента
    if (!nextProps) 
      return;
  
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this.#element;
  }

  #render(): void {
    // рендеринг компонента и установка его внутреннего HTML-содержимого

    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (child instanceof Array) return;
      propsAndStubs[key] = `<div data-id="${child.#id}"></div>`;
    });

    const fragment = this.#createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    
    const newElement = fragment.content.firstElementChild as HTMLElement;

    Object.values(this.children).forEach(child => {
      if (child instanceof Array) return;
      const stub = fragment.content.querySelector(`[data-id="${child.#id}"]`);
      stub?.replaceWith(child.getContent()!);
    });

    if (this.#element)
      this.#element.replaceWith(newElement);

    this.#element = newElement;

    this.#addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  render(): string {
    return '';
  }

  getContent(): Node | null {
    // возвращает DOM-элемент компонента
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE)
          this.dispatchComponentDidMount();
      }, 100);
    
    return this.#element;
  }

  #makePropsProxy(props: Props): Props {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // const self = this;

    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        const oldTarget = { ...target };
        target[prop] = value;
        // Запускаем обновление компоненты
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      }
    });
  }

  // #createResources() {
  //   // создает DOM-элемент с тегом tagname (если он есть!)
  //   if (this.#meta && this.#meta.tagName) {
  //     const { tagName } = this.#meta;
  //     this.#element = this.#createDocumentElement(tagName);
  //   } else
  //     throw new Error('Нет tagName');
  // }

  #createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show(): void {
    const content = this.getContent() as HTMLElement | null;
    if (content)
      content.style.display = 'block';
  }

  hide(): void {
    const content = this.getContent() as HTMLElement | null;
    if (content)
      content.style.display = 'none';
  }
}

export default Block;
