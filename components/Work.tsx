"use client";

import { useState } from "react";
import { AppWindow, Megaphone, PenTool, Globe2, ImageIcon } from "lucide-react";
import { categories, webApps, websites, type WorkCategory, type WorkItem } from "@/lib/work-data";
import SectionHeader from "./SectionHeader";
import { ProjectList } from "./Projects";
import { DesignCards, GraphicGallery, MarketingCards, WebsiteCards } from "./WorkCards";

const icons = { webapps: AppWindow, marketing: Megaphone, uiux: PenTool, websites: Globe2, graphic: ImageIcon };

export default function Work({
  uiUxWork, marketingWork, graphicWork,
}: {
  uiUxWork: WorkItem[];
  marketingWork: WorkItem[];
  graphicWork: WorkItem[];
}) {
  const [active, setActive] = useState<WorkCategory>("webapps");
  const counts: Record<WorkCategory, number> = {
    webapps: webApps.length, marketing: marketingWork.length, uiux: uiUxWork.length,
    websites: websites.length, graphic: graphicWork.length,
  };
  const current = categories.find((category) => category.id === active)!;

  return (
    <section id="work" className="section-pad scroll-mt-20 px-5 max-w-6xl mx-auto">
      <SectionHeader eyebrow="~/work" eyebrowIcon={AppWindow} title="Selected work"
        description="Applications, websites, campaigns, interfaces, and visuals — from build to launch."
        accent="var(--accent-blue)" />

      <div role="tablist" aria-label="Work categories"
        className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((category) => {
          const Icon = icons[category.id];
          const selected = active === category.id;
          return (
            <button key={category.id} id={`work-tab-${category.id}`} role="tab"
              aria-selected={selected} aria-controls="work-panel" tabIndex={selected ? 0 : -1}
              onClick={() => setActive(category.id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                const index = categories.findIndex(({ id }) => id === active);
                const next = categories[(index + (event.key === "ArrowRight" ? 1 : -1) + categories.length) % categories.length];
                setActive(next.id);
                document.getElementById(`work-tab-${next.id}`)?.focus();
              }}
              className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-3 text-sm transition-colors ${selected
                ? "border-accent-blue/50 bg-accent-blue/15 text-text-primary"
                : "border-panel-border glass text-text-muted hover:text-text-primary"}`}>
              <Icon size={16} aria-hidden="true" />
              {category.label}
              {counts[category.id] > 0 && <span className="font-mono text-[11px] opacity-60">{counts[category.id]}</span>}
            </button>
          );
        })}
      </div>

      <div id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${active}`} tabIndex={0}>
        <p className="mb-6 text-sm text-text-muted">{current.description}</p>
        {active === "webapps" && <>
          <p className="mb-5 font-mono text-xs text-text-faint">Illustrative mockups — application screens are behind client logins.</p>
          <ProjectList />
        </>}
        {active === "marketing" && <MarketingCards items={marketingWork} />}
        {active === "uiux" && <DesignCards items={uiUxWork} />}
        {active === "websites" && <WebsiteCards items={websites} />}
        {active === "graphic" && <GraphicGallery items={graphicWork} />}
      </div>
    </section>
  );
}
