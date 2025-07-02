import { create } from "zustand";

import { ACCESS_TOKEN } from "@shared/constants";

interface IAuthState {
  isAuth: boolean;
  phone: string;
  isLoading?: boolean;
}

interface IAuthActions {
  setValue: <T extends keyof IAuthState>(
    field: T | T[],
    value: IAuthState[T] | IAuthState[T][]
  ) => void;
}

type TAuthStore = IAuthState & IAuthActions;

export const useAuthStore = create<TAuthStore>((set) => ({
  phone: "",
  isAuth: Boolean(localStorage.getItem(ACCESS_TOKEN)),
  setValue: (field, value) => {
    if (Array.isArray(field) && Array.isArray(value)) {
      field.map((f, i) => set({ [f]: value[i] }));
    } else if (!Array.isArray(field) && !Array.isArray(value)) {
      set({ [field]: value });
    }
  }
}));
