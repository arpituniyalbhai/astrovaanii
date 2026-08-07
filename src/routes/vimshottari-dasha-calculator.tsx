import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import dashaWheelImage from "@/assets/vimshottari-dasha-wheel.webp";
import { Reveal } from "@/components/landing/Reveal";

type GeoapifyFeature = {
  properties: {
    formatted: string;
    city?: string;
    state?: string;
    country?: string;
    lat: number;
    lon: number;
    timezone?: { offset_sec: number };
  };
};

type DashaPeriod = { planet: string; years: number; remaining: number; start: string; end: string };
type AntardashaPeriod = { mahadasha: string; planet: string; start: string; end: string };
type DashaResult = {
  success: boolean;
  name: string;
  moon: { longitude: number; sign: string; nakshatra: string; pada: number; lord: string };
  current: { mahadasha: { planet: string; start: string; end: string }; antardasha: { planet: string; start: string; end: string } };
  vimshottari: DashaPeriod[];
  antardashas: AntardashaPeriod[];
  ayanamsa: string;
  source: string;
  error?: string;
};

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || "d629479cf35f491ebfb531d15f16dbfc";

const planetStyles: Record<string, string> = {
  Ketu: "bg-stone-200 text-stone-700",
  Venus: "bg-rose-100 text-rose-700",
  Sun: "bg-amber-100 text-amber-800",
  Moon: "bg-sky-100 text-sky-700",
  Mars: "bg-red-100 text-red-700",
  Rahu: "bg-violet-100 text-violet-700",
  Jupiter: "bg-yellow-100 text-yellow-800",
  Saturn: "bg-slate-200 text-slate-700",
  Mercury: "bg-emerald-100 text-emerald-700",
};

const faqs = [
  { q: "What is Vimshottari Dasha?", a: "Vimshottari Dasha is the most widely used Vedic astrology timing system. It divides a 120-year cycle among nine planetary periods and uses the Moon's birth Nakshatra to determine the sequence active in your life." },
  { q: "How is my Vimshottari Dasha calculated?", a: "The calculator finds the Moon's exact sidereal longitude at your birth time, identifies its Nakshatra and the Nakshatra lord, then calculates the remaining balance of that lord's Mahadasha at birth." },
  { q: "Why do I need exact birth time and place?", a: "The Moon moves quickly. A precise birth time and selected birthplace improve the astronomical calculation and ensure the correct Nakshatra, Pada, timezone, and Dasha balance." },
  { q: "What are Mahadasha and Antardasha?", a: "Mahadasha is the main planetary period. Antardasha is the sub-period within it. Reading both together gives a more focused timing context." },
];

const dashaYears = [
  ["Ketu", "7 years"], ["Venus", "20 years"], ["Sun", "6 years"],
  ["Moon", "10 years"], ["Mars", "7 years"], ["Rahu", "18 years"],
  ["Jupiter", "16 years"], ["Saturn", "19 years"], ["Mercury", "17 years"],
];

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Vimshottari Dasha Calculator - AstroVaanii",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  url: "https://astrovaanii.in/vimshottari-dasha-calculator",
  description: "Calculate your Vimshottari Dasha, Mahadasha and Antardasha from your birth details with Swiss Ephemeris and Lahiri ayanamsa.",
  featureList: ["Swiss Ephemeris calculations", "Lahiri ayanamsa", "Moon Nakshatra and Pada", "Mahadasha timeline", "Current Antardasha"],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vimshottari Dasha Calculator: Mahadasha and Antardasha Guide",
  description: "Learn how Vimshottari Dasha is calculated from the Moon's Nakshatra, what Mahadasha and Antardasha mean, and how to use a Dasha timeline.",
  mainEntityOfPage: "https://astrovaanii.in/vimshottari-dasha-calculator",
  author: { "@type": "Organization", name: "AstroVaanii" },
  publisher: { "@type": "Organization", name: "AstroVaanii" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://astrovaanii.in/" },
    { "@type": "ListItem", position: 2, name: "Astrology Tools", item: "https://astrovaanii.in/tools" },
    { "@type": "ListItem", position: 3, name: "Vimshottari Dasha Calculator", item: "https://astrovaanii.in/vimshottari-dasha-calculator" },
  ],
};

