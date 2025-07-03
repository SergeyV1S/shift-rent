import { Suspense, useEffect } from "react";
import type { RouteObject } from "react-router";

import { PATHS } from "@shared/constants";
import { Spinner } from "@shared/ui";

import { CarCard } from "../_components";
import { useCarStore } from "../model";

const HomePage = () => {
  const { cars, isLoading, fetchCars } = useCarStore();

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <main className='relative flex h-screen flex-wrap items-center justify-center gap-10'>
      {!isLoading ? cars.map((car) => <CarCard key={car.id} {...car} />) : <Spinner />}
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
