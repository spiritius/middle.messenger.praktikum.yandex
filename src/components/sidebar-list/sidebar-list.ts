import Block from '@/core/block';

class SidebarList extends Block {
  init() {
    this.name = 'SidebarList';
  }

  render() {
    return `
      <div class="chat__sidebar_contactslist">
        {{#each list}}
          <div class="chat__contact" data-id="{{ id }}">
            <div class="chat__contact_avatar">
              {{#if img}}<img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="{{title}}" />{{/if}}
            </div>
            <div class="chat__contact_info">
              <div class="chat__contact_info-name">{{ title }}</div>
              {{#if date}}<div class="chat__contact_info-last">{{ date }}</div>{{/if}}
              {{#if message}}<div class="chat__contact_info-message">{{ last_message }}</div>{{/if}}
              {{#if count}}<div class="chat__contact_info-count">{{ unread_count }}</div>{{/if}}
            </div>
          </div>
        {{/each}}
      </div>
    `;
  }
};

export default SidebarList;
