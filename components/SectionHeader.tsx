"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export default function SectionHeader({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  accent = "var(--accent-blue)",
}: {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  description?: string;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 sm:mb-14"
    >
      <span
        className="chip-mono inline-flex items-center gap-1.5"
        style={{ color: accent }}
      >
        {EyebrowIcon && <EyebrowIcon size={13} strokeWidth={2.25} />}
        {eyebrow}
      </span>
      <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mt-3 text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="text-text-muted mt-3 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
