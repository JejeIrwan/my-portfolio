"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

/**
 * Project photos on the detail page.
 * - The first image is shown large; the rest appear as thumbnails below it.
 * - Clicking any image opens a full-screen viewer that can be slid with the
 *   arrow buttons, the keyboard (← → Esc), or a swipe on touch screens.
 */
export function ProjectGallery({
  images,
  title,
  className,
}: {
  images: string[];
  title: string;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  if (images.length === 0) return null;

  const [cover, ...rest] = images;

  function open(index: number, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setOpenIndex(index);
  }

  function close() {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={(event) => open(0, event.currentTarget)}
        aria-label={`View ${title} photos`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-card text-left hover:border-muted"
      >
        <Image
          src={cover}
          alt={`Screenshot of ${title}`}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 760px, 100vw"
          quality={90}
          priority
          className="block h-auto w-full group-hover:opacity-90"
        />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium tabular-nums text-white">
            1 / {images.length}
          </span>
        )}
      </button>

      {rest.length > 0 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {rest.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={(event) => open(i + 1, event.currentTarget)}
                aria-label={`View photo ${i + 2} of ${images.length}`}
                className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-card hover:border-muted"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 190px, 33vw"
                  className="object-cover object-top hover:opacity-90"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {openIndex !== null && (
        <Lightbox
          images={images}
          title={title}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={close}
        />
      )}
    </div>
  );
}

function Lightbox({
  images,
  title,
  index,
  onIndexChange,
  onClose,
}: {
  images: string[];
  title: string;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;
  const hasMany = count > 1;

  const prev = useCallback(() => onIndexChange((index - 1 + count) % count), [index, count, onIndexChange]);
  const next = useCallback(() => onIndexChange((index + 1) % count), [index, count, onIndexChange]);

  // Keyboard: Esc closes, ← → slide.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft" && hasMany) prev();
      else if (event.key === "ArrowRight" && hasMany) next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next, hasMany]);

  // Lock page scroll and move focus into the viewer while it is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  function onTouchStart(event: TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent) {
    const start = touchStartX.current;
    touchStartX.current = null;
    const end = event.changedTouches[0]?.clientX;
    if (start === null || end === undefined || !hasMany) return;
    const delta = end - start;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) prev();
    else next();
  }

  const arrowClass =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — photo ${index + 1} of ${count}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute left-4 top-4 text-sm font-medium tabular-nums text-white/80">
        {index + 1} / {count}
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
      >
        <X size={20} strokeWidth={1.75} aria-hidden="true" />
      </button>

      {hasMany && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            prev();
          }}
          aria-label="Previous photo"
          className={cn(arrowClass, "left-3")}
        >
          <ChevronLeft size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
      )}

      <div
        className="relative h-[80vh] w-[92vw] max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${title} screenshot ${index + 1}`}
          fill
          sizes="92vw"
          quality={90}
          className="select-none object-contain"
          draggable={false}
        />
      </div>

      {hasMany && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            next();
          }}
          aria-label="Next photo"
          className={cn(arrowClass, "right-3")}
        >
          <ChevronRight size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body,
  );
}
