import type { JSX } from "react";
import type { RouteObject } from "react-router";

import type { PATHS } from "@shared/constants";

export const createRoute = (
  path: keyof typeof PATHS | string,
  component: JSX.Element,
  config?: RouteObject
): RouteObject => ({
  path,
  element: component,
  errorElement: <div className=''>Error</div>,
  ...config
});
