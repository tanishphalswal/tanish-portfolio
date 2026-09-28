"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { CaseStudy } from "@/lib/work-data";

const roleColors: Record<string, string> = {
  "Built":         "border-[#5b9df0]/40 text-[#5b9df0]",
  "Designed":      "border-purple-400/40 text-purple-400",
  "Deployed":      "border-[#f2a65a]/40 text-[#f2a65a]",
  "AI-assisted":   "border-[#6fcf97]/40 text-[#6fcf97]",
  "Led":           "border-pink-400/40 text-pink-400",
};

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const [open, setOpen] = useState(false);
  const isDummyFigma = cs.figmaEmbed?.includes("REPLACE");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="glass rounded-2xl overflow-hidden depth-shadow"
    >
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left group">
        <div className="flex items-start gap-4 p-6">
          <div className="shrink-0 w-12 h-12 rounded-xl border border-panel-border" style={{ background: cs.thumb }} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-semibold text-text-primary truncate">{cs.title}</h3>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[11px] text-text-faint">{cs.year}</span>
                <ChevronDown size={16} className={`text-text-faint transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
              </div>
            </div>
            <p className="text-text-muted text-sm mt-1 leading-snug">{cs.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {cs.roles.map((r) => (
                <span key={r} className={`chip-mono text-[10px] px-2 py-0.5 rounded-full border ${roleColors[r]}`}>{r}</span>
              ))}
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-panel-border pt-5 space-y-5">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Problem", text: cs.problem, accent: "#f2a65a" },
                  { label: "Solution", text: cs.solution, accent: "#5b9df0" },
                  { label: "Result", text: cs.result, accent: "#6fcf97" },
                ].map(({ label, text, accent }) => (
                  <div key={label} className="rounded-xl p-4 border border-panel-border" style={{ background: "var(--bg-elevated)" }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                      <span className="chip-mono text-[10px]" style={{ color: accent }}>{label}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {cs.stack.map((s) => (
                  <span key={s} className="font-mono text-[11px] text-text-faint px-2.5 py-1 rounded-lg border border-panel-border" style={{ background: "var(--bg-elevated)" }}>{s}</span>
                ))}
              </div>

              {cs.figmaEmbed && !isDummyFigma && (
                <div className="rounded-xl overflow-hidden border border-panel-border" style={{ height: 300 }}>
                  <iframe src={cs.figmaEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy" title={`${cs.title} Figma preview`} />
                </div>
              )}

              {cs.liveUrl && (
                <a href={cs.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[#5b9df0] hover:underline">
                  <ExternalLink size={14} /> View live site
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
