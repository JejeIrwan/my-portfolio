"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { applyTheme, getTheme, subscribe, type Theme } from "./theme-store";

type ThemeContextValue = {
  /** `null` during server render and hydration, the real theme afterwards. */
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// During SSR and hydration React uses the server snapshot (null), then re-renders
// with the client value — so there is no hydration mismatch.
const getServerSnapshot = (): Theme | null => null;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => applyTheme(next, true), []);
  const toggleTheme = useCallback(() => {
    applyTheme(getTheme() === "dark" ? "light" : "dark", true);
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>.");
  return context;
}
