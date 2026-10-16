import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Project image.
 * - variant "card": fixed 16:10 box, image fills it and is anchored to the top
 *   (good for website screenshots — the header stays visible).
 * - variant "full": the whole image at its natural proportions, nothing cropped.
 * Without an image, a neutral placeholder with the project title is shown.
 */
export function ProjectCover({
  src,
  title,
  sizes,
  variant = "card",
  priority = false,
  className,
}: {
  src?: string;
  title: string;
  sizes: string;
  variant?: "card" | "full";
  priority?: boolean;
  className?: string;
}) {
  if (src && variant === "full") {
    return (
      <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
        <Image
          src={src}
          alt={`Screenshot of ${title}`}
          width={1600}
          height={1000}
          sizes={sizes}
          quality={90}
          priority={priority}
          className="block h-auto w-full"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`Screenshot of ${title}`}
          fill
          sizes={sizes}
          quality={90}
          priority={priority}
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full items-center justify-center p-6" aria-hidden="true">
          <span className="text-lg font-semibold tracking-tight text-muted">{title}</span>
        </div>
      )}
    </div>
  );
}
