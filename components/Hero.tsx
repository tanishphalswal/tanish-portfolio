"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Sparkles, Activity, Server, Zap } from "lucide-react";
import { deployLog, profile } from "@/lib/data";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";
import AmbientOrbs from "./AmbientOrbs";

const toneColor: Record<string, string> = {
  muted: "text-text-faint",
  green: "text-accent-green",
  amber: "text-accent-amber",
};

function useLiveMetric(
  target: number,
  { durationMs = 1400, startDelay = 200, jitter = 0, min = 0, max = 100 }: {
    durationMs?: number;
    startDelay?: number;
    jitter?: number;
    min?: number;
    max?: number;
  } = {}
) {
  const [value, setValue] = useState(0);
  const [settled, setSettled] = useState(false);

  // Initial fill-up animation
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const timer = setTimeout(() => {
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(target * eased);
        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setSettled(true);
        }
      };
      raf = requestAnimationFrame(step);
    }, startDelay);
    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, durationMs, startDelay]);

  // Continuous live breathing once settled — small realistic fluctuation
  useEffect(() => {
    if (!settled || jitter <= 0) return;
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * jitter * 2;
      const next = target + delta;
      setValue(Math.max(min, Math.min(max, next)));
    }, 1800 + Math.random() * 700);
    return () => clearInterval(interval);
  }, [settled, target, jitter, min, max]);

  return value;
}

function RadialGauge({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-[72px] h-[72px]">
        <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="5"
          />
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            opacity="0.5"
            style={{
              transition: "stroke-dashoffset 1.6s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: "blur(4px)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-sm font-medium text-text-primary tabular-nums">
            {value % 1 === 0 ? Math.round(value) : value.toFixed(1)}%
          </span>
        </div>
      </div>
      <span className="chip-mono text-text-faint text-[10px] flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-accent-green/70 animate-pulse" />
        {label}
      </span>
    </div>
  );
}

function SystemPulse() {
  const uptime = useLiveMetric(99.9, { durationMs: 1400, startDelay: 200, jitter: 0.08, min: 99.5, max: 100 });
  const cpu = useLiveMetric(34, { durationMs: 1200, startDelay: 400, jitter: 6, min: 18, max: 52 });
  const latency = useLiveMetric(42, { durationMs: 1000, startDelay: 600, jitter: 9, min: 28, max: 64 });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= deployLog.length) {
      const reset = setTimeout(() => setVisibleLines(0), 3000);
      return () => clearTimeout(reset);
    }
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 500);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <TiltCard
      intensity={6}
      className="glow-surface glass-strong rounded-2xl w-full max-w-md depth-shadow-strong overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-panel-border bg-white/[0.02]">
        <div className="flex items-center gap-2 min-w-0">
          <Server size={14} className="text-accent-blue shrink-0" />
          <span className="font-mono text-[11px] sm:text-xs text-text-muted truncate">
            manetor-crm · production
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="status-dot" />
          <span className="font-mono text-[10px] text-accent-green">LIVE</span>
        </div>
      </div>

      {/* Gauges row */}
      <div className="flex items-center justify-around gap-3 px-5 py-5 border-b border-panel-border">
        <RadialGauge value={uptime} label="UPTIME" color="var(--accent-green)" />
        <RadialGauge value={cpu} label="LOAD" color="var(--accent-blue)" />
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-[72px] h-[72px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <Zap size={20} className="text-accent-amber" />
              <span className="font-mono text-sm font-medium text-text-primary tabular-nums">
                {Math.round(latency)}ms
              </span>
            </div>
          </div>
          <span className="chip-mono text-text-faint text-[10px] flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-accent-amber/70 animate-pulse" />
            RESPONSE
          </span>
        </div>
      </div>

      {/* Activity feed */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Activity size={12} className="text-text-faint" />
          <span className="chip-mono text-text-faint">deploy activity</span>
        </div>
        <div className="font-mono text-[12px] sm:text-[12.5px] leading-relaxed min-h-[132px] overflow-hidden break-all">
          {deployLog.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={`${toneColor[line.tone]} truncate`}>
              {line.text}
            </div>
          ))}
          {visibleLines < deployLog.length && (
            <span className="inline-block w-[6px] h-[13px] bg-accent-blue/70 align-middle animate-pulse" />
          )}
        </div>
      </div>
    </TiltCard>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-5 max-w-6xl mx-auto overflow-hidden"
    >
      <AmbientOrbs />
      <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-text-muted glass rounded-full px-3 py-1.5 mb-6">
            <span className="status-dot" />
            <Sparkles size={12} className="text-accent-amber" />
            Open to full-stack & DevOps roles
          </div>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight text-text-primary">
            I build it.
            <br />
            Then I <span className="gradient-text">ship it.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-text-muted max-w-lg leading-relaxed">
            {profile.summary}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#projects"
              className="group px-5 py-3 rounded-xl bg-text-primary text-bg font-medium text-sm hover:opacity-90 transition-opacity items-center gap-2"
            >
              View projects
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="px-5 py-3 rounded-xl glass text-text-primary font-medium text-sm hover:border-accent-blue/40 transition-colors"
            >
              Get in touch
            </MagneticButton>
          </div>
          <div className="mt-10 flex items-center gap-5 font-mono text-xs text-text-faint">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              {profile.location}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-faint" />
            <span>3+ yrs experience</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <SystemPulse />
        </motion.div>
      </div>
    </section>
  );
}
