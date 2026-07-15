import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/landing/Reveal";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import kundliImage from "@/assets/free-kundlai-generator.webp";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Free Vedic Astrology Tools - AstroVaanii" },
      {
        name: "description",
        content:
          "Explore free Vedic astrology tools including Kundli generator, birth chart calculator, and more. All tools use accurate Swiss Ephemeris calculations.",
      },
      { property: "og:title", content: "Free Vedic Astrology Tools - AstroVaanii" },
      {
        property: "og:description",
        content:
          "Explore free Vedic astrology tools including Kundli generator, birth chart calculator, and more.",
      },
      { property: "og:url", content: "https://astrovaanii.in/tools" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/social-sharing.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/tools" }],
  }),
  component: ToolsPage,
});

const tools = [
  {
    title: "Free Kundli Generator",
    description:
      "Generate your complete Janam Kundli by date of birth, time, and birthplace. Get a full North Indian style birth chart with planet positions, house details, and Vimshottari Dasha using accurate Swiss Ephemeris calculations.",
    image: kundliImage,
    link: "/free-kundli",
    features: ["North Indian chart format", "Planet positions & houses", "Vimshottari Dasha timeline", "Lahiri Ayanamsa"],
  },
];

function ToolsPage() {
  return (
    <main className="relative min-h-screen bg-background grain">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24" />
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40" />

      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2">
          <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
        </a>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">Home</a>
        </nav>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="text-center mb-14">
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              Free Vedic Astrology <span className="text-primary">Tools</span>
            </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Accurate calculations powered by Swiss Ephemeris. Free to use, no sign-up required.
              </p>
              <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
                Want to learn how other AI platforms compare? Read our{" "}
                <a href="/blogs/top-5-ai-astrology-platform-in-india" className="text-primary underline underline-offset-4 hover:opacity-80">
                  top 5 AI astrology platforms in India
                </a>{" "}
                guide.
              </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <Reveal key={tool.title} delay={i * 100}>
              <Link
                to={tool.link}
                className="group block h-full rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden bg-[color:var(--accent)]/30">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {tool.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-card/40 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <img src={brandIcon} alt="" width={24} height={24} className="h-6 w-6" />
            <span className="font-display text-lg">AstroVaanii</span>
          </div>
          <p>&copy; {new Date().getFullYear()} AstroVaanii. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
