export type APIError = {
  reason: string;
};

export type SignUpResponse = {
  id: number
}

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'>  & {
  password: string
}

export type CreateChat = {
  title: string
}

export type LoginRequestData = {
  login: string,
  password: string,
  [key: string]: string
}

export type SignUpRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
  [key: string]: string
}

export type UpdateUserData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  [key: string]: string
}
export type UpdateUserPassword = {
  oldPassword: string,
  newPassword: string,
  [key: string]: string
}

export type AddChat = {
  title: string,
  [key: string]: string
}

export type OpenChatData = {
  chatid: string,
  user: {[key: string]: string},
}

type LastMessage = {
  user: UserDTO,
  time: string,
  content: string
}

export type ChatDTO = {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  last_message: LastMessage | null
}
