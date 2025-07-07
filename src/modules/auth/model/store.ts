import { create } from "zustand";

import { ACCESS_TOKEN } from "@shared/constants";
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
}

type TAuthStore = IAuthState & IAuthActions;

export const useAuthStore = create<TAuthStore>((set) => ({
  phone: "",
  isAuth: Boolean(localStorage.getItem(ACCESS_TOKEN)),
  setValue: (field, value) => batchSetState(set, field, value)
}));
