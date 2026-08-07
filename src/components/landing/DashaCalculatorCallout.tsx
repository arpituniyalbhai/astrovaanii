import { Link } from "@tanstack/react-router";

export function DashaCalculatorCallout() {
  return (
    <section className="my-12 rounded-3xl border border-primary/20 bg-primary/5 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Related Astrology Tool</p>
      <h2 className="mt-3 font-display text-2xl text-foreground">Find your current Mahadasha and Antardasha</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Use the free Vimshottari Dasha Calculator to see your Moon Nakshatra, current Mahadasha, Antardasha, and complete Dasha timeline from your birth details.
      </p>
      <Link
        to="/vimshottari-dasha-calculator"
        className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Calculate Vimshottari Dasha
      </Link>
    </section>
  );
}
