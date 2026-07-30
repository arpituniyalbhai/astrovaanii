import type { Topic } from "./topic-detection";
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

interface PlanetPosition {
  house: number;
  sign: string;
  nakshatra?: string;
  retrograde?: boolean;
}

interface InterpretationItem {
  factor: string;
  house: number;
  meaning: string;
  effect: string;
  why: string;
}

interface TimingItem {
  period: string;
  start: string;
  end: string;
  note: string;
}

interface YogaItem {
  name: string;
  type: string;
  description: string;
}

interface ReasoningOutput {
  topic: Topic;
  topicLabel: string;
  planetPositions: Record<string, PlanetPosition>;
  facts: string[];
  interpretation: InterpretationItem[];
  prediction: { summary: string; why: string[]; action: string };
  broadPrediction: { style: string; strengths: string[]; avoid: string[] };
  timing: TimingItem[];
  yogas: YogaItem[];
  memoryNote: string;
  scratchpad: string;
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

function formatHouse(h: number): string {
  return h === 1 ? "1st" : h === 2 ? "2nd" : h === 3 ? "3rd" : `${h}th`;
}

const MEANINGS: Record<string, Record<string, string>> = {
  Venus: { meaning: "Love, beauty, relationships", effect: "Attracts harmony and connection" },
  Jupiter: { meaning: "Wisdom, expansion, fortune", effect: "Brings growth and opportunity" },
  Saturn: { meaning: "Discipline, structure, patience", effect: "Delays but strengthens long-term" },
  Sun: { meaning: "Identity, authority, confidence", effect: "Builds leadership and recognition" },
  Moon: { meaning: "Emotions, mind, intuition", effect: "Shapes emotional responses" },
  Mercury: { meaning: "Communication, intellect, business", effect: "Enhances thinking and expression" },
  Mars: { meaning: "Energy, ambition, action", effect: "Drives initiative and competition" },
  Rahu: { meaning: "Obsession, foreign, innovation", effect: "Pushes toward unconventional paths" },
  Ketu: { meaning: "Detachment, spirituality, past", effect: "Creates introspection and release" },
};

function generateInterpretation(
  topic: string,
  pmap: Record<string, number>,
  houseLords: Record<string, string>,
): InterpretationItem[] {
  const items: InterpretationItem[] = [];
  const topicPlanets = TOPIC_PLANETS[topic] || TOPIC_PLANETS.general;
  const topicHouses = TOPIC_HOUSES[topic] || TOPIC_HOUSES.general;

  for (const p of topicPlanets) {
    const house = pmap[p];
    if (!house) continue;
    const meaning = MEANINGS[p]?.meaning || "";
    const effect = MEANINGS[p]?.effect || "";
    const why = `${p} occupies house ${house} in your chart, which is ${topicHouses.includes(house) ? "directly connected to " + topic : house <= 1 ? "the " + formatHouse(house) + " house" : ""}. ${p} naturally represents ${meaning.toLowerCase()}.`;

    items.push({
      factor: p,
      house,
      meaning,
      effect,
      why: why.trim(),
    });
  }

  for (const h of topicHouses) {
    const lord = houseLords[String(h)] || "";
    if (lord && !items.some((i) => i.factor === lord)) {
      items.push({
        factor: `${formatHouse(h)} house lord (${lord})`,
        house: pmap[lord] || h,
        meaning: `Governs the ${formatHouse(h)} house area of life`,
        effect: lord,
        why: `The lord of the ${formatHouse(h)} house, ${lord}, is placed in house ${pmap[lord] || h}, which influences how ${topic} unfolds in your life.`,
      });
    }
  }

  return items;
}

function generatePrediction(
  topic: string,
  pmap: Record<string, number>,
  chart: ChartMap,
  md: { planet?: string; start?: string; end?: string } | undefined,
  interpretation: InterpretationItem[],
): { summary: string; why: string[]; action: string } {
  const topicPlanets = TOPIC_PLANETS[topic] || TOPIC_PLANETS.general;
  const strongFactors = interpretation.filter((i) => topicPlanets.includes(i.factor) && (i.house === 7 || i.house === 10 || i.house === 1 || i.house === 5 || i.house === 11 || i.house === 2));
  const challenging = interpretation.filter((i) => [6, 8, 12].includes(i.house));

  let summary = "";
  const why: string[] = [];
  let action = "";

  if (topic === "marriage") {
    const venus = pmap["Venus"];
    const saturn = pmap["Saturn"];
    if (saturn === 7 || saturn === 1) {
      summary = "Marriage may come after a period of patience and personal growth. The chart supports a meaningful partnership rather than an early one.";
      why.push("Saturn in a relationship-connected house suggests maturity is needed before marriage.");
      action = "Focus on personal stability and emotional readiness rather than rushing into commitment.";
    } else if (venus && (venus === 7 || venus === 5)) {
      summary = "Relationships and romance are naturally supported. The chart indicates strong potential for a loving partnership.";
      why.push("Venus in a favorable house strengthens relationship prospects.");
      action = "Stay open to connections through social and creative spaces where you naturally shine.";
    } else {
      summary = "Relationships are a gradual building process in your chart. Steady emotional connection is more likely than instant romance.";
      action = "Invest in understanding your own emotional patterns before seeking a partner.";
    }
  } else if (topic === "career") {
    const saturn = pmap["Saturn"];
    const sun = pmap["Sun"];
    const tenthLord = chart.houseLords?.["10"] || "";
    const tenthLordHouse = pmap[tenthLord];

    if (saturn === 10 || saturn === 6) {
      summary = "Career grows through discipline and consistent effort. Your chart favors steady advancement over quick success.";
      why.push("Saturn in a career-oriented house rewards long-term commitment.");
      action = "Pick one skill to master deeply over the next few years rather than chasing multiple opportunities.";
    } else if (tenthLordHouse && [1, 5, 9, 10].includes(tenthLordHouse)) {
      summary = "Professional success comes naturally when you follow your core strengths. Leadership roles suit you.";
      why.push(`The 10th house lord (${tenthLord}) is strongly placed, supporting career authority.`);
      action = "Identify what you do better than most and build a career around that specific strength.";
    } else {
      summary = "Your career path benefits from adaptability and learning. Multiple streams of work may suit you better than one fixed role.";
      action = "Focus on building transferable skills rather than tying yourself to a single job title.";
    }
  } else if (topic === "money") {
    const jupiter = pmap["Jupiter"];
    const secondLord = chart.houseLords?.["2"] || "";
    const secondLordHouse = pmap[secondLord];

    if (jupiter && [2, 11].includes(jupiter)) {
      summary = "Financial growth is naturally supported. Wealth builds steadily through ethical means and wise decisions.";
      why.push("Jupiter in a wealth-related house favors financial expansion.");
      action = "Create a long-term savings and investment plan rather than seeking quick returns.";
    } else {
      summary = "Financial stability comes through discipline and consistent effort rather than windfalls.";
      action = "Track your expenses for one month and identify one area where you can consistently save.";
    }
  } else {
    summary = strongFactors.length > 0
      ? `Your chart shows supportive patterns in ${topic}-related areas.`
      : `Your ${topic} journey has both supportive and challenging periods.`;
    action = "Focus on what you can control today and trust the natural timing of your chart.";
  }

  if (strongFactors.length > 0) {
    why.push(`${strongFactors[0].factor} in a strong position supports positive outcomes.`);
  }
  if (challenging.length > 0) {
    why.push(`${challenging[0].factor} may create some initial friction, but this builds resilience.`);
  }

  return { summary, why: why.slice(0, 3), action };
}

function generateBroadPrediction(
  topic: string,
  pmap: Record<string, number>,
): { style: string; strengths: string[]; avoid: string[] } {
  if (topic === "career") {
    const sun = pmap["Sun"];
    const merc = pmap["Mercury"];
    const sat = pmap["Saturn"];
    const styleParts: string[] = [];
    if (merc && [3, 6, 10].includes(merc)) styleParts.push("Communication");
    if (sun && [5, 10, 1].includes(sun)) styleParts.push("Leadership");
    if (sat && [6, 10].includes(sat)) styleParts.push("Technology or Engineering");
    const style = styleParts.length > 0 ? styleParts.join(", ") + "-oriented career" : "Service or skill-based career";
    return {
      style,
      strengths: ["long-term planning", "persistence", "analytical thinking"].slice(0, 3),
      avoid: ["high-risk speculation", "frequent job changes without planning"].slice(0, 2),
    };
  }
  if (topic === "marriage") {
    const ven = pmap["Venus"];
    const jup = pmap["Jupiter"];
    const style = ven && [5, 7].includes(ven) ? "Warm and emotionally connected relationship" : "Gradual and mature partnership";
    return {
      style,
      strengths: ["emotional depth", "loyalty", "understanding"],
      avoid: ["rushing into commitment", "ignoring red flags"],
    };
  }
  if (topic === "money") {
    return {
      style: "Steady wealth building through consistent effort",
      strengths: ["discipline", "patience", "practical thinking"],
      avoid: ["high-risk speculation", "impulse spending"],
    };
  }
  return {
    style: "Balanced and thoughtful approach",
    strengths: ["self-awareness", "adaptability", "resilience"],
    avoid: ["overthinking decisions", "ignoring intuition"],
  };
}

function generateTiming(topic: string, chart: ChartMap): TimingItem[] {
  const timeline = chart.fullAntardashaTimeline || [];
  const pmap = chart.planetHouseMap || {};
  const topicPlanets = TOPIC_PLANETS[topic] || TOPIC_PLANETS.general;
  const topicHouses = TOPIC_HOUSES[topic] || TOPIC_HOUSES.general;
  const now = new Date();
  const results: TimingItem[] = [];

  for (const ad of timeline) {
    if (!ad.start || !ad.end) continue;
    const start = new Date(ad.start);
    if (start < now) continue;

    let score = 0;
    if (topicPlanets.includes(ad.planet || "")) score += 3;
    if (topicPlanets.includes(ad.mahadasha || "")) score += 1;
    const house = pmap[ad.planet || ""];
    if (house && topicHouses.includes(house)) score += 2;

    if (score >= 2) {
      results.push({
        period: `${ad.mahadasha} MD — ${ad.planet} AD`,
        start: ad.start,
        end: ad.end,
        note: score >= 4 ? "This period strongly activates this area of your chart." : "A moderately supportive period for this topic.",
      });
      if (results.length >= 2) break;
    }
  }

  return results;
}

export function generateReasoning(
  chart: ChartMap,
  topic: Topic,
  previousContext?: string,
): ReasoningOutput {
  const topicLabel = TOPIC_LABELS[topic] || TOPIC_LABELS.general;
  const topicPlanets = TOPIC_PLANETS[topic] || TOPIC_PLANETS.general;
  const pmap = chart.planetHouseMap || {};
  const planets = chart.planets || {};
  const houseLords = chart.houseLords || {};

  const planetPositions: Record<string, PlanetPosition> = {};
  const facts: string[] = [];

  for (const p of topicPlanets) {
    const pd = planets[p];
    const house = pmap[p];
    if (!house && !pd) continue;
    const pos: PlanetPosition = {
      house: house ?? pd?.house ?? 0,
      sign: pd?.signName || "",
    };
    if (pd?.nakshatraName) pos.nakshatra = pd.nakshatraName;
    if (pd?.retrograde) pos.retrograde = true;
    planetPositions[p] = pos;
    facts.push(`${p} is in House ${pos.house}${pos.sign ? ` in ${pos.sign}` : ""}${pos.retrograde ? " (retrograde)" : ""}.`);
  }

  if (chart.ascendantSignName) {
    facts.push(`Ascendant is in ${chart.ascendantSignName}.`);
  }

  const md = chart.mahadasha;
  if (md?.planet) {
    facts.push(`Current Mahadasha: ${md.planet}${md.start ? ` (${md.start} to ${md.end})` : ""}.`);
  }
  const ad = chart.antardasha;
  if (ad?.planet) {
    facts.push(`Current Antardasha: ${ad.planet}${ad.start ? ` (${ad.start} to ${ad.end})` : ""}.`);
  }

  const interpretation = generateInterpretation(topic, pmap, houseLords);
  const prediction = generatePrediction(topic, pmap, chart, md, interpretation);
  const broadPrediction = generateBroadPrediction(topic, pmap);
  const timing = generateTiming(topic, chart);

  const detectedYogas = detectYogas(chart);
  const relevantYogas = detectedYogas.filter((y) =>
    y.planets.some((yp) => topicPlanets.includes(yp)) || y.type === "challenge",
  ).slice(0, 3).map((y) => ({
    name: y.name,
    type: y.type,
    description: y.description,
  }));

  const already = previousContext ? previousContext.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const memoryItems = [
    ...facts.slice(0, 2).map((f) => f.split(" is")[0] || f.split(".")[0]),
    ...timing.slice(0, 1).map((t) => t.period),
  ].filter(Boolean);
  const allDiscussed = [...new Set([...already, ...memoryItems])];

  const scratchpad = [
    `Topic: ${topicLabel}`,
    ``,
    `Prediction: ${prediction.summary}`,
    ``,
    `Why:`,
    ...prediction.why.slice(0, 2).map((w) => `- ${w}`),
    ``,
    `Action: ${prediction.action}`,
    ``,
    `Style: ${broadPrediction.style}`,
    `Strengths: ${broadPrediction.strengths.join(", ")}`,
    `Avoid: ${broadPrediction.avoid.join(", ")}`,
    ``,
    relevantYogas.length ? `Yogas: ${relevantYogas.map((y) => y.name).join(", ")}` : "",
    timing.length ? `Timing: ${timing[0].period} (${timing[0].start} to ${timing[0].end})` : "",
    ``,
    allDiscussed.length ? `Already discussed: ${allDiscussed.join(", ")}. Build on it.` : "",
    ``,
    `Response: Answer → Why → Practical action. One paragraph. Max 90 words. Same language as user. Make it feel unique, not templated.`,
  ].join("\n");

  return {
    topic,
    topicLabel,
    planetPositions,
    facts,
    interpretation,
    prediction,
    broadPrediction,
    timing,
    yogas: relevantYogas,
    memoryNote: allDiscussed.join(", "),
    scratchpad,
  };
}
