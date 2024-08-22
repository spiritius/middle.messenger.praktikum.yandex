import Block from '@/core/block';

class SidebarContact extends Block {
  init() {
    this.name = 'SidebarContact';
  }

  render() {
    return `
      <div class="chat__contact" id="sidebarContact">
        <div class="chat__contact_avatar">
          {{#if img}}<img src={{img}} alt="{{name}}" />{{/if}}
        </div>
        <div class="chat__contact_info">
          <div class="chat__contact_info-name">{{ name }}</div>
          <div class="chat__contact_info-last">{{ date }}</div>
          {{#if message}}<div class="chat__contact_info-message">{{ message }}</div>{{/if}}
          {{#if count}}<div class="chat__contact_info-count">{{ count }}</div>{{/if}}
        </div>
      </div>
    `;
  }
};

export default SidebarContact;