export const Route = createFileRoute("/vimshottari-dasha-calculator")({
  head: () => ({
    meta: [
      { title: "Vimshottari Dasha Calculator: Mahadasha & Antardasha" },
      { name: "description", content: "Calculate your Vimshottari Dasha using birth date, time and place. Get current Mahadasha, Antardasha, Moon Nakshatra and complete Dasha timeline." },
      { property: "og:title", content: "Free Vimshottari Dasha Calculator - Mahadasha & Antardasha" },
      { property: "og:description", content: "Find your current Mahadasha and Antardasha with precise Swiss Ephemeris and Lahiri ayanamsa calculations." },
      { property: "og:url", content: "https://astrovaanii.in/vimshottari-dasha-calculator" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/social-sharing.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free Vimshottari Dasha Calculator - Mahadasha & Antardasha" },
      { name: "twitter:description", content: "Calculate your current Mahadasha and Antardasha from precise Vedic birth-chart calculations." },
      { name: "twitter:image", content: "/social-sharing.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/vimshottari-dasha-calculator" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(appJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(articleJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
    ],
  }),
  component: VimshottariDashaCalculator,
});

function VimshottariDashaCalculator() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState<GeoapifyFeature | null>(null);
  const [suggestions, setSuggestions] = useState<GeoapifyFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [status, setStatus] = useState<"form" | "loading" | "result">("form");
  const [error, setError] = useState("");
  const [result, setResult] = useState<DashaResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!location.trim() || place?.properties.formatted === location) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(location)}&apiKey=${GEOAPIFY_KEY}&limit=5`);
        const data = await response.json();
        setSuggestions(data.features || []);
        setShowSuggestions(Boolean(data.features?.length));
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [location, place]);

  const submit = async () => {
    if (!dob || !time || !location) {
      setError("Please enter your date of birth, birth time, and birthplace.");
      return;
    }
    if (!place) {
      setError("Please select your birthplace from the suggestions so we can use its coordinates and timezone.");
      return;
    }

    const [year, month, day] = dob.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    setError("");
    setStatus("loading");
    try {
      const response = await fetch("/api/vimshottari-dasha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          year,
          month,
          day,
          hour,
          minute,
          latitude: place.properties.lat,
          longitude: place.properties.lon,
          timezoneOffset: place.properties.timezone?.offset_sec != null ? place.properties.timezone.offset_sec / 3600 : undefined,
        }),
      });
      const data = await response.json() as DashaResult;
      if (!response.ok || !data.success) throw new Error(data.error || "Calculation failed");
      setResult(data);
      setStatus("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to calculate your Dasha timeline. Please try again.");
      setStatus("form");
    }
  };

  const currentAntardashas = result
    ? result.antardashas.filter((period) => period.mahadasha === result.current.mahadasha.planet && period.start >= result.current.mahadasha.start)
    : [];

  return (
    <main className="relative min-h-screen bg-background grain">
      <div className="orb -left-32 -top-24 h-[420px] w-[420px] bg-[color:var(--gold)]" />
      <div className="orb bottom-0 -right-24 h-[360px] w-[360px] bg-[color:var(--clay)] opacity-40" />
      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="AstroVaanii home">
          <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
        </Link>
        <Link to="/signup" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
          Ask Vaanii
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Free Vedic Astrology Tool</p>
            <h1 className="mt-4 font-display text-4xl text-foreground md:text-5xl">Vimshottari Dasha Calculator</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Find your current Mahadasha and Antardasha from your exact birth details, calculated with Swiss Ephemeris and Lahiri ayanamsa.</p>
          </div>
        </Reveal>

        {status === "form" && (
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-card/80 p-7 shadow-xl backdrop-blur-md md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Name <span className="text-muted-foreground">(optional)</span></span>
                  <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60" />
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Date of birth</span>
                  <input type="date" value={dob} max={new Date().toISOString().slice(0, 10)} onChange={(event) => setDob(event.target.value)} className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60" />
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Exact birth time</span>
                  <input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60" />
                </label>
                <label className="relative sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Birthplace</span>
                  <input
                    value={location}
                    onChange={(event) => { setLocation(event.target.value); setPlace(null); }}
                    onFocus={() => suggestions.length && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Start typing a city or town"
                    className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                  {showSuggestions && (
                    <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-border bg-card py-1 shadow-xl">
                      {suggestions.map((suggestion, index) => (
                        <button key={`${suggestion.properties.formatted}-${index}`} type="button" onMouseDown={() => { setPlace(suggestion); setLocation(suggestion.properties.formatted); setShowSuggestions(false); }} className="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-background/60">
                          <span className="block font-medium text-foreground">{suggestion.properties.formatted}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">Coordinates and timezone will be used for your calculation</span>
                        </button>
                      ))}
                    </div>
                  )}
                </label>
              </div>
              <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">Your birth place is used to set the exact latitude, longitude, and local timezone. This tool uses sidereal Moon positions with Lahiri ayanamsa.</p>
              {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
              <div className="mt-6 text-center">
                <button type="button" onClick={submit} className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90">Calculate My Dasha</button>
              </div>
            </div>
          </Reveal>
        )}

        {status === "loading" && <div className="flex flex-col items-center py-24"><div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" /><p className="mt-5 text-muted-foreground">Calculating your Moon Nakshatra and Dasha timeline...</p></div>}

        {status === "result" && result && (
          <Reveal delay={100}>
            <div className="mt-10 space-y-6">
              <section className="rounded-3xl border border-border bg-card/80 p-7 text-center shadow-xl backdrop-blur-md md:p-8">
                <p className="text-sm text-muted-foreground">{result.name} current Vimshottari period</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <DashaHighlight label="Mahadasha" planet={result.current.mahadasha.planet} start={result.current.mahadasha.start} end={result.current.mahadasha.end} />
                  <DashaHighlight label="Antardasha" planet={result.current.antardasha.planet} start={result.current.antardasha.start} end={result.current.antardasha.end} />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">Your Moon was in <strong className="text-foreground">{result.moon.nakshatra}</strong>, Pada {result.moon.pada}, in {result.moon.sign}. Its Nakshatra lord is {result.moon.lord}.</p>
              </section>

              <section className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-md md:p-8">
                <h2 className="font-display text-2xl text-foreground">Your Mahadasha Timeline</h2>
                <p className="mt-2 text-sm text-muted-foreground">The first period began before birth; its end date reflects the balance remaining when you were born.</p>
                <div className="mt-6 space-y-3">
                  {result.vimshottari.map((period) => <DashaRow key={`${period.planet}-${period.start}`} period={period} active={period.planet === result.current.mahadasha.planet} />)}
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-md md:p-8">
                <h2 className="font-display text-2xl text-foreground">{result.current.mahadasha.planet} Antardasha Timeline</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {currentAntardashas.map((period) => <AntardashaRow key={`${period.planet}-${period.start}`} period={period} active={period.planet === result.current.antardasha.planet} />)}
                </div>
              </section>

              <section className="rounded-3xl border border-primary/20 bg-primary/5 p-7 text-center md:p-8">
                <h2 className="font-display text-2xl text-foreground">Want to understand this period?</h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Ask Vaanii how your current {result.current.mahadasha.planet} Mahadasha and {result.current.antardasha.planet} Antardasha may relate to your chart, career, love, or next steps.</p>
                <Link to="/ai-astrologer" className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">Ask Vaanii About My Dasha</Link>
              </section>

              <div className="text-center"><button type="button" onClick={() => { setStatus("form"); setResult(null); }} className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Calculate Another Dasha</button></div>
            </div>
          </Reveal>
        )}
      </section>

      <DashaGuide />
      <ContextualLinks />
    </main>
  );
}

function DashaHighlight({ label, planet, start, end }: { label: string; planet: string; start: string; end: string }) {
  return <div className="rounded-2xl border border-border bg-background/60 p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p><p className="mt-2 font-display text-3xl text-primary">{planet}</p><p className="mt-2 text-sm text-muted-foreground">{formatDate(start)} to {formatDate(end)}</p></div>;
}

function DashaRow({ period, active }: { period: DashaPeriod; active: boolean }) {
  return <div className={`flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${active ? "border-primary/40 bg-primary/5" : "border-border bg-background/40"}`}><div className="flex items-center gap-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${planetStyles[period.planet]}`}>{period.planet}</span><span className="text-sm font-medium text-foreground">{period.years.toFixed(2)} years</span>{active && <span className="text-xs font-medium text-primary">Current</span>}</div><span className="text-sm text-muted-foreground">{formatDate(period.start)} to {formatDate(period.end)}</span></div>;
}

