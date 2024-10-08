import HTTP from '@/core/httpTransport';
import { BaseAPI } from './base-api';
import { SearchUser, UpdateUserData, UpdateUserPassword } from './types';

export class UserApi extends BaseAPI {
  private userApiInstance: HTTP;

  constructor() {
    super();
    this.userApiInstance = new HTTP('/api/v2/user');
  }

  async update(data: UpdateUserData) {
    return this.userApiInstance.put('/profile', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async changePassword(data: UpdateUserPassword) {
    return this.userApiInstance.post('/password', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async searchUser(data: SearchUser) {
    return this.userApiInstance.post('/search', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async uploadAvatar(data: FormData) {
    return this.userApiInstance.put('/profile/avatar', { 
      data
    });
  }
}
