# Humanoid Goalkeeper — Booster K1 Showcase

Minimal single-page academic research showcase for the Booster K1 humanoid goalkeeper adaptation ([bahyra26/Humanoid-Goalkeeper](https://github.com/bahyra26/Humanoid-Goalkeeper)), prepared for ICHIRO ITS and adapted from *Humanoid Goalkeeper: Learning from Position Conditioned Task-Motion Constraints* (Ren et al., 2025).

## Development & Verification

```bash
npm install
npm run dev      # local development server
npm run lint     # TypeScript typecheck
npm test         # verify public asset paths, clip lineup, and benchmark math
npm run build    # typecheck + production bundle into dist/
```

## Media & Report Paths

All 15 simulation clips are wired in `src/data/regionVideos.ts` from `public/videos/` (supports animated `.webp` via `<img>` and `.mp4`/`.webm` via `<video>`):

- Hero continuous 5-shot take: `public/videos/15_random_5shots_continuous.webp`
- Standard saves (`R0`–`R5`, `7.0–8.5 m/s`): `01_std_r0_mid_left.webp` through `06_std_r5_low_right.webp`
- Fast saves (`R0`–`R5`, `10.5–12.0 m/s`): `07_fast_r0_mid_left.webp` through `12_fast_r5_low_right.webp`
- 2-Policy walk-back (`READY_HOME`): `13_walkback_r2_high_left.webp` (`2.96 s` / `148` steps) and `14_walkback_r1_mid_right.webp` (`3.92 s` / `196` steps)

### Detailed Report PDF

Place the final PDF at `public/reports/booster-k1-detailed-report.pdf` and set `REPORT_CONFIG.pdfPath = 'reports/booster-k1-detailed-report.pdf'` in `src/data/evaluationMetrics.ts`.
