import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { auth, onUserDoc } from "@/lib/firebase";
import vaaniiPersona from "@/assets/vaanii-persona.jpg";
import brandIcon from "@/assets/startalks-icon.png";
import { VaaniiLoadingAnimation } from "@/components/VaaniiLoadingAnimation";

const chatSearchSchema = z.object({
  question: z.string().optional(),
});

export const Route = createFileRoute("/chat")({
  validateSearch: chatSearchSchema,
  head: () => ({
    meta: [
      { title: "Chat with Vaanii — AstroVaanii" },
      { name: "description", content: "Chat with your personal AI astrologer for personalized readings." },
    ],
  }),
  component: ChatPage,
});

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

const STORAGE_KEY = "vaanii_conversations";

function ChatPage() {
  const navigate = useNavigate();
  const { question: initialQuestion } = useSearch({ from: "/chat" });
  
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isSendingRef = useRef(false);
  const isFirstAnswerRef = useRef(true);
  const currentQuestionRef = useRef(initialQuestion);
  const typingStartRef = useRef(0);
  const MIN_LOADING_MS = 3000;

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
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const messagesRef = useRef<Message[]>([]);
  messagesRef.current = messages;
  
  const [userName, setUserName] = useState(() => {
    if (typeof window !== "undefined") {
      const local = JSON.parse(localStorage.getItem('userData') || '{}');
      return local.name || "User";
    }
    return "User";
  });
  const [questionsRemaining, setQuestionsRemaining] = useState(0);
  const userNameRef = useRef(userName);
  userNameRef.current = userName;

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('userData') || '{}');
    const email = auth.currentUser?.email || local.email;
    if (email) {
      const unsub = onUserDoc(email, (data) => {
        if (data) {
          setUserName((data.name as string) || "User");
          setQuestionsRemaining((data.questionsRemaining as number) ?? 0);
        }
      });
      return unsub;
    }
    if (local.name) setUserName(local.name);
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: 'instant' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Scroll to bottom when keyboard opens
  useEffect(() => {
    let initialHeight = window.innerHeight;
    
    const handleInputFocus = () => {
      // Immediate scroll
      scrollToBottom();
      
      // Then keep trying as keyboard animates
      let count = 0;
      const interval = setInterval(() => {
        scrollToBottom();
        count++;
        if (count > 10) clearInterval(interval);
      }, 100);
      
      setTimeout(() => clearInterval(interval), 1500);
    };

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      // If height decreased significantly, keyboard opened
      if (currentHeight < initialHeight * 0.85) {
        scrollToBottom();
      }
      initialHeight = currentHeight;
    };

    inputRef.current?.addEventListener('focus', handleInputFocus);
    window.addEventListener('resize', handleResize);
    
    return () => {
      inputRef.current?.removeEventListener('focus', handleInputFocus);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const saveConversations = (convs: Conversation[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(convs));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const convs: Conversation[] = JSON.parse(stored);
        setConversations(convs);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (messages.length === 0 || !activeConversationId) return;
    const title = messages[0].content.slice(0, 50) + (messages[0].content.length > 50 ? "..." : "");
    setConversations((prev) => {
      const exists = prev.find((c) => c.id === activeConversationId);
      let updated: Conversation[];
      if (exists) {
        updated = prev.map((c) =>
          c.id === activeConversationId ? { ...c, messages, title, updatedAt: Date.now() } : c
        );
      } else {
        updated = [...prev, { id: activeConversationId, title, messages, updatedAt: Date.now() }];
      }
      saveConversations(updated);
      return updated;
    });
  }, [messages, activeConversationId]);

  const startNewChat = () => {
    setMessages([]);
    setActiveConversationId(null);
    setIsSidebarOpen(false);
  };

  const switchConversation = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setMessages(conv.messages);
      setActiveConversationId(id);
    }
    setIsSidebarOpen(false);
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = conversations.filter((c) => c.id !== id);
    setConversations(updated);
    saveConversations(updated);
    if (activeConversationId === id) {
      setMessages([]);
      setActiveConversationId(null);
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

    const email = auth.currentUser?.email || JSON.parse(localStorage.getItem('userData') || '{}').email;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: chatMessages,
        chart: local.chart || undefined,
        userName: userNameRef.current,
        userDetails: Object.keys(userDetails).length ? userDetails : undefined,
        email,
      }),
    });

    if (res.status === 402) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error === "NO_CREDITS" ? "NO_CREDITS" : `Stream error ${res.status}`);
    }

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

  useEffect(() => {
    if (!initialQuestion) return;
    if (isSendingRef.current) return;
    isSendingRef.current = true;
    currentQuestionRef.current = initialQuestion;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: initialQuestion,
      timestamp: new Date(),
    };
    const convId = Date.now().toString();
    setActiveConversationId(convId);
    setMessages([userMessage]);

    setMinLoading(true);
    const botIdRef = { current: null as string | null };

    streamToVaanii(initialQuestion, [], (full) => {
      if (!botIdRef.current) {
        botIdRef.current = (Date.now() + 1).toString();
        setMinLoading(false);
        setMessages((prev) => [
          ...prev,
          { id: botIdRef.current!, type: "bot", content: stripMarkdown(full), timestamp: new Date() },
        ]);
      } else {
        setMessages((prev) =>
          prev.map((m) => m.id === botIdRef.current ? { ...m, content: stripMarkdown(full) } : m)
        );
      }
    }).then(() => {
      isSendingRef.current = false;
    }).catch((err) => {
      console.error("Chat error:", err);
      isSendingRef.current = false;
      setMinLoading(false);
      const name = userNameRef.current;
      if (err.message === "NO_CREDITS") return;
      const errorMsg = `Thank you for your question, ${name}! I'm analyzing your birth chart to provide you with an accurate reading. This may take a moment...`;
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
  }, [initialQuestion]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isSendingRef.current) return;
    if (questionsRemaining <= 0) return;
    isSendingRef.current = true;
    
    const convId = activeConversationId || Date.now().toString();
    if (!activeConversationId) {
      setActiveConversationId(convId);
    }
    
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
        const name = userNameRef.current;
        if (err.message === "NO_CREDITS") {
          return;
        }
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
    <main className="relative h-[100dvh] overflow-hidden bg-background grain">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24" />
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40" />

      <div className="relative z-10 flex h-[100dvh]">
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

            <button
              onClick={startNewChat}
              className="mx-4 mt-4 w-[calc(100%-32px)] flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Chat
            </button>

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {conversations.length === 0 && (
                <p className="text-xs text-muted-foreground px-3">No recent chats</p>
              )}
              {[...conversations]
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .slice(0, 20)
                .map((conv) => (
                  <div
                    key={conv.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      conv.id === activeConversationId
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    }`}
                  >
                    <button
                      onClick={() => switchConversation(conv.id)}
                      className="flex items-center gap-3 flex-1 text-left truncate"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span className="truncate">{conv.title}</span>
                    </button>
                    <button
                      onClick={(e) => deleteConversation(conv.id, e)}
                      className="shrink-0 text-muted-foreground hover:text-red-500 transition-colors"
                      aria-label="Delete conversation"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}
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
            <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
              <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
            </div>

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

            <button
              onClick={startNewChat}
              className="mx-4 mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Chat
            </button>

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {conversations.length === 0 && (
                <p className="text-xs text-muted-foreground px-3">No recent chats</p>
              )}
              {[...conversations]
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .slice(0, 20)
                .map((conv) => (
                  <div
                    key={conv.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      conv.id === activeConversationId
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    }`}
                  >
                    <button
                      onClick={() => switchConversation(conv.id)}
                      className="flex items-center gap-3 flex-1 text-left truncate"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span className="truncate">{conv.title}</span>
                    </button>
                    <button
                      onClick={(e) => deleteConversation(conv.id, e)}
                      className="shrink-0 text-muted-foreground hover:text-red-500 transition-colors"
                      aria-label="Delete conversation"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}
            </nav>
          </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Header */}
          <header className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border bg-card/40 backdrop-blur-md relative z-10">
            <div className="flex items-center gap-3 md:hidden">
              <button onClick={() => setIsSidebarOpen(true)} className="text-muted-foreground hover:text-foreground">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
              <img src={brandIcon} alt="" width={28} height={28} className="h-7 w-7" />
              <span className="font-display text-base">Astro<span className="text-primary">Vaanii</span></span>
            </div>
            <h1 className="hidden md:block font-display text-xl text-foreground">Chat with Vaanii</h1>
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Dashboard
            </button>
          </header>

          {/* Chat area */}
          <div className="flex-1 flex flex-col px-4 py-4 md:px-6 overflow-hidden min-h-0">
            {/* Credits remaining */}
            <div className="flex-shrink-0 mb-4 flex justify-center md:justify-start">
              <div className={`rounded-full px-4 py-2 ${questionsRemaining <= 0 ? "bg-red-50 border border-red-200" : "bg-amber-50 border border-amber-200"}`}>
                <span className={`text-sm font-medium ${questionsRemaining <= 0 ? "text-red-500" : "text-amber-600"}`}>
                  {questionsRemaining <= 0 ? "No credits left" : `${questionsRemaining} credit${questionsRemaining !== 1 ? 's' : ''} remaining`}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4 px-2 min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "items-end justify-end" : "items-start justify-start"}`}
                >
                  {message.type === "bot" && (
                    <img
                      src={vaaniiPersona}
                      alt="Vaanii"
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
                    alt="Vaanii"
                    className="h-8 w-8 rounded-full object-cover border border-border shrink-0 self-start"
                  />
                  <div className="rounded-2xl rounded-tl-sm bg-background/70 px-4 py-2 text-sm text-muted-foreground self-start min-w-[240px]">
                    <VaaniiLoadingAnimation
                      userName={userNameRef.current}
                      userQuestion={currentQuestionRef.current}
                    />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input area / Out of credits */}
            <div className="flex-shrink-0 px-2" style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>
              {questionsRemaining <= 0 ? (
                <div className="rounded-2xl border border-border bg-card/80 p-5 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <img
                      src={vaaniiPersona}
                      alt="Vaanii"
                      className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
                    />
                    <span className="font-display text-base text-foreground">Vaanii</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Namaste{userName !== "User" ? ` ${userName}` : ""}! You've used all your credits. To continue getting personalized Vedic readings, please purchase more credits.
                  </p>
                  <div className="flex justify-center gap-3">
                    <Link
                      to="/pricing"
                      className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Purchase Credits
                    </Link>
                    <a
                      href="/dashboard"
                      className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Go to Dashboard
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Vaanii anything..."
                      className="w-full rounded-full border border-border bg-card/80 px-6 py-4 pr-12 text-base outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all shadow-lg shadow-primary/20"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
