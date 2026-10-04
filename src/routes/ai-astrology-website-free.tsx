import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  BrainCircuit,
  Calculator,
  CheckCircle2,
  Database,
  Globe,
  LockKeyhole,
  MessageCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import brandIcon from "@/assets/astrovaanii-logo.png";
import { DashaCalculatorCallout } from "@/components/landing/DashaCalculatorCallout";

const canonicalUrl = "https://astrovaanii.in/ai-astrology-website-free";
const socialImage = "https://astrovaanii.in/free-ai-astrology-website.webp";

const faqs = [
  {
    q: "What is an AI astrology website?",
    a: "An AI astrology website combines chart-calculation software with a language system that explains astrological data in conversational language. The calculation layer determines placements such as the Ascendant, planets, houses, Nakshatras, and Dashas; the AI layer turns those results into an explanation.",
  },
  {
    q: "Does AI calculate the birth chart by itself?",
    a: "A dependable platform should use a dedicated astronomical calculation engine for the chart. A language model should explain the calculated output, not guess planetary positions from a date and place written in a prompt.",
  },
  {
    q: "What information does an AI astrology website need?",
    a: "A natal-chart reading normally requires the date, exact local time, and place of birth. The place supplies coordinates and timezone information. Some services also ask for a name or account, but those fields are not required for the astronomical calculation itself.",
  },
  {
    q: "How can I evaluate an AI astrology website?",
    a: "Look for a clearly named astrology system, a documented ephemeris or calculation method, an explanation of how uncertain birth times are handled, visible privacy terms, sensible limitations, and the ability to distinguish calculated chart facts from interpretive guidance.",
  },
  {
    q: "Are AI astrology readings scientifically proven?",
    a: "No. Astrology is a traditional belief system and interpretive framework, not a scientifically validated method for predicting events. AI can calculate and explain an astrological model consistently, but it does not turn astrology into scientific evidence or guarantee outcomes.",
  },
  {
    q: "Is birth data sensitive?",
    a: "Yes. A full birth date, time, location, name, and account details can identify a person when combined. Before using a service, read its privacy policy and check what is stored, which third parties receive data, how deletion works, and whether an account is necessary.",
  },
  {
    q: "Can AI astrology replace a human astrologer?",
    a: "AI is useful for fast calculation, consistent explanations, and self-guided learning. A human practitioner can bring dialogue, cultural context, empathy, and professional judgment. Neither should replace qualified medical, legal, financial, or mental-health advice.",
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

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Astrology Websites: How They Work and What to Look For",
  description:
    "Learn how AI astrology websites calculate birth charts, use AI for interpretation, protect birth data, and where their limitations lie.",
  image: socialImage,
  mainEntityOfPage: canonicalUrl,
  datePublished: "2026-07-10",
  dateModified: "2026-10-04",
  author: {
    "@type": "Organization",
    name: "AstroVaanii Editorial Team",
    url: "https://astrovaanii.in/",
  },
  publisher: {
    "@type": "Organization",
    name: "AstroVaanii",
    url: "https://astrovaanii.in/",
    logo: {
      "@type": "ImageObject",
      url: "https://astrovaanii.in/astrovaanii-schema-logo.png",
    },
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
      name: "AI Astrology Website Guide",
      item: canonicalUrl,
    },
  ],
};

export const Route = createFileRoute("/ai-astrology-website-free")({
  head: () => ({
    meta: [
      { title: "AI Astrology Websites: How They Work & What to Look For" },
      {
        name: "description",
        content:
          "Learn how AI astrology websites calculate birth charts, use AI for interpretation, protect birth data, and what to check before choosing a platform.",
      },
      {
        property: "og:title",
        content: "AI Astrology Websites: How They Work & What to Look For",
      },
      {
        property: "og:description",
        content:
          "A practical guide to AI astrology calculations, interpretation, privacy, limitations, and choosing a trustworthy platform.",
      },
      { property: "og:url", content: canonicalUrl },
      { property: "og:type", content: "article" },
      { property: "og:image", content: socialImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "AI astrology website guide with a Vedic birth chart interface",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "AI Astrology Websites: How They Work & What to Look For",
      },
      {
        name: "twitter:description",
        content:
          "Understand the calculation, AI interpretation, privacy, and limitations behind AI astrology websites.",
      },
      { name: "twitter:image", content: socialImage },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl },
      { rel: "preload", href: "/free-ai-astrology-website.webp", as: "image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(articleJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
    ],
  }),
  component: AiAstrologyWebsiteGuide,
});

