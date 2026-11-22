import { useState, type ReactNode } from 'react';
import {
  REGION_SAVE_DATA,
  SPEED_BAND_DATA,
  SUMMARY_METRICS,
} from '../data/evaluationMetrics';

const METRIC_ACCENTS = ['#17ADE4', '#0999D2', '#C42876'];
const Y_TICKS = [100, 75, 50, 25, 0];

type ChartBar = {
  id: string;
  label: string;
  subLabel?: string;
  valuePct: number;
  ariaLabel: string;
  tooltip: ReactNode;
};

function BarChartCard({
  title,
  subtitle,
  bars,
  barColor,
}: {
  title: string;
  subtitle: string;
  bars: ChartBar[];
  barColor: string;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="neubrutal-card rounded-xl bg-[#0E1149] p-5">
      <div>
        <h3 className="text-base font-semibold text-[#EDF3F7]">{title}</h3>
        <p className="mt-0.5 text-xs text-[#CBD1DE]">{subtitle}</p>
      </div>

      <div className="mt-5 flex gap-2.5">
        <div
          aria-hidden="true"
          className="flex h-56 w-9 shrink-0 flex-col justify-between text-right text-[11px] text-[#CBD1DE]"
        >
          {Y_TICKS.map((tick) => (
            <span key={tick} className="leading-none">
              {tick}%
            </span>
          ))}
        </div>

        <div className="flex-1">
          <div className="relative h-56 border-b border-[#535B85]">
            {Y_TICKS.slice(0, -1).map((tick) => (
              <div
                key={tick}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 border-t border-dashed border-[#535B85]/45"
                style={{ top: `${100 - tick}%` }}
              />
            ))}

            <div
              className="relative grid h-full gap-1.5"
              style={{
                gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))`,
              }}
            >
              {bars.map((bar, idx) => {
                const isActive = activeIdx === idx;
                const alignClass =
                  idx === 0
                    ? 'left-0'
                    : idx === bars.length - 1
                      ? 'right-0'
                      : 'left-1/2 -translate-x-1/2';

                return (
                  <button
                    key={bar.id}
                    type="button"
                    aria-label={bar.ariaLabel}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseLeave={() => setActiveIdx(null)}
                    onFocus={() => setActiveIdx(idx)}
                    onBlur={() => setActiveIdx(null)}
                    className={`relative flex h-full items-end justify-center px-1 transition-colors ${
                      isActive ? 'bg-[#17ADE4]/12' : 'hover:bg-[#17ADE4]/12'
                    }`}
                  >
                    <span
                      className="block w-full max-w-14 rounded-t-sm transition-opacity"
                      style={{
                        height: `${bar.valuePct}%`,
                        backgroundColor: barColor,
                      }}
                    />

                    {isActive && (
                      <div
                        role="tooltip"
                        className={`pointer-events-none absolute top-2 z-20 w-max max-w-52 rounded-lg border-2 border-[#535B85] bg-[#05060C] px-3 py-2 text-left text-xs text-[#F4F2F6] shadow-[3px_3px_0_#0B0E27] ${alignClass}`}
                      >
                        {bar.tooltip}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="mt-2 grid gap-1.5 text-center"
            style={{
              gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))`,
            }}
          >
            {bars.map((bar) => (
              <div key={bar.id} className="leading-tight">
                <p className="text-[11px] font-medium text-[#CBD1DE]">
                  {bar.label}
                </p>
                {bar.subLabel && (
                  <p className="text-[10px] text-[#79D4F3]">{bar.subLabel}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SPEED_BARS: ChartBar[] = SPEED_BAND_DATA.map((item) => ({
  id: item.band,
  label: item.band.startsWith('Standard') ? 'Standard' : item.band,
  subLabel: item.band.startsWith('Standard') ? '≈5.5–9 m/s' : undefined,
  valuePct: item.saveRatePct,
  ariaLabel: `${item.band}: ${item.saveRatePct.toFixed(2)}% (${item.saved} of ${item.total} on-target shots)`,
  tooltip: (
    <>
      <p className="font-semibold text-[#EDF3F7]">{item.band}</p>
      <p className="mt-1 text-[#CBD1DE]">
        Save rate:{' '}
        <span className="font-bold text-[#17ADE4]">
          {item.saveRatePct.toFixed(2)}%
        </span>
      </p>
      <p className="text-[#CBD1DE]/80">
        {item.saved.toLocaleString()} / {item.total.toLocaleString()} on-target
        shots
      </p>
    </>
  ),
}));

const REGION_BARS: ChartBar[] = REGION_SAVE_DATA.map((item) => ({
  id: item.region,
  label: item.region,
  valuePct: item.saveRatePct,
  ariaLabel: `${item.region} ${item.label}: ${item.saveRatePct.toFixed(2)}% weighted save rate`,
  tooltip: (
    <>
      <p className="font-semibold text-[#EDF3F7]">
        {item.region} · {item.label}
      </p>
      <p className="mt-1 text-[#CBD1DE]">
        70/30 weighted:{' '}
        <span className="font-bold text-[#79D4F3]">
          {item.saveRatePct.toFixed(2)}%
        </span>
      </p>
      <p className="mt-0.5 text-[#CBD1DE]/80">
        Standard: {item.stdSaved} / {item.stdTotal} (
        {((item.stdSaved / item.stdTotal) * 100).toFixed(1)}%)
      </p>
      <p className="text-[#CBD1DE]/80">
        Fast (10–14 m/s): {item.fastSaved} / {item.fastTotal} (
        {((item.fastSaved / item.fastTotal) * 100).toFixed(1)}%)
      </p>
    </>
  ),
}));

export function PerformanceResults() {
  return (
    <section
      id="results"
      className="border-b-2 border-[#535B85] bg-[#061537] py-14 sm:py-20"
    >
      <div className="site-container">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-[#EDF3F7] sm:text-3xl">
            Performance Results
          </h2>
          <p className="mt-2 text-base text-[#CBD1DE]">
            Evaluation of Policy 1 (
            <code className="rounded bg-[#122D53] px-1.5 py-0.5 font-mono text-sm text-[#BDE7F6]">
              v11_6000
            </code>
            ) across standard and high-speed shot bands in NVIDIA Isaac Gym.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {SUMMARY_METRICS.map((metric, idx) => (
            <div
              key={metric.id}
              className="neubrutal-card rounded-xl bg-[#0E1149] p-5"
            >
              <div
                className="mb-3 h-1 w-12 rounded-full"
                style={{
                  backgroundColor: METRIC_ACCENTS[idx % METRIC_ACCENTS.length],
                }}
              />
              <p className="text-3xl font-extrabold tracking-tight text-[#EDF3F7]">
                {metric.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#79D4F3]">
                {metric.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#CBD1DE]">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarChartCard
            title="Save Rate by Shot Speed"
            subtitle="On-target save percentage across the four evaluation speed bands"
            bars={SPEED_BARS}
            barColor="#17ADE4"
          />
          <BarChartCard
            title="Save Rate by Goal Region"
            subtitle="70/30 weighted save rate (%) per goal region (R0–R5)"
            bars={REGION_BARS}
            barColor="#0999D2"
          />
        </div>

        <p className="mt-5 text-xs text-[#CBD1DE]/80">
          Simulation evaluation of the Booster K1 goalkeeper (v11_6000), seeds 1,
          777, and 2026. Results are not physical-robot performance claims.
        </p>
      </div>
    </section>
  );
}
