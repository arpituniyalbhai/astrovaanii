export interface PersonData {
  name: string;
  moonRashi: number;
  nakshatra: number;
  nakshatraPada: number;
}

export interface KootaDetail {
  obtained: number;
  max: number;
  description: string;
}

export interface MatchingResult {
  total: number;
  details: {
    varna: KootaDetail;
    vashya: KootaDetail;
    tara: KootaDetail;
    yoni: KootaDetail;
    grahaMaitri: KootaDetail;
    gana: KootaDetail;
    bhakoot: KootaDetail;
    nadi: KootaDetail;
  };
  compatibility: "Excellent" | "Good" | "Average" | "Poor";
  message: string;
}

const SIGN_NAMES = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const NAKSHATRA_NAMES = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
  "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra",
  "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula",
  "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const RASHI_VARNA: Record<number, string> = {
  0: "Kshatriya", 1: "Vaishya", 2: "Shudra", 3: "Brahmin",
  4: "Kshatriya", 5: "Vaishya", 6: "Shudra", 7: "Brahmin",
  8: "Kshatriya", 9: "Vaishya", 10: "Shudra", 11: "Brahmin",
};

const RASHI_VASHYA: Record<number, string> = {
  0: "Chatushpada", 1: "Chatushpada", 2: "Manava", 3: "Jalachara",
  4: "Vanachara", 5: "Keeta", 6: "Manava", 7: "Keeta",
  8: "Chatushpada", 9: "Jalachara", 10: "Manava", 11: "Jalachara",
};

const NAKSHATRA_GANA: Record<number, string> = {
  0: "Deva", 1: "Manushya", 2: "Rakshasa", 3: "Manushya", 4: "Deva",
  5: "Manushya", 6: "Deva", 7: "Deva", 8: "Rakshasa", 9: "Rakshasa",
  10: "Manushya", 11: "Manushya", 12: "Deva", 13: "Deva", 14: "Deva",
  15: "Rakshasa", 16: "Deva", 17: "Rakshasa", 18: "Rakshasa", 19: "Manushya",
  20: "Manushya", 21: "Deva", 22: "Manushya", 23: "Rakshasa",
  24: "Deva", 25: "Deva", 26: "Deva",
};

const NAKSHATRA_YONI: Record<number, { animal: string; gender: string }> = {
  0: { animal: "Horse", gender: "Male" },
  1: { animal: "Elephant", gender: "Male" },
  2: { animal: "Goat", gender: "Female" },
  3: { animal: "Serpent", gender: "Male" },
  4: { animal: "Serpent", gender: "Female" },
  5: { animal: "Dog", gender: "Female" },
  6: { animal: "Cat", gender: "Female" },
  7: { animal: "Goat", gender: "Male" },
  8: { animal: "Cat", gender: "Male" },
  9: { animal: "Rat", gender: "Male" },
  10: { animal: "Rat", gender: "Female" },
  11: { animal: "Cow", gender: "Male" },
  12: { animal: "Buffalo", gender: "Female" },
  13: { animal: "Tiger", gender: "Female" },
  14: { animal: "Buffalo", gender: "Male" },
  15: { animal: "Tiger", gender: "Male" },
  16: { animal: "Hare", gender: "Female" },
  17: { animal: "Hare", gender: "Male" },
  18: { animal: "Dog", gender: "Male" },
  19: { animal: "Monkey", gender: "Male" },
  20: { animal: "Mongoose", gender: "Female" },
  21: { animal: "Monkey", gender: "Female" },
  22: { animal: "Lion", gender: "Male" },
  23: { animal: "Horse", gender: "Female" },
  24: { animal: "Lion", gender: "Female" },
  25: { animal: "Cow", gender: "Female" },
  26: { animal: "Elephant", gender: "Female" },
};

