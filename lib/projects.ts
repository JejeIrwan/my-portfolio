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
  /** Extra screenshots: shown as thumbnails under the cover, and in the full-screen slider. */
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
    // Foto tambahan: taruh file di /public/projects/ lalu tambahkan path-nya di sini.
    gallery: ["/projects/sekolah-spmb.png", "/projects/sekolah-berita.png"],
    liveUrl: "https://teramiaschool.sch.id/",
    sourceUrl: "https://github.com/JejeIrwan",
    featured: true,
  },
  {
    slug: "giliran",
    title: "Giliran - Barbershop Queue & Online Booking",
    summary: "A web-based booking and queue system that lets barbershop customers reserve a service, a barber, and a time slot online, with a dashboard for owners to manage the day.",
    overview: [
      "Busy barbershops share a familiar problem: customers want a haircut but have no idea when a barber will be free. Many end up visiting the shop just to ask about the queue, only to wait for a long time or come back later. Giliran solves this by putting the shop's schedule online, so customers can see what is available and book a slot from their phone without leaving home.",
      "The booking flow is short and clear. Customers pick a service, choose a barber (or let the system assign whoever is free first), select a time, and enter their name and WhatsApp number. They receive a booking code to show at the shop, can save the details to WhatsApp, and can cancel up to one hour before their appointment.",
      "On the other side, owners and barbers sign in to a dashboard that shows today's schedule at a glance: number of bookings, completed services, no-shows, and daily revenue. Walk-in customers can be added in one tap, so online and offline queues stay in one place. Each shop also gets its own booking link to share in its Instagram bio or WhatsApp auto-reply.",
    ],
    highlights: [
      "Four-step online booking: choose a service, a barber, a time slot, then enter contact details, with a clear progress indicator.",
      "\"Anyone available\" option that automatically finds the earliest open slot across all barbers.",
      "Unique booking code for each reservation, with one-tap saving to WhatsApp and self-service cancellation up to 1 hour before the appointment.",
      "Owner dashboard with daily stats (bookings, completed, no-shows, revenue) and quick walk-in entry.",
      "Management pages for services and prices, barbers and their days off, customers, and shop settings.",
      "Shareable per-shop booking link for Instagram and WhatsApp, plus separate sign-in for owners and barbers.",
    ],
    role: "Solo project",
    stack: ["TypeScript", "JavaScript", "Next.js 15 (App Router)", "React 19", "Tailwind CSS 4", "SQL"],
    year: 2026,
    image: "/projects/giliran-login.png",
    gallery: [
      "/projects/giliran-layanan.png",
      "/projects/giliran-kapster.png",
      "/projects/giliran-data.png",
      "/projects/giliran-konfirmasi.png",
      "/projects/giliran-dashboard.png",
    ],
    liveUrl: "https://antrean-barbershop.vercel.app/",
    sourceUrl: "https://github.com/JejeIrwan",
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
