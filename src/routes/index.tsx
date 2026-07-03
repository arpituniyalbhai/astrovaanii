import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader } from "@/components/landing/Loader";
import { Reveal } from "@/components/landing/Reveal";
import heroChart from "@/assets/hero-chart.jpg";
import reportKundli from "@/assets/report-kundli.jpg";
import reportWealth from "@/assets/report-wealth.jpg";
import reportPastlife from "@/assets/report-pastlife.jpg";
import sectionCosmos from "@/assets/section-cosmos.jpg";

const faqs = [
  {
    q: "How is my Kundli reading personalised?",
    a: "Every report is generated from your exact date, time and place of birth. Our Jyotish engine calculates planetary positions, dashas and yogas — then human astrologers translate the chart into plain language guidance for your life.",
  },
  {
    q: "What makes the Kundli Milan (matchmaking) report different?",
    a: "We go beyond the 36-Guna score. You get dosha analysis (Mangal, Nadi, Bhakoot), timing windows for marriage, financial compatibility, and honest remedies — not vague reassurance.",
  },
  {
    q: "In which languages are reports available?",
    a: "English, Hindi, Marathi, Tamil, Telugu, Kannada, Malayalam, Bengali and Gujarati. You can switch language anytime — the meaning stays intact.",
  },
  {
    q: "Is my birth data private?",
    a: "Yes. Data is encrypted at rest, never sold, and used only to compute your chart. You can delete your profile and all associated reports with one tap.",
  },
  {
    q: "Do you offer refunds if I'm not satisfied?",
    a: "Every paid report carries a 7-day satisfaction guarantee. If the reading doesn't resonate, we refund — no questionnaire, no friction.",
  },
];

const reviews = [
  { name: "Priya S.", city: "Pune", stars: 5, text: "The Kundli Milan report gave us clarity our families had been circling for months. Honest, warm, and specific — not the usual copy-paste." },
  { name: "Arun K.", city: "Chennai", stars: 5, text: "I read my Past Life report twice. The timeline of karmic patterns explained fears I've carried since childhood. Beautifully written." },
  { name: "Meera J.", city: "Ahmedabad", stars: 5, text: "The Wealth report timed a career move perfectly. Six months later, exactly the shift they described happened." },
  { name: "Rahul V.", city: "Bengaluru", stars: 5, text: "Reading in Kannada made all the difference. It felt like a conversation with a family astrologer, not an app." },
];

