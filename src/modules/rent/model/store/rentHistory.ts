import { create } from "zustand";

import { type CarRent, getCars } from "@shared/api";
import { handleError } from "@shared/helpers";

interface IRentHistoryState {
  rentHistory: CarRent[];
  rent?: CarRent;
  isLoading?: boolean;
}

interface IRentHistoryActions {
  setValue: <T extends keyof IRentHistoryState>(field: T, value: IRentHistoryState[T]) => void;
  fetchRentHistory: () => void;
}

type TRentHistoryStore = IRentHistoryState & IRentHistoryActions;

const carsApi = getCars();

export const useRentHistoryStore = create<TRentHistoryStore>((set) => ({
  rentHistory: [],
  setValue: (field, value) => set({ [field]: value }),
  fetchRentHistory: async () => {
    try {
      set({ isLoading: true });

      const result = await carsApi.carsControllerGetCarRents();

      set({ rentHistory: result.data.rents });
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
