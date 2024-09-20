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
              {{#if avatar}}<img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="{{title}}" />{{/if}}
            </div>
            <div class="chat__contact_info">
              <div class="chat__contact_info-name">{{ title }}</div>
              {{#if last_message}}
                {{#if last_message.time}}<div class="chat__contact_info-last"></div>{{/if}}
                <div class="chat__contact_info-message"></div>
              {{/if}}
              {{#if unread_count}}<div class="chat__contact_info-count">{{ unread_count }}</div>{{/if}}
            </div>
          </div>
        {{/each}}
      </div>
    `;
  }
};

export default SidebarList;