const languages = ["English", "हिंदी", "मराठी", "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "മലയാളം", "বাংলা", "ગુજરાતી"];

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="currentColor">
            <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
          </svg>
          <span className="font-display text-lg">Aakash <span className="text-primary">Astro</span></span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#reports" className="hover:text-foreground">Reports</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#reviews" className="hover:text-foreground">Reviews</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <a href="#reports" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Get your chart
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden grain">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24" />
      <div className="orb h-[380px] w-[380px] bg-[color:var(--clay)] -right-24 top-40 opacity-40" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--sage)]" />
              Trusted by 2M+ seekers across India
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Your chart, <em className="not-italic text-primary">read like a letter</em> from someone who knows you.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Precise Vedic astrology — Kundli Milan, Wealth, Past Life and more —
              written in your native language, grounded in tradition, honest about timing.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#reports" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90">
                Generate free birth chart
              </a>
              <a href="#how" className="rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium hover:bg-card">
                See how it works
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Reports</dt><dd className="mt-1 font-display text-2xl">2.4M+</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Languages</dt><dd className="mt-1 font-display text-2xl">9</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Rating</dt><dd className="mt-1 font-display text-2xl">4.9★</dd></div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute inset-0 -rotate-3 rounded-3xl bg-[color:var(--accent)] shadow-xl" />
            <img
              src={heroChart}
              alt="Watercolor illustration of hands holding a Vedic astrology chart"
              width={1024}
              height={1280}
              className="relative h-full w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="float absolute -left-8 top-10 w-40 rounded-2xl border border-border bg-card p-4 shadow-lg" style={{ ["--r" as any]: "-4deg" }}>
              <div className="text-xs text-muted-foreground">Today's transit</div>
              <div className="mt-1 font-display text-lg">Moon in Rohini</div>
              <div className="mt-1 text-xs text-[color:var(--sage)]">Favourable for beginnings</div>
            </div>
            <div className="float absolute -right-6 bottom-14 w-44 rounded-2xl border border-border bg-card p-4 shadow-lg" style={{ ["--r" as any]: "3deg", animationDelay: "1.4s" }}>
              <div className="text-xs text-muted-foreground">Compatibility</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-display text-2xl text-primary">31</span>
                <span className="text-sm text-muted-foreground">/ 36 Guna</span>
              </div>
              <div className="mt-1 text-xs">Strong match</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Kundli", "Wealth", "Marriage", "Past Life", "Career", "Health", "Doshas", "Remedies"];
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-border bg-card/40 py-5 overflow-hidden">
      <div className="marquee-track gap-12 text-muted-foreground">
        {doubled.map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-xl">
            {w}
            <span className="text-primary/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function WhatIs() {
  return (
    <section className="relative py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">What is Aakash</span>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Vedic astrology, written the way your grandmother might have explained it.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Aakash is a Jyotish reading service, not a horoscope feed. Each report is a personal document
            drawn from your birth chart — dashas, doshas, planetary strengths, timing windows — narrated
            in a language that respects your context.
          </p>
          <ul className="mt-6 space-y-3 text-foreground/90">
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Grounded in classical Parashara &amp; Jaimini methods</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Reviewed by practising astrologers, not templated</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Honest about timing, gentle about karma</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Reports() {
  const reports = [
    { title: "Kundli Milan Report", desc: "Full compatibility beyond Guna matching — doshas, timing, financial fit.", img: reportKundli, tag: "Marriage" },
    { title: "Wealth & Career Report", desc: "Prosperity windows, career yogas and remedies tied to your Dhana bhava.", img: reportWealth, tag: "Prosperity" },
    { title: "Past Life Report", desc: "Karmic patterns from Rahu-Ketu axis, with rituals to release what binds.", img: reportPastlife, tag: "Karma" },
  ];
  return (
    <section id="reports" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Reports</span>
            <h2 className="mt-4 max-w-xl font-display text-4xl md:text-5xl">Get Marriage, Past Life &amp; more.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-sm text-muted-foreground">
              Nine detailed readings, each drawn from your unique chart. Preview a sample before you unlock.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {reports.map((r, i) => (
            <Reveal key={r.title} delay={i * 100}>
              <article className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-transform hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.title}
                    loading="lazy"
                    width={912}
                    height={1104}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs backdrop-blur">
                    {r.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-primary">Preview sample →</span>
                    <span className="text-xs text-muted-foreground">from ₹299</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Share birth details", d: "Date, time and place. That's the only data we need to compute your chart." },
    { n: "02", t: "We cast your Kundli", d: "Planetary positions, houses, dashas — calculated with classical precision." },
    { n: "03", t: "Astrologers interpret", d: "A human reader turns the chart into narrative guidance for your questions." },
    { n: "04", t: "Read in your language", d: "Delivered in nine Indian languages, revisit anytime from your library." },
  ];
  return (
    <section id="how" className="relative overflow-hidden py-24">
      <img
        src={sectionCosmos}
        alt=""
        aria-hidden
        loading="lazy"
        width={1600}
        height={912}
        className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">How it works</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">
            Four calm steps, from birth date to a report you'll actually re-read.
          </h2>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <li className="h-full rounded-3xl border border-border bg-card/80 p-6 backdrop-blur">
                <div className="font-display text-3xl text-primary/60">{s.n}</div>
                <h3 className="mt-4 font-display text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Languages() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Your language, your life</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Personalised guidance in nine native scripts.</h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Astrology loses nuance in translation. So every report is written natively, not machine-swapped —
            the metaphor, the tone, the warmth stays yours.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative mx-auto flex h-[360px] w-full max-w-md items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full border border-dashed border-border" />
            <div className="absolute h-96 w-96 rounded-full border border-dashed border-border/50" />
            {languages.map((lang, i) => {
              const angle = (i / languages.length) * Math.PI * 2 - Math.PI / 2;
              const isPrimary = lang === "हिंदी";
              const r = isPrimary ? 0 : 140;
              return (
                <div
                  key={lang}
                  className={`absolute flex items-center justify-center rounded-2xl text-center font-display transition-transform hover:scale-110 ${
                    isPrimary
                      ? "z-10 h-24 w-24 bg-primary text-primary-foreground text-3xl shadow-xl"
                      : "h-14 w-14 bg-card text-foreground text-sm border border-border shadow"
                  }`}
                  style={{
                    transform: `translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px)`,
                  }}
                >
                  {lang}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Reviews</span>
            <h2 className="mt-4 max-w-xl font-display text-4xl md:text-5xl">
              Read by seekers who came back to say thank you.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex text-primary text-lg">★★★★★</div>
              <span>4.9 average from 48,000+ reviews</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <figure className="h-full rounded-3xl border border-border bg-card p-8">
                <div className="flex text-primary">{"★".repeat(r.stars)}</div>
                <blockquote className="mt-4 font-display text-xl leading-snug text-foreground">
                  "{r.text}"
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">
                  {r.name} · {r.city}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">FAQ</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Everything before you begin.</h2>
          <p className="mt-6 text-muted-foreground">
            Real answers written by our astrology team. Still curious? Write to us at
            <a href="mailto:hello@aakashastro.in" className="ml-1 text-primary underline underline-offset-4">hello@aakashastro.in</a>.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <ul className="divide-y divide-border rounded-3xl border border-border bg-card">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg">{f.q}</span>
                    <span className={`h-6 w-6 shrink-0 rounded-full border border-border text-primary transition-transform ${isOpen ? "rotate-45" : ""}`}>
                      <svg viewBox="0 0 24 24" className="h-full w-full"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                    </span>
                  </button>
                  <div className={`grid overflow-hidden px-6 transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="min-h-0 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="orb h-[360px] w-[360px] bg-[color:var(--gold)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight md:text-6xl">
            Your chart is waiting.<br /><em className="not-italic text-primary">Read it tonight.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Generate a free birth chart in under two minutes. Unlock detailed reports only if the preview resonates.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <a href="#reports" className="mt-10 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-xl shadow-primary/25 hover:opacity-90">
            Generate free birth chart
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="currentColor">
              <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
            </svg>
            <span className="font-display text-lg">Aakash Astro</span>
          </div>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Vedic astrology reports written with care, in your language.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
          <a href="#reports" className="hover:text-foreground">Reports</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          <a href="mailto:hello@aakashastro.in" className="hover:text-foreground">Contact</a>
        </div>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Aakash Astro</div>
      </div>
    </footer>
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Aakash Astro — Personalised Vedic Astrology Reports in Your Language" },
      {
        name: "description",
        content:
          "Kundli Milan, Wealth and Past Life reports written by real astrologers in nine Indian languages. Trusted by 2M+ seekers. Free birth chart.",
      },
      { property: "og:title", content: "Aakash Astro — Vedic Astrology, Read Like a Letter" },
      {
        property: "og:description",
        content: "Personalised Kundli, Wealth and Past Life reports in your native language.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd) }],
  }),
});

function Index() {
  return (
    <>
      <Loader />
      <main className="relative">
        <Nav />
        <Hero />
        <Marquee />
        <WhatIs />
        <Reports />
        <HowItWorks />
        <Languages />
        <Reviews />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
