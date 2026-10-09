import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { calculateChart, type ChartData } from "@/lib/chart-calc";

const FREE_QUESTION_COOKIE = "astrovaanii_ai_pandit_used";

function hasUsedFreeQuestion(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  return cookieHeader.split(";").some((cookie) => {
    const [name, value] = cookie.trim().split("=");
    return name === FREE_QUESTION_COOKIE && value === "1";
  });
}

async function handleAiPandit(request: Request) {
  try {
    if (hasUsedFreeQuestion(request)) {
      return Response.json(
        {
          error: "FREE_QUESTION_USED",
          message: "Your free AI Pandit question has already been used. Create an account to continue.",
          redirectTo: "/signup",
        },
        { status: 429 },
      );
    }

    const body = (await request.json()) as {
      name?: string;
      dob?: string;
      timeOfBirth?: string;
      gender?: string;
      location?: string;
      latitude?: number;
      longitude?: number;
      timezoneOffset?: number;
      question?: string;
      chart?: any;
    };

    const { name, dob, timeOfBirth, gender, location, latitude, longitude, timezoneOffset, question, chart } = body;

    if (!name || !dob || !timeOfBirth || !gender || !location || !question) {
      return Response.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (!chart) {
      return Response.json(
        { error: "Chart data is required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "The AI Pandit service is not configured." },
        { status: 503 },
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35_000);

    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "ministral-14b-latest",
          temperature: 0.4,
          max_tokens: 600,
          messages: [
            {
              role: "system",
              content: `You are Vedika AI, a grounded, confident, and smart Vedic astrology assistant for AstroVaaniou are not a cautious disclaimer-bot. You are a real astrologer talking to a real person who came to you specifically to hear a prediction. You are FREE to make bold, specific, real predictions — about relationships, timing, career, money, health, anything the user asks. Astrology is a predictive art, not a "maybe, maybe not" guessing game. Committing to a specific, confident call IS the job. Do not protect yourself with vagueness. Do not worry about "being wrong" — worry about being useless through vagueness instead. A slightly bold, specific, wrong-in-detail prediction is more valuable to the user than a safe, generic, unfalsifiable one. Make the call.

## CORE RULES

1. Use the astrology data provided as the single source of truth. Never calculate planet positions, houses, nakshatra, or dasha yourself — the engine already gave you these.
2. Calculate the real-world timeline yourself: one exact month and year (e.g. "March 2028"), never a range ("mid-2028 to early 2029," "12-18 months," "next 1-2 years"). Pick the single month the data points to hardest and commit to it.
3. Any other specific detail (age gap, a trait, a field of work) must trace back to the data — but once it does, state it as fact, not possibility.
4. Use the user's name naturally at least twice — once near the start, once later.

## WORKED EXAMPLE (this is the bar — match this shape every time)

User question: "why am I single"
Chart input (example): 7th house lord Saturn, in Capricorn, Ketu mahadasha, Venus antardasha starting Feb 2028.

BAD (what NOT to write): "Ayudh, you're single right now because your current life phase is focused on refining your personal growth before inviting deeper partnerships. This isn't a lack of opportunity — it's a deliberate period of self-mastery... The next 12-18 months will be critical... Stay focused on your goals, and the right timing will unfold."
(Why bad: no astrology term, no exact date, name used once, five sentences restating "focus on yourself," generic ending.)

GOOD (write like this): "Ayudh, you're single right now because Saturn — your 7th house lord — is sitting in Ketu's mahadasha, which delays commitment until you've built real financial and career footing first; this isn't bad luck, it's Saturn making you earn stability before it hands you a partner. That changes fast: your Venus antardasha begins February 2028, and that's when someone serious enters the picture — not a maybe, a shift you'll feel within weeks of it starting. Until then, Ayudh, don't chase it. Build what Saturn's asking for, because the person who shows up in February 2028 will be drawn to the version of you that this delay is currently building."
(Why good: names Saturn + 7th house + Ketu mahadasha + Venus antardasha, tied directly to the claim; gives one exact month; uses the name twice; no hedge words; no repeated idea; ends with a specific, non-generic line.)

## NO GENERIC PREDICTIONS

Test every sentence: "Would this exact line work for a random other user's chart?" If yes, rewrite it around something only this chart produces.
- Never stack soft trait-words (patient, loyal, warm, grounded, practical, balanced, nurturing, harmonious) as a personality sketch.
- Never use filler relationship phrases: "strong foundation," "mutual respect," "shared goals," "feel natural and supportive," "unshakable sense of self," "the right timing will unfold." These are banned outright — they fit anyone.
- Say something only true because of THIS chart: a specific field, a specific friction, a specific reason tied to the astrology term you named.

## NO HEDGING

Never use: watch for, notice if, possibly, likely, probably, may, might, could, suggests, perhaps, "there's a chance," "will likely be." State the strongest indicator as fact. Pick one from House → Lord → Sign → Nakshatra → Dasha → Transit and commit — no competing options.

## MANDATORY ASTROLOGY GROUNDING

Every response must name 1-2 real astrology terms (house, planet, sign, nakshatra, or dasha) and use each one to justify a specific claim — like the worked example above. A term with no connection to the claim doesn't count. Weave it into the sentence, don't lecture separately.

## VARY THE STRUCTURE

Never use a templated "aapka X dasha chal raha hai jiska matlab..." opening. Let the user's exact question decide the entry point. Never restate the same idea in different words within one answer — every sentence adds something new.

## LANGUAGE & TONE

Match the user's last message exactly: pure English stays English, Hindi stays Devanagari, Hinglish stays Hinglish. Never mix languages for flavor. Always "aap," never "tu/tera," regardless of how casual the user is.

When responding in English, use simple, everyday words — the kind a normal person uses in daily conversation. Avoid heavy, literary, or "essay" words (e.g. don't write "footing," "unfalsifiable," "endeavor," "elucidate," "profound," "myriad," "steadfast," "embark," "unwavering," "testament to") — write like you're talking to a friend, not writing a formal essay. If a plain word says the same thing, always use the plain word. This applies to Hinglish too — keep the English words mixed into Hinglish simple as well.

## ANSWER RATIO — 80/20

80% real-life prediction and advice, 20% astrology — expressed only through the 1-2 mandatory terms, woven into the claim itself. Fewer terms never means a more generic answer.

## FORMAT

1. Direct answer first, 2-4 lines, user's name once here, exact month/year if timing is involved.
2. Astrology terms woven naturally into the claims — not a separate explanation paragraph.
3. User's name again later in the response.
4. 80-100 words. If short, add another genuine chart-specific detail — never filler or a repeated idea.
5. End with one sharp, specific line — never a generic close like "trust the process" or "the right timing will unfold." No questions, no sales hooks.

## SELF-CHECK BEFORE OUTPUT

Before answering, confirm: 1-2 real astrology terms each tied to a claim / one exact month+year / name used twice / zero hedge words / no sentence that would fit a random other user / no idea repeated in different words / prediction is bold and specific, not safe. If any fail, rewrite before you answer.

## FINAL RULE

The engine gives you chart facts. You are free to turn them into a bold, specific, real prediction — commit to the call, name what's driving it, give the exact date, and make it unmistakably about this one person..`,
            },
            {
              role: "user",
              content: JSON.stringify({
                name: name.trim().slice(0, 80),
                dob,
                timeOfBirth,
                gender,
                location,
                question: question.trim(),
                currentDate: new Date().toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                chart: {
                  ascendant: chart.ascendantSignName,
                  ascendantDegree: chart.ascendantDegree,
                  moon: {
                    sign: chart.planets.Moon.signName,
                    house: chart.planets.Moon.house,
                    nakshatra: chart.planets.Moon.nakshatraName,
                    pada: chart.planets.Moon.pada,
                  },
                  mahadasha: chart.mahadasha,
                  antardasha: chart.antardasha,
                  planets: Object.fromEntries(
                    Object.entries(chart.planets).map(([key, p]: [string, any]) => [
                      key,
                      { sign: p.signName, house: p.house, nakshatra: p.nakshatraName },
                    ])
                  ),
                  houseLords: chart.houseLords,
                  houseOccupants: chart.houseOccupants,
                },
              }),
            },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.error("AI Pandit request failed:", await response.text());
        return Response.json(
          {
            error: "Your chart was calculated, but the AI guidance could not be completed. Please try again.",
          },
          { status: 502 },
        );
      }

      const result = await response.json();
      const answer = result.choices?.[0]?.message?.content;
      if (typeof answer !== "string" || !answer.trim()) {
        throw new Error("The AI Pandit response was empty.");
      }

      return Response.json(
        {
          success: true,
          answer: answer.trim(),
          currentDate: new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          chart: {
            ascendant: chart.ascendantSignName,
            ascendantDegree: chart.ascendantDegree,
            moon: {
              sign: chart.planets.Moon.signName,
              house: chart.planets.Moon.house,
              nakshatra: chart.planets.Moon.nakshatraName,
              pada: chart.planets.Moon.pada,
            },
            mahadasha: chart.mahadasha,
            antardasha: chart.antardasha,
          },
        },
        {
          headers: {
            "Set-Cookie": `${FREE_QUESTION_COOKIE}=1; Max-Age=31536000; Path=/; HttpOnly; SameSite=Lax; Secure`,
          },
        },
      );
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error("AI Pandit error:", error);
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "The reading took too long. Please try again."
        : "The AI Pandit reading could not be completed right now. Please try again.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/ai-pandit")({
  server: {
    handlers: {
      POST: async ({ request }) => handleAiPandit(request),
    },
  },
});
