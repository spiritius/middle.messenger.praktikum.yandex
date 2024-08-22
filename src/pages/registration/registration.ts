import Block from '@/core/block';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { testLogin, testEmail, testName, testPhone, testPassword } from '@/utils/validation';
import { message } from '@/common/validationMessage';

const data = {
  email: {
    label: 'E-mail',
    type: 'email',
    name: 'email',
    required: 'true',
  },
  login: {
    label: 'Login',
    type: 'text',
    name: 'login',
    required: 'true',
  },
  first_name: {
    label: 'First name',
    type: 'text',
    name: 'first_name',
    required: 'false',
  },
  last_name: {
    label: 'Last name',
    type: 'text',
    name: 'second_name',
    required: 'false',
  },
  phone: {
    label: 'Phone',
    type: 'tel',
    name: 'phone',
    required: 'false',
  },
  password: {
    label: 'Password',
    type: 'password',
    name: 'password',
    minlength: '8',
    required: 'true',
    autocomplete: 'off',
  },
  repeatPassword: {
    label: 'Repeat password',
    type: 'password',
    name: 'repeatpassword',
    minlength: '8',
    required: 'true',
    autocomplete: 'off',
  },
  createBtn: {
    title: 'Create account',
    type: 'submit',
    style: 'primary',
  },
  loginBtn: {
    title: 'Log in',
    type: 'button',
    style: 'link',
  }
};

class Registration extends Block {
  init() {
    const onSubmitBind = this.onSubmit.bind(this);
    const onInputRepeatPasswordChangeBind = this.onInputRepeatPasswordChange.bind(this);

    const InputEmail = new Input({...data.email, onBlur: (e: Event) => this.handleInputChange(e, 'InputEmail', testEmail, message.email) });
    const InputLogin = new Input({...data.login, onBlur: (e: Event) => this.handleInputChange(e, 'InputLogin', testLogin, message.loginReg)});
    const InputFirstName = new Input({...data.first_name, onBlur: (e: Event) => this.handleInputChange(e, 'InputFirstName', testName, message.firstName) });
    const InputLastName = new Input({...data.last_name, onBlur: (e: Event) => this.handleInputChange(e, 'InputLastName', testName, message.lastName) });
    const InputPhone = new Input({...data.phone, onBlur: (e: Event) => this.handleInputChange(e, 'InputPhone', testPhone, message.phone) });
    const InputPassword = new Input({...data.password, onBlur: (e: Event) => this.handleInputChange(e, 'InputPassword', testPassword, message.passwordReg) });
    const InputRepeatPassword = new Input({...data.repeatPassword, onBlur: onInputRepeatPasswordChangeBind});
    const CreateButton = new Button({...data.createBtn, onClick: onSubmitBind});
    const LoginButton = new Button(data.loginBtn);

    this.children = {
      ...this.children,
      InputEmail,
      InputLogin,
      InputFirstName,
      InputLastName,
      InputPhone,
      InputPassword,
      InputRepeatPassword,
      CreateButton,
      LoginButton
    };

    this.name = 'Registration';
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
      inputComponent.setProps({error: true, errorText, value, style: 'error'});
    else 
      inputComponent.setProps({error: false, value, style: ''});
  }

  onInputRepeatPasswordChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target!.value;
    const pwdInput = this.children.InputPassword.element as HTMLInputElement;
    const pwdValue = pwdInput!.querySelector('input')!.value;

    if(value !== pwdValue)
      this.children.InputRepeatPassword.setProps({error: true, errorText: message.passwordMatch, value, style: 'error'});
    else 
      this.children.InputRepeatPassword.setProps({error: false, value, style: ''});
  }

  validateForm() {
    let isValid = true;

    const fields = [
      { name: 'InputEmail', validator: testEmail, errorText: message.email },
      { name: 'InputLogin', validator: testLogin, errorText: message.loginReg },
      { name: 'InputFirstName', validator: testName, errorText: message.firstName },
      { name: 'InputLastName', validator: testName, errorText: message.lastName },
      { name: 'InputPhone', validator: testPhone, errorText: message.phone },
      { name: 'InputPassword', validator: testPassword, errorText: message.passwordReg },
      { name: 'InputRepeatPassword', validator: (value: string) => value === this.children.InputPassword.props.value, errorText: message.passwordMatch }
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
          <h1 class="form__title">Sign Up</h1>
          {{{ InputEmail }}}
          {{{ InputLogin }}}
          {{{ InputFirstName }}}
          {{{ InputLastName }}}
          {{{ InputPhone }}}
          {{{ InputPassword }}}
          {{{ InputRepeatPassword }}}
          <div class="form__buttons">
            {{{ CreateButton }}}
            {{{ LoginButton }}}
          </div>
        </form>

    `;
  }
};

export default Registration;
