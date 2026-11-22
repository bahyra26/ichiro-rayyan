# Humanoid Goalkeeper — Booster K1
## Website Implementation Brief for Antigravity

**Status:** Approved product/design specification  
**Project type:** Minimal, single-page academic research showcase  
**Primary language of the website:** English  
**Project repository:** https://github.com/bahyra26/Humanoid-Goalkeeper  
**Visual inspiration only:** https://humanoid-goalkeeper.github.io/Goalkeeper/

> **ANTIGRAVITY: READ THIS FILE FIRST AND TREAT IT AS THE SOURCE OF TRUTH.**
> Build the requested website, not a generic dashboard, SaaS landing page, or copy of the reference site. Keep the scope deliberately small. Inspect the existing project structure before creating or changing files. Do not modify the reinforcement-learning research code, training configs, experiments, or benchmark files to implement this website.

---

## 1. Project objective

Create a **clean, modern, responsive, and credible one-page website** showcasing the Booster K1 humanoid goalkeeper research project.

A visitor should understand, in less than one minute:
1. What the Booster K1 goalkeeper project is.
2. What a successful save looks like in **each of the six goal regions (R0–R5)**.
3. How save rates vary by **shot speed** and **goal region**.
4. Where to find the **detailed research report** and source repository.

**This is a research showcase, not an application.** There is no login, user account, database, backend, admin dashboard, live telemetry, or payment integration.

## 2. Design direction — strict

- **Visual identity:** minimalist academic research showcase, with generous whitespace and a polished editorial feel.
- **Theme:** light background (`#FFFFFF` / very light neutral), dark charcoal text (`#111827`), subdued gray dividers, and a **restrained blue accent** (e.g. `#2563EB`).
- **Typography:** modern, highly readable sans-serif (Inter or equivalent). Strong hierarchy, no decorative fonts.
- **Layout:** maximum content width approximately `1120–1200px`, centered, consistent horizontal padding, comfortable vertical spacing.
- **Surfaces:** mostly flat; subtle borders and modest corner rounding; minimal shadow.
- **Motion:** gentle hover/fade effects only; support `prefers-reduced-motion`.
- **Mobile-first:** content must look intentional on desktop, tablet, and mobile.
- **Tone:** clear, technical but accessible; do not use marketing hype or exaggerated research claims.

### Do NOT

- Do **not** clone the inspiration site's markup, images, composition, or exact styling.
- Do **not** create a giant animated hero, 3D viewer, particle background, spinning robot, excessive gradients, glassmorphism, or parallax effects.
- Do **not** introduce a sidebar, analytics-style dashboard, authentication, pricing, or unrelated sections.
- Do **not** invent performance numbers, experiment results, videos, citations, or downloadable files.
- Do **not** add extra pages unless absolutely necessary; the default product is **one page**.

## 3. Required page structure (in this order)

1. **Navbar** — small wordmark/project name, anchor links: `Demonstrations`, `Results`, `Report`, and an external `GitHub` link.
2. **Hero** — title, one-sentence description, primary demo video (if real footage exists), two simple CTAs.
3. **Goalkeeper in Action** — exactly **six region cards**, R0–R5, each designed to play verified save footage.
4. **Performance Results** — key metric summary plus **two charts**: save rate by speed and save rate by region.
5. **Detailed Report** — short description and download CTA when a real PDF is available.
6. **Footer** — research attribution, ICHIRO ITS context, and GitHub/source links.

Avoid unnecessary copy. Favor strong visuals, short labels, and small explanatory notes.

## 4. Navbar

- Left: `Humanoid Goalkeeper` with optional smaller `Booster K1` label.
- Right: anchor navigation to `#demonstrations`, `#results`, `#report`; external GitHub link.
- Sticky header is optional, but keep it subtle and compact.
- On mobile, use a compact accessible menu **only if needed**; otherwise straightforward responsive links.
- Every link must work. External links use `target="_blank"` and `rel="noopener noreferrer"`.

## 5. Hero section

### Suggested on-page copy (English)

**Eyebrow:** `REINFORCEMENT LEARNING · HUMANOID ROBOTICS`

**Headline:** `Humanoid Goalkeeper`

