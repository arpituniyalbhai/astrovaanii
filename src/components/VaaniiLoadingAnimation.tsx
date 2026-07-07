import { useEffect, useState, useMemo } from "react";
import vaaniiPersona from "@/assets/vaanii-persona.jpg";

interface Props {
  userName?: string;
  userQuestion?: string;
}

export function VaaniiLoadingAnimation({ userName, userQuestion }: Props) {
  const loadingPhrases = useMemo(() => {
    const phrases: string[] = [];
    if (userName) {
      phrases.push(`Reading ${userName}'s birth chart...`);
      phrases.push(`Analyzing ${userName}'s planetary alignment...`);
    } else {
      phrases.push("Reading your birth chart...");
      phrases.push("Analyzing planetary alignment...");
    }
    if (userQuestion) {
      const snippet = userQuestion.length > 40
        ? userQuestion.slice(0, 40) + "..."
        : userQuestion;
      phrases.push(`Reviewing: "${snippet}"`);
    }
    phrases.push("Calculating Vimshottari dasha...");
    phrases.push("Examining house placements...");
    phrases.push("Consulting Vedic scriptures...");
    phrases.push("Interpreting nakshatra influences...");
    phrases.push("Preparing your personalized reading...");
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

  const stars = Array.from({ length: 8 });

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 select-none">
      {/* Stars */}
      {stars.map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/60 animate-[twinkle_3s_ease-in-out_infinite]"
          style={{
            left: `${35 + Math.sin(i * 1.2) * 25}%`,
            top: `${30 + Math.cos(i * 0.9) * 20}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Main animation circle */}
      <div className="relative w-48 h-48 mb-6">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-1 rounded-full border border-dashed border-gold/15 animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute inset-3 rounded-full border border-gold/10 animate-[spin_8s_linear_infinite]" />

        {/* Chart boxes */}
        <div className="absolute inset-4 animate-[spin_20s_linear_infinite]">
          <div className="w-full h-full border border-primary/25 rounded-lg relative overflow-hidden">
            <div className="absolute inset-2 border border-accent/15 rounded" />
            <div className="absolute inset-4 border border-gold/10 rounded" />

            {/* Scanning beam */}
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-[scan_2.5s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Center: Vaanii avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-primary/10 animate-ping" />
            <div
              className="absolute -inset-2 rounded-full animate-[pulse-glow_2s_ease-in-out_infinite]"
              style={{
                background:
                  "radial-gradient(circle, rgba(180,120,80,0.15) 0%, transparent 70%)",
              }}
            />
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 relative z-10">
              <img
                src={vaaniiPersona}
                alt="Vaanii"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Orbiting dots */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/50 animate-[spin_4s_linear_infinite]"
          style={{ transformOrigin: "0 96px" }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/50 animate-[spin_6s_linear_infinite_reverse]"
          style={{ transformOrigin: "0 -96px" }}
        />
      </div>

      {/* Cycling text */}
      <p className="text-sm text-muted-foreground text-center transition-opacity duration-500 min-h-[1.25rem]">
        {loadingPhrases[index]}
      </p>
    </div>
  );
}
