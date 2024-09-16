import Block from '@/core/block';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Dropdown, DropdownSettings, DropdownChatOptions } from '@/components/dropdown';
import { SidebarList } from '@/components/sidebar-list';
import { MessageStack } from '@/components/message-stack';
import { ModalAddContact, ModalAddUser, ModalAddUserList, ModalRemoveContact, ModalUserList } from '@/components/modal';
import { addChat, addUser, closeChat, deleteChat, deleteUser, getChatUsers, getChats, openChat } from '@/services/chat';
import { connect } from '@/utils/connect';
import { AddChat, UserDTO, ChatDTO, ChatMessage, AddUserToChat, SearchUser, ChatUser, ChatId } from '@/api/types';
import { userinfo } from '@/services/auth';
import { searchUser } from '@/services/user';

export class Chat extends Block {
  chats: object[] | undefined | null;
  state: any;
  currentChat: ChatDTO | any;
  
  init() {

    const addChatBind = this.addChat.bind(this);
    const onChatClickBind = this.onChatClick.bind(this);
    const onAddUserToChatBind = this.onAddUserToChat.bind(this);
    const onChatDeleteBind = this.onChatDelete.bind(this);
    const onSearchSubmitBind = this.onSearchSubmit.bind(this);

    this.name = 'Chat';
    this.chats = [];
    this.state = window.store.getState();
    this.props.currentChat = null;
    this.props.chatlist = [];
    this.props.messages = [];

    const modalContactAdd = new ModalAddContact({ onSubmit: addChatBind });
    const modalContactRemove = new ModalRemoveContact();
    const modalAddUser = new ModalAddUser({ onSubmit: onAddUserToChatBind });
    const modalChatUserList = new ModalUserList({ list: [] });
    const modalSearchUserList = new ModalAddUserList({ list: [] });

    const HeaderOptionBtn = new Button({ type: 'button', style: 'icon icon-options', title: '' });
    const HeaderOptionDropdown = new DropdownSettings();

    const ContactOptionsBtn = new Button({ type: 'button', style: 'icon icon-menu', title: '' });
    const ContactOptionsDropdown = new DropdownChatOptions({ onClick: onChatDeleteBind });

    const ContactAttachBtn = new Button({ type: 'button', style: 'icon icon-attach', title: '' });
    const ContactAttachDropdown = new Dropdown({ position: 'bottom-left', list: this.props.attachOptions });

    const SearchInput = new Input({ type: 'text', name: 'search', placeholder: 'Search', style: 'input__control--sidebar' });
    const SearchButton = new Button({ type: 'submit', name: 'search-submit', style: 'icon icon-search', onClick: onSearchSubmitBind });

    const MessageList = new MessageStack({ list: [], currentUser: null });
    const MessageSubmitButton = new Button({ type: 'button', id: 'send-btn', style: 'icon icon-send btn-send', title: '' });

    const SidebarContactsList = new SidebarList({ list: this.props.contacts, onClick: onChatClickBind });

    this.children = {
      ...this.children,
      //@ts-expect-error wft
      modalContactAdd,
      modalContactRemove,
      modalSearchUserList,
      //@ts-expect-error wft
      modalAddUser,
      modalChatUserList,
      HeaderOptionBtn,
      HeaderOptionDropdown,
      SearchInput,
      SearchButton,
      SidebarContactsList,
      ContactOptionsBtn,
      ContactOptionsDropdown,
      //@ts-expect-error wft
      MessageList,
      MessageSubmitButton,
      ContactAttachBtn,
      ContactAttachDropdown
    };

    document.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
  
      if (target.matches('#message')) {
        const lines = target.value.split('\n');
        const body = document.querySelector('#chat-content') as HTMLElement;
        
        if (body && lines.length > 2) 
          body.style.gridTemplateRows = '73px 1fr 130px';
        else 
          body.style.gridTemplateRows = '73px 1fr 73px';
      }
    });
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
        this.props.chatlist = data;
        
        this.children.SidebarContactsList.setProps({ list: data });
        this.chats = data;
        const chatListArray = document.querySelectorAll('.chat__contact');
        if (chatListArray) 
          chatListArray.forEach((item) => {
            item.removeEventListener('click', this.onChatClick.bind(this));
            item.addEventListener('click', this.onChatClick.bind(this));
          });
      });
    
  }

  updateChatUserList() {
    const store = window.store.getState();
    const chat_id = +store.chatId;
    getChatUsers(chat_id)
      .then((response) => {
        const responseList: ChatUser[] = response as any;
        const data = responseList.filter((item: ChatUser) => item.id !== store.userId);
        this.children.modalChatUserList.setProps({ list: data });

        const list = document.querySelectorAll('#chat-user-list li .delete');
        list.forEach((item) => {
          const element = item as HTMLElement;
          return element.addEventListener('click', () => this.chatUserDelete(+element.dataset.id!));
        });
      });
  }

  chatUserDelete(user_id: number) {
    const store = window.store.getState();
    const data: AddUserToChat = {
      users: [ user_id ],
      chatId: +store.chatId
    };
    deleteUser(data)
      .then(() => {
        this.updateChatUserList();
      });
  }

  onAddUserToChat(e: Event) {
    e.preventDefault();

    const store = window.store.getState();
    
    const input = document!.querySelector('#chat-add-user') as HTMLInputElement;
    const inputValue: SearchUser = { login: input.value };
    const users: number[] = [];
    let newUserId: number = 0;

    searchUser(inputValue)
      .then((repsonse: any) => {
        console.log('searchUser response:', repsonse);
        if (repsonse[0].id)
          newUserId = repsonse[0].id;
        if (newUserId) {
          users.push(newUserId);
          const chatId: number = +store.chatId;
          const data: AddUserToChat = {
            users,
            chatId
          };
          console.log(users, chatId);
          
          addUser(data)
            .then((response) => {
              console.log(response);
              this.updateChatUserList();
            });
        }
      });
  }

  onChatClick(e: Event) {
    e.stopPropagation();

    const el = e.target as HTMLElement;
    if (!el.dataset.id) return;
    
    const data = {
      chatid: el.dataset.id,
      user: {
        id: this.state.userId
      }
    };
    window.store.set({ chatId: el.dataset.id });
    const list: object[] = [];
    this.children.MessageList.setProps({ list });

    const onMessageRecieved = (message: ChatMessage): void => {
      if (message.type === 'user connected')
        message.content = 'User added';
      if (message.time) {
        const date = new Date(message.time);
        message.time = date.toLocaleString('en-En', { hour12: false });
      }
      if (message.user_id && message.user_id === this.state.userId) 
        message.user_id = 'user';
      else
        message.user_id = '';

      list.push(message);
      //@ts-expect-error wft
      list.sort((a: ChatMessage , b: ChatMessage) => new Date(a.time) - new Date(b.time));
      
      // update massage list div
      this.children.MessageList.setProps({ list, currentUser: this.state.userId });

      // scroll message area to end
      const wrapper = document.querySelector('#wrapper') as HTMLElement;
      const messageList = document.querySelector('#message-list') as HTMLElement;
      const listHeight = messageList.offsetHeight;
      
      wrapper.scrollTo(0, listHeight);
    };

    closeChat();

    openChat(data, onMessageRecieved)
      .then(() => {
        this.props.currentChat = this.props.chatlist?.find((item: any) => item.id === +data.chatid);
        this.updateChatUserList();
      });
  }

  onChatDelete() {
    const store = window.store.getState();
    const data: ChatId = {
      chatId: +store.chatId
    };

    deleteChat(data)
      .then(() => {
        window.store.set({ chatId: null });
        this.props.currentChat = null;
        this.updateChatList();
      });
  }

  onSearchSubmit(e: Event) {
    e.preventDefault();
    
    const input = document.querySelector('#search') as HTMLInputElement;
    const data: SearchUser = {
      login: input.value.toString()
    };

    if (input.value) 
      searchUser(data)
        .then((response) => {
          this.children.modalSearchUserList.setProps({ list: response });
          const popover = document.querySelector('#search-user-list') as HTMLDialogElement;
          popover.showPopover();
        });
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
        {{#if currentChat}}
        <div class="chat__content_header">
          <div class="chat__content_header-avatar">
            {{#if currentChat.avatar}}
            <img src="https://ya-praktikum.tech/api/v2/resources/{{currentChat.avatar}}" alt="{{currentChat.title}}">
            {{/if}}
          </div>
          <div class="chat__content_header-name">{{currentChat.title}}</div>
          <div class="chat__content_header-settings">
            {{{ ContactOptionsBtn }}}
            {{{ ContactOptionsDropdown }}}
          </div>
        </div>

        <div class="chat__content_body-wrapper" id="wrapper">
          {{{ MessageList }}}
        </div>

        <form class="chat__content_form">
          <div class="chat__content_form_text">
            <textarea class="textarea__control" name="message" id="message" rows="1" placeholder="What's up?"></textarea>
          </div>
          {{{ MessageSubmitButton }}}
        </form>

        {{else}}
        
        <div class="chat__content_empty">
          <p>Click on chat to start messaging</p>
        </div>

        {{/if}}
      </div>
      {{{ modalContactAdd }}}
      {{{ modalContactRemove }}}
      {{{ modalAddUser }}}
      {{{ modalChatUserList }}}
      {{{ modalSearchUserList }}}
    </div>
    `;
  }
};

const mapStateToPropsShort = ({ isLoading, errorMessage, chatId, massageStack }: { [key: string]: any }) => ({ isLoading, errorMessage, chatId, massageStack });

export default connect(mapStateToPropsShort)(Chat);
