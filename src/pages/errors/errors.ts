import Block from '@/core/block';

class Error extends Block {
  init() {
    this.name = 'Error';
  }

  render() {
    return `
      <div class="error-page">
        <h1 class="error-page__title">404 Page not found</h1>
        <div class="error-page__descr">You got the wrong way</div>
        <a href="/messenger">Back to chats</a>
      </div>
    `;
  };
};

export default Error;
