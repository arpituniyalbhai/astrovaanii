import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  increment,
  runTransaction,
} from "firebase/firestore";
import { detectTopic } from "../../lib/topic-detection";
import { generateReasoning } from "../../lib/reasoning-engine";

const firebaseConfig = {
  apiKey: "AIzaSyCPEGp0ub5sUeRSHlcZuctNU9ieJmDwceo",
  authDomain: "astrovaanii-ai.firebaseapp.com",
  projectId: "astrovaanii-ai",
  storageBucket: "astrovaanii-ai.firebasestorage.app",
  messagingSenderId: "244796939843",
  appId: "1:244796939843:web:b7c143d15dea8fe7a47ef6",
  measurementId: "G-WM1T1W6YFJ",
};

const firebaseApp = initializeApp(firebaseConfig, "server");
const db = getFirestore(firebaseApp);

function emailToDocId(email: string) {
  return email.replace(/\./g, ",");
}

const PLANET_NAMES = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
];

function extractPreviousContext(messages: { role: string; content: string }[]): string {
  const lastBot = messages.filter((m) => m.role === "assistant").slice(-2);
  if (!lastBot.length) return "";
  const mentioned: string[] = [];
  for (const reply of lastBot) {
    const c = reply.content || "";
    for (const p of PLANET_NAMES) {
      if (c.includes(p)) mentioned.push(p);
    }
    const years = c.match(/\b\d{4}\b/g);
    if (years) mentioned.push(...years.map((y) => `year:${y}`));
  }
  return [...new Set(mentioned)].join(",");
}

const SYSTEM_PROMPT = `Only treat repetition as the same Planet + House pair being reused. Ignore repeated house numbers when different planets occupy that house. Avoid reusing the same Planet + House pair from the last 3 answers unless the new question genuinely requires it.

Use only 1-2 chart factors directly relevant to the current question.
Never add extra planets or houses just to make the answer sound more detailed.

REALITY FILTER:
* Never use phrases like "watch for", "notice if", "possibly".
* Give practica, Uniq , grounded advice (career, money, studies).
* No extreme claims.

AGE FILTER:
* Match predictions to user's life stage.
* Keep timelines realistic.

STYLE:
* Start with direct answer (no intro).
* Answer the user's question directly in the first 2-3 sentences.
* Explain the astrological reasoning only after giving the conclusion.
* Speak about real life situations relevant to the user's age and birth chart.
* Use confident tone but allow realistic uncertainty when needed.
* Keep it concise and clear.

FORMAT:
* 5-8 lines max
 
END: 
* End with a useful concluding sentence (dont sound generic), not a question.
* Do not add follow-up questions, curiosity hooks, or sales hooks..`;

const VEDIC_TAROT_PROMPT = `You are Vaanii, an experienced Vedic astrology guide giving a Vedic-inspired symbolic card reading.

READING RULES
- Answer the user's exact question directly. Do not give a generic card description.
- Treat the selected card as a reflective Vedic symbol, not as proof of a fixed or guaranteed future.
- Use birth-chart facts only when they are provided below. Never invent a placement, Dasha, date, yoga, or transit.
- If chart facts are available, connect only the most relevant one or two facts to the question and card.
- If chart facts are unavailable, do not claim the reading is personalized from a Kundli.
- Write in natural, conversational language that sounds like a thoughtful human astrologer, never like a template, textbook, or automated report.
- Give a clear and genuinely useful answer with enough context to help the user make a decision or understand their situation.
- Be warm, specific, practical, and honest. Avoid vague filler, fear, superstition, fatalism, and absolute promises.
- Explain astrology terms in everyday words whenever one is necessary.
- Detect the language of the user's question and answer in the same language.
- Write 180 to 240 words. Do not use tables or bullet lists.


Keep each section concise and place its text on the next line.`;

