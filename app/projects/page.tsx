import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectGrid } from "@/components/projects/project-card";
import { TextLink } from "@/components/text-link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work: web applications, APIs, and tools — each with a full write-up, live demo, and source code.",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <>
      <PageHeader eyebrow="Projects" title="Things I've built.">
        <p>Real projects I’ve worked on, from idea to launch. Click a project to see the story behind it.</p>
      </PageHeader>

      <section aria-label="Project list" className="mt-14">
        <ProjectGrid projects={sorted} headingLevel="h2" />
      </section>

      <p className="mt-16 text-[15px] text-muted">
        Want to talk about one of these? <TextLink href="/contact">Get in touch</TextLink>
      </p>
    </>
  );
}
