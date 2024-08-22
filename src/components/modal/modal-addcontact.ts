import Block from '@/core/block';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

const data = {
  input: {
    type: 'text',
    label: 'Login',
    name: 'user-login',
    style: 'text-left',
  },
  submit: {
    style: 'primary',
    type: 'submit',
    title: 'Add',
  }
};

class ModalAddContact extends Block {
  init() {
    const onSubmitBind = this.onSubmit.bind(this);

    const InputUser = new Input({ ...data.input });
    const SubmitButton = new Button({ ...data.submit, onClick: onSubmitBind });

    this.children = {
      ...this.children,
      SubmitButton,
      InputUser
    };
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('upload avatar');
  }

  render(): string {
    return `
      <div id="add-contact"
          popover: class="modal text-center">,
        <form class="modal__form">
          <h4 class="modal__title">Add new contact</h4>
          {{{ InputUser }}}
          {{{ SubmitButton }}}
        </form>
      </div>
    `;
  };
};

export default ModalAddContact;
