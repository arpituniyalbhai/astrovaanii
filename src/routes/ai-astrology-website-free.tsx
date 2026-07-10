import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import {
  Sparkles,
  Zap,
  Globe,
  BrainCircuit,
  ShieldCheck,
  Smartphone,
  Briefcase,
  HeartHandshake,
  BellRing,
  BookOpen,
  Stethoscope,
  IndianRupee,
  Store,
  AlertTriangle,
  Orbit,
  BarChart3,
  Clover,
  Palette,
  Gem,
  Lightbulb,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronRight,
  Pointer,
  ScanLine,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/ai-astrology-website-free")({
  head: () => ({
    meta: [
      { title: "Free AI Astrology Website — Get Instant Vedic Predictions" },
      {
        name: "description",
        content:
          "Use the best free AI astrology website for instant Vedic predictions. Get personalized readings on career, love, marriage, health, finance & more. No signup required.",
      },
      { property: "og:image", content: "https://astrovaanii.in/free-ai-astrology-website.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:title",
        content: "Free AI Astrology Website — Get Instant Vedic Predictions",
      },
      {
        property: "og:description",
        content:
          "Use the best free AI astrology website for instant Vedic predictions. Get personalized readings on career, love, marriage, health, finance & more.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://astrovaanii.in/free-ai-astrology-website.webp" },
      {
        name: "twitter:title",
        content: "Free AI Astrology Website — Get Instant Vedic Predictions",
      },
      {
        name: "twitter:description",
        content:
          "Use the best free AI astrology website for instant Vedic predictions. Get personalized readings on career, love, marriage, health, finance & more.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://astrovaanii.in/ai-astrology-website-free" },
      { rel: "preload", href: "/free-ai-astrology-website.webp", as: "image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(articleJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
    ],
  }),
  component: FreeAiAstrologyPage,
});

const featuresList = [
  {
    icon: Sparkles,
    title: "100% Free",
    desc: "No hidden charges. No credit card required. Get unlimited readings without spending a rupee.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800/40",
  },
  {
    icon: Zap,
    title: "Instant Horoscope",
    desc: "Reports generated in seconds. Enter your birth details and receive personalized predictions immediately.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-800/40",
  },
  {
    icon: Globe,
    title: "Vedic Astrology",
    desc: "Based on traditional Vedic principles. Uses Parashara and Jaimini methods for authentic Jyotish readings.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800/40",
  },
  {
    icon: BrainCircuit,
    title: "AI Powered",
    desc: "Easy explanations anyone can understand. Complex astrology translated into simple, natural language.",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800/40",
  },
  {
    icon: ShieldCheck,
    title: "Private",
    desc: "Birth details remain secure and encrypted. You can delete your chart and conversations anytime.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800/40",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    desc: "Works on every device. Get your AI astrology reading on phone, tablet, or desktop.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-800/40",
  },
];

type WhatYouGetItem = {
  icon: typeof Briefcase;
  label: string;
  desc: string;
};

type WhatYouGetGroup = {
  title: string;
  items: WhatYouGetItem[];
};

const whatYouGetGroups: WhatYouGetGroup[] = [
  {
    title: "Life Areas",
    items: [
      {
        icon: Briefcase,
        label: "Career Prediction",
        desc: "Job changes, promotions, business timing",
      },
      {
        icon: HeartHandshake,
        label: "Love Compatibility",
        desc: "Relationship harmony and understanding",
      },
      { icon: BellRing, label: "Marriage Timing", desc: "Favorable periods and dosha checks" },
      { icon: BookOpen, label: "Education", desc: "Learning aptitude and academic timing" },
      { icon: Stethoscope, label: "Health", desc: "Predispositions and wellness periods" },
      { icon: IndianRupee, label: "Finance", desc: "Wealth periods and investment timing" },
      { icon: Store, label: "Business", desc: "Venture timing and growth periods" },
    ],
  },
  {
    title: "Astrological Analysis",
    items: [
      { icon: AlertTriangle, label: "Doshas", desc: "Mangal, Kaal Sarp, Nadi & more" },
      { icon: Orbit, label: "Planet Analysis", desc: "Graha positions and their influences" },
      { icon: BarChart3, label: "Dasha Analysis", desc: "Timeline of planetary periods" },
    ],
  },
  {
    title: "Personal Guidance",
    items: [
      { icon: Clover, label: "Lucky Numbers", desc: "Numerologically aligned digits" },
      { icon: Palette, label: "Lucky Color", desc: "Colors that harmonize with your chart" },
      { icon: Gem, label: "Gemstone Suggestions", desc: "Ratna recommendations for balance" },
      { icon: Lightbulb, label: "Today's Advice", desc: "Daily guidance based on transits" },
      { icon: ArrowUpCircle, label: "Strengths", desc: "Your innate cosmic advantages" },
      { icon: ArrowDownCircle, label: "Weaknesses", desc: "Areas that need mindful attention" },
    ],
  },
];

