"use client";

import { motion } from "framer-motion";
import { Boxes, Code2, Cloud, ShieldCheck } from "lucide-react";
import { stack } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";

const categoryMeta: Record<string, { color: string; icon: typeof Code2 }> = {
  Frontend: { color: "var(--accent-blue)", icon: Code2 },
  "Backend & Realtime": { color: "var(--accent-green)", icon: Boxes },
  "Cloud & DevOps": { color: "var(--accent-amber)", icon: Cloud },
  "Quality & Security": { color: "var(--accent-blue)", icon: ShieldCheck },
};

export default function Stack() {
  return (
    <section id="stack" className="section-pad px-5 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="~/stack"
        eyebrowIcon={Boxes}
        title="One person, the whole pipeline"
        description="Frontend for the experience, backend for the logic, infrastructure for the uptime. No handoffs in between."
        accent="var(--accent-amber)"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {Object.entries(stack).map(([category, items], idx) => {
          const meta = categoryMeta[category];
          const Icon = meta.icon;
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <TiltCard intensity={5} className="glow-surface glass rounded-2xl p-6 h-full depth-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: `${meta.color}1a`,
                      border: `1px solid ${meta.color}33`,
                    }}
                  >
                    <Icon size={16} color={meta.color} strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-sm font-medium text-text-primary">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[12px] text-text-muted px-2.5 py-1.5 rounded-lg bg-bg-elevated border border-panel-border"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
