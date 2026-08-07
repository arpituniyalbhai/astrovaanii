import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

type ReadingStage = "question" | "shuffling" | "choose" | "selected" | "generating" | "reading";

type VedicCard = {
  name: string;
  devanagari: string;
  symbol: string;
  essence: string;
  message: string;
  focus: string;
  action: string;
};

const VEDIC_DECK: VedicCard[] = [
  {
    name: "Surya",
    devanagari: "सूर्य",
    symbol: "SUN",
    essence: "Clarity and life force",
    message: "A truth is ready to become visible. Move from doubt toward a clear, honest decision.",
    focus: "Confidence, direction, recognition, and renewed energy",
    action: "Name the one outcome you genuinely want, then take one visible step toward it.",
  },
  {
    name: "Chandra",
    devanagari: "चन्द्र",
    symbol: "MOON",
    essence: "Intuition and inner rhythm",
    message: "The answer is forming beneath the surface. Give your emotions time to settle before deciding.",
    focus: "Inner knowing, sensitivity, home, memory, and changing moods",
    action: "Pause, write down what you feel, and separate intuition from temporary fear.",
  },
  {
    name: "Ganesha",
    devanagari: "गणेश",
    symbol: "OM",
    essence: "Openings and wise beginnings",
    message: "The obstacle is also showing you the correct entrance. Simplify the path before pushing harder.",
    focus: "New starts, practical wisdom, learning, and obstacle removal",
    action: "Remove one unnecessary complication and begin again with a smaller first step.",
  },
  {
    name: "Saraswati",
    devanagari: "सरस्वती",
    symbol: "VEENA",
    essence: "Wisdom and expression",
    message: "Your progress depends on understanding and clear communication more than speed.",
    focus: "Study, speech, creativity, skill, and discernment",
    action: "Ask the better question, gather the missing information, and express your truth calmly.",
  },
  {
    name: "Lakshmi",
    devanagari: "लक्ष्मी",
    symbol: "LOTUS",
    essence: "Value and graceful abundance",
    message: "Growth becomes possible when you recognise what is already valuable and nurture it consistently.",
    focus: "Resources, self-worth, harmony, generosity, and sustainable prosperity",
    action: "Protect your time and energy, then invest them where value is already taking root.",
  },
  {
    name: "Hanuman",
    devanagari: "हनुमान",
    symbol: "GADA",
    essence: "Courage and devoted action",
    message: "You have more strength than the present challenge suggests. Courage grows through purposeful action.",
    focus: "Discipline, loyalty, resilience, service, and focused effort",
    action: "Do the difficult but necessary task first, without waiting to feel completely ready.",
  },
  {
    name: "Shiva",
    devanagari: "शिव",
    symbol: "TRISHUL",
    essence: "Release and transformation",
    message: "A completed pattern must be released before the next phase can take shape.",
    focus: "Transformation, endings, stillness, truth, and renewal",
    action: "Stop feeding what has already ended and make space for a more honest direction.",
  },
  {
    name: "Shakti",
    devanagari: "शक्ति",
    symbol: "FLAME",
    essence: "Creative power and movement",
    message: "Energy is gathering around your intention. Direct it consciously instead of scattering it.",
    focus: "Agency, creativity, passion, boundaries, and momentum",
    action: "Choose one priority and give it your undivided energy for the next seven days.",
  },
  {
    name: "Dharma Chakra",
    devanagari: "धर्म चक्र",
    symbol: "WHEEL",
    essence: "Alignment and right action",
    message: "The most reliable path is the one that remains aligned with your values under pressure.",
    focus: "Purpose, responsibility, timing, ethics, and long-term direction",
    action: "Choose the option you would still respect after the immediate pressure has passed.",
  },
  {
    name: "Padma",
    devanagari: "पद्म",
    symbol: "LOTUS",
    essence: "Growth through experience",
    message: "Your present conditions do not define the quality of what can emerge from them.",
    focus: "Healing, patience, beauty, emotional growth, and spiritual maturity",
    action: "Continue the quiet work. Measure progress by depth, not by how quickly others notice it.",
  },
  {
    name: "Deepa",
    devanagari: "दीप",
    symbol: "LAMP",
    essence: "Guidance and illumination",
    message: "You do not need the entire path illuminated. The next honest step is enough.",
    focus: "Insight, hope, learning, protection, and practical guidance",
    action: "Act on what is already clear before asking for certainty about everything else.",
  },
  {
    name: "Kalpavriksha",
    devanagari: "कल्पवृक्ष",
    symbol: "TREE",
    essence: "Potential and patient creation",
    message: "A meaningful possibility is present, but it needs roots, structure, and time.",
    focus: "Long-term wishes, support, legacy, patience, and fruitful effort",
    action: "Turn the wish into a plan with one milestone you can complete this month.",
  },
];

function shuffledDeck() {
  const next = [...VEDIC_DECK];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next.slice(0, 7);
}