const evaluationPoints = [
  {
    icon: Calculator,
    title: "A real calculation engine",
    description:
      "The service should calculate planetary positions and chart factors with an ephemeris instead of asking a language model to invent them.",
  },
  {
    icon: Globe,
    title: "A clearly named astrology system",
    description:
      "It should state whether it uses Vedic or Western astrology, the zodiac type, ayanamsa, house convention, and relevant timing system.",
  },
  {
    icon: BrainCircuit,
    title: "Calculation separated from interpretation",
    description:
      "You should be able to tell which statements are computed chart facts and which are symbolic interpretations generated from those facts.",
  },
  {
    icon: LockKeyhole,
    title: "Understandable privacy controls",
    description:
      "The privacy policy should explain storage, third-party processors, retention, account deletion, and how birth and conversation data are used.",
  },
  {
    icon: TriangleAlert,
    title: "Honest limitations",
    description:
      "Responsible platforms avoid guaranteed outcomes and do not present astrology as medical, legal, financial, or mental-health advice.",
  },
  {
    icon: MessageCircle,
    title: "Explanations with context",
    description:
      "Useful answers should connect several chart factors, explain their reasoning, and let the user ask for clarification without overstating certainty.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Birth data is normalized",
    description:
      "The entered local date and time are matched to the birthplace coordinates and timezone so the service can identify the correct astronomical moment.",
  },
  {
    number: "02",
    title: "The chart is calculated",
    description:
      "An ephemeris supplies celestial positions. The astrology engine then applies its chosen zodiac, ayanamsa, houses, Nakshatras, aspects, and timing rules.",
  },
  {
    number: "03",
    title: "Relevant chart factors are selected",
    description:
      "The system gathers placements connected with the question, such as a house, its lord, active Dasha periods, and current transits.",
  },
  {
    number: "04",
    title: "AI explains the structured data",
    description:
      "A language model turns the calculated factors into readable prose. It should explain the symbolic interpretation without changing the underlying chart data.",
  },
];

