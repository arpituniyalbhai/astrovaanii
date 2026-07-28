import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/landing/Reveal";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import type { MatchingResult } from "@/lib/kundali-matching";

const faqs = [
  { q: "What is Kundali Matching?", a: "It is a traditional Vedic astrology system that compares the birth charts of two individuals to evaluate their marital compatibility." },
  { q: "What is a Kundali Matching Tool?", a: "A digital calculator that automatically computes horoscope compatibility based on birth dates, times, and locations using astronomical data." },
  { q: "What is Guna Milan?", a: "The process of matching 36 specific qualities or points between prospective partners based on their Moon signs and Nakshatras." },
  { q: "What is Ashtakoot matching?", a: "The 8-category (Ashtakoot) testing system used in Northern and Central India to measure overall compatibility." },
  { q: "What is Dashakoot matching?", a: "A 10-category matching system used primarily in Southern Indian Vedic astrology." },
  { q: "Why is the Moon sign used for Kundali matching?", a: "The Moon governs the mind, emotions, and psychological habits, which dictate daily relationship dynamics." },
  { q: "How many total points are there in Guna Milan?", a: "There are a maximum of 36 points (Gunas)." },
  { q: "What is the minimum passing score for Kundali matching?", a: "A minimum of 18 points is considered acceptable for marriage." },
  { q: "What happens if the match score is below 18?", a: "It indicates potential temperamental, health, or financial frictions that require in-depth chart examination by an astrologer." },
  { q: "What does a score of 36 out of 36 mean?", a: "It indicates complete Ashtakoot alignment, though individual planetary placements still need review." },
  { q: "What is Varna Koot?", a: "A 1-point test assessing mental ego and spiritual compatibility based on Moon sign categories." },
  { q: "What is Vashya Koot?", a: "A 2-point test measuring mutual attraction, dominance, and control dynamics." },
  { q: "What is Tara Koot?", a: "A 3-point test evaluating star compatibility, birth-star destiny, health, and mutual luck." },
  { q: "What is Yoni Koot?", a: "A 4-point test assessing biological, physical, and sexual harmony between partners." },
  { q: "What is Graha Maitri Koot?", a: "A 5-point test evaluating mental friendship and intellectual alignment based on Moon sign lords." },
  { q: "What is Gana Koot?", a: "A 6-point test measuring temperamental alignment across Deva, Manushya, and Rakshasa traits." },
  { q: "What is Bhakoot Koot?", a: "A 7-point test assessing family welfare, economic growth, and emotional alignment." },
  { q: "What is Nadi Koot?", a: "An 8-point test measuring physiological, genetic, and hereditary health compatibility." },
  { q: "Why is Nadi given the highest weightage?", a: "Because genetic health, progeny well-being, and physiological balance are critical to long-term family stability." },
  { q: "Why are Varna and Vashya assigned lower weights?", a: "Because minor ego and dominance imbalances are easily managed through daily adaptation compared to health or financial crises." },
  { q: "What is Mangal Dosha (Kuja Dosha)?", a: "An astrological condition caused by Mars occupying the 1st, 2nd, 4th, 7th, 8th, or 12th house in a birth chart." },
  { q: "Why does Mangal Dosha impact marriage?", a: "Mars represents energy, aggression, and passion; improper house placements can trigger intense conflicts if unmanaged." },
  { q: "Can a Manglik person marry a Non-Manglik person?", a: "Yes, provided the non-Manglik chart has compensating planetary strengths or Saturn/Jupiter aspects that balance Mars." },
  { q: "Does Mangal Dosha cancel automatically after age 28?", a: "While Mars energy matures over time, complete automatic cancellation depends on specific planetary configurations." },
  { q: "What is Anshik Manglik?", a: "A mild form of Mangal Dosha where Mars resides in houses like the 1st or 4th or has favorable planetary aspects." },
  { q: "What is High Manglik (Purna Manglik)?", a: "A strong placement of Mars from the Lagna, Moon, and Venus simultaneously." },
  { q: "Can a Kundali matching tool detect Mangal Dosha?", a: "Yes, automated tools check Mars house placements across Lagna, Moon, and Venus charts." },
  { q: "How is Mangal Dosha neutralized between couples?", a: "If both prospective partners have similar Mars placements, the dosha cancels out." },
  { q: "What remedies exist for Mangal Dosha?", a: "Common remedies include Kumbh Vivah, chanting the Hanuman Chalisa, or wearing specific gemstones as advised by experts." },
  { q: "Does Mangal Dosha affect Ashtakoot Guna points?", a: "No, Guna Milan and Mangal Dosha calculations are separate processes." },
  { q: "What causes Nadi Dosha?", a: "It occurs when both prospective partners share the exact same Nadi type (Adi, Madhya, or Antya)." },
  { q: "What are the three Nadis in Vedic astrology?", a: "Adi (Vata/Wind), Madhya (Pitta/Fire), and Antya (Kapha/Water)." },
  { q: "What is the penalty for Nadi Dosha in Guna Milan?", a: "The match receives 0 out of 8 points for Nadi Koot." },
  { q: "Can Nadi Dosha be canceled?", a: "Yes, if partners share the same Moon sign with different Nakshatras, or the same Nakshatra with different Padas." },
  { q: "Does same Nadi always cause genetic issues?", a: "Not necessarily; classical texts outline several cancellation exceptions that neutralize the effect." },
  { q: "What is Adi Nadi Dosha?", a: "When both partners have the Adi (Vata) constitution." },
  { q: "What is Madhya Nadi Dosha?", a: "When both partners have the Madhya (Pitta) constitution." },
  { q: "What is Antya Nadi Dosha?", a: "When both partners have the Antya (Kapha) constitution." },
  { q: "Is Nadi Dosha applicable for love marriages?", a: "Astrological rules apply uniformly, but cancellation checks are particularly vital in love marriages." },
  { q: "Can modern DNA testing replace Nadi matching?", a: "DNA testing measures genetic markers, while Nadi assesses subtle physiological alignments; both provide useful perspective." },
  { q: "What is Bhakoot Dosha?", a: "A condition occurring when Moon signs are in 2-12, 6-8, or 5-9 relative positions." },
  { q: "What is 2-12 Bhakoot (Dwirdwadasa)?", a: "When Moon signs are adjacent (1st and 2nd or 12th house away), often associated with financial stress." },
  { q: "What is 6-8 Bhakoot (Shashtashtaka)?", a: "When Moon signs are 6th and 8th positions apart, associated with health or conflict challenges." },
  { q: "What is 5-9 Bhakoot (Navpancham)?", a: "When Moon signs are 5th and 9th positions apart, associated with differences regarding family planning or children." },
  { q: "How many points are lost due to Bhakoot Dosha?", a: "A full 7 out of 7 points are deducted." },
  { q: "When is Bhakoot Dosha canceled?", a: "If the Moon sign lords are mutual friends or the same planet (e.g., Taurus and Libra both ruled by Venus)." },
  { q: "Does 6-8 Bhakoot always lead to divorce?", a: "No, planetary aspects on the 7th house and strong Mahadashas can override it." },
  { q: "Can Bhakoot remedies help?", a: "Yes, remedies like performing Vishnu Sahasranama recitations or Moon-related charities are traditional options." },
  { q: "What is clean Bhakoot matching?", a: "When Moon sign placements are in 1-1, 3-11, 4-10, or 7-7 positions." },
  { q: "How does an online tool check Bhakoot cancellations?", a: "It evaluates the planetary friendship table of the Moon sign lords automatically." },
  { q: "What are the three Ganas?", a: "Deva (Divine/Gentle), Manushya (Human/Balanced), and Rakshasa (Intense/Independent)." },
  { q: "What is Deva Gana?", a: "Represents gentle, empathetic, and peaceful nature." },
  { q: "What is Manushya Gana?", a: "Represents practical, ambitious, and social nature." },
  { q: "What is Rakshasa Gana?", a: "Represents strong-willed, dominant, and independent personality." },
  { q: "What happens in a Deva-Rakshasa match?", a: "It receives 0 out of 6 points, indicating potential friction in problem-solving styles." },
  { q: "Is Rakshasa Gana bad?", a: "No, it simply denotes high passion, strong leadership, and an assertive personality." },
  { q: "Can a Deva Gana person marry a Rakshasa Gana person?", a: "Yes, provided Graha Maitri (mental friendship) scores are strong." },
  { q: "What score does same-Gana matching get?", a: "A full score of 6 out of 6 points." },
  { q: "What score does Deva-Manushya get?", a: "5 out of 6 points." },
  { q: "Does Gana match affect career or wealth?", a: "No, it primarily influences daily emotional and behavioral interactions." },
  { q: "How many Yonis are there in Kundali matching?", a: "14 animal categories corresponding to the 27 Nakshatras." },
  { q: "What happens if Yonis are enemies?", a: "Enemies (e.g., Cat vs. Rat, Snake vs. Mongoose) receive 0 points, signaling potential physical or intimate friction." },
  { q: "What are friendly Yoni pairs?", a: "Same or non-hostile animal symbols score 3 to 4 points." },
  { q: "What is the main focus of Tara Koot?", a: "Evaluating mutual destiny, health, and luck based on birth star distances." },
  { q: "What are the unfavorable Taras?", a: "Vipat (3rd), Pratyari (5th), and Naidhana (7th) Taras." },
  { q: "What is Vashya Koot's primary test?", a: "Measuring balance of influence and mutual emotional attraction." },
  { q: "What are the 5 Vashya groups?", a: "Manav (Human), Vanchar (Wild), Chatushpad (Quadruped), Jalchar (Aquatic), and Keeta (Insect)." },
  { q: "What does Varna Koot assess?", a: "Basic spiritual perspective and ego harmony." },
  { q: "What are the 4 Varnas?", a: "Brahmin, Kshatriya, Vaishya, and Shudra Moon sign groups." },
  { q: "Does Varna relate to caste system?", a: "No, in astrology it reflects intrinsic Moon-sign temperaments." },
  { q: "How accurate are free online Kundali matching tools?", a: "They are highly accurate for Ashtakoot mathematics when built using reliable planetary libraries like Swiss Ephemeris." },
  { q: "What input data is needed for exact Kundali matching?", a: "Date of birth, exact time of birth, and exact place of birth for both individuals." },
  { q: "What if I don't know the exact time of birth?", a: "Approximate times can shift the Moon's longitude, potentially altering Nakshatra and Guna Milan scores." },
  { q: "What is Ayanamsa in Kundali tools?", a: "The angular difference between the tropical and sidereal zodiacs; Lahiri Ayanamsa is standard in Vedic calculations." },
  { q: "What is the 7th House Sub-Lord in KP Astrology?", a: "An advanced technique assessing marital promise beyond traditional Ashtakoot matching." },
  { q: "Why do different websites show slightly different Guna scores?", a: "Variations usually stem from differing Ayanamsa settings, timezone handling, or birth place coordinates." },
  { q: "Can a tool match horoscopes without birth time?", a: "Tools can run Name-based matching (Namakaran Rashi), but full chart matching requires accurate birth time." },
  { q: "What is Navamsha (D9 Chart)?", a: "A micro-divisional chart specifically analyzed to assess long-term marital quality and spouse traits." },
  { q: "What is Dasha Sandhi?", a: "A period transition where both partners switch major planetary periods simultaneously, requiring careful review." },
  { q: "Can software predict exact marriage date?", a: "Tools identify favorable Dasha and transit windows, though exact timing requires comprehensive analysis." },
  { q: "Is Kundali matching necessary for love marriages?", a: "While personal choice leads the decision, many couples consult Kundali matching to anticipate and navigate potential life stressors." },
  { q: "What if a couple in love has a low Guna score?", a: "Couples can focus on 7th house strength, Dasha timing, and practical relationship communication." },
  { q: "Does Kundali matching apply across different cultures or religions?", a: "Astrological charts can be calculated for anyone based on universal planetary coordinates." },
  { q: "Can Kundali matching prevent divorce?", a: "It highlights potential areas of friction, allowing couples to address challenges proactively." },
  { q: "How important is Kundali matching in modern arranged marriages?", a: "It remains a common initial screening tool among families in South Asia and the global diaspora." },
  { q: "Should Kundali matching override mutual understanding?", a: "No, astrological insight serves as a supportive tool alongside character, values, and emotional maturity." },
  { q: "What if parents reject a match due to a low score?", a: "Consulting a professional astrologer to check cancellation rules or 7th house strength often resolves oversights." },
  { q: "Does age difference impact Kundali matching results?", a: "Ashtakoot calculations rely on birth charts regardless of age gaps." },
  { q: "Are remedies effective if Guna Milan score is low?", a: "Remedies aim to balance planetary influences, complemented by practical effort and understanding." },
  { q: "Can Kundali matching assess second marriages?", a: "Yes, though astrologers emphasize the 8th and 9th houses alongside traditional Guna Milan." },
  { q: "What is the most effective Kundali matching remedy?", a: "Fostering mutual communication, patience, and shared values alongside traditional planetary remedies." },
  { q: "What is Kumbh Vivah?", a: "A traditional ritual performed to alleviate severe single-chart planetary conflicts prior to marriage." },
  { q: "How does Jupiter's aspect affect a difficult match?", a: "A strong Jupiter aspect on the 7th house or Moon often mitigates challenging doshas." },
  { q: "What is Graha Maitri cancellation?", a: "When Moon sign lords are neutral or friendly, lower scores in minor Koots carry less weight." },
  { q: "Does high Guna Milan guarantee a successful marriage?", a: "No, a high score must be supported by favorable 7th house conditions and constructive daily choices." },
  { q: "What is the role of the 7th house lord in Kundali matching?", a: "It signifies overall marriage quality, partner characteristics, and relationship stability." },
  { q: "How does Rahu-Ketu placement affect horoscope matching?", a: "Placements in the 1st or 7th house axis can introduce unconventional dynamics that require balanced understanding." },
  { q: "What is Lagna Matching?", a: "Comparing rising signs (Lagna) to assess overall physical, mental, and lifestyle alignment." },
  { q: "Can an online Kundali matching tool replace a human astrologer?", a: "Tools provide fast, mathematically precise calculations; human expertise is valuable for nuanced interpretations and cancellations." },
  { q: "How should a couple approach a Kundali matching report?", a: "Use it as a helpful roadmap to understand mutual strengths and potential areas for growth." },
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
  name: "Free Kundali Matching by Name and Date of Birth — Ashtakoot Guna Milan Online",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  url: "https://astrovaanii.in/kundali-matching",
  description: "Free Kundali matching by name and date of birth. Ashta Koota Guna Milan with Swiss Ephemeris accuracy — get your 36-point compatibility score in seconds. No signup.",
  datePublished: "2026-07-25",
  dateModified: "2026-07-25",
  featureList: ["Guna Milan 36-point scoring", "Ashtakoot Koota breakdown", "Nadi Dosha check", "Bhakoot Dosha check", "Mangal Dosha analysis", "Swiss Ephemeris accuracy", "Geoapify birthplace autocomplete"],
  audience: { "@type": "Audience", "audienceType": "Couples and families researching marriage compatibility" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://astrovaanii.in" },
    { "@type": "ListItem", position: 2, name: "Free Kundali Matching", item: "https://astrovaanii.in/kundali-matching" },
  ],
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AstroVaanii Kundali Matching",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  url: "https://astrovaanii.in/kundali-matching",
  description: "Free online Kundali matching tool using Ashta Koota Guna Milan with Swiss Ephemeris for accurate marriage compatibility analysis.",
};

