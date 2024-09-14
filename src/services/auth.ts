import { AuthApi } from '@/api/auth-api';
import { LoginRequestData, SignUpRequestData } from '@/api/types';

const authApi = new AuthApi();

export const login = async (model: LoginRequestData) => {
  window.store.set({ isLoading: true });
  try {
    await authApi.login(model);
    window.router.go('/messenger');
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const signup = async (model: SignUpRequestData) => {
  window.store.set({ isLoading: true });
  try {
    await authApi.signup(model);
    window.router.go('/messenger');
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const logout = async () => {
  window.store.set({ isLoading: true });
  try {
    await authApi.logout();
    window.router.go('/');
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const userinfo = async () => {
  window.store.set({ isLoading: true });
  try {
    const data = await authApi.userinfo();
    return data.response;
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};
