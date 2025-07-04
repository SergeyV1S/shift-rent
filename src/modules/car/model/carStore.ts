import { create } from "zustand";

import { getCars } from "@shared/api";
import type {
  Car,
  CarBodyType,
  CarBrand,
  CarSteering,
  CarsControllerGetCarsTransmission
} from "@shared/api";
import { handleError } from "@shared/helpers";

import { useFilterStore } from "./filterStore";

interface ICarState {
  cars: Car[];
  bodyTypes: CarBodyType[];
  brands: CarBrand[];
  selectedCar?: Car | string;
  isLoading?: boolean;
  transmissionTypes: CarsControllerGetCarsTransmission[];
  steeringTypes: CarSteering[];
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
  transmissionTypes: [],
  steeringTypes: [],
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
        const bodyTypes = [...new Set(result.data.data.map((car) => car.bodyType))];
        const brands = [...new Set(result.data.data.map((car) => car.brand))];
        const steeringTypes = [...new Set(result.data.data.map((car) => car.steering))];
        const transmissionTypes = [...new Set(result.data.data.map((car) => car.transmission))];

        return {
          cars: result.data.data,
          bodyTypes: state.bodyTypes.length === 0 ? bodyTypes : state.bodyTypes,
          brands: state.brands.length === 0 ? brands : state.brands,
          steeringTypes: state.steeringTypes.length === 0 ? steeringTypes : state.steeringTypes,
          transmissionTypes:
            state.transmissionTypes.length === 0 ? transmissionTypes : state.transmissionTypes
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
