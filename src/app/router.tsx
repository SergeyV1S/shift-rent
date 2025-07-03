import { createBrowserRouter } from "react-router";

import { createSignInRoute } from "@modules/auth";
import { createRentHistoryRoute } from "@modules/rent";

import { PATHS } from "@shared/constants";

import { AppLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      createSignInRoute(),
      createRentHistoryRoute(),
      {
        path: PATHS.HOME,
        element: <div className=''>Привет</div>
      }
    ]
  }
]);
