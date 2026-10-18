import { Download } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Path to your CV inside /public.
 * Put the file at public/cv-jeje-irwan.pdf (or change this path to match your file name).
 */
export const CV_PATH = "/cv-jeje-irwan.pdf";

/** File name the visitor gets when they download. */
const DOWNLOAD_NAME = "CV-Jeje-Irwan.pdf";

export function CvButton({ className }: { className?: string }) {
  return (
    <a
      href={CV_PATH}
      download={DOWNLOAD_NAME}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium text-foreground hover:bg-hover",
        className,
      )}
    >
      <Download size={16} strokeWidth={1.75} aria-hidden="true" />
      Download CV
      <span className="sr-only"> (PDF)</span>
    </a>
  );
}
