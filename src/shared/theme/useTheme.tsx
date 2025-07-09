import { useContext } from "react";

import { ThemeProviderContext } from "./ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error();

  return context;
};
