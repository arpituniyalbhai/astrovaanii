import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import featuredImage from "@/assets/what-is-lagna-in-astrology.webp";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import { DashaCalculatorCallout } from "@/components/landing/DashaCalculatorCallout";

export const Route = createFileRoute("/blogs/what-is-lagna-in-astrology")({
  head: () => ({
    meta: [
      { title: "What Is Lagna (Ascendant) in Astrology? Complete Beginner's Guide" },
      {
        name: "description",
        content:
          "Lagna (Ascendant or Rising Sign) in Vedic astrology is the zodiac sign rising on the eastern horizon at birth. Learn how Lagna is calculated, its 12 signs, and chart reading.",
      },
      { property: "og:image", content: "/what-is-lagna-in-astrology.webp" },
      { property: "og:image:width", content: "600" },
      { property: "og:image:height", content: "600" },
      {
        property: "og:title",
        content: "What Is Lagna (Ascendant) in Astrology? Complete Beginner's Guide",
      },
      {
        property: "og:description",
        content:
          "Master the concept of Lagna (Ascendant). Learn how it forms your First House, rules physical appearance, and shapes your horoscope with interactive Kundli diagrams.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/what-is-lagna-in-astrology.webp" },
      { name: "twitter:title", content: "What Is Lagna (Ascendant) in Astrology? Beginner Guide" },
      {
        name: "twitter:description",
        content:
          "Learn what Lagna (Ascendant) means in Vedic astrology, how it is calculated, and what each rising sign reveals.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://astrovaanii.in/blogs/what-is-lagna-in-astrology" },
      { rel: "preload", href: "/what-is-lagna-in-astrology.webp", as: "image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(articleJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(howToJsonLd) },
    ],
  }),
  component: WhatIsLagnaPage,
});

const faqs = [
  {
    q: "What is Lagna (Ascendant) in astrology?",
    a: "Lagna (Sanskrit: लग्न) is the exact zodiac sign that was ascending on the eastern horizon at the precise minute and geographic coordinates of your birth. It marks your First House and anchors your entire horoscope.",
  },
  {
    q: "What is the difference between Lagna and Ascendant?",
    a: "There is no functional difference. 'Lagna' is the traditional Sanskrit term used in Vedic astrology (Jyotish), while 'Ascendant' or 'Rising Sign' is the Western astrology terminology. Both refer to the rising degree on the eastern sky at birth.",
  },
  {
    q: "Which Lagna is most powerful in Vedic astrology?",
    a: "No single Lagna sign is inherently superior. However, classical texts like Brihat Parashara Hora Shastra note that Lagnas ruled by natural benefics (Jupiter, Venus, Mercury) or strong Kendra-Trikona rulers tend to provide smoother life integration, while all 12 Lagnas possess unique cosmic strengths.",
  },
  {
    q: "How do I know my Lagna sign?",
    a: "To find your Lagna sign, you need your exact date of birth, exact time of birth (to the minute), and city of birth. Entering these details into a high-precision Swiss Ephemeris calculator will reveal your exact Lagna degrees and First House sign.",
  },
  {
    q: "Is Lagna the same as the rising sign?",
    a: "Yes. Lagna and rising sign refer to the exact same astronomical placement—the sign appearing on the eastern horizon at your birth moment.",
  },
  {
    q: "Can my Lagna sign change during my lifetime?",
    a: "No. Your Lagna is permanently fixed based on the exact second and location of your birth. It remains your physical anchor for your entire life, though planetary periods (Dashas) shift which areas of your chart are highlighted over time.",
  },
  {
    q: "Which is more accurate for predictions: Lagna or Moon sign?",
    a: "Vedic astrology prioritizes the Lagna for predicting physical events, career milestones, health conditions, and real-world outcomes. The Moon sign (Chandra Rashi) evaluates emotional peace, mental health, and internal perceptions. Both are essential, but Lagna forms the structural foundation.",
  },
  {
    q: "What happens if I do not know my exact birth time?",
    a: "Because the Lagna changes roughly every 2 hours, an imprecise birth time can alter your First House sign and shift every house in your chart. Astrologers perform Birth Time Rectification (BTR) by matching significant life events against past Dasha timelines to pinpoint your exact birth minute.",
  },
  {
    q: "What is the Lagna Lord (Lagnesh) and why is it important?",
    a: "The Lagna Lord (Lagnesh) is the planet that rules your rising sign (e.g., Mars for Aries Lagna, Venus for Taurus Lagna). The strength and house placement of your Lagnesh acts as your primary life guide, governing vitality, self-confidence, and resilience.",
  },
  {
    q: "What is Vargottama Lagna?",
    a: "Vargottama Lagna occurs when your rising sign in the main birth chart (D1 Rashi Chart) is identical to your rising sign in the harmonic ninth divisional chart (D9 Navamsha Chart). It grants extraordinary mental clarity, steadfast purpose, and strong protection.",
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

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is Lagna (Ascendant) in Astrology? Complete Beginner's Guide",
  description:
    "A comprehensive 2,000+ word guide to understanding Lagna (Rising Sign) in traditional Vedic astrology, how it is calculated, its astronomical significance, and interactive Kundli charts.",
  image: "https://astrovaanii.in/what-is-lagna-in-astrology.webp",
  author: {
    "@type": "Organization",
    name: "AstroVaanii Research Team",
    url: "https://astrovaanii.in",
  },
  publisher: {
    "@type": "Organization",
    name: "AstroVaanii",
    url: "https://astrovaanii.in",
    logo: {
      "@type": "ImageObject",
      url: "https://astrovaanii.in/astrovaanii-logo.webp",
    },
  },
  datePublished: "2026-07-28",
  dateModified: "2026-07-28",
  mainEntityOfPage: "https://astrovaanii.in/blogs/what-is-lagna-in-astrology",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://astrovaanii.in" },
    { "@type": "ListItem", position: 2, name: "Blogs", item: "https://astrovaanii.in/blogs" },
    {
      "@type": "ListItem",
      position: 3,
      name: "What Is Lagna (Ascendant) in Astrology?",
      item: "https://astrovaanii.in/blogs/what-is-lagna-in-astrology",
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Your Lagna (Ascendant) Sign",
  description:
    "Step-by-step instructions to determine your exact rising sign (Lagna) using Vedic astronomical calculations.",
  step: [
    {
      "@type": "HowToStep",
      name: "Obtain Exact Birth Details",
      text: "Gather your exact calendar date of birth, precise birth time to the minute, and geographic place of birth.",
    },
    {
      "@type": "HowToStep",
      name: "Convert Coordinates & Time Zone",
      text: "Convert your birth location into precise latitude and longitude coordinates and calculate Greenwich Mean Time (GMT) offset.",
    },
    {
      "@type": "HowToStep",
      name: "Compute Eastern Horizon Degree",
      text: "Use high-precision astronomical algorithms like the Swiss Ephemeris with Sidereal Lahiri Ayanamsa to calculate which zodiac sign was crossing the eastern horizon at that minute.",
    },
    {
      "@type": "HowToStep",
      name: "Cast the First House",
      text: "Place the rising sign into the First House of your Janma Kundli to establish all 12 house positions.",
    },
  ],
};

function NorthIndianKundliSvg() {
  const [selectedHouse, setSelectedHouse] = useState<number>(1);

  const houseDetails = [
    {
      h: 1,
      sign: "1 (Aries)",
      name: "1st House (Lagna / Ascendant)",
      desc: "Physical Body, Personality, Self, Head, Overall Life Orientation & Vitality.",
    },
    {
      h: 2,
      sign: "2 (Taurus)",
      name: "2nd House (Dhana Bhava)",
      desc: "Wealth, Family, Speech, Assets, Eyes, Food Habits.",
    },
    {
      h: 3,
      sign: "3 (Gemini)",
      name: "3rd House (Sahaja Bhava)",
      desc: "Younger Siblings, Courage, Communication, Short Travels, Hands & Arms.",
    },
    {
      h: 4,
      sign: "4 (Cancer)",
      name: "4th House (Sukha Bhava)",
      desc: "Mother, Home, Domestic Happiness, Vehicles, Land & Real Estate, Heart.",
    },
    {
      h: 5,
      sign: "5 (Leo)",
      name: "5th House (Putra Bhava)",
      desc: "Children, Intelligence, Education, Past Karma (Purva Punya), Romance.",
    },
    {
      h: 6,
      sign: "6 (Virgo)",
      name: "6th House (Ari Bhava)",
      desc: "Health, Disease, Debts, Enemies, Service, Daily Work Routine.",
    },
    {
      h: 7,
      sign: "7 (Libra)",
      name: "7th House (Yuvati Bhava)",
      desc: "Spouse, Marriage, Business Partnerships, Public Interaction.",
    },
    {
      h: 8,
      sign: "8 (Scorpio)",
      name: "8th House (Randhra Bhava)",
      desc: "Longevity, Transformation, Sudden Events, Occult, Joint Finances.",
    },
    {
      h: 9,
      sign: "9 (Sagittarius)",
      name: "9th House (Dharma Bhava)",
      desc: "Higher Learning, Father, Guru, Fortune (Bhagya), Spirituality, Long Journeys.",
    },
    {
      h: 10,
      sign: "10 (Capricorn)",
      name: "10th House (Karma Bhava)",
      desc: "Career, Profession, Reputation, Social Standing, Action & Achievement.",
    },
    {
      h: 11,
      sign: "11 (Aquarius)",
      name: "11th House (Labha Bhava)",
      desc: "Gains, Income, Elder Siblings, Social Networks, Desires & Goals.",
    },
    {
      h: 12,
      sign: "12 (Pisces)",
      name: "12th House (Vyaya Bhava)",
      desc: "Losses, Expenditures, Foreign Lands, Liberation (Moksha), Sleep & Subconscious.",
    },
  ];

  return (
    <div className="my-8 rounded-2xl border border-primary/30 bg-card/60 p-6 space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Interactive Diagram
        </span>
        <h3 className="font-display text-2xl font-semibold text-foreground">
          North Indian Style Kundli Chart (Diamond Layout)
        </h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          In North Indian astrology, house positions are <strong>fixed</strong>. The top central
          diamond is ALWAYS the First House (Lagna). Click any house to see its meaning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Canvas */}
        <div className="relative mx-auto w-full max-w-[340px] aspect-square">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full text-foreground drop-shadow-md select-none"
            aria-label="North Indian Kundli Chart Diagram showing 12 fixed houses"
          >
            <title>North Indian Kundli Diagram</title>
            {/* Outer Box */}
            <rect
              x="0"
              y="0"
              width="400"
              height="400"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-border"
            />
            <line
              x1="0"
              y1="0"
              x2="400"
              y2="400"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border/70"
            />
            <line
              x1="400"
              y1="0"
              x2="0"
              y2="400"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border/70"
            />
            <polygon
              points="200,0 400,200 200,400 0,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/60"
            />

            {/* 12 House Polygons */}
            <polygon
              points="200,0 300,100 200,200 100,100"
              onClick={() => setSelectedHouse(1)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 1
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-primary/10 hover:fill-primary/20 stroke-primary/40"
              }`}
            />
            <polygon
              points="0,0 200,0 100,100"
              onClick={() => setSelectedHouse(2)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 2
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="0,0 100,100 0,200"
              onClick={() => setSelectedHouse(3)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 3
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="0,200 100,100 200,200 100,300"
              onClick={() => setSelectedHouse(4)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 4
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="0,200 100,300 0,400"
              onClick={() => setSelectedHouse(5)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 5
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="0,400 100,300 200,400"
              onClick={() => setSelectedHouse(6)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 6
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="200,200 300,300 200,400 100,300"
              onClick={() => setSelectedHouse(7)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 7
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="200,400 300,300 400,400"
              onClick={() => setSelectedHouse(8)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 8
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="400,200 300,300 400,400"
              onClick={() => setSelectedHouse(9)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 9
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="200,200 300,100 400,200 300,300"
              onClick={() => setSelectedHouse(10)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 10
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="400,0 300,100 400,200"
              onClick={() => setSelectedHouse(11)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 11
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />
            <polygon
              points="200,0 300,100 400,0"
              onClick={() => setSelectedHouse(12)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedHouse === 12
                  ? "fill-primary/30 stroke-primary stroke-[3]"
                  : "fill-card/40 hover:fill-primary/10 stroke-border/60"
              }`}
            />

            {/* Labels */}
            <text
              x="200"
              y="80"
              textAnchor="middle"
              className="fill-primary font-bold text-lg pointer-events-none"
            >
              1 (La)
            </text>
            <text
              x="200"
              y="115"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              LAGNA
            </text>
            <text
              x="100"
              y="45"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              2
            </text>
            <text
              x="45"
              y="100"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              3
            </text>
            <text
              x="100"
              y="205"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              4
            </text>
            <text
              x="45"
              y="310"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              5
            </text>
            <text
              x="100"
              y="365"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              6
            </text>
            <text
              x="200"
              y="310"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              7
            </text>
            <text
              x="300"
              y="365"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              8
            </text>
            <text
              x="355"
              y="310"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              9
            </text>
            <text
              x="300"
              y="205"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              10
            </text>
            <text
              x="355"
              y="100"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              11
            </text>
            <text
              x="300"
              y="45"
              textAnchor="middle"
              className="fill-foreground font-semibold text-xs pointer-events-none"
            >
              12
            </text>
          </svg>
        </div>

        {/* Info Card */}
        <div className="space-y-4 rounded-xl bg-background/80 border border-border p-5">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              House Details
            </span>
            <span className="text-xs font-mono text-muted-foreground">Click house to view</span>
          </div>
          <h4 className="font-display text-xl font-semibold text-foreground">
            {houseDetails[selectedHouse - 1].name}
          </h4>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {houseDetails[selectedHouse - 1].desc}
          </p>
          <div className="pt-2">
            <span className="inline-block text-xs font-medium text-muted-foreground">
              Zodiac Sign in Example:{" "}
              <strong className="text-primary">{houseDetails[selectedHouse - 1].sign}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Crawlable Accessible Data List for Search Engines */}
      <details className="mt-4 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-medium text-primary hover:underline">
          View Complete Crawlable House List (Search Engine Accessibility)
        </summary>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-border/40">
          {houseDetails.map((h) => (
            <div key={h.h} className="p-2 rounded border border-border/40 bg-background/50">
              <dt className="font-semibold text-foreground">{h.name}</dt>
              <dd className="text-muted-foreground mt-1">{h.desc}</dd>
            </div>
          ))}
        </dl>
      </details>
    </div>
  );
}

function WhatIsLagnaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={brandIcon}
              alt="AstroVaanii Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-display text-xl">
              Astro<span className="text-primary">Vaanii</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/blogs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Blogs
            </Link>
            <Link to="/free-kundli" className="text-sm font-medium text-primary hover:underline">
              Free Kundli
            </Link>
            <Link
              to="/ai-astrologer"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Chat with Vaanii
            </Link>
          </div>
        </div>
      </header>

      {/* Main Article Container */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/blogs" className="hover:text-foreground">
            Blogs
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">What Is Lagna in Astrology?</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Vedic Astrology Guide
          </span>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl leading-tight">
            What Is Lagna (Ascendant) in Astrology? Complete Beginner's Guide
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Lagna (Ascendant or Rising Sign) in Vedic astrology is the exact zodiac sign ascending
            on the eastern horizon at birth, ruling your physical body, temperament, and entire
            birth chart.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-b border-border/50 pb-6">
            <span>
              By <strong className="text-foreground">AstroVaanii Editorial Team</strong>
            </span>
            <span>•</span>
            <span>Published July 28, 2026</span>
            <span>•</span>
            <span>12 min read (2,100+ words)</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="my-8 overflow-hidden rounded-2xl border border-border/60 shadow-lg">
          <img
            src={featuredImage}
            alt="Illustration of the eastern horizon with zodiac wheel showing the rising sign at birth"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Quick Answer Featured Snippet Container */}
        <section
          id="quick-answer"
          className="my-8 rounded-2xl bg-primary/10 border border-primary/30 p-6 space-y-3"
        >
          <h2 className="font-display text-xl text-primary font-semibold">
            Quick Answer: What Is Lagna (Ascendant)?
          </h2>
          <p className="text-base leading-relaxed text-foreground font-medium">
            Lagna (Sanskrit: लग्न) in Vedic astrology is the exact zodiac sign that was rising on
            the eastern horizon at the precise minute and geographic coordinates of your birth.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            In a natal chart (Janma Kundli), the Lagna forms the <strong>First House</strong>. It
            anchors all 12 houses and determines how planetary energies manifest in your physical
            body, appearance, health, personality, and life path. Because the Earth rotates 360
            degrees every 24 hours, the Lagna changes roughly every 2 hours.
          </p>
        </section>

        {/* Article Body Prose (2,000+ words) */}
        <article className="prose prose-stone dark:prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed text-base">
          <p>
            Lagna (Ascendant or Rising Sign) in Vedic astrology is the exact zodiac sign ascending
            on the eastern horizon at your birth moment, forming the foundation of your entire
            horoscope. When you step into traditional Vedic astrology (Jyotish), one word comes up
            constantly: <strong>Lagna</strong>. While Western astrology popularized Sun signs
            through monthly horoscopes, classical Vedic scriptures like{" "}
            <em>Brihat Parashara Hora Shastra (BPHS)</em> treat your Lagna as the true anchor of
            your physical existence.
          </p>

          <p>
            Understanding your Lagna opens the door to reading your birth chart (Janma Kundli) with
            absolute clarity. As someone who builds high-precision calculation engines for{" "}
            <Link to="/" className="text-primary font-medium underline">
              AstroVaanii
            </Link>
            , I can confirm that verifying your exact Lagna is the single most critical step in
            personal astrological prediction. It determines your physical stature, immunity, core
            temperament, baseline psychological filters, and how the external world responds to your
            presence.
          </p>

          <hr className="border-border/60" />

          {/* Section 1: Classical Foundations */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              The Astronomical and Spiritual Foundations of Lagna
            </h2>
            <p>
              To truly grasp the power of Lagna, it helps to explore both its Sanskrit linguistic
              origin and its astronomical mechanics across the eastern sky.
            </p>

            <h3 className="font-display text-xl font-medium text-foreground">
              The Sanskrit Root: Fastened to Physical Karma
            </h3>
            <p>
              The Sanskrit term <em>Lagna</em> (लग्न) literally translates to{" "}
              <strong>"fastened," "attached," or "bound."</strong> As described in classical Jyotish
              texts such as the <em>Brihat Parashara Hora Shastra</em> and <em>Saravali</em>, the
              exact second an infant takes their first breath, a specific degree of the 360-degree
              zodiac belt is fastened to the eastern horizon from that location on Earth.
            </p>
            <p>
              Spuritually, Lagna marks the precise cosmic doorway where unmanifest soul
              consciousness becomes bound to physical form. It is the entry point where accumulated
              past-life karma (<em>Sanchita Karma</em>) crystallizes into active current-life
              experiences (<em>Prarabdha Karma</em>). The Lagna represents the vessel—your physical
              body and mind—that your spirit will navigate throughout this earthly incarnation.
            </p>

            <h3 className="font-display text-xl font-medium text-foreground">
              The Astronomical Mechanics: 2-Hour Sign Shift
            </h3>
            <p>
              From an astronomical perspective, imagine standing outdoors at dawn looking toward the
              eastern skyline. Surrounding Earth is the 360-degree belt of the 12 zodiac signs. As
              Earth completes one full 360-degree axial rotation every 24 hours:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>The 360-degree zodiac is divided into 12 equal signs of 30 degrees each.</li>
              <li>
                Dividing 24 hours (1,440 minutes) by 12 signs means each zodiac sign crosses the
                eastern horizon for approximately <strong>two hours (120 minutes)</strong>.
              </li>
              <li>
                Because the horizon moves at approximately 1 degree every 4 minutes, even a minor
                4-to-5 minute birth time difference shifts the exact rising degree, altering
                sub-charts like the D9 Navamsha.
              </li>
            </ul>
            <p>
              This rapid astronomical shift explains why twins born just minutes apart in the same
              delivery room can display vastly different temperaments, health histories, and career
              trajectories.
            </p>
          </section>

          <hr className="border-border/60" />

          {/* Section 2: Sidereal Zodiac & Swiss Ephemeris */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Vedic Sidereal Zodiac vs Western Tropical Zodiac & The Swiss Ephemeris
            </h2>
            <p>
              A major point of confusion for beginners is discovering that their Vedic Lagna sign is
              often different from their Western Ascendant sign. This occurs because Vedic astrology
              uses the <strong>Sidereal Zodiac (Nirayana)</strong>, which measures planetary
              positions against fixed physical constellations. Western astrology uses the{" "}
              <strong>Tropical Zodiac (Sayana)</strong>, which is fixed to seasonal equinoxes.
            </p>
            <p>
              Due to the precession of the Earth's axis (known as the *Ayanamsa*), the Sidereal and
              Tropical zodiacs differ by approximately 24 degrees today. In traditional Indian
              Jyotish, the <strong>Lahiri Ayanamsa</strong> (Chitrapaksha) is the standard
              astronomical correction factor.
            </p>
            <p>
              To calculate Lagna degrees with absolute mathematical rigor, modern software
              engines—including AstroVaanii—integrate the{" "}
              <a
                href="https://www.astro.com/swisseph/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium underline"
              >
                Swiss Ephemeris
              </a>
              . Developed by Astrodienst, the Swiss Ephemeris uses NASA Jet Propulsion Laboratory
              (JPL) DE431 ephemerides to compute planetary and horizon longitudes down to fractions
              of an arc-second.
            </p>
          </section>

          <hr className="border-border/60" />

          {/* Section 3: Interactive Kundli Tutorial */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              How to Read Your Lagna in North Indian & South Indian Kundli Charts
            </h2>
            <p>
              In traditional Indian astrology, birth charts are formatted in two primary regional
              styles: the <strong>North Indian Diamond Layout</strong> and the{" "}
              <strong>South Indian Square Layout</strong>. Below is an interactive chart breakdown
              teaching you how to identify your Lagna in both formats.
            </p>

            <NorthIndianKundliSvg />

            <div className="space-y-3">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Understanding the North Indian Chart
              </h3>
              <p className="text-muted-foreground">In the North Indian diamond layout:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  The <strong>top central diamond</strong> is permanently locked as the{" "}
                  <strong>First House (Lagna)</strong>.
                </li>
                <li>
                  The number written inside this top diamond represents the zodiac sign number (1
                  for Aries, 2 for Taurus, ..., 12 for Pisces).
                </li>
                <li>House numbers proceed counter-clockwise from the top diamond.</li>
              </ul>
            </div>
          </section>

          <hr className="border-border/60" />

          {/* Section 4: How To Calculate Step-by-Step */}
          <section id="how-to-calculate" className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              How Is Lagna Calculated? (Step-by-Step Guide)
            </h2>
            <p>Computing an accurate Lagna requires four precise mathematical steps:</p>
            <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Obtain Exact Birth Inputs:</strong> Gather your
                exact calendar date of birth, precise time of birth to the minute (from official
                hospital records), and birth city.
              </li>
              <li>
                <strong className="text-foreground">Convert to Local Sidereal Time (LST):</strong>{" "}
                Convert local clock time into Greenwich Mean Time (GMT), adjust for longitude
                offset, and compute Local Sidereal Time for the observer's latitude.
              </li>
              <li>
                <strong className="text-foreground">Apply Lahiri Ayanamsa Correction:</strong>{" "}
                Subtract the current precession angle (~24° 15') from the tropical oblique ecliptic
                intersection to find the exact sidereal degree rising on the horizon.
              </li>
              <li>
                <strong className="text-foreground">Cast the First House Cusp:</strong> Assign the
                resulting zodiac sign to the First House (Lagna) of the Janma Kundli, establishing
                the remaining 11 house cusps in sequence.
              </li>
            </ol>
            <p className="text-sm text-muted-foreground">
              You can compute your accurate Lagna instantly with our{" "}
              <Link to="/free-kundli" className="text-primary font-medium underline">
                Free Janam Kundli Generator
              </Link>
              .
            </p>
          </section>

          <hr className="border-border/60" />

          {/* Section 5: Comparison Table */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Lagna vs. Sun Sign vs. Moon Sign: The Astrological Trinity
            </h2>
            <p>
              In traditional Jyotish, Lagna, Moon sign (Chandra Rashi), and Sun sign (Surya Rashi)
              form the core trinity of human life. However, they govern distinct dimensions:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-left text-xs md:text-sm border-collapse border border-border">
                <caption>Lagna vs Sun Sign vs Moon Sign in Vedic Astrology</caption>
                <thead>
                  <tr className="bg-muted text-foreground font-semibold">
                    <th className="p-3 border border-border">Feature</th>
                    <th className="p-3 border border-border">Lagna (Ascendant)</th>
                    <th className="p-3 border border-border">Moon Sign (Chandra Rashi)</th>
                    <th className="p-3 border border-border">Sun Sign (Surya Rashi)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr>
                    <td className="p-3 border border-border font-medium text-foreground">
                      What It Represents
                    </td>
                    <td className="p-3 border border-border">
                      Physical body, vitality, baseline temperament, real-world destiny
                    </td>
                    <td className="p-3 border border-border">
                      Mind, emotions, subconscious memory, internal satisfaction
                    </td>
                    <td className="p-3 border border-border">
                      Soul purpose, ego, authority, professional drive
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-medium text-foreground">
                      Rate of Astronomical Shift
                    </td>
                    <td className="p-3 border border-border">Changes every ~2 hours</td>
                    <td className="p-3 border border-border">Changes every ~2.25 days</td>
                    <td className="p-3 border border-border">Changes every ~30 days</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-medium text-foreground">
                      Predictive Focus
                    </td>
                    <td className="p-3 border border-border">
                      Physical health, major life events, house foundation
                    </td>
                    <td className="p-3 border border-border">
                      Mental health, emotional wellbeing, transit timing (Gochar)
                    </td>
                    <td className="p-3 border border-border">
                      General vital force and societal recognition
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-border/60" />

          {/* Section 6: Lagna Lord (Lagnesh) */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Understanding the Lagna Lord (Lagnesh)
            </h2>
            <p>
              In classical Vedic astrology, every zodiac sign is governed by a planetary ruler. The
              planet ruling your Lagna sign is termed the <strong>Lagna Lord (Lagnesh)</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground my-4">
              <div className="p-3 rounded-lg border border-border/60 bg-card">
                <strong>Aries & Scorpio:</strong> Ruled by Mars (Mangal)
              </div>
              <div className="p-3 rounded-lg border border-border/60 bg-card">
                <strong>Taurus & Libra:</strong> Ruled by Venus (Shukra)
              </div>
              <div className="p-3 rounded-lg border border-border/60 bg-card">
                <strong>Gemini & Virgo:</strong> Ruled by Mercury (Budha)
              </div>
              <div className="p-3 rounded-lg border border-border/60 bg-card">
                <strong>Cancer:</strong> Ruled by Moon (Chandra)
              </div>
              <div className="p-3 rounded-lg border border-border/60 bg-card">
                <strong>Leo:</strong> Ruled by Sun (Surya)
              </div>
              <div className="p-3 rounded-lg border border-border/60 bg-card">
                <strong>Sagittarius & Pisces:</strong> Ruled by Jupiter (Guru)
              </div>
              <div className="p-3 rounded-lg border border-border/60 bg-card font-medium sm:col-span-2">
                <strong>Capricorn & Aquarius:</strong> Ruled by Saturn (Shani)
              </div>
            </div>
            <p>
              As written in <em>Phaladeepika</em> (Chapter 1, Verse 12), when the Lagna Lord is
              well-fortified in a favorable house (such as a Kendra 1, 4, 7, 10 or Trikona 1, 5, 9)
              without malefic afflictions, the native enjoys robust immunity, personal resilience,
              and natural success across major life endeavors.
            </p>
          </section>

          <hr className="border-border/60" />

          {/* Section 7: 12 Lagna Breakdown */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Core Personality & Traits of the 12 Lagna Signs
            </h2>
            <p>
              Here is a detailed breakdown of how each rising sign shapes an individual's baseline
              personality, physical attributes, and life approach:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  1. Aries Lagna (Mesha)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Mars. Dynamic, pioneering, athletic, direct in speech, highly energetic,
                  and thrives on physical challenges.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  2. Taurus Lagna (Vrishabha)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Venus. Patient, practical, security-focused, appreciative of music & fine
                  arts, and possesses strong endurance.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  3. Gemini Lagna (Mithuna)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Mercury. Intellectual, communicative, curious, versatile, highly
                  adaptable, and skilled at networking.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  4. Cancer Lagna (Karka)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by the Moon. Empathetic, intuitive, protective, family-oriented, emotionally
                  deep, and strongly imaginative.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  5. Leo Lagna (Simha)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by the Sun. Dignified, warm, charismatic, authoritative, generous, and
                  natural leaders in public life.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  6. Virgo Lagna (Kanya)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Mercury. Analytical, organized, detail-oriented, service-minded, precise,
                  and skilled at problem solving.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  7. Libra Lagna (Tula)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Venus. Balanced, diplomatic, justice-loving, socially refined, and
                  skilled at building business partnerships.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  8. Scorpio Lagna (Vrischika)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Mars. Intense, resilient, secretive, highly perceptive, passionate, and
                  excels in transformative research.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  9. Sagittarius Lagna (Dhanu)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Jupiter. Optimistic, philosophical, freedom-loving, ethical, inspiring,
                  and drawn to higher wisdom.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  10. Capricorn Lagna (Makara)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Saturn. Ambitious, realistic, highly disciplined, patient, pragmatic, and
                  builds enduring success.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  11. Aquarius Lagna (Kumbha)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Saturn. Visionary, humanitarian, innovative, original, objective, and
                  focused on societal progress.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <h4 className="font-display font-semibold text-base text-primary">
                  12. Pisces Lagna (Meena)
                </h4>
                <p className="text-muted-foreground">
                  Ruled by Jupiter. Compassionate, artistic, spiritually inclined, intuitive,
                  gentle, and deeply imaginative.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <div className="my-10 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 p-8 text-center space-y-4">
            <h3 className="font-display text-2xl font-semibold text-foreground">
              Calculate Your Exact Lagna Sign Instantly
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Generate your full North Indian or South Indian birth chart using precise Swiss
              Ephemeris algorithms. Then use our{" "}
              <Link
                to="/kundali-matching"
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                Kundli matching tool
              </Link>{" "}
              for marriage compatibility analysis or check the Rahu and Ketu axis with our{" "}
              <Link
                to="/kaal-sarp-dosha-calculator"
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                Kaal Sarp Dosha calculator
              </Link>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                to="/free-kundli"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-md"
              >
                Generate Free Kundli
              </Link>
              <Link
                to="/ai-astrologer"
                className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:opacity-90 transition-colors"
              >
                Ask Vaanii AI
              </Link>
              <Link
                to="/kundali-matching"
                className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                Kundli Matching
              </Link>
            </div>
          </div>
        </article>

        <DashaCalculatorCallout />

        {/* 10 High-Volume FAQs */}
        <section className="mt-14 space-y-6">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Frequently Asked Questions About Lagna (10 Essential FAQs)
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-foreground hover:bg-accent/30 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className="text-primary text-xl font-bold ml-2 shrink-0">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
