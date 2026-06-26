# Tanish Phalswal — Portfolio

Full-stack developer + DevOps engineer portfolio. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Framework preset: Next.js (auto-detected)
4. Click Deploy — no env vars needed

Or via CLI:
```bash
npm install -g vercel
vercel
```

## Edit your content

All resume content lives in one file: `lib/data.ts`
- `profile` — name, role, summary, contact info
- `stack` — your tech stack grouped by category
- `projects` — project cards (Manetor, Setlup, Suppkart)
- `experience` — work history bullets
- `certifications` — cert list
- `deployLog` — the animated terminal lines in the hero

Edit that file and the whole site updates — no need to touch components.

## Add real screenshots

Currently using generated SVG mockups (`components/ProjectMockup.tsx`) since no real screenshots were provided. To swap in real screenshots:
1. Drop images into `public/projects/` (e.g. `manetor.png`)
2. In `components/Projects.tsx`, replace `<ProjectMockup kind={...} />` with a Next.js `<Image src="/projects/manetor.png" .../>`

## Structure

```
app/
  layout.tsx       — fonts (Space Grotesk, Inter, JetBrains Mono) + metadata
  page.tsx         — assembles all sections
  globals.css      — design tokens (colors, glass effect, grid background)
components/
  Nav.tsx          — sticky nav, glass on scroll
  Hero.tsx         — headline + animated "deploy console" terminal (3D tilt)
  Stack.tsx        — tech stack grouped by category
  BuildWorkflow.tsx— Figma -> Claude/Codex -> QA -> Ship pipeline section
  Projects.tsx     — project cards w/ mockups (3D tilt)
  ProjectMockup.tsx— SVG mockup generator (crm / marketplace / ecommerce)
  Experience.tsx   — work history + certifications
  Contact.tsx      — CTA + magnetic contact buttons
  Footer.tsx
  TiltCard.tsx     — reusable 3D mouse-tilt wrapper (degrades gracefully on touch)
  MagneticButton.tsx — buttons that subtly follow the cursor
  SectionHeader.tsx   — consistent eyebrow/title/description rhythm
  AmbientOrbs.tsx     — floating blurred background depth
lib/
  data.ts          — all content, single source of truth (now includes buildWorkflow)
```

## v2 additions (latest pass)
- 3D tilt on hero console, stack cards, project cards, experience cards (mouse-follow, perspective transform)
- Cursor-glow effect on glass panels (`.glow-surface`)
- Magnetic buttons in hero and contact section
- Ambient floating gradient orbs for background depth
- New "How it actually gets built" section — Figma → Claude/Codex → QA/Burp Suite → CI/CD ship pipeline
- Icons throughout (lucide-react) replacing text bullets/symbols
- Standardized section spacing via `.section-pad` utility class
