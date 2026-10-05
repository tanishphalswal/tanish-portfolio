"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Image as ImageIcon, LayoutDashboard, Megaphone, Plus } from "lucide-react";
import type { Media, WorkItem } from "@/lib/work-data";
import MediaViewer from "./MediaViewer";

const tone = [
  "from-[#152b4c] via-[#132034] to-[#0c131f]",
  "from-[#322444] via-[#1a1a31] to-[#0c131f]",
  "from-[#253744] via-[#14212c] to-[#0c131f]",
  "from-[#3a2c22] via-[#241b20] to-[#0c131f]",
  "from-[#243b30] via-[#172a28] to-[#0c131f]",
];

function Tags({ items }: { items: string[] }) {
  return <div className="flex flex-wrap gap-2">{items.map((item) => (
    <span key={item} className="rounded-md border border-panel-border px-2 py-1 font-mono text-[10px] text-text-muted">{item}</span>
  ))}</div>;
}

export function WebsiteCards({ items }: { items: WorkItem[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item, index) => (
        <article key={item.id} className="glass overflow-hidden rounded-2xl depth-shadow">
          <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${tone[index % tone.length]}`}>
            {item.cover ? (
              <Image src={item.cover} alt={`${item.title} homepage screenshot`} fill
                sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top"
                loading="lazy" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-muted">
                <LayoutDashboard size={36} className="text-accent-blue" aria-hidden="true" />
                <span className="font-display text-2xl font-semibold text-text-primary">{item.title}</span>
                <span className="font-mono text-xs">In progress</span>
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full glass-strong px-3 py-1 font-mono text-[10px] text-text-primary">
              {item.status}
            </span>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.summary}</p>
              </div>
              {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"
                className="shrink-0 rounded-lg glass-strong p-2 text-accent-blue hover:text-text-primary"
                aria-label={`Visit ${item.title} website`}><ArrowUpRight size={18} /></a>}
            </div>
            <Tags items={item.tags} />
            {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline">
              Visit website <ArrowUpRight size={14} />
            </a>}
          </div>
        </article>
      ))}
    </div>
  );
}

function DesignCard({ item, index }: { item: WorkItem; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const images = item.images ?? [];
  return (
    <article className={`glass overflow-hidden rounded-2xl depth-shadow ${index === 0 ? "md:col-span-7" : index === 1 ? "md:col-span-5" : "md:col-span-4"}`}>
      <div className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-64 ${tone[index % tone.length]}`}>
        {images.length ? (
          <button onClick={() => setSelected(0)} className="absolute inset-0 grid grid-cols-[1.35fr_0.65fr] gap-2 p-4 text-left"
            aria-label={`View ${item.title} design screens`}>
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <Image src={images[0].src} alt={images[0].alt} fill sizes="(max-width: 768px) 70vw, 40vw"
                className="object-cover object-top" loading="lazy" />
            </div>
            <div className="grid grid-rows-2 gap-2">
              {[1, 2].map((n) => <div key={n} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                {images[n] && <Image src={images[n].src} alt={images[n].alt} fill
                  sizes="(max-width: 768px) 25vw, 15vw" className="object-cover object-top" loading="lazy" />}
              </div>)}
            </div>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-strong">
              <LayoutDashboard size={26} className="text-accent-blue" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">UI/UX case study</span>
          </div>
        )}
        <span className="absolute bottom-4 left-4 rounded-full glass-strong px-2.5 py-1 font-mono text-[10px] text-text-primary">
          {images.length ? `${images.length} screens` : "Screens to be added"}
        </span>
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold">{item.title}</h3>
        <p className="text-sm leading-relaxed text-text-muted">{item.summary}</p>
        <Tags items={item.tags} />
      </div>
      <MediaViewer images={images} selected={selected} onSelect={setSelected} onClose={() => setSelected(null)} title={item.title} />
    </article>
  );
}

export function DesignCards({ items }: { items: WorkItem[] }) {
  return <div className="grid gap-5 md:grid-cols-12">{items.map((item, index) => (
    <DesignCard key={item.id} item={item} index={index} />
  ))}</div>;
}

export function MarketingCards({ items }: { items: WorkItem[] }) {
  return <div className="grid gap-5 md:grid-cols-2">{items.map((item, index) => (
    <MarketingCard key={item.id} item={item} index={index} />
  ))}</div>;
}

function MarketingCard({ item, index }: { item: WorkItem; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const images = item.images ?? [];
  return (
    <article className="glass overflow-hidden rounded-2xl depth-shadow">
      <div className={`relative h-48 bg-gradient-to-br ${tone[(index + 2) % tone.length]}`}>
        {images[0] ? <button className="absolute inset-0" onClick={() => setSelected(0)}
          aria-label={`View ${item.title} campaign images`}>
          <Image src={images[0].src} alt={images[0].alt} fill sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top" loading="lazy" />
        </button> : <div className="flex h-full items-center justify-center">
          <Megaphone size={42} className="text-accent-amber/70" aria-hidden="true" />
        </div>}
      </div>
      <div className="space-y-3 p-6">
        <h3 className="font-display text-xl font-semibold">{item.title}</h3>
        <p className="text-sm leading-relaxed text-text-muted">{item.summary}</p>
        <Tags items={item.tags} />
        {images.length > 1 && <button onClick={() => setSelected(0)}
          className="text-sm text-accent-blue hover:underline">View {images.length} images</button>}
      </div>
      <MediaViewer images={images} selected={selected} onSelect={setSelected} onClose={() => setSelected(null)} title={item.title} />
    </article>
  );
}

export function GraphicGallery({ items }: { items: WorkItem[] }) {
  const images = items.flatMap((item) => (item.images ?? []).map((media) => ({ media, title: item.title })));
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState<number | null>(null);
  const allImages: Media[] = images.map((item) => item.media);

  if (!images.length) return (
    <div className="glass flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl p-8 text-center">
      <ImageIcon size={30} className="text-accent-amber" aria-hidden="true" />
      <h3 className="font-display text-lg font-semibold">Graphic gallery</h3>
      <p className="max-w-md text-sm text-text-muted">Selected graphics will appear here as the collection is added.</p>
    </div>
  );

  return (
    <>
      <div className="portfolio-masonry">
        {images.slice(0, visible).map(({ media, title }, index) => (
          <button key={media.src} onClick={() => setSelected(index)}
            className="portfolio-masonry-item glass group w-full overflow-hidden rounded-xl text-left"
            aria-label={`View ${title} graphic`}>
            <Image src={media.src} alt={media.alt} width={media.width} height={media.height}
              sizes="(max-width: 640px) 48vw, (max-width: 1024px) 31vw, 23vw"
              className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.025]" loading="lazy" />
            <span className="block px-3 py-2 text-xs text-text-muted">{title}</span>
          </button>
        ))}
      </div>
      {visible < images.length && <div className="mt-8 text-center">
        <button onClick={() => setVisible((count) => count + 12)}
          className="glass-strong inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium hover:border-accent-blue/40">
          <Plus size={16} /> Load more ({images.length - visible} remaining)
        </button>
      </div>}
      <MediaViewer images={allImages} selected={selected} onSelect={setSelected} onClose={() => setSelected(null)} title="Graphic Design" />
    </>
  );
}
