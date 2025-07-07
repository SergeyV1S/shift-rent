import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

import { router } from "./router";

export const Providers = () => (
  <>
    <RouterProvider router={router} />
    <Toaster position='top-center' richColors />
  </>
);
