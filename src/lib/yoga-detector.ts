interface ChartMap {
  planets?: Record<string, { name?: string; sign?: number; signName?: string; house?: number; degree?: number }>;
  planetHouseMap?: Record<string, number>;
  houseSigns?: Record<number, number>;
  houseLords?: Record<number, string>;
  houseOccupants?: Record<number, string[]>;
  ascendant?: number;
  ascendantSign?: number;
  [key: string]: unknown;
}

interface YogaResult {
  name: string;
  type: "positive" | "challenge" | "neutral";
  description: string;
  planets: string[];
  confidence: number;
}

const DEBILITY_SIGNS: Record<string, number> = {
  Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0,
};

const EXALTATION_SIGNS: Record<string, number> = {
  Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6,
};

const OWN_SIGNS: Record<string, number[]> = {
  Sun: [4], Moon: [3], Mars: [0, 7], Mercury: [2, 5],
  Jupiter: [8, 11], Venus: [1, 6], Saturn: [9, 10],
};

const KENDRA = [1, 4, 7, 10];
const TRIKONA = [1, 5, 9];
const DUSTHANA = [6, 8, 12];
const ALL_PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];

function getSignFromHouse(house: number, ascSign: number): number {
  return (ascSign + house - 1) % 12;
}

export function detectYogas(chart: ChartMap): YogaResult[] {
  const yogas: YogaResult[] = [];
  const planets = chart.planets || {};
  const houseMap = chart.planetHouseMap || {};
  const ascSign = chart.ascendantSign ?? Math.floor((chart.ascendant ?? 0) / 30);
  const houseLords = chart.houseLords || {};
  const houseOccupants = chart.houseOccupants || {};

  const getHouse = (p: string): number => {
    if (houseMap[p] !== undefined) return houseMap[p];
    return planets[p]?.house ?? 0;
  };

  const getSign = (p: string): number => {
    return planets[p]?.sign ?? getSignFromHouse(getHouse(p), ascSign);
  };

  // Gaj Kesari Yoga: Jupiter + Moon in kendra from each other or same house
  const moonHouse = getHouse("Moon");
  const jupHouse = getHouse("Jupiter");
  if (moonHouse && jupHouse) {
    const diff = Math.abs(moonHouse - jupHouse);
    if (diff === 0 || diff === 3 || diff === 6 || diff === 9) {
      yogas.push({
        name: "Gaj Kesari Yoga",
        type: "positive",
        description: "Jupiter and Moon together create wisdom, fortune, and respect.",
        planets: ["Moon", "Jupiter"],
        confidence: 75,
      });
    }
  }

  // Budh Aditya Yoga: Sun + Mercury in same house
  const sunHouse = getHouse("Sun");
  const mercHouse = getHouse("Mercury");
  if (sunHouse && mercHouse && sunHouse === mercHouse) {
    yogas.push({
      name: "Budh Aditya Yoga",
      type: "positive",
      description: "Sun and Mercury together strengthen intellect, communication, and leadership.",
      planets: ["Sun", "Mercury"],
      confidence: 80,
    });
  }

  // Raj Yoga: Kendra lord + Trikona lord in kendra/kona
  for (const k of KENDRA) {
    for (const t of TRIKONA) {
      const kLord = houseLords[k];
      const tLord = houseLords[t];
      if (!kLord || !tLord) continue;
      const kLordHouse = getHouse(kLord);
      const tLordHouse = getHouse(tLord);
      if (!kLordHouse || !tLordHouse) continue;
      if (KENDRA.includes(kLordHouse) || TRIKONA.includes(kLordHouse)) {
        if (KENDRA.includes(tLordHouse) || TRIKONA.includes(tLordHouse)) {
          yogas.push({
            name: "Raj Yoga",
            type: "positive",
            description: `Lord of house ${k} (${kLord}) and lord of house ${t} (${tLord}) create powerful success yoga.`,
            planets: [kLord, tLord],
            confidence: 70,
          });
        }
      }
    }
  }

  // Neecha Bhanga: Debilitated planet in exaltation sign of its dispositor
  for (const p of ALL_PLANETS) {
    const sign = getSign(p);
    if (DEBILITY_SIGNS[p] === sign) {
      const owningLord = houseLords[sign + 1];
      if (owningLord) {
        const ownLordHouse = getHouse(owningLord);
        if (ownLordHouse && (KENDRA.includes(ownLordHouse) || TRIKONA.includes(ownLordHouse))) {
          yogas.push({
            name: `Neecha Bhanga Raja Yoga (${p})`,
            type: "positive",
            description: `${p} is debilitated but its lord ${owningLord} is in a strong position, cancelling debility and turning it into strength.`,
            planets: [p, owningLord],
            confidence: 65,
          });
        }
      }
    }
  }

  // Vipreet Raj Yoga: Lord of dusthana in own house
  for (const d of DUSTHANA) {
    const lord = houseLords[d];
    if (!lord) continue;
    const lordHouse = getHouse(lord);
    if (lordHouse === d) {
      yogas.push({
        name: `Vipreet Raj Yoga (House ${d})`,
        type: "positive",
        description: `Lord of house ${d} (${lord}) sitting in its own house turns obstacles into opportunities.`,
        planets: [lord],
        confidence: 80,
      });
    }
  }

  // Dhana Yoga: Lord of 2nd or 11th in kendra/trikona
  for (const h of [2, 11]) {
    const lord = houseLords[h];
    if (!lord) continue;
    const lordHouse = getHouse(lord);
    if (lordHouse && (KENDRA.includes(lordHouse) || TRIKONA.includes(lordHouse))) {
      yogas.push({
        name: `Dhana Yoga (House ${h})`,
        type: "positive",
        description: `Lord of wealth house ${h} (${lord}) in a powerful position indicating financial prosperity.`,
        planets: [lord],
        confidence: 72,
      });
    }
  }

  // Kemadruma Yoga: No planets adjacent to Moon
  if (moonHouse) {
    const adjHouse1 = moonHouse === 1 ? 12 : moonHouse - 1;
    const adjHouse2 = moonHouse === 12 ? 1 : moonHouse + 1;
    const occ1 = houseOccupants[adjHouse1] || [];
    const occ2 = houseOccupants[adjHouse2] || [];
    if (occ1.length === 0 && occ2.length === 0) {
      yogas.push({
        name: "Kemadruma Yoga",
        type: "challenge",
        description: "Moon has no planetary support on either side, which may create emotional sensitivity.",
        planets: ["Moon"],
        confidence: 60,
      });
    }
  }

  // Debility check (challenge)
  for (const p of ALL_PLANETS) {
    const sign = getSign(p);
    if (DEBILITY_SIGNS[p] === sign) {
      yogas.push({
        name: `${p} Debility`,
        type: "challenge",
        description: `${p} is in its debility sign, which may weaken its significations.`,
        planets: [p],
        confidence: 70,
      });
    }
  }

  // Exaltation check (positive)
  for (const p of ALL_PLANETS) {
    const sign = getSign(p);
    if (EXALTATION_SIGNS[p] === sign) {
      yogas.push({
        name: `${p} Exaltation`,
        type: "positive",
        description: `${p} is exalted, giving exceptional strength to its significations.`,
        planets: [p],
        confidence: 85,
      });
    }
  }

  return yogas;
}
