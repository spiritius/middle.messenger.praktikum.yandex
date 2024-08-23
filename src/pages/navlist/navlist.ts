import Block from '@/core/block';

class Login extends Block {
  init() {
    this.name = 'NavList';
  }

  render() {
    return `
      <nav id="nav">
        <ul>
          {{#each nav}}
          <li data-page="{{ this.route }}">{{ this.title }}</li>
          {{/each}}
        </ul>
      </nav>
    `;
  }
};

export default Login;
