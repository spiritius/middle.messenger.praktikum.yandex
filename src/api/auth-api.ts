import HTTP from '@/core/httpTransport';
import { BaseAPI } from './base-api';
import { LoginRequestData, SignUpRequestData } from './types';

export class AuthApi extends BaseAPI {
  private authApiInstance: HTTP;

  constructor() {
    super();
    this.authApiInstance = new HTTP('/api/v2/auth');
  }

  async login(data: LoginRequestData) {
    return this.authApiInstance.post('/signin', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async signup(data: SignUpRequestData) {
    return this.authApiInstance.post('/signup', {
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  async logout() {
    return this.authApiInstance.post('/logout');
  }
  
  async userinfo() {
    return this.authApiInstance.get('/user');
  }
}
