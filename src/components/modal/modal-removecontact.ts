import Block from '@/core/block';
import { Button } from '@/components/button';

const data = {
  cancel: {
    style: 'light',
    type: 'button',
    title: 'Cancel',
    attributes: 'popovertarget="remove-contact" popovertargetaction="hide"'
  },
  submit: {
    style: 'primary',
    type: 'submit',
    title: 'Remove',
  }
};

class ModalAddContact extends Block {
  init() {
    const onSubmitBind = this.onSubmit.bind(this);

    const CancelButton = new Button({ ...data.cancel });
    const SubmitButton = new Button({ ...data.submit, onClick: onSubmitBind });

    this.children = {
      ...this.children,
      SubmitButton,
      CancelButton
    };
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('confirm delete user');
  }

  render(): string {
    return `
      <div id="remove-contact" popover class="modal text-center">
        <form class="modal__form">
          <h4 class="modal__title">Remove this contact?</h4>
          <div class="modal__descr">
            <p>This contact will be removed from your contacts and chat history will be cleaned.</p>
          </div>
          <div class="modal__buttons">
            {{{ CancelButton }}}
            {{{ SubmitButton }}}
          </div>
        </form>
      </div>
    `;
  };
};

export default ModalAddContact;
