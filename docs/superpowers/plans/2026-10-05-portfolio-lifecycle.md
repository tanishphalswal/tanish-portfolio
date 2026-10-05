# Portfolio Expansion Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to continue this plan task-by-task in the current session. Read the checkpoint before editing. Completed phases must not be implemented again.

**Goal:** Present Tanish's development, design, and marketing work in five categories with a lightweight, responsive gallery and an updated experience timeline.

**Architecture:** Content lives in `lib/data.ts` and `lib/work-data.ts`. Server-side media discovery reads local images at build time; client components provide category tabs, collage previews, masonry artwork, and a full-screen viewer.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind CSS, sharp, next/image.

**Spec:** The Requested scope section below records the user's requirements; `README.md` documents asset folders.

## Requested scope

- Cut Edge ends July 2026; Cross Learning is July–September 2026; Calance starts September 2026 and is present. Cross Learning and Calance both show MERN Stack Developer and their official links.
- Work categories: Web Apps, Digital Marketing, UI/UX, Website Development, Graphic Design.
- Preserve existing Web Apps and add ERP.
- Website cards: Cross Learning, Calance Training, Realty Vue (not live), Cut Edge Technology. Capture real homepages for live sites.
- UI/UX projects: Reality Vue, Random IT Solution, Leecots, Mukherjee Global, HRMS. Prepare named folders; the user will supply images. Use a varied designer layout.
- Graphic Design: accommodate 30–40 images in a compact, automatic grid that preserves each original aspect ratio.
- Finish one phase, verify, commit, push, verify the remote checkpoint, then continue. Persist progress so context loss does not cause repeated implementation.

## Global constraints

- Keep existing Web App projects and their current mockups.
- Do not invent UI/UX screenshots, artwork, campaign results, or a live Realty Vue URL.
- Read `AGENTS.md` and relevant installed Next.js guides before changing framework behavior.
- Use local screenshots, responsive image sizes, lazy loading, and progressive gallery loading.
- Image folder additions become visible after rebuilding/deploying.
- Changes already shipped in the baseline stay shipped; do not rewrite history to manufacture separate earlier phase commits.

## Review focus

- Empty image folders must render an intentional state rather than broken images.
- Mixed portrait, landscape, and square artwork must retain its aspect ratio.
- Numeric filenames must keep screen order; unsupported files must be ignored.
- A missing media folder must not break the build.
- Mobile tabs/navigation, viewer keyboard controls, and gallery pagination need browser interaction review after runtime access is available.

## Durable checkpoint

**Baseline feature commit:** `3e86bb346eef629a4b59f4aa3d5a9099dbfd6b44` on `main`, verified through GitHub on 2026-10-05. Phases 1–5 were implemented together before the user requested separate lifecycle commits. Do not redo or split that published commit.

**Current state:** Requested implementation is shipped. Lifecycle documentation is the next checkpoint. Original UI/UX and graphic assets are intentionally pending user input; browser interaction review is pending runtime access.

**Verification:** Fresh runs of six automated tests, ESLint, TypeScript, and the production build all passed on 2026-10-05 before the documentation checkpoint. Next.js prerendered `/` successfully. Browser interaction review has not been completed; do not infer successful deployment from a GitHub push.

| Phase | Deliverable | Status | Checkpoint |
| --- | --- | --- | --- |
| 1 | Experience dates, MERN roles, company links | Implemented and pushed | Baseline feature commit |
| 2 | Five work categories and ERP | Implemented and pushed | Baseline feature commit |
| 3 | Four website cards and three actual homepage captures | Implemented and pushed | Baseline feature commit |
| 4 | Named UI/UX folders, varied collage layout, viewer | Implemented and pushed; assets pending | Baseline feature commit |
| 5 | Graphic masonry, auto-discovery, native ratios, Load more | Implemented and pushed; artwork pending | Baseline feature commit |
| 6 | Quality checks and durable lifecycle record | Automated checks passed; browser review pending | Documentation commit containing this file |
| 7 | Import user-provided UI/UX, graphics, marketing assets | Waiting for supplied assets | No assets supplied yet |

## Completed implementation phases

### Phase 1: Experience

**Files:** `lib/data.ts`, `components/Experience.tsx`, `tests/portfolio-content.test.mjs`.

