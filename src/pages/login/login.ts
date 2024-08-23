import Block from '@/core/block';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { testLength, testEmptyPassword } from '@/utils/validation';
import { message } from '@/common/validationMessage';

const data = {
  login: {
    label: 'Login', 
    type: 'text', 
    name: 'login', 
    required: 'true'
  },
  password: {
    label: 'Password', 
    type: 'password', 
    name: 'password', 
    required: 'true', 
    autocomplete: 'off'
  },
  submit: {
    title: 'Log in', 
    type: 'button', 
    style: 'primary'
  },
  create: {
    title: 'Create account', 
    type: 'button', 
    style: 'link'
  }
};

class Login extends Block {
  init() {
    const onSubmitBind = this.onSubmit.bind(this);

    const InputLogin = new Input({ ...data.login, onBlur: (e: Event) => this.handleInputChange(e, 'InputLogin', testLength, message.login) });
    const InputPassword = new Input({ ...data.password, onBlur: (e: Event) => this.handleInputChange(e, 'InputPassword', testEmptyPassword, message.password) });
    const SubmitButton = new Button({ ...data.submit, onClick: onSubmitBind });
    const CreateAccountButton = new Button(data.create);

    this.children = {
      ...this.children,
      InputLogin,
      InputPassword,
      SubmitButton,
      CreateAccountButton
    };

    this.name = 'Login';
  }

  onSubmit(e: Event) {
    e.preventDefault();

    const isValid = this.validateForm();

    if (!isValid) return;

    const target = e.target as HTMLFormElement;
    const form = target!.form;
    const formData = new FormData(form);
    const output: {[key: string]: FormDataEntryValue} = {};

    formData.forEach((value, key) => {
      output[key] = value;
    });
    
    console.log(output);
  }

  handleInputChange(e: Event, name: string, validator: (value: string) => boolean, errorText: string) {
    const target = e.target as HTMLInputElement;
    const value = target!.value;

    const inputComponent = this.children[name];

    if (!validator(value)) 
      inputComponent.setProps({ error: true, errorText, value, style: 'error' });
    else 
      inputComponent.setProps({ error: false, value, style: '' });
  }

  validateForm() {
    let isValid = true;

    const fields = [
      { name: 'InputLogin', validator: testLength, errorText: message.login },
      { name: 'InputPassword', validator: testEmptyPassword, errorText: message.password },
    ];
  
    fields.forEach(field => {
      const inputComponent = this.children[field.name];
      const value = inputComponent.props.value || '';
  
      if (!field.validator(value)) {
        inputComponent.setProps({ error: true, errorText: field.errorText, value, style: 'error' });
        isValid = false;
      } else 
        inputComponent.setProps({ error: false, value, style: '' });
    });

    return isValid;
  }

  render() {
    return `
        <form class="form">
          <h1 class="form__title">Enter</h1>
          {{{ InputLogin }}}
          {{{ InputPassword }}}
          <div class="form__buttons">
            {{{ SubmitButton }}}
            {{{ CreateAccountButton }}}
          </div>
        </form>
    `;
  }
};

export default Login;
