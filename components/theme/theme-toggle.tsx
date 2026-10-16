"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const label =
    theme === "light"
      ? "Switch to dark mode"
      : theme === "dark"
        ? "Switch to light mode"
        : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted hover:bg-hover hover:text-foreground"
    >
      {/* Icons are switched by CSS from <html data-theme>, so the right one shows before hydration. */}
      <Sun size={16} strokeWidth={1.75} aria-hidden="true" className="light:hidden" />
      <Moon size={16} strokeWidth={1.75} aria-hidden="true" className="dark:hidden" />
    </button>
  );
}