const faqs = [
  {
    q: "What is a free AI astrology website?",
    a: 'A free AI astrology website is an online platform that uses artificial intelligence to generate personalized astrology readings based on your birth details. Unlike generic horoscope sites, it creates custom predictions by analyzing your birth chart using Vedic astrology principles. <Link to="/" className="text-primary underline underline-offset-4 hover:opacity-80">AstroVaanii</Link> is one such platform that offers completely free AI astrology readings.',
  },
  {
    q: "Is this AI astrology website really free?",
    a: 'Yes. AstroVaanii offers completely free AI astrology readings with no hidden charges. You can get your birth chart analyzed, ask follow-up questions, and receive personalized predictions about career, love, marriage, health, and more without paying anything. <Link to="/signup" className="text-primary underline underline-offset-4 hover:opacity-80">Start your free reading now</Link>.',
  },
  {
    q: "How accurate is a free AI astrology reading?",
    a: "The accuracy of an AI astrology reading depends on two factors: the correctness of your birth details and the quality of the astrological engine. When you enter accurate birth information, AI astrology websites like AstroVaanii can provide highly personalized and reliable readings using classical Vedic calculations.",
  },
  {
    q: "What birth details do I need for a free AI astrology reading?",
    a: "You need your date of birth, exact time of birth, and place of birth. These three details are essential because even a small change in birth time can shift your rising sign, house placements, and planetary positions. Some AI astrology websites may also ask for your name and gender.",
  },
  {
    q: "Can a free AI astrology website predict my future?",
    a: "A free AI astrology website can provide personalized insights about possible life trends, favorable periods, and potential challenges based on your birth chart. These predictions are based on astrological calculations and classical principles. While no platform can predict the future with absolute certainty, AI astrology offers valuable guidance about timing and opportunities.",
  },
  {
    q: "Which is the best free AI astrology website?",
    a: '<Link to="/" className="text-primary underline underline-offset-4 hover:opacity-80">AstroVaanii</Link> is widely considered one of the best free AI astrology websites. It is trained on classical Parashara and Jaimini Vedic methods, supports 9 Indian languages, and offers conversational AI astrology where you can ask follow-up questions and get contextual answers based on your birth chart.',
  },
  {
    q: "Is my birth data safe on free AI astrology websites?",
    a: "Reputable AI astrology websites encrypt birth data and never share it with third parties. AstroVaanii follows strict privacy practices — birth details are encrypted, never sold, and you can delete your chart and conversations anytime. Always check the privacy policy before entering your personal information.",
  },
  {
    q: "Can I ask follow-up questions on a free AI astrology website?",
    a: "Yes, AstroVaanii lets you ask unlimited follow-up questions. Unlike static reports that give one-time predictions, conversational AI astrology remembers your birth chart throughout the conversation, allowing you to dig deeper into specific areas of life.",
  },
  {
    q: "What is the difference between a free AI astrology website and a human astrologer?",
    a: "The main difference is speed, availability, and cost. An AI astrology website provides instant readings 24/7 at no cost, while a human astrologer may charge significant fees and require appointments. Many people use both — AI astrology for quick daily insights and human astrologers for deep consultations.",
  },
  {
    q: "Can a free AI astrology website do Kundli matching?",
    a: 'Yes. Many AI astrology websites offer Kundli matching (Kundli Milan) for compatibility analysis. <Link to="/free-kundli" className="text-primary underline underline-offset-4 hover:opacity-80">AstroVaanii\'s free Kundli tool</Link> analyzes birth charts of both partners and provides detailed compatibility insights based on Vedic principles.',
  },
  {
    q: "What areas of life can a free AI astrology website cover?",
    a: "A comprehensive AI astrology website can cover career prediction, love compatibility, marriage timing, education guidance, health analysis, financial predictions, business insights, dosha analysis, planetary analysis, dasha periods, lucky numbers, lucky colors, gemstone suggestions, daily advice, and personal strengths and weaknesses.",
  },
  {
    q: "Do I need to create an account for free AI astrology?",
    a: "Some AI astrology websites require account creation, while others offer instant readings without signup. AstroVaanii offers free readings with optional account creation, so you can try it before committing to anything.",
  },
  {
    q: "What makes AstroVaanii different from other free AI astrology websites?",
    a: "AstroVaanii stands out because it is trained on classical Parashara and Jaimini Vedic methods, supports 9 Indian languages with native fluency, offers conversational AI that remembers context, and is audited weekly by practicing astrologers. Most free AI astrology websites offer generic outputs, while AstroVaanii provides truly personalized readings.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a.replace(/<[^>]*>/g, ""),
    },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Free AI Astrology Website — Get Instant Vedic Predictions Online",
  description:
    "Use the best free AI astrology website for instant Vedic predictions. Get personalized readings on career, love, marriage, health, finance & more. No signup required.",
  image: "https://astrovaanii.in/free-ai-astrology-website.webp",
  datePublished: "2026-07-10",
  dateModified: "2026-07-10",
  author: {
    "@type": "Organization",
    name: "AstroVaanii",
    url: "https://astrovaanii.in",
  },
  publisher: {
    "@type": "Organization",
    name: "AstroVaanii",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://astrovaanii.in/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Free AI Astrology Website",
      item: "https://astrovaanii.in/ai-astrology-website-free",
    },
  ],
};

