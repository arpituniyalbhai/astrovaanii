import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/landing/Reveal";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import vaaniiPersona from "@/assets/vaanii-persona.jpg";
import chatPreview from "@/assets/chat-preview.jpg";
import { VaaniiLoadingAnimation } from "@/components/VaaniiLoadingAnimation";

const faqs = [
  { q: "What is an AI Astrologer?", a: "An AI Astrologer is a software system that generates astrological readings using algorithms, chart calculations, and symbolic interpretation to provide insights based on your birth data and current planetary positions." },
  { q: "How does an AI Astrologer generate readings?", a: "It computes your natal chart from your birth date, time, and place, then analyzes planetary transits, aspects, and house placements to craft personalized interpretations and insights." },
  { q: "Can I trust the accuracy of AI-generated astrology?", a: "It's as accurate as the data and methods used. AI provides consistent, systematic interpretations but should be viewed as guidance, not guaranteed outcomes." },
  { q: "What data do you collect and how is it used?", a: "We collect your birth date, time, and place to generate your Janam Kundli and provide personalized readings. Your data is encrypted end-to-end and used solely for astrological calculations. We never sell or share your personal information." },
  { q: "Is my birth information stored or shared?", a: "Yes, we store your birth details in your account so you can access your chart and revisit readings anytime. Your data is encrypted end-to-end in our secure database. You can delete your data and account at any time through your settings." },
  { q: "Can AI astrologers provide personalized daily horoscopes?", a: "Yes. They can generate daily, weekly, or monthly readings tailored to your natal chart and current transits." },
  { q: "What kinds of readings can AI provide?", a: "Natal chart interpretations, transit analyses, predictive timelines, compatibility readings, career/finance/personality insights, and visualization of planetary cycles." },
  { q: "How is AI astrology different from human astrologers?", a: "AI offers fast, data-driven interpretations with consistent methodology. Human astrologers bring intuition, nuanced symbolism, and experiential insight that complements AI." },
  { q: "Are AI readings scientifically validated?", a: "Astrology is a belief system and symbolic framework, not a science. AI provides interpretive readings based on zodiac symbolism and chart mechanics, not empirical science." },
  { q: "Can AI astrology handle birth time unknowns?", a: "Yes. It can work with unknown or uncertain birth times by using sunrise or noon as a default, or by offering chart rectification options (where available) and discussing potential variations." },
  { q: "How should I use AI astrology readings for decision-making?", a: "Use readings as reflective prompts, not as absolute predictions. Combine with your own judgment, expert advice, and practical planning." },
  { q: "Is the service available in multiple languages?", a: "Yes, AstroVaanii natively supports 9 Indian languages: Hindi, English, Tamil, Telugu, Marathi, Gujarati, Bengali, Kannada, and Malayalam. You can switch languages during your chat session." },
  { q: "Can AI astrology assess compatibility with someone else?", a: "Yes, AstroVaanii can analyze compatibility between two birth charts using synastry and matching techniques. Simply provide both birth details and we'll highlight strengths, challenges, and karmic connections." },
  { q: "What if I encounter a mismatch or confusing reading?", a: "If a reading seems off, double-check your birth details for accuracy and try asking Vaanii for clarification in different words. Your chart-aware conversation means you can ask follow-up questions naturally without restarting." },
  { q: "How do I get started and what will I need?", a: "Just enter your name, birth date, time, and birthplace on this page. No account needed to start your first free reading. Click 'Start Chat with Vaanii' and ask anything about your career, relationships, health, or life path." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Astrologer - Free Vedic AI Astrology Chat",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  url: "https://astrovaanii.in/ai-astrologer",
  description: "Chat with Vaanii, your personal AI Vedic astrologer trained on classical Parashara texts. Get instant birth chart readings in 9 Indian languages. Free to start, no appointment needed.",
  datePublished: "2025-01-01",
  dateModified: "2026-07-26",
  inLanguage: ["hi", "ta", "te", "ml", "kn", "gu", "mr", "bn", "en"],
  featureList: ["Natal chart reading", "Dasha analysis", "Compatibility", "Daily predictions", "Career guidance", "Marriage predictions", "Health insights", "Remedies for doshas"],
  audience: { "@type": "Audience", "audienceType": "Adults interested in Vedic astrology" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://astrovaanii.in" },
    { "@type": "ListItem", position: 2, name: "AI Astrologer", item: "https://astrovaanii.in/ai-astrologer" },
  ],
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Vaanii AI Astrologer",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  url: "https://astrovaanii.in/ai-astrologer",
  description: "Chat with Vaanii, your free AI astrologer trained on classical Vedic astrology.",
};

export const Route = createFileRoute("/ai-astrologer")({
  head: () => ({
    meta: [
      { title: "AI Astrologer Online - Free Astrology Chat - AstroVaanii" },
      {
        name: "description",
        content:
          "Meet Vaanii, an AI astrologer trained on classical Vedic astrology (Parashara & Jaimini). Instant predictions in 9 Indian languages. Free to start.",
      },
      { property: "og:title", content: "AI Astrologer Online - Free Astrology Chat - AstroVaanii" },
      {
        property: "og:description",
        content:
          "Meet Vaanii, an AI astrologer trained on classical Vedic astrology. Instant predictions in 9 Indian languages. Free to start.",
      },
      { property: "og:url", content: "https://astrovaanii.in/ai-astrologer" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/social-sharing.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/ai-astrologer" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(toolJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(softwareAppJsonLd) },
    ],
  }),
  component: AiAstrologerPage,
});

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const FREE_CHAT_USED_KEY = "vaanii_free_chat_used";

function AiAstrologerPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "chat" | "loading">("form");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [timezoneOffset, setTimezoneOffset] = useState<number | undefined>();
  const [gender, setGender] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUsedFreeChat, setHasUsedFreeChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isSendingRef = useRef(false);
  const currentQuestionRef = useRef("");
  const typingStartRef = useRef(0);
  const MIN_LOADING_MS = 3000;

  useEffect(() => {
    const freeChatUsed = localStorage.getItem(FREE_CHAT_USED_KEY) === 'true';
    setHasUsedFreeChat(freeChatUsed);
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: 'instant' });
  }, [messages, isTyping]);

  const setMinLoading = (show: boolean) => {
    if (show) {
      typingStartRef.current = Date.now();
      setIsTyping(true);
    } else {
      const elapsed = Date.now() - typingStartRef.current;
      const remaining = MIN_LOADING_MS - elapsed;
      if (remaining > 0) {
        setTimeout(() => setIsTyping(false), remaining);
      } else {
        setIsTyping(false);
      }
    }
  };

  function stripMarkdown(text: string): string {
    return text
      .replace(/#{1,6}\s/g, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`{1,3}[^`]*`{1,3}/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/>\s/g, "")
      .replace(/^\s*[-*+]\s/gm, "  - ")
      .replace(/^\s*\d+\.\s/gm, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  const streamToVaanii = async (
    content: string,
    history: Message[],
    onToken: (full: string) => void
  ): Promise<void> => {
    const local = JSON.parse(localStorage.getItem("userData") || "{}");
    const chatMessages: { role: "user" | "assistant"; content: string }[] = [
      ...history.slice(-10).map((m) => ({
        role: (m.type === "user" ? "user" : "assistant") as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content },
    ];
    const userDetails: Record<string, unknown> = {};
    if (local.dob) userDetails.dob = local.dob;
    if (local.timeOfBirth) userDetails.timeOfBirth = local.timeOfBirth;
    if (local.location) userDetails.location = local.location;
    if (local.gender) userDetails.gender = local.gender;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: chatMessages,
        chart: local.chart || undefined,
        userName: name,
        userDetails: Object.keys(userDetails).length ? userDetails : undefined,
      }),
    });

    if (!res.ok) {
      throw new Error(`Stream error ${res.status}`);
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let full = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const parts = buffer.split("\n\n");
      buffer = parts.pop() || "";

      for (const part of parts) {
        const lines = part.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const token = json.choices?.[0]?.delta?.content;
            if (token) {
              full += token;
              onToken(full);
            }
          } catch {}
        }
      }
    }
  };

  const fetchLocationSuggestions = async (query: string) => {
    if (!query.trim()) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=e6856ce2163d420dbae7d5adb0a104ec&limit=5`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setLocationSuggestions(data.results);
        setShowSuggestions(true);
      } else {
        setLocationSuggestions([]);
        setShowSuggestions(false);
      }
    } catch {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchLocationSuggestions(location), 300);
    return () => clearTimeout(timer);
  }, [location]);

  const selectSuggestion = (s: any) => {
    setLocation(s.formatted);
    setLatitude(s.geometry.lat);
    setLongitude(s.geometry.lng);
    const tz = s.annotations?.timezone?.offset_sec;
    setTimezoneOffset(tz != null ? tz / 3600 : undefined);
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };

  const handleLocationBlur = async () => {
    setTimeout(() => setShowSuggestions(false), 200);
    if (location && latitude === null) {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=e6856ce2163d420dbae7d5adb0a104ec&limit=1`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          const tz = data.results[0].annotations?.timezone?.offset_sec;
          setLatitude(lat);
          setLongitude(lng);
          setTimezoneOffset(tz != null ? tz / 3600 : undefined);
        }
      } catch {}
    }
  };

  const handleStartChat = async () => {
    if (!name || !dob || !time || !location || !gender) {
      setError("Please fill in all fields.");
      return;
    }
    if (latitude === null || longitude === null) {
      setError("Please select a valid location from the suggestions.");
      return;
    }
    setError("");
    setStep("loading");

    // Save user data to localStorage
    const userData = {
      name,
      dob,
      timeOfBirth: time,
      location,
      gender,
      latitude,
      longitude,
      timezoneOffset,
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Simulate loading then show chat
    setTimeout(() => {
      setStep("chat");
      // Send initial greeting
      const initialMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: `Namaste ${name}! I'm Vaanii, your personal AI astrologer. I've analyzed your birth chart. Ask me anything about your career, marriage, health, or any other aspect of your life.`,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isSendingRef.current) return;

    // Check if free user has already used their free chat
    if (hasUsedFreeChat) {
      navigate({ to: "/signup" });
      return;
    }

    isSendingRef.current = true;

    // Mark free chat as used
    localStorage.setItem(FREE_CHAT_USED_KEY, 'true');
    setHasUsedFreeChat(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    currentQuestionRef.current = inputValue;
    setInputValue("");

    const currentHistory = messages;
    const botIdRef = { current: null as string | null };

    setMinLoading(true);
    streamToVaanii(userMessage.content, currentHistory, (full) => {
      if (!botIdRef.current) {
        botIdRef.current = (Date.now() + 1).toString();
        setMinLoading(false);
        setMessages((prev) => [
          ...prev,
          { id: botIdRef.current!, type: "bot", content: stripMarkdown(full), timestamp: new Date() },
        ]);
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.id === botIdRef.current ? { ...m, content: stripMarkdown(full) } : m))
        );
      }
    })
      .then(() => {
        isSendingRef.current = false;
      })
      .catch((err) => {
        console.error("Chat error:", err);
        setMinLoading(false);
        isSendingRef.current = false;
        const errorMsg = `I'm sorry, ${name}. I'm having trouble connecting right now. Please try again.`;
        if (botIdRef.current) {
          setMessages((prev) =>
            prev.map((m) => m.id === botIdRef.current ? { ...m, content: errorMsg } : m)
          );
        } else {
          setMessages((prev) => [
            ...prev,
            { id: (Date.now() + 1).toString(), type: "bot", content: errorMsg, timestamp: new Date() },
          ]);
        }
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <main className="relative min-h-screen bg-background grain">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24" />
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40" />

      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2" aria-label="AstroVaanii Home">
          <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
        </a>
        <a href="/signup" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Try Free AI - Astrologer</a>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <Reveal>
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              AI Astrologer<br />
              <span className="text-primary">Chat with Vaanii</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Your Personal Vedic AI Astrologer Available 24/7
            </p>
          </div>
        </Reveal>

        {step === "form" && (
          <Reveal delay={100}>
            <div className="mt-10 rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-8 max-w-lg mx-auto">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Time of Birth</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Birthplace</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setLatitude(null);
                      setLongitude(null);
                      setTimezoneOffset(undefined);
                    }}
                    onFocus={() => location && setShowSuggestions(true)}
                    onBlur={handleLocationBlur}
                    placeholder="Enter your city or place of birth"
                    className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                  {showSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-border bg-card shadow-xl max-h-60 overflow-y-auto z-20">
                      {locationSuggestions.map((s, i) => (
                        <button
                          key={i}
                          onMouseDown={() => selectSuggestion(s)}
                          className="w-full px-4 py-3 text-left text-sm hover:bg-background/50 transition-colors border-b border-border last:border-b-0"
                        >
                          <div className="font-medium text-foreground">{s.formatted}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {s.geometry.lat.toFixed(4)}°, {s.geometry.lng.toFixed(4)}°
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Gender</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`rounded-full border px-4 py-3 text-sm font-medium transition-colors ${
                          gender === g
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border bg-background/70 hover:bg-card hover:border-primary/60"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  onClick={handleStartChat}
                  className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
                >
                  Start Chat with Vaanii
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
            <p className="mt-6 text-muted-foreground">Preparing your personalized AI astrologer...</p>
          </div>
        )}

        {step === "chat" && (
          <div className="mt-10 rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
              <img
                src={vaaniiPersona}
                alt="Vaanii AI Vedic Astrologer"
                className="h-10 w-10 rounded-full object-cover ring-1 ring-[color:var(--gold)]/50"
              />
              <div>
                <div className="font-display text-base">Vaanii</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--sage)]" /> Online
                </div>
              </div>
            </div>

            <div ref={messagesContainerRef} className="h-[400px] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "items-end justify-end" : "items-start justify-start"}`}
                >
                  {message.type === "bot" && (
                    <img
                      src={vaaniiPersona}
                      alt="Vaanii AI Vedic Astrologer"
                      loading="lazy"
                      className="h-8 w-8 rounded-full object-cover border border-border shrink-0 self-start"
                    />
                  )}
                  <div
                    className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm self-start ${
                      message.type === "bot"
                        ? "rounded-tl-sm bg-background/70 text-foreground"
                        : "rounded-tr-sm bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-start">
                  <img
                    src={vaaniiPersona}
                    alt="Vaanii AI Vedic Astrologer"
                    loading="lazy"
                    className="h-8 w-8 rounded-full object-cover border border-border shrink-0 self-start"
                  />
                  <div className="rounded-2xl rounded-tl-sm bg-background/70 px-4 py-2 text-sm text-muted-foreground self-start min-w-[240px]">
                    <VaaniiLoadingAnimation
                      userName={name}
                      userQuestion={currentQuestionRef.current}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-6 py-4 border-t border-border">
              {hasUsedFreeChat ? (
                <div className="rounded-2xl border border-border bg-card/80 p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    You've used your free chat. To continue getting personalized Vedic readings, please sign up.
                  </p>
                  <Link
                    to="/signup"
                    className="inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Sign Up Free
                  </Link>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Vaanii anything..."
                    className="flex-1 rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              What Questions Can I Ask an <span className="text-primary">AI Vedic Astrologer?</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Get personalized answers to all your Vedic astrology questions
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "💼", title: "Career Guidance", desc: "Timing for job changes, promotions, business decisions" },
            { icon: "💑", title: "Marriage & Love", desc: "Compatibility, timing, relationship insights" },
            { icon: "💰", title: "Wealth & Finance", desc: "Investment timing, financial prospects" },
            { icon: "🏥", title: "Health & Wellness", desc: "Health periods, remedies for ailments" },
            { icon: "📚", title: "Education & Skills", desc: "Learning periods, career direction" },
            { icon: "🙏", title: "Spiritual Growth", desc: "Remedies, mantras, spiritual guidance" },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Why Choose an <span className="text-primary">AI Vedic Astrologer?</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Available 24/7, no appointments needed",
                  "Trained on classical Parashara & Jaimini texts",
                  "Speaks 9 Indian languages natively",
                  "Consistent interpretations every time",
                  "Chart-aware conversations with context",
                  "Weekly audits by practising Jyotishis",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={120}>
              <div className="relative">
                <div className="absolute inset-0 rotate-2 rounded-3xl bg-[color:var(--accent)] shadow-xl" />
                <img
                  src={chatPreview}
                  alt="Chat with Vaanii AI Astrologer"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="relative h-full w-full rounded-3xl object-cover shadow-2xl"
                />
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      <SeoContent />

      <footer className="border-t border-border bg-card/40 py-12 mt-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <img src={brandIcon} alt="" width={24} height={24} className="h-6 w-6" />
            <span className="font-display text-lg">AstroVaanii</span>
          </div>
          <p>&copy; {new Date().getFullYear()} AstroVaanii. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

const seoContent: ({
  title: string;
  content: string | React.ReactNode;
})[] = [
  {
    title: "AI Astrologer: The Union of Ancient Cosmic Wisdom and Precision Technology",
    content: <>For thousands of years, seeking clarity through the stars meant finding a trusted Jyotishi, sitting down with a hand-drawn birth chart, and waiting for an intuitive interpretation of planetary movements. Astrology has always been equal parts astronomical mathematics and deep human empathy. Today, we stand at a fascinating convergence. An AI Astrologer brings the incredible speed and precision of modern computing to the sacred art of Vedic astrology (Jyotish). Rather than replacing the soul of traditional wisdom, true AI astrology serves as a bridge, giving you immediate, personal access to your own <Link to="/free-kundli" className="text-primary underline underline-offset-4 hover:opacity-80">Janam Kundli</Link> 24 hours a day. If you have ever asked yourself how a computer can understand your karmic path, or how modern tools interpret planetary transits in real time, this guide breaks down everything you need to know about AI astrology.</>,
  },
  {
    title: "What is an AI Astrologer?",
    content: "An AI Astrologer is an intelligent conversational platform powered by advanced astronomical calculation engines and trained on classical astrological principles. Unlike traditional horoscope columns that group millions of people into twelve broad zodiac signs, a genuine AI Astrologer calculates your exact personal birth chart (Janam Kundli) using your precise date, time, and latitude/longitude of birth. At its core, an AI Astrologer operates on two distinct layers: The Math Engine runs exact planetary tracking algorithms to map out the positions of the nine Grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu), twelve houses (Bhavas), 27 Nakshatras (lunar mansions), and active Dasha periods. The Interpretation Engine translates complex mathematical chart combinations (Yogas, Doshas, and Transits) into clear, actionable advice in plain language. It behaves like a personal cosmic counselor that never sleeps, remembers your entire chart history, and offers objective, judgment-free guidance whenever life brings uncertainty.",
  },
  {
    title: "How an AI Astrologer Actually Works",
    content: "Many people assume an AI astrologer simply searches the internet for daily horoscopes and rewrites them. That is a misconception. A dedicated AI astrology system operates through a structured, multi-step astronomical and algorithmic process: First, Ayanamsa Calculation converts tropical positions to sidereal using Lahiri Ayanamsa. Second, House Division (Bhava) establishes Lagna (Ascendant) and house cusps based on geographical coordinates. Third, Nakshatra Mapping pinpoints exact lunar degree (0° to 360°). Fourth, Dasha Timeline computes Vimshottari Mahadasha/Antardasha planetary cycles. Fifth, Context Interpretation cross-references active transits (Gochara) against natal house placements. The moment you share your birth details, the platform connects to astronomical database tools, such as the Swiss Ephemeris engine, using the Lahiri Ayanamsa (sidereal zodiac standard). It calculates planetary coordinates down to the exact arc-second.",
  },
  {
    title: "Natal Chart Mapping & Dasha Computation",
    content: "Once planetary coordinates are established, the engine maps out: Lagna (Ascendant) - The exact zodiac sign rising on the eastern horizon at your birth moment. House Placements (Bhavas) - Where each planet resides and which life domains (career, relationships, health, finances) they govern. Nakshatras & Padas - The specific star cluster governing your Moon and other planets. Vimshottari Dasha System - The cosmic timeline that dictates when specific life events, growth periods, or challenges will unfold. The stars do not stand still. An AI Astrologer overlays your birth chart with current planetary positions in real time. When Saturn transits your 8th house or Jupiter aspects your 10th house of career, the engine detects these active windows instantly. Raw astrological data is synthesized into conversational, warm, and understandable insight.",
  },
  {
    title: "Why Generic AI Chatbots Fail at Astrology",
    content: <>If you ask a standard, off-the-shelf AI chatbot (like standard ChatGPT or generic language models) to read your Kundli, you will often receive inaccurate or made-up information. Generic LLMs are word prediction engines; they do not perform complex planetary mathematics natively. When prompted with a birth time, a generic model might guess planetary positions based on general text patterns across the web, frequently mixing up Western Tropical astrology with Indian Sidereal Vedic astrology. For a comprehensive comparison of different AI astrology platforms available in India, check out our article on the <Link to="/blogs/top-5-ai-astrology-platform-in-india" className="text-primary underline underline-offset-4 hover:opacity-80">top 5 AI astrology platforms in India</Link>. A true AI Astrologer uses a hybrid architecture: It relies on hard, deterministic code for all planetary physics and chart construction. It uses language models purely as an expressive narrative interface to communicate those precise mathematical outputs to you.</>,
  },
  {
    title: "How Astrovaanii Is Different From Other AI Astrologers",
    content: <>Not all digital astrology tools are built with the same level of depth. Astrovaanii was created specifically to bridge the gap between classical Jyotish tradition and modern technological convenience. Astrovaanii does not rely on simplified astrology rules. Its interpretation system is built around classical Vedic texts—including Brihat Parashara Hora Shastra and Jaimini Sutras. It evaluates planetary strengths (Shadbala), house lords, aspect relationships (Drishti), yogas (wealth and success combinations), and active doshas before forming a conclusion. Your <Link to="/blogs/what-is-lagna-in-astrology" className="text-primary underline underline-offset-4 hover:opacity-80">Lagna (Ascendant)</Link> forms the foundation of every reading—if you want to understand what Lagna means and why it matters, read our complete beginner's guide. While many tools present static, pre-written reports, Astrovaanii calculates planetary movements every single minute. When you ask, 'How is my day today?', Astrovaanii reads current planetary transits against your birth chart to highlight real windows of opportunity or caution.</>,
  },
  {
    title: "Continuous Chart-Aware Memory and Privacy",
    content: "In a traditional consultation, you can ask follow-up questions naturally. Astrovaanii brings that same flow to digital astrology. It retains your complete Kundli context throughout your conversation. You can ask about your career, shift to love life, and return to timing questions without having to re-enter your details or start over. Astrovaanii provides guidance natively across nine Indian languages (including Hindi, English, Tamil, Telugu, Marathi, Gujarati, Bengali, Kannada, and Malayalam). To preserve authenticity, Astrovaanii's guidance outputs are audited on a weekly basis by practicing Jyotishis. Your birth chart and chat history are deeply personal. Astrovaanii encrypts your data end to end, ensuring your personal details are never sold or shared.",
  },
];

function SeoContent() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-16">
      {seoContent.map((section, i) => (
        <Reveal key={section.title} delay={i * 80}>
          <div className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{section.title}</h2>
            {typeof section.content === 'string' ? (
              <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            )}
          </div>
        </Reveal>
      ))}

      <Reveal delay={seoContent.length * 80}>
        <div className="mt-16 rounded-3xl border border-border bg-card/80 backdrop-blur-md p-8">
          <h2 className="font-display text-2xl text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border/60 last:border-b-0 pb-6 last:pb-0">
                <h3 className="font-display text-lg text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={(seoContent.length + 1) * 80}>
        <div className="mt-16 rounded-3xl border border-border bg-card/80 backdrop-blur-md p-8 overflow-x-auto">
          <h2 className="font-display text-2xl text-primary mb-6">Comparison: Astrovaanii vs. Generic AI vs. Traditional Astrologers</h2>
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-display text-sm text-foreground">Feature / Aspect</th>
                <th className="text-left py-3 px-4 font-display text-sm text-foreground">Traditional Human Astrologer</th>
                <th className="text-left py-3 px-4 font-display text-sm text-foreground">Generic AI Chatbots</th>
                <th className="text-left py-3 px-4 font-display text-sm text-foreground">Astrovaanii AI Astrologer</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="py-3 px-4 text-sm text-muted-foreground">Calculation Accuracy</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">High (if using ephemeris software)</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">Low (frequently hallucinates degrees)</td>
                <td className="py-3 px-4 text-sm text-foreground font-medium">NASA-grade Astronomical Ephemeris</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-3 px-4 text-sm text-muted-foreground">Availability</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">Requires appointments / scheduling</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">24/7 online</td>
                <td className="py-3 px-4 text-sm text-foreground font-medium">24/7 instant response with zero wait time</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-3 px-4 text-sm text-muted-foreground">Vedic Principles</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">Deep expertise (varies by individual)</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">Superficial / mixes Western & Vedic</td>
                <td className="py-3 px-4 text-sm text-foreground font-medium">Classical Parashara & Jaimini logic</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-3 px-4 text-sm text-muted-foreground">Context Retention</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">High during session</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">Forgets past details quickly</td>
                <td className="py-3 px-4 text-sm text-foreground font-medium">Full chart-aware conversation memory</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-3 px-4 text-sm text-muted-foreground">Languages Supported</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">Typically 1 or 2 spoken languages</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">Basic translation output</td>
                <td className="py-3 px-4 text-sm text-foreground font-medium">9 Native Indian Languages</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-muted-foreground">Human Supervision</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">N/A (Is human)</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">None</td>
                <td className="py-3 px-4 text-sm text-foreground font-medium">Audited weekly by practicing Jyotishis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