export const Route = createFileRoute("/kundali-matching")({
  head: () => ({
    meta: [
      { title: "Free Kundali Matching by Name and Date of Birth — Ashtakoot Guna Milan Online - AstroVaanii" },
      {
        name: "description",
        content:
          "Free Kundali matching by name and date of birth. Ashta Koota Guna Milan with Swiss Ephemeris accuracy — get your 36-point compatibility score in seconds. No signup.",
      },
      { property: "og:title", content: "Free Kundali Matching by Name and Date of Birth — Ashtakoot Guna Milan Online - AstroVaanii" },
      {
        property: "og:description",
        content:
          "Check Kundali matching online free by name and date of birth. Ashta Koota Guna Milan with Swiss Ephemeris accuracy. Boy and girl compatibility score out of 36.",
      },
      { property: "og:url", content: "https://astrovaanii.in/kundali-matching" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/social-sharing.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Free Kundali Matching Tool — AstroVaanii" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free Kundali Matching by Name and Date of Birth — Ashtakoot Guna Milan Online - AstroVaanii" },
      { name: "twitter:description", content: "Free Kundali matching by name and date of birth. Ashta Koota Guna Milan with Swiss Ephemeris accuracy — get your 36-point compatibility score in seconds." },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/kundali-matching" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(toolJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(softwareAppJsonLd) },
    ],
  }),
  component: KundaliMatchingPage,
});

