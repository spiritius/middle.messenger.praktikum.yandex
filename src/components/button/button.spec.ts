/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import Handlebars from 'handlebars';
import Button from './button.ts';

Handlebars.registerHelper('eq', function (value1, value2) {
  return value1 === value2;
});

describe('Button Component', () => {
  it('should render properly with passed props', () => {
    const button = new Button({
      title: 'Click Me',
      type: 'submit',
      style: 'primary',
      class: 'custom-class'
    });

    const rendered = button.element?.outerHTML;

    expect(rendered).to.include('type="submit"');
    expect(rendered).to.include('Click Me');
    expect(rendered).to.include('class="btn btn-primary custom-class"');
  });

  it('should contain icon if passed prop icon', () => {
    const button = new Button({
      title: 'Download',
      icon: 'download',
    });

    const rendered = button.element?.outerHTML;

    expect(rendered).to.include('<span class="icon icon-download"></span>');
  });

  it('should contain attribute disabled if passed prop disabled=true', () => {
    const button = new Button({
      title: 'Disabled Button',
      disabled: 'true',
    });

    const rendered = button.element?.outerHTML;

    expect(rendered).to.include('disabled');
  });

  it('should call onClick on mouseEvent click', () => {
    const onClickStub = sinon.stub();
    const button = new Button({
      title: 'Click Me',
      onClick: onClickStub,
    });

    // Имитируем клик
    button.getContent()?.dispatchEvent(new MouseEvent('click'));

    expect(onClickStub.calledOnce).to.be.true;
  });
});
