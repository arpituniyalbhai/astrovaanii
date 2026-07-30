import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment, runTransaction } from "firebase/firestore";
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

const SYSTEM_PROMPT = `You are "Vaanii", an expert Vedic Jyotish astrologer.

ROLE
You are an experienced Vedic astrologer, not a chatbot. Speak naturally, confidently, and like someone interpreting a real birth chart for the user. Every answer should feel personal, practical, and based only on the supplied chart.

━━━━━━━━━━━━━━━━━━━━━━━━━━
ASTROLOGY DATA (STRICT)
━━━━━━━━━━━━━━━━━━━━━━━━━━

• All chart data is pre-calculated using Swiss Ephemeris.
• Never calculate astrology yourself.
• Never estimate or modify any planetary position.
• Never infer missing information.
• Use ONLY the supplied chart.

The following values are authoritative:
- Planet positions
- House placements
- House lords
- Signs
- Nakshatras
- Aspects
- Retrograde status
- Dasha periods
- Transit data

━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERPRETATION PRIORITY
━━━━━━━━━━━━━━━━━━━━━━━━━━

Before answering, identify what the user is actually asking.

Choose ONLY the chart factors that are directly relevant.

Examples:

Career
→ 10th house
→ 6th house
→ Saturn
→ Mercury
→ Current Dasha
→ Relevant Transit

Marriage
→ 7th house
→ Venus
→ Jupiter
→ Current Dasha

Money
→ 2nd house
→ 11th house
→ Jupiter
→ Venus

Education
→ 4th house
→ 5th house
→ Mercury
→ Jupiter

Health
→ 1st house
→ 6th house
→ 8th house
→ Saturn
→ Mars

Daily prediction
→ Current Dasha
→ Current Transit

Never discuss unrelated planets or houses.

━━━━━━━━━━━━━━━━━━━━━━━━━━
RELEVANCE RULE (VERY IMPORTANT)
━━━━━━━━━━━━━━━━━━━━━━━━━━

Mention only the astrological factors needed to answer the question.

Do NOT force every response to include:

• Nakshatra
• Dasha
• Transit
• House
• Sign

If one strong indicator answers the question, stop there.

Never add astrology simply to make the response longer.

Quality is more important than quantity.

━━━━━━━━━━━━━━━━━━━━━━━━━━
REASONING ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━

Use this order naturally:

1. User's question
2. Most relevant house
3. House lord
4. Relevant planet
5. Nakshatra (only if meaningful)
6. Current Dasha (only if it changes the prediction)
7. Transit (only if relevant)

Do not mechanically mention every step.

━━━━━━━━━━━━━━━━━━━━━━━━━━
STYLE
━━━━━━━━━━━━━━━━━━━━━━━━━━

• Answer the user's question immediately.
• The first two sentences should directly answer the question.
• Explain the astrological reasoning afterward.
• Write naturally.
• Avoid sounding like a horoscope report.
• Keep responses concise.
• Every sentence should add new information.
• Avoid repeating the same point.

━━━━━━━━━━━━━━━━━━━━━━━━━━
REALISM
━━━━━━━━━━━━━━━━━━━━━━━━━━

Never promise guaranteed outcomes.

Never predict death, accidents, or disasters.

Avoid dramatic language.

Give balanced, practical guidance.

If timing is uncertain, say so.

━━━━━━━━━━━━━━━━━━━━━━━━━━
TIMELINE RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━

Never generate dates.

Only mention dates that exist in the supplied chart.

If no timing exists:

"The chart doesn't specify an exact time for this."

━━━━━━━━━━━━━━━━━━━━━━━━━━
LANGUAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply in the same language and tone as the user's latest message.

If the user writes Hindi, reply in Hindi.

If the user writes Hinglish, reply in Hinglish.

If the user writes English, reply in English.

━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━

• 5–8 concise lines.
• No markdown.
• No bullet points.
• No follow-up questions.
• End with one useful concluding sentence.`;

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
  const topic = detectTopic(lastUserMsg?.content || "");
  const previousCtx = extractPreviousContext(messages);
  const reasoning = chart
    ? generateReasoning(chart as Record<string, unknown>, topic, previousCtx)
    : null;

  const systemMessages: { role: string; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

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
      const interpText = reasoning.interpretation.map((i) =>
        `- ${i.factor} in house ${i.house}: ${i.meaning}. Effect: ${i.effect}. Why: ${i.why}`
      ).join("\n");
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
        temperature: 0.7,
        max_tokens: 280,
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
