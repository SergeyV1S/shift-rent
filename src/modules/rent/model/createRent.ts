import type { NavigateFunction } from "react-router";

import { create } from "zustand";

import type { EStepsType } from "@modules/rent";
import { ESteps, defaultRentData, steps } from "@modules/rent/constants";

import { getCars } from "@shared/api";
import type { CarRent, CreateRentDto } from "@shared/api";
import { PATHS } from "@shared/constants";
import { formatPhone, formatToISO, handleError } from "@shared/helpers";

import type { TCarReservationFormSchema, TUserDataFormSchema } from "../lib";

interface ICreateRentState {
  isLoading?: boolean;
  currentStep: EStepsType;
  rentData: CreateRentDto;
  createdRent?: CarRent;
}

interface ICreateRentActions {
  nextStep: () => void;
  prevStep: () => void;
  moveToStep: (step: EStepsType) => void;
  setRentData: (rentData: TCarReservationFormSchema) => void;
  setUserData: (userData: TUserDataFormSchema) => void;
  setCarId: (carId: string) => void;
  createRent: (navigate: NavigateFunction) => void;
}

type TCreateRentStore = ICreateRentState & ICreateRentActions;

const carsApi = getCars();

export const useCreateRentStore = create<TCreateRentStore>((set, get) => ({
  currentStep: ESteps.CAR_RESERVATION,
  rentData: defaultRentData,
  setCarId: (carId) => {
    const { rentData } = get();

    set({
      rentData: {
        ...rentData,
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
  setRentData: (rent) => {
    const { rentData } = get();
    set({
      rentData: {
        ...rentData,
        ...{
          ...rent,
          startDate: rent.rentDate?.from.getTime(),
          endDate: rent.rentDate?.to?.getTime() || rent.rentDate?.from.getTime()
        }
      }
    });
  },
  setUserData: (userData) => {
    const { rentData } = get();

    set({ rentData: { ...rentData, ...userData } });
  },
  createRent: async (navigate) => {
    const { rentData } = get();
    try {
      set({ isLoading: true });

      const result = await carsApi.carsControllerCreateCarRent({
        ...rentData,
        phone: formatPhone(rentData.phone),
        birthDate: formatToISO(rentData.birthDate)
      });

      set({ createdRent: result.data.rent });
      set({ rentData: defaultRentData });

      navigate(PATHS.REQUEST_SENT);
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
