import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/landing/Reveal";
import { SiteFooter } from "@/components/landing/SiteFooter";
import brandIcon from "@/assets/astrovaanii-logo.png";
import { getChart } from "@/lib/chart-server";
import type { ChartData } from "@/lib/chart-calc";

const FREE_QUESTION_USED_KEY = "astrovaanii_ai_pandit_used";

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || "d629479cf35f491ebfb531d15f16dbfc";

interface GeoapifyFeature {
  properties: {
    formatted: string;
    city?: string;
    state?: string;
    country?: string;
    lat: number;
    lon: number;
    timezone?: { offset_sec: number };
  };
}

const faqs = [
  {
    q: "What is AI Pandit?",
    a: "AI Pandit is a digital Vedic astrology guide that combines traditional Jyotish knowledge with modern technology. It calculates your birth chart using Swiss Ephemeris and provides spiritual guidance, muhurat recommendations, dosha remedies, and puja advice based on authentic Vedic principles. Think of it as having a learned Pandit available 24/7 to answer your questions about marriage timing, career decisions, spiritual practices, and life guidance. You can also explore our AI Astrologer for continuous chat-based readings or use our Free Kundli Generator for detailed chart analysis.",
  },
  {
    q: "How does AI Pandit calculate my birth chart?",
    a: "AI Pandit uses Swiss Ephemeris, the same astronomical calculation engine trusted by professional astrologers worldwide. When you enter your birth date, time, and place, it calculates the exact positions of planets, nakshatras, and houses using Lahiri ayanamsa. This is the same method used by traditional Pandits for centuries, now powered by precise astronomical algorithms. The system computes your ascendant, Moon sign, planetary placements, mahadasha and antardasha periods, and relevant yogas. Learn more about how AI reads birth charts in our detailed guide.",
  },
  {
    q: "Is AI Pandit free to use?",
    a: "Yes, you can ask one free question to AI Pandit without creating an account. This gives you a chance to experience the quality of guidance. After your free question, you can create an account to continue asking questions about your life, marriage, career, health, and spiritual matters. The free question helps you understand how AI Pandit interprets your chart before deciding to continue. Explore all our free Vedic astrology tools on the tools page.",
  },
  {
    q: "What kind of questions can I ask AI Pandit?",
    a: "You can ask about muhurat timing for important events like marriage, griha pravesh, or starting a new business. Questions about dosha nivaran (remedies) for Kaal Sarp Dosha, Mangal Dosha, or Pitra Dosha are welcome. You can seek guidance on spiritual practices, puja recommendations, fasting days, and sacred rituals. Career guidance, marriage timing, health concerns, and general life direction questions are also appropriate. Each answer is based on your actual birth chart calculations. For compatibility questions, try our Kundali Matching tool.",
  },
  {
    q: "Can AI Pandit help with muhurat selection?",
    a: "Yes, AI Pandit analyzes your current dasha and transit positions to recommend favorable timing for important life events. It considers the strength of your ascendant lord, benefic planet positions, and malefic planet influences to suggest auspicious periods. Whether you are planning marriage, starting a business, buying property, or beginning a spiritual practice, AI Pandit can guide you toward favorable windows based on your chart and current planetary conditions. You can also check your current dasha periods with our Vimshottari Dasha Calculator.",
  },
  {
    q: "Does AI Pandit provide dosha remedies?",
    a: "AI Pandit identifies doshas in your chart such as Kaal Sarp Dosha, Mangal Dosha, Pitra Dosha, and other challenging placements. It then suggests traditional Vedic remedies appropriate to your specific situation. These may include specific mantras, gemstone recommendations, fasting days, charity suggestions, puja procedures, or yantra usage. Remedies are practical and aligned with classical texts, tailored to your chart rather than generic advice. For detailed Kaal Sarp Dosha analysis, use our dedicated Kaal Sarp Dosha Calculator.",
  },
  {
    q: "How is AI Pandit different from a real Pandit?",
    a: "AI Pandit provides instant, consistent interpretations based on calculated chart data and classical principles. A real Pandit brings intuition, experience, and the ability to perform rituals and pujas in person. AI Pandit excels at quick guidance, educational explanations, and suggesting remedies based on your chart. For complex matters, ritual performance, or when you seek a human connection, consulting a learned Pandit in person remains valuable. AI Pandit complements traditional practice by making astrological guidance accessible anytime. Read more about the differences between AI and traditional astrology approaches.",
  },
  {
    q: "Can I get a free kundali from AI Pandit?",
    a: "When you enter your birth details, AI Pandit calculates your complete Vedic kundali including ascendant, Moon sign, nakshatra, planetary positions, house placements, and dasha periods. The system uses this calculated chart to answer your question. While the primary focus is providing guidance rather than generating a printable chart report, the AI incorporates all relevant chart details into its response. You can see the key chart elements in the answer, which is generated from your actual calculations. For a complete printable chart, use our Free Kundli Generator.",
  },
  {
    q: "Is AI Pandit available in Hindi?",
    a: "Yes, AI Pandit responds in the language you use to ask your question. If you write in Hindi using Devanagari script, the answer will be in Hindi. If you use Hinglish (Hindi written in English letters), the response matches that style. English questions receive English answers. This makes the service accessible across India and allows you to communicate naturally. The AI understands cultural context and uses appropriate terminology whether you speak Hindi, English, or Hinglish. Our AI Astrologer also supports 9 Indian languages including Hindi, Tamil, Telugu, and more.",
  },
  {
    q: "Can AI Pandit help with online puja guidance?",
    a: "AI Pandit can guide you on which puja to perform, the ideal timing, the mantras to chant, and the procedure to follow. It can suggest specific pujas based on your chart and current challenges—such as performing a Satyanarayan Puja for home harmony, Lakshmi Puja for financial stability, or Shiva Puja for spiritual growth. While AI Pandit cannot perform the puja for you, it provides detailed guidance so you can conduct the ritual correctly or seek the right priest. For baby-related spiritual matters, you might also find our Baby Name Letter Calculator helpful.",
  },
  {
    q: "What if I do not know my exact birth time?",
    a: "AI Pandit can work with an approximate birth time, though accuracy improves with precise information. If your birth time is unknown, you can enter a likely time such as noon or sunrise, but mention this uncertainty in your question. The AI will explain how the uncertainty affects the reading and may suggest multiple possibilities. For critical matters like marriage muhurat, having an accurate birth time is always better, but you can still receive meaningful guidance with approximate details. Learn more about the importance of accurate birth time in our lagna guide.",
  },
  {
    q: "Is my birth information safe with AI Pandit?",
    a: "Your birth details are used solely to calculate your chart and provide personalized guidance. The data is processed securely and not shared with third parties. When you create an account, your information is encrypted and stored so you can revisit your readings. You can delete your data at any time through your account settings. We respect your privacy and treat your personal information with the same care a traditional Pandit would. Read our privacy policy for detailed information on data handling.",
  },
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

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Pandit - Free Vedic Astrology Guidance",
  alternateName: "Free AI Pandit Online",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  url: "https://astrovaanii.in/ai-pandit",
  description: "Get free AI Pandit guidance for muhurat, dosha remedies, and spiritual advice. Calculate your Vedic kundali and ask one question free.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  featureList: [
    "Birth chart calculation",
    "Muhurat timing",
    "Dosha remedies",
    "Puja guidance",
    "Spiritual advice",
    "Marriage timing",
    "Career guidance",
  ],
  datePublished: "2025-01-01",
  dateModified: "2026-10-09",
  inLanguage: ["en-IN", "hi"],
  provider: { "@type": "Organization", name: "AstroVaanii", url: "https://astrovaanii.in" },
};

const speakableJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Pandit Free Online",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".speakable"],
  },
  url: "https://astrovaanii.in/ai-pandit",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://astrovaanii.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://astrovaanii.in/tools" },
    { "@type": "ListItem", position: 3, name: "AI Pandit", item: "https://astrovaanii.in/ai-pandit" },
  ],
};

export const Route = createFileRoute("/ai-pandit")({
  head: () => ({
    meta: [
      { title: "AI Pandit Free Online — Muhurat, Dosha & Spiritual Guidance" },
      {
        name: "description",
        content:
          "Ask AI Pandit for free Vedic astrology guidance. Get muhurat timing, dosha nivaran remedies, puja advice, and spiritual consultation. Calculate your kundali and ask one question free.",
      },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "IN" },
      { name: "geo.placename", content: "India" },
      { name: "ICBM", content: "20.5937, 78.9629" },
      {
        name: "keywords",
        content:
          "ai pandit, ai pandit vs pandit, ai pandit free kundali, ai pandit muhurat, ai pandit dosha, ai pandit online, ai pandit in hindi",
      },
      { property: "og:title", content: "AI Pandit Free Online — Muhurat, Dosha & Spiritual Guidance" },
      {
        property: "og:description",
        content:
          "Get free AI Pandit guidance for muhurat, dosha remedies, and spiritual advice. Calculate your Vedic kundali with Swiss Ephemeris.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://astrovaanii.in/ai-pandit" },
      { property: "og:image", content: "https://astrovaanii.in/social-sharing.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "AI Pandit Free Online Vedic Astrology Guidance" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI Pandit Free Online — Muhurat, Dosha & Spiritual Guidance" },
      {
        name: "twitter:description",
        content:
          "Free AI Pandit for Vedic astrology guidance. Muhurat timing, dosha remedies, and spiritual advice based on your birth chart.",
      },
      { name: "twitter:image", content: "https://astrovaanii.in/social-sharing.webp" },
    ],
    links: [
      { rel: "canonical", href: "https://astrovaanii.in/ai-pandit" },
      { rel: "alternate", hreflang: "hi", href: "https://astrovaanii.in/ai-pandit" },
      { rel: "alternate", hreflang: "en-IN", href: "https://astrovaanii.in/ai-pandit" },
      { rel: "alternate", hreflang: "x-default", href: "https://astrovaanii.in/ai-pandit" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(appJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(speakableJsonLd) },
    ],
  }),
  component: AiPanditPage,
});

function AiPanditPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "chart-data" | "question" | "result" | "loading">("form");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [timezoneOffset, setTimezoneOffset] = useState<number | undefined>();
  const [locationSuggestions, setLocationSuggestions] = useState<GeoapifyFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<any>(null);
  const [hasUsedFreeQuestion, setHasUsedFreeQuestion] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const requestId = useRef(0);
  const submissionInFlight = useRef(false);

  useEffect(() => {
    setHasUsedFreeQuestion(localStorage.getItem(FREE_QUESTION_USED_KEY) === "true");
  }, []);

  useEffect(() => {
    if (location.trim().length < 3) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const currentRequest = ++requestId.current;
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(location)}&apiKey=${GEOAPIFY_KEY}&limit=5`
        );
        const data = await response.json();
        if (currentRequest === requestId.current && data.features?.length > 0) {
          setLocationSuggestions(data.features);
          setShowSuggestions(true);
        } else {
          setLocationSuggestions([]);
          setShowSuggestions(false);
        }
      } catch {
        if (currentRequest === requestId.current) {
          setLocationSuggestions([]);
          setShowSuggestions(false);
        }
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [location]);

  const selectSuggestion = (s: GeoapifyFeature) => {
    setLocation(s.properties.formatted);
    setLatitude(s.properties.lat);
    setLongitude(s.properties.lon);
    const tz = s.properties.timezone?.offset_sec;
    setTimezoneOffset(tz != null ? tz / 3600 : undefined);
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };

  const handleBirthFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob || !time || !gender || !location) {
      setError("Please fill in all fields.");
      return;
    }
    if (latitude === null || longitude === null) {
      setError("Please select a valid location from the suggestions.");
      return;
    }
    setError("");
    setStep("loading");

    try {
      const [year, month, day] = dob.split("-").map(Number);
      const [hours, minutes] = time.split(":").map(Number);

      const result = await getChart({
        data: {
          year,
          month,
          day,
          hour: hours,
          minute: minutes,
          latitude,
          longitude,
          timezoneOffset,
        },
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setChartData(result.chart);
      setStep("chart-data");
    } catch (err) {
      setError("Failed to calculate your chart. Please try again.");
      setStep("form");
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasUsedFreeQuestion) {
      navigate({ to: "/signup" });
      return;
    }
    if (submissionInFlight.current) return;
    if (question.trim().length < 10) {
      setError("Please write a clear question with at least 10 characters.");
      return;
    }

    setError("");
    setStep("loading");
    submissionInFlight.current = true;

    try {
      const response = await fetch("/api/ai-pandit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          dob,
          timeOfBirth: time,
          gender,
          location,
          latitude,
          longitude,
          timezoneOffset,
          question,
          chart: chartData,
        }),
      });

      const data = await response.json();

      if (response.status === 429 || data.error === "FREE_QUESTION_USED") {
        localStorage.setItem(FREE_QUESTION_USED_KEY, "true");
        setHasUsedFreeQuestion(true);
        navigate({ to: "/signup" });
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "The reading could not be completed.");
      }

      localStorage.setItem(FREE_QUESTION_USED_KEY, "true");
      setHasUsedFreeQuestion(true);
      setResult(data);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setStep("question");
    } finally {
      submissionInFlight.current = false;
    }
  };

  const resetForm = () => {
    if (hasUsedFreeQuestion) {
      navigate({ to: "/signup" });
      return;
    }
    setQuestion("");
    setResult(null);
    setError("");
    setStep("question");
  };

  return (
    <main className="min-h-screen bg-background grain text-foreground pb-20">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24" />
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40" />

      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" title="AstroVaanii homepage" className="flex items-center gap-2" aria-label="AstroVaanii Home">
          <img src={brandIcon} alt="AstroVaanii logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">
            Astro<span className="text-primary">Vaanii</span>
          </span>
        </Link>
      </header>

      <section aria-label="AI Pandit tool" className="relative z-10 mx-auto max-w-6xl px-6 py-12 min-h-[60vh]">
        <Reveal>
          <div role="banner" aria-label="Vaani AI promotion" className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
            <Link
              to="/signup"
              title="Sign up for Vaani AI astrology platform"
              className="font-display text-xl font-semibold text-primary hover:underline"
            >
              Chat with the World's Most Accurate AI Astrology Platform — Vaani AI
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              AI Pandit <span className="text-primary">Free Online</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              AI Pandit gives you authentic Vedic astrology guidance for muhurat timing, dosha remedies, and spiritual practices. Calculate your kundali and ask one question free.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 mx-auto max-w-lg">
            {step === "form" && (
              <div className="rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-8">
                <h2 className="font-display text-2xl mb-6">Enter Your Birth Details</h2>
                <form onSubmit={handleBirthFormSubmit} aria-label="AI Pandit birth details form" className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={80}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Time of Birth</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Birth Place</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        autoComplete="off"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                        placeholder="Start typing your city (e.g., Delhi, Mumbai)"
                      />
                      {showSuggestions && locationSuggestions.length > 0 && (
                        <ul className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border bg-card p-1 shadow-xl">
                          {locationSuggestions.map((s, idx) => (
                            <li key={`${s.properties.formatted}-${idx}`}>
                              <button
                                type="button"
                                onClick={() => selectSuggestion(s)}
                                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-primary/10"
                              >
                                {s.properties.formatted}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      {location.length >= 3 && !showSuggestions && locationSuggestions.length === 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Type your city name and select from the suggestions below
                        </p>
                      )}
                    </div>
                  </div>

                  {error && (
                    <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary px-5 py-3.5 font-medium text-primary-foreground shadow-lg transition hover:opacity-90"
                  >
                    Continue to Ask Question
                  </button>
                </form>
              </div>
            )}

            {step === "chart-data" && chartData && (
              <div className="rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-8">
                <div className="mb-6">
                  <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    Your Birth Chart
                  </span>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Ascendant</span>
                    {chartData.ascendantSignName} {chartData.ascendantDegree.toFixed(1)}°
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Moon Sign</span>
                    {chartData.planets.Moon.signName}
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Moon Nakshatra</span>
                    {chartData.planets.Moon.nakshatraName} (Pada {chartData.planets.Moon.pada})
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Moon House</span>
                    House {chartData.planets.Moon.house}
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Current Mahadasha</span>
                    {chartData.mahadasha.planet}
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Current Antardasha</span>
                    {chartData.antardasha.planet}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background/70 p-5">
                  <h3 className="font-display text-lg mb-3">Key Planetary Positions</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sun:</span>
                      <span>{chartData.planets.Sun.signName} (H{chartData.planets.Sun.house})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mars:</span>
                      <span>{chartData.planets.Mars.signName} (H{chartData.planets.Mars.house})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mercury:</span>
                      <span>{chartData.planets.Mercury.signName} (H{chartData.planets.Mercury.house})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jupiter:</span>
                      <span>{chartData.planets.Jupiter.signName} (H{chartData.planets.Jupiter.house})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Venus:</span>
                      <span>{chartData.planets.Venus.signName} (H{chartData.planets.Venus.house})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturn:</span>
                      <span>{chartData.planets.Saturn.signName} (H{chartData.planets.Saturn.house})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rahu:</span>
                      <span>{chartData.planets.Rahu.signName} (H{chartData.planets.Rahu.house})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ketu:</span>
                      <span>{chartData.planets.Ketu.signName} (H{chartData.planets.Ketu.house})</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep("question")}
                  className="mt-6 w-full rounded-xl bg-primary px-5 py-3.5 font-medium text-primary-foreground shadow-lg transition hover:opacity-90"
                >
                  Continue to Ask Question
                </button>
              </div>
            )}

            {step === "question" && (
              <div className="rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-8">
                <h2 className="font-display text-2xl mb-6">Ask Your Question</h2>
                <form onSubmit={handleQuestionSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Your Question</label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      minLength={10}
                      maxLength={500}
                      rows={5}
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                      placeholder="Ask about muhurat, dosha remedies, puja guidance, or any spiritual matter..."
                    />
                    <div className="mt-1 text-right text-xs text-muted-foreground">
                      {question.length} of 500
                    </div>
                  </div>

                  {error && (
                    <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submissionInFlight.current}
                    className="w-full rounded-xl bg-primary px-5 py-3.5 font-medium text-primary-foreground shadow-lg transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                  >
                    {submissionInFlight.current ? "Processing..." : "Get AI Pandit Guidance"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="w-full rounded-xl border border-border px-5 py-3 font-medium text-foreground transition hover:bg-background"
                  >
                    Back
                  </button>
                </form>
              </div>
            )}

            {step === "loading" && (
              <div className="rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-12 text-center">
                <div className="animate-pulse text-primary text-6xl mb-4">🙏</div>
                <h2 className="font-display text-2xl mb-2">Calculating Your Birth Chart</h2>
                <p className="text-muted-foreground">Analyzing planetary positions...</p>
              </div>
            )}

            {step === "result" && result && (
              <div className="rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-8">
                <div className="mb-6">
                  <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    AI Pandit Guidance
                  </span>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Ascendant</span>
                    {result.chart.ascendant} {result.chart.ascendantDegree.toFixed(1)}°
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Moon</span>
                    {result.chart.moon.sign}, {result.chart.moon.nakshatra}
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Mahadasha</span>
                    {result.chart.mahadasha.planet}
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <span className="block text-xs text-muted-foreground">Antardasha</span>
                    {result.chart.antardasha.planet}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background/70 p-5">
                  <p className="whitespace-pre-line text-[15px] leading-7 text-foreground">
                    {result.answer}
                  </p>
                </div>

                <button
                  onClick={resetForm}
                  className="mt-6 w-full rounded-xl bg-primary px-5 py-3.5 font-medium text-primary-foreground shadow-lg transition hover:opacity-90"
                >
                  Create an Account to Ask More Questions
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <article aria-label="AI Pandit guide and information" className="relative z-10 mx-auto max-w-4xl px-6 py-20">
        <Reveal>
          <section>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              Free AI Pandit Online Guide
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              What is AI Pandit and How It Works
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              AI Pandit is a free online Vedic astrology guide that brings the wisdom of a traditional Pandit to your screen. It represents the meeting point of ancient Vedic wisdom and modern technology. In traditional India, a Pandit is a learned priest and astrologer who studies scriptures, performs rituals, and provides guidance based on Jyotish principles. AI Pandit brings this same knowledge to your screen, available twenty-four hours a day, without appointments or waiting periods. When you enter your birth details, the system calculates your complete Vedic kundali using Swiss Ephemeris—the same astronomical data trusted by professional astrologers worldwide. This calculation includes your ascendant, Moon sign, nakshatra, planetary positions in each house, mahadasha and antardasha periods, and relevant yogas. For a complete printable chart, you can also use our <Link to="/free-kundli" title="Free Kundli Generator" className="text-primary underline underline-offset-4 hover:opacity-80">Free Kundli Generator</Link>.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              The AI Pandit then analyzes this chart according to classical Vedic principles. It considers the strength of your ascendant lord, the placement of benefic and malefic planets, the influence of nakshatras, and your current dasha periods. When you ask a question about muhurat timing, the system checks your favorable planetary transits and suggests auspicious windows. For dosha queries, it identifies challenging placements such as Kaal Sarp Dosha, Mangal Dosha, or Pitra Dosha in your chart and recommends remedies based on traditional texts. The guidance you receive is not generic—it is specifically calculated from your birth data and grounded in authentic Jyotish methodology. Explore our <Link to="/tools" title="All Vedic astrology tools" className="text-primary underline underline-offset-4 hover:opacity-80">complete tools page</Link> for more specialized calculations.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              One question often arises: how can an AI understand something as nuanced as Vedic astrology? The answer lies in the systematic nature of Jyotish itself. Vedic astrology is built on precise calculations and well-defined principles. Swiss Ephemeris provides the astronomical accuracy. Classical texts like Brihat Parashara Hora Shastra and Brihat Jataka define the interpretation rules. AI Pandit applies these rules consistently to your chart. For a focused reading based on the moment and location of a question, try <Link to="/ai-prashna-kundli" title="AI Prashna Kundli" className="text-primary underline underline-offset-4 hover:opacity-80">AI Prashna Kundli</Link>. Learn more about AI chart interpretation in our guide on <Link to="/blogs/how-ai-reads-your-birth-chart" title="How AI reads your birth chart" className="text-primary underline underline-offset-4 hover:opacity-80">how AI reads your birth chart</Link>.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-3xl">AI Pandit vs Real Pandit: What Is the Difference?</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              The comparison between AI Pandit and a traditional Pandit is worth understanding because each serves different needs. A real Pandit brings years of study, intuition, and the ability to perform rituals in person. When you visit a temple or invite a Pandit home, the experience includes the human touch—the priest chanting mantras, performing the puja, and sometimes sensing the atmosphere in a way that algorithms cannot. For complex matters that require ritual performance, for ceremonies like marriage or griha pravesh, and when you seek a personal connection, a learned Pandit remains invaluable. You can explore more about AI astrology platforms in our comparison of the <Link to="/blogs/top-5-ai-astrology-platform-in-india" title="Top AI astrology platforms in India" className="text-primary underline underline-offset-4 hover:opacity-80">top 5 AI astrology platforms in India</Link>.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              AI Pandit excels in areas where speed, consistency, and accessibility matter. You can ask a question at midnight and receive guidance immediately. You do not need to travel or wait for an appointment. The AI provides consistent interpretations based on calculated data, without the variability that human intuition sometimes introduces. For educational purposes—understanding why a particular muhurat is favorable, learning about the nature of a dosha in your chart, or knowing which mantras might help—AI Pandit offers clear explanations backed by your actual chart data. It is particularly useful when you want quick guidance before making a decision, when you are exploring astrology for the first time, or when you need a second opinion alongside traditional consultation. Our <Link to="/ai-astrologer" title="AI Astrologer" className="text-primary underline underline-offset-4 hover:opacity-80">AI Astrologer</Link> offers continuous chat-based readings for ongoing guidance.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Think of AI Pandit as a knowledgeable companion. Many people use AI Pandit for initial guidance and then consult a traditional Pandit for ritual performance or deeper exploration. AI Pandit can help you understand your chart, identify favorable periods, and suggest remedies. A real Pandit can then perform the recommended puja, provide blessings, and offer intuitive insights. The AstroVaanii logo above links to the homepage, where you can explore all our Vedic astrology services.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-3xl">AI Pandit Free Kundali: How to Get Your Chart?</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Getting your kundali calculated through AI Pandit is straightforward. You need three pieces of information: your date of birth, time of birth, and place of birth. The date tells the system which planetary positions to retrieve. The time is crucial because the ascendant changes every two hours and the Moon moves through nakshatras at a measurable pace. Even a difference of a few minutes can shift house placements and dasha calculations. The place provides the geographical coordinates needed to adjust for the local horizon—your ascendant in Delhi will differ from your ascendant in Mumbai at the same universal time. Learn more about the importance of accurate birth time in our guide on <Link to="/blogs/what-is-lagna-in-astrology" title="What is Lagna in astrology" className="text-primary underline underline-offset-4 hover:opacity-80">what is lagna in astrology</Link>.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              When you enter these details, AI Pandit uses Swiss Ephemeris to compute the exact positions of the Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu at your birth moment. It applies Lahiri ayanamsa, the most widely used sidereal zodiac in Vedic astrology. The system then calculates your twelve houses using the Whole Sign method, determines which planets occupy which houses, identifies your ascendant sign and degree, and computes your nakshatra based on the Moon's position. It also calculates your Vimshottari dasha timeline, showing which mahadasha and antardasha periods are active at birth and throughout your life. Explore these periods in the dedicated <Link to="/vimshottari-dasha-calculator" title="Vimshottari Dasha Calculator" className="text-primary underline underline-offset-4 hover:opacity-80">Vimshottari Dasha Calculator</Link>.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              This calculated chart becomes the foundation for every answer AI Pandit provides. When you ask about marriage timing, the AI checks the seventh house, its lord, Venus placement, and relevant dasha periods—all from your actual calculations. When you inquire about career, it examines the tenth house, Sun, Jupiter, and Saturn in your chart. Your free question lets you see this personalization in action. For detailed chart analysis with a visual birth chart, use the Free Kundli Generator described above.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-3xl">AI Pandit Muhurat: How to Find Auspicious Timing?</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Muhurat selection is one of the most practical applications of Vedic astrology. Whether you are planning marriage, starting a business, buying property, performing a griha pravesh ceremony, or beginning an important journey, choosing the right time can make a difference. AI Pandit helps you identify favorable windows by analyzing both your personal chart and the current planetary transits. This dual analysis is important because a muhurat that looks good in the general calendar may not align with your individual planetary cycles. For marriage timing specifically, you can also use our <Link to="/kundali-matching" title="Kundali Matching" className="text-primary underline underline-offset-4 hover:opacity-80">Kundali Matching</Link> tool to check compatibility.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              The system considers several factors when suggesting muhurat. It checks the strength of your ascendant lord in the transit chart—a strong ascendant lord generally supports new beginnings. It examines the positions of benefic planets like Jupiter and Venus in transit, as their influence is considered favorable for most activities. It looks at the condition of malefic planets like Saturn, Mars, Rahu, and Ketu, avoiding periods when these planets are heavily afflicting the houses related to your planned activity. For marriage, it checks the seventh house and Venus. For business, it examines the second, seventh, and eleventh houses. For property, it considers the fourth house.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Your current dasha also plays a role. A muhurat during a favorable mahadasha or antardasha will be more supportive than one during a challenging period. AI Pandit factors this into its recommendations and explains why certain times may be more supportive for you. It identifies favorable windows so you can plan alongside practical considerations.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-3xl">AI Pandit Dosha: Can It Help With Dosha Nivaran?</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Doshas are challenging planetary combinations in Vedic astrology that can create obstacles in specific areas of life. The most commonly discussed doshas include Kaal Sarp Dosha, where Rahu and Ketu enclose all other planets; Mangal Dosha, which affects marriage and relationships; Pitra Dosha, connected to ancestral karma; and various other challenging placements involving Saturn, Rahu, or afflicted planets. AI Pandit can identify these doshas in your chart and suggest remedies based on classical Vedic practices. For detailed Kaal Sarp Dosha analysis, use our dedicated <Link to="/kaal-sarp-dosha-calculator" title="Kaal Sarp Dosha Calculator" className="text-primary underline underline-offset-4 hover:opacity-80">Kaal Sarp Dosha Calculator</Link>.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              When you ask about dosha nivaran, the AI examines your chart for the specific combination in question. For Kaal Sarp Dosha, it checks whether Rahu and Ketu indeed enclose all seven classical planets and determines which type—Anant, Kulik, Shankhapal, and so forth—based on their positions. For Mangal Dosha, it looks at Mars placement in the first, fourth, seventh, eighth, or twelfth houses. For Pitra Dosha, it examines the Sun, Saturn, and Rahu in specific combinations. Once identified, the AI suggests remedies appropriate to your chart and the nature of the dosha.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Remedies may include chanting specific mantras such as the Maha Mrityunjaya mantra for Kaal Sarp Dosha or the Hanuman Chalisa for Mangal Dosha. Gemstone recommendations, fasting, charity, temple visits, and specific pujas are other traditional remedies AI Pandit may suggest. These suggestions are tailored to your chart, with an explanation of why a remedy may be relevant.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-3xl">AI Pandit Online: 24/7 Puja Guidance</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              One of the most valuable aspects of AI Pandit is its availability. Spiritual questions do not always arise during office hours. You might wonder about the right time to perform a puja late at night, or you might need guidance on which mantra to chant when facing an unexpected challenge. AI Pandit is online twenty-four hours a day, seven days a week, ready to provide guidance whenever you need it. This accessibility makes Vedic wisdom practical for modern life, where schedules are busy and traditional priests may not always be immediately available.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              When you seek puja guidance, AI Pandit considers both the ritual aspect and the astrological timing. It can suggest which puja is appropriate for your current situation—a Satyanarayan Puja for home harmony, a Lakshmi Puja for financial matters, a Durga Puja for overcoming obstacles, or a Shiva Puja for spiritual growth. It then provides guidance on the ideal timing based on your chart and current transits. The system can recommend favorable days, specific hours, and even suggest which mantras to chant and how many times. For more complex pujas, it outlines the procedure in steps that you can follow or share with a priest.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              It is important to understand that AI Pandit guides but does not perform. It can tell you which puja to do, when to do it, and how to do it, but you or a priest must actually perform the ritual. This distinction matters because spiritual practice involves faith, intention, and personal energy that algorithms cannot substitute. What AI Pandit does well is remove the confusion about what to do and when to do it. It provides clear, chart-based guidance so you can focus on the actual practice with confidence. For those who cannot access a priest easily, this guidance makes authentic Vedic rituals more accessible while respecting that the spiritual core remains a human endeavor.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-3xl">AI Pandit in Hindi: Full Guide in Your Language</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Language accessibility is essential for spiritual tools in India. AI Pandit responds in the language you use to ask your question. If you write in Hindi using Devanagari script, the answer comes in Hindi. If you prefer Hinglish—Hindi written in English letters—the response matches that style. English questions receive English answers. This flexibility allows people across India to communicate naturally, whether they are from Hindi-speaking regions, South India, or urban centers where Hinglish is common.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              The AI understands cultural context and uses appropriate terminology. When you ask about muhurat in Hindi, it explains the concept using Hindi terms like shubh muhurat, grah, and nakshatra. When you inquire about dosha, it uses terms like dosha nivaran, upay, and mantra in the appropriate language. This cultural awareness makes the guidance feel more natural and relatable. You do not need to translate your thoughts into formal English—you can ask exactly what is on your mind in the language you think in.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              For users who prefer Hindi, AI Pandit serves as a digital Pandit who speaks their language. This is particularly valuable for people who may not be comfortable with English but want access to chart-based guidance. Families choosing a name can use the <Link to="/baby-name-by-date-of-birth" title="Baby Name Letter Calculator" className="text-primary underline underline-offset-4 hover:opacity-80">Baby Name Letter Calculator</Link> to find a traditional starting sound from a child’s birth details. AI Pandit and these tools make Vedic guidance accessible across regions and languages.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14 rounded-3xl border border-border bg-card p-7 sm:p-9">
            <h2 className="font-display text-3xl">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} id={`faq-${idx}`}>
                  <h3 className="font-display text-xl text-primary">{faq.q}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </article>
      <SiteFooter />
    </main>
  );
}
