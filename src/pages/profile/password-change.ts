import Block from '@/core/block';
import { ProfileBack } from '@/components/profile-back';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { testPassword, testEmptyPassword } from '@/utils/validation';
import { message } from '@/common/validationMessage';
import { changePassword } from '@/services/user';
import { UpdateUserPassword } from '@/api/types';
import { connect } from '@/utils/connect';

const data = {
  currentPwd: {
    name: 'oldPassword',
    type: 'password',
    autocomplete: 'current-password',
  },
  newPwd: {
    name: 'newPassword',
    type: 'password',
    autocomplete: 'new-password',
  },
  repeatNewPwd: {
    name: 'repeatpassword',
    type: 'password',
    autocomplete: 'new-password',
  },
  submit: {
    type: 'submit',
    style: 'primary',
    title: 'Save changes',
    id: 'profileBack',
  }
};

export class Profile extends Block {
  init() {
    const onBackBind = this.onBack.bind(this);
    const onSubmitBind = this.onSubmit.bind(this);
    const onRepeatNewPwdBind = this.onRepeatNewPwd.bind(this);

    const BackBtn = new ProfileBack({ onClick: onBackBind });
    const InputCurrenPwd = new Input({ ...data.currentPwd, onBlur: (e: Event) => this.handleInputChange(e, 'InputCurrenPwd', testEmptyPassword, message.password) });
    const InputNewPwd = new Input({ ...data.newPwd, onBlur: (e: Event) => this.handleInputChange(e, 'InputNewPwd', testPassword, message.passwordReg) });
    const InputRepeatNewPwd = new Input({ ...data.repeatNewPwd, onBlur: onRepeatNewPwdBind });
    const SubmitButton = new Button({ ...data.submit, onClick: onSubmitBind });

    this.children = {
      ...this.children,
      BackBtn,
      InputCurrenPwd,
      InputNewPwd,
      InputRepeatNewPwd,
      SubmitButton
    };

    this.name = 'Profile';
  }

  onBack() {
    window.router.back();
  }

  onRepeatNewPwd(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target!.value;
    const pwdInput = this.children.InputNewPwd.element as HTMLInputElement;
    const pwdValue = pwdInput!.querySelector('input')!.value;

    if(value !== pwdValue)
      this.children.InputRepeatNewPwd.setProps({ error: true, errorText: message.passwordMatch, value, style: 'error' });
    else 
      this.children.InputRepeatNewPwd.setProps({ error: false, value, style: '' });
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

    const output: UpdateUserPassword = {
      oldPassword: formData.get('oldPassword') as string,
      newPassword: formData.get('newPassword') as string
    };

    changePassword(output);
  }

  validateForm() {
    let isValid = true;

    const fields = [
      { name: 'InputCurrenPwd', validator: testEmptyPassword, errorText: message.password },
      { name: 'InputNewPwd', validator: testPassword, errorText: message.passwordReg },
      { name: 'InputRepeatNewPwd', validator: (value: string) => value === this.children.InputNewPwd.props.value, errorText: message.passwordMatch }
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

        <div class="profile__content {{#if isLoading}}loading{{/if}}">
          <div class="profile__content_name">Changing password</div>
          {{#if successMessage}}
          <small class="text-center text-success">{{{successMessage}}}</small>
          {{/if}}
          {{#if errorMessage}}
          <small class="text-center text-error">{{{errorMessage}}}</small>
          {{/if}}
          <form class="profile__content_form">
            <div class="profile__content_form_row">
              <span class="profile__content_form_row_title">Current password</span>
              {{{ InputCurrenPwd }}}
            </div>
            <div class="profile__content_form_row">
              <span class="profile__content_form_row_title">New password</span>
              {{{ InputNewPwd }}}
            </div>
            <div class="profile__content_form_row">
              <span class="profile__content_form_row_title">Repeat new password</span>
              {{{ InputRepeatNewPwd }}}
            </div>
            <div class="profile__content_controls">
              <div class="profile__content_controls_row">
                {{{ SubmitButton }}}
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }
};

const mapStateToPropsShort = ({ isLoading, errorMessage, successMessage }: { [key: string]: any }) => ({ isLoading, errorMessage, successMessage });

export default connect(mapStateToPropsShort)(Profile);
