import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { getChart } from "@/lib/chart-server";
import type { ChartData } from "@/lib/chart-calc";
import brandIcon from "@/assets/astrovaanii-logo.png";
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

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || "d629479cf35f491ebfb531d15f16dbfc";

const SANSKRIT_SIGNS: Record<string, { sanskrit: string; english: string; ruler: string; element: string; nature: string }> = {
  Aries: { sanskrit: "Mesha (मेष)", english: "Aries", ruler: "Mars", element: "Fire", nature: "Chara (Movable)" },
  Taurus: { sanskrit: "Vrishabha (वृषभ)", english: "Taurus", ruler: "Venus", element: "Earth", nature: "Sthira (Fixed)" },
  Gemini: { sanskrit: "Mithuna (मिथुन)", english: "Gemini", ruler: "Mercury", element: "Air", nature: "Dvisvabhava (Dual)" },
  Cancer: { sanskrit: "Karka (कर्क)", english: "Cancer", ruler: "Moon", element: "Water", nature: "Chara (Movable)" },
  Leo: { sanskrit: "Simha (सिंह)", english: "Leo", ruler: "Sun", element: "Fire", nature: "Sthira (Fixed)" },
  Virgo: { sanskrit: "Kanya (कन्या)", english: "Virgo", ruler: "Mercury", element: "Earth", nature: "Dvisvabhava (Dual)" },
  Libra: { sanskrit: "Tula (तुला)", english: "Libra", ruler: "Venus", element: "Air", nature: "Chara (Movable)" },
  Scorpio: { sanskrit: "Vrishchika (वृश्चिक)", english: "Scorpio", ruler: "Mars", element: "Water", nature: "Sthira (Fixed)" },
  Sagittarius: { sanskrit: "Dhanu (धनु)", english: "Sagittarius", ruler: "Jupiter", element: "Fire", nature: "Dvisvabhava (Dual)" },
  Capricorn: { sanskrit: "Makara (मकर)", english: "Capricorn", ruler: "Saturn", element: "Earth", nature: "Chara (Movable)" },
  Aquarius: { sanskrit: "Kumbha (कुम्भ)", english: "Aquarius", ruler: "Saturn", element: "Air", nature: "Sthira (Fixed)" },
  Pisces: { sanskrit: "Meena (मीन)", english: "Pisces", ruler: "Jupiter", element: "Water", nature: "Dvisvabhava (Dual)" },
};

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
  Sun: "text-amber-500 dark:text-amber-400",
  Moon: "text-sky-500 dark:text-sky-300",
  Mars: "text-red-500 dark:text-red-400",
  Mercury: "text-emerald-500 dark:text-emerald-400",
  Jupiter: "text-yellow-600 dark:text-yellow-400",
  Venus: "text-rose-500 dark:text-rose-300",
  Saturn: "text-indigo-400 dark:text-indigo-300",
  Rahu: "text-purple-500 dark:text-purple-400",
  Ketu: "text-stone-500 dark:text-stone-400",
};

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
  "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra",
  "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula",
  "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const NAKSHATRA_LORDS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
];