const VEDIC_TAROT_CARDS: Record<string, { essence: string; themes: string }> = {
  Surya: {
    essence: "clarity and life force",
    themes: "confidence, direction, recognition, renewed energy",
  },
  Chandra: {
    essence: "intuition and inner rhythm",
    themes: "inner knowing, sensitivity, home, memory, changing moods",
  },
  Ganesha: {
    essence: "openings and wise beginnings",
    themes: "new starts, practical wisdom, learning, obstacle removal",
  },
  Saraswati: {
    essence: "wisdom and expression",
    themes: "study, speech, creativity, skill, discernment",
  },
  Lakshmi: {
    essence: "value and graceful abundance",
    themes: "resources, self-worth, harmony, generosity, sustainable prosperity",
  },
  Hanuman: {
    essence: "courage and devoted action",
    themes: "discipline, loyalty, resilience, service, focused effort",
  },
  Shiva: {
    essence: "release and transformation",
    themes: "transformation, endings, stillness, truth, renewal",
  },
  Shakti: {
    essence: "creative power and movement",
    themes: "agency, creativity, passion, boundaries, momentum",
  },
  "Dharma Chakra": {
    essence: "alignment and right action",
    themes: "purpose, responsibility, timing, ethics, long-term direction",
  },
  Padma: {
    essence: "growth through experience",
    themes: "healing, patience, beauty, emotional growth, spiritual maturity",
  },
  Deepa: {
    essence: "guidance and illumination",
    themes: "insight, hope, learning, protection, practical guidance",
  },
  Kalpavriksha: {
    essence: "potential and patient creation",
    themes: "long-term wishes, support, legacy, patience, fruitful effort",
  },
};

