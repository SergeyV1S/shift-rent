import { ChevronLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router";

import { getCars } from "@shared/api";
import type { CarWithRents } from "@shared/api";
import { PATHS } from "@shared/constants";
import { formatDayMonthDateRange, getTimeDiff } from "@shared/helpers";
import { cn, createRoute } from "@shared/lib";
import { Typography, buttonVariants } from "@shared/ui";

import {
  carBodyTypeTranslation,
  carColorTranslation,
  carSteeringTranslation,
  carTransmissionTranslation
} from "../constants";
import { useCarStore } from "../model";

const CarInfoPage = () => {
  const carData = useLoaderData() as CarWithRents;
  const { rent } = useCarStore();

  const formatedDateRange =
    rent?.startDate && rent?.endDate
      ? { from: new Date(rent.startDate), to: new Date(rent.endDate) }
      : undefined;

  const rentalDays = getTimeDiff(formatedDateRange);

  return (
    <div className=''>
      <Link
        to={PATHS.HOME}
        className='text-content-06 hover:text-brand-primary flex items-center gap-1 transition-colors duration-300'
      >
        <ChevronLeft />
        <Typography colorInherit>Назад</Typography>
      </Link>
      <div className='flex justify-center gap-10'>
        <div className='grid h-fit basis-1/2 grid-cols-3 gap-5'>
          {carData.media.map((image, index) => (
            <img
              className={cn("rounded-2xl", image.isCover && "order-first col-span-3")}
              key={image.url}
              src={`${process.env.BASE_API_URL}/api${image.url}`}
              alt={`${carData.name} ${index}`}
            />
          ))}
        </div>
        <div className='basis-1/2 space-y-8'>
          <Typography variant='title_h1' tag='h1'>
            {carData.name}
          </Typography>
          <div className='space-y-6'>
            <Typography variant='title_h2' tag='h2'>
              Характеристики
            </Typography>
            <div className='divide-border-light w-full divide-y'>
              <div className='border-t-border-light flex w-full items-center justify-between gap-6 border-t py-6'>
                <Typography variant='paragraph_16_medium'>Коробка передач</Typography>
                <Typography>{carTransmissionTranslation[carData.transmission]}</Typography>
              </div>
              <div className='flex w-full items-center justify-between gap-6 py-6'>
                <Typography variant='paragraph_16_medium'>Руль</Typography>
                <Typography>{carSteeringTranslation[carData.steering]}</Typography>
              </div>
              <div className='flex w-full items-center justify-between gap-6 py-6'>
                <Typography variant='paragraph_16_medium'>Тип кузова</Typography>
                <Typography>{carBodyTypeTranslation[carData.bodyType]}</Typography>
              </div>
              <div className='flex w-full items-center justify-between gap-6 py-6'>
                <Typography variant='paragraph_16_medium'>Цвет</Typography>
                <Typography>{carColorTranslation[carData.color]}</Typography>
              </div>
            </div>
          </div>
          {rent && rentalDays && (
            <div className='space-y-6'>
              <Typography variant='title_h2' tag='h2'>
                Стоимость
              </Typography>
              <div className='divide-border-light w-full divide-y'>
                <div className='border-t-border-light flex w-full items-center justify-between gap-6 border-t py-6'>
                  <Typography variant='paragraph_16_medium'>
                    {`Аренда на ${rentalDays} дней`}
                  </Typography>
                  <Typography>{formatDayMonthDateRange(formatedDateRange)}</Typography>
                </div>
                <div className='flex w-full items-center justify-between gap-6 py-6'>
                  <Typography variant='title_h3'>Итого</Typography>
                  <Typography variant='title_h3'>{rentalDays * carData.price} ₽</Typography>
                </div>
              </div>
            </div>
          )}
          <nav className='md:flex md:justify-end'>
            <div className='flex w-2/3 items-center justify-end gap-6 max-md:w-full max-md:flex-col-reverse'>
              <Link
                to={PATHS.HOME}
                className={cn(buttonVariants({ variant: "outline" }), "basis-1/2 max-md:w-full")}
              >
                Назад
              </Link>
              <Link
                to={PATHS.CAR_RESERVATION}
                className={cn(buttonVariants(), "basis-1/2 max-md:w-full")}
              >
                Забронировать
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

const carsApi = getCars();

export const carInfoRoute = createRoute(`${PATHS.CAR}/:carId`, <CarInfoPage />, {
  loader: async ({ params }) => {
    const { carId } = params as { carId: string };
    return (await carsApi.carsControllerGetCar(carId)).data.data;
  }
});
