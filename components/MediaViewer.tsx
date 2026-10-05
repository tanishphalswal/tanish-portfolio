"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Media } from "@/lib/work-data";

export default function MediaViewer({
  images, selected, onClose, onSelect, title,
}: {
  images: Media[]; selected: number | null; onClose: () => void;
  onSelect: (index: number) => void; title: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onSelect((selected - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") onSelect((selected + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, images.length, onClose, onSelect]);

  if (selected === null || !images[selected]) return null;
  const image = images[selected];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
      role="dialog" aria-modal="true" aria-label={`${title} image viewer`}>
      <button className="absolute inset-0 bg-black/90" onClick={onClose} aria-label="Close image viewer" />
      <div className="relative z-10 flex max-h-full w-full max-w-6xl flex-col gap-3">
        <div className="flex items-center justify-between gap-4 text-sm text-text-muted">
          <span className="truncate">{title} · {selected + 1} / {images.length}</span>
          <button ref={closeRef} onClick={onClose} className="rounded-lg p-2 glass-strong text-text-primary"
            aria-label="Close image viewer"><X size={18} /></button>
        </div>
        <div className="relative flex min-h-0 items-center justify-center">
          {images.length > 1 && (
            <button onClick={() => onSelect((selected - 1 + images.length) % images.length)}
              className="absolute left-1 z-20 rounded-full p-2 glass-strong text-text-primary"
              aria-label="Previous image"><ChevronLeft size={20} /></button>
          )}
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
            sizes="(max-width: 768px) 95vw, 1100px"
            className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl" />
          {images.length > 1 && (
            <button onClick={() => onSelect((selected + 1) % images.length)}
              className="absolute right-1 z-20 rounded-full p-2 glass-strong text-text-primary"
              aria-label="Next image"><ChevronRight size={20} /></button>
          )}
        </div>
      </div>
    </div>
  );
}
