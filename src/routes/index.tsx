import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader } from "@/components/landing/Loader";
import { Reveal } from "@/components/landing/Reveal";
import brandIcon from "@/assets/startalks-icon.png";
import vaaniiPersona from "@/assets/vaanii-persona.jpg";
import chatPreview from "@/assets/chat-preview.jpg";
import sectionCosmos from "@/assets/section-cosmos.jpg";

const faqs = [
  {
    q: "Is AstroVaanii as accurate as a human astrologer?",
    a: "The calculations are identical — planetary positions, dashas and yogas follow classical Parashara rules. Where a human astrologer's reading varies with mood and experience, AstroVaanii gives the same rigorous interpretation every time, trained on thousands of classical readings and reviewed by practising astrologers.",
  },
  {
    q: "How does Vaanii generate my reading?",
    a: "You share your birth date, time and place. Our engine casts your chart, identifies active dashas, yogas and doshas, and Vaanii interprets them in natural language — in the tone of a family astrologer, not a textbook.",
  },
  {
    q: "Can I ask follow-up questions?",
    a: "Yes. AstroVaanii is a conversation, not a one-time report. Ask about career timing, marriage windows, a specific worry — Vaanii remembers your chart across the whole conversation.",
  },
  {
    q: "Is my birth data safe?",
    a: "Birth details are encrypted, never sold, and never used to train third-party models. You can delete your chart and every conversation with one tap.",
  },
  {
    q: "Which languages does AstroVaanii speak?",
    a: "English, Hindi, Marathi, Tamil, Telugu, Kannada, Malayalam, Bengali and Gujarati. Switch languages mid-conversation — Vaanii keeps your context.",
  },
  {
    q: "Do humans review Vaanii's readings?",
    a: "Our team of practising Jyotishis audits sample conversations weekly and continuously tunes the interpretation layer. You get AI speed with human oversight — transparent, not hidden.",
  },
];

const reviews = [
  { name: "Priya S.", city: "Pune", stars: 5, text: "I asked Vaanii about my career shift at 2 AM and got a thoughtful reading in five minutes. No astrologer would pick up. This just works." },
  { name: "Arun K.", city: "Chennai", stars: 5, text: "Follow-up questions are the game changer. I kept asking 'but why?' and Vaanii kept explaining — like a patient teacher, not a horoscope app." },
  { name: "Meera J.", city: "Ahmedabad", stars: 5, text: "Switched to Gujarati mid-conversation and it flowed naturally. Felt like talking to a family jyotishi, not a chatbot." },
  { name: "Rahul V.", city: "Bengaluru", stars: 5, text: "The Kundli Milan chat was more honest than three astrologers we visited. Vaanii flagged Nadi dosha without sugar-coating." },
];