async function handleStream(request: Request) {
  const data = (await request.json()) as {
    messages: { role: string; content: string }[];
    chart?: unknown;
    userName?: string;
    userDetails?: Record<string, unknown>;
    email?: string;
    isFree?: boolean;
    mode?: "chat" | "vedic-tarot";
    tarot?: { cardName?: string };
  };
  const { messages, chart, userName, userDetails, email, isFree, mode, tarot } = data;
  const isTarotReading = mode === "vedic-tarot";
  const selectedTarotCard =
    isTarotReading && tarot?.cardName ? VEDIC_TAROT_CARDS[tarot.cardName] : undefined;

  if (isTarotReading && !selectedTarotCard) {
    return new Response(JSON.stringify({ error: "Please select a valid Vedic card." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let questionsRemaining = 0;
  let userRef: ReturnType<typeof doc> | null = null;

  if (!isFree) {
    if (!email) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check and deduct credit atomically
    userRef = doc(db, "Users", emailToDocId(email));

    try {
      const result = await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(userRef!);
        if (!snap.exists()) {
          throw new Error("USER_NOT_FOUND");
        }
        const data = snap.data();
        const remaining = data.questionsRemaining ?? 0;
        if (remaining <= 0) {
          return { allowed: false, remaining: 0 };
        }
        transaction.update(userRef!, { questionsRemaining: increment(-1) });
        return { allowed: true, remaining: remaining - 1 };
      });
      questionsRemaining = result.remaining;
      if (!result.allowed) {
        return new Response(
          JSON.stringify({
            error: "NO_CREDITS",
            remaining: 0,
            message:
              "You've run out of credits. Please purchase more to continue your readings with Vaanii.",
          }),
          {
            status: 402,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      if (message === "USER_NOT_FOUND") {
        return new Response(
          JSON.stringify({
            error: "USER_NOT_FOUND",
            message: "User profile not found. Please complete onboarding first.",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      console.error("Credit deduction failed:", err);
      return new Response(
        JSON.stringify({
          error: "CREDIT_CHECK_FAILED",
          message: "Unable to verify credits. Please try again.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Track question in Firestore (non-blocking)
    try {
      const questionsRef = doc(
        db,
        "Users",
        emailToDocId(email),
        "questions",
        Date.now().toString(),
      );
      await setDoc(questionsRef, {
        question: messages[messages.length - 1]?.content || "",
        askedAt: new Date().toISOString(),
        creditsRemainingAfter: questionsRemaining,
      });
    } catch {
      // Non-critical — don't block the response
    }
  }

  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const topic = detectTopic(lastUserMsg?.content || "");
  const previousCtx = extractPreviousContext(messages);
  const reasoning = chart
    ? generateReasoning(chart as Record<string, unknown>, topic, previousCtx)
    : null;

  const systemMessages: { role: string; content: string }[] = [
    { role: "system", content: isTarotReading ? VEDIC_TAROT_PROMPT : SYSTEM_PROMPT },
  ];

  if (isTarotReading && tarot?.cardName && selectedTarotCard) {
    systemMessages.push({
      role: "system",
      content: `[Selected Vedic Card]\nName: ${tarot.cardName}\nEssence: ${selectedTarotCard.essence}\nThemes: ${selectedTarotCard.themes}\nUse this symbolic context without claiming supernatural certainty.`,
    });
  }

  if (reasoning) {
    systemMessages.push({
      role: "system",
      content: `[Planet Positions]\n${JSON.stringify(reasoning.planetPositions, null, 2)}`,
    });
    if (reasoning.facts.length > 0) {
      systemMessages.push({
        role: "system",
        content: `[Facts]\n${reasoning.facts.join("\n")}`,
      });
    }
    if (reasoning.interpretation.length > 0) {
      const interpText = reasoning.interpretation
        .map(
          (i) =>
            `- ${i.factor} in house ${i.house}: ${i.meaning}. Effect: ${i.effect}. Why: ${i.why}`,
        )
        .join("\n");
      systemMessages.push({
        role: "system",
        content: `[Interpretation]\n${interpText}`,
      });
    }
    systemMessages.push({
      role: "system",
      content: `[Prediction]\nSummary: ${reasoning.prediction.summary}\nWhy:\n${reasoning.prediction.why.map((w) => `- ${w}`).join("\n")}\nAction: ${reasoning.prediction.action}`,
    });
    systemMessages.push({
      role: "system",
      content: `[Broad Profile]\nStyle: ${reasoning.broadPrediction.style}\nStrengths: ${reasoning.broadPrediction.strengths.join(", ")}\nAvoid: ${reasoning.broadPrediction.avoid.join(", ")}`,
    });
    if (reasoning.timing.length > 0) {
      const t = reasoning.timing[0];
      systemMessages.push({
        role: "system",
        content: `[Timing]\nNext relevant period: ${t.period} (${t.start} to ${t.end})\n${t.note}`,
      });
    }
    if (reasoning.yogas.length > 0) {
      systemMessages.push({
        role: "system",
        content: `[Yogas]\n${reasoning.yogas.map((y) => `${y.name}: ${y.description}`).join("\n")}`,
      });
    }
    if (reasoning.memoryNote) {
      systemMessages.push({
        role: "system",
        content: `[Already Discussed]\n${reasoning.memoryNote}\nDo not repeat these unless asked. Build on them.`,
      });
    }
  }

  if (isTarotReading) {
    systemMessages.push({
      role: "system",
      content: chart
        ? "[Personalization Status]\nVerified birth-chart calculations are available above."
        : "[Personalization Status]\nNo verified birth-chart calculations are available. Do not invent or imply any.",
    });
  }

  systemMessages.push({
    role: "system",
    content: `Date: ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`,
  });

  if (userName) {
    systemMessages.push({ role: "system", content: `User: ${userName}` });
  }
  if (userDetails) {
    const lines: string[] = ["Details:"];
    if (userDetails.dob) lines.push(`DOB: ${userDetails.dob}`);
    if (userDetails.timeOfBirth) lines.push(`TOB: ${userDetails.timeOfBirth}`);
    if (userDetails.location) lines.push(`Location: ${userDetails.location}`);
    systemMessages.push({ role: "system", content: lines.join("\n") });
  }

  const API_KEY = process.env.MISTRAL_API_KEY;
  const MODEL = "mistral-small-latest";
  const ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const mistralRes = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [...systemMessages, ...messages],
        temperature: 0.7,
        max_tokens: isTarotReading ? 520 : 280,
        safe_prompt: false,
        stream: true,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!mistralRes.ok) {
      const text = await mistralRes.text();
      // Refund credit on Mistral API error
      if (userRef) {
        try {
          await updateDoc(userRef, { questionsRemaining: increment(1) });
        } catch {
          /* non-critical */
        }
      }
      return new Response(text, { status: mistralRes.status });
    }

    const headers: Record<string, string> = {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Credits-Remaining": String(questionsRemaining),
    };

    return new Response(mistralRes.body, { headers });
  } catch (err) {
    clearTimeout(timeout);
    console.error("Mistral API error:", err);
    // Refund credit on network/fetch error
    if (userRef) {
      try {
        await updateDoc(userRef, { questionsRemaining: increment(1) });
      } catch {
        /* non-critical */
      }
    }
    return new Response(JSON.stringify({ error: "AI service unavailable. Please try again." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => handleStream(request),
    },
  },
});
