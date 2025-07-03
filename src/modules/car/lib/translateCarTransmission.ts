import type { CarTransmission } from "@shared/api";

export const translateCarTransmission = (transmissionType: CarTransmission) => {
  switch (transmissionType) {
    case "automatic":
      return "Автомат";
    case "manual":
      return "Механика";
  }
};
