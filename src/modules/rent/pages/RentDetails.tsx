import { useEffect } from "react";
import { useParams } from "react-router";

import { PATHS } from "@shared/constants";
import { formatDateFromISO, formatDateRangeFromNumber, formatPhoneToView } from "@shared/helpers";
import { createRoute } from "@shared/lib";
import { Spinner, Typography } from "@shared/ui";

import { RentDetailsButtons, ViewStatus } from "../_components";
import { useRentHistoryStore } from "../model";

export const RentDetailsPage = () => {
  const { rent, isLoading, fetchRentDetails } = useRentHistoryStore();
  const { rentId } = useParams() as { rentId: string };

  useEffect(() => {
    fetchRentDetails(rentId);
  }, []);

  return (
    <div className='space-y-6'>
      <Typography variant='title_h2' tag='h1'>
        Детали бронирования
      </Typography>
      <article className='border-border-light relative min-h-[431px] rounded-2xl border'>
        {!isLoading && rent && (
          <div className='w-full px-12 py-6'>
            <div className='flex gap-6 max-md:flex-col'>
              <div className='basis-1/2 space-y-6'>
                <Typography variant='paragraph_16_medium'>Данные брони</Typography>
                <div className='space-y-0.5'>
                  <Typography variant='paragraph_12_regular'>Статус</Typography>
                  <ViewStatus status={rent.status} />
                </div>
                <div className='space-y-0.5'>
                  <Typography variant='paragraph_12_regular'>Даты брони</Typography>
                  <Typography>{formatDateRangeFromNumber(rent.startDate, rent.endDate)}</Typography>
                </div>
                <div className='space-y-0.5'>
                  <Typography variant='paragraph_12_regular'>Место получения</Typography>
                  <Typography>{rent.pickupLocation}</Typography>
                </div>
                <div className='space-y-0.5'>
                  <Typography variant='paragraph_12_regular'>Место возврата</Typography>
                  <Typography>{rent.returnLocation}</Typography>
                </div>
                <RentDetailsButtons className='max-md:hidden' />
              </div>
              <div className='basis-1/2 space-y-6'>
                <Typography variant='paragraph_16_medium'>Данные заказчика</Typography>
                <div className='space-y-0.5'>
                  <Typography variant='paragraph_12_regular'>ФИО</Typography>
                  <Typography>{`${rent.lastName} ${rent.firstName} ${rent.middleName}`}</Typography>
                </div>
                <div className='space-y-0.5'>
                  <Typography variant='paragraph_12_regular'>Дата рождения</Typography>
                  <Typography>{formatDateFromISO(rent.birthDate)}</Typography>
                </div>
                <div className='space-y-0.5'>
                  <Typography variant='paragraph_12_regular'>Номер телефона</Typography>
                  <Typography>{formatPhoneToView(rent.phone)}</Typography>
                </div>
                <div className='space-y-0.5'>
                  <Typography variant='paragraph_12_regular'>Электронная почта</Typography>
                  <Typography>{rent.email}</Typography>
                </div>
              </div>
              <RentDetailsButtons className='md:hidden' />
            </div>
          </div>
        )}
        {isLoading && <Spinner />}
      </article>
    </div>
  );
};

export const rentDetailsRoute = createRoute(`${PATHS.RENT_HISTORY}/:rentId`, <RentDetailsPage />);
