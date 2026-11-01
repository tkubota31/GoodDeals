import { createContext, useContext, type ReactNode } from "react";
import { useColorScheme } from "react-native";

import { Colors, ThemeColors } from "@/constants/theme";

const ThemeContext = createContext<ThemeColors | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within an AppThemeProvider");
  }

  return context;
}
