# Run this from: C:\Users\tanis\Downloads\tanish-portfolio\portfolio
# Command: powershell -ExecutionPolicy Bypass -File "path\to\add-work-section.ps1"

$base = "C:\Projects\tanish-portfolio"

# ── 1. lib/work-data.ts ─────────────────────────────────────
Set-Content "$base\lib\work-data.ts" @'
export type RoleTag = "Built" | "Designed" | "Deployed" | "AI-assisted" | "Led";

export type CaseStudy = {
  id: string;
  title: string;
  tagline: string;
  thumb: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  roles: RoleTag[];
  figmaEmbed?: string;
  liveUrl?: string;
  year: string;
};

export const webApps: CaseStudy[] = [
  {
    id: "manetor",
    title: "Manetor CRM",
    tagline: "WhatsApp-native CRM used by 50+ Indian SMBs daily",
    thumb: "#0d1829",
    problem: "Indian SMBs were managing leads over WhatsApp manually — no tracking, no automation, no unified view.",
    solution: "Multi-tenant CRM with WhatsApp Cloud API: live chat, bulk messaging, campaign tracking, invoicing, automated lead workflows. Socket.io real-time. AWS production stack.",
    result: "50+ active tenants. Lead response time reduced ~60%. WhatsApp as primary channel.",
    stack: ["React.js", "Node.js", "MongoDB", "Socket.io", "AWS", "WhatsApp Cloud API"],
    roles: ["Built", "Deployed", "AI-assisted"],
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_MANETOR",
    year: "2023",
  },
  {
    id: "trackops",
    title: "TrackOps / Devora",
    tagline: "Multi-tenant QA & bug-tracking platform — 13-phase backend",
    thumb: "#0d0d1f",
    problem: "No affordable multi-tenant QA + bug tracking for small dev teams. Jira too heavy; spreadsheets too loose.",
    solution: "13-phase backend build: auth, tenant isolation, assign workflows, bulk assignment, RBAC. Audited and fixed a Cursor AI frontend — caught 23 integration bugs before launch.",
    result: "Fully operational. Clean tenant data isolation. 23 bugs caught pre-launch.",
    stack: ["Node.js", "Express", "MongoDB", "React", "Tailwind"],
    roles: ["Built", "Deployed", "AI-assisted", "Led"],
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_TRACKOPS",
    year: "2024",
  },
  {
    id: "setlup",
    title: "Setlup B2B Marketplace",
    tagline: "B2B lead & profile platform — AWS infra owned end-to-end",
    thumb: "#0d1a0d",
    problem: "B2B buyers had no central place to find verified business profiles. Manual outreach, no lead tracking.",
    solution: "Dynamic business-profile dashboards, authentication, lead-interaction flows. Responsive. Full AWS deployment (EC2, S3, Route 53) managed.",
    result: "Live with active supplier profiles. Zero downtime since launch.",
    stack: ["React.js", "Node.js", "MongoDB", "AWS EC2", "S3", "Route 53"],
    roles: ["Built", "Deployed", "AI-assisted"],
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_SETLUP",
    year: "2023",
  },
  {
    id: "erp",
    title: "Internal ERP System",
    tagline: "Company-wide ERP — HR, inventory & billing unified",
    thumb: "#1a150d",
    problem: "Cut Edge Technology managed HR, inventory, and billing across 6 spreadsheets and disconnected tools.",
    solution: "ERP with employee management, attendance, inventory control, invoicing, and reporting dashboard. Role-based access: admin/manager/staff.",
    result: "Replaced 6 spreadsheets. Billing cycle cut from 3 days to same-day. 15+ daily users.",
    stack: ["React.js", "Node.js", "MongoDB", "AWS", "Redux"],
    roles: ["Built", "Deployed", "AI-assisted", "Led"],
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_ERP",
    year: "2024",
  },
];

export type FigmaWork = {
  id: string;
  title: string;
  tagline: string;
  figmaEmbed: string;
  screens: number;
  type: "Dashboard" | "Mobile App" | "Landing Page" | "Design System" | "Prototype";
  year: string;
};

