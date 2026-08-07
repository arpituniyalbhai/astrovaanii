import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { ChartData, PlanetData } from "@/lib/chart-calc";
import brandIcon from "@/assets/astrovaanii-logo.webp";

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

const SIGN_GLYPHS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const PLANET_ABBREVIATIONS: Record<string, string> = {
  Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
  Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};

type ProfileData = {
  dob?: string;
  timeOfBirth?: string;
  location?: string;
};

function MyChartPage() {
  const navigate = useNavigate();
  const [chart, setChart] = useState<ChartData | null>(null);
  const [userName, setUserName] = useState("User");
  const [profile, setProfile] = useState<ProfileData>({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userData") || "{}");
    setUserName(stored.name || "User");
    setProfile({
      dob: stored.dob,
      timeOfBirth: stored.timeOfBirth,
      location: stored.location,
    });
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

  const askVaanii = (question: string) => {
    navigate({ to: "/chat", search: { question } });
  };

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

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">Janam Kundli</p>
            <h1 className="font-display text-3xl text-foreground sm:text-4xl">{userName}'s Birth Chart</h1>
            <p className="mt-2 text-sm text-muted-foreground">North Indian chart · Lahiri Ayanamsa · Whole Sign Houses</p>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs text-primary">
            Calculated with Swiss Ephemeris
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-xl shadow-primary/5 backdrop-blur-md sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl text-foreground">Lagna Chart</h2>
                <p className="mt-1 text-xs text-muted-foreground">House 1 is the top diamond; houses continue anti-clockwise.</p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {chart.ascendantSignName} Lagna
              </span>
            </div>
            <NorthIndianChart chart={chart} />
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => askVaanii("Explain my birth chart, including my Lagna, Moon sign, Nakshatra, and the most important planetary placements.")}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Ask Vaanii about this chart
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <BirthDetailsCard userName={userName} profile={profile} />
            <ChartSummaryCard chart={chart} />
          </div>
        </div>

        <PlanetPositionsCard planets={chart.planets} onExplain={askVaanii} />
        <HouseOccupantsCard occupants={chart.houseOccupants} signNames={chart.houseSignNames} lords={chart.houseLords} />
        <DashaCard chart={chart} onExplain={askVaanii} />
      </section>
    </main>
  );
}

