import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { getChart } from "@/lib/chart-server";
import type { ChartData } from "@/lib/chart-calc";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import { Reveal } from "@/components/landing/Reveal";

type GeoapifyFeature = {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
    timezone?: { offset_sec: number };
  };
};

type KaalSarpResult = {
  present: boolean;
  formation?: "Rahu to Ketu" | "Ketu to Rahu";
  type?: string;
  rahuHouse: number;
  ketuHouse: number;
  planetsBetween: string[];
};

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
const sevenPlanets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
const kaalSarpTypes: Record<number, string> = {
  1: "Anant",
  2: "Kulik",
  3: "Vasuki",
  4: "Shankhpal",
  5: "Padma",
  6: "Mahapadma",
  7: "Takshak",
  8: "Karkotak",
  9: "Shankhchud",
  10: "Ghatak",
  11: "Vishdhar",
  12: "Sheshnag",
};

const faqs = [
  {
    q: "Which Kaal Sarp Dosh is most dangerous?",
    a: "No Kaal Sarp formation should be labelled universally dangerous. Traditional names describe the houses occupied by Rahu and Ketu, but a meaningful reading requires the full birth chart, including planetary strength, aspects, conjunctions, dashas, and transits. A calculator can identify the geometry. It cannot determine a fixed outcome for a person.",
  },
  {
    q: "What are the symptoms of Kaal Sarp Dosh?",
    a: "Astrology does not provide a reliable list of medical or life symptoms for this formation. Some traditions associate it with periods of uncertainty or inner pressure, while others place little emphasis on it. Use the result as a prompt to understand your whole chart, not as a diagnosis or prediction.",
  },
  {
    q: "How does this Kaal Sarp Dosha calculator work?",
    a: "The calculator uses your birth date, time, and selected birthplace to calculate sidereal longitudes with Swiss Ephemeris and Lahiri ayanamsa. It checks whether the Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn all fall in one half of the zodiac between Rahu and Ketu.",
  },
  {
    q: "What are the effects of Kaal Sarp Dosha?",
    a: "There is no single effect. In Vedic astrology, a formation is interpreted with the houses involved, the condition of Rahu and Ketu, the Ascendant, the Moon, and the active Dasha. People with similar node placements can have very different lives and choices.",
  },
  {
    q: "Is Kaal Sarp Dosha different for females?",
    a: "The mathematical formation is calculated in the same way for every person. Responsible interpretation should not assign fear or restrictive predictions based on gender. The full chart and the person’s real circumstances matter more than one named combination.",
  },
  {
    q: "Is Kaal Sarp Dosha Puja necessary?",
    a: "Puja is a personal spiritual choice, not a mathematical requirement of the calculator. If a ritual is meaningful to you, speak with a trusted priest or practitioner and choose it without fear or pressure. Practical decisions about health, money, work, or relationships should rely on appropriate professional advice.",
  },
  {
    q: "How can Kaal Sarp Dosha be removed permanently?",
    a: "A birth chart is a record of the sky at birth, so its planetary placements do not change. Different traditions suggest prayers, charity, mindfulness, or rituals as personal practices. No calculator can promise to remove a chart pattern or guarantee a particular result.",
  },
  {
    q: "Is Kaal Sarp Dosha good or bad?",
    a: "It is neither automatically good nor bad. It is a traditional label for a specific nodal arrangement. A balanced reading looks at the entire chart and treats astrology as a reflective framework rather than a verdict.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kaal Sarp Dosha Calculator",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  url: "https://astrovaanii.in/kaal-sarp-dosha-calculator",
  description:
    "Check for a Kaal Sarp Dosha formation in your Vedic birth chart using Swiss Ephemeris calculations and Lahiri ayanamsa.",
  featureList: [
    "Swiss Ephemeris calculations",
    "Lahiri ayanamsa",
    "Rahu and Ketu axis analysis",
    "Kaal Sarp type by house",
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Kaal Sarp Dosha Calculator and Complete Guide",
  description:
    "Learn how Kaal Sarp Dosha is identified from Rahu, Ketu, and the seven classical planets in a Vedic birth chart.",
  mainEntityOfPage: "https://astrovaanii.in/kaal-sarp-dosha-calculator",
  author: { "@type": "Organization", name: "AstroVaanii" },
  publisher: { "@type": "Organization", name: "AstroVaanii" },
  datePublished: "2026-08-15",
};

export const Route = createFileRoute("/kaal-sarp-dosha-calculator")({
  head: () => ({
    meta: [
      { title: "Kaal Sarp Dosha Calculator | Check Kaal Sarp Yog Online" },
      {
        name: "description",
        content:
          "Use this free Kaal Sarp Dosha calculator to check your Vedic birth chart with Swiss Ephemeris and Lahiri ayanamsa. Enter birth date, exact time, and birthplace.",
      },
      { property: "og:title", content: "Free Kaal Sarp Dosha Calculator | AstroVaanii" },
      { property: "og:site_name", content: "AstroVaanii" },
      { property: "og:locale", content: "en_IN" },
      {
        property: "og:description",
        content:
          "Check whether a Kaal Sarp formation is present in your Vedic birth chart using precise Swiss Ephemeris calculations.",
      },
      { property: "og:url", content: "https://astrovaanii.in/kaal-sarp-dosha-calculator" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://astrovaanii.in/social-sharing.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free Kaal Sarp Dosha Calculator | AstroVaanii" },
      {
        name: "twitter:description",
        content: "Check your Rahu and Ketu axis with Swiss Ephemeris calculations.",
      },
      { name: "twitter:image", content: "https://astrovaanii.in/social-sharing.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/kaal-sarp-dosha-calculator" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(appJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(articleJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: KaalSarpDoshaCalculator,
});

function KaalSarpDoshaCalculator() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState<GeoapifyFeature | null>(null);
  const [suggestions, setSuggestions] = useState<GeoapifyFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [status, setStatus] = useState<"form" | "loading" | "result">("form");
  const [error, setError] = useState("");
  const [result, setResult] = useState<KaalSarpResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!GEOAPIFY_KEY) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

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
    if (!GEOAPIFY_KEY) {
      setError("Location search is temporarily unavailable. Please try again later.");
      return;
    }

    if (!dob || !time || !location) {
      setError("Please enter your date of birth, birth time, and birthplace.");
      return;
    }
    if (!place) {
      setError(
        "Please select your birthplace from the suggestions so the correct coordinates and timezone can be used.",
      );
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
      if (!response.success)
        throw new Error(response.error || "Unable to calculate your birth chart.");

      setResult(checkKaalSarp(response.chart));
      setStatus("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to calculate your chart. Please try again.",
      );
      setStatus("form");
    }
  };

  return (
    <main className="relative min-h-screen bg-background grain">
      <div className="orb -left-32 -top-24 h-[420px] w-[420px] bg-[color:var(--gold)]" />
      <div className="orb bottom-0 -right-24 h-[360px] w-[360px] bg-[color:var(--clay)] opacity-40" />
      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="AstroVaanii home">
          <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">
            Astro<span className="text-primary">Vaanii</span>
          </span>
        </Link>
        <Link
          to="/signup"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Ask Vaanii
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Free Vedic Astrology Tool
            </p>
            <h1 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
              Kaal Sarp Dosha Calculator
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Check whether the seven classical planets fall within the Rahu and Ketu axis in your
              birth chart, calculated with Swiss Ephemeris and Lahiri ayanamsa.
            </p>
          </div>
        </Reveal>

        {status === "form" && (
          <CalculatorForm
            name={name}
            dob={dob}
            time={time}
            location={location}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            error={error}
            onName={setName}
            onDob={setDob}
            onTime={setTime}
            onLocation={(value) => {
              setLocation(value);
              setPlace(null);
            }}
            onFocus={() => suggestions.length && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onSelect={(suggestion) => {
              setPlace(suggestion);
              setLocation(suggestion.properties.formatted);
              setShowSuggestions(false);
            }}
            onSubmit={submit}
          />
        )}

        {status === "loading" && (
          <div className="flex flex-col items-center py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
            <p className="mt-5 text-muted-foreground">
              Calculating your sidereal birth chart and Rahu Ketu axis...
            </p>
          </div>
        )}

        {status === "result" && result && (
          <ResultCard
            name={name || "Your"}
            result={result}
            onReset={() => {
              setStatus("form");
              setResult(null);
            }}
          />
        )}
      </section>

      <KaalSarpGuide />
      <ContextualLinks />
    </main>
  );
}

function CalculatorForm({
  name,
  dob,
  time,
  location,
  suggestions,
  showSuggestions,
  error,
  onName,
  onDob,
  onTime,
  onLocation,
  onFocus,
  onBlur,
  onSelect,
  onSubmit,
}: {
  name: string;
  dob: string;
  time: string;
  location: string;
  suggestions: GeoapifyFeature[];
  showSuggestions: boolean;
  error: string;
  onName: (value: string) => void;
  onDob: (value: string) => void;
  onTime: (value: string) => void;
  onLocation: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: (suggestion: GeoapifyFeature) => void;
  onSubmit: () => void;
}) {
  return (
    <Reveal delay={100}>
      <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-card/80 p-7 shadow-xl backdrop-blur-md md:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Name <span className="text-muted-foreground">(optional)</span>
            </span>
            <input
              value={name}
              onChange={(event) => onName(event.target.value)}
              placeholder="Your name"
              className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
            />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-foreground">Date of birth</span>
            <input
              type="date"
              value={dob}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(event) => onDob(event.target.value)}
              className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
            />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Exact birth time
            </span>
            <input
              type="time"
              value={time}
              onChange={(event) => onTime(event.target.value)}
              className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
            />
          </label>
          <label className="relative sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Birthplace</span>
            <input
              value={location}
              onChange={(event) => onLocation(event.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Start typing a city or town"
              className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
            />
            {showSuggestions && (
              <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-border bg-card py-1 shadow-xl">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.properties.formatted}-${index}`}
                    type="button"
                    onMouseDown={() => onSelect(suggestion)}
                    className="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-background/60"
                  >
                    <span className="block font-medium text-foreground">
                      {suggestion.properties.formatted}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      Coordinates and timezone will be used for your calculation
                    </span>
                  </button>
                ))}
              </div>
            )}
          </label>
        </div>
        <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
          Your birthplace sets the exact latitude, longitude, and local timezone for the sidereal
          calculation. Your details are used only for this result.
        </p>
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
          >
            Check My Kaal Sarp Dosha
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function ResultCard({
  name,
  result,
  onReset,
}: {
  name: string;
  result: KaalSarpResult;
  onReset: () => void;
}) {
  return (
    <Reveal delay={100}>
      <div className="mt-10 space-y-6">
        <section className="rounded-3xl border border-border bg-card/80 p-7 text-center shadow-xl backdrop-blur-md md:p-8">
          <p className="text-sm text-muted-foreground">{name} Kaal Sarp Dosha result</p>
          <div
            className={`mx-auto mt-5 max-w-2xl rounded-2xl border p-6 ${result.present ? "border-primary/40 bg-primary/5" : "border-border bg-background/60"}`}
          >
            <p className="font-display text-3xl text-foreground">
              {result.present
                ? "Kaal Sarp formation indicated"
                : "No complete Kaal Sarp formation indicated"}
            </p>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
              {result.present
                ? "All seven classical planets fall on one side of the Rahu Ketu axis in this sidereal chart. This is a traditional chart pattern, not a prediction or a judgement about your life."
                : "The seven classical planets do not all fall within the same half of the zodiac between Rahu and Ketu. A full chart reading can still explore the nodes and their houses in context."}
            </p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <ResultDetail label="Rahu house" value={`${result.rahuHouse} house`} />
            <ResultDetail label="Ketu house" value={`${result.ketuHouse} house`} />
            {result.present && (
              <>
                <ResultDetail label="Formation" value={result.formation!} />
                <ResultDetail label="Traditional type" value={`${result.type} Kaal Sarp`} />
              </>
            )}
          </div>
        </section>
        {result.present && (
          <section className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-md md:p-8">
            <h2 className="font-display text-2xl text-foreground">
              How this result was identified
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The calculator found the Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn within
              the arc from {result.formation}. The traditional type is based on Rahu in the{" "}
              {result.rahuHouse} house and Ketu in the {result.ketuHouse} house. Planetary positions
              on or very near the nodal boundary are treated carefully, because exact birth time can
              matter.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {result.planetsBetween.map((planet) => (
                <span
                  key={planet}
                  className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {planet}
                </span>
              ))}
            </div>
          </section>
        )}
        <section className="rounded-3xl border border-primary/20 bg-primary/5 p-7 text-center md:p-8">
          <h2 className="font-display text-2xl text-foreground">Want a complete chart reading?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A named combination is only one part of a Kundli. Ask Vaanii to interpret Rahu, Ketu,
            your houses, Dasha, and the rest of your chart together.
          </p>
          <Link
            to="/ai-astrologer"
            className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Ask Vaanii About My Chart
          </Link>
        </section>
        <div className="text-center">
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Check Another Birth Chart
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function ResultDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl text-primary">{value}</p>
    </div>
  );
}

function checkKaalSarp(chart: ChartData): KaalSarpResult {
  const rahu = chart.planets.Rahu;
  const ketu = chart.planets.Ketu;
  const positions = sevenPlanets.map((planet) => chart.planets[planet]);
  const fromRahu = positions.every(
    (planet) => arcDistance(rahu.longitude, planet.longitude) <= 180.0001,
  );
  const fromKetu = positions.every(
    (planet) => arcDistance(ketu.longitude, planet.longitude) <= 180.0001,
  );
  const present = fromRahu || fromKetu;
  const formation = fromRahu ? "Rahu to Ketu" : fromKetu ? "Ketu to Rahu" : undefined;
  return {
    present,
    formation,
    type: present ? kaalSarpTypes[rahu.house] : undefined,
    rahuHouse: rahu.house,
    ketuHouse: ketu.house,
    planetsBetween: positions.map((planet) => planet.name),
  };
}

function arcDistance(start: number, point: number) {
  return (point - start + 360) % 360;
}

function ordinal(value: number) {
  const remainder = value % 100;
  if (remainder >= 11 && remainder <= 13) return "th";
  return ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[value % 10] || "th";
}

function KaalSarpGuide() {
  return (
    <article className="relative z-10 mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-3xl border border-border bg-card/50 p-7 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Kaal Sarp Dosha Guide
        </p>
        <h2 className="mt-4 font-display text-3xl text-foreground">What is Kaal Sarp Dosha?</h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Kaal Sarp Dosha, also written as Kaal Sarp Dosh or Kaal Sarp Yog, is a traditional name
          for a particular arrangement of the lunar nodes, Rahu and Ketu, and the seven classical
          planets. It is often discussed with great anxiety. A better starting point is to
          understand what the calculation actually checks and what it cannot say on its own.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          This page checks a precise geometric condition. It does not tell you that your life will
          be good or bad, and it does not replace a complete chart reading. In Vedic astrology, the
          meaning of a placement depends on the whole Kundli, the active Dasha, transits, personal
          choices, and real circumstances.
        </p>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">
            How Kaal Sarp Dosha is calculated
          </h2>
          <ol className="mt-4 space-y-3 text-muted-foreground">
            <li>
              <strong className="text-foreground">1. Calculate the sidereal birth chart.</strong>{" "}
              Swiss Ephemeris calculates planetary longitudes using your exact birth time, selected
              birthplace coordinates, and Lahiri ayanamsa.
            </li>
            <li>
              <strong className="text-foreground">2. Locate Rahu and Ketu.</strong> Rahu and Ketu
              are always opposite each other and create two arcs of 180 degrees.
            </li>
            <li>
              <strong className="text-foreground">3. Check the seven classical planets.</strong> The
              calculator checks the Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn.
            </li>
            <li>
              <strong className="text-foreground">4. Identify the formation.</strong> If every one
              of these planets falls inside one nodal arc, the calculator reports a Kaal Sarp
              formation and names the traditional type from Rahu’s house.
            </li>
          </ol>
        </section>
        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-foreground">
              Why exact birth details matter
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The birth place supplies latitude, longitude, and timezone. The time of birth is
              especially important when a planet is close to Rahu or Ketu. A small time difference
              can change whether a boundary condition is present.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground">What the result can tell you</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The result tells you whether this one geometric condition is present and which houses
              contain Rahu and Ketu. It is a useful starting point for further study, not a
              conclusion about career, marriage, health, or wellbeing.
            </p>
          </div>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">
            Do all planets need to be between Rahu and Ketu?
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            For the complete formation used by this calculator, all seven classical planets must be
            on one side of the Rahu and Ketu axis. If even one of these planets lies outside that
            arc, the page does not report a complete Kaal Sarp formation. Different astrologers use
            different rules for planets sitting exactly on a node or very close to a boundary, which
            is why accurate birth data is important.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Some readers use the phrase partial Kaal Sarp Yog for other arrangements. This tool does
            not apply that label because it can mean different things in different traditions.
            Instead, it gives a clear answer to the complete geometric condition.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">Kaal Sarp Dosha effects</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            You may see broad claims online that this combination guarantees setbacks, delays, or
            a particular set of symptoms. Those claims are too simple. Vedic interpretation depends
            on the condition of Rahu and Ketu, the houses involved, the Moon, the Ascendant,
            benefic support, and the active Dasha. A complete chart can show support and challenges
            at the same time.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">
            The twelve traditional Kaal Sarp types
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Traditional texts and modern practitioners use names based on Rahu’s house: Anant in the
            first, Kulik in the second, Vasuki in the third, Shankhpal in the fourth, Padma in the
            fifth, Mahapadma in the sixth, Takshak in the seventh, Karkotak in the eighth,
            Shankhchud in the ninth, Ghatak in the tenth, Vishdhar in the eleventh, and Sheshnag in
            the twelfth. These names should not be treated as a ranking of fear or danger.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(kaalSarpTypes).map(([house, type]) => (
              <div
                key={house}
                className="rounded-2xl border border-border bg-background/60 px-4 py-3"
              >
                <p className="font-display text-lg text-foreground">{type}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Rahu in the {house}
                  {ordinal(Number(house))} house
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">
            How to use this calculator responsibly
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Enter your birth details, review the result, and then look at your full{" "}
            <Link
              to="/free-kundli"
              className="text-primary underline underline-offset-4 hover:opacity-80"
            >
              Kundli
            </Link>
            . The node axis is better understood with house lords, the Moon, benefic and challenging
            aspects, and timing from the{" "}
            <Link
              to="/vimshottari-dasha-calculator"
              className="text-primary underline underline-offset-4 hover:opacity-80"
            >
              Vimshottari Dasha calculator
            </Link>
            . For compatibility questions, use{" "}
            <Link
              to="/kundali-matching"
              className="text-primary underline underline-offset-4 hover:opacity-80"
            >
              Kundli Matching
            </Link>
            .
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            If a result makes you worried, pause before making an important decision. Rituals and
            spiritual practices can be meaningful when chosen freely, but medical, financial, legal,
            and relationship decisions deserve qualified professional advice.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Start with your full Kundli, then use the Dasha timeline to understand which planetary
            period is active. If your question concerns a relationship, compare both charts with
            Kundli Matching instead of relying on one named pattern alone.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-foreground">Frequently asked questions</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl bg-background/60 p-5">
                <h3 className="font-display text-lg text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function ContextualLinks() {
  const tools = [
    ["/free-kundli", "Kundli Generator"],
    ["/vimshottari-dasha-calculator", "Vimshottari Dasha Calculator"],
    ["/kundali-matching", "Kundli Matching"],
    ["/ai-astrologer", "Free AI Astrologer"],
    ["/tools", "All Astrology Tools"],
  ];
  const guides = [
    ["/blogs/what-is-lagna-in-astrology", "What Is Lagna?"],
    ["/blogs/what-is-ai-astrologer", "What Is an AI Astrologer?"],
    ["/blogs/how-ai-reads-your-birth-chart", "How AI Reads Your Birth Chart"],
    ["/blogs", "View All Astrology Guides"],
  ];
  return (
    <section className="relative z-10 border-t border-border bg-card/40 py-14">
      <div className="mx-auto grid max-w-4xl gap-10 px-6 md:grid-cols-2">
        <LinkColumn title="Explore More Tools" links={tools} />
        <LinkColumn title="Read Astrology Guides" links={guides} />
      </div>
    </section>
  );
}

function LinkColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      <div className="mt-4 flex flex-col gap-2.5">
        {links.map(([to, label]) => (
          <Link
            key={to}
            to={to}
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {label} &rarr;
          </Link>
        ))}
      </div>
    </div>
  );
}
