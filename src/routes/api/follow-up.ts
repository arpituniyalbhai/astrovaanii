import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are a follow-up question generator for a Vedic astrology chat.
Return ONLY valid JSON: {"questions":["question one?","question two?"]}
Rules:
- Exactly 2 questions, 10-14 words each
- No astrology jargon (no nakshatra, dasha, house, yoga, lord)
- Sound like what a curious person would naturally ask next
- Question 1: goes deeper on the same topic
- Question 2: pivots to a connected life area
- No markdown, no numbering, JSON only`;

async function handleFollowUp(request: Request) {
  const { question, answer, lang } = await request.json() as {
    question: string;
    answer: string;
    lang?: string;
  };

  const API_KEY = process.env.MISTRAL_API_KEY;
  const prompt = `User asked: ${question}\n\nAnswer given: ${answer.slice(0, 600)}\n\nGenerate 2 follow-up questions in ${lang === "hi" ? "Hindi" : "English"}.`;

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 120,
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ questions: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || "";
  
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      return new Response(JSON.stringify({ questions: parsed.questions || [] }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch {}
  
  return new Response(JSON.stringify({ questions: [] }), {
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/follow-up")({
  server: {
    handlers: {
      POST: async ({ request }) => handleFollowUp(request),
    },
  },
});
