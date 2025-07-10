import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

import { OfflineModeProvider } from "@shared/offline-mode";
import { ThemeProvider } from "@shared/theme";

import { router } from "./router";

export const Providers = () => (
  <OfflineModeProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster position='top-center' richColors closeButton />
    </ThemeProvider>
  </OfflineModeProvider>
);
