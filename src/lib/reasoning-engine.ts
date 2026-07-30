import type { WeightedTopic } from "./topic-detection";
import { detectYogas } from "./yoga-detector";

interface ChartMap {
  planets?: Record<string, {
    name?: string; signName?: string; house?: number; degree?: number;
    nakshatraName?: string; pada?: number; retrograde?: boolean;
  }>;
  planetHouseMap?: Record<string, number>;
  houseSignNames?: Record<string, string>;
  houseLords?: Record<string, string>;
  houseOccupants?: Record<string, string[]>;
  mahadasha?: { planet?: string; start?: string; end?: string };
  antardasha?: { planet?: string; start?: string; end?: string };
  fullAntardashaTimeline?: { mahadasha?: string; planet?: string; start?: string; end?: string }[];
  nakshatraName?: string; pada?: number; nakshatraLord?: string;
  ascendantSignName?: string; ascendantDegree?: number;
  ascendant?: number; ascendantSign?: number;
  [key: string]: unknown;
}

interface EvidenceItem {
  factor: string;
  house: number;
  relevance: number;
  explanation: string;
}

interface TimingItem {
  period: string;
  start: string;
  end: string;
  note: string;
}

interface ReasoningOutput {
  topic: string;
  topicLabel: string;
  evidence: EvidenceItem[];
  timing: TimingItem | null;
  yogaInfo: string | null;
  memoryNote: string;
}

const ALL_PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

const TOPIC_PLANETS: Record<string, string[]> = {
  marriage: ["Venus", "Jupiter", "Moon", "Sun", "Saturn"],
  career: ["Saturn", "Sun", "Mercury", "Jupiter", "Mars"],
  money: ["Jupiter", "Venus", "Saturn", "Sun"],
  education: ["Mercury", "Jupiter", "Moon", "Sun"],
  health: ["Mars", "Saturn", "Sun", "Moon"],
  travel: ["Rahu", "Jupiter", "Saturn", "Moon"],
  general: ["Sun", "Moon", "Jupiter", "Mercury", "Venus"],
};

const TOPIC_HOUSES: Record<string, number[]> = {
  marriage: [7, 5, 1],
  career: [10, 6, 2],
  money: [2, 11, 5],
  education: [4, 5, 1],
  health: [6, 8, 1],
  travel: [12, 3, 9],
  general: [1, 10, 7, 4],
};

const TOPIC_LABELS: Record<string, string> = {
  marriage: "Love & Relationships",
  career: "Career & Profession",
  money: "Finance & Wealth",
  education: "Education & Learning",
  health: "Health & Wellness",
  travel: "Travel & Foreign",
  general: "General Life",
};

const EXPLANATIONS: Record<string, Record<string, string>> = {
  Venus: { marriage: "Supports love and relationship harmony", career: "Supports creative fields and partnerships", money: "Supports financial growth through luxury and arts", education: "Supports learning through creative subjects", health: "Supports hormonal and reproductive health", travel: "Supports pleasure travel", general: "Supports harmony and connection" },
  Jupiter: { marriage: "Supports a wise and fortunate partnership", career: "Supports growth in teaching, law, or finance", money: "Supports wealth through ethical means", education: "Supports higher learning and wisdom", health: "Supports overall vitality and healing", travel: "Supports pilgrimage and long journeys", general: "Supports expansion and good fortune" },
  Saturn: { marriage: "Delays but strengthens marriage commitment", career: "Supports disciplined career growth", money: "Supports slow but steady wealth building", education: "Supports structured learning", health: "May create chronic conditions that build resilience", travel: "Supports career-related travel", general: "Builds long-term discipline" },
  Sun: { marriage: "Supports confidence in relationships", career: "Supports leadership and authority", money: "Supports financial independence", education: "Supports focus and recognition", health: "Supports vitality and bone health", travel: "Supports travel for recognition", general: "Supports confidence and identity" },
  Moon: { marriage: "Shapes emotional needs in relationships", career: "Supports careers involving people or emotions", money: "Supports income through fluctuating sources", education: "Supports memory and intuitive learning", health: "Supports mental and emotional wellness", travel: "Supports emotionally meaningful travel", general: "Shapes emotional patterns" },
  Mercury: { marriage: "Supports communication in relationships", career: "Supports business, writing, and analytical roles", money: "Supports income through communication", education: "Supports intellect and quick learning", health: "Supports nervous system health", travel: "Supports short trips and business travel", general: "Enhances thinking and expression" },
  Mars: { marriage: "Brings passion but may need patience", career: "Supports competitive and leadership roles", money: "Supports aggressive wealth building", education: "Supports competitive exam success", health: "Supports energy and physical strength", travel: "Supports adventurous travel", general: "Drives initiative and ambition" },
  Rahu: { marriage: "Creates unconventional relationship patterns", career: "Supports innovation and foreign careers", money: "Supports unusual or foreign income sources", education: "Supports research and technical fields", health: "May create stress-related issues", travel: "Strongly supports foreign travel", general: "Pushes toward unconventional paths" },
  Ketu: { marriage: "Creates need for spiritual compatibility", career: "Supports research and spiritual careers", money: "Creates detachment from material wealth", education: "Supports deep philosophical study", health: "Supports spiritual healing", travel: "Supports spiritual travel", general: "Creates introspection and release" },
};

