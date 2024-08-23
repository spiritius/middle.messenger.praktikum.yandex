import Block from '@/core/block';

class Error extends Block {
  init() {
    this.name = 'Error';
  }

  render() {
    return `
      <div class="error-page">
        <h1 class="error-page__title">{{ title }}</h1>
        <div class="error-page__descr">{{ descr }}</div>
        <a href="#">{{ link }}</a>
      </div>
    `;
  };
};

export default Error;
