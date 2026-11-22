import type { RegionId } from './regionVideos';

const pct = (saved: number, total: number) =>
  total > 0 ? Math.round((saved / total) * 10000) / 100 : 0;

export type SummaryMetric = {
  id: string;
  value: string;
  label: string;
  detail: string;
};

export type SpeedBandDatum = {
  band: string;
  saved: number;
  total: number;
  saveRatePct: number;
};

export type RegionSaveDatum = {
  region: RegionId;
  label: string;
  stdSaved: number;
  stdTotal: number;
  fastSaved: number;
  fastTotal: number;
  /** 70/30 weighted save rate matching docs/k1_final_save_by_region.png */
  saveRatePct: number;
};

const RAW_SPEED_BANDS = [
  { band: 'Standard (≈5.5–9 m/s)', saved: 896, total: 1080 },
  { band: '10 m/s', saved: 421, total: 1072 },
  { band: '12 m/s', saved: 460, total: 1080 },
  { band: '14 m/s', saved: 429, total: 1080 },
] as const;

export const SPEED_BAND_DATA: SpeedBandDatum[] = RAW_SPEED_BANDS.map((row) => ({
  ...row,
  saveRatePct: pct(row.saved, row.total),
}));

const stdBand = SPEED_BAND_DATA[0];
const fastSavedTotal = SPEED_BAND_DATA.slice(1).reduce((s, r) => s + r.saved, 0);
const fastShotsTotal = SPEED_BAND_DATA.slice(1).reduce((s, r) => s + r.total, 0);
const allSavedTotal = stdBand.saved + fastSavedTotal;
const allShotsTotal = stdBand.total + fastShotsTotal;
const weighted7030 =
  Math.round(
    (0.7 * (stdBand.saved / stdBand.total) + 0.3 * (fastSavedTotal / fastShotsTotal)) *
      10000
  ) / 100;

export const SUMMARY_METRICS: SummaryMetric[] = [
  {
    id: 'standard-rate',
    value: `${stdBand.saveRatePct.toFixed(2)}%`,
    label: 'Standard-shot save rate',
    detail: `${stdBand.saved.toLocaleString()} / ${stdBand.total.toLocaleString()} on-target standard shots (~5.5–9 m/s, 7 falls)`,
  },
  {
    id: 'weighted-rate',
    value: `${weighted7030.toFixed(2)}%`,
    label: '70/30 weighted save rate',
    detail: `70% standard + 30% fast (10–14 m/s); weighted metric, not raw ${allShotsTotal.toLocaleString()}-shot fraction`,
  },
  {
    id: 'stress-rate',
    value: `${pct(allSavedTotal, allShotsTotal).toFixed(2)}%`,
    label: 'Four-band stress-test save rate',
    detail: `${allSavedTotal.toLocaleString()} / ${allShotsTotal.toLocaleString()} on-target shots; equal grouping across standard, 10, 12, and 14 m/s bands`,
  },
];

/**
 * Per-region counts for Policy 1 (v11_6000) across seeds 1, 777, and 2026.
 * Verified directly against evaluation/k1_v11_v13_allseeds_benchmark.json and docs/k1_final_save_by_region.png.
 */
const RAW_REGIONS: Array<Omit<RegionSaveDatum, 'saveRatePct'>> = [
  { region: 'R0', label: 'Middle Left', stdSaved: 159, stdTotal: 180, fastSaved: 238, fastTotal: 540 },
  { region: 'R1', label: 'Middle Right', stdSaved: 151, stdTotal: 180, fastSaved: 354, fastTotal: 540 },
  { region: 'R2', label: 'Upper Left', stdSaved: 125, stdTotal: 180, fastSaved: 155, fastTotal: 535 },
  { region: 'R3', label: 'Upper Right', stdSaved: 143, stdTotal: 180, fastSaved: 101, fastTotal: 537 },
  { region: 'R4', label: 'Lower Left', stdSaved: 158, stdTotal: 180, fastSaved: 215, fastTotal: 540 },
  { region: 'R5', label: 'Lower Right', stdSaved: 160, stdTotal: 180, fastSaved: 247, fastTotal: 540 },
];

export const REGION_SAVE_DATA: RegionSaveDatum[] = RAW_REGIONS.map((row) => ({
  ...row,
  saveRatePct:
    Math.round(
      (0.7 * (row.stdSaved / row.stdTotal) + 0.3 * (row.fastSaved / row.fastTotal)) *
        10000
    ) / 100,
}));

export const REPORT_CONFIG = {
  /** Set to 'reports/booster-k1-detailed-report.pdf' only once a real PDF exists in public/reports/. */
  pdfPath: undefined as string | undefined,
  expectedPath: 'public/reports/booster-k1-detailed-report.pdf',
};
