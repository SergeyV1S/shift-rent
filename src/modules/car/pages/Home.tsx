import { PATHS } from "@shared/constants";
import { createRoute } from "@shared/lib";
import { Spinner, Typography } from "@shared/ui";

import { CarCard, CarFilter } from "../_components";
import { useCarStore } from "../model";

const HomePage = () => {
  const { cars, isLoading } = useCarStore();

  return (
    <div className='relative h-screen space-y-12'>
      <CarFilter />
      <section className='flex flex-wrap items-center justify-center gap-10'>
        {!isLoading &&
          (cars.length === 0 ? (
            <div className='bg-brand-primary rounded-2xl px-6 py-2'>
              <Typography variant='paragraph_16_medium' className='text-white'>
                Ничего не найдено 😕
              </Typography>
            </div>
          ) : (
            cars.map((car) => <CarCard key={car.id} {...car} />)
          ))}
        {isLoading && <Spinner />}
      </section>
    </div>
  );
};

export const homeRoute = createRoute(PATHS.HOME, <HomePage />);
