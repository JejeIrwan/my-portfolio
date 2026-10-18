import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { CopyEmail } from "@/components/copy-email";
import { PageHeader } from "@/components/page-header";
import { getSocial, site } from "@/lib/site";

/* ------------------------------------------------------------------
 * Edit these to change the page.
 * ------------------------------------------------------------------ */

const HEADING = "Let's work together.";

const INTRO =
  "Got a project, a job opening, or just want to say hi? My inbox is always open, and I usually reply within a day or two.";

/**
 * WhatsApp number: country code 62 + number without the leading 0, digits only.
 * Example: 0812-3456-7890 → "6281234567890". Leave empty ("") to hide WhatsApp.
 */
const WHATSAPP_NUMBER = "6281365215007";

/** Message pre-filled in WhatsApp when someone taps the link. Leave empty ("") for none. */
const WHATSAPP_MESSAGE = "Hi Jeje, I found your portfolio and would like to talk.";

/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} by email, WhatsApp, LinkedIn, or GitHub.`,
};

type Channel = { key: string; label: string; href: string; detail: string };

function whatsappLink(): string {
  const text = WHATSAPP_MESSAGE ? `?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}

export default function ContactPage() {
  const linkedin = getSocial("linkedin");
  const github = getSocial("github");
  const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  const channels: Channel[] = [];
  if (WHATSAPP_NUMBER) {
    channels.push({ key: "whatsapp", label: "WhatsApp", href: whatsappLink(), detail: "Chat on WhatsApp" });
  }
  if (linkedin) {
    channels.push({ key: "linkedin", label: linkedin.label, href: linkedin.href, detail: shortUrl(linkedin.href) });
  }
  if (github) {
    channels.push({ key: "github", label: github.label, href: github.href, detail: shortUrl(github.href) });
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title={HEADING}>
        <p>{INTRO}</p>
      </PageHeader>

      <div className="mt-12">
        <CopyEmail email={site.email} />
      </div>

      {channels.length > 0 && (
        <section aria-labelledby="elsewhere-heading" className="mt-20">
          <h2 id="elsewhere-heading" className="label mb-4">
            Elsewhere
          </h2>
          <ul className="border-b border-border">
            {channels.map((channel) => (
              <li key={channel.key} className="border-t border-border">
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 text-[15px]"
                >
                  <span className="font-medium">{channel.label}</span>
                  <span className="flex min-w-0 items-center gap-2 text-sm text-muted group-hover:text-foreground">
                    <span className="truncate">{channel.detail}</span>
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
