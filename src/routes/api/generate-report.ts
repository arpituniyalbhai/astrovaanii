import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, runTransaction } from "firebase/firestore";
import { REPORT_PROMPTS, REPORT_TITLES, type ReportType } from "@/lib/report-prompts";

type ReportSection = {
  heading: string;
  content: string;
};

type GeneratedReport = {
  title: string;
  subtitle: string;
  sections: ReportSection[];
};

const reportTypes = new Set<ReportType>(["personal", "relationship", "wealth"]);
const REPORT_CREDIT_COST = 10;

const firebaseConfig = {
  apiKey: "AIzaSyCPEGp0ub5sUeRSHlcZuctNU9ieJmDwceo",
  authDomain: "astrovaanii-ai.firebaseapp.com",
  projectId: "astrovaanii-ai",
  storageBucket: "astrovaanii-ai.firebasestorage.app",
  messagingSenderId: "244796939843",
  appId: "1:244796939843:web:b7c143d15dea8fe7a47ef6",
  measurementId: "G-WM1T1W6YFJ",
};

const reportFirebaseApp =
  getApps().find((app) => app.name === "report-server") ??
  initializeApp(firebaseConfig, "report-server");
const reportDb = getFirestore(reportFirebaseApp);

function emailToDocId(email: string) {
  return email.replace(/\./g, ",");
}

async function deductReportCredits(email: string) {
  const userRef = doc(reportDb, "Users", emailToDocId(email));

  return runTransaction(reportDb, async (transaction) => {
    const snapshot = await transaction.get(userRef);
    if (!snapshot.exists()) throw new Error("USER_NOT_FOUND");

    const currentCredits = Number(snapshot.data().questionsRemaining) || 0;
    if (currentCredits < REPORT_CREDIT_COST) throw new Error("INSUFFICIENT_CREDITS");

    const creditsRemaining = currentCredits - REPORT_CREDIT_COST;
    transaction.update(userRef, { questionsRemaining: creditsRemaining });
    return creditsRemaining;
  });
}

function parseReport(raw: string): GeneratedReport {
  const jsonText = raw
    .replace(/^```json\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  const parsed = JSON.parse(jsonText) as Partial<GeneratedReport>;

  if (!Array.isArray(parsed.sections) || parsed.sections.length !== 8) {
    throw new Error("The report did not contain the required eight sections.");
  }

  const sections = parsed.sections.map((section) => {
    if (!section || typeof section.heading !== "string" || typeof section.content !== "string") {
      throw new Error("The report contained an invalid section.");
    }
    return { heading: section.heading.trim(), content: section.content.trim() };
  });

  return {
    title: typeof parsed.title === "string" ? parsed.title.trim() : "Your Personalized Report",
    subtitle:
      typeof parsed.subtitle === "string"
        ? parsed.subtitle.trim()
        : "A personalized reading based on your supplied birth-chart data.",
    sections,
  };
}

async function generateReport(request: Request) {
  try {
    const body = (await request.json()) as {
      reportType?: ReportType;
      email?: string;
      userData?: Record<string, unknown>;
      astrologyData?: Record<string, unknown>;
      partnerData?: Record<string, unknown>;
      additionalContext?: string;
    };

    if (!body.reportType || !reportTypes.has(body.reportType)) {
      return Response.json({ error: "Please select a valid report type." }, { status: 400 });
    }
    if (!body.userData || typeof body.userData !== "object") {
      return Response.json({ error: "User data is required to create a report." }, { status: 400 });
    }
    const email = body.email?.trim();
    if (!email) {
      return Response.json(
        { error: "Please sign in again to generate your report." },
        { status: 401 },
      );
    }
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      throw new Error("AI report service is not configured.");
    }

    const generatedAt = new Date();
    const currentDate = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(generatedAt);

    const suppliedContext = {
      report_type: REPORT_TITLES[body.reportType],
      current_date: currentDate,
      primary_user: body.userData,
      astrology_engine_data: body.astrologyData || null,
      partner: body.reportType === "relationship" ? body.partnerData || null : null,
      additional_context: body.additionalContext?.trim() || null,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 75_000);

    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistral-large-latest",
          messages: [
            { role: "system", content: REPORT_PROMPTS[body.reportType] },
            {
              role: "user",
              content: `Create the report from this supplied data. The current date is dynamic and must be treated as ${currentDate}.\n\n${JSON.stringify(suppliedContext, null, 2)}`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.55,
          max_tokens: 4_800,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const details = await response.text();
        console.error("AI report generation failed:", details);
        return Response.json(
          { error: "The report could not be generated right now. Please try again." },
          { status: 502 },
        );
      }

      const result = await response.json();
      const content = result.choices?.[0]?.message?.content;
      if (typeof content !== "string" || !content.trim()) {
        throw new Error("The AI report response was empty.");
      }

      const report = parseReport(content);
      let creditsRemaining: number;

      try {
        creditsRemaining = await deductReportCredits(email);
      } catch (creditError) {
        const creditMessage = creditError instanceof Error ? creditError.message : "";
        if (creditMessage === "INSUFFICIENT_CREDITS") {
          return Response.json(
            {
              error: "INSUFFICIENT_CREDITS",
              message: "You need at least 10 credits to generate this report.",
            },
            { status: 402 },
          );
        }
        if (creditMessage === "USER_NOT_FOUND") {
          return Response.json(
            { error: "Your profile was not found. Please complete onboarding first." },
            { status: 404 },
          );
        }
        console.error("Report credit deduction failed:", creditError);
        return Response.json(
          { error: "Unable to deduct report credits. Please try again." },
          { status: 500 },
        );
      }

      return Response.json({
        success: true,
        reportType: body.reportType,
        generatedAt: generatedAt.toISOString(),
        currentDate,
        sourceData: suppliedContext,
        report,
        creditsRemaining,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error("Report generation error:", error);
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "The report took too long to generate. Please try again."
        : "The report could not be generated right now. Please try again.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/generate-report")({
  server: {
    handlers: {
      POST: async ({ request }) => generateReport(request),
    },
  },
});
