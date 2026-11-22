import { useEffect, useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { PROJECT_LINKS } from '../data/regionVideos';

const NAV_ITEMS = [
  { label: 'Demonstrations', href: '#demonstrations' },
  { label: 'Results', href: '#results' },
  { label: 'Report', href: '#report' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b-2 border-[#535B85] bg-[#061537]/95 backdrop-blur-sm">
      <div className="site-container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <a
            href={PROJECT_LINKS.ichiroUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ICHIRO ITS on Instagram"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-[#535B85] bg-white p-0.5 shadow-[2px_2px_0_#05060C] transition-colors hover:border-[#17ADE4]"
          >
            <img
              src="images/ichiro-logo.png"
              alt="ICHIRO ITS logo"
              className="h-full w-full object-contain"
            />
          </a>
          <a
            href="#top"
            className="flex flex-col leading-tight text-[#EDF3F7] transition-opacity hover:opacity-90 sm:flex-row sm:items-baseline sm:gap-2"
          >
            <span className="text-sm font-bold tracking-tight text-[#EDF3F7] sm:text-base">
              Humanoid Goalkeeper
            </span>
            <span className="text-xs font-semibold text-[#79D4F3]">
              Booster K1 · ICHIRO ITS
            </span>
          </a>
        </div>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 sm:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#CBD1DE] transition-colors hover:text-[#17ADE4]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={PROJECT_LINKS.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neubrutal-btn inline-flex items-center gap-1.5 rounded-lg bg-[#0999D2] px-3 py-1.5 text-xs font-semibold text-[#F4F2F6] transition-colors hover:bg-[#17ADE4]"
          >
            GitHub
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex items-center justify-center rounded-md border-2 border-[#535B85] bg-[#0E1149] p-1.5 text-[#F4F2F6] hover:border-[#17ADE4] sm:hidden"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t-2 border-[#535B85] bg-[#061537] px-4 py-3 sm:hidden"
        >
          <ul className="flex flex-col gap-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-1 text-sm font-medium text-[#CBD1DE] hover:text-[#17ADE4]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={PROJECT_LINKS.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-[#79D4F3] hover:text-[#17ADE4]"
              >
                GitHub
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
