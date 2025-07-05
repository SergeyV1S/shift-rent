import { createBrowserRouter } from "react-router";

import { createSignInRoute } from "@modules/auth";
import { createCarInfoRoute, createHomeRoute } from "@modules/car";
import { createRentHistoryRoute } from "@modules/rent";

import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute onlyUnauth />,
        children: [createSignInRoute()]
      },
      {
        element: <ProtectedRoute />,
        children: [createRentHistoryRoute()]
      },
      createHomeRoute(),
      createCarInfoRoute()
    ]
  }
]);
