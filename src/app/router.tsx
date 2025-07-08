import { createBrowserRouter } from "react-router";

import { signInRoute } from "@modules/auth";
import { carInfoRoute, homeRoute } from "@modules/car";
import {
  createRentRoute,
  rentDetailsRoute,
  rentHistoryRoute,
  requestSentRoute
} from "@modules/rent";
import { profileRoute } from "@modules/user";

import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute onlyUnauth />,
        children: [signInRoute]
      },
      {
        element: <ProtectedRoute />,
        children: [rentHistoryRoute, rentDetailsRoute, profileRoute]
      },
      homeRoute,
      carInfoRoute,
      createRentRoute,
      requestSentRoute
    ]
  }
]);
