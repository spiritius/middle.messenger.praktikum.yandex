import './assets/style.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import context from './common/context.ts';
import Block from '@/core/block.ts';

// helper for if condition 
Handlebars.registerHelper('eq', function (value1, value2) {
  if (value1 == value2)
    return true;
});

Object.entries(Components).forEach(([key, value]) => {
  //@ts-ignore
  Handlebars.registerPartial(key, value);
});

const app = document.querySelector('#app')!;
const pages: { [key: string]: string | typeof Block } = {};

Object.entries(Pages).forEach((item) => {
  pages[item[0]] = item[1];
});

const nav = (page: string) => {
  const source = pages[page];
  const pageContext = context[page];

  if(source instanceof Object) {
    const page = new source(pageContext);
    const content = page.getContent();
    
    if (content) {
      app!.innerHTML = '';
      app!.append(content);
    } else
      console.error('page.getContent() is Null');

    // page.dispatchComponentDidMount();
    return;
  }

  // app!.innerHTML = Handlebars.compile(pages[page])(context[page]);
  app!.innerHTML = Handlebars.compile(source)(pageContext);
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
