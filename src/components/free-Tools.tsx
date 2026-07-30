import { Link } from "@tanstack/react-router";

type FreeToolsNavButtonProps = {
  active: boolean;
  onClick: () => void;
};

const tools = [
  {
    title: "AI Astrologer",
    description: "You are already using the AI Astrologer in your dashboard.",
    to: "/dashboard",
    disabled: true,
    icon: "sparkles",
  },
  {
    title: "Free Kundli Generator",
    description: "Create your Vedic birth chart using your birth details.",
    to: "/free-kundli",
    icon: "chart",
  },
  {
    title: "Kundli Matching",
    description: "Check marriage compatibility with detailed Guna Milan.",
    to: "/kundali-matching",
    icon: "hearts",
  },
  {
    title: "All Free Tools",
    description: "Explore every free astrology tool available on AstroVaanii.",
    to: "/tools",
    icon: "grid",
  },
] as const;

function ToolIcon({ name }: { name: (typeof tools)[number]["icon"] }) {
  if (name === "sparkles") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z" />
        <path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 12h18M12 3v18M7 7l10 10M17 7 7 17" />
      </svg>
    );
  }

  if (name === "hearts") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </svg>
  );
}

export function FreeToolsNavButton({ active, onClick }: FreeToolsNavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </svg>
      Free Tools
    </button>
  );
}

export function FreeTools() {
  return (
    <section className="w-full max-w-3xl">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Explore AstroVaanii
        </p>
        <h2 className="font-display text-3xl text-foreground">Free Astrology Tools</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          Generate charts, compare Kundlis, and explore more astrology tools at no cost.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) =>
          tool.disabled ? (
            <div
              key={tool.title}
              aria-disabled="true"
              className="relative rounded-2xl border border-border bg-card/45 p-5 opacity-55"
            >
              <span className="absolute right-4 top-4 rounded-full border border-border bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Current
              </span>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ToolIcon name={tool.icon} />
              </div>
              <h3 className="font-display text-lg text-foreground">{tool.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
            </div>
          ) : (
            <Link
              key={tool.title}
              to={tool.to}
              className="group rounded-2xl border border-border bg-card/80 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ToolIcon name={tool.icon} />
              </div>
              <h3 className="font-display text-lg text-foreground">{tool.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open tool
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