**Subheadline:** `Learning to Defend with Booster K1`

**Short description:**
> An Isaac Gym simulation study of a humanoid goalkeeper that intercepts shots, maintains balance, and returns to its ready position.

**CTAs:** `Watch Demonstrations` (scroll to `#demonstrations`) and `View GitHub` (external).

### Hero media

- Prefer **one real, verified** showcase `.mp4`/`.webm` video with controls, poster, and an accessible label.
- **If no verified hero video is provided, do not fake one.** Use a clean still image taken from the repository (with attribution) or a neutral media placeholder until video footage is supplied.
- Keep the media prominent but within the content column; no autoplay with sound.

## 6. Six-region save video gallery (required)

**Section title:** `Goalkeeper in Action`  
**Supporting sentence:** `Watch successful saves across six regions of the goal at different shot speeds.`

### Required mapping

**Important:** Names are from the goalkeeper's perspective (not the shooter's).

| Region | On-page label | Target area | Notes |
|---|---|---|---|
| `R0` | `Middle Left` | Middle-height, robot's left | Positive Y in the K1 goal coordinate system |
| `R1` | `Middle Right` | Middle-height, robot's right | Negative Y |
| `R2` | `Upper Left` | High, robot's left | Positive Y |
| `R3` | `Upper Right` | High, robot's right | Negative Y |
| `R4` | `Lower Left` | Low, robot's left | Positive Y |
| `R5` | `Lower Right` | Low, robot's right | Negative Y |

Source of truth for region definitions: `legged_gym/legged_gym/envs/k1/k1_config.py` in the research repository.

### Video card requirements

- **Desktop:** 3 columns × 2 rows. **Tablet:** 2 columns. **Mobile:** 1 column.
- Every card has a `16:9` video/player area, label (`R0` … `R5`), shot-position name, and concise metadata.
- Show **actual shot speed (m/s)** and **launch distance (m)** only when verified for that particular clip.
- Show a small `SAVED` label **only for a verified successful save**.
- Use native HTML `<video controls playsInline preload="metadata">` or an equally accessible lightweight player.
- Poster images should be real frame captures / existing verified simulation stills. No AI-generated or random stock footage.
- Only **one** video should play at a time, when straightforward to implement.
- **Missing footage:** keep the region card present, but replace the player with a polished, honest `Video coming soon` state. Do not show a fake play button.
- No heavy video carousel. All six regions must be visible and easy to scan.

### Suggested asset convention (paths are planned, NOT existing verified files)

```text
public/
  videos/
    hero-showcase.mp4
    r0-middle-left.mp4
    r1-middle-right.mp4
    r2-upper-left.mp4
    r3-upper-right.mp4
    r4-lower-left.mp4
    r5-lower-right.mp4
  images/
    ...verified screenshots/posters...
  reports/
    booster-k1-detailed-report.pdf
```

**Important:** The current research repository contains verified **still images** for some saves, not an assured set of six `.mp4` clips. These paths are a file-naming convention only. Do not pretend missing assets already exist. The user will add the actual recorded videos.

### Existing documented examples (use as supporting metadata only when footage matches)

- `R0` middle-left parry: `7.5 m/s`, from `3.5 m`, target around `y=+0.45 m, z=0.72 m`.
- `R1` mid/right-side parry: `12.0 m/s`, from `5.0 m`, target around `y=-0.60 m, z=0.78 m`.
- `R2` upper-left parry: `10.0 m/s`, from `4.0 m`, target around `y=+0.55 m, z=0.95 m`.
- `R4` low-left/near-center block: `8.0 m/s`, from `3.5 m`, target around `y=+0.05 m, z=0.20 m`.

These are documented example saves in the repository README and image gallery; **they are not proof that corresponding video files already exist**. Do not fill metadata for `R3` or `R5` without verified source clips.

## 7. Performance Results (required)

**Section title:** `Performance Results`

### Metric cards

Use a small, balanced row of metrics. Label each denominator/weighting honestly:

