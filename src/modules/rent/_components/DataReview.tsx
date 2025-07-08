import { PencilIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { useCarStore } from "@modules/car";

import { formatDateRange, formatDateRangeForRequest, getTimeDiff } from "@shared/helpers";
import { Button, Typography } from "@shared/ui";

import { ESteps } from "../constants";
import { useCreateRentStore } from "../model";

export const DataReview = () => {
  const navigate = useNavigate();
  const carStore = useCarStore();
  const { rentData, isLoading, prevStep, moveToStep, createRent } = useCreateRentStore();
  const { carId } = useParams() as { carId: string };

  const formatedDate = formatDateRangeForRequest({
    startDate: rentData.startDate,
    endDate: rentData.endDate
  });

  const rentDates = formatDateRange(formatedDate);

  const rentalDays = getTimeDiff(formatedDate);

  const onClickHandler = () => {
    createRent(navigate);
  };

  useEffect(() => {
    carStore.fetchCar(carId);
  }, [carId]);

  return (
    <div className='space-y-6'>
      <div className='rounded-card bg-border-light/20 w-full space-y-6'>
        <div className='relative grid w-full grid-cols-3 gap-6 px-12 py-6'>
          <Button
            className='absolute top-5 right-5'
            variant='ghost'
            size='icon'
            onClick={() => moveToStep(ESteps.CAR_RESERVATION)}
          >
            <PencilIcon className='text-content-06' />
          </Button>
          <Typography variant='paragraph_16_medium'>Данные брони</Typography>
          <div className='space-y-6'>
            <div className='relative space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Автомобиль</Typography>
              <Typography className=''>
                {!carStore.isLoading && carStore.car && carStore.car.name}
                {carStore.isLoading && "Загружаем машинку..."}
              </Typography>
            </div>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Даты брони</Typography>
              <Typography>{rentDates}</Typography>
            </div>
          </div>
          <div className='space-y-6'>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Место получения</Typography>
              <Typography>{rentData.pickupLocation}</Typography>
            </div>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Место возврата</Typography>
              <Typography>{rentData.returnLocation}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-card bg-border-light/20 w-full space-y-6'>
        <div className='relative grid w-full grid-cols-3 gap-6 px-12 py-6'>
          <Button
            className='absolute top-5 right-5'
            variant='ghost'
            size='icon'
            onClick={() => moveToStep(ESteps.USER_DATA)}
          >
            <PencilIcon className='text-content-06' />
          </Button>
          <Typography variant='paragraph_16_medium'>Данные заказчика</Typography>
          <div className='space-y-6'>
            <div className='relative space-y-0.5'>
              <Typography variant='paragraph_12_regular'>ФИО</Typography>
              <Typography className=''>{`${rentData.lastName} ${rentData.firstName} ${rentData.middleName}`}</Typography>
            </div>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Дата рождения</Typography>
              <Typography>{rentData.birthDate}</Typography>
            </div>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Номер телефона</Typography>
              <Typography>{rentData.phone}</Typography>
            </div>
          </div>
          <div className='space-y-6'>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Электронная почта</Typography>
              <Typography>{rentData.email}</Typography>
            </div>
            {rentData.comment && (
              <div className='space-y-0.5'>
                <Typography variant='paragraph_12_regular'>Комментарий</Typography>
                <Typography>{rentData.comment}</Typography>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='w-full space-y-4 text-end'>
        {carStore.car && (
          <Typography variant='title_h3'>Итого: {rentalDays * carStore.car.price} ₽</Typography>
        )}
        <Typography>Аренда: {rentDates}</Typography>
      </div>
      <nav className='flex w-full items-center justify-between'>
        <Button
          className='basis-1/3'
          type='button'
          variant='outline'
          disabled={isLoading}
          onClick={prevStep}
        >
          Назад
        </Button>
        <Button className='basis-1/3' isLoading={isLoading} type='submit' onClick={onClickHandler}>
          Забронировать
        </Button>
      </nav>
    </div>
  );
};
