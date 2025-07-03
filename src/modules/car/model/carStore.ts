import { create } from "zustand";

import { getCars } from "@shared/api";
import type { Car, CarBodyType, CarBrand } from "@shared/api";
import { handleError } from "@shared/helpers";

import { useFilterStore } from "./filterStore";

interface ICarState {
  cars: Car[];
  bodyTypes: CarBodyType[];
  brands: CarBrand[];
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
  bodyTypes: [],
  brands: [],
  setValue: (field, value) => set({ [field]: value }),
  fetchCars: async () => {
    try {
      const { filters } = useFilterStore.getState();
      set({ isLoading: true });
      const queryParams = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, any>
      );

      const result = await carsApi.carsControllerGetCars({
        limit: 50,
        ...queryParams
      });

      set((state) => {
        const newBodyTypes = [...new Set(result.data.data.map((car) => car.bodyType))];
        const newBrands = [...new Set(result.data.data.map((car) => car.brand))];

        return {
          cars: result.data.data,
          bodyTypes: state.bodyTypes.length === 0 ? newBodyTypes : state.bodyTypes,
          brands: state.brands.length === 0 ? newBrands : state.brands
        };
      });
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
