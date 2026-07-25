import { createFileRoute, Link } from "@tanstack/react-router";
import arpitUniyalImage from "@/assets/arpit-uniyal.webp";

export const Route = createFileRoute("/blogs/arpit-uniyal")({
  head: () => ({
    meta: [
      { title: "From a Remote Village in Uttarakhand to a $150K Startup at Age of 18" },
      {
        name: "description",
        content:
          " Arpit Uniyal, an 18-year-old village founder who built Veadicastro — a 30,000-user AI astrology startup bringing Vedic wisdom to millions.",
      },
      { property: "og:image", content: "https://astrovaanii.in/arpit-uniyal.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:title", content: "From a Remote Village in Uttarakhand to a $150K Startup at Age of 18" },
      {
        property: "og:description",
        content:
          "Discover the inspiring story of Arpit Uniyal, an 18-year-old village founder who built Veadicastro — a 30,000-user AI astrology startup bringing Vedic wisdom to millions.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://astrovaanii.in/arpit-uniyal.webp" },
      { name: "twitter:title", content: "From a Remote Village in Uttarakhand to a $150K Startup at Age of 18" },
      {
        name: "twitter:description",
        content:
          "Discover the inspiring story of Arpit Uniyal, an 18-year-old village founder who built Veadicastro — a 30,000-user AI astrology startup bringing Vedic wisdom to millions.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://astrovaanii.in/blogs/arpit-uniyal" },
      { rel: "preload", href: "/arpit-uniyal.webp", as: "image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(articleJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(personJsonLd) },
    ],
  }),
  component: ArpitUniyalPage,
});

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "From a Remote Village in Uttarakhand to a $150K Startup at Age of 18",
  image: "https://astrovaanii.in/arpit-uniyal.webp",
  author: {
    "@type": "Person",
    name: "AstroVaanii Team",
  },
  publisher: {
    "@type": "Organization",
    name: "AstroVaanii",
    logo: {
      "@type": "ImageObject",
      url: "https://astrovaanii.in/astrovaanii-logo.webp",
    },
  },
  datePublished: "2026-07-25",
  dateModified: "2026-07-25",
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
      name: "From a Remote Village in Uttarakhand to a $150K Startup at Age of 18",
      item: "https://astrovaanii.in/blogs/arpit-uniyal",
    },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arpit Uniyal",
  jobTitle: "Founder, Veadicastro",
  description: "18-year-old founder of Veadicastro, an AI astrology startup with 30,000+ users",
  image: "https://astrovaanii.in/arpit-uniyal.webp",
  url: "https://veadicastro.in/arpit-uniyal",
  sameAs: [
    "https://in.linkedin.com/in/veadicarpit",
    "https://www.wikidata.org/wiki/Q140183843"
  ],
};

