export interface User {
  /** Номер телефона */
  phone: string;
  /** Имя */
  firstname?: string;
  /** Отчество */
  middlename?: string;
  /** Фамилия */
  lastname?: string;
  /** Почта */
  email?: string;
  /** Город */
  city?: string;
}

export interface SessionResponse {
  /** Статус запроса */
  success: boolean;
  /** Причина ошибки */
  reason?: string;
  /** Пользователь */
  user: User;
}

export interface UpdateProfileProfileDto {
  /** Имя */
  firstname?: string;
  /** Отчество */
  middlename?: string;
  /** Фамилия */
  lastname?: string;
  /** Почта */
  email?: string;
  /** Город */
  city?: string;
}

export interface UpdateProfileDto {
  /** Данные пользователя */
  profile: UpdateProfileProfileDto;
  /** Номер телефона */
  phone: string;
}

export interface UpdateProfileResponse {
  /** Статус запроса */
  success: boolean;
  /** Причина ошибки */
  reason?: string;
  /** Пользователь */
  user: User;
}

export interface CreateOtpDto {
  phone: string;
}

export interface OtpResponse {
  /** Статус запроса */
  success: boolean;
  /** Причина ошибки */
  reason?: string;
  /** Время запроса повторного отп кода в мс */
  retryDelay: number;
}

export interface SignInDto {
  /** Номер телефона */
  phone: string;
  /** Отп код */
  code: number;
}

export interface SignInResponse {
  /** Статус запроса */
  success: boolean;
  /** Причина ошибки */
  reason?: string;
  /** Пользователь */
  user: User;
  /** Пользовательский токен */
  token: string;
}

export interface BaseResponse {
  /** Статус запроса */
  success: boolean;
  /** Причина ошибки */
  reason?: string;
}

export interface Media {
  url: string;
  isCover: boolean;
}

/**
 * Марка автомобиля
 */
export type CarBrand = (typeof CarBrand)[keyof typeof CarBrand];

export const CarBrand = {
  Haval: "Haval",
  Hyundai: "Hyundai",
  Volkswagen: "Volkswagen",
  Kia: "Kia",
  Geely: "Geely",
  Mercedes: "Mercedes",
  Garden_car: "Garden car",
  Grocery_cart: "Grocery cart",
  Haier: "Haier",
  Invalid: "Invalid"
} as const;

/**
 * Тип коробки передач
 */
export type CarTransmission = (typeof CarTransmission)[keyof typeof CarTransmission];

export const CarTransmission = {
  automatic: "automatic",
  manual: "manual"
} as const;

/**
 * Цвет автомобиля
 */
export type CarColor = (typeof CarColor)[keyof typeof CarColor];

export const CarColor = {
  black: "black",
  white: "white",
  red: "red",
  silver: "silver",
  blue: "blue",
  grey: "grey",
  orange: "orange"
} as const;

/**
 * Тип кузова
 */
export type CarBodyType = (typeof CarBodyType)[keyof typeof CarBodyType];

export const CarBodyType = {
  sedan: "sedan",
  suv: "suv",
  coupe: "coupe",
  hatchback: "hatchback",
  cabriolet: "cabriolet"
} as const;

/**
 * Расположение руля
 */
export type CarSteering = (typeof CarSteering)[keyof typeof CarSteering];

export const CarSteering = {
  left: "left",
  right: "right"
} as const;

export interface Car {
  /** ID автомобиля */
  id: string;
  /** Название модели */
  name: string;
  /** Марка автомобиля */
  brand: CarBrand;
  media: Media[];
  /** Тип коробки передач */
  transmission: CarTransmission;
  /** Цена аренды в сутки */
  price: number;
  /** Местоположение */
  location: string;
  /** Цвет автомобиля */
  color: CarColor;
  /** Тип кузова */
  bodyType: CarBodyType;
  /** Расположение руля */
  steering: CarSteering;
}

export interface PaginationMeta {
  /** Общее количество элементов во всех страницах */
  total: number;
  /** Текущий номер страницы (по умолчанию 1) */
  page: number;
  /** Количество элементов на странице (по умолчанию 10) */
  limit: number;
  /** Общее количество доступных страниц */
  totalPages: number;
}

