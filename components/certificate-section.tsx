import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { certificates } from "@/lib/certificates";

/** "Certificates" section for the About page. Renders nothing when the list is empty. */
export function CertificateSection() {
  if (certificates.length === 0) return null;

  return (
    <section aria-labelledby="certificates" className="mt-16">
      <h2 id="certificates" className="text-xl font-semibold tracking-tight">
        Certificates
      </h2>

      <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {certificates.map((cert) => {
          const href = cert.credentialUrl ?? cert.image;
          return (
            <li key={`${cert.title}-${cert.issuer}`}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card p-3 group-hover:border-muted">
                  <div className="relative h-full w-full">
                    <Image
                      src={cert.image}
                      alt={`${cert.title} certificate from ${cert.issuer}`}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      quality={90}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug tracking-tight">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {cert.issuer}
                      {cert.year ? ` · ${cert.year}` : ""}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-muted group-hover:text-foreground"
                  />
                </div>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
