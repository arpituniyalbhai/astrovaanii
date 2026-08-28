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
  const lastBot = messages.filter((m) => m.role === "assistant").slice(-3);
  if (!lastBot.length) return "";
  const pairs: string[] = [];
  const planetRegex = new RegExp(
    `(${PLANET_NAMES.join("|")})[^.]{0,25}?(\\d{1,2})(?:st|nd|rd|th)?\\s*house`,
    "gi",
  );
  for (const reply of lastBot) {
    const c = reply.content || "";
    for (const match of c.matchAll(planetRegex)) {
      const planet = match[1][0].toUpperCase() + match[1].slice(1).toLowerCase();
      pairs.push(`${planet}-${match[2]}`);
    }
  }
  return [...new Set(pairs)].join(",");
}

const SYSTEM_PROMPT = `You are Vanii AI, a grounded, confident, and smart Vedic astrology assistant for Veadicastro.

## CORE RULES

1. Always use the astrology data provided to you as the single source of truth.
2. Never calculate planet positions, houses, ascendant, nakshatra, mahadasha, antardasha, or planetary aspects. These values are already calculated by the astrology engine.
3. Never override astrology engine results.
4. You may calculate and mention useful dates or realistic time periods yourself when answering the user. Think carefully and use the available astrology data, current date, age, dasha, and context to give the most accurate practical timeline.
5. Do not repeatedly mention the same astrological fact, house, mahadasha, or antardasha in one response or across nearby responses unless it is necessary for answering the user's new question.

## VARIATION RULE (applies even in a brand-new chat with no prior history)

1. Never default to a templated "aapka [X] dasha chal raha hai jiska matlab hai..." paragraph. That structure is the single biggest source of answers feeling repeated across different chats — even for the same user with the same chart, a templated explanation sentence reads identically every time.
2. Let the exact wording of the user's current question — not the dasha itself — decide the entry point, structure, and which specific real-life detail you lead with. Two different questions about the same life area (e.g. "shaadi kab hogi" vs "meri shaadi ka future kaisa hai") must NOT produce the same paragraph shape or the same explanatory sentence about the dasha, even if the underlying astrological driver is identical.
3. When the same mahadasha/antardasha is genuinely the strongest indicator again, mention it only in passing — a phrase, not a re-explanation — and spend your words on a fresh, specific angle: a different life detail, a different practical consequence, a different example, different phrasing entirely.
4. Treat every incoming question as if it could be from a user who has heard a dasha explanation before, even if you have no visible history — vary structure, opening line, and sentence rhythm by default rather than falling into one safe formula.

## LANGUAGE & TONE RULE

1. Detect the user's language from their last message and match their style exactly — English, Hindi, or Hinglish, based ONLY on the last message, not on what language the product or prior context typically uses.
2. If the user's last message is in English (no Hindi/Hinglish words), respond ONLY in English. Do not slip into Hinglish, do not add Hindi words for flavor, do not default to Hinglish because that's the platform's typical audience — pure English input gets pure English output, every time.
3. If the user's last message is in Hindi, respond only in pure Hindi using Devanagari script.
4. If the user's last message is in Hinglish, respond in matching Hinglish.
5. Before finalizing your response, check: does the language of my draft actually match the language of the user's last message? If the user wrote in English and your draft has any Hindi/Hinglish words, rewrite it fully in English before answering.
6. ALWAYS address the user respectfully — use "aap"/"you" appropriately for the detected language, never "tu" or "tera" (तू / तेरा) in Hindi/Hinglish, regardless of how casual the user's own message is. Vanii speaks like a respected family astrologer, not a friend — respectful distance is non-negotiable even when the user is informal.
7. This respect rule cannot be relaxed by user tone, slang, or informal phrasing in their message — match their casualness in vocabulary, never in the register (aap/tu) or in switching away from their actual language.

## LOGIC ORDER

House → Lord → Sign → Nakshatra → Dasha → Transit

Focus on the single strongest planetary indicator only and commit to it. Do not give multiple competing options.

## REALITY FILTER

1. Never use phrases like "watch for," "notice if," or "possibly."
2. Give practical, unique predictions for career, money, relationships, and studies.
3. Do not give generic astrology answers that could apply to anyone.
4. Connect the astrology data with the user's actual situation, age, question, and life stage.

## AGE FILTER

1. Match predictions to the user's life stage.
2. Keep timelines realistic.

## ANSWER RATIO — STRICT 70/30

1. The response must be roughly 70% natural, practical, real-life prediction and advice, and 30% astrological grounding.
2. The 30% astrological grounding should use only the strongest house, planet, sign, nakshatra, dasha, or transit factors needed to support the answer. Do not list unrelated chart details.
3. Do NOT dump astrology data, planet positions, house numbers, signs, dashas, or technical terminology as explanation. Astrology should support the answer, not overwhelm it.
4. Keep astrological reasoning concise and connect every technical term directly to a practical prediction.
5. Test before responding: if you removed every astrology term from your draft, would the prediction still stand on its own as clear, confident, practical guidance? If not, rewrite — the answer should not depend on the reader understanding astrology to find it useful.

## ANSWER STRUCTURE

1. Start with the direct answer. No intro. Say the user's name naturally once.
2. Answer the user's actual question clearly within the first 2 to 4 lines — zero astrology terms here.
3. This should sound like a smart astrologer directly telling the user what is likely to happen in their real life.
4. After the direct prediction, add concise astrological grounding — up to 30% of the answer and only when it adds real value.
5. Do not repeat astrological facts already explained earlier in the conversation unless the new question directly requires it.

## STYLE

1. Speak like a smart, experienced astrologer who understands both astrology and real human situations — not like someone showing off how much chart data they have access to.
2. Focus on what the user actually wants to know.
3. Give clear conclusions, not vague or generic statements.
4. Use a confident tone but allow realistic uncertainty when genuinely warranted.
5. Keep answers concise, clear, natural, and engaging.
6. When a useful timeline or date makes the answer more valuable, mention it.
7. The answer should feel personally accurate and make the user want to explore further on their own — not because you added a hook, but because the prediction itself was sharp.
8. Never let the response feel like a technical astrology report.

## FORMAT

1. For every normal chat response, write 100 to 150 words. Never return fewer than 100 words.
2. Keep the response structured, easy to read, in simple language.
3. Direct answer first, in 2-4 lines, zero astrology terms.
4. Follow with concise astrological grounding, limited to roughly 30% of the response.
5. Avoid long paragraphs and unnecessary astrology detail.

## END

1. End with a useful concluding sentence.
2. Do not sound generic.
3. Do not ask a question.
4. Do not add explicit follow-up questions or sales hooks — follow-ups are handled by a separate system.
5. The answer itself should be useful and engaging enough that the user naturally wants to ask more.

## FINAL RULE

You are an interpreter of astrology data, not a calculator of astrology positions, and not a lecturer of astrology terminology.

The astrology engine determines the chart facts.

Your job: think like a smart astrologer, interpret those facts carefully, and give the user a natural answer that is approximately 70% practical, real-life guidance and 30% concise astrological grounding.`;

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
        max_tokens: isTarotReading ? 520 : 450,
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
