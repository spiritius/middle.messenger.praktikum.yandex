import Block from '@/core/block';
import { ProfileBack } from '@/components/profile-back';
import { ProfileAvatar } from '@/components/profile-avatar';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { testLogin, testEmail, testName, testPhone } from '@/utils/validation';
import { message } from '@/common/validationMessage';

const data = {
  email: {
    name: 'email',
    type: 'email',
    value: 'evan@domain.com',
    autocomplete: 'on',
  },
  login: {
    name: 'login',
    type: 'text',
    value: 'Evan99',
  },
  first_name: {
    name: 'first_name',
    type: 'text',
    value: 'Evan',
    autocomplete: 'on',
  },
  last_name: {
    name: 'second_name',
    type: 'text',
    value: 'Jones',
  },
  display_name: {
    name: 'display_name',
    type: 'text',
    value: 'Evan',
  },
  phone: {
    name: 'phone',
    type: 'tel',
    value: '+79099673030',
    autocomplete: 'on',
  },
  submitBtn: {
    type: 'button',
    style: 'primary',
    title: 'Save changes',
  },
};

class Profile extends Block {
  init() {
    const onSubmitBind = this.onSubmit.bind(this);
    const onBackBind = this.onBack.bind(this);
    const onChangeAvatarBind = this.onChangeAvatar.bind(this);

    const BackBtn = new ProfileBack({ onClick: onBackBind });
    const Avatar = new ProfileAvatar({ onClick: onChangeAvatarBind });
    const InputEmail = new Input({ ...data.email, onBlur: (e: Event) => this.handleInputChange(e, 'InputEmail', testEmail, message.email) });
    const InputLogin = new Input({ ...data.login, onBlur: (e: Event) => this.handleInputChange(e, 'InputLogin', testLogin, message.loginReg) });
    const InputFirstName = new Input({ ...data.first_name, onBlur: (e: Event) => this.handleInputChange(e, 'InputFirstName', testName, message.firstName) });
    const InputLastName = new Input({ ...data.last_name, onBlur: (e: Event) => this.handleInputChange(e, 'InputLastName', testName, message.lastName) });
    const InputDisplayName = new Input({ ...data.display_name });
    const InputPhone = new Input({ ...data.phone, onBlur: (e: Event) => this.handleInputChange(e, 'InputPhone', testPhone, message.phone) });
    const SubmitButton = new Button({ ...data.submitBtn, onClick: onSubmitBind });

    this.children = {
      ...this.children,
      BackBtn,
      Avatar,
      InputEmail,
      InputLogin,
      InputFirstName,
      InputLastName,
      InputDisplayName,
      InputPhone,
      SubmitButton,
    };

    this.name = 'Profile';
  }

  onBack() {
    console.log('going back');
  }
  onChangeAvatar() {
    console.log('change avatar');
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

  validateForm() {
    let isValid = true;

    const fields = [
      { name: 'InputEmail', validator: testEmail, errorText: message.email },
      { name: 'InputLogin', validator: testLogin, errorText: message.loginReg },
      { name: 'InputFirstName', validator: testName, errorText: message.firstName },
      { name: 'InputLastName', validator: testName, errorText: message.lastName },
      { name: 'InputPhone', validator: testPhone, errorText: message.phone },
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
      <div class="profile">
        {{{ BackBtn }}}

        <div class="profile__content">
          {{{ Avatar }}}
          <div class="profile__content_name">Evan</div>
          <form class="profile__content_form">
            <div class="profile__content_form_row">
              <span class="profile__content_form_row_title">E-mail</span>
              {{{ InputEmail }}}
            </div>
            <div class="profile__content_form_row">
              <span class="profile__content_form_row_title">Login</span>
              {{{ InputLogin }}}
            </div>
            <div class="profile__content_form_row">
              <span class="profile__content_form_row_title">First name</span>
              {{{ InputFirstName }}}
            </div>
            <div class="profile__content_form_row">
              <span class="profile__content_form_row_title">Last name</span>
              {{{ InputLastName }}}
            </div>
            <div class="profile__content_form_row">
              <span class="profile__content_form_row_title">Display name</span>
              {{{ InputDisplayName }}}
            </div>
            <div class="profile__content_form_row">
              <span class="profile__content_form_row_title">Phone</span>
              {{{ InputPhone }}}
            </div>
            <div class="profile__content_controls">
              <div class="profile__content_controls_row">
                {{{ SubmitButton}}}
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }
};

export default Profile;
