import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  };
};

type PrashnaResult = {
  success: boolean;
  askedAt: string;
  location: string;
  category: string;
  outlook: "Supportive" | "Mixed" | "Requires patience";
  chartSummary: {
    primaryHouse: number;
    primaryHouseSign: string;
    houseLord: string;
    primaryHouseOccupants: string[];
    houseLordPlacement: { sign: string; house: number; degree: number } | null;
    ascendant: { sign: string; degree: number };
    moon: { sign: string; house: number; nakshatra: string; pada: number; degree: number };
  };
  answer: string;
};

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || "d629479cf35f491ebfb531d15f16dbfc";
const FREE_QUESTION_USED_KEY = "astrovaanii_prashna_used";

const faqs = [
  {
    q: "What is AI Prashna Kundli?",
    a: "AI Prashna Kundli is a Vedic horary astrology tool. It casts a chart for the exact moment and current location where a sincere question is submitted, then explains the relevant houses, their lords, the Moon, and the overall direction in simple language.",
  },
  {
    q: "Do I need my birth date or birth time?",
    a: "No. A Prashna chart uses the time of the question rather than the time of birth. You only need one clear question and your current city so the ascendant and houses can be calculated for that place.",
  },
  {
    q: "What kind of question should I ask?",
    a: "Ask one focused question about a matter that genuinely concerns you now. Questions about a job, marriage discussion, relationship, payment, education, travel, relocation, or a lost object usually give the clearest context.",
  },
  {
    q: "Can I ask several questions at once?",
    a: "It is better to ask one question at a time. Several unrelated questions point to different houses and can make the interpretation less focused. Submit the matter that is most important to you first.",
  },
  {
    q: "How is the Prashna chart calculated?",
    a: "The server records the submission moment, uses the coordinates of your selected city, and calculates a sidereal Vedic chart with Swiss Ephemeris and Lahiri ayanamsa. The reading then studies the houses connected with your selected subject.",
  },
  {
    q: "Does the result give a certain yes or no prediction?",
    a: "No responsible astrology tool can promise certainty. The result describes whether the chart looks supportive, mixed, or in need of patience, and explains the chart factors behind that direction so you can use your own judgment.",
  },
  {
    q: "Can I ask the same question again?",
    a: "Repeatedly casting charts for the same concern can create confusion. Ask when the matter is real and settled in your mind, read the answer carefully, and return only if the circumstances or the question have genuinely changed.",
  },
  {
    q: "Is this tool free?",
    a: "Yes. You can cast a Prashna Kundli and receive the focused explanation without entering birth details. A location is required because the ascendant changes with time and place.",
  },
  {
    q: "Can Prashna replace professional advice?",
    a: "No. Use the reading for reflection and cultural or spiritual guidance. Important medical, legal, financial, safety, and mental health decisions should be discussed with a qualified professional.",
  },
];

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Prashna Kundli",
  alternateName: "Free Prashna Kundli Online",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  url: "https://astrovaanii.in/ai-prashna-kundli",
  description:
    "Ask one clear question and receive a Vedic Prashna Kundli reading from the exact question time and current location.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  featureList: [
    "No birth time required",
    "Exact question moment chart",
    "Swiss Ephemeris calculations",
    "Lahiri ayanamsa",
    "Focused AI explanation",
  ],
  provider: { "@type": "Organization", name: "AstroVaanii", url: "https://astrovaanii.in" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://astrovaanii.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://astrovaanii.in/tools" },
    {
      "@type": "ListItem",
      position: 3,
      name: "AI Prashna Kundli",
      item: "https://astrovaanii.in/ai-prashna-kundli",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to ask a useful Prashna question",
  description:
    "Prepare one sincere question and cast a Vedic Prashna chart for your current time and location.",
  step: [
    {
      "@type": "HowToStep",
      name: "Choose one present concern",
      text: "Begin with one real decision, event, or uncertainty that already exists in your life.",
    },
    {
      "@type": "HowToStep",
      name: "Ask one clear question",
      text: "Write one focused question and avoid combining several unrelated matters.",
    },
    {
      "@type": "HowToStep",
      name: "Select your current city",
      text: "Choose the city where you are physically present so the ascendant and houses use the correct coordinates.",
    },
    {
      "@type": "HowToStep",
      name: "Read the first result carefully",
      text: "Review the chart facts and practical guidance without repeatedly asking the same question.",
    },
  ],
};

export const Route = createFileRoute("/ai-prashna-kundli")({
  head: () => ({
    meta: [
      { title: "AI Prashna Kundli Online | Ask One Question Free" },
      {
        name: "description",
        content:
          "Ask one clear question with free AI Prashna Kundli. Get a Vedic horary chart from the exact question time and location. No birth time needed.",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "AI Prashna Kundli, Prashna Kundli online, horary astrology, Prashna astrology, free Prashna chart, ask astrology question",
      },
      { property: "og:title", content: "AI Prashna Kundli Online | Ask One Question Free" },
      {
        property: "og:description",
        content:
          "Free AI Prashna Kundli casts a Vedic horary chart for the exact moment of your question and gives a focused reading. No birth time required.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://astrovaanii.in/ai-prashna-kundli" },
      { property: "og:image", content: "https://astrovaanii.in/social-sharing.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI Prashna Kundli Online" },
      {
        name: "twitter:description",
        content:
          "Ask one sincere question. No birth time is required for this focused Vedic reading.",
      },
      { name: "twitter:image", content: "https://astrovaanii.in/social-sharing.webp" },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/ai-prashna-kundli" }],
  }),
  component: AiPrashnaKundliPage,
});

function AiPrashnaKundliPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("career");
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<GeoapifyFeature | null>(null);
  const [suggestions, setSuggestions] = useState<GeoapifyFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PrashnaResult | null>(null);
  const [hasUsedFreeQuestion, setHasUsedFreeQuestion] = useState(false);
  const requestId = useRef(0);
  const submissionInFlight = useRef(false);

  useEffect(() => {
    setHasUsedFreeQuestion(localStorage.getItem(FREE_QUESTION_USED_KEY) === "true");
  }, []);

  useEffect(() => {
    if (selectedLocation || location.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    const currentRequest = ++requestId.current;
    const timer = window.setTimeout(async () => {
      try {
        const url = new URL("https://api.geoapify.com/v1/geocode/autocomplete");
        url.searchParams.set("text", location.trim());
        url.searchParams.set("type", "city");
        url.searchParams.set("limit", "6");
        url.searchParams.set("apiKey", GEOAPIFY_KEY);
        const response = await fetch(url);
        if (!response.ok) return;
        const data = (await response.json()) as { features?: GeoapifyFeature[] };
        if (currentRequest === requestId.current) setSuggestions(data.features || []);
      } catch {
        if (currentRequest === requestId.current) setSuggestions([]);
      }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [location, selectedLocation]);

  async function submitQuestion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (hasUsedFreeQuestion) {
      navigate({ to: "/signup" });
      return;
    }
    if (submissionInFlight.current) return;
    setError("");
    setResult(null);
    if (!selectedLocation) {
      setError("Please choose your current city from the suggestions.");
      return;
    }
    if (question.trim().length < 10) {
      setError("Please write one clear question with at least 10 characters.");
      return;
    }

    setLoading(true);
    submissionInFlight.current = true;
    try {
      const response = await fetch("/api/prashna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          question,
          location: selectedLocation.properties.formatted,
          latitude: selectedLocation.properties.lat,
          longitude: selectedLocation.properties.lon,
        }),
      });
      const data = (await response.json()) as PrashnaResult & {
        error?: string;
        message?: string;
        redirectTo?: string;
      };
      if (response.status === 429 || data.error === "FREE_QUESTION_USED") {
        localStorage.setItem(FREE_QUESTION_USED_KEY, "true");
        setHasUsedFreeQuestion(true);
        navigate({ to: "/signup" });
        return;
      }
      if (!response.ok) throw new Error(data.error || "The reading could not be created.");
      localStorage.setItem(FREE_QUESTION_USED_KEY, "true");
      setHasUsedFreeQuestion(true);
      setResult(data);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Please try again.");
    } finally {
      submissionInFlight.current = false;
      setLoading(false);
    }
  }

  function resetReading() {
    if (hasUsedFreeQuestion) {
      navigate({ to: "/signup" });
      return;
    }
    setQuestion("");
    setResult(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-background grain text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <header className="relative z-20 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="AstroVaanii home">
          <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">
            Astro<span className="text-primary">Vaanii</span>
          </span>
        </Link>
        <Link
          to="/tools"
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          All tools
        </Link>
      </header>

      <section className="relative overflow-hidden border-b border-border pb-20 pt-10">
        <div className="orb -left-40 -top-32 h-[460px] w-[460px] bg-[color:var(--gold)]" />
        <div className="orb -right-24 bottom-0 h-[360px] w-[360px] bg-[color:var(--clay)] opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link to="/tools" className="hover:text-primary">
              Tools
            </Link>
            <span className="mx-2">›</span>
            <span aria-current="page">AI Prashna Kundli</span>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
            <Reveal>
              <div>
                <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  Free Vedic question chart
                </span>
                <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  AI Prashna Kundli <span className="text-primary">Online</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Ask one sincere question and receive a focused Vedic reading from the exact moment
                  you submit it. No birth date or birth time is needed. Your current city sets the
                  ascendant and houses for the Prashna chart.
                </p>
                <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
                  {["No birth details", "Exact question time", "Private focused answer"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-border bg-card/70 px-4 py-3"
                      >
                        ✓ {item}
                      </div>
                    ),
                  )}
                </div>
                <aside className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <h2 className="font-display text-xl">Quick answer</h2>
                  <p className="mt-2 leading-7 text-muted-foreground">
                    Prashna Kundli is a horary chart created for the time and place of a question.
                    It is useful when birth details are unavailable or when one immediate matter
                    needs focused guidance.
                  </p>
                </aside>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div
                id="ask"
                className="rounded-3xl border border-border bg-card/90 p-6 shadow-2xl backdrop-blur md:p-8"
              >
                {!result ? (
                  <form onSubmit={submitQuestion}>
                    <h2 className="font-display text-2xl">Ask your question</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Pause, settle your mind, and write only the matter you truly want to
                      understand.
                    </p>

                    <label className="mt-6 block text-sm font-medium" htmlFor="prashna-name">
                      Your name <span className="font-normal text-muted-foreground">optional</span>
                    </label>
                    <input
                      id="prashna-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      maxLength={80}
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                      placeholder="Name"
                    />

                    <label className="mt-5 block text-sm font-medium" htmlFor="prashna-category">
                      Question subject
                    </label>
                    <select
                      id="prashna-category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    >
                      <option value="career">Career and work</option>
                      <option value="marriage">Marriage</option>
                      <option value="relationship">Relationship</option>
                      <option value="money">Money and finances</option>
                      <option value="education">Education</option>
                      <option value="travel">Travel and relocation</option>
                      <option value="lost-item">Lost item</option>
                      <option value="general">General guidance</option>
                    </select>

                    <label className="mt-5 block text-sm font-medium" htmlFor="prashna-location">
                      Your current city
                    </label>
                    <div className="relative">
                      <input
                        id="prashna-location"
                        value={location}
                        onChange={(event) => {
                          setLocation(event.target.value);
                          setSelectedLocation(null);
                        }}
                        autoComplete="off"
                        required
                        aria-required="true"
                        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                        placeholder="Start typing your city"
                      />
                      {suggestions.length > 0 && (
                        <ul className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border bg-card p-1 shadow-xl">
                          {suggestions.map((feature) => (
                            <li key={`${feature.properties.lat}-${feature.properties.lon}`}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedLocation(feature);
                                  setLocation(feature.properties.formatted);
                                  setSuggestions([]);
                                }}
                                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-primary/10"
                              >
                                {feature.properties.formatted}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <label className="mt-5 block text-sm font-medium" htmlFor="prashna-question">
                      Your one clear question
                    </label>
                    <textarea
                      id="prashna-question"
                      value={question}
                      onChange={(event) => setQuestion(event.target.value)}
                      minLength={10}
                      maxLength={500}
                      required
                      aria-required="true"
                      rows={4}
                      className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                      placeholder="For example: Is this the right time to accept the new job offer?"
                    />
                    <div className="mt-1 text-right text-xs text-muted-foreground">
                      {question.length} of 500
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
                      >
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-6 w-full rounded-xl bg-primary px-5 py-3.5 font-medium text-primary-foreground shadow-lg transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                    >
                      {loading
                        ? "Casting your Prashna chart..."
                        : hasUsedFreeQuestion
                          ? "Sign up to ask another question"
                          : "Get my Prashna reading"}
                    </button>
                    <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                      For reflection and spiritual guidance. This is not professional advice.
                    </p>
                  </form>
                ) : (
                  <div aria-live="polite">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-primary">
                          Your Prashna reading
                        </p>
                        <h2 className="mt-1 font-display text-3xl">{result.outlook}</h2>
                      </div>
                      <span className="rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm text-primary">
                        {result.category}
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Chart cast{" "}
                      <time dateTime={result.askedAt}>
                        {new Date(result.askedAt).toLocaleString()}
                      </time>{" "}
                      for {result.location}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl border border-border bg-background/70 p-3">
                        <span className="block text-xs text-muted-foreground">Ascendant</span>
                        {result.chartSummary.ascendant.sign} {result.chartSummary.ascendant.degree}°
                      </div>
                      <div className="rounded-xl border border-border bg-background/70 p-3">
                        <span className="block text-xs text-muted-foreground">Moon</span>
                        {result.chartSummary.moon.sign}, house {result.chartSummary.moon.house}
                      </div>
                      <div className="rounded-xl border border-border bg-background/70 p-3">
                        <span className="block text-xs text-muted-foreground">Main house</span>House{" "}
                        {result.chartSummary.primaryHouse}, {result.chartSummary.primaryHouseSign}
                      </div>
                      <div className="rounded-xl border border-border bg-background/70 p-3">
                        <span className="block text-xs text-muted-foreground">House lord</span>
                        {result.chartSummary.houseLord}
                      </div>
                    </div>
                    <p className="mt-6 whitespace-pre-line text-[15px] leading-7 text-foreground">
                      {result.answer}
                    </p>
                    <button
                      type="button"
                      onClick={resetReading}
                      className="mt-7 w-full rounded-xl border border-primary px-5 py-3 font-medium text-primary transition hover:bg-primary/10"
                    >
                      Create an account to ask another question
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <article
        aria-labelledby="prashna-guide-heading"
        className="mx-auto max-w-4xl px-6 py-20"
      >
        <Reveal>
          <section>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              A practical guide
            </p>
            <h2 id="prashna-guide-heading" className="mt-4 font-display text-3xl sm:text-4xl">
              What an AI Prashna Kundli actually reads
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Prashna Kundli belongs to the question astrology tradition of Jyotish. Instead of
              beginning with your birth, it begins with a meaningful question. The chart records the
              sky at the exact time that question reaches the astrologer or, in this tool, the exact
              time you submit the form. Your selected city supplies the geographical position needed
              to calculate the ascendant. This creates a chart for the life of the question itself.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              The idea is simple but the reading is not a random daily horoscope. A career question
              directs attention toward the tenth house, work conditions, gains, and the planets that
              rule those areas. A relationship question gives more weight to the seventh and fifth
              houses. Money, education, travel, and lost objects each have their own house context.
              The Moon is especially important because it describes the movement of the matter and
              the state of attention around it. The ascendant and its lord show the person asking
              and the strength available to act.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              AstroVaanii first calculates those astronomical positions and then uses AI to turn the
              selected chart facts into readable language. The AI does not choose the planets or
              invent the chart. It receives the ascendant, Moon, relevant house, house lord,
              occupants, and a measured outlook from the calculation. This separation matters.
              Computation provides the facts, while language generation provides a clear explanation
              of those facts.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-3xl">How to ask a useful Prashna question</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Begin with a concern that already exists in your life. A useful question has a real
              decision, event, or uncertainty behind it. “Will I receive the offer after my final
              interview?” gives the chart a clearer subject than “Tell me everything about my
              career.” Likewise, “Is the present marriage discussion likely to move forward?” is
              more focused than asking for a complete life prediction. Clear wording helps the tool
              select the right houses and helps you understand the answer without forcing it to
              cover unrelated matters.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Ask only once when your mind feels settled. Traditional practice treats sincerity as
              part of the method. Refreshing the page until a preferred answer appears defeats the
              purpose, because the later charts describe repeated asking rather than the original
              concern. Read the first result slowly. Notice which factors look supportive, which
              suggest patience, and what practical action remains within your control.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Your location should be the city where you are physically present, not your birthplace
              and not the city connected with the event. The chart is anchored to the person asking
              at the present moment. Select the city from the suggestions so the calculator receives
              exact coordinates. The server records the time after you submit, which prevents
              differences caused by an incorrect device clock.
            </p>
          </section>

          <section className="mt-14 rounded-3xl border border-border bg-card p-7 sm:p-9">
            <h2 className="font-display text-3xl">What the result means</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <h3 className="font-display text-xl text-primary">Supportive</h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  The main house and its lord show useful strength or help. This is a favorable
                  direction, not a promise that effort is unnecessary.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-primary">Mixed</h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  Helpful and difficult signals appear together. Progress may depend on timing,
                  clearer communication, or a condition that is still changing.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-primary">Requires patience</h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  The chart shows resistance, delay, or reduced clarity. It can be wiser to gather
                  facts, wait, or adjust the plan before acting.
                </p>
              </div>
            </div>
            <p className="mt-6 leading-8 text-muted-foreground">
              These labels summarize direction without pretending that life is mechanically fixed.
              The written interpretation matters more than the label because it explains why the
              chart leans that way. Use it as another perspective beside real evidence, honest
              conversation, and sound professional advice where needed.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-3xl">
              Prashna Kundli and birth Kundli are different tools
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              A birth chart describes the broader pattern of a life from the date, time, and place
              of birth. If you know those details, the{" "}
              <Link to="/free-kundli" className="text-primary underline underline-offset-4">
                free Kundli generator
              </Link>{" "}
              is the right place to study your ascendant, planets, houses, and longer life themes.
              Prashna has a narrower purpose. It studies one present concern through the chart of
              the question. It does not recreate a missing birth chart and should not be treated as
              a substitute for every form of natal analysis.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Timing methods also serve a different purpose. The{" "}
              <Link
                to="/vimshottari-dasha-calculator"
                className="text-primary underline underline-offset-4"
              >
                Vimshottari Dasha calculator
              </Link>{" "}
              uses the Moon at birth to show major and minor planetary periods across many years.
              Prashna reads the immediate situation. When accurate birth details exist, a careful
              astrologer may compare both, but each chart should first be understood on its own
              terms.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Relationship compatibility is another separate question. A concern about whether a
              current conversation will progress can be asked here. A comparison of two birth charts
              belongs in the{" "}
              <Link to="/kundali-matching" className="text-primary underline underline-offset-4">
                Kundali matching tool
              </Link>
              , which calculates Ashta Koota and related compatibility factors. Choosing the right
              tool keeps the answer relevant and prevents one chart from being asked to do
              everything.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-3xl">The calculation behind this tool</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              The chart engine uses Swiss Ephemeris for planetary positions and Lahiri ayanamsa for
              the sidereal zodiac. Once the server receives your question, it records the current
              time in a standard universal format. It combines that instant with the latitude and
              longitude of your selected city. The result includes the ascendant sign and degree,
              the signs occupying the twelve houses, the house lords, planetary house positions, and
              the Moon’s Nakshatra and Pada.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              The selected subject tells the interpreter where to begin. Career questions emphasize
              the tenth house, with the sixth and eleventh providing supporting context. Marriage
              emphasizes the seventh house. Money begins with the second and eleventh. Education
              uses the fourth, fifth, and ninth. Travel gives importance to the ninth, twelfth, and
              third. A lost object question looks closely at possession, home, and recovery
              indicators. General guidance begins with the ascendant and houses of support.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              This method is intentionally transparent. Your result displays the ascendant, Moon,
              primary house, and its lord before the explanation. You can therefore see the core
              chart facts used by the reading. If you are learning Jyotish, our guide to{" "}
              <Link
                to="/blogs/what-is-lagna-in-astrology"
                className="text-primary underline underline-offset-4"
              >
                Lagna in astrology
              </Link>{" "}
              explains why the ascendant is sensitive to time and place. The article about{" "}
              <Link
                to="/blogs/how-ai-reads-your-birth-chart"
                className="text-primary underline underline-offset-4"
              >
                how AI reads a birth chart
              </Link>{" "}
              explains the wider role of calculation and language models in an astrology product.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-3xl">
              When another AstroVaanii tool is more suitable
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Use Prashna when you have one live concern. Use the{" "}
              <Link to="/ai-astrologer" className="text-primary underline underline-offset-4">
                AI astrologer
              </Link>{" "}
              when you want a continuing conversation that remembers your birth chart and allows
              follow up questions. That experience is better for connecting several life areas or
              understanding how a natal placement may express itself over time. Prashna is
              deliberately brief and centered on the moment.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              If your concern is specifically about the lunar nodes enclosing the classical planets,
              use the{" "}
              <Link
                to="/kaal-sarp-dosha-calculator"
                className="text-primary underline underline-offset-4"
              >
                Kaal Sarp Dosha calculator
              </Link>
              . It checks the required planetary geometry instead of guessing from a question chart.
              Parents looking for a traditional starting sound based on a newborn’s Moon can use the{" "}
              <Link
                to="/baby-name-by-date-of-birth"
                className="text-primary underline underline-offset-4"
              >
                baby name letter calculator
              </Link>
              . It calculates Nakshatra and Pada from exact birth details.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              You can browse the complete{" "}
              <Link to="/tools" className="text-primary underline underline-offset-4">
                Vedic astrology tools collection
              </Link>{" "}
              whenever you are uncertain which method fits. Each calculator states the details it
              needs and the result it provides. That makes it easier to choose a focused method
              instead of entering personal information into an unrelated calculator.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-3xl">Responsible use and privacy</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              A Prashna reading can help you pause, name the real issue, and consider a situation
              from a symbolic perspective. It cannot verify another person’s private thoughts,
              guarantee an event, or remove the need for evidence. Do not use it to make urgent
              health or safety choices. Do not delay legal, financial, or medical help because of a
              chart. Our{" "}
              <Link to="/disclaimer" className="text-primary underline underline-offset-4">
                astrology disclaimer
              </Link>{" "}
              explains these boundaries in detail.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Avoid placing sensitive information in the question. Names are optional, and a short
              description is usually enough. You do not need to include account numbers, addresses,
              medical records, passwords, or identifying information about other people. A clear
              sentence such as “Will the delayed client payment arrive soon?” gives adequate context
              without exposing private data.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Most importantly, keep your agency. A supportive chart still asks for preparation and
              good judgment. A difficult chart does not mean defeat. It may describe delay,
              incomplete knowledge, or the need for a different approach. The most useful reading is
              one that helps you see choices more calmly rather than one that tells you to surrender
              responsibility.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-3xl">Frequently asked questions</h2>
            <div className="mt-7 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border border-border bg-card p-5">
                  <summary className="cursor-pointer list-none font-display text-lg">
                    {faq.q}
                  </summary>
                  <p className="mt-3 leading-7 text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl bg-primary px-7 py-10 text-primary-foreground sm:px-10">
            <h2 className="font-display text-3xl">Ready to ask clearly?</h2>
            <p className="mt-4 max-w-2xl leading-7 opacity-90">
              Choose the one matter that feels most important now. Write it in a single sentence,
              select your current city, and let the exact question moment set the chart.
            </p>
            {hasUsedFreeQuestion ? (
              <Link
                to="/signup"
                className="mt-6 inline-flex rounded-xl bg-background px-5 py-3 font-medium text-foreground"
              >
                Create an account to continue
              </Link>
            ) : (
              <a
                href="#ask"
                className="mt-6 inline-flex rounded-xl bg-background px-5 py-3 font-medium text-foreground"
              >
                Ask your Prashna question
              </a>
            )}
          </section>
        </Reveal>
      </article>

      <footer className="border-t border-border bg-card/40 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={brandIcon} alt="" width={24} height={24} className="h-6 w-6" />
            <span className="font-display text-lg text-foreground">AstroVaanii</span>
          </div>
          <p>Vedic astrology tools designed for clarity, reflection, and responsible use.</p>
          <p>© {new Date().getFullYear()} AstroVaanii. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
