import { useState } from 'react';
import { Film } from 'lucide-react';
import {
  REGION_CLIPS,
  WALKBACK_CLIPS,
  isVideoFile,
  pauseOtherVideos,
  type SpeedTier,
} from '../data/regionVideos';

const TIER_TABS: Array<{ id: SpeedTier; label: string; range: string }> = [
  { id: 'standard', label: 'Standard', range: '7.0–8.5 m/s' },
  { id: 'fast', label: 'Fast', range: '10.5–12.0 m/s' },
];

function MediaFrame({
  src,
  poster,
  alt,
  videoLabel,
  expectedFile,
}: {
  src?: string;
  poster?: string;
  alt: string;
  videoLabel: string;
  expectedFile: string;
}) {
  return (
    <div className="relative aspect-video w-full border-b-2 border-[#535B85] bg-[#061537]">
      {src && isVideoFile(src) ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={poster}
          onPlay={(e) => pauseOtherVideos(e.currentTarget)}
          aria-label={videoLabel}
          className="h-full w-full bg-[#05060C] object-cover"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support embedded MP4 playback.
        </video>
      ) : src ? (
        <img
          src={src}
          alt={videoLabel}
          loading="lazy"
          decoding="async"
          className="h-full w-full bg-[#05060C] object-cover"
        />
      ) : poster ? (
        <>
          <img
            src={poster}
            alt={alt}
            className="h-full w-full object-cover opacity-85"
          />
          <span className="absolute top-2.5 right-2.5 rounded border border-[#05060C] bg-[#C42876] px-2 py-0.5 text-[11px] font-semibold text-[#F4F2F6] shadow-[2px_2px_0_#05060C]">
            Video coming soon
          </span>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
          <Film className="h-6 w-6 text-[#79D4F3]" aria-hidden="true" />
          <span className="mt-2 rounded border border-[#05060C] bg-[#C42876] px-2 py-0.5 text-[11px] font-semibold text-[#F4F2F6] shadow-[2px_2px_0_#05060C]">
            Video coming soon
          </span>
          <p className="mt-1.5 font-mono text-[11px] text-[#CBD1DE]">
            {expectedFile}
          </p>
        </div>
      )}
    </div>
  );
}

export function RegionVideoGrid() {
  const [tier, setTier] = useState<SpeedTier>('standard');

  const handleTierChange = (nextTier: SpeedTier) => {
    if (nextTier === tier) return;
    pauseOtherVideos();
    setTier(nextTier);
  };

  const clips = REGION_CLIPS[tier];

  return (
    <section
      id="demonstrations"
      className="border-b-2 border-[#535B85] bg-[#0B0E27] py-14 sm:py-20"
    >
      <div className="site-container">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#EDF3F7] sm:text-3xl">
              Goalkeeper in Action
            </h2>
            <p className="mt-2 text-base text-[#CBD1DE]">
              Watch successful saves across six regions of the goal at standard
              and high shot speeds.
            </p>
            <p className="mt-1.5 text-xs text-[#BDE7F6]/80">
              Region labels follow the goalkeeper&apos;s perspective (+Y left, −Y
              right in the K1 goal coordinate frame).
            </p>
          </div>

          <div
            role="group"
            aria-label="Shot speed tier"
            className="inline-flex self-start rounded-lg border-2 border-[#535B85] bg-[#061537] p-1 shadow-[3px_3px_0_#05060C]"
          >
            {TIER_TABS.map((tab) => {
              const active = tier === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleTierChange(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#0999D2] text-[#F4F2F6]'
                      : 'text-[#CBD1DE] hover:text-[#17ADE4]'
                  }`}
                >
                  {tab.label}{' '}
                  <span className="font-mono text-[11px] opacity-90">
                    ({tab.range})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((item) => (
            <article
              key={item.id}
              className="neubrutal-card flex flex-col overflow-hidden rounded-xl bg-[#0E1149] transition-colors hover:border-[#17ADE4]"
            >
              <MediaFrame
                src={item.src}
                poster={item.poster}
                alt={
                  item.posterAlt ??
                  `${item.region} ${item.label} simulation reference still`
                }
                videoLabel={`${item.region} ${item.label} (${item.speedMps.toFixed(1)} m/s) save video`}
                expectedFile={item.expectedFile}
              />

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded border border-[#535B85] bg-[#122D53] px-1.5 py-0.5 font-mono text-xs font-bold text-[#BDE7F6]">
                        {item.region}
                      </span>
                      <h3 className="text-sm font-semibold text-[#EDF3F7]">
                        {item.label}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] text-[#79D4F3]">
                        {item.speedMps.toFixed(1)} m/s
                      </span>
                      {item.src && item.verifiedSave && (
                        <span className="rounded border border-[#17ADE4]/60 bg-[#0999D2]/20 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#79D4F3]">
                          SAVED
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-1.5 text-xs text-[#CBD1DE]">
                    {item.targetArea}
                  </p>
                </div>

                <div className="mt-3 space-y-1 border-t border-[#535B85]/60 pt-2.5 font-mono text-[11px] text-[#CBD1DE]">
                  <div className="flex items-center justify-between gap-2">
                    <span>
                      sy={item.launchY} → ({item.targetY}, {item.targetZ}) m
                    </span>
                    <span className="text-[#79D4F3]">
                      tilt {item.maxTilt.toFixed(3)}
                    </span>
                  </div>
                  {!item.src && (
                    <p className="text-[10px] text-[#CBD1DE]/70">
                      Planned clip: {item.expectedFile}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 border-t border-[#535B85]/60 pt-8">
          <h3 className="text-lg font-bold tracking-tight text-[#EDF3F7]">
            2-Policy Full Walk-Back
          </h3>
          <p className="mt-1 text-xs text-[#CBD1DE]">
            Full save-to-recovery handoff from Policy 1 (
            <code className="font-mono text-[#BDE7F6]">v11_6000</code>) to
            Policy 2 (
            <code className="font-mono text-[#BDE7F6]">walk_v5_2700</code>)
            until <code className="font-mono text-[#79D4F3]">READY_HOME</code>.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {WALKBACK_CLIPS.map((clip) => (
              <article
                key={clip.id}
                className="neubrutal-card flex flex-col overflow-hidden rounded-xl bg-[#0E1149] transition-colors hover:border-[#17ADE4]"
              >
                <MediaFrame
                  src={clip.src}
                  poster={clip.poster}
                  alt={`Booster K1 reference still for ${clip.region} walk-back`}
                  videoLabel={`2-policy walk-back ${clip.region} ${clip.label}`}
                  expectedFile={clip.expectedFile}
                />

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded border border-[#535B85] bg-[#122D53] px-1.5 py-0.5 font-mono text-xs font-bold text-[#BDE7F6]">
                        {clip.region}
                      </span>
                      <h4 className="text-sm font-semibold text-[#EDF3F7]">
                        {clip.label}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-[#79D4F3]">
                        {clip.speedMps.toFixed(1)} m/s
                      </span>
                      {clip.src && clip.verifiedSave && (
                        <span className="rounded border border-[#17ADE4]/60 bg-[#0999D2]/20 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#79D4F3]">
                          SAVED
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#535B85]/60 pt-2.5 font-mono text-[11px] text-[#CBD1DE]">
                    <span>
                      READY_HOME: {clip.homeSeconds.toFixed(2)} s (
                      {clip.homeSteps} steps)
                    </span>
                    <span className="text-[#CBD1DE]/70">
                      Policy 1 → Policy 2
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
