import { site } from "@/lib/site";

/** Page footer for tablet/mobile, where the sidebar footer lives inside the drawer. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-8 sm:px-10 lg:hidden">
      <p className="text-xs text-muted">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
