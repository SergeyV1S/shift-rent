import type { CarBodyType, CarBrand, CarSteering, CarTransmission } from "@shared/api";

export const createOptionsWithTranslation = <
  T extends CarBodyType | CarBrand | CarTransmission | CarSteering
>(
  items: T[],
  includeAllOption = false,
  translation?: Record<T, string>
) => {
  const options = items.map((item) => {
    if (translation) {
      return {
        value: item,
        label: translation[item]
      };
    } else {
      return {
        value: item,
        label: item
      };
    }
  });

  return includeAllOption
    ? [
        {
          value: "all",
          label: "Любой"
        },
        ...options
      ]
    : options;
};
