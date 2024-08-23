import Block from '@/core/block';

class Link extends Block {
  init() {
    this.children = {
      ...this.children,
    };
    this.name = 'Link';
  }

  render() {
    return `
      <a href="{{url}}" class="{{ style }}">{{ title }}</a>
    `;
  }
};

export default Link;
