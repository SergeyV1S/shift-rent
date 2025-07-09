import { Link, Navigate } from "react-router";

import { useAuthStore } from "@modules/auth";

import { PATHS } from "@shared/constants";
import { formatDateRangeForRequest, formatDateRangeWithYear } from "@shared/helpers";
import { cn, createRoute } from "@shared/lib";
import { Spinner, Typography, buttonVariants } from "@shared/ui";

import { ViewStatus } from "../_components";
import { useCreateRentStore } from "../model";

export const RequestSent = () => {
  const { createdRent, isLoading } = useCreateRentStore();
  const { isAuth } = useAuthStore();

  if (!createdRent && !isLoading) {
    const redirectPath = isAuth ? PATHS.RENT_HISTORY : PATHS.SIGNIN;

    return <Navigate to={redirectPath} state={{ from: { pathname: PATHS.RENT_HISTORY } }} />;
  }

  const formatedDate = formatDateRangeForRequest({
    startDate: createdRent?.startDate,
    endDate: createdRent?.endDate
  });

  const rentDatesWithYear = formatDateRangeWithYear(formatedDate);

  return (
    <div className='mt-12 w-2/3 space-y-6 max-lg:w-full'>
      <div className='flex items-center gap-9'>
        <img className='size-14 max-md:size-12' src='/accept.png' alt='accept icon' />
        <Typography tag='h1' variant='title_h2'>
          Автомобиль забронирован
        </Typography>
      </div>

      <article className='rounded-card border-border-light min-h[660px] relative border'>
        {createdRent && !isLoading && (
          <div className='space-y-6 px-12 py-6'>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Статус</Typography>
              <ViewStatus status={createdRent.status} />
            </div>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Даты брони</Typography>
              <Typography>{rentDatesWithYear}</Typography>
            </div>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Место получения</Typography>
              <Typography>{createdRent.pickupLocation}</Typography>
            </div>
            <div className='space-y-0.5'>
              <Typography variant='paragraph_12_regular'>Место возврата</Typography>
              <Typography>{createdRent.returnLocation}</Typography>
            </div>
            <Typography variant='paragraph_14_regular' className='text-content-06'>
              Вся информация была продублирована в SMS
            </Typography>
          </div>
        )}
        {isLoading && <Spinner />}
      </article>

      <nav className='max-md:flex max-md:flex-col max-md:gap-3 md:space-x-6'>
        <Link
          to={PATHS.RENT_HISTORY}
          className={cn(buttonVariants({ variant: "outline" }), "w-1/3 max-md:w-full")}
        >
          Посмотреть статус
        </Link>
        <Link to={PATHS.HOME} className={cn(buttonVariants(), "w-1/3 max-md:w-full")}>
          На главную
        </Link>
      </nav>
    </div>
  );
};

export const requestSentRoute = createRoute(PATHS.REQUEST_SENT, <RequestSent />);
