"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { SidebarContent } from "./sidebar-content";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Top bar + slide-in drawer for tablet and mobile (<1024px). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      // Keep keyboard focus inside the open drawer.
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // If the screen grows to desktop size, the permanent sidebar takes over.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktopChange = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktopChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktopChange);
    };
  }, [open, close]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-5 sm:px-8 lg:hidden">
        <Link href="/" className="text-base font-semibold tracking-tight hover:opacity-80">
          {site.name}
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-foreground hover:bg-hover"
        >
          <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </header>

      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 bg-scrim transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(300px,85vw)] overflow-y-auto border-r border-border bg-sidebar transition-[translate,background-color,border-color] duration-200 ease-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label="Close menu"
          className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-md text-muted hover:bg-hover hover:text-foreground"
        >
          <X size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <SidebarContent className="min-h-full px-7 pb-8 pt-10" onNavigate={close} />
      </div>
    </>
  );
}
