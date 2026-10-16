import { SidebarContent } from "./sidebar-content";

/** Permanent sidebar for desktop (≥1024px). Smaller screens use <MobileNav />. */
export function Sidebar() {
  return (
    <aside
      aria-label="Sidebar"
      className="fixed inset-y-0 left-0 z-30 hidden w-(--sidebar-width) overflow-y-auto border-r border-border bg-sidebar lg:block"
    >
      <SidebarContent className="min-h-full px-7 py-10" />
    </aside>
  );
}