function AiAstrologyWebsiteGuide() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2" aria-label="AstroVaanii home">
            <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-lg">
              Astro<span className="text-primary">Vaanii</span>
            </span>
          </Link>
          <Link
            to="/ai-astrologer"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try Vaanii
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              AI Astrology Website Guide
            </li>
          </ol>
        </nav>

        <header className="grid items-center gap-10 rounded-3xl border border-border bg-card/60 p-7 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Practical Guide
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
              What Is an AI Astrology Website and How Does It Work?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              An AI astrology website combines astronomical chart calculations with an AI
              explanation layer. This guide shows what happens between entering birth details and
              receiving a reading—and what to verify before trusting a platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span>Updated October 4, 2026</span>
              <span aria-hidden="true">•</span>
              <span>8 minute read</span>
            </div>
          </div>
          <img
            src="/free-ai-astrology-website.webp"
            alt="AI astrology website displaying a Vedic birth chart and an interpretation interface"
            width={1200}
            height={630}
            fetchPriority="high"
            className="aspect-[1200/630] w-full rounded-2xl object-cover shadow-lg"
          />
        </header>

        <section className="mt-10 rounded-3xl border border-primary/25 bg-primary/5 p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-foreground">The short answer</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The best way to understand an AI astrology website is as two connected systems. A
            calculation engine constructs the chart from astronomical data and declared astrology
            rules. An AI system then explains that structured chart in ordinary language. The AI
            should not be responsible for guessing where the planets were.
          </p>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Two separate layers
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-4xl">
            Astrology calculation is not the same as AI interpretation
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A birth chart is a structured calculation. It depends on a moment in time, geographic
            coordinates, timezone conversion, celestial positions, and the conventions of the
            selected astrology system. A language model is useful after those facts have been
            calculated, when the job becomes explaining relationships among placements and answering
            follow-up questions.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-card">
                <tr>
                  <th className="px-5 py-4 font-display text-sm text-foreground">Layer</th>
                  <th className="px-5 py-4 font-display text-sm text-foreground">
                    What it should do
                  </th>
                  <th className="px-5 py-4 font-display text-sm text-foreground">
                    What can go wrong
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm text-muted-foreground">
                <tr>
                  <td className="px-5 py-4 font-medium text-foreground">Calculation engine</td>
                  <td className="px-5 py-4">
                    Compute planets, houses, Lagna, Nakshatras, and timing periods.
                  </td>
                  <td className="px-5 py-4">
                    Wrong timezone, uncertain birth time, or undocumented settings.
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-foreground">Rules and context</td>
                  <td className="px-5 py-4">
                    Select the chart factors relevant to the user&apos;s question.
                  </td>
                  <td className="px-5 py-4">
                    Oversimplifying one placement or mixing incompatible systems.
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-foreground">AI explanation</td>
                  <td className="px-5 py-4">
                    Translate structured chart data into understandable language.
                  </td>
                  <td className="px-5 py-4">
                    Inventing facts, overstating certainty, or giving unsafe advice.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Workflow</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-4xl">
            How an AI astrology website produces a reading
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {workflow.map((step) => (
              <section key={step.number} className="rounded-2xl border border-border bg-card p-6">
                <div className="text-sm font-semibold text-primary">{step.number}</div>
                <h3 className="mt-3 font-display text-xl font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Evaluation checklist
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-4xl">
            What to look for when choosing a platform
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A polished chat interface does not reveal whether the chart underneath it is sound.
            Check the calculation method, privacy terms, and limitations before judging the quality
            of the generated prose.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {evaluationPoints.map((point) => (
              <section key={point.title} className="rounded-2xl border border-border bg-card p-6">
                <point.icon
                  className="text-primary"
                  size={26}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-xl font-medium text-foreground">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-7">
            <Database className="text-primary" size={28} strokeWidth={1.6} aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
              The role of Vedic calculation settings
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              “Vedic astrology” is not a sufficient technical description by itself. A useful
              service should identify details such as the sidereal zodiac, ayanamsa, chart format,
              house convention, and Dasha system it uses. AstroVaanii&apos;s tools use sidereal
              chart calculations with Lahiri ayanamsa and Swiss Ephemeris data.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Birth time deserves special attention because the Ascendant and houses can change
              quickly. A service should explain uncertainty instead of silently substituting a time
              and presenting the result as exact.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7">
            <ShieldCheck className="text-primary" size={28} strokeWidth={1.6} aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
              Privacy questions to ask before entering birth data
            </h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              {[
                "Is an account required, and which details are optional?",
                "Is the chart stored after the calculation is complete?",
                "Which geocoding, analytics, payment, or AI providers receive data?",
                "Can the user delete the chart, conversations, and account?",
                "Is personal data used to train models or shared for advertising?",
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-primary"
                    size={17}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Review a service&apos;s written policy rather than relying only on security badges or
              marketing claims. You can read AstroVaanii&apos;s{" "}
              <Link to="/privacy-policy" className="text-primary underline underline-offset-4">
                privacy policy
              </Link>{" "}
              before submitting personal information.
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-amber-300/50 bg-amber-50/60 p-7 dark:border-amber-800/50 dark:bg-amber-950/20">
          <div className="flex gap-4">
            <Scale
              className="mt-1 shrink-0 text-amber-700 dark:text-amber-400"
              size={28}
              aria-hidden="true"
            />
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                What AI astrology cannot establish
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                AI can make an astrological system faster to calculate and easier to discuss. It
                cannot scientifically validate astrology, guarantee an event, remove uncertainty, or
                understand a person&apos;s full circumstances from chart data alone.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Treat a reading as cultural, spiritual, or reflective guidance. Decisions involving
                health, safety, law, money, or mental wellbeing should be based on appropriate
                professional advice and real-world evidence.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Comparison
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-4xl">
            AI astrology, traditional software, and human consultation
          </h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-card">
                <tr>
                  <th className="px-5 py-4 font-display text-sm text-foreground">Approach</th>
                  <th className="px-5 py-4 font-display text-sm text-foreground">Strength</th>
                  <th className="px-5 py-4 font-display text-sm text-foreground">Limitation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm text-muted-foreground">
                <tr>
                  <td className="px-5 py-4 font-medium text-foreground">
                    Traditional chart software
                  </td>
                  <td className="px-5 py-4">
                    Repeatable calculations and detailed technical tables.
                  </td>
                  <td className="px-5 py-4">
                    Often relies on fixed descriptions or specialist terminology.
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-foreground">AI astrology website</td>
                  <td className="px-5 py-4">
                    Conversational explanations and fast follow-up questions.
                  </td>
                  <td className="px-5 py-4">
                    Can sound confident even when context or calculation inputs are weak.
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-foreground">Human consultation</td>
                  <td className="px-5 py-4">
                    Dialogue, empathy, cultural context, and nuanced judgment.
                  </td>
                  <td className="px-5 py-4">
                    Quality, method, availability, and cost vary by practitioner.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 to-card p-8 text-center md:p-12">
          <Sparkles
            className="mx-auto text-primary"
            size={32}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-4xl">
            Want to try it yourself?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Vaanii combines a Vedic chart-calculation engine with a conversational explanation. You
            can start with your birth details and ask one focused question about your chart.
          </p>
          <Link
            to="/ai-astrologer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-opacity hover:opacity-90"
          >
            Try the AI Astrologer
            <MessageCircle size={17} aria-hidden="true" />
          </Link>
        </section>

        <DashaCalculatorCallout />

        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            Frequently asked questions
          </h2>
          <div className="mt-7 divide-y divide-border rounded-3xl border border-border bg-card">
            {faqs.map((faq) => (
              <details key={faq.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-foreground">
                  {faq.q}
                  <span
                    className="text-primary transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <aside className="mt-16 border-t border-border pt-10" aria-labelledby="related-reading">
          <div className="flex items-center gap-3">
            <BookOpen className="text-primary" size={24} aria-hidden="true" />
            <h2
              id="related-reading"
              className="font-display text-2xl font-semibold text-foreground"
            >
              Continue learning
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["/blogs/what-is-ai-astrologer", "What is an AI astrologer?"],
              ["/blogs/how-ai-reads-your-birth-chart", "How AI reads a birth chart"],
              ["/blogs/top-5-ai-astrology-platform-in-india", "Compare AI astrology platforms"],
              ["/free-kundli", "Generate a Vedic birth chart"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {label} →
              </Link>
            ))}
          </div>
        </aside>
      </article>

      <footer className="border-t border-border bg-card/40 py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-7 gap-y-3 px-4 text-sm text-muted-foreground sm:px-6">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <Link to="/ai-astrologer" className="hover:text-foreground">
            AI Astrologer
          </Link>
          <Link to="/tools" className="hover:text-foreground">
            Astrology Tools
          </Link>
          <Link to="/blogs" className="hover:text-foreground">
            Blog
          </Link>
          <Link to="/privacy-policy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/disclaimer" className="hover:text-foreground">
            Disclaimer
          </Link>
        </div>
      </footer>
    </main>
  );
}
