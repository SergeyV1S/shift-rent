import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";

import { PATHS } from "@shared/constants";
import { formatDateRangeForRequest, formatDayMonthDateRange, getTimeDiff } from "@shared/helpers";
import { cn, createRoute } from "@shared/lib";
import { Spinner, Typography, buttonVariants } from "@shared/ui";

import {
  carBodyTypeTranslation,
  carColorTranslation,
  carSteeringTranslation,
  carTransmissionTranslation
} from "../constants";
import { useCarStore } from "../model";

const CarInfoPage = () => {
  const { rent, car, isLoading, fetchCar } = useCarStore();
  const { carId } = useParams() as { carId: string };

  useEffect(() => {
    fetchCar(carId);
  }, [carId]);

  const formatedDateRange = formatDateRangeForRequest(rent);

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
      {car && (
        <div className='flex justify-center gap-10'>
          <div className='grid h-fit basis-1/2 grid-cols-3 gap-5'>
            {car.media.map((image, index) => (
              <img
                className={cn("rounded-2xl", image.isCover && "order-first col-span-3")}
                key={image.url}
                src={`${process.env.BASE_API_URL}/api${image.url}`}
                alt={`${car.name} ${index}`}
              />
            ))}
          </div>
          <div className='basis-1/2 space-y-8'>
            <Typography variant='title_h1' tag='h1'>
              {car.name}
            </Typography>
            <div className='space-y-6'>
              <Typography variant='title_h2' tag='h2'>
                Характеристики
              </Typography>
              <div className='divide-border-light w-full divide-y'>
                <div className='border-t-border-light flex w-full items-center justify-between gap-6 border-t py-6'>
                  <Typography variant='paragraph_16_medium'>Коробка передач</Typography>
                  <Typography>{carTransmissionTranslation[car.transmission]}</Typography>
                </div>
                <div className='flex w-full items-center justify-between gap-6 py-6'>
                  <Typography variant='paragraph_16_medium'>Руль</Typography>
                  <Typography>{carSteeringTranslation[car.steering]}</Typography>
                </div>
                <div className='flex w-full items-center justify-between gap-6 py-6'>
                  <Typography variant='paragraph_16_medium'>Тип кузова</Typography>
                  <Typography>{carBodyTypeTranslation[car.bodyType]}</Typography>
                </div>
                <div className='flex w-full items-center justify-between gap-6 py-6'>
                  <Typography variant='paragraph_16_medium'>Цвет</Typography>
                  <Typography>{carColorTranslation[car.color]}</Typography>
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
                    <Typography variant='title_h3'>{rentalDays * car.price} ₽</Typography>
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
                  to={`${PATHS.CAR_RESERVATION}/${car.id}`}
                  className={cn(buttonVariants(), "basis-1/2 max-md:w-full")}
                >
                  Забронировать
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
      {!car && isLoading && <Spinner />}
    </div>
  );
};

export const carInfoRoute = createRoute(`${PATHS.CAR}/:carId`, <CarInfoPage />);
