import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/site";

export function SidebarFooter() {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
      <p className="text-xs text-muted">
        © {new Date().getFullYear()} {site.name}
      </p>
      <ThemeToggle />
    </div>
  );
}
