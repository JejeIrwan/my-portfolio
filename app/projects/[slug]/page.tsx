import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ExternalLink } from "@/components/text-link";
import { getNextProject, getProject, projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.image ? { images: [project.image] } : undefined,
  };
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-x-10 gap-y-3 border-t border-border py-9 md:grid-cols-[140px_1fr]">
      <h2 className="label pt-1">{title}</h2>
      <div className="min-w-0 text-[15px] leading-7 text-muted">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const meta = [project.year, project.role].filter(Boolean).join(" · ");
  // Cover first, then the extra screenshots — all of them open in the slider.
  const photos = [project.image, ...(project.gallery ?? [])].filter(
    (src): src is string => Boolean(src),
  );

  return (
    <article>
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
      >
        <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-10">
        {meta && <p className="label">{meta}</p>}
        <h1 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight sm:text-[36px] lg:text-[40px]">
          {project.title}
        </h1>
        <p className="mt-5 max-w-[56ch] text-[15px] leading-7 text-muted sm:text-base">
          {project.summary}
        </p>

        {(project.liveUrl || project.sourceUrl) && (
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {project.liveUrl && <ExternalLink href={project.liveUrl}>Live demo</ExternalLink>}
            {project.sourceUrl && <ExternalLink href={project.sourceUrl}>Source code</ExternalLink>}
          </div>
        )}
      </header>

      {photos.length > 0 ? (
        <ProjectGallery images={photos} title={project.title} className="mt-12" />
      ) : (
        <ProjectCover
          title={project.title}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="mt-12"
        />
      )}

      <div className="mt-14 border-b border-border">
        <Section title="Overview">
          <div className="max-w-[60ch] space-y-4">
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>

        {project.highlights && project.highlights.length > 0 && (
          <Section title="Highlights">
            <ul className="max-w-[60ch] space-y-2">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[13px] h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="Stack">
          <p>{project.stack.join(" · ")}</p>
        </Section>
      </div>

      {next && next.slug !== project.slug && (
        <nav aria-label="More projects" className="mt-16">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5 hover:border-muted"
          >
            <span>
              <span className="label block">Next project</span>
              <span className="mt-1 block text-[17px] font-semibold tracking-tight">
                {next.title}
              </span>
            </span>
            <ArrowRight
              size={18}
              strokeWidth={1.75}
              aria-hidden="true"
              className="shrink-0 text-muted group-hover:text-foreground"
            />
          </Link>
        </nav>
      )}
    </article>
  );
}
