import Block from '@/core/block';

class SidebarList extends Block {
  init() {
    this.name = 'SidebarList';
  }

  render() {
    return `
      <div class="chat__sidebar_contactslist">
        {{#each list}}
          <div class="chat__contact">
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
        {{/each}}
      </div>
    `;
  }
};

export default SidebarList;
