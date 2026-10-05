# Tanish Phalswal — Portfolio

Next.js 16 portfolio for full-stack development, DevOps, websites, UI/UX, digital marketing, and graphic design.

## Run

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm test`, `npm run lint`, and `npm run build` before deployment.

## Content

- `lib/data.ts`: profile, stack, Web App projects, experience, certifications, workflow.
- `lib/work-data.ts`: work categories, website cards, named UI/UX studies, marketing summaries.
- `lib/work-media.ts`: discovers media in project folders and reads its real dimensions at build time.
- `components/Work.tsx`: five category tabs; `components/Projects.tsx` keeps the original Web App cards.

The portfolio currently uses illustrative SVG mockups for Web Apps whose real screens are behind client logins. The three live website cards use captured homepage screenshots. Realty Vue is labeled in progress and has no live URL.

## Add screenshots and artwork

Place JPG, PNG, WebP, or AVIF images in the appropriate folder:

```text
public/portfolio/
  ui-ux/
    reality-vue/
    random-it-solution/
    leecots/
    mukherjee-global/
    hrms/
  digital-marketing/
    meta-lead-campaigns/
    search-visibility/
  graphic-design/
    branding/
    social-media/
    print/
    other/
  websites/
    cross-learning/home.jpg
    calance-training/home.jpg
    reality-vue/
    cut-edge-technology/home.jpg
```

Use descriptive names with a numeric prefix for screen order, e.g. `01-dashboard.webp`, `02-leads.webp`. The UI/UX and marketing galleries discover files automatically after the next build/deployment. Graphic artwork appears automatically in a compact, mixed-ratio masonry layout; the first 12 items render initially and the rest appear on demand. Images are resized by `next/image`; keep originals reasonably compressed and omit confidential data from screenshots.

The Realty Vue website cover can be added at `public/portfolio/websites/reality-vue/home.jpg` when a shareable screenshot exists, then set `cover` in `lib/work-data.ts`. Add a live URL only after the site launches.

## Notes

The homepage is built from `app/page.tsx` and uses locally stored screenshot assets. Employer links in Experience identify the companies; they do not imply ownership of each company's corporate website.
