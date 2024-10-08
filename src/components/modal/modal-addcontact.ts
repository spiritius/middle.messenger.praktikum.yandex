import Block from '@/core/block';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { connect } from '@/utils/connect';

const data = {
  input: {
    type: 'text',
    label: 'Title',
    name: 'title',
    style: 'text-left',
  },
  submit: {
    style: 'primary',
    type: 'button',
    title: 'Add',
  }
};

export class ModalAddContact extends Block {
  init() {
    const onChangeBind = this.onChange.bind(this);

    const InputTitle = new Input({ ...data.input, onInput: onChangeBind });
    const SubmitButton = new Button({ ...data.submit, disabled: 'true', onClick: this.props.onSubmit });

    this.children = {
      ...this.children,
      SubmitButton,
      InputTitle
    };
  }

  onChange(e: Event) {
    const target = e.target as HTMLFormElement;
    
    if (target.value.length > 0)
      this.children['SubmitButton'].setProps({ disabled: 'false' });
    else
      this.children['SubmitButton'].setProps({ disabled: 'true' });
  }

  render(): string {
    return `
      <div id="add-chat" popover class="modal text-center {{#if isLoading}}loading{{/if}}">
        <form class="modal__form" onkeydown="return event.key != 'Enter';">
          <h4 class="modal__title">Add new chat</h4>
          {{#if errorMessage}}
          <small class="text-center text-error">{{{errorMessage}}}</small>
          {{/if}}
          {{{ InputTitle }}}
          {{{ SubmitButton }}}
        </form>
      </div>
    `;
  };
};

const mapStateToPropsShort = ({ isLoading, errorMessage }: { [key: string]: any }) => ({ isLoading, errorMessage });

export default connect(mapStateToPropsShort)(ModalAddContact);
