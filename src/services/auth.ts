import { AuthApi } from '@/api/auth-api';
import { LoginRequestData, SignUpRequestData } from '@/api/types';

const authApi = new AuthApi();

export const login = async (model: LoginRequestData) => {
  window.store.set({ isLoading: true });
  try {
    await authApi.login(model);
    window.router.go('/messenger');
    window.store.set({ errorMessage: null });
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
    window.store.set({ errorMessage: null });
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
    window.store.set({ errorMessage: null });
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
    window.store.set({ errorMessage: null });
    return data;
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};