export const figmaWork: FigmaWork[] = [
  { id: "manetor-ui", title: "Manetor CRM — UI Design", tagline: "Dashboard, live chat, and campaign screens", figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_MANETOR_UI", screens: 24, type: "Dashboard", year: "2023" },
  { id: "trackops-ui", title: "TrackOps — Design System", tagline: "Component library + bug tracker interface", figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_TRACKOPS_UI", screens: 18, type: "Design System", year: "2024" },
  { id: "erp-ui", title: "ERP Dashboard Design", tagline: "HR, inventory and billing UI flows", figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_ERP_UI", screens: 32, type: "Dashboard", year: "2024" },
  { id: "setlup-ui", title: "Setlup Marketplace UI", tagline: "B2B profile and lead interaction screens", figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_SETLUP_UI", screens: 14, type: "Landing Page", year: "2023" },
];

export type GraphicWork = {
  id: string;
  title: string;
  tagline: string;
  category: "Logo" | "Social Media" | "Poster" | "Brand Identity" | "Banner";
  color: string;
  imagePath?: string;
  year: string;
};

export const graphicWork: GraphicWork[] = [
  { id: "cutedge-brand", title: "Cut Edge Technology — Brand Kit", tagline: "Logo, color palette, and typography system", category: "Brand Identity", color: "#0d1829", year: "2023" },
  { id: "manetor-social", title: "Manetor CRM — Social Media Pack", tagline: "LinkedIn + Instagram launch creatives", category: "Social Media", color: "#0d1829", year: "2023" },
  { id: "devora-logo", title: "Devora / TrackOps — Logo Design", tagline: "Brand identity for the QA platform", category: "Logo", color: "#150d29", year: "2024" },
  { id: "erp-poster", title: "ERP Launch — Internal Poster", tagline: "Internal product launch announcement creative", category: "Poster", color: "#1a150d", year: "2024" },
];

export const websites: CaseStudy[] = [
  {
    id: "suppkart",
    title: "Suppkart E-Commerce",
    tagline: "SEO-first Next.js store — organic traffic from day 1",
    thumb: "#0d1a0d",
    problem: "Client needed a store ranking on Google without paid ads. Previous site was slow PHP with no SEO.",
    solution: "Rebuilt on Next.js with SSG, dynamic routing, image optimization, structured data. PHP backend via REST API. Hostinger VPS.",
    result: "Page speed 91+. Indexed in 48 hours. Organic sessions from month 1.",
    stack: ["Next.js", "JavaScript", "PHP", "Hostinger VPS"],
    roles: ["Built", "Deployed"],
    liveUrl: "https://suppkart.com",
    year: "2023",
  },
  {
    id: "pal-trading",
    title: "Pal Trading Co.",
    tagline: "Professional business site — built and shipped in 2 days",
    thumb: "#111111",
    problem: "Local trading business needed web presence — contact info, product list, location map.",
    solution: "Responsive single-page site: product showcase, WhatsApp CTA, Google Maps embed, mobile-first.",
    result: "Delivered in 2 days. WhatsApp link handles 80% of client inbound inquiries.",
    stack: ["HTML", "CSS", "JavaScript"],
    roles: ["Built", "Designed", "Deployed"],
    year: "2023",
  },
];
'@ -Encoding UTF8
Write-Host "work-data.ts written"

# ── 2. components/CaseStudyCard.tsx ─────────────────────────
Set-Content "$base\components\CaseStudyCard.tsx" @'
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
'@ -Encoding UTF8
Write-Host "CaseStudyCard.tsx written"

# ── 3. components/FigmaCard.tsx ──────────────────────────────
Set-Content "$base\components\FigmaCard.tsx" @'
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
'@ -Encoding UTF8
Write-Host "FigmaCard.tsx written"

# ── 4. components/GraphicCard.tsx ───────────────────────────
Set-Content "$base\components\GraphicCard.tsx" @'
"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { GraphicWork } from "@/lib/work-data";

const catColor: Record<string, string> = {
  "Logo":           "text-[#f2a65a] border-[#f2a65a]/30",
  "Social Media":   "text-[#5b9df0] border-[#5b9df0]/30",
  "Poster":         "text-[#6fcf97] border-[#6fcf97]/30",
  "Brand Identity": "text-purple-400 border-purple-400/30",
  "Banner":         "text-pink-400 border-pink-400/30",
};

export default function GraphicCard({ item }: { item: GraphicWork }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="glass rounded-2xl overflow-hidden depth-shadow group"
    >
      <div className="relative h-52 flex flex-col items-center justify-center border-b border-panel-border overflow-hidden" style={{ background: item.color }}>
        {item.imagePath ? (
          <img src={item.imagePath} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-60 transition-opacity">
            <ImageIcon size={28} className="text-white" />
            <span className="font-mono text-[10px] text-white">Drop image in /public/graphic/</span>
            <code className="font-mono text-[9px] text-white/60">{item.id}.png</code>
          </div>
        )}
        <span className={`absolute top-3 left-3 chip-mono text-[10px] px-2 py-0.5 rounded-full border glass-strong ${catColor[item.category]}`}>{item.category}</span>
        <span className="absolute top-3 right-3 font-mono text-[10px] text-white/40">{item.year}</span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-sm font-semibold text-text-primary">{item.title}</h3>
        <p className="text-text-muted text-xs mt-1 leading-relaxed">{item.tagline}</p>
      </div>
    </motion.div>
  );
}
'@ -Encoding UTF8
Write-Host "GraphicCard.tsx written"

# ── 5. components/Work.tsx ───────────────────────────────────
Set-Content "$base\components\Work.tsx" @'
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
        description="Web apps, UI designs, graphic work, and websites — built, designed, and shipped by one person."
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
                <span className="text-[#f2a65a]">lib/work-data.ts</span> with your real Figma share links — previews auto-render.
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
                <span className="text-[#f2a65a]">imagePath</span> in work-data.ts — cards show them automatically.
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
'@ -Encoding UTF8
Write-Host "Work.tsx written"

# ── 6. Update app/page.tsx ──────────────────────────────────
$pagePath = "$base\app\page.tsx"
$pageContent = Get-Content $pagePath -Raw
if ($pageContent -notmatch "Work") {
  $pageContent = $pageContent -replace 'import Projects', 'import Work from "@/components/Work";`nimport Projects'
  $pageContent = $pageContent -replace '<Projects />', '<Projects />`n        <Work />'
  Set-Content $pagePath $pageContent -Encoding UTF8
  Write-Host "page.tsx updated — Work section added after Projects"
} else {
  Write-Host "page.tsx already has Work import — skipped"
}

Write-Host ""
Write-Host "All files written. Now run:"
Write-Host "  cd $base"
Write-Host "  npm run build"
Write-Host "  git add ."
Write-Host '  git commit -m "feat: add tabbed work showcase (Web Apps / Figma / Graphic / Websites)"'
Write-Host "  git push"
