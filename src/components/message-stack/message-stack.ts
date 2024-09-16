import Block from '@/core/block';
import { connect } from '@/utils/connect';

export class MessageStack extends Block {
  init() {
    this.name = 'MessageStack';
  }
  
  render() {
    return `
      <div class="chat__content_body" id="message-list">
        {{#each list}}
        <div class="message {{user_id}}">
          {{{ content }}} {{{ userId }}}
          <div class="message__date">{{ time }}</div>
        </div>
        {{/each}}
        
      </div>
    `;
  }
};

const mapStateToPropsShort = ({ userId }: { [key: string]: any }) => ({ userId });

export default connect(mapStateToPropsShort)(MessageStack);

// TODO
// 1. date delimeter?
// <div class="chat__content_body_timedelimeter">Today</div>
