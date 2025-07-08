import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { PATHS } from "@shared/constants";
import { formatDateFromISO, formatDateRangeFromNumber, formatPhoneToView } from "@shared/helpers";
import { cn, createRoute } from "@shared/lib";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Spinner,
  Typography,
  buttonVariants
} from "@shared/ui";

import { ViewStatus } from "../_components";
import { useRentHistoryStore } from "../model";

export const RentDetailsPage = () => {
  const {
    rent,
    isLoading,
    isCancelModelOpen,
    fetchRentDetails,
    toggleCancelModelOpen,
    cancelRent
  } = useRentHistoryStore();
  const { rentId } = useParams() as { rentId: string };
  const navigate = useNavigate();

  const handleCancelRentButtonClick = () => {
    if (rent) {
      cancelRent(rent._id, navigate);
    }
  };

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
            <div className='flex gap-6'>
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
                <div className='flex w-1/2 items-center gap-6 pt-4'>
                  <Link
                    to={PATHS.RENT_HISTORY}
                    className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                  >
                    Назад
                  </Link>
                  <Dialog isModalOpen={isCancelModelOpen} setIsModalOpen={toggleCancelModelOpen}>
                    <DialogTrigger asChild>
                      <Button className='w-full'>Отменить бронь</Button>
                    </DialogTrigger>

                    <DialogHeader />
                    <DialogContent className='flex flex-col items-center justify-center gap-10'>
                      <div className='flex flex-col items-center justify-center space-y-4'>
                        <img src='/accept-red.svg' alt='accept icon' />
                        <Typography variant='title_h3' tag='h3'>
                          Отменить бронь?
                        </Typography>
                      </div>
                      <div className='w-full space-y-4'>
                        <Button
                          variant='outline'
                          className='w-full'
                          onClick={handleCancelRentButtonClick}
                        >
                          Отменить
                        </Button>
                        <Button className='w-full' onClick={() => toggleCancelModelOpen()}>
                          Не отменять
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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
            </div>
          </div>
        )}
        {isLoading && <Spinner />}
      </article>
    </div>
  );
};

export const rentDetailsRoute = createRoute(`${PATHS.RENT_HISTORY}/:rentId`, <RentDetailsPage />);
