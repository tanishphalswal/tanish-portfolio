"use client";

import { motion } from "framer-motion";
import { Briefcase, Award, CircleDot, ExternalLink } from "lucide-react";
import { certifications, experience } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";

export default function Experience() {
  return (
    <section id="experience" className="section-pad px-5 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="~/experience"
        eyebrowIcon={Briefcase}
        title="Where this was learned"
        accent="var(--accent-green)"
      />

      <div className="grid md:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          {experience.map((exp) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <TiltCard intensity={3} className="glow-surface glass rounded-2xl p-6 sm:p-8 depth-shadow">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-accent-blue/10 border border-accent-blue/25">
                      <Briefcase size={17} className="text-accent-blue" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-text-primary">
                        {exp.role}
                      </h3>
                      <p className="text-text-muted text-sm mt-1">
                        <a href={exp.website} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:text-accent-blue transition-colors underline underline-offset-4 decoration-panel-border-strong">
                          {exp.company}<ExternalLink size={12} aria-hidden="true" />
                        </a> · {exp.location}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-accent-amber bg-accent-amber/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.points.map((p) => (
                    <li
                      key={p}
                      className="text-sm text-text-muted flex gap-3 leading-relaxed"
                    >
                      <CircleDot size={14} className="text-accent-blue mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TiltCard intensity={4} className="glow-surface glass rounded-2xl p-6 sm:p-7 h-fit depth-shadow">
            <div className="flex items-center gap-2 mb-5">
              <Award size={16} className="text-accent-amber" />
              <h3 className="font-display text-sm font-medium text-text-primary">
                Certifications
              </h3>
            </div>
            <div className="space-y-4">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className="flex items-start gap-3 pb-4 border-b border-panel-border last:border-0 last:pb-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">
                      {c.name}
                    </p>
                    <p className="text-xs text-text-faint font-mono mt-0.5">
                      {c.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
