import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import vaaniiPersona from "@/assets/vaanii-persona.jpg";
import styles from "./VaaniiLoadingAnimation.module.css";

interface Props {
  userName?: string;
  userQuestion?: string;
}

const phases = [
  "Considering your question",
  "Putting your reading together",
  "Taking a little longer. Still working on your answer",
];

export function VaaniiLoadingAnimation({ userName, userQuestion }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);
    const preparing = setTimeout(() => setPhase(1), 4500);
    const waiting = setTimeout(() => setPhase(2), 14000);
    return () => {
      clearTimeout(preparing);
      clearTimeout(waiting);
    };
  }, [userQuestion]);

  return (
    <div className={`${styles.enter} mx-auto flex w-full items-start gap-3 md:max-w-6xl md:pl-8`}>
      <div className="relative mt-1 h-8 w-8 shrink-0" aria-hidden="true">
        <img src={vaaniiPersona} alt="" className="h-full w-full rounded-full border border-border object-cover" />
        <span className={`${styles.presence} absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary`} />
      </div>
      <div className={`${styles.card} relative w-full min-w-0 max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-background px-4 py-4 shadow-sm sm:px-5`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles size={14} className="text-primary" aria-hidden="true" />
            <span className={styles.shimmer}>Vaanii is thinking</span>
          </div>
          <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
            {[0, 1, 2].map((dot) => <span key={dot} className={`${styles.dot} h-1 w-1 rounded-full bg-primary/70`} style={{ animationDelay: `${dot * 160}ms` }} />)}
          </span>
        </div>
        <div role="status" aria-live="polite" aria-atomic="true" className="mt-2 min-h-10 text-xs leading-5 text-muted-foreground">
          <p key={phase} className={styles.phase}>
            {phases[phase]}{phase === 0 && userName && userName !== "User" ? `, ${userName}` : ""}…
          </p>
        </div>
        <div className="mt-3 space-y-2" aria-hidden="true">
          <div className={`${styles.skeleton} h-1.5 w-[88%] rounded-full`} />
          <div className={`${styles.skeleton} h-1.5 w-[62%] rounded-full`} style={{ animationDelay: "180ms" }} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-primary/5" aria-hidden="true">
          <div className={`${styles.scan} h-full w-1/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent`} />
        </div>
      </div>
    </div>
  );
}
