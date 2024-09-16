import Block from '@/core/block';
import { FileInput } from '@/components/file';
import { uploadAvatar } from '@/services/user';
import { connect } from '@/utils/connect';


export class ModalAvatar extends Block {
  init() {
    const onChangeBind = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    document.addEventListener('click', this.handleClick);

    const UploadFile = new FileInput({ name: 'avatar', label: 'Choose a file on your computer', onChange: onChangeBind });

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

    console.log('submit');

    const form = this.element?.querySelector('form') as HTMLFormElement;
    const fileInput = form?.querySelector('input[name="avatar"]') as any;

    const formData = new FormData(form);
    formData.append('avatar', fileInput);

    uploadAvatar(formData);
  }

  render(): string {
    return `
      <div id="change-avatar" popover class="modal text-center">
        <div class="modal__content">
          <form class="modal__form">
            <h4 class="modal__title">Upload photo</h4>
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

export default connect(mapStateToPropsShort)(ModalAvatar);