export interface CarsPaginatedResponse {
  /** Статус запроса */
  success: boolean;
  /** Причина ошибки */
  reason?: string;
  /** Массив автомобилей с информацией */
  data: Car[];
  /** Метаданные пагинации (общее количество, текущая страница и т.д.) */
  meta: PaginationMeta;
}

export interface BookedDateRange {
  /** Дата начала аренды (timestamp) */
  startDate: number;
  /** Дата окончания аренды (timestamp) */
  endDate: number;
}

/**
 * Марка автомобиля
 */
export type CarWithRentsBrand = (typeof CarWithRentsBrand)[keyof typeof CarWithRentsBrand];

export const CarWithRentsBrand = {
  Haval: "Haval",
  Hyundai: "Hyundai",
  Volkswagen: "Volkswagen",
  Kia: "Kia",
  Geely: "Geely",
  Mercedes: "Mercedes",
  Garden_car: "Garden car",
  Grocery_cart: "Grocery cart",
  Haier: "Haier",
  Invalid: "Invalid"
} as const;

/**
 * Тип коробки передач
 */
export type CarWithRentsTransmission =
  (typeof CarWithRentsTransmission)[keyof typeof CarWithRentsTransmission];

export const CarWithRentsTransmission = {
  automatic: "automatic",
  manual: "manual"
} as const;

/**
 * Цвет автомобиля
 */
export type CarWithRentsColor = (typeof CarWithRentsColor)[keyof typeof CarWithRentsColor];

export const CarWithRentsColor = {
  black: "black",
  white: "white",
  red: "red",
  silver: "silver",
  blue: "blue",
  grey: "grey",
  orange: "orange"
} as const;

/**
 * Тип кузова
 */
export type CarWithRentsBodyType = (typeof CarWithRentsBodyType)[keyof typeof CarWithRentsBodyType];

export const CarWithRentsBodyType = {
  sedan: "sedan",
  suv: "suv",
  coupe: "coupe",
  hatchback: "hatchback",
  cabriolet: "cabriolet"
} as const;

/**
 * Расположение руля
 */
export type CarWithRentsSteering = (typeof CarWithRentsSteering)[keyof typeof CarWithRentsSteering];

export const CarWithRentsSteering = {
  left: "left",
  right: "right"
} as const;

export interface CarWithRents {
  /** ID автомобиля */
  id: string;
  /** Название модели */
  name: string;
  /** Марка автомобиля */
  brand: CarWithRentsBrand;
  media: Media[];
  /** Тип коробки передач */
  transmission: CarWithRentsTransmission;
  /** Цена аренды в сутки */
  price: number;
  /** Местоположение */
  location: string;
  /** Цвет автомобиля */
  color: CarWithRentsColor;
  /** Тип кузова */
  bodyType: CarWithRentsBodyType;
  /** Расположение руля */
  steering: CarWithRentsSteering;
  /** Занятые промежутки дат (timestamp) */
  rents: BookedDateRange[];
}

export interface CarResponse {
  /** Статус запроса */
  success: boolean;
  /** Причина ошибки */
  reason?: string;
  /** Данные автомобиля с арендованными датами */
  data: CarWithRents;
}

export interface CreateRentDto {
  /** Идентификатор автомобиля */
  carId: string;
  /** Место получения автомобиля */
  pickupLocation: string;
  /** Место возврата автомобиля */
  returnLocation: string;
  /** Дата начала аренды (timestamp в миллисекундах) */
  startDate: number;
  /** Дата окончания аренды (timestamp в миллисекундах) */
  endDate: number;
  /** Имя арендатора */
  firstName: string;
  /** Фамилия арендатора */
  lastName: string;
  /** Отчество арендатора */
  middleName?: string;
  /** Дата рождения арендатора (ISO формат) */
  birthDate: string;
  /** Email арендатора */
  email: string;
  /** Телефон арендатора в формате 7XXXXXXXXXX */
  phone: string;
  /** Комментарий арендатора */
  comment?: string;
}

