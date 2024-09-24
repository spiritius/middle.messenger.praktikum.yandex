import { expect } from 'chai';
import sinon from 'sinon';
import Block from './block';

type Props = { [key: string]: any }; // обобщенный тип для props

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
        return '<div id="content-body">{{content}}</div>';
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
    expect(getContent).to.equal(content);
  });

});
