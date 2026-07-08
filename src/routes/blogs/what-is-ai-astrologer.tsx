import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/blogs/what-is-ai-astrologer")({
  head: () => ({
    meta: [
      { title: "What Is an AI Astrologer? How It Works" },
      {
        name: "description",
        content:
          "Learn what an AI astrologer is and how it reads your birth chart using AI. Discover how AI astrologers provide personalized astrology insights instantly.",
      },
      { property: "og:image", content: "/what-is-ai-astrologer.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:title", content: "What Is an AI Astrologer? How It Works" },
      {
        property: "og:description",
        content:
          "Learn what an AI astrologer is and how it reads your birth chart using AI. Discover how AI astrologers provide personalized astrology insights instantly.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/what-is-ai-astrologer.webp" },
      { name: "twitter:title", content: "What Is an AI Astrologer? How It Works" },
      {
        name: "twitter:description",
        content:
          "Learn what an AI astrologer is and how it reads your birth chart using AI. Discover how AI astrologers provide personalized astrology insights instantly.",
      },
    ],
    links: [
      { rel: "canonical", href: "/blogs/what-is-ai-astrologer" },
      { rel: "preload", href: "/what-is-ai-astrologer.webp", as: "image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(articleJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
    ],
  }),
  component: WhatIsAiAstrologerPage,
});

