"use client";

import { motion } from "framer-motion";
import { FolderGit2, ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import ProjectMockup from "./ProjectMockup";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";

const mockupKind: Record<string, "crm" | "marketplace" | "ecommerce" | "qaboard"> = {
  manetor: "crm",
  trackops: "qaboard",
  setlup: "marketplace",
  suppkart: "ecommerce",
};

export default function Projects() {
  return (
    <section id="projects" className="section-pad px-5 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="~/projects"
        eyebrowIcon={FolderGit2}
        title="Things in production"
        description="Mockups below — actual screenshots are behind client logins. Everything described here is live and running."
        accent="var(--accent-blue)"
      />

      <div className="space-y-6">
        {projects.map((project, idx) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <TiltCard intensity={3} className="glow-surface glass rounded-2xl overflow-hidden grid md:grid-cols-[1.1fr_1fr] depth-shadow">
              <div className="relative aspect-[16/10] md:aspect-auto md:h-full bg-bg-elevated">
                <ProjectMockup kind={mockupKind[project.slug]} />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full glass-strong">
                  <span className="status-dot" />
                  <span className="text-text-muted">{project.status}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated/40 via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold text-text-primary">
                    {project.name}
                  </h3>
                  <ExternalLink size={16} className="text-text-faint shrink-0" />
                </div>
                <p className="text-accent-amber text-sm font-mono mt-1">
                  {project.tagline}
                </p>
                <p className="text-text-muted text-sm mt-4 leading-relaxed">
                  {project.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {project.highlights.slice(0, 3).map((h) => (
                    <li
                      key={h}
                      className="text-sm text-text-muted flex gap-2.5 leading-relaxed"
                    >
                      <ChevronRight size={15} className="text-accent-blue mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 mb-6 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] text-text-faint px-2 py-1 rounded-md border border-panel-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5 border-t border-panel-border">
                  <div className="flex gap-6 sm:gap-8">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="relative pb-2.5">
                        <div className="font-mono text-[10px] text-text-faint uppercase tracking-wide">
                          {m.label}
                        </div>
                        <div className="font-mono text-[11px] text-text-primary mt-1.5">
                          {m.value}
                        </div>
                        <span
                          className="absolute left-0 bottom-0 h-[2px] rounded-full"
                          style={{
                            width: "60%",
                            background:
                              "linear-gradient(90deg, var(--accent-blue), transparent)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