function AntardashaRow({ period, active }: { period: AntardashaPeriod; active: boolean }) {
  return <div className={`rounded-2xl border p-4 ${active ? "border-primary/40 bg-primary/5" : "border-border bg-background/40"}`}><div className="flex items-center justify-between gap-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${planetStyles[period.planet]}`}>{period.planet}</span>{active && <span className="text-xs font-medium text-primary">Current</span>}</div><p className="mt-3 text-sm text-muted-foreground">{formatDate(period.start)} to {formatDate(period.end)}</p></div>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

function DashaGuide() {
  return (
    <article className="relative z-10 mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-3xl border border-border bg-card/50 p-7 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Vimshottari Dasha Guide</p>
        <h2 className="mt-4 font-display text-3xl text-foreground">Understand the timing of important life periods</h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">A birth chart describes planetary positions at the moment of birth. Vimshottari Dasha adds a timing layer: it shows which planetary period is active now and which periods follow. This free Vimshottari Dasha calculator uses your date of birth, exact birth time, and birthplace to calculate your Mahadasha and Antardasha.</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">Use the timeline as a Vedic astrology framework for understanding phases connected with career, relationships, education, finances, family, travel, and personal growth. It is not a fixed prediction. The meaning of any Dasha depends on the planet's sign, house, strength, aspects, conjunctions, and the rest of your Kundli.</p>

        <figure className="mt-8 overflow-hidden rounded-3xl border border-border bg-background shadow-lg">
          <img
            src={dashaWheelImage}
            alt="Vimshottari Dasha celestial timing wheel with the Moon and nine planetary periods"
            width={1279}
            height={720}
            className="aspect-video w-full object-cover"
          />
          <figcaption className="px-5 py-3 text-center text-xs text-muted-foreground">The Vimshottari cycle follows nine planetary periods, beginning from the Moon's birth Nakshatra.</figcaption>
        </figure>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">What is Vimshottari Dasha?</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Vimshottari Dasha is one of the most widely used planetary-period systems in Vedic astrology. It follows a complete 120-year cycle shared among nine planetary rulers. The Moon's Nakshatra at birth determines the first Mahadasha and the remaining balance of that period.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {dashaYears.map(([planet, duration]) => <div key={planet} className="rounded-2xl border border-border bg-background/60 px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${planetStyles[planet]}`}>{planet}</span><p className="mt-2 text-sm text-muted-foreground">{duration}</p></div>)}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Ketu (7), Venus (20), Sun (6), Moon (10), Mars (7), Rahu (18), Jupiter (16), Saturn (19), and Mercury (17) together total 120 years.</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">How does this Vimshottari Dasha calculator work?</h2>
          <ol className="mt-4 space-y-3 text-muted-foreground">
            <li><strong className="text-foreground">1. Calculate the Moon's sidereal position.</strong> Swiss Ephemeris calculates the Moon at the exact birth time using the selected birthplace coordinates and timezone.</li>
            <li><strong className="text-foreground">2. Identify the birth Nakshatra.</strong> The sidereal zodiac is divided into 27 Nakshatras; each is ruled by one of the nine Vimshottari planets.</li>
            <li><strong className="text-foreground">3. Calculate the Dasha balance at birth.</strong> The Moon's position within its Nakshatra determines how much of the first Mahadasha was still remaining when you were born.</li>
            <li><strong className="text-foreground">4. Generate the timeline.</strong> The calculator displays the Mahadasha sequence, the current period, and the Antardasha active inside it.</li>
          </ol>
          <p className="mt-4 leading-relaxed text-muted-foreground">AstroVaanii applies Lahiri ayanamsa for the sidereal calculation. Selecting a birthplace from the suggestions provides the latitude, longitude, and local timezone needed for a consistent calculation.</p>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-foreground">What is Mahadasha?</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">Mahadasha is the main planetary period. It provides the broad timing context in which a planet's themes may become more prominent. For example, a Jupiter Mahadasha can bring attention to growth, learning, family, career opportunities, or spirituality, but the personal result depends on Jupiter's role in the full birth chart.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground">What is Antardasha?</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">Antardasha is the smaller sub-period within a Mahadasha. For example, Jupiter Mahadasha with Venus Antardasha combines both planets for a more specific period of analysis. Astrologers read the Mahadasha, Antardasha, chart houses, and transits together.</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">What is the difference between Mahadasha and Antardasha?</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Mahadasha is the main planetary period that sets the broader theme of a life phase. Antardasha is the smaller planetary period running within it. Both planets are considered together when interpreting timing in a birth chart.</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">Why accurate birth details matter</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Your date of birth establishes the day of the calculation. Your exact birth time helps place the Moon correctly within its Nakshatra. Your birthplace supplies the geographical coordinates and timezone. Small differences can change the Nakshatra, Pada, or the remaining balance of the first Dasha, especially when the Moon is close to a Nakshatra boundary.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">For the best result, use the time recorded on official documents or confirmed by family. If the birth time is uncertain, treat the Dasha timeline as an estimate and consult the complete chart before making important decisions.</p>
        </section>

        <aside className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <h2 className="font-display text-xl text-foreground">Calculation method</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Planetary positions are calculated using Swiss Ephemeris with Lahiri ayanamsa. Vimshottari Dasha begins from the Moon's birth Nakshatra and the remaining portion of that Nakshatra at birth.</p>
        </aside>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">Current Mahadasha and what you can learn</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Your current Mahadasha calculator result shows the active main period, its start and end date, and the current Antardasha. This helps you identify the relevant timing layer for a chart reading. You can then examine the ruling planets in your Kundli to explore topics such as career direction, business, relationships, marriage, education, financial responsibilities, travel, and spiritual development.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">No Dasha is universally good or bad. Two people can experience the same Saturn Mahadasha very differently because Saturn may occupy different signs and houses, rule different houses, or receive different aspects in each chart.</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">How to use the Vimshottari Dasha calculator</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Enter your birth date, exact birth time, and birthplace above, then select <strong className="text-foreground">Calculate My Dasha</strong>. Review your Moon Nakshatra, current Mahadasha, and Antardasha. For a more personal interpretation, compare the active planets with your complete <Link to="/free-kundli" className="text-primary underline underline-offset-4 hover:opacity-80">Kundli or birth chart</Link>, or ask <Link to="/ai-astrologer" className="text-primary underline underline-offset-4 hover:opacity-80">Vaanii, the AI astrologer</Link> about your Dasha period.</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">Frequently asked questions</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">{faqs.map((faq) => <div key={faq.q} className="rounded-2xl bg-background/60 p-5"><h3 className="font-display text-lg text-foreground">{faq.q}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p></div>)}</div>
        </section>
      </div>
    </article>
  );
}

function ContextualLinks() {
  const tools = [["/ai-astrologer", "Free AI Astrologer"], ["/free-kundli", "Kundli Generator"], ["/kundali-matching", "Kundali Matching"], ["/ai-astrology-website-free", "Free AI Astrology"], ["/tools", "All Astrology Tools"]];
  const guides = [["/blogs/what-is-lagna-in-astrology", "What Is Lagna?"], ["/blogs/what-is-ai-astrologer", "What Is an AI Astrologer?"], ["/blogs/how-ai-reads-your-birth-chart", "How AI Reads Your Birth Chart"], ["/ai-astrology-website-free", "Free AI Astrology Website"], ["/blogs/top-5-ai-astrology-platform-in-india", "Top AI Astrology Platforms"], ["/blogs/arpit-uniyal", "About Our Founder"], ["/blogs", "View All Blogs"]];
  return <section className="relative z-10 border-t border-border bg-card/40 py-14"><div className="mx-auto grid max-w-4xl gap-10 px-6 md:grid-cols-2"><LinkColumn title="Explore More Tools" links={tools} /><LinkColumn title="Read Astrology Guides" links={guides} /></div></section>;
}

function LinkColumn({ title, links }: { title: string; links: string[][] }) {
  return <div><h2 className="font-display text-2xl text-foreground">{title}</h2><div className="mt-4 flex flex-col gap-2.5">{links.map(([to, label]) => <Link key={to} to={to} className="text-sm text-muted-foreground transition-colors hover:text-primary">{label} &rarr;</Link>)}</div></div>;
}
