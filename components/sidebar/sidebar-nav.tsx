"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isActivePath, navItems } from "@/lib/navigation";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="-mx-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px]",
                  active
                    ? "bg-selected font-semibold text-foreground"
                    : "font-medium text-muted hover:bg-hover hover:text-foreground",
                )}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2 : 1.75}
                  aria-hidden="true"
                  className={cn("shrink-0", active && "text-accent")}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
