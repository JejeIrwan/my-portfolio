/**
 * The <html data-theme> attribute is the single source of truth for the theme.
 * This tiny store reads/writes it and notifies React subscribers.
 * Safe to import from server code: nothing here touches the DOM at module load.
 */

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function readStored(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;

  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage may be unavailable (private mode); the theme still applies for this visit.
    }
  }

  notify();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  // Keep tabs in sync when the theme changes in another tab.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    applyTheme(event.newValue === "light" ? "light" : DEFAULT_THEME, false);
  };

  // Follow the system preference only while the user has not made a choice.
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onSystemChange = () => {
    if (readStored()) return;
    applyTheme(media.matches ? "light" : DEFAULT_THEME, false);
  };

  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onSystemChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onSystemChange);
  };
}
