import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { getInitials, site } from "@/lib/site";

/** Photo, name, role and social icons — all centered. */
export function SidebarProfile({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Link
        href="/"
        onClick={onNavigate}
        aria-label={`${site.name} — home`}
        className="relative block size-24 overflow-hidden rounded-2xl border border-border bg-card hover:opacity-90"
      >
        {site.avatar ? (
          <Image
            src={site.avatar}
            alt=""
            fill
            sizes="192px"
            quality={90}
            priority
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full items-center justify-center text-2xl font-semibold tracking-tight text-muted"
          >
            {getInitials(site.name)}
          </span>
        )}
      </Link>

      <p className="mt-5 text-[22px] font-semibold leading-tight tracking-tight text-foreground">
        {site.name}
      </p>
      <p className="mt-1.5 text-[13px] font-medium text-muted">{site.role}</p>
      <SocialLinks className="mt-4 justify-center" />
    </div>
  );
}
