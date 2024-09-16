import Block from '@/core/block';
import { logout } from '@/services/auth';
import { Button } from '@/components/button';

class DropdownSettings extends Block {
  init() {
    this.name = 'DropdownSettings';

    const profileClickBind = this.profileClick.bind(this);
    const addChatClickBind = this.addChatClick.bind(this);
    const logoutBind = this.onLogout.bind(this);

    const ButtonProfile = new Button({ title: 'Profile', icon: 'user', class: 'dropdown__btn', onClick: profileClickBind });
    const ButtonAddChat = new Button({ title: 'Add chat', icon: 'add', class: 'dropdown__btn', onClick: addChatClickBind });
    const ButtonLogout = new Button({ title: 'Logout', icon: 'exit', class: 'dropdown__btn accent-error', onClick: logoutBind });

    this.children = {
      ...this.children,
      ButtonProfile,
      ButtonAddChat,
      ButtonLogout
    };
  }

  addChatClick() {
    const popover = document.querySelector('#add-chat') as HTMLDialogElement;
    popover.showPopover();
  }
  profileClick() {
    window.router.go('/settings');
  }
  onLogout() {
    logout();
  }

  render() {
    return `
      <div class="dropdown dropdown--top-left" id="dropdown-settings">
        <ul class="dropdown__list">
          <li class="dropdown__item">
            {{{ ButtonProfile }}}
          </li>
          <li class="dropdown__item">
            {{{ ButtonAddChat }}}
          </li>
          <li class="dropdown__item">
            {{{ ButtonLogout }}}
          </li>
        </ul>
      </div>
    `;
  }
};

export default DropdownSettings;
