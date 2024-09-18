import Block from '@/core/block';
import { FileInput } from '@/components/file';
import { connect } from '@/utils/connect';
import { updateChatAvatar } from '@/services/chat';


export class ModalChatAvatar extends Block {
  init() {
    const onChangeBind = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    document.addEventListener('click', this.handleClick);

    const UploadFile = new FileInput({ name: 'chat-avatar', label: 'Choose a file on your computer', onChange: onChangeBind });

    this.children = {
      ...this.children,
      UploadFile
    };
  }

  handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (target.id === 'uploadButton') 
      this.onSubmit(e);
  }

  onChange(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const submitBtn = this.element?.querySelector('#uploadButton');
    const errorPlaceholder = this.element?.querySelector('#avatarError');
    if (errorPlaceholder)
      errorPlaceholder.textContent = '';
    
    // validation
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

      if (!validTypes.includes(file.type)) {
        if (errorPlaceholder)
          errorPlaceholder.textContent = 'Invalid file type. Please upload an image in JPG, PNG, or GIF format';
        return;
      }

      const maxSizeMB = 5;
      if (file.size > maxSizeMB * 1024 * 1024) {
        if (errorPlaceholder)
          errorPlaceholder.textContent = 'File size exceeds the 5MB limit';
        return;
      }

      submitBtn?.removeAttribute('disabled');
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const state = window.store.getState();
    const popover = document.querySelector('#change-chat-avatar') as HTMLDialogElement;
    const form = this.element?.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);
    const avatar = formData.get('chat-avatar') as File;

    formData.append('chatId', state.chatId);
    formData.append('avatar', avatar);
    formData.delete('chat-avatar');

    updateChatAvatar(formData)
      .then((response) => {
        const data: any = response;
        if (data?.avatar)
          popover.hidePopover();
      });
  }

  render(): string {
    return `
      <div id="change-chat-avatar" popover class="modal text-center">
        <div class="modal__content">
          <form class="modal__form">
            <h4 class="modal__title">Upload photo</h4>
            {{#if errorMessage}}
            <small class="text-error">{{{errorMessage}}}</small>
            {{/if}}
            <div>
              {{{ UploadFile }}}
              <small class="text-error" id="avatarError"></small>
            </div>
            <button type="button" id="uploadButton" class="btn btn-primary" disabled>Upload</button>
          </form>
        </div>
      </div>
    `;
  };
};

const mapStateToPropsShort = ({ isLoading, errorMessage }: { [key: string]: any }) => ({ isLoading, errorMessage });

export default connect(mapStateToPropsShort)(ModalChatAvatar);