/**
 * Статус брони
 */
export type CarRentStatus = (typeof CarRentStatus)[keyof typeof CarRentStatus];

export const CarRentStatus = {
  NUMBER_0: 0,
  NUMBER_1: 1
} as const;

export interface CarRent {
  /** Информация об автомобиле */
  carInfo: Car;
  /** Статус брони */
  status: CarRentStatus;
  /** Место получения автомобиля */
  pickupLocation: string;
  /** Место возврата автомобиля */
  returnLocation: string;
  /** Дата начала аренды (timestamp в миллисекундах) */
  startDate: number;
  /** Дата окончания аренды (timestamp в миллисекундах) */
  endDate: number;
  /** Общая сумма аренды */
  totalPrice: number;
  /** Имя арендатора */
  firstName: string;
  /** Фамилия арендатора */
  lastName: string;
  /** Отчество арендатора */
  middleName?: string;
  /** Дата рождения арендатора */
  birthDate: string;
  /** Email арендатора */
  email: string;
  /** Телефон арендатора (совпадает с номером пользователя) */
  phone: string;
  /** Комментарий */
  comment?: string;
}

export interface CarRentResponse {
  /** Статус запроса */
  success: boolean;
  /** Причина ошибки */
  reason?: string;
  /** Аренда */
  rent: CarRent;
}

export interface CarRentsResponse {
  /** Статус запроса */
  success: boolean;
  /** Причина ошибки */
  reason?: string;
  /** Аренды */
  rents: CarRent[];
}

export interface CancelCarRentDto {
  /** Идентификатор аренды */
  carRentId: string;
}

export type CarsControllerGetCarsParams = {
  /**
   * Поиск
   */
  search?: string;
  /**
   * Максимальная цена аренды
   */
  maxPrice?: number;
  /**
   * Минимальная цена аренды
   */
  minPrice?: number;
  /**
   * Тип трансмиссии
   */
  transmission?: CarsControllerGetCarsTransmission;
  /**
   * Тип кузова автомобиля
   */
  bodyType?: CarsControllerGetCarsBodyType;
  /**
   * Марка автомобиля
   */
  brand?: CarsControllerGetCarsBrand;
  /**
   * Цвет автомобиля
   */
  color?: CarsControllerGetCarsColor;
  /**
   * Количество элементов на странице (по умолчанию 10)
   */
  limit?: number;
  /**
   * Номер текущей страницы (по умолчанию 1)
   */
  page?: number;
};

export type CarsControllerGetCarsTransmission =
  (typeof CarsControllerGetCarsTransmission)[keyof typeof CarsControllerGetCarsTransmission];

export const CarsControllerGetCarsTransmission = {
  automatic: "automatic",
  manual: "manual"
} as const;

export type CarsControllerGetCarsBodyType =
  (typeof CarsControllerGetCarsBodyType)[keyof typeof CarsControllerGetCarsBodyType];

export const CarsControllerGetCarsBodyType = {
  sedan: "sedan",
  suv: "suv",
  coupe: "coupe",
  hatchback: "hatchback",
  cabriolet: "cabriolet"
} as const;

export type CarsControllerGetCarsBrand =
  (typeof CarsControllerGetCarsBrand)[keyof typeof CarsControllerGetCarsBrand];

export const CarsControllerGetCarsBrand = {
  Haval: "Haval",
  Hyundai: "Hyundai",
  Volkswagen: "Volkswagen",
  Kia: "Kia",
  Geely: "Geely",
  Mercedes: "Mercedes",
  Garden_car: "Garden car",
  Grocery_cart: "Grocery cart",
  Haier: "Haier",
  Invalid: "Invalid"
} as const;

export type CarsControllerGetCarsColor =
  (typeof CarsControllerGetCarsColor)[keyof typeof CarsControllerGetCarsColor];

export const CarsControllerGetCarsColor = {
  black: "black",
  white: "white",
  red: "red",
  silver: "silver",
  blue: "blue",
  grey: "grey",
  orange: "orange"
} as const;
