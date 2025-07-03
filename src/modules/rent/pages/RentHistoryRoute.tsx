import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { PATHS } from "@shared/constants";
import { Spinner } from "@shared/ui";

import { RentHistoryPage } from "./RentHistory";

export const createRentHistoryRoute = (): RouteObject => ({
  path: PATHS.RENT_HISTORY,
  element: (
    <Suspense fallback={<Spinner />}>
      <RentHistoryPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
