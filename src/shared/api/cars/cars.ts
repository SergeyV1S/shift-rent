import { customInstance } from ".././instance";
import type {
  BaseResponse,
  CancelCarRentDto,
  CarRent,
  CarRentResponse,
  CarRentsResponse,
  CarResponse,
  CarsControllerGetCarsParams,
  CarsPaginatedResponse,
  CreateRentDto
} from "../generated.schemas";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getCars = () => {
  /**
   * @summary Получить все автомобили
   */
  const carsControllerGetCars = (
    params?: CarsControllerGetCarsParams,
    options?: SecondParameter<typeof customInstance>
  ) =>
    customInstance<CarsPaginatedResponse>(
      { url: `/api/cars/info`, method: "GET", params },
      options
    );
  /**
   * @summary Получить автомобиль
   */
  const carsControllerGetCar = (carId: string, options?: SecondParameter<typeof customInstance>) =>
    customInstance<CarResponse>({ url: `/api/cars/info/${carId}`, method: "GET" }, options);
  /**
   * @summary Арендовать автомобиль
   */
  const carsControllerCreateCarRent = (
    createRentDto: CreateRentDto,
    options?: SecondParameter<typeof customInstance>
  ) =>
    customInstance<CarRentResponse>(
      {
        url: `/api/cars/rent`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: createRentDto
      },
      options
    );
  /**
   * @summary Получить все аренды
   */
  const carsControllerGetCarRents = (options?: SecondParameter<typeof customInstance>) =>
    customInstance<CarRentsResponse>({ url: `/api/cars/rent`, method: "GET" }, options);
  /**
   * @summary Получить аренду
   */
  const carsControllerGetCarRent = (
    carRentId: string,
    options?: SecondParameter<typeof customInstance>
  ) => customInstance<CarRent>({ url: `/api/cars/rent/${carRentId}`, method: "GET" }, options);
  /**
   * @summary Отменить аренду
   */
  const carsControllerCancelCarRent = (
    cancelCarRentDto: CancelCarRentDto,
    options?: SecondParameter<typeof customInstance>
  ) =>
    customInstance<BaseResponse>(
      {
        url: `/api/cars/rent/cancel`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: cancelCarRentDto
      },
      options
    );
  return {
    carsControllerGetCars,
    carsControllerGetCar,
    carsControllerCreateCarRent,
    carsControllerGetCarRents,
    carsControllerGetCarRent,
    carsControllerCancelCarRent
  };
};
export type CarsControllerGetCarsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getCars>["carsControllerGetCars"]>>
>;
export type CarsControllerGetCarResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getCars>["carsControllerGetCar"]>>
>;
export type CarsControllerCreateCarRentResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getCars>["carsControllerCreateCarRent"]>>
>;
export type CarsControllerGetCarRentsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getCars>["carsControllerGetCarRents"]>>
>;
export type CarsControllerGetCarRentResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getCars>["carsControllerGetCarRent"]>>
>;
export type CarsControllerCancelCarRentResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getCars>["carsControllerCancelCarRent"]>>
>;
