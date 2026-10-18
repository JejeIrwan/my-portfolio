"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useState } from "react";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers/contexts without the Clipboard API.
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }
}

/** Email address as a mailto link, with a button that copies it to the clipboard. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (await copyText(email)) setCopied(true);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <a
        href={`mailto:${email}`}
        className="inline-flex min-w-0 items-center gap-3 text-xl font-medium tracking-tight underline decoration-border decoration-1 underline-offset-8 hover:decoration-accent sm:text-2xl"
      >
        <Mail size={22} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-muted" />
        <span className="break-all">{email}</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-muted hover:bg-hover hover:text-foreground"
      >
        {copied ? (
          <Check size={15} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Copy size={15} strokeWidth={1.75} aria-hidden="true" />
        )}
        {copied ? "Copied!" : "Copy"}
      </button>

      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
