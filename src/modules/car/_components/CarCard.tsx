import { Link } from "react-router";

import type { Car } from "@shared/api";
import { Typography, buttonVariants } from "@shared/ui";

export const CarCard = (car: Car) => {
  const carImage = car.media.filter((image) => image.isCover)[0].url;
  const priceForTwoWeeks = car.price * 14;

  return (
    <div className='hover:border-brand-primary transition-[transform, border-color] flex w-[300px] flex-col gap-6 rounded-lg border border-transparent p-4 duration-300 hover:z-50 hover:origin-bottom hover:scale-110 hover:rotate-1'>
      <img
        className='h-[200px] w-full rounded-lg'
        src={`${process.env.BASE_API_URL}/api${carImage}`}
        alt={car.name}
      />
      <div className='space-y-8'>
        <div className='space-y-2'>
          <Typography variant='title_h3'>{car.name}</Typography>
          <Typography>{car.transmission}</Typography>
        </div>
        <div className='flex items-center justify-between'>
          <Typography variant='title_h3'>{car.price} ₽</Typography>
          <Typography>{priceForTwoWeeks} ₽ за 14 дней</Typography>
        </div>
      </div>
      <Link to={car.id} className={buttonVariants()}>
        Выбрать
      </Link>
    </div>
  );
};
