import { cn } from "@/lib/cn";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarNav } from "./sidebar-nav";
import { SidebarProfile } from "./sidebar-profile";

/**
 * Shared by the desktop sidebar and the mobile drawer:
 * profile at the top, navigation centered in the remaining space, footer at the bottom.
 */
export function SidebarContent({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <SidebarProfile onNavigate={onNavigate} />
      <div className="flex flex-1 items-center py-10">
        <div className="w-full">
          <SidebarNav onNavigate={onNavigate} />
        </div>
      </div>
      <SidebarFooter />
    </div>
  );
}
