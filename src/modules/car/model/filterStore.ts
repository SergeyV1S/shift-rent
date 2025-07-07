import { create } from "zustand";

import type { CarBodyType, CarBrand, CarColor, CarSteering, CarTransmission } from "@shared/api";

interface IFilterState {
  filters: {
    search?: string;
    maxPrice?: number;
    minPrice?: number;
    transmission?: CarTransmission;
    bodyType?: CarBodyType;
    brand?: CarBrand;
    color?: CarColor;
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
