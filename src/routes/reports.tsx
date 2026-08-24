import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ChartNoAxesCombined,
  Check,
  FileText,
  IndianRupee,
  LoaderCircle,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import relationshipReportImage from "@/assets/report-kundli.jpg";
import wealthReportImage from "@/assets/report-wealth.jpg";
import personalReportImage from "@/assets/report-pastlife.jpg";
import vaaniiPersona from "@/assets/vaanii-persona.jpg";
import { PricingDialog } from "@/components/PricingDialog";
import { auth, onUserDoc } from "@/lib/firebase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Astrology Reports — AstroVaanii" },
      {
        name: "description",
        content: "Explore personalized relationship, wealth, and personal astrology reports.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReportsPage,
});

const reports = [
  {
    type: "relationship",
    title: "Relationship Report",
    label: "Love & connection",
    description:
      "A deeper understanding of how two people connect, communicate, support each other, and handle differences.",
    image: relationshipReportImage,
    imageAlt: "Woman looking at a star-filled sky",
    highlights: ["Relationship patterns", "Partner compatibility", "Love-life guidance"],
    sections: [
      {
        title: "Overall Compatibility",
        description:
          "Understand the natural strengths and potential friction points in your connection.",
      },
      {
        title: "Emotional Compatibility",
        description: "Explore how each person gives, receives, and responds to emotional support.",
      },
      {
        title: "Communication Dynamics",
        description:
          "Discover where communication flows easily and where misunderstandings may happen.",
      },
      {
        title: "Love & Affection Styles",
        description: "Learn how each person may express care, attention, and closeness.",
      },
      {
        title: "Relationship Strengths",
        description: "Identify the qualities that can help your relationship grow stronger.",
      },
      {
        title: "Potential Challenges",
        description:
          "See areas where different expectations, habits, or personalities may create tension.",
      },
      {
        title: "Conflict Patterns",
        description:
          "Understand how each person may react during disagreements and stressful situations.",
      },
      {
        title: "Trust & Security",
        description:
          "Explore the factors that may influence emotional safety and stability in the relationship.",
      },
      {
        title: "Long-Term Dynamics",
        description:
          "Gain insight into how the relationship may function as responsibilities and priorities evolve.",
      },
      {
        title: "Growth as a Couple",
        description: "Discover areas where you can support each other's development.",
      },
      {
        title: "Practical Relationship Guidance",
        description:
          "Get useful suggestions for improving communication, understanding, and connection.",
      },
    ],
  },
  {
    type: "wealth",
    title: "Wealth Report",
    label: "Money & growth",
    description:
      "A personalized look at your relationship with money, work, opportunities, financial habits, and wealth-building tendencies.",
    image: wealthReportImage,
    imageAlt: "Watercolor treasure chest filled with Indian currency and growing leaves",
    highlights: ["Earning potential", "Financial habits", "Growth periods"],
    sections: [
      {
        title: "Money Mindset",
        description:
          "Understand the beliefs and attitudes that may influence how you earn, spend, save, and invest.",
      },
      {
        title: "Financial Strengths",
        description: "Discover natural qualities that may help you build and manage wealth.",
      },
      {
        title: "Potential Money Blocks",
        description: "Identify habits or patterns that may limit financial progress.",
      },
      {
        title: "Earning Style",
        description:
          "Explore the types of work, environments, or approaches that may suit the way you create value.",
      },
      {
        title: "Career & Business Tendencies",
        description:
          "Understand whether you may thrive through structured careers, entrepreneurship, leadership, creativity, or other paths.",
      },
      {
        title: "Decision-Making With Money",
        description:
          "Learn how you may approach financial risks, opportunities, and major purchases.",
      },
      {
        title: "Spending & Saving Patterns",
        description: "Recognize tendencies that can influence your financial stability.",
      },
      {
        title: "Growth Opportunities",
        description:
          "Discover areas where focusing your skills and energy may create stronger financial potential.",
      },
      {
        title: "Wealth-Building Habits",
        description:
          "Get practical suggestions for developing a healthier and more intentional approach to money.",
      },
      {
        title: "Long-Term Financial Focus",
        description:
          "Identify areas that may deserve more attention when planning for future stability and growth.",
      },
      {
        title: "Personalized Action Points",
        description:
          "Receive clear next steps to help you make more conscious financial and career decisions.",
      },
    ],
  },
  {
    type: "personal",
    title: "Personal Report",
    label: "Life & purpose",
    description:
      "A detailed look at your personality, natural tendencies, strengths, challenges, and personal growth patterns.",
    image: personalReportImage,
    imageAlt: "Person walking through a watercolor timeline beneath a large clock",
    highlights: ["Core personality", "Natural strengths", "Life direction"],
    sections: [
      {
        title: "Core Personality Insights",
        description: "Understand how you naturally think, feel, react, and make decisions.",
      },
      {
        title: "Your Key Strengths",
        description: "Discover the qualities and abilities you can use to your advantage.",
      },
      {
        title: "Personal Challenges",
        description:
          "Identify recurring patterns that may hold you back and how to work with them.",
      },
      {
        title: "Emotional Patterns",
        description: "Learn how you process emotions, stress, change, and uncertainty.",
      },
      {
        title: "Communication Style",
        description: "See how you express yourself and how others may perceive you.",
      },
      {
        title: "Confidence & Motivation",
        description: "Understand what drives you and what can affect your confidence.",
      },
      {
        title: "Career & Work Style",
        description:
          "Explore the environments, responsibilities, and working styles that may suit you best.",
      },
      {
        title: "Personal Growth Areas",
        description: "Get practical areas to focus on for stronger self-awareness and development.",
      },
      {
        title: "Life Patterns & Tendencies",
        description: "Recognize themes that may repeatedly appear in your choices and experiences.",
      },
      {
        title: "Actionable Guidance",
        description: "Receive clear suggestions you can reflect on and apply in daily life.",
      },
    ],
  },
] as const;

