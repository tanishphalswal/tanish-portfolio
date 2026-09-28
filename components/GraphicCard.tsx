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
