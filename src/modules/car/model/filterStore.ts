import { create } from "zustand";

import type {
  CarSteering,
  CarsControllerGetCarsBodyType,
  CarsControllerGetCarsBrand,
  CarsControllerGetCarsColor,
  CarsControllerGetCarsTransmission
} from "@shared/api";

interface IFilterState {
  filters: {
    search?: string;
    maxPrice?: number;
    minPrice?: number;
    transmission?: CarsControllerGetCarsTransmission;
    bodyType?: CarsControllerGetCarsBodyType;
    brand?: CarsControllerGetCarsBrand;
    color?: CarsControllerGetCarsColor;
    steering?: CarSteering;
  };
  isFiltersOpen?: boolean;
  isLoading?: boolean;
}

interface IFilterActions {
  setValue: <T extends keyof IFilterState>(field: T, value: IFilterState[T]) => void;
}

type TFilterStore = IFilterState & IFilterActions;

export const useFilterStore = create<TFilterStore>((set) => ({
  filters: {},
  setValue: (field, value) => set({ [field]: value })
}));
