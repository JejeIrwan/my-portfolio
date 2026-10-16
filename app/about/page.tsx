import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { ServiceCard } from "@/components/service-card";
import { getInitials, site } from "@/lib/site";

/**
 * Short introduction under "Hi, I'm …". One string per paragraph — edit freely.
 */
const intro = [
 "I'm a Computer Engineering graduate who's always been curious about the digital world and how technology shapes the way we live and work. That curiosity is what pulled me into building for the web.",
  "What I enjoy most is problem solving breaking a messy problem into small pieces and finding a clean way through it. I also love picking up new tech and tools, so there's usually something new I'm experimenting with.",
];

/**
 * Photo next to the introduction. Uses the same photo as the sidebar by default;
 * set a different path (e.g. "/about.jpg" in /public) to use another photo here.
 */
const photo = site.avatar;

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: services, tools, and experience as a ${site.role}.`,
};

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-16">
      <h2 id={id} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <header className="grid items-center gap-8 md:grid-cols-[1fr_200px] md:gap-12">
        <div className="order-2 md:order-1">
          <p className="label">About</p>
          <h1 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight sm:text-[36px] lg:text-[40px]">
            Hi, I&apos;m {site.name}.
          </h1>
          <div className="mt-6 max-w-[54ch] space-y-4 text-[15px] leading-7 text-muted sm:text-base">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="relative order-1 aspect-[4/5] w-40 overflow-hidden rounded-2xl border border-border bg-card sm:w-48 md:order-2 md:w-full">
          {photo ? (
            <Image
              src={photo}
              alt={`Photo of ${site.name}`}
              fill
              sizes="(min-width: 768px) 400px, 384px"
              quality={90}
              priority
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-full items-center justify-center text-4xl font-semibold tracking-tight text-muted"
            >
              {getInitials(site.name)}
            </span>
          )}
        </div>
      </header>

      <Section id="services" title="Services">
        <ul className="grid gap-4 sm:grid-cols-2">
          {site.services.map((service) => (
            <li key={service.title}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tools" title="Tools">
        <dl className="grid gap-4 sm:grid-cols-3">
          {site.tools.map((group) => (
            <div key={group.label} className="rounded-xl border border-border bg-card p-5">
              <dt className="label">{group.label}</dt>
              <dd className="mt-3">
                <ul className="space-y-1.5 text-sm text-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {site.experience.length > 0 && (
        <Section id="experience" title="Experience">
          <ol className="border-b border-border">
            {site.experience.map((item) => (
              <li
                key={`${item.period}-${item.role}`}
                className="grid gap-x-8 gap-y-1 border-t border-border py-6 sm:grid-cols-[140px_1fr]"
              >
                <p className="pt-0.5 text-xs font-medium tabular-nums text-muted">{item.period}</p>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight">{item.role}</h3>
                  <p className="mt-0.5 text-sm text-muted">{item.place}</p>
                  {item.summary && (
                    <p className="mt-2 max-w-[56ch] text-sm leading-6 text-muted">{item.summary}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}
    </>
  );
}
