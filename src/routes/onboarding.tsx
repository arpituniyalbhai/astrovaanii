import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Reveal } from "@/components/landing/Reveal";
import { auth, createUserDoc } from "@/lib/firebase";
import { getChart } from "@/lib/chart-server";
import vaaniiPersona from "@/assets/vaanii-persona.jpg";
import brandIcon from "@/assets/astrovaanii-logo.webp";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Complete your profile — AstroVaanii" },
      { name: "description", content: "Share your birth details with Vaanii to get personalized astrology readings." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OnboardingPage,
});

type OnboardingStep = "name" | "dob" | "time" | "location" | "gender" | "complete";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

interface UserData {
  name: string;
  dob: string;
  timeOfBirth: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  gender: string;
  timezoneOffset?: number;
}

function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("name");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    dob: "",
    timeOfBirth: "",
    location: "",
    latitude: null,
    longitude: null,
    gender: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const email = auth.currentUser?.email || JSON.parse(localStorage.getItem('userData') || '{}').email;
    if (!email) {
      navigate({ to: "/signup" });
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Initial greeting
    const initialMessage: Message = {
      id: "1",
      type: "bot",
      content: "Namaste! 🙏 I'm Vaanii, your personal AI astrologer. Let's get to know you better to provide accurate readings.",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
    
    setTimeout(() => {
      addBotMessage("First, what should I call you? Please share your name.");
    }, 1500);
  }, []);

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleNameSubmit = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    setUserData((prev) => ({ ...prev, name: inputValue }));
    setInputValue("");
    setCurrentStep("dob");
    
    setTimeout(() => {
      addBotMessage(`Nice to meet you, ${inputValue}! 🌟 Now, I need your exact date of birth to calculate your birth chart.`);
      setTimeout(() => {
        setShowDatePicker(true);
      }, 1500);
    }, 500);
  };

  const handleDobSubmit = (date: string) => {
    addUserMessage(date);
    setUserData((prev) => ({ ...prev, dob: date }));
    setShowDatePicker(false);
    setCurrentStep("time");
    
    setTimeout(() => {
      addBotMessage("Great! What time were you born? This helps me calculate your planetary positions more accurately.");
      setTimeout(() => {
        setShowTimePicker(true);
      }, 1500);
    }, 500);
  };

  const handleTimeSubmit = (time: string) => {
    addUserMessage(time);
    setUserData((prev) => ({ ...prev, timeOfBirth: time }));
    setShowTimePicker(false);
    setCurrentStep("location");
    
    setTimeout(() => {
      addBotMessage("Perfect! Now, where were you born? Please share your city or place of birth.");
    }, 500);
  };

  const handleLocationSubmit = async (selectedLocation?: any) => {
    const location = selectedLocation?.formatted || inputValue;
    if (!location.trim()) return;
    
    addUserMessage(location);
    setInputValue("");
    setShowSuggestions(false);
    setLocationSuggestions([]);
    
    setIsTyping(true);
    
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=e6856ce2163d420dbae7d5adb0a104ec&limit=1`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        const annotations = data.results[0].annotations;
        const tzOffsetSec = annotations?.timezone?.offset_sec;
        setUserData((prev) => ({
          ...prev,
          location,
          latitude: lat,
          longitude: lng,
          timezoneOffset: tzOffsetSec != null ? tzOffsetSec / 3600 : undefined,
        }));
        setIsTyping(false);
        addBotMessage(`Got it! ${location} recorded. Now, what's your gender?`);
        setCurrentStep("gender");
      } else {
        setIsTyping(false);
        addBotMessage("I couldn't find that location. Could you please try with a more specific city name?");
        setCurrentStep("location");
      }
    } catch (error) {
      setIsTyping(false);
      addBotMessage("There was an error finding your location. Please try again.");
      setCurrentStep("location");
    }
  };

  const fetchLocationSuggestions = async (query: string) => {
    if (!query.trim() || currentStep !== "location") {
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
    } catch (error) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (currentStep === "location") {
        fetchLocationSuggestions(inputValue);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, currentStep]);

  const handleGenderSubmit = (gender: string) => {
    addUserMessage(gender);
    setUserData((prev) => ({ ...prev, gender }));
    setCurrentStep("complete");
    
    setTimeout(() => {
      addBotMessage("Wonderful! ✨ I have all the information I need. Your birth chart is being prepared...");
      setTimeout(() => {
        addBotMessage("You're all set! Your profile is complete. Let's begin your astrological journey!");
      }, 2000);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (currentStep === "name") {
        handleNameSubmit();
      } else if (currentStep === "location") {
        handleLocationSubmit();
      }
    }
  };

  const handleComplete = async () => {
    const email = auth.currentUser?.email || JSON.parse(localStorage.getItem('userData') || '{}').email;
    if (email) {
      try {
        await createUserDoc(email, {
          ...userData,
          questionsRemaining: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Failed to save user data to Firestore:", error);
      }
    }
    const stored = { ...userData, email, questionsRemaining: 1 };
    localStorage.setItem("userData", JSON.stringify(stored));

    if (userData.latitude != null && userData.longitude != null && userData.dob && userData.timeOfBirth) {
      const [y, m, d] = userData.dob.split("-").map(Number);
      const [h, min] = userData.timeOfBirth.split(":").map(Number);
      const result = await getChart({ data: {
        year: y,
        month: m,
        day: d,
        hour: h || 12,
        minute: min || 0,
        latitude: userData.latitude,
        longitude: userData.longitude,
        timezoneOffset: userData.timezoneOffset,
      }});
      if (result.success) {
        const chartData = result.chart;
        const updated = { ...stored, email, chart: chartData };
        localStorage.setItem("userData", JSON.stringify(updated));
      } else {
        console.error("Chart calculation failed:", (result as any).error);
      }
    }

    navigate({ to: "/dashboard" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24" />
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40" />

      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <img src={brandIcon} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[color:var(--sage)] animate-pulse" />
          <span className="text-sm text-muted-foreground">Step 2 of 3</span>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-2xl px-6 py-10">
        <Reveal>
          <div className="mx-auto w-full rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-4 border-b border-border bg-gradient-to-r from-[color:var(--gold)]/10 via-card to-[color:var(--clay)]/10 px-6 py-4">
              <div className="relative">
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
              <div>
                <div className="font-display text-lg text-primary">Vaanii AI</div>
                <div className="text-xs text-muted-foreground">Online · Personalizing your experience</div>
              </div>
            </div>

            {/* Chat messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
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
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 delay-100" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 delay-200" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Date picker */}
            {showDatePicker && (
              <div className="border-t border-border bg-background/50 px-6 py-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select your date of birth
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={selectedDate}
                    max={new Date().toISOString().split("T")[0]}
                    className="flex-1 rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <button
                    onClick={() => handleDobSubmit(selectedDate)}
                    disabled={!selectedDate}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Time picker */}
            {showTimePicker && (
              <div className="border-t border-border bg-background/50 px-6 py-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select your time of birth
                </label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={selectedTime}
                    className="flex-1 rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                  <button
                    onClick={() => handleTimeSubmit(selectedTime)}
                    disabled={!selectedTime}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Gender selection */}
            {currentStep === "gender" && (
              <div className="border-t border-border bg-background/50 px-6 py-4">
                <div className="grid grid-cols-3 gap-2">
                  {["Male", "Female", "Other"].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => handleGenderSubmit(gender)}
                      className="rounded-full border border-border bg-background/70 px-4 py-3 text-sm font-medium hover:bg-card hover:border-primary/60 transition-colors"
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input field */}
            {(currentStep === "name" || currentStep === "location") && (
              <div className="border-t border-border bg-background/50 px-6 py-4 relative">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => currentStep === "location" && inputValue && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder={
                      currentStep === "name"
                        ? "Enter your name..."
                        : "Enter your city or place of birth..."
                    }
                    className="flex-1 rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60"
                  />
                  <button
                    onClick={() => {
                      if (currentStep === "name") handleNameSubmit();
                      else if (currentStep === "location") handleLocationSubmit();
                    }}
                    disabled={!inputValue.trim()}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
                
                {/* Location suggestions dropdown */}
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute bottom-full left-6 right-6 mb-2 rounded-2xl border border-border bg-card shadow-xl max-h-60 overflow-y-auto z-10">
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(suggestion.formatted);
                          handleLocationSubmit(suggestion);
                        }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-background/50 transition-colors border-b border-border last:border-b-0"
                      >
                        <div className="font-medium text-foreground">{suggestion.formatted}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          📍 {suggestion.geometry.lat.toFixed(4)}°, {suggestion.geometry.lng.toFixed(4)}°
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Complete button */}
            {currentStep === "complete" && (
              <div className="border-t border-border bg-background/50 px-6 py-4">
                <button
                  onClick={handleComplete}
                  className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
                >
                  Complete & Continue
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
