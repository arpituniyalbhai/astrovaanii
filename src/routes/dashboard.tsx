import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { auth, onUserDoc, getUserDoc } from "@/lib/firebase";
import { getChart } from "@/lib/chart-server";
import vaaniiPersona from "@/assets/vaanii-persona.jpg";
import brandIcon from "@/assets/startalks-icon.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AstroVaanii" },
      { name: "description", content: "Your personal AI astrologer dashboard. Get personalized readings and insights." },
    ],
  }),
  component: DashboardPage,
});

const suggestedQuestions = [
  "What is my today's horoscope?",
  "When will I get a job?",
  "What are my lucky numbers today?",
  "How is my love life this month?",
  "What does my birth chart say about my career?",
  "When will I find my soulmate?",
];

function DashboardPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState(() => {
    if (typeof window !== "undefined") {
      const local = JSON.parse(localStorage.getItem('userData') || '{}');
      return local.name || "User";
    }
    return "User";
  });
  const [questionsRemaining, setQuestionsRemaining] = useState(0);
  const [todayDate, setTodayDate] = useState("");
  const [userEmail, setUserEmail] = useState(() => {
    if (typeof window !== "undefined") {
      const local = JSON.parse(localStorage.getItem('userData') || '{}');
      return local.email || "";
    }
    return "";
  });

  useEffect(() => {
    // Get today's date in formatted string
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    setTodayDate(today.toLocaleDateString('en-IN', options));

    // Check if popup was shown today
    const lastPopupDate = localStorage.getItem('lastDailyPopupDate');
    const todayStr = today.toDateString();

    if (lastPopupDate !== todayStr) {
      setShowWelcomePopup(true);
    }
  }, []);

  const handlePopupClose = () => {
    setShowWelcomePopup(false);
    localStorage.setItem('lastDailyPopupDate', new Date().toDateString());
  };

  const handleDailyPredictionClick = () => {
    handlePopupClose();
    navigate({ to: "/chat", search: { question: "Hey vaani tell my today predictions" } });
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('userData') || '{}');
    const email = auth.currentUser?.email || local.email;
    if (email) {
      setUserEmail(email);
      const unsub = onUserDoc(email, (data) => {
        if (data) {
          setUserName((data.name as string) || "User");
          setQuestionsRemaining((data.questionsRemaining as number) ?? 0);
        }
      });
      // If localStorage has no chart data but Firestore has birth data, recalculate
      if (!local.chart && local.latitude == null) {
        getUserDoc(email).then((doc: any) => {
          if (doc?.dob && doc?.timeOfBirth && doc.latitude != null && doc.longitude != null) {
            const stored: any = { ...local, ...doc };
            const [y, m, d] = doc.dob.split("-").map(Number);
            const [h, min] = doc.timeOfBirth.split(":").map(Number);
            getChart({ data: {
              year: y, month: m, day: d,
              hour: h || 12, minute: min || 0,
              latitude: doc.latitude,
              longitude: doc.longitude,
              timezoneOffset: doc.timezoneOffset,
            }}).then((result: any) => {
              if (result.success) {
                stored.chart = result.chart;
                localStorage.setItem("userData", JSON.stringify(stored));
              }
            });
          }
        });
      }
      return unsub;
    }
    if (local.name) setUserName(local.name);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    navigate({ to: "/chat", search: { question: inputValue } });
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24" />
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40" />

      <div className="relative z-10 flex h-screen">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            <button
              onClick={() => {
                setActiveTab("chat");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "chat"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Chat
            </button>
            <button
              onClick={() => {
                navigate({ to: "/pricing" });
                setIsSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Pricing
            </button>
            <button
              onClick={() => {
                navigate({ to: "/my-chart" });
                setIsSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 12h18M12 3v18M12 12l-4 4M12 12l4 4M12 12l-4-4M12 12l4-4" />
              </svg>
              My Chart
            </button>
            <button
              onClick={() => {
                setActiveTab("more");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "more"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
              More
            </button>
          </nav>
          <div className="px-4 py-4 border-t border-border">
            <button
              onClick={() => {
                navigate({ to: "/" });
                setIsSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </div>
        </aside>

        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/60 backdrop-blur-md">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
            <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
          </div>

          {/* Profile section */}
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-background/50">
              <div className="relative">
                <img
                  src={vaaniiPersona}
                  alt="Vaanii"
                  className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-[color:var(--sage)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{userName}</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            <button
              onClick={() => setActiveTab("chat")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "chat"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Chat
            </button>
            <button
              onClick={() => navigate({ to: "/pricing" })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Pricing
            </button>
            <button
              onClick={() => navigate({ to: "/my-chart" })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 12h18M12 3v18M12 12l-4 4M12 12l4 4M12 12l-4-4M12 12l4-4" />
              </svg>
              My Chart
            </button>
            <button
              onClick={() => setActiveTab("more")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "more"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
              More
            </button>
          </nav>

          {/* User profile */}
          <div className="px-4 py-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-background/50">
              <div className="relative">
                <img
                  src={vaaniiPersona}
                  alt="Vaanii"
                  className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-[color:var(--sage)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">Vaanii AI</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Daily prediction notification */}
        {showWelcomePopup && (
          <div className="fixed top-20 right-4 z-50 w-80">
            <div className="relative rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
              <button
                onClick={handlePopupClose}
                aria-label="Close"
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground hover:text-foreground z-10"
              >
                ×
              </button>
              <div className="flex items-start gap-3 p-4">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 -m-1 rounded-full bg-primary/25 blur-md" />
                  <img
                    src={vaaniiPersona}
                    alt="Vaanii, AI astrologer"
                    className="relative h-12 w-12 rounded-full border-2 border-background object-cover shadow-lg"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-[color:var(--sage)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1">Vaanii AI</div>
                  <div className="font-display text-base text-foreground mb-1"></div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    Hey {userName}! Your <span className="font-medium text-primary">{todayDate}</span> prediction are ready.
                  </p>
                  <button
                    onClick={handleDailyPredictionClick}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Click here to see your today prediction
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coming soon popup */}
        {showComingSoonPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="relative w-80 rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
              <button
                onClick={() => setShowComingSoonPopup(false)}
                aria-label="Close"
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground hover:text-foreground z-10"
              >
                ×
              </button>
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="text-4xl">📅</div>
                <div className="text-[10px] uppercase tracking-widest text-primary">Coming Soon</div>
                <h3 className="font-display text-xl text-foreground">Calendar Feature</h3>
                <p className="text-sm text-muted-foreground">
                  Track important astrological dates, transits, and events. Stay tuned for this exciting feature!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Settings popup */}
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
              <button
                onClick={() => setShowSettings(false)}
                aria-label="Close"
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground hover:text-foreground z-10"
              >
                ×
              </button>
              <div className="p-6">
                <h3 className="font-display text-2xl text-foreground mb-6">Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-border bg-background/50">
                    <div className="text-sm text-muted-foreground mb-1">Name</div>
                    <div className="font-medium text-foreground">{userName}</div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background/50">
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <div className="font-medium text-foreground">{userEmail}</div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background/50">
                    <div className="text-sm text-muted-foreground mb-1">Questions Remaining</div>
                    <div className="font-medium text-primary text-xl">{questionsRemaining}</div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background/50">
                    <div className="text-sm text-muted-foreground mb-1">Current Plan</div>
                    <div className="font-medium text-foreground">Free Plan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/40 backdrop-blur-md">
            <div className="flex items-center gap-3 md:hidden">
              <button onClick={() => setIsSidebarOpen(true)} className="text-muted-foreground hover:text-foreground">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
              <img src={brandIcon} alt="" width={28} height={28} className="h-7 w-7" />
              <span className="font-display text-base">Astro<span className="text-primary">Vaanii</span></span>
            </div>
            <h1 className="hidden md:block font-display text-xl text-foreground">
              {activeTab === "chat" ? "Chat with Vaanii" : "More Options"}
            </h1>
            <button
              onClick={() => navigate({ to: "/" })}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </header>

          {/* Content area */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
            {activeTab === "chat" && (
              <div className="w-full max-w-2xl">
                {/* Welcome message */}
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 -m-2 rounded-full bg-primary/25 blur-xl" />
                    <img
                      src={vaaniiPersona}
                      alt="Vaanii, AI astrologer"
                      className="relative h-20 w-20 rounded-full border-4 border-background object-cover shadow-2xl"
                    />
                  </div>
                  <h2 className="font-display text-3xl text-primary mb-2">Welcome {userName} - Ask Your Question</h2>
                </div>

                {/* Input area */}
                <div className="relative">
                  <div className="mb-2 flex justify-center">
                    <div className="rounded-full bg-red-50 border border-red-200 px-4 py-2">
                      <span className="text-sm font-medium text-red-500">{questionsRemaining} question{questionsRemaining !== 1 ? 's' : ''} remaining</span>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Vaanii anything..."
                      className="w-full rounded-2xl border border-border bg-card/80 px-6 py-4 pr-24 text-base outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all shadow-lg shadow-primary/20"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Send
                    </button>
                  </div>
                </div>

                {/* Suggested questions */}
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-3 text-center">Try asking:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(question)}
                        className="rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-muted-foreground hover:bg-card hover:border-primary/40 hover:text-foreground transition-all"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "more" && (
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl text-primary mb-2">More Options</h2>
                  <p className="text-muted-foreground">Additional features and settings</p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate({ to: "/my-chart" })}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/80 hover:bg-card transition-all"
                  >
                    <span className="text-2xl">📊</span>
                    <div className="text-left flex-1">
                      <div className="font-medium text-foreground">View Birth Chart</div>
                      <div className="text-sm text-muted-foreground">See your detailed astrological chart</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setShowComingSoonPopup(true)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/80 hover:bg-card transition-all"
                  >
                    <span className="text-2xl">📅</span>
                    <div className="text-left flex-1">
                      <div className="font-medium text-foreground">Calendar</div>
                      <div className="text-sm text-muted-foreground">View important astrological dates</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setShowSettings(true)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/80 hover:bg-card transition-all"
                  >
                    <span className="text-2xl">⚙️</span>
                    <div className="text-left flex-1">
                      <div className="font-medium text-foreground">Settings</div>
                      <div className="text-sm text-muted-foreground">Account and app settings</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  <button
                    onClick={() => window.location.href = "mailto:hi@astrovaanii.in"}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/80 hover:bg-card transition-all"
                  >
                    <span className="text-2xl">❓</span>
                    <div className="text-left flex-1">
                      <div className="font-medium text-foreground">Help & Support</div>
                      <div className="text-sm text-muted-foreground">hi@astrovaanii.in</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
