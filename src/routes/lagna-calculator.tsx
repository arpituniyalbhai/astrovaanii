import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { getChart } from "@/lib/chart-server";
import type { ChartData, PlanetData } from "@/lib/chart-calc";
import brandIcon from "@/assets/astrovaanii-logo.png";
import lagnaBannerImg from "@/assets/what-is-lagna-in-astrology.webp";
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

const LAGNA_INSIGHTS: Record<string, {
  tagline: string;
  vitality: string;
  careerPath: string;
  beneficPlanets: string;
  maleficPlanets: string;
  yogakaraka: string;
  luckyGem: string;
  luckyColor: string;
  deity: string;
}> = {
  Aries: {
    tagline: "Dynamic, courageous trailblazer with natural executive initiative",
    vitality: "High physical drive, rapid metabolism, impulsive energy; needs regular vigorous activity.",
    careerPath: "Leadership, military, engineering, sports, surgery, entrepreneurship, pioneering ventures.",
    beneficPlanets: "Sun (5th Lord), Jupiter (9th Lord), Mars (Lagna Lord)",
    maleficPlanets: "Mercury (3rd/6th Lord), Venus (2nd/7th Maraka)",
    yogakaraka: "Jupiter acts as a prime divine guide; Sun brings intellectual brilliance.",
    luckyGem: "Red Coral (Moonga), Yellow Sapphire",
    luckyColor: "Crimson Red, Saffron, Gold",
    deity: "Lord Kartikeya / Lord Hanuman",
  },
  Taurus: {
    tagline: "Grounded, aesthetic builder possessing unwavering stamina and commercial acumen",
    vitality: "Strong physical endurance; potential sensitivity to throat, thyroid, or metabolic sluggishness.",
    careerPath: "Finance, luxury goods, agriculture, real estate, hospitality, architecture, classical arts.",
    beneficPlanets: "Saturn (9th & 10th Lord - Yogakaraka), Mercury (2nd & 5th Lord)",
    maleficPlanets: "Jupiter (8th & 11th Lord), Mars (7th & 12th Lord)",
    yogakaraka: "Saturn (rules Dharma 9th & Karma 10th Kendra/Trikona houses)",
    luckyGem: "Diamond / White Sapphire, Emerald",
    luckyColor: "Cream White, Pastel Pink, Emerald Green",
    deity: "Goddess Lakshmi",
  },
  Gemini: {
    tagline: "Inquisitive, intellectually versatile communicator thriving in agile environments",
    vitality: "High mental activity, vulnerable to nervous exhaustion, respiratory or shoulder strain.",
    careerPath: "Journalism, software, marketing, writing, trading, education, media, public relations.",
    beneficPlanets: "Venus (5th Lord), Saturn (9th Lord), Mercury (Lagna & 4th Lord)",
    maleficPlanets: "Mars (6th & 11th Lord), Jupiter (7th & 10th Badhaka/Kendra-adhipati)",
    yogakaraka: "Venus (5th Trikona lord of intelligence and artistic creativity)",
    luckyGem: "Emerald (Panna), Blue Sapphire",
    luckyColor: "Forest Green, Mint, Sky Blue",
    deity: "Lord Vishnu / Saraswati",
  },
  Cancer: {
    tagline: "Empathetic, highly intuitive nurturer with profound emotional intelligence",
    vitality: "Fluctuating vitality aligned with lunar cycles; requires emotional peace and digestive care.",
    careerPath: "Healthcare, psychology, hospitality, shipping, human resources, child development, politics.",
    beneficPlanets: "Mars (5th & 10th Lord - Yogakaraka), Jupiter (9th Lord), Moon (Lagna Lord)",
    maleficPlanets: "Saturn (7th & 8th Lord), Mercury (3rd & 12th Lord)",
    yogakaraka: "Mars (rules 5th Trikona and 10th Kendra houses)",
    luckyGem: "Natural Pearl (Moti), Red Coral",
    luckyColor: "Silvery White, Cream, Marine Blue",
    deity: "Lord Shiva / Goddess Parvati",
  },
  Leo: {
    tagline: "Commanding, magnanimous sovereign driven by honor and creative authority",
    vitality: "Vibrant constitution, strong heart and spine; watch for hypertension or burnout from pride.",
    careerPath: "Government, administrative services, executive management, entertainment, diplomacy, politics.",
    beneficPlanets: "Mars (4th & 9th Lord - Yogakaraka), Sun (Lagna Lord), Jupiter (5th Lord)",
    maleficPlanets: "Saturn (6th & 7th Lord), Venus (3rd & 10th Lord)",
    yogakaraka: "Mars (rules 4th Kendra and 9th Dharma Trikona houses)",
    luckyGem: "Ruby (Manikya), Red Coral, Yellow Sapphire",
    luckyColor: "Golden Yellow, Royal Orange, Ruby Red",
    deity: "Lord Surya / Lord Shiva",
  },
  Virgo: {
    tagline: "Methodical, analytical perfectionist with deep healing and problem-solving mastery",
    vitality: "Attuned mind-body connection, digestive sensitivity; thrives on structured routines and clean diet.",
    careerPath: "Data science, accounting, pharmaceuticals, healthcare, auditing, editing, investigative research.",
    beneficPlanets: "Venus (2nd & 9th Lord), Mercury (Lagna & 10th Lord)",
    maleficPlanets: "Mars (3rd & 8th Lord), Moon (11th Lord)",
    yogakaraka: "Venus acts as prime benefic bringing dharma and sustainable fortune.",
    luckyGem: "Emerald (Panna), Diamond / White Sapphire",
    luckyColor: "Olive Green, Soft Beige, Navy",
    deity: "Lord Ganesha / Goddess Saraswati",
  },
  Libra: {
    tagline: "Refined, diplomatic strategist pursuing harmony, justice, and aesthetic symmetry",
    vitality: "Generally well-balanced; needs proper hydration, kidney care, and mental equilibrium.",
    careerPath: "Law, judiciary, diplomacy, international trade, design, fashion, luxury hospitality, arts.",
    beneficPlanets: "Saturn (4th & 5th Lord - Yogakaraka), Mercury (9th Lord)",
    maleficPlanets: "Jupiter (3rd & 6th Lord), Sun (11th Lord Badhaka)",
    yogakaraka: "Saturn (rules 4th Kendra and 5th Trikona houses)",
    luckyGem: "Diamond / White Zircon, Blue Sapphire",
    luckyColor: "Pure White, Light Blue, Turquoise",
    deity: "Goddess Mahalakshmi",
  },
  Scorpio: {
    tagline: "Profound, intense investigator capable of monumental regeneration and resilience",
    vitality: "Extraordinary recovery capacity, intense internal heat; prone to reproductive/pelvic tensions.",
    careerPath: "Occult, surgery, defense intelligence, research, detective work, mining, crisis turnaround.",
    beneficPlanets: "Jupiter (2nd & 5th Lord), Sun (10th Lord), Moon (9th Lord)",
    maleficPlanets: "Mercury (8th & 11th Lord), Venus (7th & 12th Maraka)",
    yogakaraka: "Sun and Moon create an exceptional Dharma-Karma Raj Yoga for Scorpio.",
    luckyGem: "Red Coral (Moonga), Yellow Sapphire, Pearl",
    luckyColor: "Deep Maroon, Blood Red, Dark Saffron",
    deity: "Lord Kartikeya / Lord Shiva (Bhairava)",
  },
  Sagittarius: {
    tagline: "Philosophical, visionary seeker inspired by high ethics, wisdom, and boundless truth",
    vitality: "Strong resilience, active athletic build; needs to guard liver health and avoid overindulgence.",
    careerPath: "Higher education, jurisprudence, philosophy, international relations, spirituality, publishing.",
    beneficPlanets: "Sun (9th Lord), Mars (5th Lord), Jupiter (Lagna & 4th Lord)",
    maleficPlanets: "Venus (6th & 11th Lord), Mercury (7th & 10th Badhaka)",
    yogakaraka: "Sun (9th Lord of Fortune) and Mars (5th Lord of Wisdom)",
    luckyGem: "Yellow Sapphire (Pukhraj), Ruby",
    luckyColor: "Bright Yellow, Saffron, Golden Amber",
    deity: "Lord Dakshinamurthy / Lord Vishnu",
  },
  Capricorn: {
    tagline: "Disciplined, pragmatic strategist building timeless structures through patience",
    vitality: "Enduring bone density, slow aging process; watch for knee issues or cold weather stiffness.",
    careerPath: "Corporate governance, heavy industry, construction, civil administration, finance, mining.",
    beneficPlanets: "Venus (5th & 10th Lord - Yogakaraka), Mercury (9th Lord)",
    maleficPlanets: "Mars (4th & 11th Lord), Jupiter (3rd & 12th Lord)",
    yogakaraka: "Venus (supreme Yogakaraka ruling intelligence and career)",
    luckyGem: "Blue Sapphire (Neelam), Emerald, Diamond",
    luckyColor: "Charcoal Gray, Midnight Blue, Black",
    deity: "Lord Saturn / Lord Hanuman",
  },
  Aquarius: {
    tagline: "Visionary, egalitarian innovator pioneering collective evolution and progressive ideals",
    vitality: "Sensitive nervous and circulatory systems; thrives with mindful breathing and social rejuvenation.",
    careerPath: "Technology, scientific research, social welfare, astrophysics, AI development, community reforms.",
    beneficPlanets: "Venus (4th & 9th Lord - Yogakaraka), Saturn (Lagna Lord)",
    maleficPlanets: "Jupiter (2nd & 11th Lord), Mars (3rd & 10th Lord)",
    yogakaraka: "Venus (rules 4th Kendra and 9th Trikona houses)",
    luckyGem: "Blue Sapphire (Neelam), Diamond / Opal",
    luckyColor: "Electric Blue, Aquamarine, Violet",
    deity: "Lord Shiva / Lord Ganesha",
  },
  Pisces: {
    tagline: "Transcendent, compassionate mystic attuned to spiritual truths and deep imagination",
    vitality: "Deep sensitivity to environments and sleep quality; needs lymphatic care and mindful boundaries.",
    careerPath: "Creative writing, cinema, psychotherapy, spiritual advisory, maritime trade, charitable ventures.",
    beneficPlanets: "Moon (5th Lord), Mars (2nd & 9th Lord), Jupiter (Lagna & 10th Lord)",
    maleficPlanets: "Venus (3rd & 8th Lord), Sun (6th Lord)",
    yogakaraka: "Mars acts as a key auspicious planet ruling the 9th house of grace and 2nd of wealth.",
    luckyGem: "Yellow Sapphire (Pukhraj), Natural Pearl, Red Coral",
    luckyColor: "Ocean Yellow, Seafoam Green, Lavender",
    deity: "Lord Vishnu / Sri Narayana",
  },
};

