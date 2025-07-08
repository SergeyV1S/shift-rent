import { create } from "zustand";

import { getOtps, getUsers } from "@shared/api";
import { ACCESS_TOKEN } from "@shared/constants";
import { formatPhone, handleError } from "@shared/helpers";
import { batchSetState } from "@shared/lib";

interface IAuthState {
  isAuth: boolean;
  phone: string;
  retryDelay?: number;
  isLoading?: boolean;
}

interface IAuthActions {
  setValue: <T extends keyof IAuthState>(
    field: T | T[],
    value: IAuthState[T] | IAuthState[T][]
  ) => void;
  sendOtp: (phone: string) => void;
  signIn: (code: string) => void;
  logout: () => void;
}

type TAuthStore = IAuthState & IAuthActions;

const otpsApi = getOtps();
const usersApi = getUsers();

export const useAuthStore = create<TAuthStore>((set, get) => ({
  phone: "",
  isAuth: Boolean(localStorage.getItem(ACCESS_TOKEN)),
  setValue: (field, value) => batchSetState(set, field, value),
  sendOtp: async (phone) => {
    const formatedPhone = formatPhone(phone);
    try {
      set({ isLoading: true });

      const result = await otpsApi.otpsControllerCreateOtp({ phone: formatedPhone });

      set({ phone: phone, retryDelay: result.data.retryDelay });
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  },
  signIn: async (code) => {
    const { phone } = get();

    const formatedPhone = formatPhone(phone);
    try {
      set({ isLoading: true });

      const result = await usersApi.usersControllerSignin({
        phone: formatedPhone,
        code: +code
      });

      set({ phone: "", isAuth: true });

      localStorage.setItem(ACCESS_TOKEN, result.data.token);
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    set({ isAuth: false });
  }
}));
