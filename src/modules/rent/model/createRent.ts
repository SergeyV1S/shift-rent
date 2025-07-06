import { create } from "zustand";

import type { EStepsType } from "@modules/rent";
import { ESteps } from "@modules/rent/constants";

interface ICreateRentState {
  currentStep: EStepsType;
  createRentData?: {};
}

interface ICreateRentActions {
  setValue: <T extends keyof ICreateRentState>(field: T, value: ICreateRentState[T]) => void;
}

type TCreateRentStore = ICreateRentState & ICreateRentActions;

export const useCreateRentStore = create<TCreateRentStore>((set) => ({
  currentStep: ESteps.CAR_RESERVATION,
  setValue: (field, value) => set({ [field]: value })
}));
