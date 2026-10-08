import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Reveal } from "@/components/landing/Reveal";
import { auth, createUserDoc } from "@/lib/firebase";
import { getChart } from "@/lib/chart-server";
import brandIcon from "@/assets/astrovaanii-logo.png";

interface GeoapifyFeature {
  properties: {
    formatted: string;
    city?: string;
    state?: string;
    country?: string;
    lat: number;
    lon: number;
    timezone?: { offset_sec: number };
  };
}

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || "d629479cf35f491ebfb531d15f16dbfc";

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

interface UserData {
  name: string;
  dob: string;
  timeOfBirth: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  gender: string;
  timezoneOffset?: number;
  unknownTime: boolean;
}

function OnboardingPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    name: "",
    dob: "",
    timeOfBirth: "",
    location: "",
    latitude: null,
    longitude: null,
    gender: "",
    unknownTime: false,
  });

  const [step, setStep] = useState<1 | 2 | "saving">(1);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<GeoapifyFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Redirect to signup if not authenticated
  useEffect(() => {
    const email = auth.currentUser?.email || JSON.parse(localStorage.getItem('userData') || '{}').email;
    if (!email) {
      navigate({ to: "/signup" });
    }
  }, [navigate]);

  // Debounced location autocomplete
  useEffect(() => {
    if (!locationQuery.trim() || step !== 2) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(locationQuery)}&apiKey=${GEOAPIFY_KEY}&limit=5`
        );
        const data = await response.json();
        if (data.features?.length > 0) {
          setLocationSuggestions(data.features);
          setShowSuggestions(true);
        } else {
          setLocationSuggestions([]);
          setShowSuggestions(false);
        }
      } catch {
        setLocationSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [locationQuery, step]);

  const selectLocation = (feature: GeoapifyFeature) => {
    const tzOffsetSec = feature.properties.timezone?.offset_sec;
    setUserData((prev) => ({
      ...prev,
      location: feature.properties.formatted,
      latitude: feature.properties.lat,
      longitude: feature.properties.lon,
      timezoneOffset: tzOffsetSec != null ? tzOffsetSec / 3600 : undefined,
    }));
    setLocationQuery(feature.properties.formatted);
    setShowSuggestions(false);
    setLocationSuggestions([]);
    setErrors((prev) => ({ ...prev, location: "" }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!userData.name.trim()) newErrors.name = "Name is required";
    if (!userData.dob) newErrors.dob = "Date of birth is required";
    if (!userData.unknownTime && !userData.timeOfBirth) newErrors.time = "Time of birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!userData.gender) newErrors.gender = "Please select your gender";
    if (!userData.location || userData.latitude === null) newErrors.location = "Place of birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep1()) return;
    setErrors({});
    setStep(2);
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsSaving(true);
    setStep("saving");

    const email = auth.currentUser?.email || JSON.parse(localStorage.getItem('userData') || '{}').email;

    // If time is unknown, default to noon
    const timeOfBirth = userData.unknownTime ? "12:00" : userData.timeOfBirth;
    const finalUserData = { ...userData, timeOfBirth };

    if (email) {
      try {
        const { timezoneOffset: _tz, unknownTime: _ut, ...userDocPayload } = finalUserData;
        await createUserDoc(email, {
          ...userDocPayload,
          questionsRemaining: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Failed to save user data to Firestore:", error);
      }
    }

    const stored = { ...finalUserData, email, questionsRemaining: 1 };
    localStorage.setItem("userData", JSON.stringify(stored));

    // Calculate chart
    if (finalUserData.latitude != null && finalUserData.longitude != null && finalUserData.dob && timeOfBirth) {
      const [y, m, d] = finalUserData.dob.split("-").map(Number);
      const [h, min] = timeOfBirth.split(":").map(Number);
      const result = await getChart({
        data: {
          year: y,
          month: m,
          day: d,
          hour: h || 12,
          minute: min || 0,
          latitude: finalUserData.latitude,
          longitude: finalUserData.longitude,
          timezoneOffset: finalUserData.timezoneOffset,
        },
      });
      if (result.success) {
        const updated = { ...stored, email, chart: result.chart };
        localStorage.setItem("userData", JSON.stringify(updated));
      } else {
        console.error("Chart calculation failed:", (result as any).error);
      }
    }

    navigate({ to: "/dashboard" });
  };

  const genderOptions = [
    { value: "Female", label: "Female", icon: "♀" },
    { value: "Male", label: "Male", icon: "♂" },
    { value: "Other", label: "Other", icon: "⚧" },
  ];

  const stepTitles = {
    1: "Birth details",
    2: "A bit more about you",
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
          <span className="text-sm text-muted-foreground">Step {step === "saving" ? 2 : step} of 2</span>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-xl px-6 pt-4 pb-12">
        <Reveal>
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl tracking-tight">
              Create Your <em className="not-italic text-primary">Birth Chart</em>
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Just a few quick steps to personalize your experience.
            </p>
          </div>
        </Reveal>

        {/* ── Step 1: Name, DOB, Time ── */}
        {step === 1 && (
          <Reveal delay={100}>
            <div className="mx-auto w-full rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md">
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 pt-6">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                <div className="h-2.5 w-2.5 rounded-full bg-border" />
              </div>

              <div className="px-6 pt-5 pb-6 md:px-8">
                <h2 className="font-display text-xl mb-6">{stepTitles[1]}</h2>

                {/* Name input */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-1.5">Your name</label>
                  <div className={`flex items-center gap-3 rounded-xl border ${errors.name ? 'border-destructive' : 'border-border'} bg-background/70 px-4 py-3 focus-within:border-primary/60 transition-colors`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-muted-foreground shrink-0">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={userData.name}
                      onChange={(e) => {
                        setUserData((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                {/* DOB and Time row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Date of birth */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Date of birth</label>
                    <div className={`flex items-center rounded-xl border ${errors.dob ? 'border-destructive' : 'border-border'} bg-background/70 px-3 py-3 focus-within:border-primary/60 transition-colors`}>
                      <input
                        type="date"
                        value={userData.dob}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                          setUserData((prev) => ({ ...prev, dob: e.target.value }));
                          if (errors.dob) setErrors((prev) => ({ ...prev, dob: "" }));
                        }}
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                    {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob}</p>}
                  </div>

                  {/* Time of birth */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Time of birth</label>
                    <div className={`flex items-center rounded-xl border ${errors.time ? 'border-destructive' : 'border-border'} bg-background/70 px-3 py-3 focus-within:border-primary/60 transition-colors ${userData.unknownTime ? 'opacity-50 pointer-events-none' : ''}`}>
                      <input
                        type="time"
                        value={userData.timeOfBirth}
                        disabled={userData.unknownTime}
                        onChange={(e) => {
                          setUserData((prev) => ({ ...prev, timeOfBirth: e.target.value }));
                          if (errors.time) setErrors((prev) => ({ ...prev, time: "" }));
                        }}
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                    {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Unknown time checkbox */}
                <label className="flex items-center gap-2 mb-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={userData.unknownTime}
                    onChange={(e) => {
                      setUserData((prev) => ({
                        ...prev,
                        unknownTime: e.target.checked,
                        timeOfBirth: e.target.checked ? "" : prev.timeOfBirth,
                      }));
                      if (e.target.checked) setErrors((prev) => ({ ...prev, time: "" }));
                    }}
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-xs text-muted-foreground">I don't know my exact time of birth</span>
                </label>

                {/* Action row */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => navigate({ to: "/signup" })}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Privacy note */}
              <div className="border-t border-border bg-background/30 px-6 py-3 text-center rounded-b-3xl">
                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  Your birth details are private and securely stored
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── Step 2: Gender + Place of birth ── */}
        {step === 2 && (
          <Reveal delay={100}>
            <div className="mx-auto w-full rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md">
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 pt-6">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>

              <div className="px-6 pt-5 pb-6 md:px-8">
                <h2 className="font-display text-xl mb-6">{stepTitles[2]}</h2>

                {/* Gender selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Gender</label>
                  <div className="grid grid-cols-3 gap-3">
                    {genderOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setUserData((prev) => ({ ...prev, gender: opt.value }));
                          if (errors.gender) setErrors((prev) => ({ ...prev, gender: "" }));
                        }}
                        className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          userData.gender === opt.value
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border bg-background/70 text-foreground hover:border-primary/40 hover:bg-background"
                        }`}
                      >
                        <span className="mr-1.5">{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {errors.gender && <p className="text-xs text-destructive mt-1">{errors.gender}</p>}
                </div>

                {/* Place of birth — full width */}
                <div className="relative mb-6">
                  <label className="block text-sm font-medium mb-1.5">Place of birth</label>
                  <div className={`flex items-center gap-2 rounded-xl border ${errors.location ? 'border-destructive' : 'border-border'} bg-background/70 px-3 py-3 focus-within:border-primary/60 transition-colors`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-muted-foreground shrink-0">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <input
                      ref={locationInputRef}
                      type="text"
                      placeholder="Search your city or place of birth..."
                      value={locationQuery}
                      onChange={(e) => {
                        setLocationQuery(e.target.value);
                        if (userData.location) {
                          setUserData((prev) => ({ ...prev, location: "", latitude: null, longitude: null }));
                        }
                      }}
                      onFocus={() => locationQuery && locationSuggestions.length > 0 && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}

                  {/* Location suggestions dropdown */}
                  {showSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-card shadow-2xl max-h-56 overflow-y-auto z-30">
                      {locationSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => selectLocation(suggestion)}
                          className="w-full px-4 py-3 text-left text-sm hover:bg-primary/5 transition-colors border-b border-border last:border-b-0"
                        >
                          <div className="flex items-start gap-2.5">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-primary shrink-0 mt-0.5">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                              <circle cx="12" cy="9" r="2.5" />
                            </svg>
                            <span className="text-foreground leading-snug">{suggestion.properties.formatted}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action row */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleBack}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Creating chart..." : "Create my chart ✦"}
                  </button>
                </div>
              </div>

              {/* Privacy note */}
              <div className="border-t border-border bg-background/30 px-6 py-3 text-center rounded-b-3xl">
                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  Your birth details are private and securely stored
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── Saving / Chart calculation ── */}
        {step === "saving" && (
          <Reveal>
            <div className="mx-auto w-full max-w-sm rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-10 text-center">
              {/* Animated chart loading */}
              <div className="relative mx-auto mb-6 h-20 w-20">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <div className="absolute inset-2 rounded-full border border-[color:var(--gold)]/30 border-b-transparent animate-spin" style={{ animationDuration: "3s", animationDirection: "reverse" }} />
                <div className="absolute inset-4 rounded-full border border-[color:var(--clay)]/30 border-t-transparent animate-spin" style={{ animationDuration: "5s" }} />
                <div className="absolute inset-0 flex items-center justify-center text-xl">✦</div>
              </div>
              <h3 className="font-display text-xl mb-2">Calculating your chart…</h3>
              <p className="text-sm text-muted-foreground">
                Mapping planetary positions for your birth moment.
              </p>
            </div>
          </Reveal>
        )}
      </section>
    </main>
  );
}

