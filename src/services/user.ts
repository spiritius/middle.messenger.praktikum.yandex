import { UserApi } from '@/api/user-api';
import { UpdateUserData, UpdateUserPassword } from '@/api/types';

const userApi = new UserApi();

export const update = async (model: UpdateUserData) => {
  window.store.set({ isLoading: true });
  try {
    await userApi.update(model);
    window.store.set({ errorMessage: null });
    window.store.set({ changeUserData: false }); 
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason });
    window.store.set({ changeUserData: true }); 
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const changePassword = async (model: UpdateUserPassword) => {
  window.store.set({ isLoading: true });
  try {
    await userApi.changePassword(model);
    window.store.set({ successMessage: 'Password has changed!' });
    window.store.set({ errorMessage: null });
  } catch (error: any) {
    window.store.set({ successMessage: null });
    window.store.set({ errorMessage: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const uploadAvatar = async (model: FormData) => {
  window.store.set({ isLoading: true });
  try {
    await userApi.uploadAvatar(model);
    window.router.go('/settings');
  } catch (error: any) {
    window.store.set({ errorMessage: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};
