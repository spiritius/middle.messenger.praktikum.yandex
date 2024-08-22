import Block from '@/core/block';

class ChatMessage extends Block {
  init() {
    this.children = {
      ...this.children,
    };
    this.name = 'ChatMessage';
  }

  render() {
    return `
      <div class="message message-{{ author }}">
        {{{ body }}}
        <div class="message__date">{{ date }}</div>
      </div>
    `;
  }
};

export default ChatMessage;
