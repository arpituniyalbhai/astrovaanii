const TOPIC_KEYWORDS: Record<string, string[]> = {
  marriage: [
    "marry", "marriage", "love", "relationship", "spouse", "partner",
    "commitment", "soulmate", "husband", "wife", "divorce", "wedding",
    "engagement", "match", "kundli milan", "relationship",
  ],
  career: [
    "job", "career", "work", "business", "promotion", "salary",
    "boss", "profession", "employment", "success", "occupation",
    "interview", "startup", "transfer", "office",
  ],
  money: [
    "money", "finance", "wealth", "rich", "income", "financial",
    "investment", "property", "luxury", "debt", "profit", "loss",
    "salary", "expensive", "loan",
  ],
  education: [
    "study", "education", "college", "exam", "degree", "learning",
    "student", "skill", "university", "school", "course", "admission",
    "result", "competitive",
  ],
  health: [
    "health", "disease", "illness", "hospital", "surgery", "fitness",
    "wellness", "medicine", "pain", "treatment", "doctor", "diet",
  ],
  travel: [
    "travel", "foreign", "abroad", "trip", "journey", "relocate",
    "move", "immigration", "visa", "tour", "vacation", "settle",
  ],
};

const TOPIC_PRIORITY = ["marriage", "career", "money", "health", "education", "travel"];

export function detectTopic(question: string): string {
  if (!question) return "general";
  const q = question.toLowerCase();

  let bestTopic = "general";
  let bestScore = 0;

  for (const topic of TOPIC_PRIORITY) {
    const keywords = TOPIC_KEYWORDS[topic];
    let score = 0;
    for (const kw of keywords) {
      if (q.includes(kw)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  return bestTopic;
}

export type Topic = keyof typeof TOPIC_KEYWORDS | "general";
