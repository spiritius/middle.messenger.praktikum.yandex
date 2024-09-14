import Block from '@/core/block';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Dropdown, DropdownSettings } from '@/components/dropdown';
import { SidebarList } from '@/components/sidebar-list';
import { MessageStack } from '@/components/message-stack';
import { ModalAddContact, ModalRemoveContact } from '@/components/modal';
import { addChat, getChats } from '@/services/chat';
import { connect } from '@/utils/connect';
import { AddChat } from '@/api/types';

export class Chat extends Block {
  chats: object[] | undefined | unknown;
  init() {

    const addChatBind = this.addChat.bind(this);
    const onChatClickBind = this.onChatClick.bind(this);

    const modalContactAdd = new ModalAddContact({ onSubmit: addChatBind });
    const modalContactRemove = new ModalRemoveContact();

    const HeaderOptionBtn = new Button({ type: 'button', style: 'icon icon-options', title: '' });
    const HeaderOptionDropdown = new DropdownSettings();

    const ContactOptionsBtn = new Button({ type: 'button', style: 'icon icon-menu', title: '' });
    const ContactOptionsDropdown = new Dropdown({ position: 'top-right', list: this.props.contactOptions });

    const ContactAttachBtn = new Button({ type: 'button', style: 'icon icon-attach', title: '' });
    const ContactAttachDropdown = new Dropdown({ position: 'bottom-left', list: this.props.attachOptions });

    const SearchInput = new Input({ type: 'text', name: 'search', placeholder: 'Search', style: 'input__control--sidebar' });
    const SearchButton = new Button({ type: 'submit', name: 'search-submit', style: 'icon icon-search' });

    const MessageList = new MessageStack({ list: this.props.messages });
    const MessageSubmitButton = new Button({ type: 'submit', style: 'icon icon-send btn-send', title: '' });

    const SidebarContactsList = new SidebarList({ list: this.props.contacts, onClick: onChatClickBind });

    this.children = {
      ...this.children,
      //@ts-expect-error wft
      modalContactAdd,
      modalContactRemove,
      HeaderOptionBtn,
      HeaderOptionDropdown,
      SearchInput,
      SearchButton,
      SidebarContactsList,
      ContactOptionsBtn,
      ContactOptionsDropdown,
      MessageList,
      MessageSubmitButton,
      ContactAttachBtn,
      ContactAttachDropdown
    };

    this.name = 'Chat';
    this.chats = [];
    this.state = window.store.getState();
    this.props.currentChat = null;
  }

  beforeMount(): void {
    this.updateChatList();
    
    userinfo()
      .then((response) => {
        const data: UserDTO | any = response;
        window.store.set({ userId: data.id });
        this.state = window.store.getState();
      });
  }

  addChat(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLFormElement;
    const form = target!.form;
    
    const output: AddChat = {
      title: form.querySelector('input').value
    };

    addChat(output)
      .then(() => {
        this.updateChatList();
      });
  }

  updateChatList(): void {
    getChats()
      .then((response) => {
        const data: any = response;
        this.children.SidebarContactsList.setProps({ list: data });
        this.chats = data;
      });
  }

  onChatClick(e: Event) {
    e.stopPropagation();
    console.log(e);
    
    const el = e.target as HTMLElement;
    if (!el.dataset.id) return;
    
    const data = {
      chatid: el.dataset.id,
      user: {
        id: this.state.userId
      }
    };
    openChat(data);
    this.props.currentChat = this.chats?.find((item: any) => item.id === +data.chatid);
  }

  render() {
    return `
    <div class="chat__wrapper">
      <div class="chat__sidebar">
        <div class="chat__sidebar_header">
          <div class="chat__sidebar_header_options">
            {{{ HeaderOptionBtn }}}
            {{{ HeaderOptionDropdown }}}
          </div>
          <form class="chat__sidebar_header_search">
            {{{ SearchInput }}}
            {{{ SearchButton }}}
          </form>
        </div>
        {{{ SidebarContactsList }}}
      </div>

      <div class="chat__content" id="chat-content">
        {{#if currentChatContact}}
        <div class="chat__content_header">
          <div class="chat__content_header-avatar">
            {{#if currentChatContact.avatar}}
            <img src="{{currentChatContact.avatar}}" alt="{{currentChatContact.name}}">
            {{/if}}
          </div>
          <div class="chat__content_header-name">{{currentChatContact.name}}</div>
          <div class="chat__content_header-settings">
            {{{ ContactOptionsBtn }}}
            {{{ ContactOptionsDropdown }}}
          </div>
        </div>

        {{{ MessageList }}}

        <form class="chat__content_form">
          <div class="chat__content_form_attach">
            {{{ ContactAttachBtn }}}
            {{{ ContactAttachDropdown }}}
          </div>
          <div class="chat__content_form_text">
            <textarea class="textarea__control" name="message" id="message" rows="1" placeholder="What's up?"></textarea>
          </div>
          {{{ MessageSubmitButton }}}
        </form>

        {{else}}
        
        <div class="chat__content_empty">
          <p>Click a chat to start messaging</p>
        </div>

        {{/if}}
      </div>
      {{{ modalContactAdd }}}
      {{{ modalContactRemove }}}
    </div>
    `;
  }
};

const mapStateToPropsShort = ({ isLoading, errorMessage, popoverIsOpen }: { [key: string]: any }) => ({ isLoading, errorMessage, popoverIsOpen });

export default connect(mapStateToPropsShort)(Chat);
