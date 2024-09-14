import Route from '@/core/route';

export interface IRoute {
  navigate: (pathname: string) => void,
  match: (pathname: string) => boolean,
  route: () => void,
  render: () =>  void
}

class Router {
  static __instance: any;
  routes!: Route[];
  history!: History;
  #currentRoute!: Route | null;
  #rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) 
      return Router.__instance;
    
    this.routes = [];
    this.history = window.history;
    this.#currentRoute = null;
    this.#rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this.#rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.addEventListener('popstate', () => {
      this.#onRoute(window.location.pathname);
    });

    this.#onRoute(window.location.pathname);
  }

  #onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    // if (!route) return;
    if (!route) throw new Error('Can\'t find this path');

    if (this.#currentRoute && this.#currentRoute !== route) 
      this.#currentRoute.leave();
    
    this.#currentRoute = route;
    // route.render(route, pathname);
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this.#onRoute(pathname);
  }

  back(): void {
    window.history.back();
  }

  forward(): void {
    window.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find(route => route.match(pathname));
    if(!route) 
      return this.routes.find(route => route.match('*'));
    
    return route;
  }
}

export default Router;
