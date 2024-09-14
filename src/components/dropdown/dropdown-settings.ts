import Block from '@/core/block';
import { logout } from '@/services/auth';

class DropdownSettings extends Block {
  init() {
    this.name = 'DropdownSettings';

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleClick = this.handleClick.bind(this);

    document.addEventListener('click', this.handleClick);
  }

  handleLogoutClick() {
    logout();
  }

  handleProfileClick() {
    window.router.go('/settings');
  }

  handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (target.id === 'logout') 
      this.handleLogoutClick();
    if (target.id === 'profile') 
      this.handleProfileClick();
  }

  render() {
    return `
      <div class="dropdown dropdown--top-left">
        <ul class="dropdown__list">
          <li class="dropdown__item">
            <button class="dropdown__btn" type="button" id="profile">
              <span class="icon icon-user"></span>
              Profile
            </button>
          </li>
          <li class="dropdown__item">
            <button class="dropdown__btn" type="button" popovertarget="add-chat" popovertargetaction="show">
              <span class="icon icon-add"></span>
              Add chat
            </button>
          </li>
          <li class="dropdown__item">
            <button class="dropdown__btn accent-error" type="button" id="logout">
              <span class="icon icon-exit"></span>
              Log out
            </button>
          </li>
        </ul>
      </div>
    `;
  }
};

export default DropdownSettings;
