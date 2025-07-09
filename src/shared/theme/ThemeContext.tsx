import { createContext, useEffect, useState } from "react";

import { THEME } from "@shared/constants";

export type TTheme = "dark" | "light" | "system";

type TThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: TTheme;
};

type TThemeProviderState = {
  theme: TTheme;
  setNewTheme: (newTheme: TTheme) => void;
};

const initialState: TThemeProviderState = {
  theme: "system",
  setNewTheme: () => null
};

export const ThemeProviderContext = createContext<TThemeProviderState>(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  ...props
}: TThemeProviderProps) => {
  const [theme, setTheme] = useState<TTheme>(
    (localStorage.getItem(THEME) as TTheme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setNewTheme: (newTheme: TTheme) => {
      localStorage.setItem(THEME, newTheme);
      setTheme(newTheme);
    }
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
