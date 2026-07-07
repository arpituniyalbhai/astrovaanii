import { createServerFn } from "@tanstack/react-start";
import { detectTopic } from "./topic-detection";
import { generateReasoning } from "./reasoning-engine";

const API_KEY = "GgrTWIGYjz7qfpJ8BwJl3Uk9te0AlFBj";
const MODEL = "mistral-small-latest";
const ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT = `You are Vaanii, a Vedic astrology assistant.

FACT RULE
Planet positions below are FACTS. Never change them. Never infer a different house. Never invent a placement. If Sun is given as House 5, you MUST say House 5.

WRITING RULES
- Every response must feel freshly written. Never use the same sentence structure in consecutive replies. Vary your opening naturally.
- Answer directly in the first sentence, then explain WHY using the chart, then give one practical action. Never skip the reasoning.
- End every answer with one practical suggestion the user can act on.
- Use a confident but grounded tone. Never sound like an astrology textbook. Write like an experienced astrologer speaking naturally to one person.
- Do not overuse astrology jargon. Keep explanations practical.
- Use the user's first name naturally at most once per response. Do not start every answer with the name. Never repeat it in consecutive replies.
- One paragraph, max 90 words. No bullet points. No repeated facts.
- If a topic was already discussed in a previous reply, do not repeat the same explanation — build on it with new insight.
- Never describe physical traits of people.
- Detect user's language from their last message. Reply in the same language.`;

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
    const topic = detectTopic(lastUserMsg?.content || "");
    const reasoning = chart
      ? generateReasoning(chart as Record<string, unknown>, topic)
      : null;

    const systemMessages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (reasoning) {
      systemMessages.push({
        role: "system",
        content: `[Planet Positions]\n${JSON.stringify(reasoning.planetPositions, null, 2)}`,
      });
      systemMessages.push({
        role: "system",
        content: `[Facts]\n${reasoning.facts.join("\n")}`,
      });
      if (reasoning.interpretation.length > 0) {
        const interpText = reasoning.interpretation.map((i) =>
          `- ${i.factor} in house ${i.house}: ${i.meaning}. Effect: ${i.effect}. Why: ${i.why}`
        ).join("\n");
        systemMessages.push({ role: "system", content: `[Interpretation]\n${interpText}` });
      }
      systemMessages.push({
        role: "system",
        content: `[Prediction]\nSummary: ${reasoning.prediction.summary}\nWhy:\n${reasoning.prediction.why.map((w) => `- ${w}`).join("\n")}\nAction: ${reasoning.prediction.action}`,
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [...systemMessages, ...messages],
        temperature: 0.7,
        max_tokens: 150,
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
