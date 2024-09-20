import Block from '@/core/block';
import { Button } from '@/components/button';

class DropdownChatOptions extends Block {
  init() {
    this.name = 'DropdownChatOptions';

    const adduserClickBind = this.addUserPopover.bind(this);
    const updateChatAvatarBind = this.updateChatAvatar.bind(this);

    const ButtonDeleteChat = new Button({ title: 'Delete chat', icon: 'delete', class: 'dropdown__btn', onClick: this.props.onClick });
    const ButtonAddUser = new Button({ title: 'Add user', icon: 'user', class: 'dropdown__btn', onClick: adduserClickBind });
    const ButtonUpdateAvatar = new Button({ title: 'Update avatar', icon: 'media', class: 'dropdown__btn', onClick: updateChatAvatarBind });

    this.children = {
      ...this.children,
      ButtonAddUser,
      ButtonDeleteChat,
      ButtonUpdateAvatar
    };
  }

  addUserPopover() {
    const popover = document.querySelector('#add-user') as HTMLDialogElement;
    popover.showPopover();
  }
  updateChatAvatar() {
    const popover = document.querySelector('#change-chat-avatar') as HTMLDialogElement;
    popover.showPopover();
  }


  render() {
    return `
      <div class="dropdown dropdown--top-right" id="dropdwon-chat-options">
        <ul class="dropdown__list">
          <li class="dropdown__item">
            <button type="button" class="dropdown__btn" id="chat-list-user" popovertarget="chat-user-list" popovertargetaction="show">
              <span class="icon icon-options"></span>
              Users list
            </button>
          </li>
          <li class="dropdown__item">
            {{{ ButtonAddUser }}}
          </li>
          <li>
            {{{ ButtonUpdateAvatar }}}
          </li>
          <li class="dropdown__item">
            {{{ ButtonDeleteChat }}}
        </ul>
      </div>
    `;
  }
};

export default DropdownChatOptions;
