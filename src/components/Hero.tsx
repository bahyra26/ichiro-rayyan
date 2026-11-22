import { ArrowDown, ExternalLink } from 'lucide-react';
import {
  HERO_MEDIA,
  PROJECT_LINKS,
  isVideoFile,
  pauseOtherVideos,
} from '../data/regionVideos';

export function Hero() {
  return (
    <section
      id="top"
      className="ichiro-gradient-hero relative border-b-2 border-[#535B85] py-14 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#0B0E27]/45"
      />
      <div className="site-container relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-[#17ADE4]/50 bg-[#061537]/85 px-3 py-1 text-xs font-semibold tracking-widest text-[#BDE7F6] uppercase">
            <span>Reinforcement Learning · Humanoid Robotics</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#EDF3F7] sm:text-5xl">
            Humanoid Goalkeeper
          </h1>
          <p className="mt-2 text-lg font-semibold text-[#79D4F3] sm:text-xl">
            Learning to Defend with Booster K1
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#CBD1DE]">
            An Isaac Gym simulation study of a humanoid goalkeeper that intercepts
            shots, maintains balance, and returns to its ready position.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <a
              href="#demonstrations"
              className="neubrutal-btn inline-flex items-center gap-2 rounded-lg bg-[#0999D2] px-4 py-2.5 text-sm font-semibold text-[#F4F2F6] transition-colors hover:bg-[#17ADE4]"
            >
              Watch Demonstrations
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={PROJECT_LINKS.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neubrutal-btn inline-flex items-center gap-2 rounded-lg bg-[#62145C] px-4 py-2.5 text-sm font-semibold text-[#F4F2F6] transition-colors hover:border-[#17ADE4] hover:bg-[#711C63]"
            >
              View GitHub
              <ExternalLink className="h-4 w-4 text-[#BDE7F6]" aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="neubrutal-card mt-10 overflow-hidden rounded-xl bg-[#0E1149]">
          {HERO_MEDIA.videoSrc && isVideoFile(HERO_MEDIA.videoSrc) ? (
            <video
              controls
              playsInline
              preload="metadata"
              poster={HERO_MEDIA.stillSrc}
              onPlay={(e) => pauseOtherVideos(e.currentTarget)}
              aria-label="Booster K1 humanoid goalkeeper simulation showcase"
              className="aspect-video w-full bg-[#05060C] object-cover"
            >
              <source src={HERO_MEDIA.videoSrc} type="video/mp4" />
              Your browser does not support embedded MP4 playback.
            </video>
          ) : HERO_MEDIA.videoSrc ? (
            <div className="relative aspect-video w-full bg-[#05060C]">
              <img
                src={HERO_MEDIA.videoSrc}
                alt={HERO_MEDIA.stillAlt}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full bg-[#05060C]">
              <img
                src={HERO_MEDIA.stillSrc}
                alt={HERO_MEDIA.stillAlt}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-3 right-3 rounded-md border border-[#05060C] bg-[#C42876] px-2.5 py-1 text-xs font-semibold text-[#F4F2F6] shadow-[2px_2px_0_#05060C]">
                Simulation still · Showcase video pending
              </span>
            </div>
          )}
          <figcaption className="border-t-2 border-[#535B85] bg-[#0E1149] px-4 py-2.5 text-xs text-[#CBD1DE]">
            {HERO_MEDIA.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
