import { House, LayoutGrid, Mail, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: "/" | "/projects" | "/about" | "/contact";
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/projects", label: "Projects", icon: LayoutGrid },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
