"use client";

import { motion } from "framer-motion";
import { PenTool, Sparkles, ShieldCheck, Rocket, ArrowRight, Bot, X, Check } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { buildWorkflow, aiWorkflowStat } from "@/lib/data";
import TiltCard from "./TiltCard";

const icons = [PenTool, Sparkles, ShieldCheck, Rocket];
const iconColors = [
  "var(--accent-blue)",
  "var(--accent-amber)",
  "var(--accent-green)",
  "var(--accent-amber)",
];

export default function BuildWorkflow() {
  return (
    <section className="section-pad px-5 max-w-6xl mx-auto relative">
      <SectionHeader
        eyebrow="~/workflow"
        eyebrowIcon={Sparkles}
        title="How it actually gets built"
        description="Design in Figma, build with Claude and Codex as the primary agents, verify before it ships, then own the deploy."
        accent="var(--accent-amber)"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {buildWorkflow.map((item, idx) => {
          const Icon = icons[idx];
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="relative"
            >
              <TiltCard intensity={6} className="glow-surface glass rounded-2xl p-6 h-full depth-shadow">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${iconColors[idx]}1a`,
                    border: `1px solid ${iconColors[idx]}33`,
                  }}
                >
                  <Icon size={20} color={iconColors[idx]} strokeWidth={2} />
                </div>
                <span className="chip-mono text-text-faint">
                  {String(idx + 1).padStart(2, "0")} · {item.step}
                </span>
                <h3 className="font-display text-lg font-semibold text-text-primary mt-2">
                  {item.tool}
                </h3>
                <p className="text-sm text-text-muted mt-2.5 leading-relaxed">
                  {item.detail}
                </p>
              </TiltCard>

              {idx < buildWorkflow.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-text-faint">
                  <ArrowRight size={16} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* AI dependency callout */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <TiltCard intensity={3} className="glow-surface glass-strong rounded-2xl p-6 sm:p-9 depth-shadow-strong relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, rgba(242,166,90,0.10), transparent 55%)",
            }}
          />
          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-accent-amber/15 border border-accent-amber/30">
                  <Bot size={16} className="text-accent-amber" />
                </div>
                <span className="chip-mono text-accent-amber">AI-native workflow</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary leading-tight">
                {aiWorkflowStat.headline}
              </h3>
              <p className="text-text-muted text-sm sm:text-[15px] mt-4 leading-relaxed max-w-2xl">
                {aiWorkflowStat.description}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center glass rounded-2xl px-7 py-5 shrink-0 mx-auto lg:mx-0">
              <span className="font-display text-4xl sm:text-5xl font-bold gradient-text leading-none">
                {aiWorkflowStat.multiplier}
              </span>
              <span className="chip-mono text-text-faint mt-2 text-center whitespace-nowrap">
                {aiWorkflowStat.multiplierLabel}
              </span>
            </div>
          </div>

          <div className="relative z-10 grid sm:grid-cols-2 gap-4 mt-8 pt-7 border-t border-panel-border">
            <div className="rounded-xl border border-panel-border bg-bg-elevated/60 p-5">
              <div className="flex items-center gap-2 mb-3.5">
                <X size={14} className="text-text-faint" />
                <span className="chip-mono text-text-faint">without AI agents</span>
              </div>
              <ul className="space-y-2.5">
                {aiWorkflowStat.before.map((item) => (
                  <li key={item} className="text-sm text-text-faint flex gap-2.5 leading-relaxed">
                    <span className="text-text-faint mt-1.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent-green/25 bg-accent-green/[0.04] p-5">
              <div className="flex items-center gap-2 mb-3.5">
                <Check size={14} className="text-accent-green" />
                <span className="chip-mono text-accent-green">with Claude + Codex</span>
              </div>
              <ul className="space-y-2.5">
                {aiWorkflowStat.after.map((item) => (
                  <li key={item} className="text-sm text-text-muted flex gap-2.5 leading-relaxed">
                    <Check size={14} className="text-accent-green mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </section>
  );
}
