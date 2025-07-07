import { toast } from "sonner";

import { create } from "zustand";

import type { EStepsType } from "@modules/rent";
import { ESteps, defaultCreateRentData, steps } from "@modules/rent/constants";

import { getCars } from "@shared/api";
import type { CarRent, CreateRentDto } from "@shared/api";
import { formatPhone, handleError } from "@shared/helpers";

import type { TCarReservationFormSchema, TUserDataFormSchema } from "../lib";

interface ICreateRentState {
  isLoading?: boolean;
  currentStep: EStepsType;
  createRentData: CreateRentDto;
  createdRent?: CarRent;
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
  createRentData: defaultCreateRentData,
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

      const result = await carsApi.carsControllerCreateCarRent({
        ...createRentData,
        phone: formatPhone(createRentData.phone),
        birthDate: createRentData.birthDate.split(".").reverse().join("-")
      });

      set({ createdRent: result.data.rent });
      set({ createRentData: defaultCreateRentData });

      toast.success("Машина забронирована!");
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