function computeRelevance(planet: string, topic: string, house: number): number {
  const topicPlanets = TOPIC_PLANETS[topic] || TOPIC_PLANETS.general;
  const topicHouses = TOPIC_HOUSES[topic] || TOPIC_HOUSES.general;

  let score = 0;
  if (topicPlanets.includes(planet)) score += 0.4;
  if (topicHouses.includes(house)) score += 0.4;

  const strongHouses = [1, 5, 7, 9, 10];
  if (strongHouses.includes(house)) score += 0.15;

  const weakHouses = [6, 8, 12];
  if (weakHouses.includes(house)) score -= 0.1;

  return Math.min(1, Math.max(0.1, score));
}

export function generateReasoning(
  chart: ChartMap,
  topics: WeightedTopic[],
  previousContext?: string,
): ReasoningOutput {
  const primaryTopic = topics[0]?.topic || "general";
  const topicLabel = TOPIC_LABELS[primaryTopic] || TOPIC_LABELS.general;
  const pmap = chart.planetHouseMap || {};
  const planets = chart.planets || {};

  const evidenceMap = new Map<string, EvidenceItem>();

  for (const wt of topics) {
    const topicPlanets = TOPIC_PLANETS[wt.topic] || TOPIC_PLANETS.general;

    for (const p of topicPlanets) {
      const pd = planets[p];
      const house = pmap[p];
      if (!house && !pd) continue;
      const h = house ?? pd?.house ?? 0;
      if (h === 0) continue;

      const explanation = EXPLANATIONS[p]?.[wt.topic] || EXPLANATIONS[p]?.general || `${p} influences this area`;
      const relevance = computeRelevance(p, wt.topic, h) * wt.weight;

      const existing = evidenceMap.get(p);
      if (existing) {
        if (relevance > existing.relevance) {
          evidenceMap.set(p, { factor: p, house: h, relevance, explanation });
        }
      } else {
        evidenceMap.set(p, { factor: p, house: h, relevance, explanation });
      }
    }
  }

  const evidence = Array.from(evidenceMap.values())
    .sort((a, b) => b.relevance - a.relevance);

  const topicPlanets = TOPIC_PLANETS[primaryTopic] || TOPIC_PLANETS.general;
  const timeline = chart.fullAntardashaTimeline || [];
  const now = new Date();
  let timing: TimingItem | null = null;

  for (const ad of timeline) {
    if (!ad.start || !ad.end) continue;
    const start = new Date(ad.start);
    if (start < now) continue;

    let score = 0;
    if (topicPlanets.includes(ad.planet || "")) score += 3;
    if (topicPlanets.includes(ad.mahadasha || "")) score += 1;
    const house = pmap[ad.planet || ""];
    if (house && (TOPIC_HOUSES[primaryTopic] || TOPIC_HOUSES.general).includes(house)) score += 2;

    if (score >= 2) {
      timing = {
        period: `${ad.mahadasha} MD — ${ad.planet} AD`,
        start: ad.start,
        end: ad.end,
        note: score >= 4 ? "This period strongly activates this area." : "A moderately supportive period.",
      };
      break;
    }
  }

  const detectedYogas = detectYogas(chart);
  const relevantYogas = detectedYogas
    .filter((y) => y.planets.some((yp) => topicPlanets.includes(yp)))
    .slice(0, 2);

  let yogaInfo: string | null = null;
  if (relevantYogas.length > 0) {
    yogaInfo = relevantYogas.map((y) => `${y.name}: ${y.description}`).join("\n");
  }

  const already = previousContext ? previousContext.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const memoryItems = evidence.slice(0, 2).map((e) => e.factor);
  if (timing) memoryItems.push(timing.period);
  const allDiscussed = [...new Set([...already, ...memoryItems])];

  return {
    topic: primaryTopic,
    topicLabel,
    evidence,
    timing,
    yogaInfo,
    memoryNote: allDiscussed.join(", "),
  };
}