const YONI_FRIENDSHIP: Record<string, Record<string, string>> = {
  "Horse": { "Horse": "same", "Buffalo": "friend", "Elephant": "neutral", "Lion": "neutral", "Goat": "neutral", "Cow": "neutral", "Serpent": "neutral", "Rat": "neutral", "Dog": "neutral", "Cat": "enemy", "Tiger": "neutral", "Hare": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
  "Elephant": { "Elephant": "same", "Lion": "friend", "Horse": "neutral", "Buffalo": "neutral", "Goat": "neutral", "Cow": "neutral", "Serpent": "neutral", "Rat": "neutral", "Dog": "neutral", "Cat": "neutral", "Tiger": "neutral", "Hare": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
  "Goat": { "Goat": "same", "Cow": "friend", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "neutral", "Serpent": "enemy", "Rat": "neutral", "Dog": "neutral", "Cat": "neutral", "Tiger": "neutral", "Hare": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
  "Cow": { "Cow": "same", "Goat": "friend", "Tiger": "enemy", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "neutral", "Serpent": "neutral", "Rat": "neutral", "Dog": "neutral", "Cat": "neutral", "Hare": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
  "Serpent": { "Serpent": "same", "Rat": "enemy", "Mongoose": "enemy", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "neutral", "Goat": "enemy", "Cow": "neutral", "Dog": "neutral", "Cat": "neutral", "Tiger": "neutral", "Hare": "neutral", "Monkey": "neutral" },
  "Dog": { "Dog": "same", "Cat": "enemy", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "neutral", "Goat": "neutral", "Cow": "neutral", "Serpent": "neutral", "Rat": "neutral", "Tiger": "neutral", "Hare": "friend", "Monkey": "neutral", "Mongoose": "neutral" },
  "Cat": { "Cat": "same", "Dog": "enemy", "Rat": "enemy", "Hare": "enemy", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "neutral", "Goat": "neutral", "Cow": "neutral", "Serpent": "neutral", "Tiger": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
  "Rat": { "Rat": "same", "Cat": "enemy", "Serpent": "enemy", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "neutral", "Goat": "neutral", "Cow": "neutral", "Dog": "neutral", "Tiger": "neutral", "Hare": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
  "Tiger": { "Tiger": "same", "Cow": "enemy", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "friend", "Goat": "neutral", "Serpent": "neutral", "Rat": "neutral", "Dog": "neutral", "Cat": "neutral", "Hare": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
  "Hare": { "Hare": "same", "Cat": "enemy", "Dog": "friend", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "neutral", "Goat": "neutral", "Cow": "neutral", "Serpent": "neutral", "Rat": "neutral", "Tiger": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
  "Monkey": { "Monkey": "same", "Mongoose": "friend", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "neutral", "Goat": "neutral", "Cow": "neutral", "Serpent": "neutral", "Rat": "neutral", "Dog": "neutral", "Cat": "neutral", "Tiger": "neutral", "Hare": "neutral" },
  "Mongoose": { "Mongoose": "same", "Serpent": "enemy", "Monkey": "friend", "Horse": "neutral", "Buffalo": "neutral", "Elephant": "neutral", "Lion": "neutral", "Goat": "neutral", "Cow": "neutral", "Dog": "neutral", "Cat": "neutral", "Tiger": "neutral", "Hare": "neutral", "Rat": "neutral" },
  "Lion": { "Lion": "same", "Elephant": "friend", "Tiger": "friend", "Horse": "neutral", "Buffalo": "neutral", "Goat": "neutral", "Cow": "neutral", "Serpent": "neutral", "Rat": "neutral", "Dog": "neutral", "Cat": "neutral", "Hare": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
  "Buffalo": { "Buffalo": "same", "Horse": "friend", "Elephant": "neutral", "Lion": "neutral", "Goat": "neutral", "Cow": "neutral", "Serpent": "neutral", "Rat": "neutral", "Dog": "neutral", "Cat": "neutral", "Tiger": "neutral", "Hare": "neutral", "Monkey": "neutral", "Mongoose": "neutral" },
};

const PLANET_LORDS_BY_SIGN: Record<number, string> = {
  0: "Mars", 1: "Venus", 2: "Mercury", 3: "Moon",
  4: "Sun", 5: "Mercury", 6: "Venus", 7: "Mars",
  8: "Jupiter", 9: "Saturn", 10: "Saturn", 11: "Jupiter",
};

const PLANET_FRIENDS: Record<string, { friends: string[]; neutrals: string[]; enemies: string[] }> = {
  Sun: { friends: ["Moon", "Mars", "Jupiter"], neutrals: ["Mercury"], enemies: ["Venus", "Saturn"] },
  Moon: { friends: ["Sun", "Mercury"], neutrals: ["Mars", "Jupiter", "Venus", "Saturn"], enemies: [] },
  Mars: { friends: ["Sun", "Moon", "Jupiter"], neutrals: ["Venus", "Saturn"], enemies: ["Mercury"] },
  Mercury: { friends: ["Sun", "Venus"], neutrals: ["Mars", "Jupiter", "Saturn"], enemies: ["Moon"] },
  Jupiter: { friends: ["Sun", "Moon", "Mars"], neutrals: ["Mercury", "Venus", "Saturn"], enemies: [] },
  Venus: { friends: ["Mercury", "Saturn"], neutrals: ["Mars", "Jupiter"], enemies: ["Sun", "Moon"] },
  Saturn: { friends: ["Mercury", "Venus"], neutrals: ["Mars", "Jupiter"], enemies: ["Sun", "Moon"] },
};

const NAKSHATRA_NADI: Record<number, number> = {
  0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1,
  9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2,
  18: 3, 19: 3, 20: 3, 21: 3, 22: 3, 23: 3, 24: 3, 25: 3, 26: 3,
};

function calculateVarna(boy: PersonData, girl: PersonData): KootaDetail {
  const b = RASHI_VARNA[boy.moonRashi];
  const g = RASHI_VARNA[girl.moonRashi];
  const obtained = b === g ? 1 : 0;
  return { obtained, max: 1, description: `${b} & ${g} — ${obtained === 1 ? "Same varna" : "Different varna"}` };
}

function calculateVashya(boy: PersonData, girl: PersonData): KootaDetail {
  const b = RASHI_VASHYA[boy.moonRashi];
  const g = RASHI_VASHYA[girl.moonRashi];
  const obtained = b === g ? 2 : 0;
  return { obtained, max: 2, description: `${b} & ${g} — ${obtained === 2 ? "Compatible" : "Not compatible"}` };
}

function calculateTara(boy: PersonData, girl: PersonData): KootaDetail {
  const diff = (girl.nakshatra - boy.nakshatra + 27) % 27;
  const remainder = (diff % 9) + 1;
  const favorable = [1, 2, 4, 6, 8].includes(remainder);
  const obtained = favorable ? 3 : 0;
  return { obtained, max: 3, description: `Tara ${remainder} — ${obtained === 3 ? "Favorable" : "Unfavorable"}` };
}

function calculateYoni(boy: PersonData, girl: PersonData): KootaDetail {
  const bYoni = NAKSHATRA_YONI[boy.nakshatra];
  const gYoni = NAKSHATRA_YONI[girl.nakshatra];
  if (!bYoni || !gYoni) return { obtained: 0, max: 4, description: "Unknown yoni" };

  const bAnimal = bYoni.animal;
  const gAnimal = gYoni.animal;

  let obtained: number;
  const rel = YONI_FRIENDSHIP[bAnimal]?.[gAnimal] ?? "neutral";

  if (bAnimal === gAnimal) {
    obtained = bYoni.gender !== gYoni.gender ? 4 : 3;
  } else if (rel === "friend") {
    obtained = 3;
  } else if (rel === "neutral") {
    obtained = 2;
  } else {
    obtained = 0;
  }

  return { obtained, max: 4, description: `${bAnimal} & ${gAnimal} — ${obtained}/4` };
}

function calculateGrahaMaitri(boy: PersonData, girl: PersonData): KootaDetail {
  const bLord = PLANET_LORDS_BY_SIGN[boy.moonRashi];
  const gLord = PLANET_LORDS_BY_SIGN[girl.moonRashi];

  if (!bLord || !gLord) return { obtained: 0, max: 5, description: "Unknown lord" };
  if (bLord === gLord) return { obtained: 5, max: 5, description: `${bLord} & ${gLord} — Same planet, excellent` };

  const rel = PLANET_FRIENDS[bLord];
  let obtained: number;
  if (rel.friends.includes(gLord)) {
    obtained = 5;
  } else if (rel.neutrals.includes(gLord)) {
    obtained = 3;
  } else {
    obtained = 0;
  }

  return { obtained, max: 5, description: `${bLord} & ${gLord} — ${obtained}/5` };
}

function calculateGana(boy: PersonData, girl: PersonData): KootaDetail {
  const bGana = NAKSHATRA_GANA[boy.nakshatra];
  const gGana = NAKSHATRA_GANA[girl.nakshatra];

  if (!bGana || !gGana) return { obtained: 0, max: 6, description: "Unknown gana" };

  let obtained: number;
  if (bGana === gGana) {
    obtained = 6;
  } else if (
    (bGana === "Deva" && gGana === "Manushya") ||
    (bGana === "Manushya" && gGana === "Deva")
  ) {
    obtained = 5;
  } else if (
    (bGana === "Manushya" && gGana === "Rakshasa") ||
    (bGana === "Rakshasa" && gGana === "Manushya")
  ) {
    obtained = 3;
  } else {
    obtained = 0;
  }

  return { obtained, max: 6, description: `${bGana} & ${gGana} — ${obtained}/6` };
}

function calculateBhakoot(boy: PersonData, girl: PersonData): KootaDetail {
  const distance = (girl.moonRashi - boy.moonRashi + 12) % 12 + 1;
  const problematic = [2, 5, 6, 8, 9, 12];
  const obtained = problematic.includes(distance) ? 0 : 7;
  return {
    obtained,
    max: 7,
    description: `Distance: ${distance} signs — ${obtained === 7 ? "Compatible" : "Incompatible"}`,
  };
}

function calculateNadi(boy: PersonData, girl: PersonData): KootaDetail {
  const bNadi = NAKSHATRA_NADI[boy.nakshatra] ?? ((boy.nakshatraPada - 1) % 3) + 1;
  const gNadi = NAKSHATRA_NADI[girl.nakshatra] ?? ((girl.nakshatraPada - 1) % 3) + 1;
  const obtained = bNadi !== gNadi ? 8 : 0;
  return { obtained, max: 8, description: `Nadi ${bNadi} & ${gNadi} — ${obtained === 8 ? "Different (good)" : "Same (not recommended)"}` };
}

export function computeMatching(boy: PersonData, girl: PersonData): MatchingResult {
  const varna = calculateVarna(boy, girl);
  const vashya = calculateVashya(boy, girl);
  const tara = calculateTara(boy, girl);
  const yoni = calculateYoni(boy, girl);
  const grahaMaitri = calculateGrahaMaitri(boy, girl);
  const gana = calculateGana(boy, girl);
  const bhakoot = calculateBhakoot(boy, girl);
  const nadi = calculateNadi(boy, girl);

  const total = varna.obtained + vashya.obtained + tara.obtained + yoni.obtained +
    grahaMaitri.obtained + gana.obtained + bhakoot.obtained + nadi.obtained;

  let compatibility: MatchingResult["compatibility"];
  let message: string;

  if (total >= 30) {
    compatibility = "Excellent";
    message = "An excellent match with strong compatibility across all aspects. This alliance is highly favored by the stars.";
  } else if (total >= 24) {
    compatibility = "Good";
    message = "A good match with favorable gun Milan. Most areas show positive compatibility, suggesting a harmonious relationship.";
  } else if (total >= 18) {
    compatibility = "Average";
    message = "An average match. Some areas show compatibility while others need consideration. Further consultation recommended.";
  } else {
    compatibility = "Poor";
    message = "The match shows low gun compatibility. Major areas of concern exist. Thorough consultation with an astrologer is strongly advised.";
  }

  return {
    total,
    details: { varna, vashya, tara, yoni, grahaMaitri, gana, bhakoot, nadi },
    compatibility,
    message,
  };
}

export { SIGN_NAMES, NAKSHATRA_NAMES };
