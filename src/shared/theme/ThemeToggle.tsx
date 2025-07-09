import { MoonIcon, PcCaseIcon, SunIcon } from "lucide-react";

import { Select } from "@shared/ui";

import type { TTheme } from "./ThemeContext";
import { useTheme } from "./useTheme";

const themeVariants = [
  {
    label: <SunIcon className='text-base-text' />,
    value: "light"
  },
  {
    label: <MoonIcon className='text-base-text' />,
    value: "dark"
  },
  {
    label: <PcCaseIcon className='text-base-text' />,
    value: "system"
  }
];

export const ThemeToggle = () => {
  const { theme, setNewTheme } = useTheme();

  const selectTheme = (newTheme: string) => setNewTheme(newTheme as TTheme);

  return (
    <Select
      options={themeVariants}
      onChange={selectTheme}
      value={theme}
      triggerClassName='border-none focus:ring-0 focus:border-none'
    />
  );
};
