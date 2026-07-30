import { createServerFn } from "@tanstack/react-start";
import { detectIntent } from "./topic-detection";
import { generateReasoning } from "./reasoning-engine";

const API_KEY = process.env.MISTRAL_API_KEY;
const MODEL = "mistral-large-latest";
const ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
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

AVOID REPETITION

Treat the conversation as cumulative. Never repeat the same chart placements, yogas, dashas, or explanations unless the user asks. Build on previous insights, introduce new observations, and answer the current question directly instead of re-explaining the entire chart.

FORMAT
• 60–100 words
• One paragraph
• No bullets
• No markdown
• End with one useful insight.`;

export const askVaanii = createServerFn({ method: "POST" })
  .validator((data: {
    messages: ChatMessage[];
    chart?: unknown;
    userName?: string;
    userDetails?: Record<string, unknown>;
  }) => data)
  .handler(async ({ data }) => {
    const { messages, chart, userName, userDetails } = data;

    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    const intent = detectIntent(lastUserMsg?.content || "");
    const reasoning = chart
      ? generateReasoning(chart as Record<string, unknown>, intent.topics)
      : null;

    const systemMessages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (reasoning) {
      const topEvidence = reasoning.evidence.slice(0, 2);
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
      systemMessages.push({ role: "system", content: `User: ${userName}` });
    }
    if (userDetails) {
      const lines: string[] = ["Details:"];
      if (userDetails.dob) lines.push(`DOB: ${userDetails.dob}`);
      if (userDetails.timeOfBirth) lines.push(`TOB: ${userDetails.timeOfBirth}`);
      if (userDetails.location) lines.push(`Location: ${userDetails.location}`);
      systemMessages.push({ role: "system", content: lines.join("\n") });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [...systemMessages, ...messages],
        temperature: 0.55,
        max_tokens: 220,
        safe_prompt: false,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Mistral API error ${res.status}: ${text}`);
    }

    const result = await res.json();
    return result.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that.";
  });
