import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectCover } from "./project-cover";

/** Image on top, title and short description below. The whole card opens the detail page. */
export function ProjectCard({
  project,
  headingLevel = "h3",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <article>
      <Link href={`/projects/${project.slug}`} className="group block rounded-xl">
        <ProjectCover
          src={project.image}
          title={project.title}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="group-hover:border-muted group-hover:opacity-90"
        />
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <Heading className="text-[17px] font-semibold leading-snug tracking-tight underline decoration-transparent decoration-1 underline-offset-[6px] group-hover:decoration-accent">
            {project.title}
          </Heading>
          {project.year && (
            <span className="shrink-0 text-xs font-medium tabular-nums text-muted">
              {project.year}
            </span>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted">{project.summary}</p>
      </Link>
    </article>
  );
}

export function ProjectGrid({
  projects,
  headingLevel = "h3",
}: {
  projects: Project[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