export function VedicTarotReading() {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [stage, setStage] = useState<ReadingStage>("question");
  const [cards, setCards] = useState(() => VEDIC_DECK.slice(0, 7));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [aiReading, setAiReading] = useState("");
  const [readingError, setReadingError] = useState("");

  useEffect(() => {
    if (stage !== "shuffling") return;
    const timer = window.setTimeout(() => setStage("choose"), 1500);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const beginReading = () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;
    setSubmittedQuestion(trimmedQuestion);
    setCards(shuffledDeck());
    setSelectedIndex(null);
    setAiReading("");
    setReadingError("");
    setStage("shuffling");
  };

  const resetReading = () => {
    setQuestion("");
    setSubmittedQuestion("");
    setSelectedIndex(null);
    setAiReading("");
    setReadingError("");
    setCards(VEDIC_DECK.slice(0, 7));
    setStage("question");
  };

  const selectedCard = selectedIndex === null ? null : cards[selectedIndex];

  const generateReading = async () => {
    if (!selectedCard || !submittedQuestion) return;

    setStage("generating");
    setAiReading("");
    setReadingError("");

    try {
      const local = JSON.parse(localStorage.getItem("userData") || "{}");
      const email = auth.currentUser?.email || local.email;
      const userDetails: Record<string, unknown> = {};
      if (local.dob) userDetails.dob = local.dob;
      if (local.timeOfBirth) userDetails.timeOfBirth = local.timeOfBirth;
      if (local.location) userDetails.location = local.location;
      if (local.gender) userDetails.gender = local.gender;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "vedic-tarot",
          tarot: { cardName: selectedCard.name },
          messages: [{ role: "user", content: submittedQuestion }],
          chart: local.chart || undefined,
          userName: local.name || undefined,
          userDetails: Object.keys(userDetails).length ? userDetails : undefined,
          email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 402 || errorData.error === "NO_CREDITS") {
          throw new Error("NO_CREDITS");
        }
        throw new Error(errorData.message || "Vaanii could not complete this reading.");
      }

      if (!response.body) throw new Error("Vaanii could not start this reading.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullReading = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          for (const line of event.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload);
              const token = parsed.choices?.[0]?.delta?.content;
              if (token) {
                fullReading += token;
                setAiReading(fullReading);
              }
            } catch {
              // Ignore incomplete SSE events until the next chunk arrives.
            }
          }
        }
      }

      if (!fullReading.trim()) throw new Error("Vaanii returned an empty reading. Please try again.");
      setStage("reading");
    } catch (error) {
      setReadingError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStage("selected");
    }
  };

  return (
    <section className="w-full max-w-5xl py-2">
      <style>{`
        @keyframes vedic-card-shuffle {
          0% { transform: translateX(-18px) rotate(-7deg) translateY(4px); }
          50% { transform: translateX(18px) rotate(7deg) translateY(-8px); }
          100% { transform: translateX(0) rotate(0deg) translateY(2px); }
        }
        @keyframes vedic-card-reveal {
          0% { transform: rotateY(90deg) scale(.9); opacity: 0; }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
      `}</style>

      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Vedic-inspired guidance
        </p>
        <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
          Vedic Tarot Reading
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Hold one clear question in your mind. The card you choose offers a reflective message for
          the path ahead.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-2xl">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            beginReading();
          }}
          className="relative"
        >
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            disabled={stage !== "question"}
            placeholder="Ask about love, career, a decision, or your next step..."
            aria-label="Your tarot reading question"
            className="w-full rounded-2xl border border-border bg-card/85 px-5 py-4 pr-28 text-sm shadow-lg outline-none transition-all placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/10 disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={!question.trim() || stage !== "question"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Ask
          </button>
        </form>
        {submittedQuestion && stage !== "question" && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Your question: <span className="font-medium text-foreground">{submittedQuestion}</span>
          </p>
        )}
      </div>

      {stage === "question" && (
        <div className="mt-10 text-center">
          <div className="mx-auto flex h-52 w-36 items-center justify-center rounded-[1.4rem] border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-[color:var(--gold)]/20 shadow-2xl shadow-primary/10">
            <CardMandala />
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Enter your question to awaken and shuffle the deck.
          </p>
        </div>
      )}

      {(stage === "shuffling" || stage === "choose" || stage === "selected") && (
        <div className="mt-9">
          <div className="text-center">
            <h3 className="font-display text-2xl text-foreground">
              {stage === "shuffling"
                ? "The deck is aligning with your question..."
                : selectedIndex === null
                  ? "Choose the card that draws your attention"
                  : "Your card is chosen"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {stage === "shuffling"
                ? "Take one slow breath and keep your question in mind."
                : selectedIndex === null
                  ? "There is no wrong choice. Trust your first instinct."
                  : "When you are ready, reveal its guidance."}
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl items-end justify-center gap-1.5 sm:gap-3">
            {cards.map((card, index) => {
              const rotation = (index - 3) * 4;
              const selected = selectedIndex === index;
              return (
                <button
                  key={card.name}
                  type="button"
                  disabled={stage === "shuffling"}
                  aria-label={`Choose card ${index + 1}`}
                  onClick={() => {
                    setSelectedIndex(index);
                    setStage("selected");
                  }}
                  className={`group relative h-40 w-20 origin-bottom rounded-xl border bg-gradient-to-br from-primary/20 via-card to-[color:var(--gold)]/15 shadow-lg transition-all duration-500 sm:h-52 sm:w-28 ${
                    selected
                      ? "-translate-y-5 border-primary ring-2 ring-primary/25"
                      : "border-primary/25 hover:-translate-y-4 hover:border-primary/60"
                  } ${selectedIndex !== null && !selected ? "opacity-55" : ""}`}
                  style={{
                    transform: selected
                      ? "translateY(-20px) rotate(0deg)"
                      : `rotate(${rotation}deg)`,
                    animation:
                      stage === "shuffling"
                        ? `vedic-card-shuffle .55s ease-in-out ${index * 70}ms infinite alternate`
                        : undefined,
                  }}
                >
                  <div className="absolute inset-2 rounded-lg border border-primary/20" />
                  <div className="relative flex h-full items-center justify-center">
                    <CardMandala compact />
                  </div>
                </button>
              );
            })}
          </div>

          {stage === "selected" && selectedCard && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={generateReading}
                className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Show My Destiny
              </button>
              {readingError && (
                <div className="mx-auto mt-4 max-w-lg rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {readingError === "NO_CREDITS" ? (
                    <>
                      You have no questions remaining.{" "}
                      <Link to="/pricing" className="font-semibold underline underline-offset-4">
                        Get more questions
                      </Link>
                    </>
                  ) : (
                    readingError
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {(stage === "generating" || stage === "reading") && selectedCard && (
        <div className="mx-auto mt-9 grid max-w-4xl gap-6 md:grid-cols-[220px_1fr] md:items-center">
          <div
            className="mx-auto flex h-72 w-48 flex-col items-center justify-center rounded-[1.4rem] border border-primary/40 bg-gradient-to-br from-[color:var(--gold)]/20 via-card to-primary/15 p-5 text-center shadow-2xl shadow-primary/15"
            style={{ animation: "vedic-card-reveal .7s ease-out both" }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-background/70">
              <span className="font-display text-sm font-semibold tracking-widest text-primary">
                {selectedCard.symbol}
              </span>
            </div>
            <p className="mt-5 font-display text-2xl text-foreground">{selectedCard.name}</p>
            <p className="mt-1 text-lg text-primary">{selectedCard.devanagari}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {selectedCard.essence}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card/85 p-6 shadow-xl backdrop-blur-md sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Your Vedic card message
            </p>
            <h3 className="mt-3 font-display text-2xl text-foreground">
              {selectedCard.name} answers your question
            </h3>
            <p className="mt-2 text-sm italic text-muted-foreground">
              “{submittedQuestion}”
            </p>
            {stage === "generating" && !aiReading ? (
              <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-5">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
                  <p className="text-sm font-medium text-foreground">
                    Vaanii is reading your card and birth chart...
                  </p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Connecting {selectedCard.name} with the question you asked.
                </p>
              </div>
            ) : (
              <StructuredReading content={aiReading} streaming={stage === "generating"} />
            )}
            {stage === "reading" && (
              <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetReading}
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
              >
                Ask Another Question
              </button>
              <button
                type="button"
                onClick={() => {
                  setCards(shuffledDeck());
                  setSelectedIndex(null);
                  setAiReading("");
                  setReadingError("");
                  setStage("shuffling");
                }}
                className="rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                Shuffle Again
              </button>
            </div>
            )}
          </div>
        </div>
      )}

      <p className="mt-8 text-center text-[11px] text-muted-foreground/70">
        Vedic-inspired reflective guidance for personal insight. It does not guarantee future events.
      </p>
    </section>
  );
}

function StructuredReading({ content, streaming }: { content: string; streaming: boolean }) {
  const blocks = content
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="mt-5 space-y-4" aria-live="polite">
      {blocks.map((block, index) => {
        const heading = block.match(/^\*\*(.+?)\*\*:?$/);
        if (heading) {
          return (
            <h4
              key={`${heading[1]}-${index}`}
              className="border-l-2 border-primary pl-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary"
            >
              {heading[1]}
            </h4>
          );
        }

        return (
          <p key={`${block.slice(0, 24)}-${index}`} className="leading-7 text-foreground/90">
            {block.replace(/\*\*(.+?)\*\*/g, "$1")}
          </p>
        );
      })}
      {streaming && <span className="inline-block h-4 w-1 animate-pulse bg-primary" aria-hidden="true" />}
    </div>
  );
}

export function VedicTarotNavButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="5" y="3" width="14" height="18" rx="3" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 6v2M12 16v2M6 12h2M16 12h2" />
      </svg>
      Tarot Reading
    </button>
  );
}

function CardMandala({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full border border-primary/30 ${
        compact ? "h-12 w-12 sm:h-16 sm:w-16" : "h-20 w-20"
      }`}
    >
      <div className="absolute inset-2 rotate-45 rounded-lg border border-[color:var(--gold)]/50" />
      <div className="absolute inset-3 rounded-full border border-primary/20" />
      <span className={`relative font-display text-primary ${compact ? "text-lg" : "text-2xl"}`}>
        ॐ
      </span>
    </div>
  );
}
