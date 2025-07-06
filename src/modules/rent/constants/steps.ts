export const steps = ["Бронирование авто", "Введите ваши данные", "Проверка данных"];

export const ESteps = {
  CAR_RESERVATION: "Бронирование авто",
  USER_DATA: "Введите ваши данные",
  DATA_REVIEW: "Проверка данных"
} as const;

export type EStepsType = (typeof ESteps)[keyof typeof ESteps];
