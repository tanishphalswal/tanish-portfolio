"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppWindow, PenTool, ImageIcon, Globe } from "lucide-react";
import SectionHeader from "./SectionHeader";
import CaseStudyCard from "./CaseStudyCard";
import FigmaCard from "./FigmaCard";
import GraphicCard from "./GraphicCard";
import { webApps, figmaWork, graphicWork, websites } from "@/lib/work-data";

const TABS = [
  { id: "webapps",  label: "Web Apps",       icon: AppWindow, count: webApps.length },
  { id: "figma",    label: "Figma / UI",     icon: PenTool,   count: figmaWork.length },
  { id: "graphic",  label: "Graphic Design", icon: ImageIcon, count: graphicWork.length },
  { id: "websites", label: "Websites",       icon: Globe,     count: websites.length },
] as const;

type TabId = typeof TABS[number]["id"];

const tabAccent: Record<TabId, string> = {
  webapps:  "#5b9df0",
  figma:    "#a78bfa",
  graphic:  "#f2a65a",
  websites: "#6fcf97",
};

export default function Work() {
  const [active, setActive] = useState<TabId>("webapps");

  return (
    <section id="work" className="section-pad px-5 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="~/work"
        eyebrowIcon={AppWindow}
        title="Full-studio showcase"
        description="Web apps, UI designs, graphic work, and websites â€” built, designed, and shipped by one person."
        accent="#5b9df0"
      />

      {/* Tab strip */}
      <div className="flex flex-wrap gap-2 mb-8 p-1.5 glass rounded-2xl w-fit max-w-full">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? "text-white" : "text-text-muted hover:text-text-primary"}`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: tabAccent[tab.id] }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon size={15} className="relative z-10" />
              <span className="relative z-10 hidden sm:inline">{tab.label}</span>
              <span className={`relative z-10 font-mono text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-black/20 text-white/80" : "bg-bg-elevated text-text-faint"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {active === "webapps" && (
            <div className="space-y-4">
              {webApps.map((cs) => <CaseStudyCard key={cs.id} cs={cs} />)}
            </div>
          )}
          {active === "figma" && (
            <div>
              <p className="font-mono text-xs text-text-faint mb-6">
                Replace <span className="text-[#f2a65a]">REPLACE_*</span> URLs in{" "}
                <span className="text-[#f2a65a]">lib/work-data.ts</span> with your real Figma share links â€” previews auto-render.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {figmaWork.map((item) => <FigmaCard key={item.id} item={item} />)}
              </div>
            </div>
          )}
          {active === "graphic" && (
            <div>
              <p className="font-mono text-xs text-text-faint mb-6">
                Drop images in <span className="text-[#f2a65a]">public/graphic/filename.png</span> and set{" "}
                <span className="text-[#f2a65a]">imagePath</span> in work-data.ts â€” cards show them automatically.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {graphicWork.map((item) => <GraphicCard key={item.id} item={item} />)}
              </div>
            </div>
          )}
          {active === "websites" && (
            <div className="space-y-4">
              {websites.map((cs) => <CaseStudyCard key={cs.id} cs={cs} />)}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
