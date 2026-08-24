import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  userName?: string;
  userQuestion?: string;
}

export function VaaniiLoadingAnimation({ userName, userQuestion }: Props) {
  const loadingPhrases = useMemo(() => {
    const phrases = [
      userName && userName !== "User"
        ? `Reading ${userName}'s verified chart...`
        : "Reading your verified chart...",
      "Reviewing today's planetary context...",
      "Connecting your question with your chart...",
      "Preparing a clear, practical answer...",
    ];

    if (userQuestion) {
      const snippet = userQuestion.length > 48 ? `${userQuestion.slice(0, 48)}...` : userQuestion;
      phrases.splice(1, 0, `Understanding: “${snippet}”`);
    }

    return phrases;
  }, [userName, userQuestion]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [loadingPhrases]);

  return (
    <div
      className="mx-auto flex w-full items-start gap-3 md:max-w-6xl md:pl-8"
      role="status"
      aria-live="polite"
      aria-label={loadingPhrases[index]}
    >
      <div className="relative h-16 w-16 shrink-0" aria-hidden="true">
        <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border border-dashed border-primary/45" />
        <span className="absolute left-1/2 top-0 z-10 h-2 w-2 -translate-x-1/2 -translate-y-0.5 rounded-full bg-[color:var(--gold)] shadow-[0_0_10px_rgba(194,149,69,0.8)]" />
        <div className="absolute inset-1.5 overflow-hidden rounded-full border-2 border-card bg-foreground shadow-md ring-1 ring-primary/25">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/vaanii-chart-loading-poster.webp"
            className="h-full w-full scale-110 object-cover"
            style={{ objectPosition: "50% 42%" }}
          >
            <source src="/vaanii-chart-loading.mp4?v=2" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-foreground/20 to-transparent ring-1 ring-inset ring-white/20" />
        </div>
      </div>

      <div className="min-w-0 max-w-[calc(100%_-_4.75rem)] rounded-2xl rounded-tl-sm border border-border/40 bg-background px-4 py-3 shadow-sm md:max-w-md">
        <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-primary">
          <Sparkles size={13} className="animate-pulse" aria-hidden="true" />
          Vaanii is reading your chart
        </div>
        <p className="min-h-5 text-sm italic leading-5 text-muted-foreground">
          {loadingPhrases[index]}
        </p>
      </div>
    </div>
  );
}
