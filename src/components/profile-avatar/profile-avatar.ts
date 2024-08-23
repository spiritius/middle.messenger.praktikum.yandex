import Block from '@/core/block';
import { ModalAvatar } from '@/components/modal';

class ProfileAvatar extends Block {
  init() {
    const Modal = new ModalAvatar();

    this.children = {
      ...this.children,
      Modal
    };
  }

  render() {
    return `
      <div>
        <div class="profile__content_avatar">
          <button
            type="button"
            class="profile__content_avatar_control"
            popovertarget="change-avatar" 
            popovertargetaction="show"
          >Change avatar</button>
        </div>

        {{{ Modal }}}
      </div>
    `;
  };
};

export default ProfileAvatar;
