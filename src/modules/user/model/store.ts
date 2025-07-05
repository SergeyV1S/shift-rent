import { create } from "zustand";

import { getUsers } from "@shared/api";
import type { User } from "@shared/api";
import { handleError } from "@shared/helpers";

interface IUserState {
  user?: User;
  isLoading?: boolean;
}

interface IUserActions {
  setValue: <T extends keyof IUserState>(field: T, value: IUserState[T]) => void;
  fetchUser: () => void;
}

type TUserStore = IUserState & IUserActions;

const userApi = getUsers();

export const useUserStore = create<TUserStore>((set) => ({
  setValue: (field, value) => set({ [field]: value }),
  fetchUser: async () => {
    try {
      set({ isLoading: true });

      const result = await userApi.usersControllerSession();

      set({ user: result.data.user });
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
