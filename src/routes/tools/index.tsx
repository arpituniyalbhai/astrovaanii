import { createFileRoute, Link } from "@tanstack/react-router";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import kundliImage from "@/assets/free-kundlai-generator.webp";
import dashaWheelImage from "@/assets/vimshottari-dasha-wheel.webp";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Free Astrology Tools - Janam Kundli Generator - AstroVaanii" },
      { name: "description", content: "Explore free Vedic astrology tools including Janam Kundli (birth chart) generator by date of birth and time. Accurate Swiss Ephemeris calculations." },
      { property: "og:title", content: "Free Astrology Tools - AstroVaanii" },
      { property: "og:description", content: "Free Vedic astrology tools - Generate your Janam Kundli instantly with accurate calculations." },
      { property: "og:url", content: "https://astrovaanii.in/tools" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/social-sharing.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free Astrology Tools - Janam Kundli Generator - AstroVaanii" },
      { name: "twitter:description", content: "Free Vedic astrology tools - Generate your Janam Kundli instantly with accurate calculations." },
      { name: "twitter:image", content: "/social-sharing.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/tools" }],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <main className="min-h-screen bg-background grain">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2">
            <img src={brandIcon} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-10 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl md:text-5xl text-primary">
            Free Astrology Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of free Vedic astrology tools powered by accurate Swiss Ephemeris calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link to="/free-kundli" className="group rounded-3xl border border-border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/30">
            <div className="aspect-video rounded-2xl overflow-hidden bg-background/70 mb-4">
              <img
                src={kundliImage}
                alt="Free Kundli Generator"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-display text-xl text-primary group-hover:text-primary/80 transition-colors">
              Free Kundli Generator
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Generate your Janam Kundli by date of birth and time. Complete North Indian style birth chart with planet positions, houses, and Vimshottari dasha.
            </p>
            <span className="inline-block mt-3 text-sm font-medium text-primary">
              Generate Kundli &rarr;
            </span>
          </Link>

          <Link to="/kundali-matching" className="group rounded-3xl border border-border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/30">
            <div className="aspect-video rounded-2xl overflow-hidden bg-background/70 mb-4">
              <img
                src={kundliImage}
                alt="Kundali Matching"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-display text-xl text-primary group-hover:text-primary/80 transition-colors">
              Kundali Matching
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Check Kundali matching by name and date of birth. Ashta Koota Gun Milan with accurate Swiss Ephemeris calculations. Compatibility score out of 36.
            </p>
            <span className="inline-block mt-3 text-sm font-medium text-primary">
              Check Match &rarr;
            </span>
          </Link>

          <Link to="/vimshottari-dasha-calculator" className="group rounded-3xl border border-border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/30">
            <div className="aspect-video rounded-2xl overflow-hidden bg-background/70 mb-4">
              <img
                src={dashaWheelImage}
                alt="Vimshottari Dasha celestial timing wheel"
                width={1279}
                height={720}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-display text-xl text-primary group-hover:text-primary/80 transition-colors">
              Vimshottari Dasha Calculator
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Calculate your current Mahadasha and Antardasha from your Moon Nakshatra with Swiss Ephemeris and Lahiri ayanamsa.
            </p>
            <span className="inline-block mt-3 text-sm font-medium text-primary">
              Calculate Dasha &rarr;
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
