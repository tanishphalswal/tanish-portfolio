import { Heart } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="px-5 max-w-6xl mx-auto py-10 border-t border-panel-border">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-text-faint flex items-center gap-1.5">
          © {new Date().getFullYear()} {profile.name} — built with Next.js
          <Heart size={11} className="text-accent-amber/70" />
        </p>
        <p className="font-mono text-xs text-text-faint flex items-center gap-2">
          <span className="status-dot" />
          deployed on vercel
        </p>
      </div>
    </footer>
  );
}
