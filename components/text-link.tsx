import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center gap-1 font-medium text-foreground underline decoration-border decoration-1 underline-offset-[6px] hover:decoration-accent";

/** Internal link with the site's underline style. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(base, className)}>
      {children}
    </Link>
  );
}

/** External link that opens in a new tab, marked with an arrow. */
export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, className)}>
      {children}
      <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" className="text-muted" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
