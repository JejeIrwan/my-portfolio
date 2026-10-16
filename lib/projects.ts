/**
 * Project data.
 * These entries are placeholders — replace them with your real work.
 *
 * Images: put files in /public/projects/ and reference them like "/projects/ledger.jpg".
 * A 16:10 landscape image (e.g. 1600×1000) fits the cards best.
 * If `image` is left out, a neutral placeholder with the project title is shown.
 */

export type Project = {
  /** Used in the URL: /projects/<slug> */
  slug: string;
  title: string;
  /** Short description shown under the image on the cards. */
  summary: string;
  /** Full explanation on the detail page — one string per paragraph. */
  overview: string[];
  /** Key features or decisions, shown as a list on the detail page. */
  highlights?: string[];
  /** Your role on the project, e.g. "Solo project" or "Frontend lead". */
  role?: string;
  stack: string[];
  year?: number;
  /** Cover image (cards + detail page). */
  image?: string;
  /** Extra screenshots shown at the bottom of the detail page. */
  gallery?: string[];
  liveUrl?: string;
  sourceUrl?: string;
  /** Show on the Home page (the first two featured projects are used). */
  featured?: boolean;
};

export const projects: Project[] = [
{
    slug: "website-sekolah", // muncul di URL: /projects/nama-proyek (huruf kecil, pakai tanda -)
    title: "Teramia School - Official Website & SPMB System",
    summary: "A responsive, full-stack school website built to streamline student enrollment, showcase institutional profile, and centralize school announcements.",
    overview: [
      "This project is an end-to-end school web portal and online enrollment system tailored for Teramia School. It bridges the communication gap between the school and prospective families by providing clear, accessible information on school history, curriculum, and wave-based student admission schedules in one unified platform.",
      "I engineered the entire web application from concept to deployment, focusing on clean code architecture, fast load times, and intuitive navigation. By combining a custom front-end layout with a relational database on the back end, I implemented dynamic page rendering, automated admission forms, and an easy-to-manage database structure that allows non-technical staff to update site content effortlessly.",
    ],
    highlights: [
      "Wave-based online student admission system (SPMB) with automated registration workflows.",
      "Dynamic database-driven content management for school profiles, academic programs, and news.",
      "Modular front-end architecture with reusable UI components and responsive multi-device layouts."
    ],
    role: "Solo project",
    stack: ["PHP", "Laravel", "Tailwind CSS"],
    year: 2026,
    image: "/projects/website-sekolah.png",
    liveUrl: "https://link-demo-kamu.com",
    sourceUrl: "https://github.com/username/nama-proyek",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 2);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The project after this one (wraps around), used for the "Next project" link. */
export function getNextProject(slug: string): Project | undefined {
  if (projects.length < 2) return undefined;
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
