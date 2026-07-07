import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { ChartData } from "@/lib/chart-calc";
import brandIcon from "@/assets/startalks-icon.png";

export const Route = createFileRoute("/my-chart")({
  head: () => ({
    meta: [
      { title: "My Chart — AstroVaanii" },
      { name: "description", content: "Your Vedic birth chart" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyChartPage,
});

function MyChartPage() {
  const navigate = useNavigate();
  const [chart, setChart] = useState<ChartData | null>(null);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userData") || "{}");
    setUserName(stored.name || "User");
    if (stored.chart) setChart(stored.chart);
  }, []);

  if (!chart) {
    return (
      <main className="min-h-screen bg-background grain flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl text-primary mb-4">Chart Not Found</h1>
          <p className="text-muted-foreground mb-6">Complete your profile to generate your birth chart.</p>
          <Link to="/onboarding" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
            Complete Profile
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background grain">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={brandIcon} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
          </Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">← Dashboard</Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        <div>
          <h1 className="font-display text-3xl text-primary">{userName}'s Birth Chart</h1>
          <p className="text-sm text-muted-foreground mt-1">Lahiri Ayanamsa · Whole Sign Houses · Swiss Ephemeris</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartSummaryCard chart={chart} />
          <PlanetPositionsCard planets={chart.planets} />
        </div>

        <HouseOccupantsCard occupants={chart.houseOccupants} signNames={chart.houseSignNames} lords={chart.houseLords} />
        <DashaCard dasha={chart.vimshottari} />
      </section>
    </main>
  );
}

function ChartSummaryCard({ chart }: { chart: ChartData }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h2 className="font-display text-lg mb-4">Chart Summary</h2>
      <dl className="space-y-3 text-sm">
        <Row label="Ascendant" value={`${chart.ascendantSignName} ${chart.ascendantDegree.toFixed(2)}°`} />
        <Row label="Moon Nakshatra" value={`${chart.nakshatraName} ${chart.pada} Pada`} />
        <Row label="Nakshatra Lord" value={chart.nakshatraLord} />
        <Row label="Mahadasha" value={`${chart.mahadasha.planet}`} />
        <Row label="Ayanamsa" value={chart.ayanamsa} />
        <Row label="House System" value={chart.houseSystem} />
      </dl>
    </div>
  );
}

function PlanetPositionsCard({ planets }: { planets: Record<string, any> }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h2 className="font-display text-lg mb-4">Planet Positions</h2>
      <div className="space-y-2 text-sm">
        {Object.entries(planets).map(([name, p]) => (
          <div key={name} className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0">
            <span className="font-medium">{name}</span>
            <span className="text-muted-foreground">
              {p.signName} {p.degree.toFixed(2)}° · House {p.house} · {p.nakshatraName} {p.pada}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HouseOccupantsCard({ occupants, signNames, lords }: {
  occupants: Record<number, string[]>;
  signNames: Record<number, string>;
  lords: Record<number, string>;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h2 className="font-display text-lg mb-4">House Occupants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
          <div key={h} className="rounded-2xl border border-border/60 bg-background/50 p-3">
            <div className="font-medium">House {h}</div>
            <div className="text-xs text-muted-foreground">{signNames[h]} · Lord {lords[h]}</div>
            <div className="mt-1 text-xs">
              {occupants[h]?.length ? occupants[h].join(", ") : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashaCard({ dasha }: { dasha: { planet: string; years: number; remaining: number }[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h2 className="font-display text-lg mb-4">Vimshottari Dasha</h2>
      <div className="space-y-2 text-sm">
        {dasha.map((d, i) => (
          <div key={i} className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0">
            <span className="font-medium">{d.planet}</span>
            <span className="text-muted-foreground">{d.years.toFixed(2)} years</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