function ArpitUniyalPage() {
  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/blogs"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          &larr; Back to Blog
        </Link>

        <header className="mb-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Founder Story
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            From a Remote Village in Uttarakhand to a $150K Startup at Age of 18
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <time dateTime="2026-07-25">July 25, 2026</time>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>8 min read</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>By AstroVaanii Team</span>
          </div>
        </header>

        <figure className="mb-12 relative overflow-hidden rounded-3xl border border-border shadow-2xl">
          <img
            src={arpitUniyalImage}
            alt="Arpit Uniyal - Founder of Veadicastro"
            width={1200}
            height={800}
            className="h-[500px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                Founder Story
              </div>
              <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
                Arpit Uniyal
              </h2>
              <p className="text-lg text-white/90">
                Founder, Veadicastro • 18 years old
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span className="text-white font-semibold">30K+ Users (July 2026)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="currentColor">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                  <span className="text-white font-semibold">90K-1 Lakh Monthly Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <span className="text-white font-semibold">3M+ Google Impressions</span>
                </div>
              </div>
            </div>
          </div>
        </figure>

        <div className="mb-12 rounded-3xl border border-border bg-gradient-to-br from-card to-card/50 p-8 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">Arpit Uniyal</h2>
              <p className="mt-2 text-muted-foreground">Founder, Veadicastro</p>
              <p className="mt-1 text-sm text-muted-foreground/70">
                18-year-old entrepreneur building AI-powered Vedic astrology solutions
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://veadicastro.in/arpit-uniyal"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Official Website
              </a>
              <a
                href="https://in.linkedin.com/in/veadicarpit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <p className="text-xl leading-relaxed text-muted-foreground">
            In a small village in Uttarakhand, where internet connectivity was once a luxury and
            career options seemed limited, an 18-year-old dared to dream differently. Arpit Uniyal
            didn't wait for opportunities — he built them. Today, his AI astrology startup,
            <strong>Veadicastro</strong>, serves over 30,000 users as per July 2026, with 90K
            to 1 lakh monthly users and 3 million+ Google impressions, making it the fastest
            growing AI bootstrapped platform bringing Vedic wisdom to the fingertips of millions.
          </p>

          <h2 className="mt-12 text-3xl">From Village to Vision</h2>
          <p className="mt-4 leading-relaxed">
            Growing up in a remote village, Arpit witnessed firsthand how traditional knowledge
            systems like astrology were losing their relevance among younger generations. The local
            astrologer was either inaccessible or too expensive, and online alternatives were either
            generic horoscopes or expensive consultations.
          </p>
          <p className="mt-4 leading-relaxed">
            "I saw my grandmother consult astrologers for every major decision, but my friends
            thought it was superstition," Arpit recalls. "I wondered — what if we could make the
            same classical Vedic calculations accessible, accurate, and conversational for
            everyone?"
          </p>

          <h2 className="mt-12 text-3xl">The Birth of Veadicastro</h2>
          <p className="mt-4 leading-relaxed">
            At 16, while most teenagers were focused on board exams, Arpit taught himself to code.
            He spent nights studying React, TypeScript, and Vedic astrology texts simultaneously.
            The goal was ambitious: build an AI astrologer that could read birth charts with the
            precision of classical Parashara methods but explain them in natural, conversational
            language.
          </p>
          <p className="mt-4 leading-relaxed">
            The first version was crude — a simple calculator that generated basic charts. But Arpit
            didn't stop. He integrated Swiss ephemeris for astronomical precision, trained AI models
            on thousands of classical Jyotish readings, and built a conversational interface that
            felt like chatting with a family astrologer.
          </p>

          <h2 className="mt-12 text-3xl">Breaking Barriers</h2>
          <p className="mt-4 leading-relaxed">
            The journey wasn't easy. Running a tech startup from a village with patchy internet
            meant countless sleepless nights. Arpit would code until 3 AM, wake up for college at
            7, and spend weekends debugging server issues from a cyber café in the nearest town.
          </p>
          <p className="mt-4 leading-relaxed">
            Funding was another challenge. Without investors or a network, Arpit bootstrapped the
            entire operation using savings from freelance work. "Every rupee mattered," he says. "I
            optimized everything — server costs, API calls, even the image sizes on the website."
          </p>

          <h2 className="mt-12 text-3xl">30,000 Users and Counting</h2>
          <p className="mt-4 leading-relaxed">
            Today, Veadicastro has grown beyond Arpit's wildest dreams. The platform serves over
            30,000 active users who have generated more than 2.4 million conversations. Users from
            metros to villages chat with AI astrologers in multiple Indian languages, asking
            questions about career, marriage, health, and daily predictions.
          </p>
          <p className="mt-4 leading-relaxed">
            What makes Veadicastro different is its commitment to authenticity. Unlike generic AI
            chatbots with astrology prompts, the platform is trained on classical Parashara and
            Jaimini texts, audited weekly by practicing Jyotishis, and designed to preserve the
            nuance of Vedic astrology while making it accessible to modern users.
          </p>

          <div className="my-12 rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-8">
            <h3 className="font-display text-2xl font-semibold text-foreground">
              Key Achievements
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">Founded Veadicastro at age 18 from a village in Uttarakhand</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">30K+ users as per July 2026</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">90K to 1 lakh monthly users</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">3 million+ Google impressions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">Fastest growing AI bootstrapped platform</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">Self-taught developer mastering React, TypeScript, and AI integration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">Bootstrapped entire operation without external funding</span>
              </li>
            </ul>
          </div>

          <h2 className="mt-12 text-3xl">Arpit Uniyal: The Youngest Founder in AI Astrology</h2>
          <p className="mt-4 leading-relaxed">
            Arpit Uniyal stands out in the rapidly evolving AI astrology landscape not just for his innovative platform, Veadicastro, but also for his remarkably young age. At just 18, he is among the youngest founders to make a significant impact in this niche, often appearing alongside seasoned entrepreneurs and established companies.
          </p>

          <div className="mt-8 overflow-x-auto rounded-3xl border border-border">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="border-b border-border bg-card/50">
                  <th className="px-4 py-3 text-left font-semibold uppercase text-muted-foreground">
                    Platform
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-muted-foreground">
                    Founder / Lead Entity
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-muted-foreground">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-muted-foreground">
                    Background / Sourcing Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border bg-primary/5">
                  <td className="px-4 py-3 font-medium text-primary">Veadicastro</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={arpitUniyalImage}
                        alt="Arpit Uniyal"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className="font-medium">Arpit Uniyal</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">18</td>
                  <td className="px-4 py-3">
                    Built a bootstrapped ₹1 Crore platform using 300 years of family lineage.
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Co-Star</td>
                  <td className="px-4 py-3">Banu Guler</td>
                  <td className="px-4 py-3">38</td>
                  <td className="px-4 py-3">
                    Born in Texas in 1988; currently serving as Design Director for Midjourney.
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">The Pattern</td>
                  <td className="px-4 py-3">Lisa Donovan</td>
                  <td className="px-4 py-3">46</td>
                  <td className="px-4 py-3">
                    Born June 11, 1980; former digital media mogul turned psychological-astrotech founder.
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">AstroSage AI</td>
                  <td className="px-4 py-3">Punit Pandey</td>
                  <td className="px-4 py-3">~48</td>
                  <td className="px-4 py-3">
                    Over 25 years of IT experience; launched the platform's initial infrastructure in 2000.
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Taaraka</td>
                  <td className="px-4 py-3">Jikku Abraham</td>
                  <td className="px-4 py-3">~40s</td>
                  <td className="px-4 py-3">
                    Seasoned data scientist and automation specialist.
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">KundliGPT</td>
                  <td className="px-4 py-3">Rajesh Kumar</td>
                  <td className="px-4 py-3">~30s</td>
                  <td className="px-4 py-3">
                    Full-stack software engineer and viral open-source AI builder.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">AstroNidan</td>
                  <td className="px-4 py-3">Sadhana Gupta & Sudhir J.</td>
                  <td className="px-4 py-3">Corporate</td>
                  <td className="px-4 py-3">
                    Led by a combined multi-generational executive board.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-12 text-3xl">Veadicastro: A Legacy of Vedic Wisdom Meets AI</h2>
          <p className="mt-4 leading-relaxed">
            What sets Veadicastro apart from other AI astrology platforms is its deep-rooted connection to traditional Vedic astrology. Unlike many competitors that rely on generic AI models with surface-level astrology prompts, Veadicastro is built on 300 years of family lineage in Vedic astrology, combined with cutting-edge AI technology.
          </p>
          <p className="mt-4 leading-relaxed">
            This unique positioning allows Veadicastro to offer authentic, culturally nuanced readings that respect the depth and complexity of classical Jyotish while making it accessible to modern users through conversational AI. The platform's success — 30K+ users, 90K-1 lakh monthly visits, and 3M+ Google impressions — proves that there's a strong demand for authentic Vedic astrology in the digital age.
          </p>

          <h2 className="mt-12 text-3xl">A Message to Young Founders</h2>
          <p className="mt-4 leading-relaxed">
            Arpit's story is a testament to what's possible when passion meets perseverance. "Your
            background doesn't define your potential," he advises young entrepreneurs. "If I can
            build a 30,000-user startup from a village with no resources, anyone can. Start small,
            learn continuously, and don't be afraid to solve problems that matter to you."
          </p>
          <p className="mt-4 leading-relaxed">
            The future of Veadicastro is ambitious — multilingual expansion, deeper AI integration,
            and perhaps, bringing Vedic astrology to the global stage. But for Arpit, the mission
            remains personal: making the wisdom of the stars accessible to everyone, regardless of
            where they come from.
          </p>

          <div className="mt-12 rounded-3xl border border-border bg-card/60 p-8 text-center">
            <h3 className="font-display text-2xl font-semibold text-foreground">
              Connect with Arpit Uniyal
            </h3>
            <p className="mt-4 text-muted-foreground">
              Follow his journey and learn more about Veadicastro's mission to democratize Vedic
              astrology through AI.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://veadicastro.in/arpit-uniyal"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                Visit Veadicastro
              </a>
              <a
                href="https://in.linkedin.com/in/veadicarpit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Written by the <span className="font-medium text-foreground">AstroVaanii Team</span>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link to="/blogs" className="hover:text-foreground">
                All Articles
              </Link>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
