import { Download, ExternalLink, FileText } from 'lucide-react';
import { REPORT_CONFIG } from '../data/evaluationMetrics';
import { PROJECT_LINKS } from '../data/regionVideos';

export function DetailedReport() {
  const hasPdf = Boolean(REPORT_CONFIG.pdfPath);

  return (
    <section
      id="report"
      className="border-b-2 border-[#535B85] bg-[#0B0E27] py-14 sm:py-20"
    >
      <div className="site-container">
        <div className="ichiro-gradient-research neubrutal-card flex flex-col justify-between gap-6 rounded-xl p-6 sm:p-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#EDF3F7]">
              Detailed Report
            </h2>
            <p className="mt-2 text-base leading-relaxed text-[#CBD1DE]">
              Explore the full methodology, simulation setup, reward design,
              policy evaluation, and experimental limitations.
            </p>
            {!hasPdf && (
              <p className="mt-2.5 text-xs text-[#BDE7F6]/90">
                The final internship report PDF is pending publication (reserved
                local path:{' '}
                <code className="rounded bg-[#0B0E27]/70 px-1.5 py-0.5 font-mono text-[11px] text-[#79D4F3]">
                  {REPORT_CONFIG.expectedPath}
                </code>
                ).
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            {hasPdf && REPORT_CONFIG.pdfPath ? (
              <a
                href={encodeURI(REPORT_CONFIG.pdfPath)}
                download={REPORT_CONFIG.downloadFilename}
                className="neubrutal-btn inline-flex items-center gap-2 rounded-lg bg-[#0999D2] px-4 py-2.5 text-sm font-semibold text-[#F4F2F6] transition-colors hover:bg-[#17ADE4]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Detailed Report
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border-2 border-[#C42876]/80 bg-[#0B0E27]/80 px-4 py-2.5 text-sm font-semibold text-[#CBD1DE] shadow-[3px_3px_0_#05060C]"
              >
                <FileText className="h-4 w-4 text-[#C42876]" aria-hidden="true" />
                Report PDF coming soon
              </button>
            )}

            <a
              href={PROJECT_LINKS.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neubrutal-btn inline-flex items-center gap-2 rounded-lg bg-[#122D53] px-4 py-2.5 text-sm font-semibold text-[#F4F2F6] transition-colors hover:border-[#17ADE4] hover:bg-[#1B3F64]"
            >
              View Source Code
              <ExternalLink className="h-4 w-4 text-[#79D4F3]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