const languages = ["English", "हिंदी", "मराठी", "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "മലയാളം", "বাংলা", "ગુજરાતી"];

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#meet" className="hover:text-foreground">Meet Vaanii</a>
          <a href="#daily" className="hover:text-foreground">Daily prediction</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <a href="#meet" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Start chat
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
              Trained on classical Parashara &amp; Jaimini methods
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Meet <em className="not-italic text-primary">Vaanii</em>, your personal AI astrologer.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              AstroVaanii is a Vedic AI astrologer available 24/7 — no appointments, no waiting.
              Classical Jyotish calculations, natural conversation, nine Indian languages.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#meet" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90">
                Chat with Vaanii
              </a>
              <a href="#daily" className="rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium hover:bg-card">
                Today &amp; tomorrow →
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Conversations</dt><dd className="mt-1 font-display text-2xl">2.4M+</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Languages</dt><dd className="mt-1 font-display text-2xl">9</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Rating</dt><dd className="mt-1 font-display text-2xl">4.9★</dd></div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            {/* Portrait frame — arched profile card */}
            <div className="absolute inset-0 -rotate-3 rounded-[999px_999px_28px_28px] bg-[color:var(--accent)] shadow-xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[999px_999px_28px_28px] shadow-2xl ring-1 ring-[color:var(--gold)]/40">
              <img
                src={vaaniiPersona}
                alt="Portrait of Vaanii, the AstroVaanii AI astrologer"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              {/* soft gold halo */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,transparent_55%,rgba(0,0,0,0.35))]" />
              {/* profile plate */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/35 px-4 py-3 text-white backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-base leading-tight">Vaanii</div>
                    <div className="text-[11px] uppercase tracking-widest text-white/70">AI Vedic Astrologer</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--sage)] shadow-[0_0_8px_var(--sage)]" />
                    Online
                  </div>
                </div>
              </div>
            </div>

            <div className="float absolute -left-8 top-10 w-44 rounded-2xl border border-border bg-card p-4 shadow-lg" style={{ ["--r" as any]: "-4deg" }}>
              <div className="text-xs text-muted-foreground">You asked</div>
              <div className="mt-1 font-display text-sm leading-snug">"How is my day today?"</div>
              <div className="mt-2 text-xs text-[color:var(--sage)]">Reply in 4 seconds</div>
            </div>
            <div className="float absolute -right-6 bottom-24 w-40 rounded-2xl border border-border bg-card p-4 shadow-lg" style={{ ["--r" as any]: "3deg", animationDelay: "1.4s" }}>
              <div className="text-xs text-muted-foreground">Available</div>
              <div className="mt-1 font-display text-2xl text-primary">24/7</div>
              <div className="mt-1 text-xs">No appointment</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Today", "Tomorrow", "Career", "Marriage", "Kundli Milan", "Wealth", "Timing", "Doshas", "Remedies"];
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