const everyReportIncludes = [
  "A personalized, easy-to-read report",
  "Clear explanations without complicated terminology",
  "Detailed insights organized into simple sections",
  "Key strengths and challenge areas",
  "Practical guidance and actionable recommendations",
  "A summary of your most important insights",
  "A report you can return to whenever you need clarity",
] as const;

function ReportsPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<(typeof reports)[number] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(() => {
    if (typeof window === "undefined") return 0;
    const stored = JSON.parse(localStorage.getItem("userData") || "{}");
    return Number(stored.questionsRemaining) || 0;
  });
  const [userName] = useState(() => {
    if (typeof window === "undefined") return "User";
    const stored = JSON.parse(localStorage.getItem("userData") || "{}");
    return stored.name || "User";
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userData") || "{}");
    const email = auth.currentUser?.email || stored.email;
    if (!email) return;

    return onUserDoc(email, (data) => {
      if (data) setQuestionsRemaining(Number(data.questionsRemaining) || 0);
    });
  }, []);

  const handleGenerateReport = async () => {
    if (!selectedReport || isGenerating) return;
    if (questionsRemaining < 10) {
      setSelectedReport(null);
      setGenerationError("");
      setIsPricingOpen(true);
      return;
    }

    setIsGenerating(true);
    setGenerationError("");

    try {
      const stored = JSON.parse(localStorage.getItem("userData") || "{}");
      const { chart, ...userProfile } = stored;
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportType: selectedReport.type,
          userData: userProfile,
          astrologyData: chart || null,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to generate your report.");
      }

      sessionStorage.setItem("astrovaanii_generated_report", JSON.stringify(result));
      setSelectedReport(null);
      await navigate({ to: "/report-result" });
    } catch (error) {
      setGenerationError(
        error instanceof Error ? error.message : "Unable to generate your report. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-background grain">
      <div className="orb -left-32 -top-24 h-[420px] w-[420px] bg-[color:var(--gold)]" />
      <div className="orb -right-24 bottom-0 h-[360px] w-[360px] bg-[color:var(--clay)] opacity-40" />

      <div className="relative z-10 flex h-full">
        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col border-r border-border bg-card/95 backdrop-blur-md transition-transform duration-300 md:static md:translate-x-0 md:bg-card/60 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <Link to="/dashboard" className="flex items-center gap-3">
              <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-lg">
                Astro<span className="text-primary">Vaanii</span>
              </span>
            </Link>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setIsSidebarOpen(false)}
              className="text-muted-foreground hover:text-foreground md:hidden"
            >
              <X size={22} />
            </button>
          </div>

          <div className="border-b border-border px-4 py-4">
            <div className="flex items-center gap-3 rounded-xl bg-background/50 px-3 py-2">
              <img
                src={vaaniiPersona}
                alt="Vaanii"
                className="h-10 w-10 rounded-full border-2 border-primary/20 object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-foreground">{userName}</div>
                <div className="text-xs text-muted-foreground">Personal dashboard</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6" aria-label="Dashboard">
            <SidebarLink
              to="/dashboard"
              label="Chat"
              icon={<MessageCircle size={18} aria-hidden="true" />}
              onNavigate={() => setIsSidebarOpen(false)}
            />
            <PricingDialog
              onTriggerClick={() => setIsSidebarOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
            >
              <IndianRupee size={18} aria-hidden="true" />
              Pricing
            </PricingDialog>
            <SidebarLink
              to="/my-chart"
              label="My Chart"
              icon={<ChartNoAxesCombined size={18} aria-hidden="true" />}
              onNavigate={() => setIsSidebarOpen(false)}
            />
            <SidebarLink
              to="/reports"
              label="Reports"
              icon={<FileText size={18} aria-hidden="true" />}
              active
              onNavigate={() => setIsSidebarOpen(false)}
            />
          </nav>

          <div className="border-t border-border px-4 py-4">
            <Link
              to="/dashboard"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Back to dashboard
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex min-h-16 items-center border-b border-primary/20 bg-primary/10 px-4 backdrop-blur-md md:hidden">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-background/50 hover:text-foreground"
            >
              <Menu size={23} />
            </button>
            <span className="ml-3 font-display text-lg text-foreground">Reports</span>
          </header>

          <div className="flex-1 overflow-y-auto">
            <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                  <Sparkles size={14} aria-hidden="true" />
                  Personal insights
                </div>
                <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
                  Reports made for your real life
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Go beyond a general reading with focused insights into your relationships,
                  finances, and personal journey.
                </p>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {reports.map((report) => (
                  <article
                    key={report.title}
                    className="group overflow-hidden rounded-3xl border border-border bg-card/85 shadow-xl shadow-primary/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={report.image}
                        alt={report.imageAlt}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-background/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-md">
                        {report.label}
                      </span>
                      <h2 className="absolute inset-x-5 bottom-5 font-display text-3xl text-white">
                        {report.title}
                      </h2>
                    </div>

                    <div className="p-6">
                      <p className="min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
                        {report.description}
                      </p>
                      <ul className="mt-5 space-y-2.5" aria-label={`${report.title} includes`}>
                        {report.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-center gap-2.5 text-sm text-foreground"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => setSelectedReport(report)}
                        className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Get Report
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <Dialog
        open={selectedReport !== null}
        onOpenChange={(open) => {
          if (!open && !isGenerating) {
            setSelectedReport(null);
            setGenerationError("");
          }
        }}
      >
        <DialogContent className="max-h-[92dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-3xl border-border bg-card p-0">
          {selectedReport && (
            <>
              <div className="relative h-44 overflow-hidden sm:h-56">
                <img
                  src={selectedReport.image}
                  alt={selectedReport.imageAlt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-6 rounded-full border border-white/30 bg-background/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-md">
                  {selectedReport.label}
                </span>
              </div>

              <div className="space-y-8 p-6 sm:p-8">
                <DialogHeader className="text-left">
                  <DialogTitle className="font-display text-3xl font-medium text-foreground sm:text-4xl">
                    {selectedReport.title}
                  </DialogTitle>
                  <DialogDescription className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {selectedReport.description}
                  </DialogDescription>
                </DialogHeader>

                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Inside your report
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {selectedReport.sections.map((section, index) => (
                      <article
                        key={section.title}
                        className="flex gap-3 rounded-2xl border border-border bg-background/55 p-4 text-left"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                            {section.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6">
                  <h3 className="font-display text-xl text-foreground">Every Report Includes</h3>
                  <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {everyReportIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                        <Check
                          size={17}
                          className="mt-0.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {generationError && (
                  <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {generationError}
                  </p>
                )}

                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => void handleGenerateReport()}
                  className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <LoaderCircle size={18} className="mr-2 animate-spin" aria-hidden="true" />
                      Creating your report...
                    </>
                  ) : (
                    "Get Report - 10 Credits"
                  )}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <PricingDialog
        open={isPricingOpen}
        onOpenChange={setIsPricingOpen}
        hideTrigger
      />

      {isGenerating && <ReportGenerationLoader userName={userName} />}
    </main>
  );
}

function ReportGenerationLoader({ userName }: { userName: string }) {
  const steps = [
    `Checking ${userName}'s saved birth details...`,
    "Reading your verified astrology chart...",
    "Reviewing today's planetary context...",
    "Mapping your strongest life patterns...",
    "Writing eight personalized report sections...",
    "Preparing your downloadable report...",
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStep((current) => Math.min(current + 1, steps.length - 1));
    }, 2_200);
    return () => window.clearInterval(interval);
  }, [steps.length]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 px-5 backdrop-blur-xl"
      role="status"
      aria-live="polite"
      aria-label={steps[step]}
    >
      <div className="w-full max-w-md rounded-[2rem] border border-primary/15 bg-card/95 p-7 text-center shadow-2xl shadow-primary/15 sm:p-10">
        <div className="relative mx-auto h-32 w-32">
          <div className="absolute inset-0 rounded-full border border-primary/15" />
          <div className="absolute inset-3 animate-[spin_8s_linear_infinite] rounded-full border border-dashed border-primary/35" />
          <div className="absolute inset-7 animate-[spin_5s_linear_infinite_reverse] rounded-full border-2 border-transparent border-r-primary border-t-primary/40" />
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[color:var(--gold)] shadow-[0_0_18px_var(--color-gold)]" />
          <span className="absolute bottom-3 left-3 h-2.5 w-2.5 rounded-full bg-[color:var(--sage)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={30} className="animate-pulse text-primary" aria-hidden="true" />
          </div>
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Creating your report
        </p>
        <h2 className="mt-3 min-h-[3.5rem] font-display text-2xl leading-snug text-foreground">
          {steps[step]}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Vaanii is turning your saved chart data into a clear, practical reading.
        </p>

        <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
          {steps.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index <= step ? "w-5 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SidebarLink({
  to,
  label,
  icon,
  active = false,
  onNavigate,
}: {
  to: "/dashboard" | "/my-chart" | "/reports";
  label: string;
  icon: ReactNode;
  active?: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
