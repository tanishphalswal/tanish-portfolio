"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Link2, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  return (
    <section id="contact" className="section-pad px-5 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="glass-strong rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden depth-shadow-strong"
      >
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(91,157,240,0.14), transparent 60%)",
          }}
        />
        <div className="orb float-slow" style={{ width: 220, height: 220, top: "-10%", left: "-6%", background: "rgba(242,166,90,0.12)" }} />

        <span className="chip-mono text-accent-amber relative z-10 inline-flex items-center gap-1.5 justify-center">
          <Sparkles size={12} />
          ~/contact
        </span>
        <h2 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight mt-3 text-text-primary relative z-10">
          Got something to ship?
        </h2>
        <p className="text-text-muted mt-4 max-w-md mx-auto relative z-10">
          Open to full-stack and DevOps roles, freelance builds, or just
          talking shop about deploy pipelines.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 relative z-10">
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="items-center gap-2 px-5 py-3 rounded-xl bg-text-primary text-bg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Mail size={16} />
            {profile.email}
          </MagneticButton>
          <MagneticButton
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="items-center gap-2 px-5 py-3 rounded-xl glass text-text-primary font-medium text-sm hover:border-accent-blue/40 transition-colors"
          >
            <Link2 size={16} />
            LinkedIn
          </MagneticButton>
          <MagneticButton
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="items-center gap-2 px-5 py-3 rounded-xl glass text-text-primary font-medium text-sm hover:border-accent-amber/40 transition-colors"
          >
            <Phone size={16} />
            {profile.phone}
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
