import Block from '@/core/block';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { testLogin, testEmail, testName, testPhone, testPassword } from '@/utils/validation';
import { message } from '@/common/validationMessage';
import { connect } from '@/utils/connect';
import { signup } from '@/services/auth';
import { SignUpRequestData } from '@/api/types';

const data = {
  email: {
    label: 'E-mail',
    type: 'email',
    name: 'email',
    required: 'true',
    value: 'icquser2@mail.ru'
  },
  login: {
    label: 'Login',
    type: 'text',
    name: 'login',
    required: 'true',
    value: 'icquser2'
  },
  first_name: {
    label: 'First name',
    type: 'text',
    name: 'first_name',
    required: 'false',
    value: 'Rom'
  },
  last_name: {
    label: 'Last name',
    type: 'text',
    name: 'second_name',
    required: 'false',
    value: 'Burning'
  },
  phone: {
    label: 'Phone',
    type: 'tel',
    name: 'phone',
    required: 'false',
    value: '+799901234567'
  },
  password: {
    label: 'Password',
    type: 'password',
    name: 'password',
    minlength: '8',
    required: 'true',
    autocomplete: 'off',
    value: '1234qwerA'
  },
  repeatPassword: {
    label: 'Repeat password',
    type: 'password',
    name: 'repeatpassword',
    minlength: '8',
    required: 'true',
    autocomplete: 'off',
    value: '1234qwerA'
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

export class Registration extends Block {
  init() {
    const onSubmitBind = this.onSubmit.bind(this);
    const onLoginBind = this.onLogin.bind(this);
    const onInputRepeatPasswordChangeBind = this.onInputRepeatPasswordChange.bind(this);

    const InputEmail = new Input({ ...data.email, onBlur: (e: Event) => this.handleInputChange(e, 'InputEmail', testEmail, message.email) });
    const InputLogin = new Input({ ...data.login, onBlur: (e: Event) => this.handleInputChange(e, 'InputLogin', testLogin, message.loginReg) });
    const InputFirstName = new Input({ ...data.first_name, onBlur: (e: Event) => this.handleInputChange(e, 'InputFirstName', testName, message.firstName) });
    const InputLastName = new Input({ ...data.last_name, onBlur: (e: Event) => this.handleInputChange(e, 'InputLastName', testName, message.lastName) });
    const InputPhone = new Input({ ...data.phone, onBlur: (e: Event) => this.handleInputChange(e, 'InputPhone', testPhone, message.phone) });
    const InputPassword = new Input({ ...data.password, onBlur: (e: Event) => this.handleInputChange(e, 'InputPassword', testPassword, message.passwordReg) });
    const InputRepeatPassword = new Input({ ...data.repeatPassword, onBlur: onInputRepeatPasswordChangeBind });
    const CreateButton = new Button({ ...data.createBtn, onClick: onSubmitBind });
    const LoginButton = new Button({ ...data.loginBtn, onClick: onLoginBind });

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
    const output: SignUpRequestData = {} as SignUpRequestData;

    formData.forEach((value, key) => {
      output[key] = value.toString();
    });

    console.log(output);
    signup(output);
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

  onInputRepeatPasswordChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target!.value;
    const pwdInput = this.children.InputPassword.element as HTMLInputElement;
    const pwdValue = pwdInput!.querySelector('input')!.value;

    if(value !== pwdValue)
      this.children.InputRepeatPassword.setProps({ error: true, errorText: message.passwordMatch, value, style: 'error' });
    else 
      this.children.InputRepeatPassword.setProps({ error: false, value, style: '' });
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

  onLogin() {
    window.router.go('/');
  }

  render() {
    return `
        <form class="form {{#if isLoading}}loading{{/if}}">
          <h1 class="form__title">Sign Up</h1>
          {{#if errorMessage}}
          <small class="text-center text-error">{{{errorMessage}}}</small>
          {{/if}}
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

const mapStateToPropsShort = ({ isLoading, errorMessage }: { [key: string]: any }) => ({ isLoading, errorMessage });

export default connect(mapStateToPropsShort)(Registration);
