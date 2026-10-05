"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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
          onClick={() => setMenuOpen(false)}
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
        <div className="flex items-center gap-2">
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="text-sm font-medium px-4 py-2 rounded-lg glass-strong hover:border-accent-amber/40 transition-colors text-text-primary inline-flex items-center gap-1.5">
            Let&apos;s talk <ArrowUpRight size={14} />
          </a>
          <button ref={menuRef} className="md:hidden rounded-lg glass-strong p-2.5 text-text-primary"
            type="button" aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-navigation" aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {menuOpen && <div id="mobile-navigation" className="md:hidden mx-4 mt-2 rounded-2xl glass-strong p-2 depth-shadow">
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
          className="block rounded-lg px-4 py-3 text-sm text-text-primary hover:bg-white/5">{link.label}</a>)}
      </div>}
    </header>
  );
}
