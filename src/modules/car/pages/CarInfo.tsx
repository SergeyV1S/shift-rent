import { Suspense } from "react";
import { useParams } from "react-router";
import type { RouteObject } from "react-router";

import { PATHS } from "@shared/constants";
import { Spinner } from "@shared/ui";

const CarInfoPage = () => {
  const { carId } = useParams() as { carId: string };

  return <div className=''>{carId}</div>;
};

export const createCarInfoRoute = (): RouteObject => ({
  path: `${PATHS.HOME}:carId`,
  element: (
    <Suspense fallback={<Spinner />}>
      <CarInfoPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
