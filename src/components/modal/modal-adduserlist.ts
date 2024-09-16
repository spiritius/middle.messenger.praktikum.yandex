import Block from '@/core/block';

class ModalAddUserList extends Block {

  render(): string {
    return `
      <div id="search-user-list" popover class="modal text-center">
        <form class="modal__form">
          <h4 class="modal__title">Found users:</h4>
          <ul class="text-left">
          {{#each list}}
            <li>{{ first_name }} {{ second_name }} ({{ login }})</li>
          {{/each}}
          </ul>
        </form>
      </div>
    `;
  };
};

export default ModalAddUserList;
