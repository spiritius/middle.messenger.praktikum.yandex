import { expect } from 'chai';
import sinon from 'sinon';
import Block from './block';

type Props = { [key: string]: any };

describe('Block', () => {
  let TestBlock: typeof Block;

  before(() => {
    class TestBlockClass extends Block {
      constructor(props: Props) {
        super({
          ...props
        });
      }
      render(): string {
        return `
          <div>
            <div id="content-body">{{ content }}</div>
          </div>
          `;
      }
    }

    TestBlock = TestBlockClass;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should init and render with props from constructor', () => {
    const content = 'sprint 4';
    const testComponent = new TestBlock({ content });
    
    const getContent = testComponent.element?.querySelector('#content-body')?.textContent;

    expect(getContent).to.be.eq(content);
  });

  it('should have reactive behavior', () => {
    const content = 'lorem ipsum';
    const testComponent = new TestBlock({ content: 'sprint 4' });
    
    testComponent.setProps({ content });
    const getContent = testComponent.element?.querySelector('#content-body')?.textContent;

    expect(getContent).to.be.eq(content);
  });

  it('should put the event and handle it', () => {
    const handlerStub = sinon.stub();
    const testComponent = new TestBlock({ events: {
      click: handlerStub
    } });
    
    const event = new MouseEvent('click');
    testComponent.element?.dispatchEvent(event);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(handlerStub.calledOnce).to.be.true;
  });

  it('should call dispatchComponentDidMount() method', () => {
    const clock = sinon.useFakeTimers();
    const testComponent = new TestBlock();

    const spyCDM = sinon.spy(testComponent, 'componentDidMount');

    const element = testComponent.getContent();
    document.body.append(element!);
    clock.next();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spyCDM.calledOnce).to.be.true;
  });

});