- **`82.96%`** — `Standard-shot save rate` (`896 / 1,080` on-target standard shots).
- **`70.23%`** — `70/30 weighted save rate` (`70%` standard, `30%` fast; weighted metric, **not** raw 4,312-shot fraction).
- **`51.16%`** — `Four-band stress-test save rate` (`2,206 / 4,312` on-target shots; equal grouping across standard, 10, 12, and 14 m/s test bands).

These figures are for **Policy 1 `v11_6000`**, measured in **NVIDIA Isaac Gym simulation** under documented evaluation settings, across seeds `1`, `777`, and `2026`.

### Chart A: `Save Rate by Shot Speed`

Use one clean, responsive **bar chart**, not a complex dashboard. The verified values are:

| Evaluation band | Save rate |
|---|---:|
| `Standard (≈5.5–9 m/s)` | `82.96%` |
| `10 m/s` | `39.27%` |
| `12 m/s` | `42.59%` |
| `14 m/s` | `39.72%` |

Tooltip should show success count and denominator where available:

- Standard: `896 / 1080`
- 10 m/s: `421 / 1072`
- 12 m/s: `460 / 1080`
- 14 m/s: `429 / 1080`

Do not present the standard range as one exact speed.

### Chart B: `Save Rate by Goal Region`

- Render six bars in order: `R0`, `R1`, `R2`, `R3`, `R4`, `R5`.
- **Obtain the real six-region saves and shot counts** from the committed benchmark data and/or validated region chart, e.g.:
  - `evaluation/k1_v11_v13_allseeds_benchmark.json`
  - `docs/k1_final_save_by_region.png`
- **Inspect the source schema before using it**; do not assume field names or denominator definitions.
- Match the same checkpoint `v11_6000`, evaluation seeds, and `70/30` weighting definition if reporting weighted regional rates.
- If the JSON is insufficient for accurate per-region rates, **do not invent six percentages**. Show a well-designed `Regional breakdown pending verified data` message and wire the component for later data insertion.
- Tooltip for a region should show `R#`, readable region name, accurate percentage, and save/attempt counts **if those counts are available and comparable**.

### Chart implementation

- Use **Recharts** in React if the existing project stack allows it.
- Consistent axes, readable labels, simple tooltip, modest blue bars, neutral gridlines.
- Responsive on small screens; no legend when there is only one series.
- Add this small methodology line below charts:
  > Simulation evaluation of the Booster K1 goalkeeper (`v11_6000`), seeds 1, 777, and 2026. Results are not physical-robot performance claims.

## 8. Detailed Report section

**Heading:** `Detailed Report`

**Copy:**
> Explore the full methodology, simulation setup, reward design, policy evaluation, and experimental limitations.

**Actions:**

1. Primary: `Download Detailed Report` — downloads a **real PDF** using a working local file path and `download` attribute when appropriate.
2. Secondary: `View Source Code` — opens `https://github.com/bahyra26/Humanoid-Goalkeeper`.

**Critical availability rule:** The research repository currently says that the final internship PDF is **pending** and reserves `docs/k1-internship-report.pdf`. If there is no real PDF in the website project, show `Report PDF coming soon` / a disabled button; **never link to a nonexistent file or generate a dummy PDF**. Once a final PDF is supplied, connect it to the download button.

## 9. Footer and attribution

Keep the footer understated. Example copy:

> Booster K1 Humanoid Goalkeeper · Research internship adaptation for ICHIRO ITS.

Include source GitHub link and an appropriate acknowledgement of the original method:

> Adapted from *Humanoid Goalkeeper: Learning from Position Conditioned Task-Motion Constraints* (Ren et al., 2025).

Reference: https://arxiv.org/abs/2510.18002  
Original source: https://github.com/InternRobotics/Humanoid-Goalkeeper

Do not imply that all original research or the upstream method was invented within this adaptation. Keep licensing/credit notices consistent with the research repository.

## 10. Tech stack and engineering approach

**Default only if starting from an empty website workspace:**

- React + Vite + TypeScript
- Tailwind CSS
- Recharts for the two performance charts
- Native HTML5 video
- Lucide icons only if genuinely helpful
- Static hosting (Vercel / GitHub Pages)

If a React frontend already exists, **reuse its framework, file structure, package manager, and configuration** instead of rebuilding it. No Next.js migration unless already using Next.js. Do not install animation libraries or unnecessary packages.

