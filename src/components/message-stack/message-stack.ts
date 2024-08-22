import Block from '@/core/block';

class MessageStack extends Block {
  init() {
    this.name = 'MessageStack';
  }

  render() {
    return `
      <div class="chat__content_body">
        {{#each list}}
        <div class="message message-{{ author }}">
          {{{ content }}}
          <div class="message__date">{{ date }}</div>
        </div>
        {{/each}}
        <div class="chat__content_body_timedelimeter">Today</div>
      </div>
    `;
  }
};

export default MessageStack;
