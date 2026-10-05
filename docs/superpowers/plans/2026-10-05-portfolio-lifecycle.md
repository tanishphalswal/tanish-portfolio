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

**Current state:** Phases 1–6 are complete in the commits recorded below and this phase 6 commit. Browser verification is reproducible, mobile Escape dismissal and viewer keyboard focus are fixed. Original UI/UX and graphic assets are intentionally pending user input. The next content task is phase 7 after those assets are supplied.

**Verification:** The baseline's six automated tests, ESLint, TypeScript, and production build passed on 2026-10-05. Phase 6 additionally ran Chromium at desktop 1440px, tablet 768px, and mobile 390px; verified all tabs, website images, mobile menu, keyboard controls, and 40 mixed-ratio synthetic graphics. Browser tests reproduced two bugs before their fixes: mobile Escape dismissal and viewer focus containment. The suite passed after the fixes. Synthetic assets are removed before release; the user's actual artwork has not yet been reviewed. Do not infer successful deployment from a GitHub push.

| Phase | Deliverable | Status | Checkpoint |
| --- | --- | --- | --- |
| 1 | Experience dates, MERN roles, company links | Implemented and pushed | Baseline feature commit |
| 2 | Five work categories and ERP | Implemented and pushed | Baseline feature commit |
| 3 | Four website cards and three actual homepage captures | Implemented and pushed | Baseline feature commit |
| 4 | Named UI/UX folders, varied collage layout, viewer | Implemented and pushed; assets pending | Baseline feature commit |
| 5 | Graphic masonry, auto-discovery, native ratios, Load more | Implemented and pushed; artwork pending | Baseline feature commit |
| 6 | Browser checks, keyboard fixes, quality checks, durable lifecycle record | Complete; tests, lint, TypeScript, clean production build passed | Phase 6 commit containing this file |
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
- [x] Review browser behavior at desktop, tablet, and mobile sizes: all tabs, hamburger, website links/images, viewer Escape/arrows, graphic Load more, no horizontal overflow.
- [x] Verify 40 temporary mixed-ratio graphics, lazy image attributes, and 12/24/36/40 pagination in Chromium. Approved real graphics remain a phase 7 input.
- [x] Reproduce mobile Escape and viewer focus bugs in browser tests before fixing them; verify menu dismissal, viewer forward/backward focus containment, image navigation focus, and opener restoration after fixes.
- [x] Add `npm run test:browser`, a dev-only Playwright dependency, and README instructions. Tests generate synthetic media without overwriting supplied files and clean it up.
- [x] Persist this lifecycle record and push it as its own documentation checkpoint.

### Phase 6 execution ledger

- Base: `eff6db8f10c5ce8345f3effb9ad8cfb86dfce576`, the initial lifecycle checkpoint on remote `main`.
- Ruling: use temporary synthetic fixtures for the 40-image gallery and HRMS viewer checks — approved artwork was not supplied — visual assessment of the user's actual content remains pending phase 7.
- Runtime recovery: standard Chromium download was truncated; a locally extracted Chromium executable enabled Playwright checks. The fallback browser package is not a committed dependency.
- RED: browser tests passed category/layout, tab keyboard, and gallery checks; failed mobile Escape dismissal and viewer Tab focus containment.
- GREEN: mobile Escape now closes and focuses its trigger; native modal dialog isolates the page, explicitly cycles Tab/Shift+Tab, retains navigation focus, and restores the opener on close. All five browser scenarios and their parent test passed.
- Release checks: `npm test` passed 6/6; `npm run test:browser` passed all five child scenarios (6/6 including the parent); ESLint and `npx tsc --noEmit` exited 0; final `npm run build` exited 0 with `/` statically prerendered after removing all temporary media.
- Final review: independent reviewer found no Critical or Important issues.
- Final: minor (deferred): gallery ratio checks inspect declared dimensions and rendered layout; decoding representative graphic images is not asserted. Website screenshots are decoded in browser tests. Add explicit graphic decoding checks alongside the supplied-artwork review in phase 7.
- Integration: user already authorized phase completion and push to `main`; phase 6 is committed with this checkpoint and the remote SHA is verified after pushing.

### Phase 7: Supplied media integration

**Files:** Approved assets in `public/portfolio/`; adjust `lib/work-data.ts` only when a website cover/live URL becomes available.

- [ ] Add user-supplied UI/UX images to each named folder using numeric prefixes such as `01-dashboard.webp`.
- [ ] Add approved graphics to the matching artwork folders and marketing media to their campaign folders.
- [ ] Add Realty Vue's website cover when supplied; add its URL only when live.
- [ ] Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
- [ ] Review loaded media, original ratios, image order, pagination, and viewer interactions in a browser; scroll representative portrait/landscape/square graphics into view and await image decoding.
- [ ] Commit and push only this phase's changes; verify remote commit; update this checkpoint.

## Resume and push protocol

1. Fetch the latest remote `main` and read this file plus `README.md` before making edits. Respect newer changes.
2. Select the first incomplete actionable item. Items waiting for assets or runtime access are not permission to invent replacements.
3. Finish the selected phase and run the listed checks. Fix failures within the phase.
4. Update this file with completed items, exact check results, outstanding blockers, and the next actionable item.
5. Commit implementation and checkpoint together; push; verify the remote SHA. A documentation checkpoint can refer to its own containing commit without a self-referential SHA.
6. Continue the next actionable phase automatically within the user's authorized scope. Stop only when requested work is complete or genuinely requires missing input/access.
7. After context loss, recover from the remote checkpoint rather than reconstructing work from chat memory.