const faqs = [
  {
    q: "What is an AI astrologer?",
    a: 'An AI astrologer is a digital tool powered by artificial intelligence that analyzes your birth chart and provides personalized astrology insights. It studies your birth details — date, time, and place — then uses astrological calculations to explain planetary positions, houses, dashas, and yogas in simple language. Unlike a generic horoscope app, an <a href="/" class="text-primary underline underline-offset-4 hover:opacity-80">AI astrologer</a> gives you a reading based on your unique birth chart.',
  },
  {
    q: "How does an AI astrologer work?",
    a: 'An AI astrologer works by collecting your birth date, birth time, and birth place. It creates your birth chart using astronomical calculations, studies planetary positions, houses, nakshatras, dashas, and other astrological factors, then explains the results in an easy-to-understand format. The AI processes thousands of calculations in seconds — something that would take a human much longer. You can try it yourself with <a href="/" class="text-primary underline underline-offset-4 hover:opacity-80">Vaanii, the AI astrologer</a>.',
  },
  {
    q: "Is an AI astrologer real?",
    a: "Yes. An AI astrologer uses real birth chart calculations based on your birth details. It studies the same planetary positions, zodiac signs, houses, and aspects used in traditional Vedic and Western astrology. The artificial intelligence simply processes and presents the information much faster than a human could. The calculations are as real as any astrological chart cast by a human astrologer.",
  },
  {
    q: "Is an AI astrologer accurate?",
    a: "An AI astrologer can provide accurate birth chart analysis when your birth date, birth time, and birth place are entered correctly. The quality of the astrological engine also matters — a well-designed AI astrologer uses precise astronomical calculations and follows proper astrological rules. When both your birth details and the AI system are accurate, the readings can be highly personalized and reliable.",
  },
  {
    q: "Can an AI astrologer predict the future?",
    a: 'An AI astrologer studies your birth chart and current planetary movements to provide personalized insights about possible life trends and opportunities. The predictions are based on astrological calculations linked to your birth details. While no one can predict the future with absolute certainty, an AI astrologer can highlight favorable periods and potential challenges based on classical astrological principles. <a href="/" class="text-primary underline underline-offset-4 hover:opacity-80">Try Vaanii</a> for your personalized reading.',
  },
  {
    q: "Is an AI astrologer free?",
    a: 'Many AI astrologer platforms offer free birth chart readings, daily horoscopes, or basic predictions. Some platforms also provide premium reports with more detailed analysis. <a href="/signup" class="text-primary underline underline-offset-4 hover:opacity-80">AstroVaanii offers free AI astrologer chats</a> so you can experience personalized readings before committing to any premium features.',
  },
  {
    q: "Can an AI astrologer read my birth chart?",
    a: "Yes. Reading your birth chart is the primary function of an AI astrologer. When you enter your date of birth, birth time, and birth place, the AI creates your complete birth chart and analyzes planetary positions, house placements, zodiac signs, nakshatras, dashas, yogas, and aspects. It then explains everything in simple language.",
  },
  {
    q: "What information does an AI astrologer need?",
    a: "Most AI astrologer platforms require your date of birth, birth time, and birth place. These three details are essential because even a small change in birth time can shift your rising sign and house placements. Some platforms may also ask for your name and gender, but the core requirement is always your birth details.",
  },
  {
    q: "AI astrologer vs human astrologer",
    a: "The biggest difference between an AI astrologer and a human astrologer is speed and availability. An AI astrologer can process thousands of astrological calculations in seconds, is available 24/7, and provides consistent readings every time. A human astrologer brings years of intuitive experience and can offer personalized conversation. Many people use both — AI for quick daily insights and humans for deep consultations.",
  },
  {
    q: "Which is the best AI astrologer?",
    a: 'The best AI astrologer depends on what you need. <a href="/" class="text-primary underline underline-offset-4 hover:opacity-80">AstroVaanii</a> is trained on classical Parashara and Jaimini Vedic methods, supports 9 Indian languages, and offers conversational AI astrology — meaning you can ask follow-up questions and get contextual answers. For Vedic astrology enthusiasts, AstroVaanii is widely considered one of the best AI astrologers available today.',
  },
];

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: stripHtml(f.a) },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is an AI Astrologer? How It Works",
  description:
    "Learn what an AI astrologer is and how it reads your birth chart using AI. Discover how AI astrologers provide personalized astrology insights instantly.",
  image: "https://astrovaanii.in/what-is-ai-astrologer.webp",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
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
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://astrovaanii.in/blogs" },
    {
      "@type": "ListItem",
      position: 3,
      name: "What Is an AI Astrologer?",
      item: "https://astrovaanii.in/blogs/what-is-ai-astrologer",
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

function WhatIsAiAstrologerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            AstroVaanii
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try AI Astrologer — Free
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li className="text-muted-foreground/40" aria-hidden="true">/</li>
            <li>
              <Link to="/blogs" className="hover:text-foreground transition-colors">Blog</Link>
            </li>
            <li className="text-muted-foreground/40" aria-hidden="true">/</li>
            <li className="text-foreground font-medium" aria-current="page">
              What Is an AI Astrologer?
            </li>
          </ol>
        </nav>

        <header>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime="2026-07-08">July 8, 2026</time>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>8 min read</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            What Is an AI Astrologer? A Simple Guide to How It Works
          </h1>
          <img
            src="/what-is-ai-astrologer.webp"
            alt="What is an AI astrologer - illustration of AI astrology chart reading"
            width={1200}
            height={630}
            className="mt-8 w-full rounded-3xl object-cover shadow-md"
            loading="eager"
          />
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            Astrology has been part of human life for thousands of years. People have always
            looked at the stars and planets to understand their personality, relationships,
            career, and future. Today, technology has changed the way people access astrology.
            Instead of waiting for an appointment or reading long books, many people now use an{" "}
            <strong className="text-foreground">AI astrologer</strong> to get answers within
            seconds.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            But what is an AI astrologer? How does it actually work? Is it real? Can it read
            your birth chart correctly?
          </p>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            In this guide, you will learn everything about AI astrologers in simple English.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            What Is an AI Astrologer?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            An <strong className="text-foreground">AI astrologer</strong> is a digital tool
            powered by artificial intelligence that analyzes your birth chart and provides
            personalized astrology insights.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            It combines traditional astrology with modern technology. Instead of manually
            studying a birth chart, an AI astrologer can process thousands of astrological
            calculations in just a few seconds.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            When you enter your birth details — such as your date of birth, birth time, and
            birth place — the AI astrologer creates your birth chart and studies different
            astrological factors. It then explains the results in easy-to-understand language.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The goal of an AI astrologer is to make astrology faster, easier, and available to
            everyone.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            How Does an AI Astrologer Work?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Many people think an AI astrologer simply guesses the answers. That is not true.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            A good AI astrologer system follows several steps before giving a prediction.
          </p>

          <h3 className="mt-8 font-display text-xl font-medium text-foreground">
            Step 1. It collects your birth details
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The first step is collecting accurate birth information. Usually you need to enter:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
            <li>Date of birth</li>
            <li>Birth time</li>
            <li>Birth place</li>
          </ul>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            These details are important because even a small change in birth time can change the
            birth chart.
          </p>

          <h3 className="mt-8 font-display text-xl font-medium text-foreground">
            Step 2. It creates your birth chart
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Using astronomical calculations, the AI astrologer finds the exact positions of
            planets at the moment you were born. It creates your horoscope or birth chart based
            on those planetary positions.
          </p>

          <h3 className="mt-8 font-display text-xl font-medium text-foreground">
            Step 3. It studies astrological combinations
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The AI astrologer examines many important factors, including:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
            <li>Planet positions</li>
            <li>Zodiac signs</li>
            <li>Houses</li>
            <li>Nakshatras</li>
            <li>Planetary aspects</li>
            <li>Dasha periods</li>
            <li>Yogas</li>
          </ul>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Instead of checking these one by one like a human, AI can analyze them almost
            instantly.
          </p>

          <h3 className="mt-8 font-display text-xl font-medium text-foreground">
            Step 4. It explains everything in simple language
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Traditional astrology books often use difficult words. An AI astrologer converts
            complex astrological information into simple explanations that anyone can understand.
            Instead of reading technical astrology terms, you receive practical guidance about
            different areas of life.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Why Are AI Astrologers Becoming Popular?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            AI astrologers have become popular because they save time and make astrology easier
            to access.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Here are some reasons why more people are using them.
          </p>

          <h3 className="mt-6 font-display text-xl font-medium text-foreground">
            Instant results
          </h3>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Instead of waiting for hours or days, you can receive your horoscope within seconds.
          </p>

          <h3 className="mt-6 font-display text-xl font-medium text-foreground">
            Available anytime
          </h3>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            You can use an AI astrologer at any time of the day without booking an appointment.
          </p>

          <h3 className="mt-6 font-display text-xl font-medium text-foreground">
            Easy to understand
          </h3>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Many AI astrologer platforms explain complicated astrology in simple English.
          </p>

          <h3 className="mt-6 font-display text-xl font-medium text-foreground">
            Personalized readings
          </h3>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Every prediction is based on your own birth details instead of general zodiac sign
            predictions.
          </p>

          <h3 className="mt-6 font-display text-xl font-medium text-foreground">
            Consistent analysis
          </h3>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            The same birth details always produce the same astrological calculations.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            What Can an AI Astrologer Tell You?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            An AI astrologer can provide insights into many parts of life.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Some common topics include:
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-muted-foreground sm:grid-cols-3">
            {[
              "Career",
              "Love life",
              "Marriage",
              "Education",
              "Health",
              "Family",
              "Money",
              "Personality",
              "Strengths",
              "Weaknesses",
              "Daily horoscope",
              "Monthly horoscope",
              "Lucky colors",
              "Lucky numbers",
            ].map((item) => (
              <li key={item} className="list-disc pl-4">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The information depends on the features offered by the AI astrologer platform.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Is an AI Astrologer Accurate?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The accuracy of an AI astrologer depends mainly on two things.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The first is the accuracy of your birth details. If your birth time or birth place
            is incorrect, the birth chart may also be incorrect.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The second is the quality of the AI astrologer system. A well-designed AI astrologer
            platform uses accurate astronomical calculations and follows proper astrological rules
            before generating predictions.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            When both of these are correct, an AI astrologer can provide highly personalized
            astrology readings based on your birth chart.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            AI Astrologer vs Traditional Astrologer
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Both an AI astrologer and a traditional astrologer study the same birth chart.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The biggest difference is how the information is analyzed and explained.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            A traditional astrologer studies the chart manually using years of knowledge and
            experience. An AI astrologer performs the calculations automatically and explains the
            results almost instantly.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Many people choose an AI astrologer because it is fast, convenient, and available
            whenever they need guidance.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Who Should Use an AI Astrologer?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            An AI astrologer is useful for anyone who wants to understand their birth chart in a
            simple way.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            It can be helpful if you:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
            <li>Want instant astrology reports</li>
            <li>Want daily guidance</li>
            <li>Are new to astrology</li>
            <li>Prefer simple explanations</li>
            <li>Want to explore your horoscope from home</li>
          </ul>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Since everything happens online, getting started is very easy.{" "}
            <Link
              to="/"
              className="text-primary underline underline-offset-4 hover:opacity-80"
            >
              Try AstroVaanii's AI astrologer
            </Link>{" "}
            and get your personalized reading in seconds.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            The Future of AI Astrologers
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Artificial intelligence is improving every year.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Future AI astrologer platforms may provide even more personalized insights, better
            explanations, faster calculations, and smarter conversations.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            As technology continues to improve, AI astrologers will become more interactive and
            easier for everyone to use.
          </p>
        </section>

        <section className="mt-12 rounded-3xl border border-border bg-card p-8">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Final Thoughts
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            An AI astrologer combines traditional astrological knowledge with modern artificial
            intelligence to make astrology faster, simpler, and more accessible.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            By analyzing your birth details and planetary positions, an AI astrologer can
            generate personalized insights about different areas of your life within seconds.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Whether you are curious about your personality, career, relationships, or future
            opportunities, an AI astrologer offers an easy way to explore your birth chart
            without needing advanced knowledge of astrology.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
            >
              Chat with Vaanii — Your AI Astrologer
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything you need to know about AI astrologers.
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

        <section className="mt-16 border-t border-border pt-12 text-center">
          <p className="text-muted-foreground">
            Ready to experience an AI astrologer yourself?{" "}
            <Link
              to="/"
              className="text-primary underline underline-offset-4 hover:opacity-80"
            >
              Chat with Vaanii
            </Link>{" "}
            — it's free.
          </p>
        </section>
      </article>

      <footer className="border-t border-border bg-card/40 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/blogs" className="hover:text-foreground">Blog</Link>
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-foreground">Terms &amp; Conditions</Link>
            <Link to="/refund-policy" className="hover:text-foreground">Refund Policy</Link>
            <Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground/60">&copy; {new Date().getFullYear()} AstroVaanii</p>
        </div>
      </footer>
    </main>
  );
}