function DailyPrediction() {
  const [day, setDay] = useState<"today" | "tomorrow">("today");
  const signs = [
    { s: "Aries", g: "मेष" },
    { s: "Taurus", g: "वृषभ" },
    { s: "Gemini", g: "मिथुन" },
    { s: "Cancer", g: "कर्क" },
    { s: "Leo", g: "सिंह" },
    { s: "Virgo", g: "कन्या" },
    { s: "Libra", g: "तुला" },
    { s: "Scorpio", g: "वृश्चिक" },
    { s: "Sagittarius", g: "धनु" },
    { s: "Capricorn", g: "मकर" },
    { s: "Aquarius", g: "कुम्भ" },
    { s: "Pisces", g: "मीन" },
  ];
  const samplePrompts =
    day === "today"
      ? [
          "Vaanii, how is my day today?",
          "Is today a good day to sign the contract?",
          "Which hour is most favourable today?",
        ]
      : [
          "What does tomorrow look like for me?",
          "Should I travel tomorrow?",
          "Any dosha active in tomorrow's transit?",
        ];

  return (
    <section id="daily" className="relative overflow-hidden py-24">
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] left-1/3 top-10 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Daily readings</span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">
              Ask Vaanii for your <em className="not-italic text-primary">today</em> and{" "}
              <em className="not-italic text-primary">tomorrow</em> prediction.
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              A quick, personal reading based on live planetary transits and your own chart —
              not a generic sun-sign horoscope everyone else is reading.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="inline-flex rounded-full border border-border bg-card p-1 text-sm">
              <button
                onClick={() => setDay("today")}
                className={`rounded-full px-5 py-2 transition ${day === "today" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Today
              </button>
              <button
                onClick={() => setDay("tomorrow")}
                className={`rounded-full px-5 py-2 transition ${day === "tomorrow" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Tomorrow
              </button>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Chat mock */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <img src={vaaniiPersona} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-1 ring-[color:var(--gold)]/50" />
                <div>
                  <div className="font-display text-base">Vaanii</div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--sage)]" /> typing your {day}'s reading…
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground">
                  {samplePrompts[0]}
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-[color:var(--accent)]/60 px-4 py-3 text-sm leading-relaxed text-foreground">
                  {day === "today" ? (
                    <>
                      Moon transits your 10th house — a strong career window between{" "}
                      <b>11:20 AM – 1:40 PM</b>. Send that pending message, but avoid financial commitments after sunset.
                      Rahu is subtle today; keep decisions simple.
                    </>
                  ) : (
                    <>
                      Tomorrow's Chandra shifts into your 5th — creativity and children-related news feel warm.
                      Favourable muhurta around <b>9:05 AM – 10:30 AM</b>. Postpone travel past 7 PM; Mars aspect is
                      restless.
                    </>
                  )}
                </div>
                <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-primary/90 px-4 py-3 text-sm text-primary-foreground">
                  {samplePrompts[1]}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:200ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:400ms]" />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {samplePrompts.map((p) => (
                  <button key={p} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground/80 hover:bg-accent">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* How we see your prediction */}
          <Reveal delay={120}>
            <div className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl">
                  How we see your <span className="text-primary">{day}'s</span> prediction
                </h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                No sun-sign horoscopes. Three real inputs, one personal reading.
              </p>

              <ol className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-sm text-primary">1</span>
                  <div>
                    <div className="font-display text-base">Your birth details</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Date, exact time and place of birth — the foundation of your personal Kundli.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-sm text-primary">2</span>
                  <div>
                    <div className="font-display text-base">Real-time planetary positions</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We pull live transits from a NASA-grade ephemeris API — the same precision used in
                      space missions, updated every minute.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-sm text-primary">3</span>
                  <div>
                    <div className="font-display text-base">Analyzed by Vaanii AI</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Vaanii cross-reads your chart against today's transits using classical Parashara
                      rules — and explains it in plain language.
                    </p>
                  </div>
                </li>
              </ol>

              <a href="#meet" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                Get my {day}'s reading
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhatIs() {
  return (
    <section className="relative py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">What is an AI Astrologer</span>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            An astrologer who never sleeps, never rushes, never judges.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            AstroVaanii combines exact classical Vedic calculations with an interpretation model trained on
            thousands of real Jyotish readings. Vaanii reads your chart the way a seasoned astrologer would —
            just faster, always available, and consistent every single time.
          </p>
          <ul className="mt-6 space-y-3 text-foreground/90">
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Instant chart generation with zero wait time</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Trained on classical Parashara &amp; Jaimini texts</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Available in 9 Indian languages, 24/7</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Audited weekly by practising Jyotishis</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function MeetAI() {
  const prompts = [
    "How is my day today?",
    "What does tomorrow bring?",
    "Is this the right time to switch jobs?",
    "Read my Kundli Milan with this person.",
    "What remedy can help my Mangal dosha?",
  ];
  return (
    <section id="meet" className="relative py-24">
      <div className="orb h-[320px] w-[320px] bg-[color:var(--gold)] right-0 top-10 opacity-40" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-[1.1fr_1fr]">
        <Reveal delay={100} className="order-2 md:order-1">
          <div className="relative aspect-square w-full max-w-md">
            <div className="absolute inset-0 rotate-2 rounded-3xl bg-[color:var(--accent)] shadow-xl" />
            <img
              src={chatPreview}
              alt="Preview of a chat conversation with Vaanii, the AstroVaanii AI astrologer"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative h-full w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </Reveal>
        <div className="order-1 md:order-2">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Meet Vaanii</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Ask <em className="not-italic text-primary">anything</em>. About today, tomorrow, career, karma.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-lg text-muted-foreground">
              AstroVaanii is a conversation, not a static report. Ask a question, follow up, dig deeper —
              your chart stays in context throughout.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {prompts.map((p) => (
                <li key={p} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/80">
                  “{p}”
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={280}>
            <a href="#meet" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90">
              Start your first chat — free
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Share birth details", d: "Date, time and place. That's the only data Vaanii needs to cast your chart." },
    { n: "02", t: "We compute your Kundli", d: "Planetary positions, houses, dashas — calculated with classical precision." },
    { n: "03", t: "Vaanii interprets", d: "AstroVaanii reads dashas, yogas and doshas and translates them into natural conversation." },
    { n: "04", t: "Ask, follow up, revisit", d: "Reply in nine languages, ask anything, and pick up the same chat weeks later." },
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
            From birth date to a full Jyotish conversation in under a minute.
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

function Compare() {
  const rows = [
    { k: "Speed", ai: "Instant reply", trad: "Days of waiting" },
    { k: "Availability", ai: "24/7, any time zone", trad: "By appointment only" },
    { k: "Cost", ai: "Affordable, unlimited chats", trad: "Expensive per session" },
    { k: "Consistency", ai: "Same rigour every reading", trad: "Varies by astrologer" },
    { k: "Languages", ai: "9 Indian languages", trad: "Usually one or two" },
    { k: "Follow-ups", ai: "Ask again, anytime", trad: "New session, new fee" },
  ];
  return (
    <section id="why" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Comparison</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">
            AstroVaanii vs a traditional astrologer.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card">
            <div className="grid grid-cols-3 border-b border-border bg-[color:var(--accent)]/40 text-sm font-medium">
              <div className="p-5 text-muted-foreground">What matters</div>
              <div className="p-5 text-primary">AstroVaanii</div>
              <div className="p-5 text-muted-foreground">Traditional</div>
            </div>
            {rows.map((r, i) => (
              <div key={r.k} className={`grid grid-cols-3 text-sm ${i % 2 ? "bg-background/40" : ""}`}>
                <div className="p-5 font-display text-base">{r.k}</div>
                <div className="p-5 text-foreground">{r.ai}</div>
                <div className="p-5 text-muted-foreground">{r.trad}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyBetter() {
  const items = [
    { t: "Trained on classical texts", d: "Not a generic chatbot with an astrology prompt. Vaanii is tuned on Parashara, Jaimini and thousands of real Jyotish readings." },
    { t: "Weekly human audit", d: "Practising astrologers review sample conversations every week and tune the interpretation layer for accuracy." },
    { t: "Chart-aware conversations", d: "Follow-ups don't lose context. Your chart, dashas and past questions stay in every reply." },
    { t: "Truly multilingual", d: "Nine Indian languages, natively — not machine-translated English underneath." },
    { t: "Private by default", d: "Birth data encrypted, never sold, never used to train third-party models. Delete anytime." },
    { t: "Honest about timing", d: "Vaanii tells you when a window closes, not just what you want to hear." },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Why AstroVaanii</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">
            Six reasons AstroVaanii is different from other AI astrologers.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <article className="h-full rounded-3xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)]">
                  <img src={brandIcon} alt="" width={28} height={28} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Languages() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Your language</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Chat with Vaanii in nine native scripts.</h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Astrology loses nuance in translation. Vaanii replies natively in each language — metaphor,
            tone and warmth intact. Switch anytime; your context follows.
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
              What seekers say after chatting with Vaanii.
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
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Everything about AstroVaanii.</h2>
          <p className="mt-6 text-muted-foreground">
            Real answers written by our astrology team. Still curious? Write to us at
            <a href="mailto:hello@astrovaanii.ai" className="ml-1 text-primary underline underline-offset-4">hello@astrovaanii.ai</a>.
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
            Vaanii is online.<br /><em className="not-italic text-primary">Ask your first question.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Start a free chat in under a minute. Bring your birth details — AstroVaanii handles the rest.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <a href="#meet" className="mt-10 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-xl shadow-primary/25 hover:opacity-90">
            Chat with Vaanii
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
            <img src={brandIcon} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-lg">AstroVaanii</span>
          </div>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Your personal AI astrologer. Vedic wisdom, instant answers.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
          <a href="#meet" className="hover:text-foreground">Meet Vaanii</a>
          <a href="#daily" className="hover:text-foreground">Daily prediction</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </div>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} AstroVaanii</div>
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
      { title: "AstroVaanii — Vaanii, Your Personal AI Astrologer, 24/7" },
      {
        name: "description",
        content:
          "Chat with Vaanii, an AI astrologer trained on classical Parashara & Jaimini methods. Get today & tomorrow predictions, Kundli, marriage and career answers in 9 Indian languages.",
      },
      { property: "og:title", content: "AstroVaanii — Meet Vaanii, Your AI Astrologer" },
      {
        property: "og:description",
        content: "Vedic AI astrologer available 24/7 in 9 Indian languages. Ask today's and tomorrow's prediction, anytime.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
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
        <DailyPrediction />
        <WhatIs />
        <MeetAI />
        <HowItWorks />
        <Compare />
        <WhyBetter />
        <Languages />
        <Reviews />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
