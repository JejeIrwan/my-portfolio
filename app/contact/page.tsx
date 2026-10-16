import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { getSocial, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} by email, LinkedIn, or GitHub.`,
};

export default function ContactPage() {
  const channels = [getSocial("linkedin"), getSocial("github")].filter(
    (social) => social !== undefined,
  );

  return (
    <>
      <PageHeader eyebrow="Contact" title="Say hello.">
        <p>
          Have a project in mind, a role to discuss, or a question about something I&apos;ve built?
          Email is the best way to reach me — I read every message and reply as soon as I can.
        </p>
      </PageHeader>

      <a
        href={`mailto:${site.email}`}
        className="group mt-12 inline-flex items-center gap-3 text-xl font-medium tracking-tight underline decoration-border decoration-1 underline-offset-8 hover:decoration-accent sm:text-2xl"
      >
        <Mail size={22} strokeWidth={1.5} aria-hidden="true" className="text-muted" />
        {site.email}
      </a>

      {channels.length > 0 && (
        <section aria-labelledby="elsewhere-heading" className="mt-20">
          <h2 id="elsewhere-heading" className="label mb-4">
            Elsewhere
          </h2>
          <ul className="border-b border-border">
            {channels.map((channel) => (
              <li key={channel.icon} className="border-t border-border">
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 text-[15px]"
                >
                  <span className="font-medium">{channel.label}</span>
                  <span className="flex min-w-0 items-center gap-2 text-sm text-muted group-hover:text-foreground">
                    <span className="truncate">{channel.href.replace(/^https?:\/\/(www\.)?/, "")}</span>
                    <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
