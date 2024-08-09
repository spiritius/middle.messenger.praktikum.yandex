import './assets/style.scss';
import Handlebars from 'handlebars';
import * as Partials from './partials';
import * as Pages from './pages';
import context from './common/context.ts';

Object.entries(Partials).forEach(([key, value]: [string, string]) => {
  Handlebars.registerPartial(key, value);
});

const app = document.querySelector('#app');
const pages: {[key: string]: string} = {};

Object.entries(Pages).forEach((item) => {
  pages[item[0]] = item[1];
});

const nav = (page: string) => {
  app!.innerHTML = Handlebars.compile(pages[page])(context[page]);
};

document.addEventListener('DOMContentLoaded', () => {
  nav('NavList'); // initial navigation page

  app!.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (target.matches('#nav li')) {
      const page = target.dataset.page;
      if (page) 
        nav(page);
    }

    if (target.matches('#profileChange')) 
      nav('ProfileChange');

    if (target.matches('#passwordChange')) 
      nav('PasswordChange');

    if (target.matches('#profileBack')) 
      nav('Chat');

    if (target.matches('#sidebarContact')) 
      nav('Chat');

    if (target.matches('#sidebarProfile')) 
      nav('Profile');
  });

  app!.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;

    if (target.matches('#message')) {
      const lines = target.value.split('\n');
      const body = document.querySelector('#chat-content') as HTMLElement;
      
      if (body && lines.length > 2) 
        body.style.gridTemplateRows = '73px 1fr 130px';
      else 
        body.style.gridTemplateRows = '73px 1fr 73px';
    }
  });
});
