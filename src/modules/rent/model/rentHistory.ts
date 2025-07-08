import type { NavigateFunction } from "react-router";
import { toast } from "sonner";

import { create } from "zustand";

import { type CarRent, getCars } from "@shared/api";
import { handleError } from "@shared/helpers";

interface IRentHistoryState {
  rentHistory: CarRent[];
  rent?: CarRent;
  isLoading?: boolean;
  isCancelModelOpen: boolean;
}

interface IRentHistoryActions {
  fetchRentHistory: () => void;
  fetchRentDetails: (carRentId: string) => void;
  cancelRent: (carRentId: string, navigate: NavigateFunction) => void;
  toggleCancelModelOpen: (value?: boolean) => void;
}

type TRentHistoryStore = IRentHistoryState & IRentHistoryActions;

const carsApi = getCars();

export const useRentHistoryStore = create<TRentHistoryStore>((set, get) => ({
  rentHistory: [],
  isCancelModelOpen: false,
  toggleCancelModelOpen: (value) => {
    const { isCancelModelOpen } = get();
    set({ isCancelModelOpen: value ?? !isCancelModelOpen });
  },
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
  },
  fetchRentDetails: async (carRentId) => {
    try {
      set({ isLoading: true });

      const result = await carsApi.carsControllerGetCarRent(carRentId);

      set({ rent: result.data });
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  },
  cancelRent: async (carRentId, navigate) => {
    try {
      set({ isLoading: true });

      await carsApi.carsControllerCancelCarRent({ carRentId });

      set({ isCancelModelOpen: false });

      toast.success("Аренда успешно отменена!");
      navigate(-1);
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
