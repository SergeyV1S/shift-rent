import { createBrowserRouter } from "react-router";

import { createSignInRoute } from "@modules/auth";
import { createCarInfoRoute, createHomeRoute } from "@modules/car";
import { createRentHistoryRoute } from "@modules/rent";

import { AppLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      createHomeRoute(),
      createCarInfoRoute(),
      createSignInRoute(),
      createRentHistoryRoute()
    ]
  }
]);
