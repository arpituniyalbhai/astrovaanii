import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, CalendarDays, Download, MapPin, Sparkles, UserRound } from "lucide-react";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import reportCover from "@/assets/report-result-cover.webp";
import personalArtwork from "@/assets/report-result-personal.webp";
import relationshipArtwork from "@/assets/report-result-relationship.webp";
import wealthArtwork from "@/assets/report-result-wealth.webp";
import roadmapArtwork from "@/assets/report-result-roadmap.webp";

export const Route = createFileRoute("/report-result")({
  head: () => ({
    meta: [
      { title: "Your Report — AstroVaanii" },
      {
        name: "description",
        content: "Your personalized AstroVaanii insight report.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReportResultPage,
});

type ReportSection = {
  heading: string;
  content: string;
};

type GeneratedReportResult = {
  reportType: "personal" | "relationship" | "wealth";
  generatedAt: string;
  currentDate: string;
  sourceData: {
    primary_user: Record<string, unknown>;
    astrology_engine_data: Record<string, unknown> | null;
    partner: Record<string, unknown> | null;
  };
  report: {
    title: string;
    subtitle: string;
    sections: ReportSection[];
  };
};

const reportLabels = {
  personal: "Personal Report",
  relationship: "Relationship Report",
  wealth: "Wealth Report",
} as const;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function displayValue(value: unknown, fallback = "Not provided") {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function ReportResultPage() {
  const [result, setResult] = useState<GeneratedReportResult | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("astrovaanii_generated_report");
    if (saved) {
      try {
        setResult(JSON.parse(saved));
      } catch {
        sessionStorage.removeItem("astrovaanii_generated_report");
      }
    }
    setHasLoaded(true);
  }, []);

  const downloadPdf = () => {
    if (!result) return;
    const previousTitle = document.title;
    document.title = `${result.report.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}.pdf`;
    window.print();
    window.setTimeout(() => {
      document.title = previousTitle;
    }, 500);
  };

  if (!hasLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center text-sm text-muted-foreground">Preparing your report...</div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 grain">
        <div className="orb -left-24 -top-24 h-80 w-80 bg-[color:var(--gold)]" />
        <div className="relative z-10 max-w-md rounded-3xl border border-border bg-card/85 p-8 text-center shadow-xl backdrop-blur-md">
          <Sparkles className="mx-auto text-primary" size={30} />
          <h1 className="mt-4 font-display text-3xl text-foreground">No report found</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Choose a report first, then generate it from your saved astrology profile.
          </p>
          <Link
            to="/reports"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            View reports
          </Link>
        </div>
      </main>
    );
  }

  const profile = asRecord(result.sourceData.primary_user);
  const chart = asRecord(result.sourceData.astrology_engine_data);
  const moon = asRecord(asRecord(chart.planets).Moon);
  const mahadasha = asRecord(chart.mahadasha);
  const antardasha = asRecord(chart.antardasha);

  return (
    <main className="min-h-screen bg-background print:bg-white">
      <header className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/reports" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Back to reports</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={brandIcon} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-lg text-foreground">
              Astro<span className="text-primary">Vaanii</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={downloadPdf}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/15 hover:opacity-90"
          >
            <Download size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </header>

      <article id="report-document" className="report-document mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
        <section className="report-cover relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
          <img
            src={reportCover}
            alt="Open astrology report at sunrise"
            className="h-[28rem] w-full object-cover sm:h-[34rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-12">
            <div className="mb-4 inline-flex rounded-full border border-white/25 bg-black/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
              {reportLabels[result.reportType]}
            </div>
            <h1 className="max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
              {result.report.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
              {result.report.subtitle}
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/70">
              Prepared for {displayValue(profile.name, "You")} · {result.currentDate}
            </p>
          </div>
        </section>

        <section className="report-section mt-8 rounded-3xl border border-border bg-card/85 p-6 shadow-lg shadow-primary/5 sm:p-8">
          <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Source profile
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground">Your data & chart</h2>
            </div>
            <p className="text-xs text-muted-foreground">Generated on {result.currentDate}</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DataItem icon={<UserRound size={17} />} label="Name" value={displayValue(profile.name)} />
            <DataItem
              icon={<CalendarDays size={17} />}
              label="Date of birth"
              value={displayValue(profile.dob)}
            />
            <DataItem
              icon={<MapPin size={17} />}
              label="Birth place"
              value={displayValue(profile.location)}
            />
            <DataItem label="Birth time" value={displayValue(profile.timeOfBirth)} />
            <DataItem label="Ascendant" value={displayValue(chart.ascendantSignName)} />
            <DataItem label="Moon sign" value={displayValue(moon.signName)} />
            <DataItem
              label="Nakshatra"
              value={`${displayValue(chart.nakshatraName)}${chart.pada ? ` · Pada ${chart.pada}` : ""}`}
            />
            <DataItem label="Mahadasha" value={displayValue(mahadasha.planet)} />
            <DataItem label="Antardasha" value={displayValue(antardasha.planet)} />
          </div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">
            This report interprets the astrology-engine values shown above. It does not recalculate or
            replace your saved chart.
          </p>
        </section>

        <ReportArtwork
          src={
            result.reportType === "relationship"
              ? relationshipArtwork
              : result.reportType === "wealth"
                ? wealthArtwork
                : personalArtwork
          }
          alt={`${reportLabels[result.reportType]} watercolor illustration`}
          caption="Your report combines your chart themes with practical, real-life interpretation."
        />

        <div className="mt-8 space-y-8">
          {result.report.sections.map((section, index) => (
            <div key={`${section.heading}-${index}`}>
              <section className="report-section rounded-3xl border border-border bg-card/90 p-6 shadow-lg shadow-primary/5 sm:p-10">
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground sm:h-12 sm:w-12">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
                      {section.heading}
                    </h2>
                    <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                      {section.content
                        .split(/\n+/)
                        .filter(Boolean)
                        .map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ))}
                    </div>
                  </div>
                </div>
              </section>

              {index === 1 && (
                <ReportArtwork
                  src={personalArtwork}
                  alt="Watercolor illustration of reflection and personal insight"
                  caption="Self-awareness turns patterns into choices."
                />
              )}
              {index === 3 && (
                <ReportArtwork
                  src={relationshipArtwork}
                  alt="Watercolor illustration of thoughtful communication and connection"
                  caption="Clear communication gives insight a practical place in daily life."
                />
              )}
              {index === 5 && (
                <ReportArtwork
                  src={wealthArtwork}
                  alt="Watercolor illustration of steady growth and opportunity"
                  caption="Sustainable growth is built through aligned decisions and repeatable habits."
                />
              )}
              {index === 6 && (
                <ReportArtwork
                  src={roadmapArtwork}
                  alt="Watercolor illustration of an actionable life roadmap"
                  caption="Your clearest next steps begin with the patterns you can act on now."
                />
              )}
            </div>
          ))}
        </div>

        <footer className="report-section mt-8 rounded-3xl bg-primary px-6 py-8 text-center text-primary-foreground sm:px-10">
          <Sparkles className="mx-auto" size={24} />
          <h2 className="mt-3 font-display text-2xl">Your report, ready whenever you need clarity</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-primary-foreground/80">
            Revisit these insights as your priorities evolve, and use the practical actions as a guide
            for your next decisions.
          </p>
        </footer>
      </article>
    </main>
  );
}

function DataItem({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/55 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-primary">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function ReportArtwork({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="report-artwork mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-primary/5">
      <img src={src} alt={alt} className="aspect-[3/2] w-full object-cover" />
      <figcaption className="px-5 py-4 text-center text-xs italic text-muted-foreground sm:text-sm">
        {caption}
      </figcaption>
    </figure>
  );
}