const LAGNA_SHORT_INSIGHTS: Record<string, {
  summary: string;
  yogakaraka: string;
  benefics: string;
  luckyColor: string;
  luckyGem: string;
}> = {
  Aries: {
    summary: "Dynamic, courageous, and direct initiative. Natural leadership driven by Mars.",
    yogakaraka: "Jupiter acts as prime dharma guide; Sun illuminates intelligence.",
    benefics: "Mars, Sun, Jupiter",
    luckyColor: "Crimson Red, Saffron",
    luckyGem: "Red Coral (Moonga)",
  },
  Taurus: {
    summary: "Grounded, patient, and commercially astute. Values stability and enduring growth.",
    yogakaraka: "Saturn (rules 9th Dharma & 10th Karma houses)",
    benefics: "Saturn, Mercury, Venus",
    luckyColor: "White, Emerald Green",
    luckyGem: "Diamond / White Sapphire",
  },
  Gemini: {
    summary: "Intellectually versatile, communicative, and inquisitive. Masters multi-disciplinary thinking.",
    yogakaraka: "Venus (rules 5th Trikona house of intellect and creativity)",
    benefics: "Venus, Mercury, Saturn",
    luckyColor: "Forest Green, Sky Blue",
    luckyGem: "Emerald (Panna)",
  },
  Cancer: {
    summary: "Empathetic, highly intuitive, and emotionally protective. Resolute inner resilience.",
    yogakaraka: "Mars (rules 5th Trikona and 10th Kendra houses)",
    benefics: "Mars, Jupiter, Moon",
    luckyColor: "Silvery White, Cream",
    luckyGem: "Natural Pearl (Moti)",
  },
  Leo: {
    summary: "Commanding, magnanimous, and honor-bound. Radiates natural executive authority.",
    yogakaraka: "Mars (rules 4th Kendra and 9th Trikona houses)",
    benefics: "Mars, Sun, Jupiter",
    luckyColor: "Golden Yellow, Royal Orange",
    luckyGem: "Ruby (Manikya)",
  },
  Virgo: {
    summary: "Methodical, analytical, and precision-oriented. Masters problem-solving and service.",
    yogakaraka: "Venus acts as prime benefic bringing grace and sustainable fortune.",
    benefics: "Venus, Mercury",
    luckyColor: "Olive Green, Soft Beige",
    luckyGem: "Emerald (Panna)",
  },
  Libra: {
    summary: "Diplomatic, aesthetic, and balanced strategist. Excels in partnerships and legal clarity.",
    yogakaraka: "Saturn (rules 4th Kendra and 5th Trikona houses)",
    benefics: "Saturn, Mercury, Venus",
    luckyColor: "Light Blue, Pure White",
    luckyGem: "Diamond / White Zircon",
  },
  Scorpio: {
    summary: "Intensely perceptive, transformative, and deeply resilient. Unwavering focus and willpower.",
    yogakaraka: "Sun and Moon form prime Raj Yoga placements.",
    benefics: "Jupiter, Sun, Moon",
    luckyColor: "Deep Maroon, Blood Red",
    luckyGem: "Red Coral (Moonga)",
  },
  Sagittarius: {
    summary: "Philosophical, optimistic, and righteous. Guided by high ethics and expanding wisdom.",
    yogakaraka: "Sun (9th Lord) and Mars (5th Lord)",
    benefics: "Sun, Mars, Jupiter",
    luckyColor: "Yellow, Saffron",
    luckyGem: "Yellow Sapphire (Pukhraj)",
  },
  Capricorn: {
    summary: "Pragmatic, disciplined, and enduring architect of long-term goals. Patient perseverance.",
    yogakaraka: "Venus (rules 5th Trikona and 10th Kendra houses)",
    benefics: "Venus, Mercury, Saturn",
    luckyColor: "Charcoal Gray, Navy Blue",
    luckyGem: "Blue Sapphire (Neelam)",
  },
  Aquarius: {
    summary: "Visionary, progressive, and egalitarian. Attuned to technological and humanitarian innovation.",
    yogakaraka: "Venus (rules 4th Kendra and 9th Trikona houses)",
    benefics: "Venus, Saturn",
    luckyColor: "Electric Blue, Violet",
    luckyGem: "Blue Sapphire (Neelam)",
  },
  Pisces: {
    summary: "Transcendent, compassionate, and creatively gifted. Deep spiritual and intuitive depth.",
    yogakaraka: "Mars acts as a key auspicious planet ruling 9th of grace and 2nd of wealth.",
    benefics: "Moon, Mars, Jupiter",
    luckyColor: "Golden Yellow, Seafoam Green",
    luckyGem: "Yellow Sapphire (Pukhraj)",
  },
};

