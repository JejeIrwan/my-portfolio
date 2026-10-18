/**
 * Profile configuration.
 * Everything personal lives here — replace the placeholders with your own details.
 */

export type SocialIcon = "linkedin" | "instagram" | "github";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

/** Icons available for service cards (Lucide icons, mapped in components/service-card.tsx). */
export type ServiceIcon = "app" | "responsive" | "server" | "database" | "cloud" | "gauge";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIcon;
};

export type ExperienceItem = {
  period: string;
  role: string;
  place: string;
  summary?: string;
};

export type ToolGroup = {
  label: string;
  items: string[];
};

export type SiteConfig = {
  name: string;
  role: string;
  /**
   * Profile photo in /public, e.g. "/profile.jpg". Square images work best (at least 400×400).
   * Leave empty ("") to show your initials instead.
   */
  avatar: string;
  email: string;
  /** Public URL of the deployed site, used for metadata. */
  url: string;
  description: string;
  socials: SocialLink[];
  services: Service[];
  tools: ToolGroup[];
  /** Leave empty to hide the Experience section on the About page. */
  experience: ExperienceItem[];
};

export const site: SiteConfig = {
  name: "Jeje Irwan",
  role: "Full-Stack Developer",
  avatar: "/profile1.jpg",
  email: "jeffryirwan03@gmail.com",
  url: "https://www.jejeirwan.my.id",
  description:
    "Full-Stack Developer building useful digital products with a focus on clarity, usability, and thoughtful details.",

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jejeirwan/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/jejeirwann/", icon: "instagram" },
    { label: "GitHub", href: "https://github.com/JejeIrwan", icon: "github" },
  ],

  services: [
    {
      icon: "app",
      title: "Web Applications",
      description: "End-to-end web apps, from data model and API to a finished, usable interface.",
    },
    {
      icon: "responsive",
      title: "Responsive Interfaces",
      description: "Accessible layouts that work well on phones, tablets, and large screens.",
    },
    {
      icon: "server",
      title: "Backend & APIs",
      description: "REST and GraphQL APIs with authentication, validation, and clear documentation.",
    },
    {
      icon: "database",
      title: "Database Design",
      description: "Schemas, migrations, and queries that stay fast and easy to change.",
    },
    {
      icon: "cloud",
      title: "Deployment",
      description: "CI pipelines, containers, and hosting setups that make releases routine.",
    },
    {
      icon: "gauge",
      title: "Performance & SEO",
      description: "Faster page loads, better Core Web Vitals, and search-friendly markup.",
    },
  ],

  tools: [
    { label: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
    { label: "Backend", items: ["Node.js", "PostgreSQL", "Prisma", "Redis"] },
    { label: "Workflow", items: ["Git", "Docker", "Vercel", "Figma"] },
  ],

  // Placeholders — replace with your own history, or set to [] to hide the section.
  experience: [
    {
      period: "2026 — Present",
      role: "Full-Stack Developer",
      place: "Self-employed",
      summary: "Creating custom websites and digital solutions for various clients.",
    },
    {
      period: "2025 — 2026",
      role: "Frontend Developer",
      place: "Gamelab Indonesia",
      summary: "Developed and improved website interfaces by enhancing visual design, responsiveness, and user experience to create clean, intuitive, and user-friendly web pages.",
    },
    {
      period: "August - December 2024",
      role: "IBM Academy Advanced AI",
      place: "Infinite Learning Batam",
      summary: "Introduction to Generative AI and its applications across various domains, including data science. Learned the fundamentals of neural networks, including neurons, layers, and activation functions.",
    },
  ],
};

export function getSocial(icon: SocialIcon): SocialLink | undefined {
  return site.socials.find((social) => social.icon === icon);
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
