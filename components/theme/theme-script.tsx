import { THEME_STORAGE_KEY } from "./theme-store";

/**
 * Runs before first paint to apply the saved theme, preventing a flash of the wrong theme.
 * Order: saved choice → system preference (only if it is light) → dark fallback.
 */
const script = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var t=s==="light"||s==="dark"?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");var d=document.documentElement;d.setAttribute("data-theme",t);d.style.colorScheme=t;}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
