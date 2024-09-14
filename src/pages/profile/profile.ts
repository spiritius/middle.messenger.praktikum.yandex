import Block from '@/core/block';
import { ProfileBack } from '@/components/profile-back';
import { ProfileAvatar } from '@/components/profile-avatar';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { testLogin, testEmail, testName, testPhone } from '@/utils/validation';
import { message } from '@/common/validationMessage';
import { logout, userinfo } from '@/services/auth';
import { connect } from '@/utils/connect';
import { UpdateUserData } from '@/api/types';
import { update } from '@/services/user';

const data = {
  avatar: {
    path: null
  },
  email: {
    name: 'email',
    type: 'email',
    disabled: 'true',
    autocomplete: 'on',
  },
  login: {
    name: 'login',
    type: 'text',
    disabled: 'true',
  },
  first_name: {
    name: 'first_name',
    type: 'text',
    disabled: 'true',
    autocomplete: 'on',
  },
  second_name: {
    name: 'second_name',
    type: 'text',
    disabled: 'true',
  },
  display_name: {
    name: 'display_name',
    type: 'text',
    disabled: 'true',
  },
  phone: {
    name: 'phone',
    type: 'tel',
    disabled: 'true',
    autocomplete: 'on',
  },
  changeBtn: {
    type: 'button',
    style: 'link',
    title: 'Change user data',
    id: 'profileChange'
  },
  changePasswordBtn: {
    type: 'button',
    style: 'link',
    title: 'Change password',
    id: 'passwordChange'
  },
  logoutBtn: {
    type: 'button',
    style: 'link text-error',
    title: 'Log out',
  },
  submit: {
    type: 'submit',
    style: 'primary',
    title: 'Save changes',
  },
  cancel: {
    type: 'button',
    style: 'link',
    title: 'Discard changes',
  }
};

// TODO
// disable inputs after save data

export class Profile extends Block {
  store: any;
  init() {
    const onBackBind = this.onBack.bind(this);
    const onChangeAvatarBind = this.onChangeAvatar.bind(this);
    const onChangePasswordBind = this.onChangePassword.bind(this);
    const onChangeDataBind = this.onChangeData.bind(this);
    const onSubmitBind = this.onSubmit.bind(this);
    const onCancelBind = this.onCancel.bind(this);

    const BackBtn = new ProfileBack({ onClick: onBackBind });
    const Avatar = new ProfileAvatar({ ...data.avatar, onClick: onChangeAvatarBind });
    const InputEmail = new Input({ ...data.email, onBlur: (e: Event) => this.handleInputChange(e, 'InputEmail', testEmail, message.email) });
    const InputLogin = new Input({ ...data.login, onBlur: (e: Event) => this.handleInputChange(e, 'InputLogin', testLogin, message.loginReg) });
    const InputFirstName = new Input({ ...data.first_name, onBlur: (e: Event) => this.handleInputChange(e, 'InputFirstName', testName, message.firstName) });
    const InputLastName = new Input({ ...data.second_name, onBlur: (e: Event) => this.handleInputChange(e, 'InputLastName', testName, message.lastName) });
    const InputDisplayName = new Input({ ...data.display_name });
    const InputPhone = new Input({ ...data.phone, onBlur: (e: Event) => this.handleInputChange(e, 'InputPhone', testPhone, message.phone) });
    const ChangeButton = new Button({ ...data.changeBtn, onClick: onChangeDataBind });
    const ChangePasswordButton = new Button({ ...data.changePasswordBtn, onClick: onChangePasswordBind });
    const LogOutButton = new Button({ ...data.logoutBtn, onClick: () => logout() });
    const SubmitButton = new Button({ ...data.submit, onClick: onSubmitBind });
    const CancelButton = new Button({ ...data.cancel, onClick: onCancelBind });

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
      ChangeButton,
      ChangePasswordButton,
      LogOutButton,
      SubmitButton,
      CancelButton
    };

    this.name = 'Profile';
    this.store = window.store.getState();
  }

  beforeMount(): void {
    this.getInfo();
  }

  getInfo() {
    userinfo()
      .then((response) => { 
        const fetchData = JSON.parse(response);
        if (fetchData) 
          Object.keys(fetchData).forEach((key) => {
            if (key in data) {
              if (key === 'avatar') 
                this.children.Avatar.setProps({ path: fetchData[key] });
              if (key === 'email') 
                this.children.InputEmail.setProps({ value: fetchData[key] });
              else if (key === 'login') 
                this.children.InputLogin.setProps({ value: fetchData[key] });
              else if (key === 'first_name') 
                this.children.InputFirstName.setProps({ value: fetchData[key] });
              else if (key === 'second_name') 
                this.children.InputLastName.setProps({ value: fetchData[key] });
              else if (key === 'display_name')
                this.children.InputDisplayName.setProps({ value: fetchData[key] });
              else if (key === 'phone') 
                this.children.InputPhone.setProps({ value: fetchData[key] });
            }
          });

        window.store.set({ userName: fetchData['display_name'] || fetchData['first_name'] });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onChangeData() {
    window.store.set({ profileDisabled: false });
    
    this.inputControls();
  }

  onCancel() {
    window.store.set({
      errorMessage: null,
      profileDisabled: true
    });

    this.inputControls();
  }

  inputControls() {
    const state = window.store.getState();
    console.log(state.profileDisabled);
    
    this.children.InputEmail.setProps({ disabled: state.profileDisabled.toString() });
    this.children.InputLogin.setProps({ disabled: state.profileDisabled.toString() });
    this.children.InputFirstName.setProps({ disabled: state.profileDisabled.toString() });
    this.children.InputLastName.setProps({ disabled: state.profileDisabled.toString() });
    this.children.InputDisplayName.setProps({ disabled: state.profileDisabled.toString() });
    this.children.InputPhone.setProps({ disabled: state.profileDisabled.toString() });
  }

  onBack() {
    window.router.go('/messenger');
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

    const target = document.querySelector('#profile');
    const output: UpdateUserData = {} as UpdateUserData;
    const form = target as HTMLFormElement;
    const formData = new FormData(form);
  
    formData.forEach((value, key) => {
      output[key] = value.toString();
    });

    update(output)
      .then(() => {
        window.store.set({
          errorMessage: null,
          profileDisabled: true
        });
    
        this.getInfo();
      });
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

  onChangePassword() {
    window.router.go('/password');
  }

  render() {
    return `
      <div class="profile">
        {{{ BackBtn }}}

        <div class="profile__content">
          {{{ Avatar }}}
          <div class="profile__content_name">{{{ userName }}}</div>
          <form class="profile__content_form" id="profile">
            {{#if errorMessage}}
            <p class="text-center text-error">{{{ errorMessage }}}</p>
            {{/if}}
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
          </form>
          <div class="profile__content_controls">
          {{#if profileDisabled}}
            <div class="profile__content_controls_row">
              {{{ ChangeButton }}}
            </div>
            <div class="profile__content_controls_row">
              {{{ ChangePasswordButton }}}
            </div>
            <div class="profile__content_controls_row">
              {{{ LogOutButton }}}
            </div>
          {{else}}
            <div class="profile__content_controls_row">
              {{{ SubmitButton }}}
            </div>
            <div class="profile__content_controls_row">
              {{{ CancelButton }}}
            </div>
          {{/if}}
          </div>
        </div>
      </div>
    `;
  }
};

const mapStateToPropsShort = ({ isLoading, errorMessage, profileDisabled, userName }: { [key: string]: any }) => ({ isLoading, errorMessage, profileDisabled, userName });

export default connect(mapStateToPropsShort)(Profile);
