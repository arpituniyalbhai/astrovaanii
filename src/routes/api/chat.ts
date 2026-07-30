import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment, runTransaction } from "firebase/firestore";
import { detectIntent } from "../../lib/topic-detection";
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

const PLANET_NAMES = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

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

const SYSTEM_PROMPT = `You are Vaanii, an experienced Vedic Jyotish astrologer.

ROLE
You interpret ONLY the astrology information provided by the backend.
Never calculate, modify, or invent astrological data.

FACTS
Planet positions, houses, dashas, yogas and timings are authoritative.
If information is missing, simply say you don't have enough chart information.

RESPONSE RULES

1. First answer the user's actual question.

2. Then explain ONLY the astrology needed to support that answer.

3. Use at most TWO astrological reasons.

4. Never explain the whole birth chart.

5. Never mention unrelated planets, houses, yogas or dashas.

6. Mention Dasha or Timing ONLY when the user asks about timing or when timing changes the answer.

7. Speak naturally like an experienced astrologer, not a report.

8. Every response should feel newly written.

9. Reply in the same language as the user.

10. If the question has already been fully answered using one or two factors, stop. Do not add more.

FORMAT

• 60–100 words
• One paragraph
• No bullets
• No markdown
• End with one useful insight.`;

async function handleStream(request: Request) {
  const data = await request.json() as {
    messages: { role: string; content: string }[];
    chart?: unknown;
    userName?: string;
    userDetails?: Record<string, unknown>;
    email?: string;
    isFree?: boolean;
  };
  const { messages, chart, userName, userDetails, email, isFree } = data;

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
        return new Response(JSON.stringify({
          error: "NO_CREDITS",
          remaining: 0,
          message: "You've run out of credits. Please purchase more to continue your readings with Vaanii.",
        }), {
          status: 402,
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      if (message === "USER_NOT_FOUND") {
        return new Response(JSON.stringify({
          error: "USER_NOT_FOUND",
          message: "User profile not found. Please complete onboarding first.",
        }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      console.error("Credit deduction failed:", err);
      return new Response(JSON.stringify({
        error: "CREDIT_CHECK_FAILED",
        message: "Unable to verify credits. Please try again.",
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Track question in Firestore (non-blocking)
    try {
      const questionsRef = doc(db, "Users", emailToDocId(email), "questions", Date.now().toString());
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
  const intent = detectIntent(lastUserMsg?.content || "");
  const previousCtx = extractPreviousContext(messages);
  const reasoning = chart
    ? generateReasoning(chart as Record<string, unknown>, intent.topics, previousCtx)
    : null;

  const systemMessages: { role: string; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  if (reasoning) {
    let topEvidence = reasoning.evidence.slice(0, 2);

    // Merge duplicate factors
    if (topEvidence.length > 1 && topEvidence[0].factor === topEvidence[1].factor) {
      topEvidence = [topEvidence[0]];
    }

    if (topEvidence.length > 0) {
      const evidenceText = topEvidence.map((e, i) =>
        `${i === 0 ? "Primary Evidence" : "Supporting Evidence"}\n${e.factor}\nHouse ${e.house}\n\n${e.explanation}`
      ).join("\n\n");
      systemMessages.push({
        role: "system",
        content: `[Relevant Evidence]\n${evidenceText}`,
      });
    }

    systemMessages.push({
      role: "system",
      content: `[Evidence Usage]\nThe evidence above is already ranked by importance. Use the first evidence whenever possible. Only use the second evidence if it materially strengthens the answer. Do not invent additional astrological reasons.`,
    });

    if (reasoning.memoryNote) {
      systemMessages.push({
        role: "system",
        content: `[Previous Discussion]\n${reasoning.memoryNote}\nAvoid repeating these unless necessary.`,
      });
    }

    const wantsTiming = intent.wantsTiming;
    if (wantsTiming && reasoning.timing) {
      const t = reasoning.timing;
      systemMessages.push({
        role: "system",
        content: `[Timing]\n${t.period} (${t.start} to ${t.end})\n${t.note}`,
      });
    }

    if (reasoning.yogaInfo) {
      systemMessages.push({
        role: "system",
        content: `[Yogas]\n${reasoning.yogaInfo}`,
      });
    }
  }

  systemMessages.push({
    role: "system",
    content: `Date: ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`,
  });

  if (userName) {
    systemMessages.push({ role: "system", content: `User: ${userName}\n\nIMPORTANT: Naturally use the user's name (${userName}) in your response once. Address them by name as a real astrologer would — at a natural point, not forced. Do not start the response with their name.` });
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
        temperature: 0.55,
        max_tokens: 220,
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
        } catch { /* non-critical */ }
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
      } catch { /* non-critical */ }
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
