import type { CarSteering } from "@shared/api";

export const translateCarSteering = (steeringType: CarSteering) => {
  switch (steeringType) {
    case "left":
      return "Левый";
    case "right":
      return "Правый";
  }
};