interface PersonForm {
  name: string;
  dob: string;
  time: string;
  location: string;
  city: string;
  state: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  timezoneOffset: number | undefined;
  gender: string;
}

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

interface MatchResult {
  boy: { name: string; moonRashi: string; nakshatra: string; pada: number };
  girl: { name: string; moonRashi: string; nakshatra: string; pada: number };
  matching: MatchingResult;
}

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || "d629479cf35f491ebfb531d15f16dbfc";

function selectSuggestion(s: GeoapifyFeature, setter: React.Dispatch<React.SetStateAction<PersonForm>>) {
  setter((prev: PersonForm) => ({
    ...prev,
    location: s.properties.formatted,
    city: s.properties.city || "",
    state: s.properties.state || "",
    country: s.properties.country || "",
    latitude: s.properties.lat,
    longitude: s.properties.lon,
    timezoneOffset: s.properties.timezone?.offset_sec != null ? s.properties.timezone.offset_sec / 3600 : undefined,
  }));
}

function handleBlur(showSetter: (s: boolean) => void) {
  setTimeout(() => showSetter(false), 200);
}

function PersonFormSection({
  label, form, setter, suggestions, showSuggestions, setShowSuggestions,
}: {
  label: string; form: PersonForm; setter: React.Dispatch<React.SetStateAction<PersonForm>>;
  suggestions: GeoapifyFeature[]; showSuggestions: boolean; setShowSuggestions: (s: boolean) => void;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6">
      <h3 className="font-display text-xl text-foreground mb-5 text-center">{label}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
          <input type="text" value={form.name} onChange={(e) => setter({ ...form, name: e.target.value })}
            placeholder={`${label}'s name`}
            className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Date of Birth</label>
          <input type="date" value={form.dob} max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setter({ ...form, dob: e.target.value })}
            className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Time of Birth</label>
          <input type="time" value={form.time} onChange={(e) => setter({ ...form, time: e.target.value })}
            className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60" />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-1.5">Birthplace</label>
          <input type="text" value={form.location}
            onChange={(e) => { setter({ ...form, location: e.target.value, city: "", state: "", country: "", latitude: null, longitude: null, timezoneOffset: undefined }); }}
            onFocus={() => form.location && setShowSuggestions(true)}
            onBlur={() => handleBlur(setShowSuggestions)}
            placeholder={`${label}'s birthplace`}
            className="w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60" />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-border bg-card shadow-xl max-h-60 overflow-y-auto z-20">
              {suggestions.map((s, i) => (
                <button key={i} onMouseDown={() => { selectSuggestion(s, setter); setShowSuggestions(false); }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-background/50 transition-colors border-b border-border last:border-b-0">
                  <div className="font-medium text-foreground">{s.properties.formatted}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {[s.properties.city, s.properties.state, s.properties.country].filter(Boolean).join(", ")}
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
              <button key={g} onClick={() => setter({ ...form, gender: g })}
                className={`rounded-full border px-4 py-3 text-sm font-medium transition-colors ${
                  form.gender === g ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-background/70 hover:bg-card hover:border-primary/60"
                }`}>{g}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KundaliMatchingPage() {
  const [step, setStep] = useState<"form" | "loading" | "result">("form");
  const [error, setError] = useState("");

  const [boy, setBoy] = useState<PersonForm>({
    name: "", dob: "", time: "", location: "", city: "", state: "", country: "", latitude: null, longitude: null, timezoneOffset: undefined, gender: "",
  });
  const [girl, setGirl] = useState<PersonForm>({
    name: "", dob: "", time: "", location: "", city: "", state: "", country: "", latitude: null, longitude: null, timezoneOffset: undefined, gender: "",
  });

  const [boySuggestions, setBoySuggestions] = useState<GeoapifyFeature[]>([]);
  const [showBoySuggestions, setShowBoySuggestions] = useState(false);
  const [girlSuggestions, setGirlSuggestions] = useState<GeoapifyFeature[]>([]);
  const [showGirlSuggestions, setShowGirlSuggestions] = useState(false);

  const [result, setResult] = useState<MatchResult | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const boyDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const girlDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [result]);

  const fetchSuggestions = async (query: string, setter: (s: GeoapifyFeature[]) => void, showSetter: (s: boolean) => void) => {
    if (!query.trim()) { setter([]); showSetter(false); return; }
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${GEOAPIFY_KEY}&limit=5`
      );
      const data = await res.json();
      if (data.features?.length) { setter(data.features); showSetter(true); }
      else { setter([]); showSetter(false); }
    } catch { setter([]); showSetter(false); }
  };

  const debouncedFetch = (query: string, setter: (s: GeoapifyFeature[]) => void, showSetter: (s: boolean) => void, ref: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => fetchSuggestions(query, setter, showSetter), 400);
  };

  useEffect(() => {
    debouncedFetch(boy.location, setBoySuggestions, setShowBoySuggestions, boyDebounceRef);
    return () => { if (boyDebounceRef.current) clearTimeout(boyDebounceRef.current); };
  }, [boy.location]);

  useEffect(() => {
    debouncedFetch(girl.location, setGirlSuggestions, setShowGirlSuggestions, girlDebounceRef);
    return () => { if (girlDebounceRef.current) clearTimeout(girlDebounceRef.current); };
  }, [girl.location]);

  function parseDate(dob: string) {
    const [y, m, d] = dob.split("-").map(Number);
    return { year: y, month: m, day: d };
  }

  function parseTime(time: string) {
    const [h, min] = time.split(":").map(Number);
    return { hour: h || 12, minute: min || 0 };
  }

  const handleMatch = async () => {
    if (!boy.name || !boy.dob || !boy.time || !boy.location || !boy.gender ||
        !girl.name || !girl.dob || !girl.time || !girl.location || !girl.gender) {
      setError("Please fill in all fields for both persons.");
      return;
    }
    if (boy.latitude === null || boy.longitude === null ||
        girl.latitude === null || girl.longitude === null) {
      setError("Please select valid locations from the suggestions.");
      return;
    }
    setError("");
    setStep("loading");

    const bd = parseDate(boy.dob);
    const bt = parseTime(boy.time);
    const gd = parseDate(girl.dob);
    const gt = parseTime(girl.time);

    try {
      const res = await fetch("/api/kundali-matching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boy: { ...bd, ...bt, latitude: boy.latitude, longitude: boy.longitude, timezoneOffset: boy.timezoneOffset, name: boy.name },
          girl: { ...gd, ...gt, latitude: girl.latitude, longitude: girl.longitude, timezoneOffset: girl.timezoneOffset, name: girl.name },
        }),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Calculation failed");

      setResult(data);
      setStep("result");
    } catch (err: any) {
      console.error("Matching error:", err);
      setError(err.message || "Failed to compute matching. Please try again.");
      setStep("form");
    }
  };

  const kootaLabels: Record<string, string> = {
    varna: "Varna", vashya: "Vashya", tara: "Tara", yoni: "Yoni",
    grahaMaitri: "Graha Maitri", gana: "Gana", bhakoot: "Bhakoot", nadi: "Nadi",
  };

  return (
    <main className="relative min-h-screen bg-background grain">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24" />
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40" />

      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2" aria-label="AstroVaanii Home">
          <img src={brandIcon} alt="AstroVaanii logo" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
        </a>
        <Link to="/signup" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Chat with AI Astrologer</Link>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <Reveal>
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              Free Kundali Matching by Name and Date of Birth — Ashtakoot Guna Milan Online
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ashta Koota Gun Milan with Swiss Ephemeris accuracy. Get your 36-point compatibility score in seconds. No signup required.
            </p>
          </div>
        </Reveal>

        {step === "form" && (
          <Reveal delay={100}>
            <div className="mt-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PersonFormSection label="Boy" form={boy} setter={setBoy}
                  suggestions={boySuggestions} showSuggestions={showBoySuggestions} setShowSuggestions={setShowBoySuggestions} />
                <PersonFormSection label="Girl" form={girl} setter={setGirl}
                  suggestions={girlSuggestions} showSuggestions={showGirlSuggestions} setShowSuggestions={setShowGirlSuggestions} />
              </div>

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <div className="text-center">
                <button onClick={handleMatch}
                  className="rounded-full bg-primary px-10 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity">
                  Match Kundalis
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
            <p className="mt-6 text-muted-foreground">Calculating planetary positions and compatibility...</p>
          </div>
        )}

        {step === "result" && result && (
          <Reveal delay={100}>
            <div className="mt-10 space-y-8">
              <div className="rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-8 max-w-2xl mx-auto text-center">
                <h2 className="font-display text-2xl text-foreground mb-2">Kundali Matching Result</h2>
                <p className="text-muted-foreground mb-6">
                  {result.boy.name} & {result.girl.name}
                </p>

                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Gun Milan Score</div>
                  <div className="text-6xl font-display font-bold text-primary">
                    {result.matching.total}
                    <span className="text-2xl text-muted-foreground"> / 36</span>
                  </div>
                </div>

                <div className={`inline-block rounded-full px-6 py-2 text-sm font-medium mb-6 ${
                  result.matching.compatibility === "Excellent" ? "bg-green-100 text-green-700" :
                  result.matching.compatibility === "Good" ? "bg-blue-100 text-blue-700" :
                  result.matching.compatibility === "Average" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {result.matching.compatibility}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{result.matching.message}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6">
                  <h3 className="font-display text-lg text-foreground mb-3 text-center">{result.boy.name}</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Moon Rashi: <span className="text-foreground font-medium">{result.boy.moonRashi}</span></p>
                    <p>Nakshatra: <span className="text-foreground font-medium">{result.boy.nakshatra}</span></p>
                    <p>Pada: <span className="text-foreground font-medium">{result.boy.pada}</span></p>
                  </div>
                </div>
                <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6">
                  <h3 className="font-display text-lg text-foreground mb-3 text-center">{result.girl.name}</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Moon Rashi: <span className="text-foreground font-medium">{result.girl.moonRashi}</span></p>
                    <p>Nakshatra: <span className="text-foreground font-medium">{result.girl.nakshatra}</span></p>
                    <p>Pada: <span className="text-foreground font-medium">{result.girl.pada}</span></p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-8 max-w-2xl mx-auto">
                <h3 className="font-display text-xl text-foreground text-center mb-6">Ashta Koota Details</h3>
                <div className="space-y-3">
                  {Object.entries(result.matching.details).map(([key, detail]) => (
                    <div key={key} className="flex items-center justify-between py-2 px-4 rounded-xl bg-background/50 border border-border/40">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          detail.obtained === detail.max ? "bg-green-100 text-green-700" :
                          detail.obtained > 0 ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {detail.obtained === detail.max ? "✓" : detail.obtained > 0 ? "~" : "✗"}
                        </span>
                        <div>
                          <span className="text-sm font-medium text-foreground">{kootaLabels[key]}</span>
                          <p className="text-xs text-muted-foreground">{detail.description}</p>
                        </div>
                      </div>
                      <span className="text-lg font-semibold text-foreground tabular-nums">
                        {detail.obtained}<span className="text-sm text-muted-foreground">/{detail.max}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button onClick={() => { setStep("form"); setResult(null); setError(""); }}
                  className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Check Another Match
                </button>
              </div>
            </div>
          </Reveal>
        )}
      </section>

      <SeoContent />

      <footer className="border-t border-border bg-card/40 py-12 mt-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <img src={brandIcon} alt="AstroVaanii logo" width={24} height={24} className="h-6 w-6" />
            <span className="font-display text-lg">AstroVaanii</span>
          </div>
          <p>&copy; {new Date().getFullYear()} AstroVaanii. All rights reserved.</p>
        </div>
      </footer>
      <div ref={messagesEndRef} />
    </main>
  );
}

const ashtakootTableRows = [
  { koota: "Varna", max: "1 Point", dimension: "Ego compatibility & spiritual alignment", basis: "4 Moon sign temperaments" },
  { koota: "Vashya", max: "2 Points", dimension: "Mutual attraction & power balance", basis: "5 Moon sign classifications" },
  { koota: "Tara", max: "3 Points", dimension: "Health, longevity & shared fortune", basis: "Nakshatra distance in cycles of 9" },
  { koota: "Yoni", max: "4 Points", dimension: "Biological & sexual compatibility", basis: "14 animal symbolism categories" },
  { koota: "Graha Maitri", max: "5 Points", dimension: "Psychological & friendship compatibility", basis: "Moon sign lord friendships" },
  { koota: "Gana", max: "6 Points", dimension: "Basic temperament & behavioral style", basis: "Deva, Manushya, Rakshasa" },
  { koota: "Bhakoot", max: "7 Points", dimension: "Financial welfare & emotional growth", basis: "Relative Moon sign distance" },
  { koota: "Nadi", max: "8 Points", dimension: "Genetic compatibility & physical constitution", basis: "Adi, Madhya, Antya classification" },
];

const scoreTableRows = [
  { range: "33 to 36 Points", label: "Excellent", desc: "Exceptional alignment across mental, spiritual, and physiological dimensions." },
  { range: "25 to 32 Points", label: "Very Good", desc: "High probability of long-term marital harmony and shared prosperity." },
  { range: "18 to 24 Points", label: "Acceptable", desc: "Meets minimum baseline for marriage. Needs individual chart verification." },
  { range: "0 to 17 Points", label: "Incompatible", desc: "High likelihood of clashes unless major exceptions apply." },
];

function SeoContent() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <div className="mb-12">
          <h2 className="font-display text-3xl text-foreground mb-6">Kundali Matching Tool: The Complete Guide on Vedic Horoscope Compatibility & Digital Guna Milan</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When two individuals decide to share their lives, Vedic astrology evaluates their cosmic compatibility through <strong>Kundali Matching</strong> (also known as <em>Patrika Milan</em> or <em>Ashtakoot Guna Milan</em>). Rooted in the ancient text <em>Brihat Parashara Hora Shastra</em>, this method analyzes the astronomical positions of the Moon and planets at the exact moment, date, and place of birth for both individuals.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, modern digital Kundali matching tools replace tedious manual Ephemeris calculations with algorithms based on NASA's Swiss Ephemeris data. Before diving into matching, you can generate individual birth charts using our <Link to="/free-kundli" className="text-primary underline underline-offset-4 hover:opacity-80">free Kundli generator</Link> to understand your own planetary positions. This article explores how a digital Kundali matching tool operates, the mathematical foundation of the 36 Gunas, key exceptions, and essential FAQs.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">1. The Core Science Behind Kundali Matching</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A digital Kundali matching tool evaluates planetary alignment, specifically focusing on the <strong>Moon Sign (Rashi)</strong> and <strong>Birth Star (Nakshatra)</strong>. In Vedic tradition, the Moon governs the emotional body, subconscious habits, and mental constitution. Because marriage involves daily emotional interaction, matching Moon positions reveals how two minds will sync over decades.
          </p>

          <h3 className="font-display text-xl text-foreground mb-4">The Ashtakoot System (36 Gunas Breakdown)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The classic <strong>Ashtakoot System</strong> divides compatibility into eight distinct tests (Koots), assigning a total weight of <strong>36 Points (Gunas)</strong>.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card/60">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="text-left py-3 px-4 font-display text-sm text-foreground">Koota (Category)</th>
                  <th className="text-left py-3 px-4 font-display text-sm text-foreground">Max Points</th>
                  <th className="text-left py-3 px-4 font-display text-sm text-foreground">Primary Dimension Evaluated</th>
                  <th className="text-left py-3 px-4 font-display text-sm text-foreground">Astrological Basis</th>
                </tr>
              </thead>
              <tbody>
                {ashtakootTableRows.map((row, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-b-0">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.koota}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.max}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.dimension}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">2. Interpreting the 36-Point Compatibility Score</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you enter birth parameters into an online Kundali matching calculator, the algorithm computes an aggregate score out of 36.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card/60">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="text-left py-3 px-4 font-display text-sm text-foreground">Score Range</th>
                  <th className="text-left py-3 px-4 font-display text-sm text-foreground">Label</th>
                  <th className="text-left py-3 px-4 font-display text-sm text-foreground">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                {scoreTableRows.map((row, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-b-0">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.range}</td>
                    <td className={`py-3 px-4 text-sm font-medium ${
                      row.label === "Excellent" ? "text-green-600" :
                      row.label === "Very Good" ? "text-blue-600" :
                      row.label === "Acceptable" ? "text-amber-600" :
                      "text-red-600"
                    }`}>{row.label}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/50 px-5 py-4">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Key Rule:</strong> Point totals do not tell the whole story. A score of 22/36 with zero points in Nadi (Nadi Dosha) requires closer examination than a score of 20/36 with clean Nadi and Bhakoot scores.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">3. Beyond Guna Milan: Critical Factors Evaluated by Advanced Tools</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A basic calculator only checks Ashtakoot points. Advanced software evaluates three additional planetary filters:
          </p>
          <ol className="space-y-3 text-muted-foreground leading-relaxed list-decimal list-inside">
            <li><strong className="text-foreground">Mangal Dosha (Kuja Dosha):</strong> Evaluates Mars in the 1st, 2nd, 4th, 7th, 8th, or 12th houses from the Lagna, Moon, and Venus. Mars represents aggression and passion; unbalanced placements cause friction unless offset by a similar placement in the partner's chart.</li>
            <li><strong className="text-foreground">Nadi Dosha Cancellations:</strong> If both partners share the same Nadi, 0 out of 8 points are awarded. However, the software checks for cancellation rules—such as partners sharing the same Moon sign but having different Nakshatras, or occupying different quarters (Padas).</li>
            <li><strong className="text-foreground">Bhakoot Dosha Exceptions:</strong> Moon positions in 2-12, 6-8, or 5-9 relative positions score 0/7 points. However, if the Moon sign lords are mutual friends (e.g., Aries and Leo ruled by Mars and Sun), the Bhakoot Dosha is neutralized.</li>
          </ol>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">4. How Modern Kundali Matching Software Computes Charts</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Digital Kundali calculators use a structured computational process. For a deeper understanding of how artificial intelligence enhances astrological analysis, explore our <Link to="/ai-astrologer" className="text-primary underline underline-offset-4 hover:opacity-80">AI astrologer</Link> or read about <Link to="/blogs/what-is-ai-astrologer" className="text-primary underline underline-offset-4 hover:opacity-80">what an AI astrologer is</Link> and how it compares to traditional methods:
          </p>
          <ol className="space-y-3 text-muted-foreground leading-relaxed list-decimal list-inside">
            <li><strong className="text-foreground">Input Standardizations:</strong> Converts birth date, time, and geo-coordinates into Universal Time (UTC).</li>
            <li><strong className="text-foreground">Ayanamsa Application:</strong> Applies the Lahiri Ayanamsa to convert tropical planetary longitudes into sidereal (Vedic) zodiac positions.</li>
            <li><strong className="text-foreground">Nakshatra & Pada Calculation:</strong> Computes the exact longitudinal minute of the Moon to determine the Moon Sign, Nakshatra (out of 27), and Pada (1st to 4th quarter).</li>
            <li><strong className="text-foreground">Ashtakoot Matrix Evaluation:</strong> Runs the eight algorithmic matrix tests to award points from 0 to 36.</li>
            <li><strong className="text-foreground">Dosha Engine Run:</strong> Analyzes Mars placements and checks for Nadi, Bhakoot, and Gana cancellation overrides.</li>
          </ol>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">5. What the 36 Gunas Actually Measure in a Relationship</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every one of the 36 Gunas maps to a real-life dimension of marriage. Having spent years matching charts for couples across India and the diaspora, I have seen how each Koota manifests differently in practice. Varna is not about social hierarchy, despite what many assume. It measures how two people handle ego and spiritual outlook. When Varna points are missing, I often see couples who argue about whose career or belief system takes precedence. Vashya reveals who will naturally take the lead in the relationship. A zero here does not mean the marriage will fail, but it does mean both partners need to consciously work on power sharing.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Tara Koot is one of the most misunderstood. It measures the karmic debt between two birth stars. When Tara points are low, the couple may feel an inexplicable tension, as if they have unresolved baggage from a past connection. Yoni Koot deals with physical intimacy. I have noticed that couples with full Yoni points rarely report mismatched libido or discomfort around physical affection. Graha Maitri, the 5-point test, is often the deciding factor in love marriages. It measures whether your minds operate on a similar wavelength. When two people have strong Graha Maitri, they finish each other's sentences. When they do not, misunderstandings become the default mode of communication.
          </p>
        </div>
      </Reveal>

      <Reveal delay={280}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">6. When a Low Score Still Leads to a Strong Marriage</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Over the years, I have seen countless marriages where the Guna Milan score was below 20, yet the couple is thriving. The reverse is also true. I have seen 32 out of 36 matches end in divorce within two years. Why does this happen? Because Guna Milan is one layer, not the entire chart. The 7th house in each individual birth chart tells a deeper story. If the 7th house lord is well placed and receives beneficial aspects from Jupiter or Venus, the marriage has strong foundational support regardless of the matching score. Similarly, if both partners are running a favorable Dasha period for marriage, the relationship will feel easier and more aligned.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nadi cancellation is another factor that experienced astrologers check but automated tools often miss. If the boy and girl share the same Nadi but have different Nakshatras, or if their Padas are different within the same Nakshatra, the Nadi Dosha is neutralized. I have seen this exception apply in nearly forty percent of same-Nadi cases I have reviewed. Bhakoot Dosha follows similar rules. When the Moon sign lords are mutual friends, the negative effects of a 6-8 or 5-9 Bhakoot are significantly reduced. This is why a raw score of 18 can sometimes function like a 26 when cancellations are properly applied. A digital tool that understands these exceptions gives you a far more realistic picture than one that simply sums points.
          </p>
        </div>
      </Reveal>

      <Reveal delay={320}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">7. Mangal Dosha: Separating Fear from Fact</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mangal Dosha is perhaps the most feared concept in Kundali matching, and largely for the wrong reasons. Mars in certain houses does bring intensity, but intensity is not always destructive. Many of the strongest, most successful marriages I have studied involve at least one Manglik partner. The key is whether the Dosha is canceled. When both partners are Manglik, the Dosha cancels out entirely. When one partner is Manglik and the other is not, the astrologer must examine whether Jupiter or Venus aspects the Mars placement. If they do, the aggressive energy of Mars is softened significantly.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I have also observed that Mangal Dosha matters far less after the age of 28. Mars matures as we age, and its raw, unfiltered energy transforms into drive and ambition rather than conflict. In my practice, I advise families not to reject a match solely on Mangal Dosha without a full chart review. Too many promising alliances have been broken by fear rather than facts. A proper digital tool should flag Mangal Dosha but also check cancellation conditions automatically. If yours does not, consider the result incomplete.
          </p>
        </div>
      </Reveal>

      <Reveal delay={360}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">8. The Role of Nakshatra and Pada in Fine-Tuning Compatibility</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The <Link to="/blogs/what-is-lagna-in-astrology" className="text-primary underline underline-offset-4 hover:opacity-80">Lagna (Ascendant)</Link> and the Moon's Nakshatra together form the foundation of any birth chart analysis. Beyond the 36 Gunas, the specific Nakshatra and Pada of the Moon reveal nuances that no aggregate score can capture. Each Nakshatra has a ruling deity, an animal symbol, and a specific energy. Two people born under the same Nakshatra but different Padas can have markedly different emotional wiring. The Pada, or quarter, determines the Nadi and modifies how the Nakshatra energy expresses itself. For example, Ashwini Nakshatra in Pada 1 is driven and healing-oriented, while Ashwini in Pada 4 is more material and structured.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When I match charts manually, I always check whether the boy's Nakshatra lord and the girl's Nakshatra lord have a friendly relationship. This is not part of the standard Ashtakoot system, but it provides an additional layer of insight. If the Nakshatra lords are enemies, the couple may experience subtle friction that neither can explain. On the other hand, if the Nakshatra lords are close friends, the couple tends to intuitively understand each other even during disagreements. A thorough matching tool should surface these details rather than hiding them behind a single percentage or score.
          </p>
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">9. Regional Differences in Kundali Matching Practices</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            One important distinction that many online tools ignore is the difference between North Indian and South Indian matching systems. The Ashtakoot system with 36 Gunas is predominantly used in North and Central India. In South India, the Dashakoot system with 10 categories and a different scoring mechanism is more common. The Dashakoot system includes factors like Dina, Ganam, and Mahendram that are not part of the standard Ashtakoot calculation. If you are from a South Indian background and using a tool built around North Indian conventions, the results may not fully reflect your traditional matching criteria.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bengali matching traditions also differ. The system used in West Bengal and Bangladesh often places greater emphasis on the Nadi and Bhakoot Kootas while treating Varna and Vashya as secondary. Some communities consider 22 out of 36 as the minimum threshold rather than 18. I have even seen families who only check four of the eight Kootas. These variations are not right or wrong, they simply reflect the diversity of Vedic astrology across regions. A good matching tool should be transparent about which system it uses and allow users to understand the assumptions behind the score.
          </p>
        </div>
      </Reveal>

      <Reveal delay={440}>
        <div className="mb-12">
          <h2 className="font-display text-2xl text-foreground mb-4">10. Practical Steps After You Get Your Kundali Matching Report</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Once you have your Guna Milan score, the next step is not to make a decision based on the number alone. Sit down with the detailed breakdown and identify which Kootas scored low. If Nadi is zero, check whether cancellation rules apply. If Bhakoot is zero, check the relationship between the Moon sign lords. If Gana is low, evaluate whether the temperament difference is something you can navigate in daily life. These conversations are far more productive than staring at a total score. Visit the <Link to="/" className="text-primary underline underline-offset-4 hover:opacity-80">AstroVaanii homepage</Link> to explore all our free astrological tools and resources.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I also recommend looking at the Navamsha chart, which is the D9 divisional chart specifically used for marriage analysis. The D9 chart reveals the quality of the marriage itself, not just the compatibility between two individuals. A strong D9 chart can compensate for a moderate Guna Milan score. Conversely, a weak D9 chart warrants caution even if the Ashtakoot score is high. If your digital tool does not include D9 analysis, consider it a starting point rather than a final verdict. True compatibility is a blend of mathematical precision and human understanding. The score gives you a map, but you still have to walk the path together. For personalized Vedic guidance beyond matching, <Link to="/signup" className="text-primary underline underline-offset-4 hover:opacity-80">sign up and chat with Vaanii</Link>, our AI astrologer trained on classical Parashara texts.
          </p>
        </div>
      </Reveal>

      <Reveal delay={480}>
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-8">
          <h2 className="font-display text-2xl text-primary mb-6">Frequently Asked Questions (FAQs) About Kundali Matching Tools</h2>
          <div className="space-y-6">
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">1. Is birth time important for accurate Kundali matching?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Yes, the exact birth time is very important for accurate Kundali matching. A person's birth time helps calculate the Ascendant (Lagna), Moon sign, planetary positions, houses, and Doshas. Even a small difference in birth time can change the Kundali analysis and matching results.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">2. Can Kundali matching be done without birth time?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Kundali matching without birth time is possible, but the accuracy may be limited. Some basic compatibility checks can be performed using birth dates and names, but detailed analysis like Manglik Dosha, Guna Milan, and planetary compatibility requires an accurate birth time.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">3. How accurate are online Kundali matching tools?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Online Kundali matching tools provide calculations based on Vedic astrology principles and the information provided by users. The accuracy depends mainly on entering the correct birth date, time, and place. Incorrect details can lead to inaccurate matching results.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">4. What details are required for Kundali matching?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">For accurate Kundali matching, you usually need: Bride's date of birth, Bride's exact birth time, Bride's birth place, Groom's date of birth, Groom's exact birth time, and Groom's birth place. These details help generate both birth charts and compare compatibility factors.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">5. What is checked in Kundali matching?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">A Kundali matching tool generally checks: Guna Milan (36-point matching), Varna compatibility, Vashya compatibility, Tara matching, Yoni matching, Graha Maitri, Gana matching, Bhakoot Dosha, Nadi Dosha, Manglik Dosha, and planetary compatibility.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">6. What is Guna Milan in Kundali matching?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Guna Milan is a traditional Vedic astrology method used to check marriage compatibility between two people. It compares eight factors (Ashtakoota) and gives a score out of 36 points. A higher score generally indicates better compatibility according to this system.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">7. How many Gunas should match for marriage?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">According to traditional astrology, a minimum of 18 out of 36 Gunas is often considered acceptable for marriage. However, astrologers also consider other factors like planetary positions, Doshas, and the overall strength of both Kundlis.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">8. Is Kundali matching possible with only date of birth?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Yes, basic matching can be done using only birth dates, but it may not provide complete results. For detailed Kundali matching, exact birth time and birth location are recommended.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">9. Does the place of birth matter in Kundali matching?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Yes, the place of birth is important because it helps calculate the exact planetary positions at the time of birth. Different locations can have different planetary calculations, which may affect the Kundali analysis.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">10. What happens if birth time is incorrect in Kundali matching?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">If the birth time is incorrect, important calculations like Lagna, house positions, Doshas, and planetary strength may change. This can affect the final Kundali matching report.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">11. Can Kundali matching predict a successful marriage?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Kundali matching is traditionally used as a tool to understand compatibility, personality traits, and possible challenges between partners. It should be considered as one factor among many when making marriage decisions.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">12. What is Manglik Dosha in Kundali matching?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Manglik Dosha is an astrological condition believed to occur when Mars is placed in certain houses of a birth chart. Many Kundali matching tools check Manglik Dosha compatibility between partners.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">13. Can Kundali matching be done online for free?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Yes, many online Kundali matching tools offer free compatibility reports. Users usually need to enter birth details to generate their matching score and analysis.</p>
            </div>
            <div className="border-b border-border/60 pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">14. Why is my Kundali matching result different on different websites?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Different websites may use different astrology software, calculations, settings, or interpretations. Differences in entered birth details, especially birth time and location, can also change the results.</p>
            </div>
            <div className="pb-6">
              <h3 className="font-display text-lg text-foreground mb-2">15. How long does it take to generate a Kundali matching report?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Most online Kundali matching tools generate a compatibility report within a few seconds after entering the required birth details.</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={520}>
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-8">
          <h2 className="font-display text-2xl text-primary mb-6">Sample Kundali Matching Report (Example Output)</h2>
          <div className="rounded-2xl border border-border bg-background/50 p-6 space-y-4 text-sm">
            <div className="text-center">
              <h3 className="font-display text-xl text-foreground mb-1">Kundali Matching Result</h3>
              <p className="text-muted-foreground">Aarav & Priya</p>
            </div>
            <div className="text-center py-4">
              <p className="text-xs text-muted-foreground mb-1">Gun Milan Score</p>
              <p className="text-4xl font-display font-bold text-primary">28<span className="text-lg text-muted-foreground"> / 36</span></p>
            </div>
            <div className="inline-block rounded-full bg-blue-100 text-blue-700 px-5 py-1.5 text-xs font-medium mx-auto">Very Good</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="border border-border/60 rounded-xl p-4">
                <p className="font-semibold text-foreground mb-2">Aarav</p>
                <p className="text-muted-foreground">Moon Rashi: Leo · Nakshatra: Magha · Pada: 1</p>
              </div>
              <div className="border border-border/60 rounded-xl p-4">
                <p className="font-semibold text-foreground mb-2">Priya</p>
                <p className="text-muted-foreground">Moon Rashi: Pisces · Nakshatra: Revati · Pada: 3</p>
              </div>
            </div>
            <div className="border-t border-border/60 pt-4 space-y-2">
              <p className="text-xs text-muted-foreground">This sample shows a typical output from the Kundali matching tool above. Your actual results will vary based on your birth details. The tool calculates each of the 8 Ashtakoot categories (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi) using Swiss Ephemeris planetary data and provides a detailed breakdown with cancellation checks for Nadi and Bhakoot Doshas.</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={560}>
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-8">
          <h2 className="font-display text-2xl text-primary mb-6">Complete FAQ: All 101 Questions About Kundali Matching</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-border/60 bg-background/50 p-4 open:shadow-sm" {...(i < 5 ? { open: true } : {})}>
                <summary className="cursor-pointer text-sm font-medium text-foreground list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