function NorthIndianChart({ chart }: { chart: ChartData }) {
  const positions: Record<number, { x: number; y: number; width: string }> = {
    1: { x: 50, y: 24, width: "28%" },
    2: { x: 25, y: 9, width: "21%" },
    3: { x: 9, y: 25, width: "18%" },
    4: { x: 23, y: 50, width: "25%" },
    5: { x: 9, y: 75, width: "18%" },
    6: { x: 25, y: 91, width: "21%" },
    7: { x: 50, y: 76, width: "28%" },
    8: { x: 75, y: 91, width: "21%" },
    9: { x: 91, y: 75, width: "18%" },
    10: { x: 77, y: 50, width: "25%" },
    11: { x: 91, y: 25, width: "18%" },
    12: { x: 75, y: 9, width: "21%" },
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-label={`North Indian birth chart for ${chart.ascendantSignName} ascendant`}>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-border" role="img">
        <title>North Indian style Vedic birth chart</title>
        <rect x="2" y="2" width="396" height="396" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
        <polygon points="200,2 300,101 200,200 100,101" fill="currentColor" className="text-primary/10" />
        <line x1="2" y1="2" x2="398" y2="398" stroke="currentColor" strokeWidth="1.5" />
        <line x1="398" y1="2" x2="2" y2="398" stroke="currentColor" strokeWidth="1.5" />
        <line x1="200" y1="2" x2="398" y2="200" stroke="currentColor" strokeWidth="1.5" />
        <line x1="398" y1="200" x2="200" y2="398" stroke="currentColor" strokeWidth="1.5" />
        <line x1="200" y1="398" x2="2" y2="200" stroke="currentColor" strokeWidth="1.5" />
        <line x1="2" y1="200" x2="200" y2="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {Array.from({ length: 12 }, (_, index) => index + 1).map((house) => {
        const position = positions[house];
        const signName = chart.houseSignNames[house];
        const planets = chart.houseOccupants[house] || [];

        return (
          <div
            key={house}
            className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
            style={{ left: `${position.x}%`, top: `${position.y}%`, width: position.width }}
          >
            <div className={`flex items-center justify-center gap-1 leading-none ${house === 1 ? "text-primary" : "text-foreground"}`}>
              <span className="text-sm sm:text-base">{SIGN_GLYPHS[signName]}</span>
              <span className="hidden text-[10px] font-semibold sm:inline">{signName}</span>
            </div>
            <div className="mt-1 flex flex-wrap justify-center gap-x-1.5 gap-y-0 text-[10px] font-bold text-foreground sm:text-xs">
              {planets.map((planet) => (
                <span key={planet} title={planet}>{PLANET_ABBREVIATIONS[planet] || planet.slice(0, 2)}</span>
              ))}
            </div>
            <span className="mt-0.5 text-[8px] font-medium text-muted-foreground sm:text-[9px]">
              {house === 1 ? "Lagna · H1" : `H${house}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function BirthDetailsCard({ userName, profile }: { userName: string; profile: ProfileData }) {
  return (
    <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-md">
      <h2 className="font-display text-lg text-foreground">Birth Details</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <Row label="Name" value={userName} />
        <Row label="Date of Birth" value={profile.dob || "Not available"} />
        <Row label="Time of Birth" value={profile.timeOfBirth || "Not available"} />
        <Row label="Birth Place" value={profile.location || "Not available"} />
      </dl>
    </div>
  );
}

function ChartSummaryCard({ chart }: { chart: ChartData }) {
  const moon = chart.planets.Moon;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-md">
      <h2 className="font-display text-lg mb-4 text-foreground">Astrology Summary</h2>
      <dl className="space-y-3 text-sm">
        <Row label="Ascendant (Lagna)" value={`${chart.ascendantSignName} ${formatDegree(chart.ascendantDegree)}`} />
        <Row label="Moon Sign (Rashi)" value={moon ? `${moon.signName} ${formatDegree(moon.degree)}` : "Not available"} />
        <Row label="Janma Nakshatra" value={`${chart.nakshatraName}, Pada ${chart.pada}`} />
        <Row label="Nakshatra Lord" value={chart.nakshatraLord} />
        <Row label="Current Mahadasha" value={chart.mahadasha.planet} />
        <Row label="Current Antardasha" value={chart.antardasha.planet} />
      </dl>
    </div>
  );
}

function PlanetPositionsCard({ planets, onExplain }: { planets: Record<string, PlanetData>; onExplain: (question: string) => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card/80">
      <div className="border-b border-border px-6 py-5">
        <h2 className="font-display text-xl text-foreground">Planetary Positions</h2>
        <p className="mt-1 text-xs text-muted-foreground">Sidereal positions at the time of birth</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-background/60 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-3 font-medium">Graha</th>
              <th className="px-4 py-3 font-medium">Rashi</th>
              <th className="px-4 py-3 font-medium">Degree</th>
              <th className="px-4 py-3 font-medium">Bhava</th>
              <th className="px-4 py-3 font-medium">Nakshatra</th>
              <th className="px-4 py-3 font-medium">Pada</th>
              <th className="px-4 py-3 font-medium">Ask Vaanii</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(planets).map(([name, planet]) => (
              <tr key={name} className="border-t border-border/60">
                <td className="px-6 py-3.5 font-semibold text-foreground">{name}</td>
                <td className="px-4 py-3.5 text-foreground">{SIGN_GLYPHS[planet.signName]} {planet.signName}</td>
                <td className="px-4 py-3.5 tabular-nums text-muted-foreground">{formatDegree(planet.degree)}</td>
                <td className="px-4 py-3.5 text-muted-foreground">House {planet.house}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{planet.nakshatraName}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{planet.pada}</td>
                <td className="px-4 py-3.5">
                  <button
                    type="button"
                    onClick={() => onExplain(`Explain what ${name} in ${planet.signName}, House ${planet.house}, means in my birth chart.`)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Explain {name}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium">House {h}</div>
              {h === 1 && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">Lagna</span>}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{SIGN_GLYPHS[signNames[h]]} {signNames[h]} · Lord {lords[h]}</div>
            <div className="mt-2 text-xs font-medium text-foreground">
              {occupants[h]?.length ? occupants[h].join(", ") : "No planets"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashaCard({ chart, onExplain }: { chart: ChartData; onExplain: (question: string) => void }) {
  return (
    <div className="rounded-3xl border border-border bg-card/80 p-6">
      <h2 className="font-display text-xl text-foreground">Vimshottari Dasha</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Current Mahadasha</div>
          <div className="mt-1 font-display text-xl text-primary">{chart.mahadasha.planet}</div>
          <div className="mt-1 text-xs text-muted-foreground">{formatDate(chart.mahadasha.start)} - {formatDate(chart.mahadasha.end)}</div>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Current Antardasha</div>
          <div className="mt-1 font-display text-xl text-primary">{chart.antardasha.planet}</div>
          <div className="mt-1 text-xs text-muted-foreground">{formatDate(chart.antardasha.start)} - {formatDate(chart.antardasha.end)}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onExplain(`Explain my ${chart.mahadasha.planet} Mahadasha and ${chart.antardasha.planet} Antardasha in my birth chart.`)}
        className="mt-5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
      >
        Ask Vaanii about this Dasha
      </button>
      <div className="mt-5 divide-y divide-border/60 text-sm">
        {chart.vimshottari.map((d, i) => (
          <div key={`${d.planet}-${i}`} className="grid grid-cols-[1fr_auto] items-center gap-4 py-3">
            <div>
              <span className="font-medium text-foreground">{d.planet}</span>
              <span className="ml-2 text-xs text-muted-foreground">{d.years.toFixed(2)} years</span>
            </div>
            <span className="text-right text-xs text-muted-foreground">
              {formatDate(d.start)} - {formatDate(d.end)}
            </span>
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

function formatDegree(value: number) {
  const degrees = Math.floor(value);
  const minutes = Math.floor((value - degrees) * 60);
  return `${degrees}° ${minutes.toString().padStart(2, "0")}'`;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
