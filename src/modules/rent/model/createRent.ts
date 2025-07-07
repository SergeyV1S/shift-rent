import { toast } from "sonner";

import { create } from "zustand";

import type { EStepsType } from "@modules/rent";
import { ESteps, steps } from "@modules/rent/constants";

import { getCars } from "@shared/api";
import type { CreateRentDto } from "@shared/api";
import { handleError } from "@shared/helpers";

import type { TCarReservationFormSchema, TUserDataFormSchema } from "../lib";

interface ICreateRentState {
  isLoading?: boolean;
  currentStep: EStepsType;
  createRentData: CreateRentDto;
}

interface ICreateRentActions {
  nextStep: () => void;
  prevStep: () => void;
  moveToStep: (step: EStepsType) => void;
  setRentData: (rentData: TCarReservationFormSchema) => void;
  setUserData: (userData: TUserDataFormSchema) => void;
  setCarId: (carId: string) => void;
  createRent: () => void;
}

type TCreateRentStore = ICreateRentState & ICreateRentActions;

const carsApi = getCars();

export const useCreateRentStore = create<TCreateRentStore>((set, get) => ({
  currentStep: ESteps.CAR_RESERVATION,
  createRentData: {
    carId: "",
    pickupLocation: "",
    returnLocation: "",
    startDate: 0,
    endDate: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phone: ""
  },
  setCarId: (carId) => {
    const { createRentData } = get();

    set({
      createRentData: {
        ...createRentData,
        carId
      }
    });
  },
  moveToStep: (step) => set({ currentStep: step }),
  nextStep: () => {
    const { currentStep } = get();
    const nextStepIndex = Math.min(steps.indexOf(currentStep) + 1, 2);

    set({ currentStep: steps[nextStepIndex] as EStepsType });
  },
  prevStep: () => {
    const { currentStep } = get();
    const nextStepIndex = Math.max(steps.indexOf(currentStep) - 1, 0);

    set({ currentStep: steps[nextStepIndex] as EStepsType });
  },
  setRentData: (rentData) => {
    const { createRentData } = get();
    set({
      createRentData: {
        ...createRentData,
        ...{
          ...rentData,
          startDate: rentData.rentDate?.from.getTime(),
          endDate: rentData.rentDate?.to?.getTime() || rentData.rentDate?.from.getTime()
        }
      }
    });
  },
  setUserData: (userData) => {
    const { createRentData } = get();

    set({ createRentData: { ...createRentData, ...userData } });
  },
  createRent: async () => {
    const { createRentData } = get();
    try {
      set({ isLoading: true });
      await carsApi.carsControllerCreateCarRent(createRentData);

      toast.success("Машина забронирована!");
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
