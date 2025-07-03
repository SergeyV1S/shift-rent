import { create } from "zustand";

import { getCars } from "@shared/api";
import type { Car } from "@shared/api";
import { handleError } from "@shared/helpers";

interface ICarState {
  cars: Car[];
  selectedCar?: Car | string;
  isLoading?: boolean;
}

interface ICarActions {
  setValue: <T extends keyof ICarState>(field: T, value: ICarState[T]) => void;
  fetchCars: () => void;
  fetchSelectedCar: (carId: string) => void;
}

type TCarStore = ICarState & ICarActions;

const carsApi = getCars();

export const useCarStore = create<TCarStore>((set) => ({
  cars: [],
  setValue: (field, value) => set({ [field]: value }),
  fetchCars: async () => {
    try {
      set({ isLoading: true });

      const result = await carsApi.carsControllerGetCars({
        limit: 50
      });

      set({ cars: result.data.data });
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSelectedCar: async (carId) => {
    try {
      set({ isLoading: true });

      const result = await carsApi.carsControllerGetCar(carId);

      set({ selectedCar: result.data.data });
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
