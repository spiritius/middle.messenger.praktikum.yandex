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
          <div id="content-body">{{content}}</div>
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
    
    const getContent = testComponent.element?.querySelector('#content-body')?.innerHTML;

    console.log(testComponent.element?.innerHTML); // sprint 4
    console.log(getContent); // undefined

    expect(getContent).to.be.eq(content);
  });

});
