import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { PATHS } from "@shared/constants";
import { Spinner } from "@shared/ui";

import { CarCard, CarFilter } from "../_components";
import { useCarStore } from "../model";

const HomePage = () => {
  const { cars, isLoading } = useCarStore();

  return (
    <main className='relative h-screen space-y-12'>
      <CarFilter />
      <section className='flex flex-wrap items-center justify-center gap-10'>
        {!isLoading ? cars.map((car) => <CarCard key={car.id} {...car} />) : <Spinner />}
      </section>
    </main>
  );
};

export const createHomeRoute = (): RouteObject => ({
  path: PATHS.HOME,
  element: (
    <Suspense fallback={<Spinner />}>
      <HomePage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