const faqs = [
  {
    q: "What is a Lagna (Ascendant) Calculator in Vedic Astrology?",
    a: "A Lagna Calculator calculates the exact zodiac sign that was rising on the eastern horizon at the precise minute and geographic coordinates of your birth. In Vedic astrology (Jyotish), the Lagna forms your 1st House (Tanu Bhava) and anchors your entire horoscope, dictating the house placements of all nine planets, your physical constitution, and your life path.",
  },
  {
    q: "How does the Lagna Calculator differ from a Western Rising Sign Calculator?",
    a: "Western astrology uses the Tropical (Sayana) zodiac, which is tied to seasonal equinoxes and ignores the Earth's axial wobble. AstroVaanii's Vedic Lagna Calculator uses the Sidereal (Nirayana) zodiac with Lahiri Ayanamsa (Chitra Paksha) powered by the Swiss Ephemeris. Because the Earth's axis precesses ~1 degree every 72 years, the Sidereal zodiac is currently about 24 degrees behind the Tropical zodiac, often placing your true Vedic Lagna in the preceding sign.",
  },
  {
    q: "Why is the exact time of birth critical to calculate Lagna accurately?",
    a: "The Earth completes a 360-degree rotation once every 24 hours. Because there are 12 zodiac signs, the rising sign shifts roughly every 2 hours (120 minutes), and in high latitudes, some signs rise in under 90 minutes. A mistake of just 10–15 minutes can flip your Lagna into an entirely different sign, altering all 12 houses and invalidating predictions.",
  },
  {
    q: "What is the difference between Lagna, Moon Sign (Rashi), and Sun Sign?",
    a: "In Vedic astrology, the Lagna represents your physical body, life direction, and outward personality (your personal reality). The Moon Sign (Chandra Rashi) represents your subconscious mind, emotional reactions, and inner perception. The Sun Sign (Surya Rashi) represents your soul purpose, father, and ego. Classical Vedic astrology prioritizes the Lagna and Moon Sign over the Sun Sign for life timing and daily events.",
  },
  {
    q: "What is the Lagna Lord (Lagnesh) and why is it the most important planet?",
    a: "The Lagna Lord (Lagnesh) is the planet governing your rising sign (for example, Mars for Aries and Scorpio, Venus for Taurus and Libra, Jupiter for Sagittarius and Pisces). The house position, dignity, and aspects received by your Lagnesh act as the steering wheel of your birth chart. A well-placed Lagnesh in a Kendra (1, 4, 7, 10) or Trikona (1, 5, 9) house confers robust vitality, resilience, and high social recognition.",
  },
  {
    q: "What is Vargottama Lagna and why is it considered fortunate?",
    a: "Vargottama Lagna occurs when your rising sign in the main birth chart (D1 Rashi) is identical to your rising sign in the 9th harmonic divisional chart (D9 Navamsha). Ancient texts such as Brihat Parashara Hora Shastra praise Vargottama Lagna because it anchors unwavering focus, strong mental resilience, and divine protection during difficult planetary transits.",
  },
  {
    q: "What if I do not know my exact time of birth?",
    a: "If your birth time is uncertain within a few hours, you can enter the approximate time to see the nearest Lagna, but you should not rely on it for critical decisions. Astrologers perform Birth Time Rectification (BTR) by correlating significant life events (marriages, career shifts, accidents, relocations) with past Vimshottari Dasha timelines to calibrate your exact birth minute. You can also chat with Vaanii on AstroVaanii for horary questions (Prashna Kundli) which require no birth time.",
  },
  {
    q: "Which Lagna sign is considered the best or most powerful?",
    a: "No single Lagna is inherently superior. Each of the 12 Lagnas has a distinct karmic assignment. For example, Leo and Aries excel in leadership and enterprise; Taurus and Capricorn excel in wealth accumulation and institutional mastery; Cancer and Pisces possess extraordinary spiritual and emotional depth; Gemini and Libra lead in intellect and commerce. Success depends on the strength of your Lagna Lord and auspicious Yogakaraka planets.",
  },
  {
    q: "What is a Yogakaraka planet in a Lagna chart?",
    a: "A Yogakaraka is a single planet that simultaneously rules an auspicious Kendra house (pillar of action: 4th, 7th, 10th) and a Trikona house (triangle of luck: 5th, 9th). For Taurus and Libra Lagnas, Saturn is Yogakaraka. For Cancer and Leo Lagnas, Mars is Yogakaraka. For Capricorn and Aquarius Lagnas, Venus is Yogakaraka. When the Yogakaraka planet is activated during its Mahadasha, it brings great prosperity and achievement.",
  },
  {
    q: "How does my Lagna interact with my current Vimshottari Mahadasha?",
    a: "Your Lagna serves as the baseline lens for your entire chart. The active Mahadasha planet is interpreted by examining which house it rules and occupies from the Lagna. For example, if you are a Scorpio Lagna and run Jupiter Mahadasha (Jupiter rules your 2nd house of wealth and 5th house of intellect), you will experience prominent themes of financial gain, higher learning, and family growth during that period.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Lagna Calculator - Find Vedic Ascendant & Rising Sign | AstroVaanii",
  url: "https://astrovaanii.in/lagna-calculator",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free online Vedic Lagna Calculator using Swiss Ephemeris and Lahiri Ayanamsa. Calculate your accurate Ascendant sign, exact degrees, Lagnesh, and Lagna Nakshatra.",
  featureList: [
    "Accurate Swiss Ephemeris calculations",
    "Lahiri (Chitra Paksha) Ayanamsa",
    "Exact Lagna degrees, minutes and seconds",
    "Lagna Lord (Lagnesh) placement analysis",
    "Lagna Nakshatra and Pada calculation",
    "Interactive North Indian Lagna Chart visualizer",
    "Instant AI astrology synthesis with Vaanii",
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Free Lagna Calculator: Find Your Vedic Ascendant & Rising Sign Online",
  description:
    "Calculate your exact Lagna (Ascendant) sign, degrees, and Lagna Lord with Swiss Ephemeris accuracy. Learn the core blueprint of your Vedic horoscope.",
  mainEntityOfPage: "https://astrovaanii.in/lagna-calculator",
  author: {
    "@type": "Organization",
    name: "AstroVaanii",
    url: "https://astrovaanii.in",
  },
  publisher: {
    "@type": "Organization",
    name: "AstroVaanii",
    logo: {
      "@type": "ImageObject",
      url: "https://astrovaanii.in/astrovaanii.png",
    },
  },
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
  mainEntity: faqs.map((f) => ({
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
      { title: "Free Lagna Calculator: Find Your Vedic Ascendant & Rising Sign Online" },
      {
        name: "description",
        content:
          "Calculate your accurate Lagna (Ascendant) sign, exact degrees, and Lagna Lord instantly with AstroVaanii's free Vedic astrology calculator. Accurate Swiss Ephemeris calculations.",
      },
      {
        name: "keywords",
        content:
          "lagna calculator, free lagna calculator, vedic ascendant calculator, rising sign calculator, calculate lagna online, lagnesh calculator, lagna chart calculator, ascendant sign by date of birth",
      },
      { property: "og:title", content: "Free Lagna Calculator: Find Your Vedic Ascendant & Rising Sign Online" },
      {
        property: "og:description",
        content:
          "Find your true Vedic Ascendant (Lagna) sign, exact degrees, Lagna Lord, and Nakshatra with Swiss Ephemeris precision on AstroVaanii.",
      },
      { property: "og:url", content: "https://astrovaanii.in/lagna-calculator" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/what-is-lagna-in-astrology.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free Lagna Calculator: Vedic Ascendant & Rising Sign" },
      {
        name: "twitter:description",
        content:
          "Calculate your exact Vedic Lagna sign, Lagna Lord, and rising degree with accurate Swiss Ephemeris calculations.",
      },
      { name: "twitter:image", content: "/what-is-lagna-in-astrology.webp" },
    ],
    links: [
      { rel: "canonical", href: "https://astrovaanii.in/lagna-calculator" },
      { rel: "preload", href: "/what-is-lagna-in-astrology.webp", as: "image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(webAppJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(articleJsonLd) },
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
      setError("Please select your birthplace from the suggestion dropdown to calculate exact coordinates.");
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
  const insights = LAGNA_INSIGHTS[ascSignName];

  // Calculate Lagna Nakshatra & Pada directly
  const ascLon = chart?.ascendant ?? 0;
  const lagnaNakIdx = Math.floor(ascLon / 13.3333333) % 27;
  const lagnaPada = Math.floor((ascLon % 13.3333333) / 3.3333333) + 1;
  const lagnaNakName = NAKSHATRAS[lagnaNakIdx] || "";
  const lagnaNakLord = NAKSHATRA_LORDS[lagnaNakIdx] || "";

  // Find Lagna Lord's placed house
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

      {/* Hero & Intro */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-10 text-center">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Authentic Vedic Astrology Tool
            </p>
            <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl lg:text-6xl tracking-tight">
              Free Lagna Calculator
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Find your exact Vedic Ascendant (Lagna) sign, rising degree, and Lagna Lord (Lagnesh) instantly.
              Computed with high-precision <strong className="text-foreground">Swiss Ephemeris</strong> and true{" "}
              <strong className="text-foreground">Lahiri Ayanamsa</strong>.
            </p>
          </div>
        </Reveal>

        {/* Calculator Form */}
        {status === "form" && (
          <Reveal delay={100}>
            <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-border bg-card/85 p-6 md:p-8 shadow-2xl backdrop-blur-md text-left">
              <h2 className="font-display text-xl text-foreground mb-1">Enter Your Exact Birth Details</h2>
              <p className="text-xs text-muted-foreground mb-6">
                Lagna changes every 2 hours. Accurate birth time and city ensure exact astronomical degrees.
              </p>

              {error && (
                <div className="mb-5 rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive">
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
                    placeholder="Start typing your birth city (e.g., Delhi, Mumbai, New York)"
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
                          className="w-full px-4 py-2.5 text-left text-xs transition hover:bg-background/80 border-b border-border/30 last:border-b-0"
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
                Calculate My Lagna Sign Now
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">🔒 100% Private & Free</span>
                <span className="flex items-center gap-1">⚡ Instant Swiss Ephemeris</span>
                <span className="flex items-center gap-1">☸ Lahiri Ayanamsa</span>
              </div>
            </div>
          </Reveal>
        )}

        {status === "loading" && (
          <div className="mx-auto mt-12 max-w-md rounded-3xl border border-border bg-card/80 p-10 text-center shadow-xl">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-5 font-display text-lg text-foreground">Computing Exact Ascendant Degrees...</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Aligning Swiss Ephemeris planetary positions and Lahiri Ayanamsa...
            </p>
          </div>
        )}

        {/* RESULTS SECTION */}
        {status === "result" && chart && (
          <div className="mx-auto mt-10 max-w-4xl text-left space-y-8">
            {/* Primary Result Banner */}
            <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-card via-card/90 to-primary/10 p-6 md:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/60 pb-6">
                <div>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
                    {name ? `${name}'s Vedic Ascendant` : "Your Vedic Ascendant (Lagna)"}
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-4xl md:text-5xl font-display text-foreground">
                      {sanskritInfo.sanskrit}
                    </span>
                    <span className="text-3xl text-primary font-bold">
                      {SIGN_GLYPHS[ascSignName] || "♈"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Ascendant Degree: <strong className="text-foreground">{formatDegreeDMS(chart.ascendantDegree)}</strong> in {ascSignName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-background/60 p-4 rounded-2xl border border-border/50">
                  <div>
                    <span className="text-muted-foreground block">Lagna Lord (Lagnesh):</span>
                    <strong className="text-foreground font-semibold text-sm">{lagneshName}</strong>
                    {lagneshPlacement && (
                      <span className="text-[11px] text-primary block">
                        in {lagneshPlacement.signName} (House {lagneshPlacement.house})
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
                    <span className="text-muted-foreground block">Sign Modality:</span>
                    <strong className="text-foreground font-semibold">{sanskritInfo.nature}</strong>
                  </div>
                </div>
              </div>

              {/* The Vedic Identity Trio: Lagna vs Moon vs Sun */}
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Your Core Vedic Astro Identity Trio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
                    <span className="text-[11px] font-semibold uppercase text-primary tracking-wide">
                      1. Lagna (Ascendant)
                    </span>
                    <p className="text-lg font-display text-foreground mt-1">{ascSignName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your physical body, health, vitality, public persona, and real-world karma.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/50 p-4">
                    <span className="text-[11px] font-semibold uppercase text-sky-500 tracking-wide">
                      2. Moon Sign (Chandra Rashi)
                    </span>
                    <p className="text-lg font-display text-foreground mt-1">
                      {chart.planets["Moon"]?.signName || "-"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your subconscious mind, emotional instinct, feelings, and memory patterns.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/50 p-4">
                    <span className="text-[11px] font-semibold uppercase text-amber-500 tracking-wide">
                      3. Sun Sign (Surya Rashi)
                    </span>
                    <p className="text-lg font-display text-foreground mt-1">
                      {chart.planets["Sun"]?.signName || "-"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your soul core (Atma), inherent willpower, father archetype, and inner spark.
                    </p>
                  </div>
                </div>
              </div>

              {/* Archetypal Lagna Breakdown */}
              {insights && (
                <div className="mt-6 rounded-2xl border border-border/80 bg-background/70 p-5 space-y-4">
                  <div>
                    <h3 className="font-display text-lg text-foreground">
                      Key Blueprint for {ascSignName} Ascendant
                    </h3>
                    <p className="text-xs text-primary font-medium mt-0.5">{insights.tagline}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div>
                      <span className="text-muted-foreground font-medium block">Physical Vitality & Temperament:</span>
                      <p className="text-foreground mt-0.5 leading-relaxed">{insights.vitality}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium block">Natural Career Synergy:</span>
                      <p className="text-foreground mt-0.5 leading-relaxed">{insights.careerPath}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium block">Auspicious Planets (Benefics):</span>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">{insights.beneficPlanets}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium block">Challenging Planets (Malefics/Marakas):</span>
                      <p className="text-rose-600 dark:text-rose-400 font-medium mt-0.5">{insights.maleficPlanets}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium block">Supreme Yogakaraka:</span>
                      <p className="text-primary font-medium mt-0.5">{insights.yogakaraka}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium block">Auspicious Gemstone & Color:</span>
                      <p className="text-foreground mt-0.5">{insights.luckyGem} • {insights.luckyColor}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Ask Vaanii Interactive Integration Callout */}
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-base text-foreground">
                    Have deep questions about your {ascSignName} Lagna?
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Ask Vaanii about career timings, relationship compatibilities, or current planetary transits.
                  </p>
                </div>
                <Link
                  to="/signup"
                  className="whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-95 shadow-md"
                >
                  Ask Vaanii AI Now
                </Link>
              </div>

              {/* Reset button */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStatus("form");
                    setChart(null);
                  }}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  &larr; Calculate Another Birth Chart
                </button>
              </div>
            </div>

            {/* North Indian Lagna Chart Visualizer */}
            <div className="rounded-3xl border border-border bg-card/80 p-6 md:p-8 shadow-xl">
              <div className="text-center mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Vedic Janam Kundli
                </p>
                <h3 className="font-display text-2xl text-foreground">
                  Your North Indian Lagna Chart (D1 Rashi)
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                  House 1 is the upper central diamond, anchored by your {ascSignName} Lagna. All 12 houses are numbered sequentially counter-clockwise.
                </p>
              </div>

              <NorthIndianLagnaChart chart={chart} />

              {/* Planetary Placements Table */}
              <div className="mt-8 overflow-x-auto">
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

      {/* 1500+ WORD DEEP SEO CONTENT & EDITORIAL ARTICLE */}
      <article className="relative z-10 border-t border-border bg-card/40 py-16">
        <div className="mx-auto max-w-4xl px-6 text-muted-foreground space-y-12">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              The Definitive Vedic Guide
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              What Is Lagna in Vedic Astrology? The Cosmic Anchor of Your Physical Incarnation
            </h2>
            <p className="leading-relaxed">
              In classical Sanskrit, the word <strong className="text-foreground">Lagna (लग्न)</strong> translates literally to <em>&ldquo;that which fastens, adheres, or unites.&rdquo;</em> In Vedic astrology (Jyotish), the Lagna is the precise astronomical degree of the zodiac ascending on the eastern horizon at the exact minute and geographic coordinates of your birth. It marks the first breath you draw into your lungs, sealing your soul&apos;s connection to the physical plane.
            </p>
            <p className="leading-relaxed">
              While contemporary Western pop-astrology fixates almost exclusively on your monthly Sun sign, classical Parashari Jyotish considers the <strong className="text-foreground">Ascendant (Lagna)</strong> to be the structural foundation of your entire horoscope. It establishes the <strong className="text-foreground">Tanu Bhava (1st House)</strong>, which defines:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Physical Constitution & Vitality:</strong> Your bone structure, cellular stamina, resistance to disease, and longevity (Ayu).</li>
              <li><strong>Inherent Temperament & Natural Reflexes:</strong> How your subconscious instinctively responds to unexpected danger, opportunities, and stress.</li>
              <li><strong>Public Image & First Impressions:</strong> The aura, presence, and visual impression you project when entering a room.</li>
              <li><strong>The Complete House Grid:</strong> The Lagna is the anchor that dictates which zodiac signs govern your 2nd house of wealth, 4th house of mother and domestic peace, 7th house of marriage, 9th house of dharma, and 10th house of career authority.</li>
            </ul>
            <p className="leading-relaxed">
              Without an accurate Lagna, a Vedic chart is like a map without a compass. Two individuals born on the very same calendar day will possess identical planetary positions for Jupiter, Saturn, Rahu, and Ketu. Yet, if one is born at 8:00 AM with a Gemini Lagna and the other at 12:00 PM with a Virgo Lagna, their life trajectories, health milestones, family dynamics, and financial fortunes will be completely different. Read our detailed guide on{" "}
              <Link to="/blogs/what-is-lagna-in-astrology" className="text-primary underline underline-offset-4 font-semibold hover:opacity-85">
                what is Lagna in astrology
              </Link>{" "}
              to explore its ancient origins in the Rig Veda and Surya Siddhanta.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">
              The Mathematics of Lagna: Why It Shifts Signs Every Two Hours
            </h2>
            <p className="leading-relaxed">
              The celestial sphere is divided into 360 degrees of the zodiac, spanning 12 distinct signs of 30 degrees each. Because the Earth completes a full axial rotation every 24 hours (1,440 minutes), the eastern horizon appears to travel through all 12 zodiac signs each day.
            </p>
            <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2 font-mono text-xs">
              <p className="text-foreground font-semibold">Mathematical Formula for Ascendant Progression:</p>
              <p>360° of Zodiac ÷ 24 Hours = 15° per Hour</p>
              <p>30° per Zodiac Sign ÷ 15° per Hour = ~2 Hours (120 Minutes) per Lagna Sign</p>
            </div>
            <p className="leading-relaxed">
              However, because the Earth&apos;s rotational axis is tilted at approximately 23.4 degrees, the speed at which signs rise varies depending on the latitude of the birthplace. In Vedic astronomy, signs are classified into <strong className="text-foreground">Signs of Long Ascension (Dirgha Rashi)</strong> and <strong className="text-foreground">Signs of Short Ascension (Hraswa Rashi)</strong>. In the Northern Hemisphere, signs like Leo, Virgo, Libra, and Scorpio take well over 2 hours to ascend, while signs like Pisces, Aries, and Taurus rise in as little as 90 minutes.
            </p>
            <p className="leading-relaxed">
              This astronomical reality is why our <strong className="text-foreground">Lagna Calculator</strong> requires your exact birthplace coordinates. The tool communicates with global geographic ephemeris databases to translate local civil time into Greenwich Mean Time (UTC), computes the Local Sidereal Time (LST), and pinpoints the exact degree on the eastern horizon using high-precision <strong className="text-foreground">Swiss Ephemeris</strong> algorithms.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">
              Sidereal vs. Tropical Zodiac: Why Your Vedic Lagna Is Different From Western Astrology
            </h2>
            <p className="leading-relaxed">
              One of the most frequent surprises for seekers calculating their birth chart on AstroVaanii is discovering that their Vedic Lagna is one sign behind their Western rising sign. If a Western horoscope calculator told you that you are a Scorpio Rising, our calculator may reveal that you are in fact a <strong className="text-foreground">Libra Lagna</strong>.
            </p>
            <p className="leading-relaxed">
              This divergence occurs because of the <strong className="text-foreground">Precession of the Equinoxes (Ayanamsa)</strong>:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-4 text-xs">
              <div className="rounded-2xl border border-border bg-background/50 p-4 space-y-2">
                <span className="font-semibold text-foreground uppercase tracking-wide">Western (Sayana / Tropical)</span>
                <p>
                  Fixed to the spring vernal equinox. Assumes 0° Aries begins at the equinox moment regardless of where the physical stars of Aries are actually located in the sky today.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                <span className="font-semibold text-primary uppercase tracking-wide">Vedic (Nirayana / Sidereal)</span>
                <p>
                  Fixed to real-sky observable fixed stars. Uses <strong className="text-foreground">Lahiri Ayanamsa (Chitra Paksha)</strong> to calibrate for the ~24-degree backward drift accumulated over the past 2,000 years.
                </p>
              </div>
            </div>
            <p className="leading-relaxed text-sm">
              Because the sidereal zodiac measures planetary placements against observable constellations, Vedic astrology captures the genuine gravitational and cosmic resonance of the heavens at your birth moment.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">
              The 12 Vedic Lagnas: Personality Archetypes & Life Paths
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♈</span> Mesha (Aries Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Mars. Natural pioneers, bold, energetic, and unapologetically decisive. You thrive when competing, leading groundbreaking projects, and setting independent agendas. Your challenge is learning patience and diplomatic finesse.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♉</span> Vrishabha (Taurus Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Venus. Patient, sensory, grounded, and financially prudent. You build enduring empires through methodical consistency. Saturn is your supreme Yogakaraka, granting immense professional authority through steady perseverance.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♊</span> Mithuna (Gemini Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Mercury. Inquisitive, versatile, articulate, and intellectually agile. You excel in communication, writing, commerce, and media. Your challenge lies in avoiding mental scatteredness and sustaining focus on long-term goals.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♋</span> Karka (Cancer Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by the Moon. Deeply empathetic, intuitive, fiercely protective of loved ones, and emotionally perceptive. Mars acts as your prime Yogakaraka, transforming your maternal intuition into formidable executive power.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♌</span> Simha (Leo Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by the Sun. Magnanimous, regal, honorable, and commanding natural respect. You possess a strong sense of destiny and creative vision. You must guard against ego clashes and authoritarian rigidity in personal relationships.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♍</span> Kanya (Virgo Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Mercury. Highly analytical, detail-oriented, service-minded, and exceptional at problem diagnosis. You bring order to chaos. You must beware of internal perfectionist anxiety and chronic over-criticism of self and others.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♎</span> Tula (Libra Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Venus. Diplomatic, aesthetic, justice-seeking, and relationship-centric. You possess refined commercial taste and negotiation finesse. Saturn is your ultimate Yogakaraka, conferring massive real estate and professional stability.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♏</span> Vrishchika (Scorpio Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Mars and Ketu. Intensely perceptive, secretive, regenerative, and possessing unyielding willpower. You perceive subterranean motives effortlessly. Your life journey involves monumental personal transformations and spiritual rebirth.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♐</span> Dhanu (Sagittarius Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Jupiter. Philosophical, optimistic, expansive, and devoted to righteousness (Dharma). You seek profound life meaning and thrive in higher learning, law, and advisory roles. Beware of dogmatism or restless impatience.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♑</span> Makara (Capricorn Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Saturn. Pragmatic, ambitious, disciplined, and possessing extraordinary resilience. You mature gracefully, often achieving your greatest triumphs in the second half of life. Venus is your supreme Yogakaraka.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♒</span> Kumbha (Aquarius Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Saturn and Rahu. Visionary, unconventional, egalitarian, and drawn to progressive humanitarian systems. You perceive technological and societal currents long before the mainstream. Venus is your key Yogakaraka.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5 space-y-2">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <span>♓</span> Meena (Pisces Lagna)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ruled by Jupiter. Mystical, imaginative, profoundly empathetic, and spiritually attuned. You possess an innate connection to universal consciousness. Your task is grounding your transcendent vision in practical daily execution.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">
              The Role of Lagnesh (Lagna Lord): The Captain of Your Chart
            </h2>
            <p className="leading-relaxed">
              In Vedic astrology, the planet that rules your rising sign is designated as the <strong className="text-foreground">Lagnesh (Ascendant Lord)</strong>. While every planet influences a specific chapter of your life, the Lagnesh represents <em>you</em>—your physical body, life momentum, and personal free will.
            </p>
            <p className="leading-relaxed">
              The house where your Lagnesh is placed reveals where your life energy will naturally concentrate:
            </p>
            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <strong className="text-foreground font-semibold">Lagnesh in Kendra Houses (1st, 4th, 7th, 10th):</strong>
                <p className="mt-1">
                  Grants high social visibility, public reputation, strong physical vitality, and active leadership opportunities. When placed in the 10th house, career recognition and worldly accomplishment are virtually guaranteed.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <strong className="text-foreground font-semibold">Lagnesh in Trikona Houses (1st, 5th, 9th):</strong>
                <p className="mt-1">
                  Activates Lakshmi Sthana (divine grace and accumulated past-life merit). Bestows acute intellect, moral dignity, higher education success, and financial ease.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <strong className="text-foreground font-semibold">Lagnesh in Upachaya Houses (3rd, 6th, 10th, 11th):</strong>
                <p className="mt-1">
                  Houses of steady growth. Indicates that success compounds over time through deliberate grit, overcoming competitors, and networking.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <strong className="text-foreground font-semibold">Lagnesh in Dusthana Houses (6th, 8th, 12th):</strong>
                <p className="mt-1">
                  Indicates karmic obstacles, sudden life pivots, healing abilities, research brilliance, foreign relocations, or profound spiritual detachment.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Next Steps & Tools Interlinking */}
          <section className="rounded-3xl border border-border bg-gradient-to-br from-card to-background p-6 md:p-8 space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              What to Check After Finding Your Lagna Sign
            </h2>
            <p className="text-sm leading-relaxed">
              Calculating your Lagna is the essential first milestone. To unlock the full depth of your Vedic horoscope, explore these free tools on AstroVaanii:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-xs pt-2">
              <Link
                to="/free-kundli"
                className="group rounded-xl border border-border bg-card/60 p-3.5 transition hover:border-primary/40 hover:bg-card"
              >
                <strong className="text-foreground group-hover:text-primary transition-colors block">
                  Free Janam Kundli Generator &rarr;
                </strong>
                <span className="text-muted-foreground mt-0.5 block">
                  View full 12 house planetary divisions and divisional charts.
                </span>
              </Link>
              <Link
                to="/vimshottari-dasha-calculator"
                className="group rounded-xl border border-border bg-card/60 p-3.5 transition hover:border-primary/40 hover:bg-card"
              >
                <strong className="text-foreground group-hover:text-primary transition-colors block">
                  Vimshottari Dasha Calculator &rarr;
                </strong>
                <span className="text-muted-foreground mt-0.5 block">
                  Check which Mahadasha and Antardasha is currently active in your life.
                </span>
              </Link>
              <Link
                to="/kundali-matching"
                className="group rounded-xl border border-border bg-card/60 p-3.5 transition hover:border-primary/40 hover:bg-card"
              >
                <strong className="text-foreground group-hover:text-primary transition-colors block">
                  Kundali Matching (Gun Milan) &rarr;
                </strong>
                <span className="text-muted-foreground mt-0.5 block">
                  Assess marriage compatibility out of 36 points using Ashta Koota.
                </span>
              </Link>
              <Link
                to="/kaal-sarp-dosha-calculator"
                className="group rounded-xl border border-border bg-card/60 p-3.5 transition hover:border-primary/40 hover:bg-card"
              >
                <strong className="text-foreground group-hover:text-primary transition-colors block">
                  Kaal Sarp Dosha Calculator &rarr;
                </strong>
                <span className="text-muted-foreground mt-0.5 block">
                  Determine if all classical planets fall within the Rahu-Ketu nodal axis.
                </span>
              </Link>
            </div>
            <div className="pt-2 text-xs text-muted-foreground">
              Interested in how artificial intelligence decodes planetary positions? Read our research on{" "}
              <Link to="/blogs/how-ai-reads-your-birth-chart" className="text-primary underline underline-offset-4 font-semibold hover:opacity-85">
                how AI reads your birth chart
              </Link>{" "}
              or discover the{" "}
              <Link to="/blogs/top-5-ai-astrology-platform-in-india" className="text-primary underline underline-offset-4 font-semibold hover:opacity-85">
                top 5 AI astrology platforms in India
              </Link>.
            </div>
          </section>

          {/* Section 7: FAQs Accordion */}
          <section className="space-y-6 pt-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Got Questions?
              </span>
              <h2 className="mt-1 font-display text-2xl md:text-3xl text-foreground">
                Frequently Asked Questions About Lagna (Ascendant)
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card/70 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left font-medium text-foreground hover:bg-accent/30 transition-colors text-sm md:text-base"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span className="text-primary text-xl font-bold ml-2 shrink-0">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-4 md:px-5 pb-5 text-xs md:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>
      </article>

      {/* BOTTOM SECTION CTA: Prominent Signup / Free Chat Callout */}
      <section className="relative z-10 border-t border-border bg-gradient-to-b from-card/60 via-card to-background py-16 px-6">
        <div className="mx-auto max-w-4xl text-center rounded-3xl border border-primary/30 bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent p-8 md:p-12 shadow-2xl space-y-5">
          <span className="rounded-full bg-primary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary inline-block">
            100% Free AI Astrologer
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Hey, Chat with Vaanii for Completely Free Now!
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
            Have questions about your rising sign, career prospects, love life, or upcoming Mahadasha?
            Vaanii analyzes your precise Swiss Ephemeris birth chart and gives you deep, empathetic, authentic Vedic answers instantly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/signup"
              className="rounded-full bg-primary px-8 py-3.5 text-sm md:text-base font-semibold text-primary-foreground shadow-xl transition-transform hover:scale-105 hover:opacity-95"
            >
              Start Free Chat with Vaanii &rarr;
            </Link>
            <Link
              to="/ai-astrologer"
              className="rounded-full border border-border bg-card/80 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-background transition-colors"
            >
              Learn More About Vaanii
            </Link>
          </div>
          <p className="text-[11px] text-muted-foreground pt-2">
            No credit card required • Instant access in 9 Indian languages • 100% Confidential
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/40 py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={brandIcon} alt="" width={24} height={24} className="h-6 w-6" />
            <span className="font-display text-base text-foreground">AstroVaanii</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
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
    <div className="relative mx-auto w-full max-w-[420px] aspect-square">
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
