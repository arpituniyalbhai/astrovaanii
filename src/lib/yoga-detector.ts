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

const SIGN_LORDS: Record<number, string> = {
  0: "Mars", 1: "Venus", 2: "Mercury", 3: "Moon",
  4: "Sun", 5: "Mercury", 6: "Venus", 7: "Mars",
  8: "Jupiter", 9: "Saturn", 10: "Saturn", 11: "Jupiter",
};

const KENDRA = [1, 4, 7, 10];
const TRIKONA = [1, 5, 9];
const DUSTHANA = [6, 8, 12];
const ALL_PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];

function getSignFromHouse(house: number, ascSign: number): number {
  return (ascSign + house - 1) % 12;
}

function houseFrom(referenceHouse: number, targetHouse: number): number {
  return ((targetHouse - referenceHouse + 12) % 12) + 1;
}

function isKendraFrom(referenceHouse: number, targetHouse: number): boolean {
  if (referenceHouse < 1 || targetHouse < 1) return false;
  return KENDRA.includes(houseFrom(referenceHouse, targetHouse));
}

export function detectYogas(chart: ChartMap): YogaResult[] {
  const yogas: YogaResult[] = [];
  const planets = chart.planets || {};
  const houseMap = chart.planetHouseMap || {};
  const ascSign = chart.ascendantSign ?? Math.floor((chart.ascendant ?? 0) / 30);
  const houseLords = chart.houseLords || {};

  const getHouse = (p: string): number => {
    if (houseMap[p] !== undefined) return houseMap[p];
    return planets[p]?.house ?? 0;
  };

  const getSign = (p: string): number => {
    return planets[p]?.sign ?? getSignFromHouse(getHouse(p), ascSign);
  };

  // Phaladeepika 6.14: Moon and Jupiter in mutual kendras (1/4/7/10).
  const moonHouse = getHouse("Moon");
  const jupHouse = getHouse("Jupiter");
  if (moonHouse && jupHouse && isKendraFrom(moonHouse, jupHouse)) {
    yogas.push({
      name: "Gaj Kesari Yoga",
      type: "positive",
      description: "Jupiter is in a kendra from the Moon; the yoga's strength still depends on dignity and affliction.",
      planets: ["Moon", "Jupiter"],
      confidence: 75,
    });
  }

  // Budh Aditya Yoga: Sun + Mercury in same house
  const sunHouse = getHouse("Sun");
  const mercHouse = getHouse("Mercury");
  if (sunHouse && mercHouse && sunHouse === mercHouse) {
    yogas.push({
      name: "Budh Aditya Yoga",
      type: "positive",
      description: "Sun and Mercury occupy the same house; dignity, combustion, and affliction determine the yoga's strength.",
      planets: ["Sun", "Mercury"],
      confidence: 80,
    });
  }

  // BPHS 34: a Kendra lord and Trikona lord must have an actual sambandha.
  // We recognize conjunction, exchange, mutual 7th aspect, or occupation of
  // one another's house; merely being in two good houses is not sufficient.
  const seenRajaYogaPairs = new Set<string>();
  for (const k of KENDRA) {
    for (const t of TRIKONA) {
      const kLord = houseLords[k];
      const tLord = houseLords[t];
      if (!kLord || !tLord || kLord === tLord) continue;
      const kLordHouse = getHouse(kLord);
      const tLordHouse = getHouse(tLord);
      if (!kLordHouse || !tLordHouse) continue;

      const conjunct = kLordHouse === tLordHouse;
      const exchanged = kLordHouse === t && tLordHouse === k;
      const mutualSeventhAspect = houseFrom(kLordHouse, tLordHouse) === 7;
      const occupiesOtherLordsHouse = kLordHouse === t || tLordHouse === k;
      if (!conjunct && !exchanged && !mutualSeventhAspect && !occupiesOtherLordsHouse) continue;

      const pairKey = [kLord, tLord].sort().join("-");
      if (seenRajaYogaPairs.has(pairKey)) continue;
      seenRajaYogaPairs.add(pairKey);
      const relationship = exchanged
        ? "exchange houses"
        : conjunct
          ? `are conjunct in house ${kLordHouse}`
          : mutualSeventhAspect
            ? "are in mutual seventh-house aspect"
            : "occupy one another's Kendra/Trikona domain";
      yogas.push({
        name: "Kendra-Trikona Raja Yoga",
        type: "positive",
        description: `Lord of house ${k} (${kLord}) and lord of house ${t} (${tLord}) ${relationship}.`,
        planets: [kLord, tLord],
        confidence: 72,
      });
    }
  }

  // Classical Neecha Bhanga: the lord of the debilitation sign, or the lord of
  // the planet's exaltation sign, is in a kendra from Lagna or the Moon.
  for (const p of ALL_PLANETS) {
    const sign = getSign(p);
    if (DEBILITY_SIGNS[p] === sign) {
      const debilityLord = SIGN_LORDS[sign];
      const exaltationLord = SIGN_LORDS[EXALTATION_SIGNS[p]];
      const cancellationLords = [...new Set([debilityLord, exaltationLord])].filter(Boolean);
      const qualifyingLord = cancellationLords.find((lord) => {
        const lordHouse = getHouse(lord);
        return lordHouse && (
          KENDRA.includes(lordHouse) ||
          (moonHouse > 0 && isKendraFrom(moonHouse, lordHouse))
        );
      });
      if (qualifyingLord) {
        yogas.push({
          name: `Neecha Bhanga Yoga (${p})`,
          type: "neutral",
          description: `${p}'s debility has a classical cancellation condition through ${qualifyingLord}; cancellation does not automatically make the planet exceptionally strong.`,
          planets: [...new Set([p, qualifyingLord])],
          confidence: 70,
        });
      }
    }
  }

  // Phaladeepika Ch. 6: Harsha, Sarala and Vimala are keyed to occupancy of
  // the 6th, 8th and 12th respectively by any lord of 6/8/12.
  const viparitaNames: Record<number, string> = { 6: "Harsha", 8: "Sarala", 12: "Vimala" };
  for (const targetHouse of DUSTHANA) {
    const qualifyingLords = DUSTHANA
      .map((sourceHouse) => ({ sourceHouse, lord: houseLords[sourceHouse] }))
      .filter(({ lord }) => lord && getHouse(lord) === targetHouse);
    if (qualifyingLords.length > 0) {
      const sourceHouses = qualifyingLords.map(({ sourceHouse }) => sourceHouse).join(", ");
      const yogaPlanets = [...new Set(qualifyingLords.map(({ lord }) => lord!))];
      yogas.push({
        name: `${viparitaNames[targetHouse]} Yoga`,
        type: "positive",
        description: `Lord${qualifyingLords.length > 1 ? "s" : ""} of dusthana house${qualifyingLords.length > 1 ? "s" : ""} ${sourceHouses} (${yogaPlanets.join(", ")}) ${qualifyingLords.length > 1 ? "occupy" : "occupies"} house ${targetHouse}.`,
        planets: yogaPlanets,
        confidence: 75,
      });
    }
  }

  // Strict wealth-house Dhana Yoga: require a direct 2nd/11th lord sambandha.
  // A generic benefic (for example Venus) in the 10th never qualifies by itself.
  const secondLord = houseLords[2];
  const eleventhLord = houseLords[11];
  if (secondLord && eleventhLord) {
    const secondLordHouse = getHouse(secondLord);
    const eleventhLordHouse = getHouse(eleventhLord);
    const sameLord = secondLord === eleventhLord;
    const conjunct = !sameLord && secondLordHouse > 0 && secondLordHouse === eleventhLordHouse;
    const exchanged = secondLordHouse === 11 && eleventhLordHouse === 2;
    const mutualSeventhAspect = !sameLord && secondLordHouse > 0 && eleventhLordHouse > 0 && houseFrom(secondLordHouse, eleventhLordHouse) === 7;
    const placedInOtherWealthHouse = secondLordHouse === 11 || eleventhLordHouse === 2;
    const sameLordStronglyPlaced = sameLord && [2, 11].includes(secondLordHouse);

    if (conjunct || exchanged || mutualSeventhAspect || placedInOtherWealthHouse || sameLordStronglyPlaced) {
      const relationship = exchanged
        ? "exchange the 2nd and 11th houses"
        : conjunct
          ? `are conjunct in house ${secondLordHouse}`
          : mutualSeventhAspect
            ? "are in mutual seventh-house aspect"
            : sameLord
              ? `is placed in wealth house ${secondLordHouse}`
              : "connect the 2nd and 11th wealth houses";
      yogas.push({
        name: "Dhana Yoga (2nd–11th Connection)",
        type: "positive",
        description: `The 2nd lord (${secondLord}) and 11th lord (${eleventhLord}) ${relationship}.`,
        planets: [...new Set([secondLord, eleventhLord])],
        confidence: 78,
      });
    }
  }

  // Phaladeepika 6.5 / Brihat Jataka 13.3: no planet other than the Sun in
  // the 2nd or 12th from Moon, subject to the stated kendra/conjunction cancellations.
  if (moonHouse) {
    const adjHouse1 = moonHouse === 1 ? 12 : moonHouse - 1;
    const adjHouse2 = moonHouse === 12 ? 1 : moonHouse + 1;
    const supportingPlanets = ["Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
    const hasAdjacentSupport = supportingPlanets.some((planet) =>
      [adjHouse1, adjHouse2].includes(getHouse(planet)),
    );
    const moonConjunctPlanet = supportingPlanets.some((planet) => getHouse(planet) === moonHouse);
    const planetInKendraFromMoon = supportingPlanets.some((planet) =>
      isKendraFrom(moonHouse, getHouse(planet)),
    );
    const moonInKendraFromLagna = KENDRA.includes(moonHouse);

    if (!hasAdjacentSupport && !moonConjunctPlanet && !planetInKendraFromMoon && !moonInKendraFromLagna) {
      yogas.push({
        name: "Kemadruma Yoga",
        type: "challenge",
        description: "No eligible planet supports the Moon from the 2nd, 12th, conjunction, or a lunar kendra, and the Moon is not in a Lagna kendra.",
        planets: ["Moon"],
        confidence: 75,
      });
    }
  }

  return yogas;
}