### Suggested component structure (not a mandatory rewrite)

```text
src/
  components/
    Navbar.tsx
    Hero.tsx
    RegionVideoGrid.tsx
    PerformanceResults.tsx
    DetailedReport.tsx
    Footer.tsx
  data/
    regionVideos.ts
    evaluationMetrics.ts
  App.tsx
  index.css
```

Store footage metadata and chart data in small typed data modules so the user can update them easily. Avoid hardcoding the same values in multiple components.

Example of a **data shape, NOT evidence that the video exists**:

```ts
type RegionVideo = {
  region: 'R0' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
  label: string;
  src?: string;          // Only when a real playable file exists.
  poster?: string;       // Only real/verified footage still.
  speedMps?: number;     // Only when known for the exact clip.
  distanceM?: number;    // Only when known for the exact clip.
  verifiedSave: boolean; // True only for validated footage.
};
```

**Security / quality:** No keys, credentials, or private data in the frontend. Do not request external services. Use semantic HTML, accessible button labels, visible keyboard focus, and proper media controls.

## 11. Source of truth & asset safety

1. **Authoritative data:** The project's GitHub README, committed evaluation artifacts, and K1 config. Keep the checkpoint and benchmark definitions consistent.
2. **Do not fabricate media:** Existing `.png` screenshots are not `.mp4` footage. Never rename an image into a video or silently substitute footage from another robot.
3. **Do not fabricate metrics:** If a value is missing, use a clear pending state.
4. **Do not alter research code:** Build the website in a separate frontend directory/workspace or the existing dedicated web app, not inside training scripts.
5. **Do not overwrite user code or assets without inspecting the project.** Make incremental changes and preserve existing working features when possible.
6. **Keep the website buildable without the missing six clips or PDF.** Missing media should degrade gracefully, not break the app.

## 12. Definition of done / acceptance criteria

The task is complete only when all are true:

- [ ] A clean, professional **single-page** website exists and uses English text.
- [ ] Navbar anchors correctly scroll to the intended sections.
- [ ] Hero clearly identifies `Humanoid Goalkeeper` and `Booster K1`.
- [ ] Six distinct cards are visible, correctly labeled `R0–R5`, in a responsive 3/2/1-column grid.
- [ ] Each supplied verified clip is playable with matching speed/distance metadata; missing clips show honest placeholders.
- [ ] The `Save Rate by Shot Speed` chart uses the **exact** verified data above.
- [ ] The `Save Rate by Goal Region` chart uses **verified** R0–R5 data or a transparent pending state.
- [ ] The distinction between `70.23%` weighted and `51.16%` stress-test results is explicit.
- [ ] The report downloads successfully **if and only if** a real PDF exists; otherwise it is marked unavailable.
- [ ] GitHub and original-paper attribution links work.
- [ ] Desktop, tablet, and mobile layouts have been checked.
- [ ] No broken video elements, fake results, console errors, or major accessibility problems.
- [ ] Production build succeeds using the existing package manager.
- [ ] README/implementation summary explains **exactly** where to put six video files and the final PDF.

## 13. Antigravity execution instructions

Follow this order:

1. Inspect the current frontend workspace, existing assets, and package configuration.
2. Summarize your intended implementation in **five short bullets at most**; do not change the approved page structure.
3. Build the minimum complete responsive one-page site.
4. Use verified real values and existing verified assets only; add graceful placeholders for missing media/report.
5. Run available lint/typecheck/build commands and fix errors.
6. Report what was built, where media/PDF should be placed, and which inputs remain missing.

**Do not ask the user to approve every minor styling detail.** Use this spec and tasteful minimalist defaults. If an essential asset is absent, proceed with an honest placeholder; do not invent it.

---

### One-line instruction to paste into Antigravity

> Read `ANTIGRAVITY_WEBSITE_SPEC.md` completely and implement the website exactly within its scope. First inspect the existing project, then create a clean React-based single-page Humanoid Goalkeeper showcase with six region video cards, verified performance charts by speed and region, and an honest detailed-report download state. Do not invent footage, metrics, or extra features. Finally, build and validate the result.
