import Block from '@/core/block';
import { Button } from '@/components/button';
import { FileInput } from '@/components/file';

class ModalAvatar extends Block {
  init() {
    const onSubmitBind = this.onSubmit.bind(this);

    const UploadFile = new FileInput({name: 'avatar', label: 'Choose a file on your computer' });
    const SubmitButton = new Button({style: 'primary', type: 'submit', title: 'Upload', onClick: onSubmitBind });

    this.children = {
      ...this.children,
      SubmitButton,
      UploadFile
    };
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('upload avatar');
  }

  render(): string {
    return `
      <div id="change-avatar" popover class="modal text-center">
        <form class="modal__form">
          <h4 class="modal__title">Upload photo</h4>
          {{{ UploadFile }}}
          {{{ SubmitButton }}}
        </form>
      </div>
    `;
  };
};

export default ModalAvatar;
