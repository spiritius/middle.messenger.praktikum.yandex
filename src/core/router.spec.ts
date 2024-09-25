/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import Router from '@/core/router';
import Route from '@/core/route';

// Простой компонент-заглушка для тестов
class TestComponent {
  getContent() {
    const element = document.createElement('div');
    element.textContent = 'TestComponent';
    return element;
  }
}

describe('Router', () => {
  let router: Router;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    router = new Router('#app');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should init and be instance of Router', () => {
    expect(router).to.be.instanceOf(Router);
  });

  it('should add route with use method', () => {
    router.use('/', TestComponent);
    expect(router.routes).to.have.lengthOf(1);
    expect(router.routes[0]).to.be.instanceOf(Route);
  });

  it('should find route with getRoute method', () => {
    router.use('/', TestComponent);
    router.use('/about', TestComponent);

    const route = router.getRoute('/');
    const testRoute = router.getRoute('/test');

    expect(route).to.not.be.undefined;
    expect(route!.match('/')).to.be.true;
    expect(testRoute).to.be.undefined;
  });

  it('should call back and forward', () => {
    const backSpy = sinon.spy(window.history, 'back');
    const forwardSpy = sinon.spy(window.history, 'forward');

    router.back();
    router.forward();

    expect(backSpy.calledOnce).to.be.true;
    expect(forwardSpy.calledOnce).to.be.true;

    backSpy.restore();
    forwardSpy.restore();
  });

});
