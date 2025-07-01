import { createBrowserRouter } from "react-router";

import { PATHS } from "@shared/constants";

import { AppLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: PATHS.HOME,
        element: <div className=''>Привет</div>
      }
    ]
  }
]);
