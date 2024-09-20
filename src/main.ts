import './assets/style.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
// import context from './common/context';
import Block from '@/core/block';
import Router from '@/core/router';
import { Store } from '@/core/store';

// helper for if condition 
Handlebars.registerHelper('eq', function (value1, value2) {
  if (value1 == value2)
    return true;
});

Object.entries(Components).forEach(([key, value]) => {
  //@ts-expect-error wft
  Handlebars.registerPartial(key, value);
});

const pages: { [key: string]: string | typeof Block } = {};

Object.entries(Pages).forEach((item) => {
  (pages as any)[item[0]] = item[1];
});

declare global {
  interface Window {
    router: Router;
    store: Store;
  }
}

const router = new Router('#app');
window.router = router;

window.store = new Store({
  isLoading: false,
  user: null,
  profileDisabled: true,
  errorMessage: null,
  successMessage: null,
  userName: null,
  userId: null,
  chatId: null,
});

router
  .use('/', Pages.Login)
  .use('/sign-up', Pages.Registration)
  .use('/messenger', Pages.ChatEmpty)
  .use('/settings', Pages.Profile)
  .use('/password', Pages.PasswordChange)
  .use('*', Pages.Error404)
  .start();
