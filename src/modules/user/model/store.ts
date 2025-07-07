import { toast } from "sonner";

import { create } from "zustand";

import { getUsers } from "@shared/api";
import type { User } from "@shared/api";
import { getChangedFields, handleError } from "@shared/helpers";

interface IUserState {
  user?: User;
  isLoading?: boolean;
}

interface IUserActions {
  setValue: <T extends keyof IUserState>(field: T, value: IUserState[T]) => void;
  fetchUser: () => void;
  updateUser: (updatedData: User) => void;
}

type TUserStore = IUserState & IUserActions;

const userApi = getUsers();

export const useUserStore = create<TUserStore>((set, get) => ({
  setValue: (field, value) => set({ [field]: value }),
  fetchUser: async () => {
    try {
      set({ isLoading: true });

      const result = await userApi.usersControllerSession();

      set({ user: result.data.user });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateUser: async (updatedData) => {
    const { user } = get();
    const changedFields = getChangedFields(user!, updatedData);

    if (Object.keys(changedFields).length === 0) {
      return;
    }

    try {
      set({ isLoading: true });

      const { phone, ...profile } = updatedData;

      const result = await userApi.usersControllerUpdateProfile({ phone, profile });

      set({ user: result.data.user });

      toast.success("Данные успешно обновлены!");
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
