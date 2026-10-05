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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = selected !== null && Boolean(images[selected]);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, [isOpen]);

  if (selected === null || !images[selected]) return null;
  const image = images[selected];

  return (
    <dialog ref={dialogRef}
      className="fixed inset-0 m-0 flex h-dvh w-screen max-h-none max-w-none items-center justify-center border-0 bg-black/90 p-4 text-text-primary sm:p-10"
      aria-label={`${title} image viewer`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          onSelect((selected + (event.key === "ArrowRight" ? 1 : -1) + images.length) % images.length);
        }
      }}>
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
    </dialog>
  );
}
