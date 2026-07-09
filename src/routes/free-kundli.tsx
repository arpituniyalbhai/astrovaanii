import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { getChart } from "@/lib/chart-server";
import type { ChartData } from "@/lib/chart-calc";
import { Reveal } from "@/components/landing/Reveal";
import brandIcon from "@/assets/astrovaanii-logo.webp";

const faqs = [
  { q: "Is this Kundli generator completely free?", a: "Yes. You can generate your Kundli online without paying any fee. Simply enter your birth details and your birth chart will be created within seconds." },
  { q: "What details are required to create a Kundli?", a: "You need your date of birth, exact birth time, and birthplace. These details are required for accurate planetary calculations." },
  { q: "Can I create a Kundli if I do not know my birth time?", a: "Yes, but the results may not be completely accurate. House positions and the Ascendant depend on the exact birth time." },
  { q: "How accurate is the online Kundli?", a: "The accuracy depends on the birth information you provide. If your birth date, birth time, and birthplace are correct, the calculated Kundli accurately represents the planetary positions at your birth." },
  { q: "What is the difference between a Kundli and a horoscope?", a: "A Kundli is the birth chart created from your birth details. Horoscope predictions are prepared by interpreting the information contained in that birth chart." },
  { q: "Can I use this Kundli for marriage matching?", a: "Yes. Your birth chart is the basic requirement for Kundli matching and compatibility analysis before marriage." },
  { q: "Does this tool follow Vedic astrology?", a: "Yes. The Kundli is generated according to traditional Vedic astrology principles using the Swiss Ephemeris library with Lahiri Ayanamsa." },
  { q: "Can I generate a Kundli on my mobile phone?", a: "Yes. The tool works smoothly on mobile phones, tablets, laptops, and desktop computers." },
  { q: "Why is my birth time so important?", a: "Birth time determines your Ascendant and house placements. Even a small difference in time can change important parts of your horoscope." },
  { q: "Is my personal information safe?", a: "Your birth details are used only to generate your Kundli and are not stored on our servers." },
  { q: "Can I create Kundlis for my family members?", a: "Yes. You can generate separate Kundlis for your family members by entering their individual birth details." },
  { q: "What can I learn from my Kundli?", a: "Your Kundli provides insights into personality, career, education, marriage, finances, health, relationships, strengths, and life opportunities." },
  { q: "Does a Kundli predict the entire future?", a: "A Kundli shows planetary influences and life patterns. It offers guidance, but your decisions, efforts, and actions continue to play an important role in shaping your future." },
  { q: "Can beginners understand a Kundli?", a: "Yes. Even if you are new to astrology, generating your birth chart is a great first step. As you learn about planets, houses, and zodiac signs, reading your Kundli becomes much easier." },
  { q: "How often should I generate my Kundli?", a: "Your birth chart never changes because it is based on your birth details. You only need to generate it once, although you can revisit it whenever you want to understand different aspects of your life." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Kundli Generator",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  url: "https://astrovaanii.in/free-kundli",
};

export const Route = createFileRoute("/free-kundli")({
  head: () => ({
    meta: [
      { title: "Free Kundli Generator by Date of Birth and Time - AstroVaanii" },
      {
        name: "description",
        content:
          "Generate your free Janam Kundli online instantly. Enter your date of birth, time, and birthplace for an accurate Vedic birth chart using Swiss Ephemeris calculations.",
      },
      { property: "og:title", content: "Free Kundli Generator by Date of Birth and Time - AstroVaanii" },
      {
        property: "og:description",
        content:
          "Create your accurate Vedic Janam Kundli online in seconds. Enter your birth details for a complete North Indian style birth chart with planet positions and dasha.",
      },
      { property: "og:url", content: "https://astrovaanii.in/free-kundli" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/social-sharing.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free Kundli Generator by Date of Birth and Time - AstroVaanii" },
      { name: "twitter:description", content: "Generate your free Janam Kundli online instantly with accurate Vedic astrology calculations." },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/free-kundli" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(toolJsonLd) },
    ],
  }),
  component: FreeKundliPage,
});

const SIGN_GLYPHS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mars: "♂", Mercury: "☿",
  Jupiter: "♃", Venus: "♀", Saturn: "♄", Rahu: "☊", Ketu: "☋",
};

const PLANET_COLORS: Record<string, string> = {
  Sun: "text-amber-600", Moon: "text-slate-400", Mars: "text-red-500",
  Mercury: "text-green-600", Jupiter: "text-amber-500", Venus: "text-pink-400",
  Saturn: "text-indigo-500", Rahu: "text-purple-500", Ketu: "text-purple-400",
};

function FreeKundliPage() {
  const [step, setStep] = useState<"form" | "loading" | "result">("form");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [timezoneOffset, setTimezoneOffset] = useState<number | undefined>();
  const [gender, setGender] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [chart, setChart] = useState<ChartData | null>(null);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const fetchLocationSuggestions = async (query: string) => {
    if (!query.trim()) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=e6856ce2163d420dbae7d5adb0a104ec&limit=5`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setLocationSuggestions(data.results);
        setShowSuggestions(true);
      } else {
        setLocationSuggestions([]);
        setShowSuggestions(false);
      }
    } catch {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchLocationSuggestions(location), 300);
    return () => clearTimeout(timer);
  }, [location]);

  const selectSuggestion = (s: any) => {
    setLocation(s.formatted);
    setLatitude(s.geometry.lat);
    setLongitude(s.geometry.lng);
    const tz = s.annotations?.timezone?.offset_sec;
    setTimezoneOffset(tz != null ? tz / 3600 : undefined);
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };

  const handleLocationBlur = async () => {
    setTimeout(() => setShowSuggestions(false), 200);
    if (location && latitude === null) {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=e6856ce2163d420dbae7d5adb0a104ec&limit=1`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          const tz = data.results[0].annotations?.timezone?.offset_sec;
          setLatitude(lat);
          setLongitude(lng);
          setTimezoneOffset(tz != null ? tz / 3600 : undefined);
        }
      } catch {}
    }
  };

  const handleGenerate = async () => {
    if (!name || !dob || !time || !location || !gender) {
      setError("Please fill in all fields.");
      return;
    }
    if (latitude === null || longitude === null) {
      setError("Please select a valid location from the suggestions.");
      return;
    }
    setError("");
    setStep("loading");

    const [y, m, d] = dob.split("-").map(Number);
    const [h, min] = time.split(":").map(Number);

    const result = await getChart({
      data: {
        year: y,
        month: m,
        day: d,
        hour: h || 12,
        minute: min || 0,
        latitude,
        longitude,
        timezoneOffset,
      },
    });

    if (result.success) {
      setChart(result.chart);
      setStep("result");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      setError("Failed to generate chart. Please try again.");
      setStep("form");
    }
  };

  return (
    <main className="relative min-h-screen bg-background grain">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24" />
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40" />

      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2">
          <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
        </a>
        <a href="/signup" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Try Free AI - Astrologer</a>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <Reveal>
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              Free Kundli Generator<br />
              <span className="text-primary">by Date of Birth and Time</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Create Your Accurate Vedic Kundli Online in Seconds
            </p>
          </div>
        </Reveal>

        {step === "form" && (
          <Reveal delay={100}>
            <div className="mt-10 rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-8 max-w-lg mx-auto">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Time of Birth</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Birthplace</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setLatitude(null);
                      setLongitude(null);
                      setTimezoneOffset(undefined);
                    }}
                    onFocus={() => location && setShowSuggestions(true)}
                    onBlur={handleLocationBlur}
                    placeholder="Enter your city or place of birth"
                    className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                  {showSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-border bg-card shadow-xl max-h-60 overflow-y-auto z-20">
                      {locationSuggestions.map((s, i) => (
                        <button
                          key={i}
                          onMouseDown={() => selectSuggestion(s)}
                          className="w-full px-4 py-3 text-left text-sm hover:bg-background/50 transition-colors border-b border-border last:border-b-0"
                        >
                          <div className="font-medium text-foreground">{s.formatted}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {s.geometry.lat.toFixed(4)}°, {s.geometry.lng.toFixed(4)}°
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Gender</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`rounded-full border px-4 py-3 text-sm font-medium transition-colors ${
                          gender === g
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border bg-background/70 hover:bg-card hover:border-primary/60"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  onClick={handleGenerate}
                  className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
                >
                  Generate Your Kundli
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
            <p className="mt-6 text-muted-foreground">Calculating your birth chart using Swiss Ephemeris...</p>
          </div>
        )}

        {step === "result" && chart && (
          <div ref={resultRef} className="mt-10 space-y-10">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-6 md:p-8">
                <h2 className="font-display text-2xl text-primary text-center mb-6">
                  {name}'s Janam Kundli
                </h2>
                <p className="text-center text-sm text-muted-foreground mb-8">
                  Lahiri Ayanamsa · Whole Sign Houses · Swiss Ephemeris
                </p>

                <div className="flex justify-center">
                  <NorthIndianChart chart={chart} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ChartSummaryCard chart={chart} userName={name} />
            </Reveal>

            <Reveal delay={120}>
              <PlanetPositionsCard planets={chart.planets} />
            </Reveal>

            <Reveal delay={160}>
              <HouseOccupantsCard occupants={chart.houseOccupants} signNames={chart.houseSignNames} lords={chart.houseLords} />
            </Reveal>

            <Reveal delay={200}>
              <DashaCard dasha={chart.vimshottari} mahadasha={chart.mahadasha} antardasha={chart.antardasha} />
            </Reveal>

            <div className="text-center">
              <button
                onClick={() => {
                  setStep("form");
                  setChart(null);
                  setName("");
                  setDob("");
                  setTime("");
                  setLocation("");
                  setGender("");
                  setLatitude(null);
                  setLongitude(null);
                  setTimezoneOffset(undefined);
                }}
                className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
              >
                Generate Another Kundli
              </button>
            </div>
          </div>
        )}
      </section>

      <SeoContent />

      <footer className="border-t border-border bg-card/40 py-12 mt-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <img src={brandIcon} alt="" width={24} height={24} className="h-6 w-6" />
            <span className="font-display text-lg">AstroVaanii</span>
          </div>
          <p>&copy; {new Date().getFullYear()} AstroVaanii. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function NorthIndianChart({ chart }: { chart: ChartData }) {
  const planetsInHouse = (h: number): string[] => {
    const list: string[] = [];
    for (const [name, pd] of Object.entries(chart.planets)) {
      if (pd.house === h) list.push(name);
    }
    return list;
  };

  const houseLabelPos: Record<number, { x: number; y: number }> = {
    1: { x: 50, y: 23 },
    2: { x: 25, y: 8 },
    12: { x: 75, y: 8 },
    3: { x: 8, y: 25 },
    11: { x: 92, y: 25 },
    4: { x: 22, y: 50 },
    10: { x: 78, y: 50 },
    5: { x: 8, y: 75 },
    9: { x: 92, y: 75 },
    6: { x: 25, y: 92 },
    8: { x: 75, y: 92 },
    7: { x: 50, y: 77 },
  };

  const renderHouseContent = (houseNum: number) => {
    const signName = chart.houseSignNames[houseNum];
    const glyph = SIGN_GLYPHS[signName] || "";
    const planets = planetsInHouse(houseNum);
    const pos = houseLabelPos[houseNum];
    const isKendra = [1, 4, 7, 10].includes(houseNum);

    return (
      <div
        key={houseNum}
        className="absolute flex flex-col items-center justify-center text-center pointer-events-none"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
          width: isKendra ? "26%" : "20%",
        }}
      >
        <div className={`flex items-center gap-1 ${houseNum === 1 ? "text-primary" : "text-foreground"}`}>
          <span className="text-xs md:text-sm leading-none">{glyph}</span>
          <span className="text-[9px] md:text-[11px] font-medium leading-none">{signName}</span>
        </div>
        {planets.length > 0 && (
          <div className="mt-1 flex flex-wrap justify-center gap-x-1 gap-y-0.5">
            {planets.map((p) => (
              <span
                key={p}
                className={`text-[10px] md:text-xs font-semibold ${PLANET_COLORS[p] || ""}`}
                title={p}
              >
                {PLANET_SYMBOLS[p] || p.substring(0, 2)}
              </span>
            ))}
          </div>
        )}
        <span className="text-[8px] text-muted-foreground/50 leading-none mt-0.5">
          H{houseNum}
        </span>
      </div>
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-[420px] aspect-square">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <rect
          x="1" y="1" width="398" height="398"
          fill="none" stroke="currentColor" strokeWidth="2"
          className="text-border"
        />
        <polygon
          points="200,0 300,100 200,200 100,100"
          fill="currentColor"
          className="text-primary/10"
        />
        <line x1="0" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="1.5" className="text-border" />
        <line x1="400" y1="0" x2="0" y2="400" stroke="currentColor" strokeWidth="1.5" className="text-border" />
        <line x1="200" y1="0" x2="400" y2="200" stroke="currentColor" strokeWidth="1.5" className="text-border" />
        <line x1="400" y1="200" x2="200" y2="400" stroke="currentColor" strokeWidth="1.5" className="text-border" />
        <line x1="200" y1="400" x2="0" y2="200" stroke="currentColor" strokeWidth="1.5" className="text-border" />
        <line x1="0" y1="200" x2="200" y2="0" stroke="currentColor" strokeWidth="1.5" className="text-border" />
      </svg>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(renderHouseContent)}
    </div>
  );
}

function ChartSummaryCard({ chart, userName }: { chart: ChartData; userName: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8">
      <h2 className="font-display text-xl text-primary mb-4">Chart Summary</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <SummaryRow label="Name" value={userName} />
        <SummaryRow label="Ascendant (Lagna)" value={`${chart.ascendantSignName} ${chart.ascendantDegree.toFixed(2)}°`} />
        <SummaryRow label="Moon Sign" value={`${chart.planets["Moon"]?.signName || "-"} ${(chart.planets["Moon"]?.degree || 0).toFixed(2)}°`} />
        <SummaryRow label="Moon Nakshatra" value={`${chart.nakshatraName} ${chart.pada} Pada`} />
        <SummaryRow label="Nakshatra Lord" value={chart.nakshatraLord} />
        <SummaryRow label="Current Mahadasha" value={`${chart.mahadasha.planet} (${chart.mahadasha.start} - ${chart.mahadasha.end})`} />
        <SummaryRow label="Current Antardasha" value={`${chart.antardasha.planet} (${chart.antardasha.start} - ${chart.antardasha.end})`} />
        <SummaryRow label="Ayanamsa" value={chart.ayanamsa} />
        <SummaryRow label="House System" value={chart.houseSystem} />
      </dl>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/50 p-3">
      <dt className="text-xs text-muted-foreground mb-1">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

function PlanetPositionsCard({ planets }: { planets: Record<string, any> }) {
  return (
    <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8">
      <h2 className="font-display text-xl text-primary mb-4">Planet Positions</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60">
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Planet</th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Sign</th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Degree</th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">House</th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Nakshatra</th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Pada</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(planets).map(([name, p], i) => (
              <tr key={name} className={i % 2 === 0 ? "bg-background/30" : ""}>
                <td className="py-2 px-3 font-medium">
                  <span className={PLANET_COLORS[name] || ""}>
                    {PLANET_SYMBOLS[name] || ""} {name}
                  </span>
                </td>
                <td className="py-2 px-3">{p.signName} {SIGN_GLYPHS[p.signName] || ""}</td>
                <td className="py-2 px-3">{p.degree.toFixed(2)}°</td>
                <td className="py-2 px-3">{p.house}</td>
                <td className="py-2 px-3">{p.nakshatraName}</td>
                <td className="py-2 px-3">{p.pada}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HouseOccupantsCard({
  occupants,
  signNames,
  lords,
}: {
  occupants: Record<number, string[]>;
  signNames: Record<number, string>;
  lords: Record<number, string>;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8">
      <h2 className="font-display text-xl text-primary mb-4">House Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
          <div key={h} className="rounded-2xl border border-border/60 bg-background/50 p-3">
            <div className="font-medium text-foreground">
              House {h} {SIGN_GLYPHS[signNames[h]] || ""}
            </div>
            <div className="text-xs text-muted-foreground">{signNames[h]} · Lord {lords[h]}</div>
            <div className="mt-1.5 text-xs">
              {occupants[h]?.length ? (
                <span className="flex flex-wrap gap-1">
                  {occupants[h].map((p) => (
                    <span key={p} className={`${PLANET_COLORS[p] || ""}`}>
                      {PLANET_SYMBOLS[p] || ""} {p}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-muted-foreground/50">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashaCard({
  dasha,
  mahadasha,
  antardasha,
}: {
  dasha: { planet: string; years: number; remaining: number; start: string; end: string }[];
  mahadasha: { planet: string; start: string; end: string };
  antardasha: { planet: string; start: string; end: string };
}) {
  return (
    <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8">
      <h2 className="font-display text-xl text-primary mb-4">Vimshottari Dasha</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
          <div className="text-xs text-muted-foreground mb-1">Current Mahadasha</div>
          <div className="font-display text-lg text-primary">{mahadasha.planet}</div>
          <div className="text-xs text-muted-foreground mt-1">{mahadasha.start} - {mahadasha.end}</div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
          <div className="text-xs text-muted-foreground mb-1">Current Antardasha</div>
          <div className="font-display text-lg text-primary">{antardasha.planet}</div>
          <div className="text-xs text-muted-foreground mt-1">{antardasha.start} - {antardasha.end}</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60">
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Planet</th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Years</th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Start</th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">End</th>
            </tr>
          </thead>
          <tbody>
            {dasha.map((d, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-background/30" : ""}>
                <td className="py-2 px-3 font-medium">
                  <span className={PLANET_COLORS[d.planet] || ""}>{PLANET_SYMBOLS[d.planet] || ""} {d.planet}</span>
                </td>
                <td className="py-2 px-3">{d.years.toFixed(2)}</td>
                <td className="py-2 px-3">{d.start}</td>
                <td className="py-2 px-3">{d.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const seoContent = [
  {
    title: "What Is a Kundli?",
    content:
      "A Kundli, also known as Janam Kundli or Birth Chart, is a horoscope prepared according to the exact date, time, and place of birth. At the moment you are born, every planet occupies a unique position in the sky. These planetary positions are recorded inside the Kundli. Vedic astrology studies these placements to understand different areas of your life. Your Kundli contains twelve houses, twelve zodiac signs, and nine major planets. Every house represents a different part of life. Some houses are connected with career, while others represent marriage, family, education, wealth, spirituality, health, and relationships. Since every person's birth details are different, every Kundli is unique.",
  },
  {
    title: "Why Date of Birth and Birth Time Matter",
    content:
      "Many people think that entering only their date of birth is enough. While the date is important, your birth time plays an equally important role. The Ascendant, also called Lagna, changes approximately every two hours. A small difference in birth time can completely change your rising sign, house placements, planetary strengths, and future predictions. Birth place is also important because planetary calculations depend on your geographical location and local time zone. Providing accurate birth details allows the Kundli to be calculated correctly. The more accurate your birth information is, the more reliable your horoscope becomes.",
  },
  {
    title: "How Our Free Kundli Generator Works",
    content:
      "Our tool follows the traditional principles of Vedic astrology while making the entire process simple for everyone. You only need to enter a few details: your name, date of birth, exact birth time, and birthplace. After submitting these details, the calculator determines the planetary positions for your birth moment and prepares your Janam Kundli instantly. The process takes only a few seconds, and you receive a complete birth chart that can be used for further horoscope analysis. Everything is done automatically, so you do not need any astrology knowledge to generate your Kundli.",
  },
  {
    title: "What Information You Can Find in Your Kundli",
    content:
      "Your birth chart contains much more than your zodiac sign. The first thing you will notice is your Ascendant or Lagna. This represents your personality, physical appearance, natural behavior, and overall life direction. The planetary placements show how different energies influence your life. For example, the Moon reflects your emotions and mental nature. The Sun represents confidence and leadership. Jupiter is connected with wisdom, growth, education, and good fortune. Venus influences relationships, beauty, and creativity. Saturn teaches responsibility, patience, and discipline. Each planet affects different houses depending on its placement. The twelve houses together reveal important areas of life such as education, career, marriage, children, wealth, health, travel, property, spirituality, and long term goals.",
  },
  {
    title: "Benefits of Using an Online Kundli Generator",
    content:
      "Creating your Kundli online saves both time and effort. You no longer need to perform complex calculations manually or understand astronomical mathematics. Our free tool gives you instant access to your birth chart from anywhere in the world. It is available throughout the day, works on mobile as well as desktop devices, and provides results within seconds. Many people generate their Kundli before making important life decisions such as choosing a career, planning higher education, starting a business, buying property, or considering marriage. An online Kundli also makes it easier to revisit your horoscope whenever you want without carrying printed charts or documents.",
  },
  {
    title: "Is an Online Kundli Accurate?",
    content:
      "This is one of the most common questions people ask. The answer depends on the quality of the calculations and the accuracy of the birth details you provide. Our Kundli generator performs astronomical calculations based on traditional Vedic astrology methods. When your birth date, birth time, and birthplace are entered correctly, the generated Kundli accurately represents the planetary positions at your birth. It is important to understand that the Kundli itself is a calculation. Predictions come from interpreting those calculations. For this reason, accurate planetary positions always form the foundation of reliable horoscope analysis.",
  },
  {
    title: "Who Can Use This Kundli Generator?",
    content:
      "This tool is suitable for everyone. Students often use it to understand education and career possibilities. Working professionals use it to learn about career growth and future opportunities. Business owners explore financial trends and long term planning. People planning marriage frequently generate their Kundli before horoscope matching. Parents also create Kundlis for their children to understand personality traits and future guidance. Even if you are simply curious about astrology, generating your Janam Kundli is an excellent first step toward understanding how Vedic astrology works.",
  },
  {
    title: "How to Read Your Kundli",
    content:
      "Generating your Kundli is only the beginning. The next step is understanding what the chart says about you. The first thing to check is your Lagna or Ascendant. This is the foundation of your birth chart because it influences every house and many life events. Your Lagna reflects your personality, confidence, approach to life, and the way others see you. After that, look at the position of the Moon. In Vedic astrology, the Moon is considered one of the most important planets because it represents your mind, emotions, habits, and inner nature. A strong Moon often indicates emotional stability, while a weaker Moon may suggest that managing emotions requires extra attention.",
  },
  {
    title: "Understanding the Twelve Houses",
    content:
      "Every Kundli contains twelve houses, and each house governs a different area of life. The first house represents personality, appearance, health, and overall life direction. The second house is connected with family, speech, savings, and wealth. The third house relates to courage, communication, younger siblings, and skills. The fourth house represents home, mother, comfort, happiness, and property. The fifth house is associated with education, creativity, intelligence, romance, and children. The sixth house relates to work, competition, health, and daily responsibilities. The seventh house focuses on marriage, partnerships, and business relationships. The eighth house represents transformation, hidden matters, inheritance, and research. The ninth house is connected with luck, higher education, spirituality, teachers, and long distance travel. The tenth house represents career, profession, achievements, and public reputation. The eleventh house governs income, friendships, social circles, and future goals. The twelfth house relates to expenses, foreign travel, spiritual growth, meditation, and inner peace.",
  },
  {
    title: "How a Kundli Helps in Daily Life",
    content:
      "Many people think astrology is only about predicting the future, but a Kundli is much more than that. It helps you understand your natural strengths and areas where you may need improvement. Instead of making decisions based only on emotions, you gain another perspective about your life. Students often use their Kundli to understand learning patterns and career possibilities. Professionals use it to understand job changes, promotions, and business opportunities. Couples use it before marriage to understand compatibility and long term relationships. A Kundli should not replace your own decisions. It should be used as a guide that helps you understand yourself better.",
  },
  {
    title: "Common Mistakes While Creating a Kundli",
    content:
      "The biggest mistake people make is entering an incorrect birth time. Even a difference of a few minutes can change the Ascendant and house placements. This may affect the overall interpretation of the birth chart. Another common mistake is selecting the wrong birthplace. Since planetary calculations depend on geographical location, always choose the correct city where you were born. Some people accidentally enter their current location instead of their birth location. Always remember that a Kundli is created using your birthplace, not where you live today. Before generating your horoscope, carefully check every detail to make sure your birth date, birth time, and birthplace are correct.",
  },
  {
    title: "Why Choose Our Free Kundli Generator",
    content:
      "Our goal is to make Vedic astrology simple and accessible for everyone. The tool is designed to generate your Kundli quickly without requiring any technical knowledge. You do not need to understand astrology before using it. The interface is easy to use on both mobile phones and desktop devices. Your birth chart is generated within seconds after entering your details. Whether you are creating your first Kundli or checking your horoscope again after many years, the process remains simple and convenient. If you want to explore astrology further, your Kundli becomes the starting point for understanding planetary periods, personality, relationships, career, marriage, health, and many other aspects of life.",
  },
];

function SeoContent() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-16 space-y-12">
      <div className="space-y-10">
        {seoContent.map((section, i) => (
          <Reveal key={i} delay={i * 40}>
            <article>
              <h2 className="font-display text-2xl text-primary mb-3">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8 mt-12">
          <h2 className="font-display text-2xl text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-border/60 bg-background/50 p-4 open:shadow-sm">
                <summary className="cursor-pointer font-medium text-foreground list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}


