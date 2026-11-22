import { PROJECT_LINKS } from '../data/regionVideos';

export function Footer() {
  return (
    <footer className="bg-[#05060C] py-10">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3.5">
            <a
              href={PROJECT_LINKS.ichiroUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ICHIRO ITS on Instagram"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-[#535B85] bg-white p-0.5 shadow-[2px_2px_0_#0B0E27] transition-colors hover:border-[#17ADE4]"
            >
              <img
                src="images/ichiro-logo.png"
                alt="ICHIRO ITS logo"
                className="h-full w-full object-contain"
              />
            </a>
            <div className="space-y-1 text-xs leading-relaxed text-[#CBD1DE]">
              <p className="font-semibold text-[#EDF3F7]">
                Booster K1 Humanoid Goalkeeper · Research internship adaptation
                for{' '}
                <a
                  href={PROJECT_LINKS.ichiroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#79D4F3] hover:underline"
                >
                  ICHIRO ITS
                </a>
                .
              </p>
              <p>
                Adapted from{' '}
                <em className="italic">
                  Humanoid Goalkeeper: Learning from Position Conditioned
                  Task-Motion Constraints
                </em>{' '}
                (Ren et al., 2025).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#CBD1DE]">
            <a
              href={PROJECT_LINKS.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#79D4F3]"
            >
              Booster K1 Repository
            </a>
            <a
              href={PROJECT_LINKS.upstreamPaperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#79D4F3]"
            >
              Original Paper (arXiv)
            </a>
            <a
              href={PROJECT_LINKS.upstreamRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#79D4F3]"
            >
              Original Implementation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
