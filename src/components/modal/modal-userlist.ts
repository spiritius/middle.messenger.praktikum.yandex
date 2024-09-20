import Block from '@/core/block';

class ModalUserList extends Block {

  render(): string {
    return `
      <div id="chat-user-list" popover class="modal text-center">
        <form class="modal__form">
          <h4 class="modal__title">User in this chat</h4>
          <ul class="text-left">
          {{#each list}}
            <li>{{ first_name }} {{ second_name }} <b class="text-warning">{{login}}</b> | <b class="text-error delete" data-id="{{id}}">Delete user</b></li>
          {{/each}}
          </ul>
        </form>
      </div>
    `;
  };
};

export default ModalUserList;
