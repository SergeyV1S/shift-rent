import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

import { ThemeProvider } from "@shared/theme";

import { router } from "./router";

export const Providers = () => (
  <ThemeProvider>
    <RouterProvider router={router} />
    <Toaster position='top-center' richColors closeButton />
  </ThemeProvider>
);
