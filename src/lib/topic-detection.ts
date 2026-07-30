// topic-detection.ts

export type Topic =
  | "marriage"
  | "career"
  | "money"
  | "education"
  | "health"
  | "travel"
  | "general";

export interface WeightedTopic {
  topic: Topic;
  weight: number;
}

export interface IntentResult {
  topics: WeightedTopic[];
  wantsTiming: boolean;
}

interface KeywordConfig {
  keywords: string[];
  weight?: number;
}

const TOPIC_KEYWORDS: Record<Topic, KeywordConfig> = {
  marriage: {
    keywords: [
      "marry",
      "marriage",
      "shaadi",
      "shadi",
      "love",
      "relationship",
      "partner",
      "wife",
      "husband",
      "girlfriend",
      "boyfriend",
      "engagement",
      "wedding",
      "pyar",
      "soulmate",
      "divorce",
      "kundli milan",
      "compatibility",
    ],
    weight: 1,
  },

  career: {
    keywords: [
      "career",
      "job",
      "kaam",
      "naukri",
      "rojgar",
      "work",
      "office",
      "business",
      "startup",
      "promotion",
      "boss",
      "salary",
      "profession",
      "employment",
      "interview",
      "joining",
      "transfer",
      "success",
    ],
    weight: 1,
  },

  money: {
    keywords: [
      "money",
      "paisa",
      "wealth",
      "finance",
      "financial",
      "income",
      "rich",
      "profit",
      "loss",
      "loan",
      "investment",
      "property",
      "luxury",
      "asset",
      "cash",
    ],
    weight: 1,
  },

  education: {
    keywords: [
      "study",
      "studies",
      "education",
      "college",
      "school",
      "student",
      "exam",
      "competitive",
      "upsc",
      "jee",
      "neet",
      "course",
      "degree",
      "learning",
      "admission",
      "result",
      "university",
    ],
    weight: 1,
  },

  health: {
    keywords: [
      "health",
      "fitness",
      "doctor",
      "hospital",
      "disease",
      "illness",
      "pain",
      "medicine",
      "surgery",
      "diet",
      "wellness",
      "treatment",
    ],
    weight: 1,
  },

  travel: {
    keywords: [
      "travel",
      "trip",
      "journey",
      "foreign",
      "abroad",
      "visa",
      "move",
      "shift",
      "immigration",
      "tour",
      "vacation",
      "settle",
      "overseas",
    ],
    weight: 1,
  },

  general: {
    keywords: [
      "future",
      "life",
      "destiny",
      "bhavishya",
      "future life",
      "overall",
    ],
    weight: 0.5,
  },
};

const TIMING_REGEX =
  /\b(when|kab|timing|next|future|year|month|date|kis saal|kitne time|kab tak)\b/i;

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keywordExists(text: string, keyword: string): boolean {
  const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");
  return regex.test(text);
}

export function detectIntent(question: string): IntentResult {
  if (!question?.trim()) {
    return {
      topics: [{ topic: "general", weight: 1 }],
      wantsTiming: false,
    };
  }

  const q = question.toLowerCase();

  const scores: WeightedTopic[] = [];

  for (const [topic, config] of Object.entries(TOPIC_KEYWORDS)) {
    let score = 0;

    for (const keyword of config.keywords) {
      if (keywordExists(q, keyword)) {
        score += config.weight ?? 1;
      }
    }

    if (score > 0) {
      scores.push({
        topic: topic as Topic,
        weight: score,
      });
    }
  }

  if (scores.length === 0) {
    scores.push({
      topic: "general",
      weight: 1,
    });
  }

  scores.sort((a, b) => b.weight - a.weight);

  const total = scores.reduce((sum, t) => sum + t.weight, 0);

  const normalized = scores.map((t) => ({
    topic: t.topic,
    weight: Number((t.weight / total).toFixed(2)),
  }));

  return {
    topics: normalized.slice(0, 2),
    wantsTiming: TIMING_REGEX.test(q),
  };
}