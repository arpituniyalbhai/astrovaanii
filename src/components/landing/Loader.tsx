import { useEffect, useState } from "react";

export function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2200);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;

  return (
    <div className="loader-out fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 text-primary/70">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 6" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 12;
            return (
              <line
                key={i}
                x1={100 + Math.cos(a) * 60}
                y1={100 + Math.sin(a) * 60}
                x2={100 + Math.cos(a) * 80}
                y2={100 + Math.sin(a) * 80}
                stroke="currentColor"
                strokeWidth="0.8"
              />
            );
          })}
        </svg>
        <svg viewBox="0 0 200 200" className="absolute inset-0">
          <g transform="translate(100 100)" fill="none" stroke="var(--gold)" strokeWidth="1.2">
            <path d="M 0 -40 L 6 -6 L 40 0 L 6 6 L 0 40 L -6 6 L -40 0 L -6 -6 Z" />
          </g>
        </svg>
        <div className="absolute inset-x-0 -bottom-10 text-center">
          <span className="font-display text-lg tracking-wide text-primary">Astro</span>
          <span className="ml-1 font-display text-lg text-foreground/60">Vaanii</span>
        </div>
      </div>
    </div>
  );
}