const toolFaqs = [
  {
    q: "How does this Lagna Calculator calculate my rising sign?",
    a: "This calculator converts your local birth time to UTC, uses your birthplace coordinates to derive Local Sidereal Time (LST), and calculates the exact zodiac degree rising on the eastern horizon using high-precision Swiss Ephemeris algorithms and Lahiri (Chitra Paksha) Ayanamsa.",
  },
  {
    q: "Which birth details are required for accurate calculation?",
    a: "You need your exact calendar date of birth, precise birth time (to the minute), and birth city. Because the rising sign advances roughly 1 degree every 4 minutes and changes signs every 2 hours, accurate birth details ensure exact degree results.",
  },
  {
    q: "What if my exact birth time is unknown?",
    a: "If your birth time is uncertain within a few hours, enter your closest estimated time to see the nearest Lagna. However, for precise degree calculations, exact time is required. You can also explore our AI Prashna Kundli tool, which requires zero birth details.",
  },
  {
    q: "Why does this calculator use Swiss Ephemeris and Lahiri Ayanamsa?",
    a: "Swiss Ephemeris is the global astronomical benchmark for celestial calculation accuracy. Lahiri Ayanamsa accurately factors in the Earth's axial precession (~24 degrees), ensuring your calculated Lagna reflects real-sky sidereal constellations rather than tropical approximations.",
  },
  {
    q: "What information is included in the free Lagna calculation result?",
    a: "The tool reveals your exact Lagna sign, rising degree down to minutes and seconds, Lagna Lord (Lagnesh) placement house, Lagna Nakshatra, Pada, and an interactive North Indian Lagna Chart with all 12 houses and planetary placements.",
  },
  {
    q: "How is my Lagna Lord (Lagnesh) determined?",
    a: "The planet that rules your calculated rising sign is your Lagnesh (e.g., Mars for Aries/Scorpio, Venus for Taurus/Libra, Mercury for Gemini/Virgo). The calculator identifies where your Lagnesh is positioned across the 12 houses of your chart.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Lagna Calculator - Exact Vedic Ascendant Degree Online",
  url: "https://astrovaanii.in/lagna-calculator",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Calculate your exact Vedic Lagna (Ascendant) sign, precise degrees, and Lagnesh online with AstroVaanii's free Lagna calculator. Accurate Swiss Ephemeris calculations.",
  featureList: [
    "Swiss Ephemeris precision calculation",
    "Lahiri Ayanamsa sidereal calibration",
    "Exact Lagna degrees, minutes, and seconds",
    "Lagna Lord (Lagnesh) placement identifier",
    "Lagna Nakshatra and Pada computation",
    "Interactive North Indian Lagna chart visualizer",
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://astrovaanii.in/" },
    { "@type": "ListItem", position: 2, name: "Astrology Tools", item: "https://astrovaanii.in/tools" },
    { "@type": "ListItem", position: 3, name: "Free Lagna Calculator", item: "https://astrovaanii.in/lagna-calculator" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: toolFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export const Route = createFileRoute("/lagna-calculator")({
  head: () => ({
    meta: [
      { title: "Free Lagna Calculator: Exact Vedic Ascendant Degree Online" },
      {
        name: "description",
        content:
          "Calculate your exact Vedic Lagna (Ascendant) sign, precise degrees, and Lagnesh online with AstroVaanii's free Lagna calculator. Accurate Swiss Ephemeris calculations.",
      },
      {
        name: "keywords",
        content:
          "lagna calculator, free lagna calculator, calculate lagna online, lagnesh calculator, exact ascendant degree, vedic lagna calculator, rising degree online",
      },
      { property: "og:title", content: "Free Lagna Calculator: Exact Vedic Ascendant Degree Online" },
      {
        property: "og:description",
        content:
          "Calculate your exact Vedic Lagna sign, precise degrees, and Lagna Lord online with Swiss Ephemeris precision.",
      },
      { property: "og:url", content: "https://astrovaanii.in/lagna-calculator" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://astrovaanii.in/what-is-lagna-in-astrology.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free Lagna Calculator: Exact Vedic Ascendant Degree Online" },
      {
        name: "twitter:description",
        content:
          "Calculate your exact Vedic Lagna sign, precise degrees, and Lagna Lord online with Swiss Ephemeris precision.",
      },
      { name: "twitter:image", content: "https://astrovaanii.in/what-is-lagna-in-astrology.webp" },
    ],
    links: [
      { rel: "canonical", href: "https://astrovaanii.in/lagna-calculator" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(webAppJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: LagnaCalculatorPage,
});

function formatDegreeDMS(deg: number) {
  const d = Math.floor(deg);
  const mFloat = (deg - d) * 60;
  const m = Math.floor(mFloat);
  const s = Math.round((mFloat - m) * 60);
  return `${d}° ${m.toString().padStart(2, "0")}' ${s.toString().padStart(2, "0")}"`;
}

function LagnaCalculatorPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState<GeoapifyFeature | null>(null);
  const [suggestions, setSuggestions] = useState<GeoapifyFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [status, setStatus] = useState<"form" | "loading" | "result">("form");
  const [error, setError] = useState("");
  const [chart, setChart] = useState<ChartData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!location.trim() || place?.properties.formatted === location) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(location)}&apiKey=${GEOAPIFY_KEY}&limit=5`,
        );
        const data = await response.json();
        setSuggestions(data.features || []);
        setShowSuggestions(Boolean(data.features?.length));
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [location, place]);

  const submit = async () => {
    if (!dob || !time || !location) {
      setError("Please provide your date of birth, exact birth time, and birthplace.");
      return;
    }
    if (!place) {
      setError("Please select your birthplace from the dropdown to calculate exact coordinates.");
      return;
    }

    const [year, month, day] = dob.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    setError("");
    setStatus("loading");

    try {
      const response = await getChart({
        data: {
          year,
          month,
          day,
          hour,
          minute,
          latitude: place.properties.lat,
          longitude: place.properties.lon,
          timezoneOffset:
            place.properties.timezone?.offset_sec != null
              ? place.properties.timezone.offset_sec / 3600
              : undefined,
        },
      });

      if (!response.success || !response.chart) {
        throw new Error(response.error || "Unable to compute Lagna chart");
      }

      setChart(response.chart);
      setStatus("result");
      window.scrollTo({ top: 380, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed. Please verify your birth details.");
      setStatus("form");
    }
  };

  const ascSignName = chart?.ascendantSignName || "";
  const sanskritInfo = SANSKRIT_SIGNS[ascSignName] || {
    sanskrit: ascSignName,
    english: ascSignName,
    ruler: "Chart Ruler",
    element: "Vedic",
    nature: "Sidereal",
  };
  const shortInsight = LAGNA_SHORT_INSIGHTS[ascSignName];

  const ascLon = chart?.ascendant ?? 0;
  const lagnaNakIdx = Math.floor(ascLon / 13.3333333) % 27;
  const lagnaPada = Math.floor((ascLon % 13.3333333) / 3.3333333) + 1;
  const lagnaNakName = NAKSHATRAS[lagnaNakIdx] || "";
  const lagnaNakLord = NAKSHATRA_LORDS[lagnaNakIdx] || "";

  const lagneshName = chart?.houseLords[1] || "";
  const lagneshPlacement = chart?.planets[lagneshName];

  return (
    <main className="relative min-h-screen bg-background grain text-foreground">
      <div className="orb -left-32 -top-24 h-[440px] w-[440px] bg-[color:var(--gold)] opacity-70" />
      <div className="orb bottom-0 -right-24 h-[380px] w-[380px] bg-[color:var(--clay)] opacity-40" />

      {/* Header */}
      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="AstroVaanii home">
          <img src={brandIcon} alt="AstroVaanii Logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">
            Astro<span className="text-primary">Vaanii</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/tools"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            All Free Tools
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 shadow-sm"
          >
            Ask Vaanii
          </Link>
        </div>
      </header>

      {/* UPPER SECTION: Direct Chat with Vaani Callout Banner */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-4">
        <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg shadow">
              ✨
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Want immediate, personalized answers about your Lagna & birth chart?
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Chat with <strong>Vaanii</strong>, your AI Vedic Astrologer, completely free in 9 Indian languages.
              </p>
            </div>
          </div>
          <Link
            to="/signup"
            className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 shadow"
          >
            Chat with Vaanii &rarr;
          </Link>
        </div>
      </section>

      {/* Hero: TOOL INTENT ONLY */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-8 text-center">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Online Vedic Calculation Tool
            </p>
            <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl lg:text-6xl tracking-tight">
              Free Lagna Calculator
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
              Calculate your exact Vedic Ascendant sign, precise degrees, and Lagna Lord (Lagnesh) in seconds.
              Powered by <strong className="text-foreground">Swiss Ephemeris</strong> &amp;{" "}
              <strong className="text-foreground">Lahiri Ayanamsa</strong>.
            </p>
          </div>
        </Reveal>

        {/* CALCULATOR FORM: PLACED DIRECTLY AT TOP */}
        {status === "form" && (
          <Reveal delay={100}>
            <div className="mx-auto mt-6 max-w-2xl rounded-3xl border border-border bg-card/85 p-6 md:p-8 shadow-2xl backdrop-blur-md text-left">
              <h2 className="font-display text-lg text-foreground mb-1">Enter Your Birth Details for Calculation</h2>
              <p className="text-xs text-muted-foreground mb-5">
                Exact birth minute and city ensure astronomical accuracy down to degrees and seconds.
              </p>

              {error && (
                <div className="mb-4 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1 block text-xs font-medium text-foreground">
                    Name <span className="text-muted-foreground">(Optional)</span>
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-xs font-medium text-foreground">Date of Birth</span>
                  <input
                    type="date"
                    value={dob}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-xs font-medium text-foreground">
                    Exact Birth Time <span className="text-muted-foreground">(24h format)</span>
                  </span>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </label>

                <label className="relative sm:col-span-2">
                  <span className="mb-1 block text-xs font-medium text-foreground">
                    Birthplace (City / Town)
                  </span>
                  <input
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setPlace(null);
                    }}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Start typing your birth city (e.g., Delhi, Mumbai, London)"
                    className="w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  {showSuggestions && (
                    <div className="absolute z-30 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-border bg-card py-1 shadow-2xl">
                      {suggestions.map((s, idx) => (
                        <button
                          key={`${s.properties.formatted}-${idx}`}
                          type="button"
                          onMouseDown={() => {
                            setPlace(s);
                            setLocation(s.properties.formatted);
                            setShowSuggestions(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs transition hover:bg-background/80 border-b border-border/30 last:border-b-0"
                        >
                          <span className="block font-medium text-foreground">{s.properties.formatted}</span>
                          <span className="mt-0.5 block text-[10px] text-muted-foreground">
                            Lat: {s.properties.lat.toFixed(2)}, Lon: {s.properties.lon.toFixed(2)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </label>
              </div>

              <button
                type="button"
                onClick={submit}
                className="mt-6 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:opacity-95 hover:scale-[1.01]"
              >
                Calculate Lagna Sign &amp; Degree
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
                <span>🔒 100% Free &amp; Private</span>
                <span>⚡ Swiss Ephemeris Precision</span>
                <span>☸ Lahiri Ayanamsa</span>
              </div>
            </div>
          </Reveal>
        )}

        {status === "loading" && (
          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-border bg-card/80 p-8 text-center shadow-xl">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 font-display text-base text-foreground">Calculating Exact Ascendant Degrees...</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Processing ephemeris coordinates and Lahiri Ayanamsa...
            </p>
          </div>
        )}

        {/* RESULTS SECTION: DIRECTLY BELOW FORM */}
        {status === "result" && chart && (
          <div className="mx-auto mt-8 max-w-4xl text-left space-y-6">
            <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-card via-card/90 to-primary/10 p-6 md:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/60 pb-6">
                <div>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
                    {name ? `${name}'s Calculation Result` : "Your Calculation Result"}
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-3xl md:text-5xl font-display text-foreground">
                      {sanskritInfo.sanskrit}
                    </span>
                    <span className="text-3xl text-primary font-bold">
                      {SIGN_GLYPHS[ascSignName] || "♈"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Exact Rising Degree: <strong className="text-foreground">{formatDegreeDMS(chart.ascendantDegree)}</strong> in {ascSignName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-background/60 p-4 rounded-2xl border border-border/50">
                  <div>
                    <span className="text-muted-foreground block">Lagna Lord (Lagnesh):</span>
                    <strong className="text-foreground font-semibold text-sm">{lagneshName}</strong>
                    {lagneshPlacement && (
                      <span className="text-[11px] text-primary block">
                        placed in House {lagneshPlacement.house} ({lagneshPlacement.signName})
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Lagna Nakshatra:</span>
                    <strong className="text-foreground font-semibold text-sm">{lagnaNakName}</strong>
                    <span className="text-[11px] text-muted-foreground block">
                      Pada {lagnaPada} • Lord: {lagnaNakLord}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Element:</span>
                    <strong className="text-foreground font-semibold">{sanskritInfo.element}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Modality:</span>
                    <strong className="text-foreground font-semibold">{sanskritInfo.nature}</strong>
                  </div>
                </div>
              </div>

              {/* Short Tailored Insight for THIS Lagna only */}
              {shortInsight && (
                <div className="mt-6 rounded-2xl border border-border/80 bg-background/70 p-4 space-y-2 text-xs">
                  <p className="font-semibold text-foreground text-sm">
                    {ascSignName} Ascendant Summary
                  </p>
                  <p className="text-muted-foreground leading-relaxed">{shortInsight.summary}</p>
                  <div className="grid gap-2 sm:grid-cols-3 pt-1 text-[11px]">
                    <div>
                      <span className="text-muted-foreground block">Yogakaraka:</span>
                      <strong className="text-primary">{shortInsight.yogakaraka}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Functional Benefics:</span>
                      <strong className="text-foreground">{shortInsight.benefics}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Auspicious Color &amp; Gem:</span>
                      <strong className="text-foreground">{shortInsight.luckyColor} • {shortInsight.luckyGem}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Ask Vaanii Interactive Integration Callout */}
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-sm md:text-base text-foreground font-semibold">
                    Have specific questions about your {ascSignName} Lagna?
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Ask Vaanii about career timings, relationship dynamics, or current planetary transits.
                  </p>
                </div>
                <Link
                  to="/signup"
                  className="whitespace-nowrap rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-95 shadow-md"
                >
                  Ask Vaanii AI Now
                </Link>
              </div>

              {/* Recalculate button */}
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStatus("form");
                    setChart(null);
                  }}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  &larr; Calculate Another Birth Details
                </button>
              </div>
            </div>

            {/* North Indian Lagna Chart Visualizer */}
            <div className="rounded-3xl border border-border bg-card/80 p-6 md:p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="font-display text-xl text-foreground">
                  Your Calculated North Indian Lagna Chart (D1)
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                  House 1 is the upper central diamond, anchored by your {ascSignName} Lagna. Numbers indicate the sequential house positions.
                </p>
              </div>

              <NorthIndianLagnaChart chart={chart} />

              {/* Planetary Placements Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-background/80 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
                    <tr>
                      <th className="py-2.5 px-3">Planet</th>
                      <th className="py-2.5 px-3">Sign</th>
                      <th className="py-2.5 px-3">Degrees</th>
                      <th className="py-2.5 px-3">House from Lagna</th>
                      <th className="py-2.5 px-3">Nakshatra (Pada)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {Object.entries(chart.planets).map(([pName, pData]) => (
                      <tr key={pName} className="hover:bg-accent/20 transition-colors">
                        <td className="py-2 px-3 font-semibold text-foreground flex items-center gap-1.5">
                          <span className={PLANET_COLORS[pName] || ""}>{PLANET_SYMBOLS[pName] || "●"}</span>
                          {pName}
                        </td>
                        <td className="py-2 px-3">{pData.signName}</td>
                        <td className="py-2 px-3 font-mono text-[11px]">{formatDegreeDMS(pData.degree)}</td>
                        <td className="py-2 px-3">
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-medium">
                            House {pData.house}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-muted-foreground">
                          {pData.nakshatraName} ({pData.pada})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CLEAN TOOL-FOCUSED CONTENT (No definition essays, no cannibalization) */}
      <section className="relative z-10 border-t border-border bg-card/40 py-12">
        <div className="mx-auto max-w-4xl px-6 text-muted-foreground space-y-8 text-sm">
          
          {/* Clean 2-line bridge to blog (Anchor text: 'Lagna complete guide') */}
          <div className="rounded-2xl border border-border bg-background/60 p-5 leading-relaxed">
            <p className="text-foreground font-medium">
              Lagna represents the rising zodiac sign ascending on the eastern horizon at your exact birth moment, anchoring House 1 of your Vedic birth chart.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              For in-depth theoretical explanations, classical history, and house meanings, explore our{" "}
              <Link to="/blogs/what-is-lagna-in-astrology" className="text-primary font-semibold underline underline-offset-4 hover:opacity-85">
                Lagna complete guide
              </Link>.
            </p>
          </div>

          {/* How This Calculator Works */}
          <div className="space-y-3">
            <h2 className="font-display text-xl text-foreground font-semibold">
              How This Lagna Calculator Works
            </h2>
            <p className="leading-relaxed text-xs sm:text-sm">
              Calculating a Vedic Ascendant requires astronomical precision. This tool executes the following process:
            </p>
            <div className="grid gap-3 sm:grid-cols-3 text-xs pt-1">
              <div className="rounded-xl border border-border bg-background/50 p-3.5 space-y-1">
                <strong className="text-foreground block font-semibold">1. Coordinate Lookup</strong>
                <p className="text-muted-foreground">
                  Translates your birth city into exact latitude, longitude, and timezone offset to establish the true Universal Time (UTC).
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-3.5 space-y-1">
                <strong className="text-foreground block font-semibold">2. Swiss Ephemeris Math</strong>
                <p className="text-muted-foreground">
                  Computes Local Sidereal Time (LST) and calculates the exact degree rising on the eastern horizon at that minute.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-3.5 space-y-1">
                <strong className="text-foreground block font-semibold">3. Lahiri Ayanamsa</strong>
                <p className="text-muted-foreground">
                  Applies the Chitra Paksha (Lahiri) calibration to reflect real-sky sidereal constellations rather than tropical projections.
                </p>
              </div>
            </div>
          </div>

          {/* Understanding Your Calculation Output */}
          <div className="space-y-3">
            <h2 className="font-display text-xl text-foreground font-semibold">
              Understanding Your Lagna Calculation Output
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-border bg-background/50 p-4 space-y-1">
                <strong className="text-foreground font-semibold block">Rising Sign &amp; Degree:</strong>
                <p className="text-muted-foreground">
                  Shows your First House sign and the exact degree (0° to 30°) within that sign.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-4 space-y-1">
                <strong className="text-foreground font-semibold block">Lagnesh (Lagna Lord):</strong>
                <p className="text-muted-foreground">
                  The ruler planet of your rising sign. Its placed house indicates where your primary life drive concentrates.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-4 space-y-1">
                <strong className="text-foreground font-semibold block">Lagna Nakshatra &amp; Pada:</strong>
                <p className="text-muted-foreground">
                  The specific 13°20&apos; lunar constellation and 3°20&apos; quarter (Pada 1–4) rising at your birth moment.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-4 space-y-1">
                <strong className="text-foreground font-semibold block">North Indian Chart (D1):</strong>
                <p className="text-muted-foreground">
                  Full diamond chart placing your Lagna in House 1, with all other houses and planets mapped sequentially.
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools Links */}
          <div className="rounded-2xl border border-border bg-background/50 p-5 space-y-3">
            <h3 className="font-display text-base text-foreground font-semibold">
              Explore More Free Vedic Astrology Tools
            </h3>
            <p className="text-xs text-muted-foreground">
              Continue analyzing your horoscope with our suite of free Swiss Ephemeris tools:
            </p>
            <div className="flex flex-wrap gap-3 text-xs pt-1">
              <Link to="/free-kundli" className="rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground hover:border-primary/40 transition">
                Free Kundli Generator &rarr;
              </Link>
              <Link to="/vimshottari-dasha-calculator" className="rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground hover:border-primary/40 transition">
                Vimshottari Dasha Calculator &rarr;
              </Link>
              <Link to="/kundali-matching" className="rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground hover:border-primary/40 transition">
                Kundali Matching &rarr;
              </Link>
              <Link to="/tools" className="rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground hover:border-primary/40 transition">
                View All Tools &rarr;
              </Link>
            </div>
          </div>

          {/* Tool-Focused FAQs Accordion */}
          <div className="space-y-4 pt-4">
            <h2 className="font-display text-xl text-foreground font-semibold">
              Lagna Calculator FAQs
            </h2>
            <div className="space-y-2.5">
              {toolFaqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-card/70 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground hover:bg-accent/30 transition-colors text-xs sm:text-sm"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span className="text-primary font-bold ml-2 shrink-0">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-2.5">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM SECTION CTA: Prominent Signup / Free Chat Callout */}
      <section className="relative z-10 border-t border-border bg-gradient-to-b from-card/60 via-card to-background py-14 px-6">
        <div className="mx-auto max-w-4xl text-center rounded-3xl border border-primary/30 bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent p-8 md:p-10 shadow-2xl space-y-4">
          <span className="rounded-full bg-primary/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary inline-block">
            100% Free AI Astrologer
          </span>
          <h2 className="font-display text-2xl md:text-4xl text-foreground">
            Hey, Chat with Vaanii for Completely Free Now!
          </h2>
          <p className="mx-auto max-w-xl text-xs md:text-sm text-muted-foreground leading-relaxed">
            Have questions about your rising sign, career prospects, love life, or upcoming Mahadasha?
            Vaanii analyzes your precise Swiss Ephemeris birth chart and gives you deep, authentic Vedic answers instantly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              to="/signup"
              className="rounded-full bg-primary px-7 py-3 text-xs md:text-sm font-semibold text-primary-foreground shadow-xl transition-transform hover:scale-105 hover:opacity-95"
            >
              Start Free Chat with Vaanii &rarr;
            </Link>
            <Link
              to="/ai-astrologer"
              className="rounded-full border border-border bg-card/80 px-5 py-3 text-xs md:text-sm font-semibold text-foreground hover:bg-background transition-colors"
            >
              Learn More About Vaanii
            </Link>
          </div>
          <p className="text-[11px] text-muted-foreground pt-1">
            No credit card required • Instant access in 9 Indian languages • 100% Confidential
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/40 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={brandIcon} alt="" width={24} height={24} className="h-6 w-6" />
            <span className="font-display text-base text-foreground">AstroVaanii</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/tools" className="hover:text-foreground">All Tools</Link>
            <Link to="/free-kundli" className="hover:text-foreground">Free Kundli</Link>
            <Link to="/lagna-calculator" className="text-primary font-medium">Lagna Calculator</Link>
            <Link to="/vimshottari-dasha-calculator" className="hover:text-foreground">Dasha Calculator</Link>
            <Link to="/blogs" className="hover:text-foreground">Astrology Blogs</Link>
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} AstroVaanii. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

// North Indian Lagna Chart Visualizer Component
function NorthIndianLagnaChart({ chart }: { chart: ChartData }) {
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
        <div className={`flex items-center gap-1 ${houseNum === 1 ? "text-primary font-bold" : "text-foreground"}`}>
          <span className="text-xs md:text-sm leading-none">{glyph}</span>
          <span className="text-[10px] md:text-xs font-medium leading-none">{signName}</span>
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
        <span className="text-[9px] text-muted-foreground/60 leading-none mt-0.5">
          {houseNum === 1 ? "Lagna (H1)" : `H${houseNum}`}
        </span>
      </div>
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-[400px] aspect-square">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <rect
          x="1" y="1" width="398" height="398"
          fill="none" stroke="currentColor" strokeWidth="2"
          className="text-border"
        />
        {/* Diamond 1 (Lagna) highlight */}
        <polygon
          points="200,0 300,100 200,200 100,100"
          fill="currentColor"
          className="text-primary/15"
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
