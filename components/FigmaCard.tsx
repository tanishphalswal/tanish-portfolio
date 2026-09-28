"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, ExternalLink, Layers } from "lucide-react";
import { FigmaWork } from "@/lib/work-data";

const typeColor: Record<string, string> = {
  "Dashboard":      "text-[#5b9df0] border-[#5b9df0]/30",
  "Mobile App":     "text-purple-400 border-purple-400/30",
  "Landing Page":   "text-[#6fcf97] border-[#6fcf97]/30",
  "Design System":  "text-[#f2a65a] border-[#f2a65a]/30",
  "Prototype":      "text-pink-400 border-pink-400/30",
};

export default function FigmaCard({ item }: { item: FigmaWork }) {
  const [expanded, setExpanded] = useState(false);
  const isDummy = item.figmaEmbed.includes("REPLACE");
  const previewH = expanded ? 520 : 240;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="glass rounded-2xl overflow-hidden depth-shadow flex flex-col"
    >
      {/* Preview */}
      <div
        className="relative border-b border-panel-border overflow-hidden transition-all duration-500"
        style={{ height: previewH, background: "var(--bg-elevated)" }}
      >
        {isDummy ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-panel-border-strong flex items-center justify-center">
              <Layers size={24} className="text-text-faint" />
            </div>
            <p className="font-mono text-xs text-text-faint text-center px-4">
              Replace <span className="text-[#f2a65a]">REPLACE_{item.id.toUpperCase().replace("-", "_")}</span> in lib/work-data.ts
            </p>
          </div>
        ) : (
          <iframe
            src={item.figmaEmbed}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            title={`${item.title} preview`}
          />
        )}

        {!isDummy && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg glass-strong flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            title={expanded ? "Collapse" : "Expand preview"}
          >
            {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        )}
      </div>

      {/* Meta */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base font-semibold text-text-primary">{item.title}</h3>
            <p className="text-text-muted text-sm mt-0.5">{item.tagline}</p>
          </div>
          <span className="font-mono text-[11px] text-text-faint shrink-0 mt-0.5">{item.year}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-panel-border">
          <div className="flex items-center gap-2">
            <span className={`chip-mono text-[10px] px-2 py-0.5 rounded-full border ${typeColor[item.type]}`}>{item.type}</span>
            <span className="chip-mono text-[10px] text-text-faint">{item.screens} screens</span>
          </div>
          {!isDummy && (
            <a href={item.figmaEmbed.replace("embed?embed_host=share&url=", "")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-[#5b9df0] transition-colors">
              <ExternalLink size={11} /> Open in Figma
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
