import { IRoute } from './router';

class Route implements IRoute {
  #pathname: string;
  #blockClass: any;
  #block: any | null;
  #props: any;

  constructor(pathname: string, view: any, props: any) {
    this.#pathname = pathname;
    this.#blockClass = view;
    this.#block = null;
    this.#props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.#pathname = pathname;
      this.render();
    }
  }

  leave() {
    console.log('route leave');
  }

  match(pathname: string) {
    // return isEqual(pathname, this.#pathname);
    return pathname === this.#pathname;
  }

  #renderDom(query: string, block: any) {
    const root = document.querySelector(query);
    root!.innerHTML = '';
    root!.append(block.getContent());
  }

  render() {
    this.#block = new this.#blockClass();
    this.#renderDom(this.#props.rootQuery, this.#block);
  }
}

export default Route;
