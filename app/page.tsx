import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectGrid } from "@/components/projects/project-card";
import { TextLink } from "@/components/text-link";
import { featuredProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.role}` },
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="intro-heading">
        <p className="label">{site.role}</p>
        <h1
          id="intro-heading"
          className="mt-5 max-w-[16ch] text-[32px] font-semibold leading-[1.12] tracking-tight sm:text-[40px] lg:text-[46px]"
        >
         Hi, I’m Jeje.
        </h1>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-7 text-muted sm:text-base">
         I build modern web applications with React, Next.js, and Node.js, based in Batam. Currently open to freelance projects and new opportunities.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link
            href="/projects"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:opacity-85"
          >
            View projects
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </Link>
          <TextLink href="/contact" className="text-sm">
            Get in touch
          </TextLink>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section aria-labelledby="selected-heading" className="mt-24 sm:mt-28">
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <h2 id="selected-heading" className="label">
              Selected projects
            </h2>
            <TextLink href="/projects" className="text-sm">
              All projects
            </TextLink>
          </div>
          <ProjectGrid projects={featuredProjects} headingLevel="h3" />
        </section>
      )}
    </>
  );
}
