import { brandIcons } from "@/components/icons/brand-icons";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)} aria-label="Social links">
      {site.socials.map((social) => {
        const Icon = brandIcons[social.icon];
        return (
          <li key={social.icon}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (opens in a new tab)`}
              title={social.label}
              className="inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-hover hover:text-foreground"
            >
              <Icon size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
