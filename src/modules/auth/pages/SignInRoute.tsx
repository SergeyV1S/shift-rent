import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { PATHS } from "@shared/constants";
import { Spinner } from "@shared/ui";

import { SignInPage } from "./SignIn";

export const createSignInRoute = (): RouteObject => ({
  path: PATHS.SIGNIN,
  element: (
    <Suspense fallback={<Spinner />}>
      <SignInPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