- [x] Implement the exact dates, roles, reverse chronological order, and employer links.
- [x] Verify with `node --test tests/portfolio-content.test.mjs`.
- [x] Push and verify baseline feature commit on `main`.

### Phase 2: Categories and ERP

**Files:** `lib/work-data.ts`, `components/Work.tsx`, `components/Projects.tsx`, `components/ProjectMockup.tsx`, `app/page.tsx`.

**Interface:** Category IDs are `webapps`, `marketing`, `uiux`, `websites`, `graphic`; existing project IDs plus `erp` populate Web Apps.

- [x] Implement category switching and preserve the existing Web App presentation.
- [x] Add ERP and verify the category/project content tests.
- [x] Push and verify baseline feature commit.

### Phase 3: Website work

**Files:** `lib/work-data.ts`, `components/WorkCards.tsx`, `public/portfolio/websites/`.

- [x] Add Cross Learning, Calance Training, Realty Vue, Cut Edge Technology.
- [x] Store actual homepage screenshots for the three live websites.
- [x] Keep Realty Vue as in progress with no live URL.
- [x] Verify screenshot existence/content tests; push baseline feature commit.

### Phase 4: UI/UX

**Files:** `components/WorkCards.tsx`, `components/MediaViewer.tsx`, `lib/work-media.ts`, `public/portfolio/ui-ux/`.

**Interface:** `loadWorkMedia(publicRoot?)` returns `uiUxWork`, `marketingWork`, and `graphicWork`; each media entry includes `src`, `alt`, `width`, `height`.

- [x] Prepare `reality-vue`, `random-it-solution`, `leecots`, `mukherjee-global`, `hrms` folders.
- [x] Implement varied collage previews, ordered media discovery, and full-screen viewing.
- [x] Verify image dimensions/order and missing-folder behavior in `tests/work-media.test.mjs`.
- [x] Push baseline feature commit.

### Phase 5: Graphic Design and performance

**Files:** `components/WorkCards.tsx`, `app/globals.css`, `lib/work-media.ts`, `public/portfolio/graphic-design/`.

- [x] Discover branding, social-media, print, and other artwork folders.
- [x] Render intrinsic image ratios in responsive masonry columns.
- [x] Initially display 12 items and reveal subsequent groups of 12 on demand.
- [x] Use lazy next/image previews and responsive sizes; push baseline feature commit.

## Remaining lifecycle

### Phase 6: Verification and checkpoint

- [x] Run `npm test` and confirm all six tests pass.
- [x] Run `npm run lint` and `npx tsc --noEmit`; confirm exit code 0.
- [x] Run a fresh `npm run build`; confirm exit code 0 and static prerendering of `/`.
- [ ] Review browser behavior at desktop, tablet, and mobile sizes when a runnable preview is accessible: all tabs, hamburger, website links, viewer Escape/arrows, graphic Load more, no horizontal overflow.
- [ ] With real graphics, verify 30–40 mixed-ratio images and lazy loading in the browser.
- [x] Persist this lifecycle record and push it as its own documentation checkpoint.

### Phase 7: Supplied media integration

**Files:** Approved assets in `public/portfolio/`; adjust `lib/work-data.ts` only when a website cover/live URL becomes available.

- [ ] Add user-supplied UI/UX images to each named folder using numeric prefixes such as `01-dashboard.webp`.
- [ ] Add approved graphics to the matching artwork folders and marketing media to their campaign folders.
- [ ] Add Realty Vue's website cover when supplied; add its URL only when live.
- [ ] Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
- [ ] Review loaded media, original ratios, image order, pagination, and viewer interactions in a browser.
- [ ] Commit and push only this phase's changes; verify remote commit; update this checkpoint.

## Resume and push protocol

1. Fetch the latest remote `main` and read this file plus `README.md` before making edits. Respect newer changes.
2. Select the first incomplete actionable item. Items waiting for assets or runtime access are not permission to invent replacements.
3. Finish the selected phase and run the listed checks. Fix failures within the phase.
4. Update this file with completed items, exact check results, outstanding blockers, and the next actionable item.
5. Commit implementation and checkpoint together; push; verify the remote SHA. A documentation checkpoint can refer to its own containing commit without a self-referential SHA.
6. Continue the next actionable phase automatically within the user's authorized scope. Stop only when requested work is complete or genuinely requires missing input/access.
7. After context loss, recover from the remote checkpoint rather than reconstructing work from chat memory.