function FaqItem({
  q,
  a,
  isOpen,
  toggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-medium text-foreground">{q}</span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-500 ${
          isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <p
          className="min-h-0 px-6 text-sm leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: a }}
        />
      </div>
    </div>
  );
}

function FreeAiAstrologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-lg">
              Astro<span className="text-primary">Vaanii</span>
            </span>
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try AI Astrologer — Free
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li className="text-muted-foreground/40" aria-hidden="true">
              /
            </li>
            <li className="text-foreground font-medium" aria-current="page">
              Free AI Astrology Website
            </li>
          </ol>
        </nav>

        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/80 to-background p-8 md:p-12 lg:p-16">
          <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Get Free AI Astrology Predictions in Seconds
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Discover personalized Vedic astrology insights powered by AI. Enter your birth
                details and receive instant predictions about career, love, marriage, health,
                education, and more.
              </p>
              <div className="mt-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
                >
                  ✅ Start Free AI Reading
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/free-ai-astrology-website.webp"
                alt="Free AI astrology website - Get instant Vedic predictions online"
                width={1200}
                height={630}
                className="w-full max-w-lg rounded-2xl object-cover shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="mt-20">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Features</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Why Use Our AI Astrology?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Our free AI astrology platform combines ancient Vedic wisdom with modern technology to
              give you accurate, personalized readings in seconds.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuresList.map((f, i) => (
              <div
                key={f.title}
                className={`group relative overflow-hidden rounded-2xl border ${f.border} ${f.bg} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-background/40 blur-2xl" />
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border ${f.border} ${f.bg} ${f.color}`}
                >
                  <f.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-lg font-medium text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="mt-20">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Process</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Getting your free AI astrology reading takes just a few seconds. Follow these four
              simple steps.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              {
                icon: Pointer,
                title: "Enter Birth Details",
                desc: "Share your date of birth, exact birth time, and birth place. That is all we need to cast your chart.",
                highlight: "Date, Time & Place",
              },
              {
                icon: ScanLine,
                title: "AI Analyzes Your Horoscope",
                desc: "Our engine computes planetary positions, houses, nakshatras, dashas, and yogas using classical Vedic rules.",
                highlight: "Instant calculation",
              },
              {
                icon: MessageCircle,
                title: "Receive Personalized Predictions",
                desc: "Vaanii reads your chart and delivers predictions about career, love, marriage, health, and more in plain language.",
                highlight: "Career, love, health & more",
              },
              {
                icon: ChevronRight,
                title: "Ask Follow-up Questions",
                desc: "Dig deeper into any area. Your chart stays in context, so every follow-up builds on your previous reading.",
                highlight: "Unlimited follow-ups",
              },
            ].map((s, i) => (
              <div key={s.title} className="group relative">
                <div className="relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  {/* Step number badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-display text-4xl font-bold tracking-tighter text-primary/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <s.icon size={20} strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-medium text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-4 inline-block rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    {s.highlight}
                  </div>
                </div>

                {/* Connector arrow between steps */}
                {i < 3 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-muted-foreground/30 md:block">
                    <ChevronRight size={24} strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile flow indicator */}
          <div className="mt-6 flex justify-center gap-2 md:hidden">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-primary/40" />
            ))}
          </div>
        </section>

        {/* ===== WHAT YOU'LL GET ===== */}
        <section className="mt-20">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-primary">What you get</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Your Complete AI Astrology Reading
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Every reading covers 16 dimensions of your life, grouped into three categories for
              easy understanding.
            </p>
          </div>

          <div className="mt-14 space-y-10">
            {whatYouGetGroups.map((group) => (
              <div key={group.title}>
                <div className="mb-5 flex items-center gap-3">
                  <h3 className="font-display text-xl font-medium text-foreground">
                    {group.title}
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="group flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <item.icon size={18} strokeWidth={1.5} />
                      </div>
                      <span className="mt-3 text-xs font-medium text-foreground sm:text-sm">
                        {item.label}
                      </span>
                      <span className="mt-1 text-[10px] leading-tight text-muted-foreground sm:text-xs">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 2000+ WORD ARTICLE ===== */}
        <article className="mt-20">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            Free AI Astrology Website — Your Complete Guide to Instant Vedic Predictions
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Astrology has guided human decisions for thousands of years. From kings consulting court
            astrologers before battles to modern professionals checking their horoscope before
            signing a deal, the desire to understand what the stars reveal is timeless. But
            traditional astrology has always had barriers — high costs, limited availability, and
            complex jargon that only experts could decode.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A <strong className="text-foreground">free AI astrology website</strong> changes
            everything. It removes every barrier. No appointments, no fees, no confusing
            terminology. You enter your birth details and receive a complete, personalized reading
            within seconds. This is not a generic sun-sign horoscope that applies to millions of
            people. This is a reading based on your unique birth chart, calculated using classical
            Vedic principles and delivered through artificial intelligence.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            In this comprehensive guide, you will learn everything about free AI astrology websites
            — how they work, what they can tell you, which features matter, and how to get the most
            accurate reading possible.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            What Is a Free AI Astrology Website?
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A <strong className="text-foreground">free AI astrology website</strong> is an online
            platform that uses artificial intelligence to analyze your birth chart and provide
            personalized astrology insights without charging any fees. Unlike traditional astrology
            services that require paid consultations, these platforms make Vedic wisdom accessible
            to everyone.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The core technology behind these platforms combines two elements: astrological
            calculation engines that compute planetary positions, houses, dashas, and yogas with
            precision, and AI language models that translate complex astrological data into simple,
            human-readable explanations. This combination makes it possible for anyone to understand
            their birth chart without spending years studying astrology.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            How Does a Free AI Astrology Website Work?
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Many people assume AI astrology is just a chatbot with generic answers. In reality, a
            well-designed free AI astrology website follows a precise, multi-step process before
            delivering any prediction.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            First, the system collects your birth details: date of birth, exact time of birth, and
            place of birth. These three parameters are critical because even a difference of a few
            minutes in birth time can change your rising sign (Lagna), house placements, and the
            entire structure of your birth chart.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Second, the astrological calculation engine computes the exact positions of all planets
            at the moment of your birth. This includes the Sun, Moon, Mercury, Venus, Mars, Jupiter,
            Saturn, Rahu, and Ketu. The engine also determines which zodiac sign and nakshatra each
            planet occupies, which house it sits in, and what aspects it forms with other planets.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Third, the AI analyzes thousands of astrological combinations simultaneously. It checks
            for yogas (favorable combinations), doshas (unfavorable combinations), dasha periods
            (planetary time lords), transits, and divisional charts. A human astrologer might take
            hours to analyze all these factors. AI completes the same analysis in seconds.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Finally, the system generates a personalized report in natural language. Instead of
            showing you complex tables and technical terms, the AI explains what each combination
            means for your life — your career, relationships, health, finances, and personal growth.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            Key Features of the Best Free AI Astrology Websites
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Not all free AI astrology websites are created equal. Here are the features that
            separate high-quality platforms from basic tools.
          </p>
          <p className="mt-3 font-medium text-foreground">Accurate Birth Chart Calculation</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            The foundation of any good AI astrology reading is accurate chart calculation. The best
            platforms use NASA-grade ephemeris data or Swiss Ephemeris for precise astronomical
            calculations. Without accurate planetary positions, every prediction that follows will
            be unreliable.
          </p>
          <p className="mt-3 font-medium text-foreground">Vedic Astrology System</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Vedic astrology (Jyotish) differs significantly from Western astrology. It uses sidereal
            zodiac, nakshatras (lunar mansions), and a sophisticated dasha system for timing
            predictions. The best free AI astrology websites are built on classical Vedic
            principles, typically following Parashara and Jaimini traditions.
          </p>
          <p className="mt-3 font-medium text-foreground">Conversational AI</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Static reports give you one set of predictions and stop there. Conversational AI
            astrology allows you to ask follow-up questions, explore specific areas in more depth,
            and get clarifications. This turns a one-time reading into an ongoing dialogue.
          </p>
          <p className="mt-3 font-medium text-foreground">Multi-language Support</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Astrology is deeply personal, and language matters. The best platforms offer native
            support for multiple languages, not machine-translated outputs. This ensures that
            metaphors, cultural context, and emotional tone are preserved in every reading.
          </p>
          <p className="mt-3 font-medium text-foreground">Privacy and Security</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Birth details are sensitive personal information. Reputable AI astrology websites
            encrypt this data, never share it with third parties, and allow users to delete their
            information permanently. Always verify a platform's privacy practices before sharing
            your birth details.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            What Can a Free AI Astrology Website Tell You?
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A comprehensive free AI astrology website can provide insights across many areas of
            life. Here is what you can expect from a quality reading.
          </p>

          <h4 className="mt-6 font-display text-xl font-medium text-foreground">
            Career and Professional Life
          </h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Your birth chart reveals natural career inclinations, favorable periods for job changes,
            business opportunities, and professional growth. AI astrology can identify which career
            paths align with your planetary placements and when to make major career moves. The 10th
            house (Karma Bhava) and its lord, along with the placement of Saturn, Jupiter, and
            Mercury, provide deep insights into professional success.
          </p>

          <h4 className="mt-6 font-display text-xl font-medium text-foreground">
            Love and Relationships
          </h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The 5th house (love, romance) and 7th house (marriage, partnership) in your birth chart
            reveal relationship patterns, compatibility factors, and timing for meaningful
            connections. AI astrology can analyze planetary placements affecting your love life,
            including Venus, Moon, and the 7th lord. It can also perform{" "}
            <Link
              to="/free-kundli"
              className="text-primary underline underline-offset-4 hover:opacity-80"
            >
              Kundli matching
            </Link>{" "}
            for compatibility assessment between partners.
          </p>

          <h4 className="mt-6 font-display text-xl font-medium text-foreground">Marriage Timing</h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            One of the most common questions people ask astrology is about marriage timing. AI
            astrology analyzes your dasha periods, transit of Jupiter and Saturn, and 7th house
            conditions to identify favorable marriage windows. It can also check for mangal dosha
            (Mars affliction) and other factors that may influence marriage timing.
          </p>

          <h4 className="mt-6 font-display text-xl font-medium text-foreground">
            Health and Wellness
          </h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Certain houses and planets in your birth chart indicate health predispositions. The AI
            can analyze the 6th house (health, disease), 8th house (longevity), and the placement of
            Sun, Moon, and Ascendant lord to provide health insights. This is not a substitute for
            medical advice but offers a complementary perspective on your well-being.
          </p>

          <h4 className="mt-6 font-display text-xl font-medium text-foreground">
            Education and Learning
          </h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The 4th house (education) and 5th house (intellect) along with Mercury and Jupiter
            placements reveal natural learning styles, academic strengths, and favorable periods for
            education. AI astrology can guide students and parents on educational timing and subject
            choices.
          </p>

          <h4 className="mt-6 font-display text-xl font-medium text-foreground">
            Finance and Wealth
          </h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The 2nd house (wealth), 11th house (gains), and the placement of Jupiter (wealth giver)
            and Venus (luxuries) provide financial insights. AI astrology can identify favorable
            periods for investments, business expansion, and wealth accumulation.
          </p>

          <h4 className="mt-6 font-display text-xl font-medium text-foreground">Dosha Analysis</h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Vedic astrology identifies several doshas (afflictions) in a birth chart, including
            Mangal Dosha (Mars affliction), Kaal Sarp Dosha (Rahu-Ketu affliction), Nadi Dosha (for
            compatibility), and Pitru Dosha (ancestral affliction). A good AI astrology website can
            detect these doshas and suggest appropriate remedies based on classical texts.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            Free AI Astrology Website vs Traditional Astrologer
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Understanding the difference between a free AI astrology website and a traditional human
            astrologer helps you choose the right approach for your needs.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-3 border-b border-border bg-card/40 text-sm font-medium">
              <div className="p-4 text-muted-foreground">Factor</div>
              <div className="p-4 text-primary">AI Astrology Website</div>
              <div className="p-4 text-muted-foreground">Human Astrologer</div>
            </div>
            {[
              { factor: "Cost", ai: "Free", human: "₹500–₹5000 per session" },
              { factor: "Speed", ai: "Instant (seconds)", human: "30–90 minutes" },
              { factor: "Availability", ai: "24/7", human: "By appointment" },
              {
                factor: "Consistency",
                ai: "Identical every time",
                human: "Varies by mood/expertise",
              },
              { factor: "Follow-ups", ai: "Unlimited, free", human: "New session required" },
              { factor: "Languages", ai: "Multiple (native)", human: "Usually 1–2 languages" },
              { factor: "Depth", ai: "Comprehensive analysis", human: "Depends on expertise" },
            ].map((row, i) => (
              <div
                key={row.factor}
                className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-background/40" : ""}`}
              >
                <div className="p-4 font-medium text-foreground">{row.factor}</div>
                <div className="p-4 text-foreground">{row.ai}</div>
                <div className="p-4 text-muted-foreground">{row.human}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Both approaches have their place. A free AI astrology website is ideal for daily
            guidance, quick insights, and exploring your chart without commitment. A human
            astrologer is better for deep consultations, personalized remedies, and emotional
            support during major life transitions. Many people now use both — AI for regular
            check-ins and humans for special occasions.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            Who Should Use a Free AI Astrology Website?
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A free AI astrology website is valuable for many different types of users.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong className="text-foreground">Astrology beginners</strong> who want to
              understand their birth chart without learning complex terminology.
            </li>
            <li>
              <strong className="text-foreground">Busy professionals</strong> who need quick daily
              guidance without scheduling appointments.
            </li>
            <li>
              <strong className="text-foreground">Students</strong> exploring career and education
              options based on astrological timing.
            </li>
            <li>
              <strong className="text-foreground">Couples</strong> checking compatibility before
              marriage through Kundli matching.
            </li>
            <li>
              <strong className="text-foreground">Curious individuals</strong> who want to explore
              what astrology reveals about their personality and life path.
            </li>
            <li>
              <strong className="text-foreground">Regular seekers</strong> who want daily, weekly,
              or monthly horoscope updates based on their personal birth chart.
            </li>
          </ul>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            Common Mistakes People Make with Free AI Astrology
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            To get the most accurate reading from a free AI astrology website, avoid these common
            mistakes.
          </p>
          <p className="mt-3 font-medium text-foreground">Incorrect Birth Time</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            The most common mistake is entering an approximate birth time. Even 10–15 minutes
            difference can change your Lagna (rising sign) and house placements. Always use the
            exact birth time from your birth certificate if possible.
          </p>
          <p className="mt-3 font-medium text-foreground">Unknown Birth Time</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            If you do not know your exact birth time, many AI astrology websites offer birth time
            rectification or allow you to proceed with default settings. The reading will be less
            precise, but you can still get valuable insights from planetary positions and sign
            placements.
          </p>
          <p className="mt-3 font-medium text-foreground">Expecting Absolute Certainty</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Astrology, whether from AI or a human expert, provides guidance — not guarantees. Treat
            AI astrology readings as helpful perspectives that inform your decisions, not as
            absolute predictions that control your life.
          </p>
          <p className="mt-3 font-medium text-foreground">Ignoring Follow-up Questions</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            The real power of AI astrology is the ability to ask follow-up questions. Do not stop at
            your first reading. Ask for clarifications, explore specific areas, and dig deeper into
            aspects that matter to you.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            Myths and Facts About Free AI Astrology Websites
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Let us clear up some common misconceptions about AI astrology.
          </p>
          <p className="mt-3 font-medium text-foreground">
            Myth: AI astrology is just random predictions.
          </p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Fact: A quality AI astrology website performs real astronomical calculations based on
            your birth details. The predictions are based on classical astrological rules, not
            random generation.
          </p>
          <p className="mt-3 font-medium text-foreground">
            Myth: Free AI astrology websites are not accurate.
          </p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Fact: Many free AI astrology websites use the same calculation engines and astrological
            rules as paid platforms. The accuracy depends on the quality of the astrological engine,
            not the price tag.
          </p>
          <p className="mt-3 font-medium text-foreground">
            Myth: AI will replace human astrologers.
          </p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Fact: AI astrology complements human astrologers by making basic chart analysis
            accessible to everyone. Human astrologers bring intuition, experience, and personalized
            emotional support that AI cannot replicate.
          </p>
          <p className="mt-3 font-medium text-foreground">
            Myth: AI astrology does not follow real Vedic principles.
          </p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Fact: The best AI astrology websites are trained on classical Vedic texts including
            Parashara and Jaimini traditions. They follow the same rules and principles taught in
            traditional Vedic astrology.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            How to Get the Most Out of a Free AI Astrology Website
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Follow these tips to maximize the value you receive from any AI astrology platform.
          </p>
          <p className="mt-3 font-medium text-foreground">1. Enter accurate birth details</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            The quality of your reading depends entirely on the accuracy of your birth data. Take
            the time to find your correct birth time from reliable sources.
          </p>
          <p className="mt-3 font-medium text-foreground">2. Start with broad questions</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Begin with general questions about your chart before diving into specific areas. This
            helps the AI build context for more detailed follow-up questions.
          </p>
          <p className="mt-3 font-medium text-foreground">3. Ask specific follow-ups</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Once you have a general understanding, ask specific questions about career timing,
            relationship compatibility, health periods, or financial opportunities.
          </p>
          <p className="mt-3 font-medium text-foreground">4. Cross-reference multiple readings</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Check your AI reading against other sources or consult a human astrologer for major life
            decisions. Multiple perspectives lead to better understanding.
          </p>
          <p className="mt-3 font-medium text-foreground">5. Track predictions over time</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Keep notes on the predictions you receive and observe how they align with actual events
            in your life. This helps you understand which areas of your chart are most active and
            accurate.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            Frequently Asked Questions About Free AI Astrology Websites
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Here are answers to the most common questions people ask before trying a free AI
            astrology website.
          </p>
          <p className="mt-3 font-medium text-foreground">
            Is a free AI astrology website as good as a paid one?
          </p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Many free AI astrology websites offer the same quality of chart calculation and analysis
            as paid platforms. The difference is often in premium features like detailed PDF
            reports, personalized remedy suggestions, or priority support. For basic daily readings
            and chart exploration, free platforms are excellent.
          </p>
          <p className="mt-3 font-medium text-foreground">
            Can a free AI astrology website do Kundli matching?
          </p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Yes, many AI astrology websites offer free Kundli matching (Kundli Milan) for
            compatibility analysis. This compares the birth charts of two individuals across
            multiple factors including nakshatra compatibility, dosha analysis, and planetary
            harmony.
          </p>
          <p className="mt-3 font-medium text-foreground">
            How does an AI astrology website handle unknown birth times?
          </p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Some platforms offer birth time rectification based on major life events. Others allow
            you to proceed with a default time (usually sunrise or 12:00 PM) and note that house
            placements may vary. The planetary sign placements remain accurate regardless of birth
            time.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            The Future of Free AI Astrology
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Artificial intelligence in astrology is still in its early stages. The technology
            improves rapidly as AI models become more sophisticated and astrological knowledge bases
            expand.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Future free AI astrology websites will likely offer voice-based conversations,
            personalized remedial recommendations based on your specific chart, integration with
            wearable devices for real-time astrological guidance, and even more accurate timing
            predictions through advanced dasha analysis.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            As Vedic astrology continues to gain global recognition, AI-powered platforms will play
            an increasingly important role in making this ancient wisdom accessible to people
            everywhere, regardless of their budget, location, or prior knowledge.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            Why AstroVaanii Is the Best Free AI Astrology Website
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            With so many AI astrology websites available, you might wonder what makes AstroVaanii
            different. Here is why thousands of users choose AstroVaanii for their free AI astrology
            readings.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            AstroVaanii is built on classical Parashara and Jaimini Vedic methods — not generic
            Western astrology repackaged. The calculation engine uses precise ephemeris data for
            accurate planetary positions. The AI interpretation layer is trained on thousands of
            real Jyotish readings and audited weekly by practicing astrologers.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            AstroVaanii supports 9 Indian languages natively, including Hindi, Tamil, Telugu,
            Kannada, Malayalam, Bengali, Marathi, Gujarati, and English. The conversations feel
            natural because the AI understands cultural context and astrological terminology in each
            language.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Unlike static report generators, AstroVaanii offers true conversational AI. You can ask
            unlimited follow-up questions, explore specific life areas in depth, and pick up
            conversations weeks later with full context retained.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-foreground">
            Internal Links for Further Exploration
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            To deepen your understanding of Vedic astrology and AI-powered predictions, explore
            these related resources:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <Link to="/" className="text-primary underline underline-offset-4 hover:opacity-80">
                Homepage — Chat with Vaanii AI
              </Link>
            </li>
            <li>
              <Link
                to="/free-kundli"
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                Free AI Kundli Generator
              </Link>
              — Generate your complete birth chart with AI analysis
            </li>
            <li>
              <Link
                to="/blogs/what-is-ai-astrologer"
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                What Is an AI Astrologer?
              </Link>
              — A simple guide to how AI astrology works
            </li>
            <li>
              <Link
                to="/blogs"
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                Astrology Blog
              </Link>
              — More articles about Vedic astrology, birth charts, and AI predictions
            </li>
          </ul>

          <div className="mt-10 rounded-3xl border border-border bg-card p-8">
            <h3 className="font-display text-2xl font-semibold text-foreground">Final Thoughts</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A <strong className="text-foreground">free AI astrology website</strong> is the
              easiest way to explore your birth chart and receive personalized Vedic insights
              without spending money or scheduling appointments. Whether you are curious about your
              career path, love life, health, or financial future, AI astrology gives you instant
              access to wisdom that was once reserved for experts.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The key is to choose a platform that uses accurate astrological calculations, follows
              authentic Vedic principles, and explains everything in simple language. AstroVaanii
              meets all these criteria and more — it is free, conversational, multilingual, and
              built on classical traditions.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Your birth chart is a map of your cosmic blueprint. With AI astrology, you can read
              that map in minutes instead of years. Start your journey today and discover what the
              stars have to say about your unique path.
            </p>
            <div className="mt-6">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
              >
                ✅ Start Free AI Reading
              </Link>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="mt-10 rounded-3xl border border-border bg-primary/5 p-8">
            <h3 className="font-display text-2xl font-semibold text-foreground">Key Takeaways</h3>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                A free AI astrology website provides personalized Vedic readings based on your exact
                birth details — no appointments or fees required.
              </li>
              <li>
                The best platforms use precise astronomical calculations and follow classical
                Parashara and Jaimini traditions.
              </li>
              <li>
                AI astrology can cover career, love, marriage, health, finance, doshas, dasha
                periods, and more.
              </li>
              <li>
                Enter accurate birth details for the most reliable readings. Even small time
                differences can affect your chart.
              </li>
              <li>
                AI astrology is a complementary tool — use it alongside human astrologers for major
                life decisions.
              </li>
              <li>
                AstroVaanii offers free, conversational AI astrology in 9 Indian languages with
                unlimited follow-up questions.
              </li>
            </ul>
          </div>
        </article>

        {/* ===== FAQ SECTION ===== */}
        <section className="mt-20">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything you need to know about free AI astrology websites.
          </p>
          <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-card">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="mt-20 text-center">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card/80 to-background p-10">
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
              Ready to Try a Free AI Astrology Reading?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Get your personalized Vedic astrology reading in seconds. No credit card required. No
              appointments. Just enter your birth details and discover what the stars reveal about
              your life.
            </p>
            <div className="mt-8">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
              >
                ✅ Start Free AI Reading
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-12 text-center">
          <p className="text-muted-foreground">
            Want to learn more? Read our guide on{" "}
            <Link
              to="/blogs/what-is-ai-astrologer"
              className="text-primary underline underline-offset-4 hover:opacity-80"
            >
              what is an AI astrologer
            </Link>{" "}
            or try{" "}
            <Link
              to="/free-kundli"
              className="text-primary underline underline-offset-4 hover:opacity-80"
            >
              free AI Kundli generation
            </Link>
            .
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/40 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/blogs" className="hover:text-foreground">
              Blog
            </Link>
            <Link to="/blogs/what-is-ai-astrologer" className="hover:text-foreground">
              What Is an AI Astrologer?
            </Link>
            <Link to="/free-kundli" className="hover:text-foreground">
              Free Kundli
            </Link>
            <Link to="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-foreground">
              Terms &amp; Conditions
            </Link>
            <Link to="/refund-policy" className="hover:text-foreground">
              Refund Policy
            </Link>
            <Link to="/disclaimer" className="hover:text-foreground">
              Disclaimer
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} AstroVaanii
          </p>
        </div>
      </footer>
    </main>
  );
}
