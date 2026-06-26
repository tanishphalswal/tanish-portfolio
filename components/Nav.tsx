"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto max-w-6xl px-5 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "depth-shadow rounded-2xl py-3 mx-4 sm:mx-auto"
            : ""
        }`}
        style={
          scrolled
            ? {
                background:
                  "linear-gradient(160deg, rgba(13,18,25,0.82), rgba(13,18,25,0.68))",
                border: "1px solid var(--panel-border-strong)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }
            : undefined
        }
      >
        <a
          href="#top"
          className="font-display font-semibold text-[15px] tracking-tight text-text-primary flex items-center gap-2"
        >
          <span className="status-dot" />
          tanish<span className="text-accent-amber">.</span>dev
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="text-sm font-medium px-4 py-2 rounded-lg glass-strong hover:border-accent-amber/40 transition-colors text-text-primary inline-flex items-center gap-1.5"
        >
          Let&apos;s talk
          <ArrowUpRight size={14} />
        </a>
      </nav>
    </header>
  );
}
