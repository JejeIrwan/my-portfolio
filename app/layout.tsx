import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { MobileNav } from "@/components/sidebar/mobile-nav";
import { Sidebar } from "@/components/sidebar/sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { site } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#171916" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // data-theme is rewritten by ThemeScript before paint; suppressHydrationWarning covers that one attribute.
    <html
      lang="en"
      data-theme="dark"
      style={{ colorScheme: "dark" }}
      className={poppins.variable}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans text-[15px] antialiased">
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>

          <Sidebar />
          <MobileNav />

          <div className="flex min-h-dvh flex-col lg:pl-(--sidebar-width)">
            <main
              id="main"
              tabIndex={-1}
              className="flex-1 px-6 pb-20 pt-12 outline-none sm:px-10 sm:pt-16 lg:px-16 lg:pb-28 lg:pt-24"
            >
              <div className="mx-auto w-full max-w-[760px]">{children}</div>
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
