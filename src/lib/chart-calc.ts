export interface BirthData {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  timezoneOffset?: number;
}

export interface PlanetData {
  name: string;
  longitude: number;
  sign: number;
  signName: string;
  degree: number;
  nakshatra: number;
  nakshatraName: string;
  pada: number;
  house: number;
}

export interface ChartData {
  ascendant: number;
  ascendantDegree: number;
  ascendantSign: number;
  ascendantSignName: string;
  planets: Record<string, PlanetData>;
  planetHouseMap: Record<string, number>;
  houseSigns: Record<number, number>;
  houseSignNames: Record<number, string>;
  houseLords: Record<number, string>;
  houseOccupants: Record<number, string[]>;
  nakshatra: number;
  nakshatraName: string;
  pada: number;
  nakshatraLord: string;
  mahadasha: { planet: string; start: string; end: string };
  antardasha: { planet: string; start: string; end: string };
  vimshottari: { planet: string; years: number; remaining: number; start: string; end: string }[];
  fullAntardashaTimeline: { mahadasha: string; planet: string; start: string; end: string }[];
  ayanamsa: string;
  houseSystem: string;
  source: string;
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

const NAKSHATRA_LORDS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars",
  "Rahu", "Jupiter", "Saturn", "Mercury", "Ketu",
  "Venus", "Sun", "Moon", "Mars", "Rahu",
  "Jupiter", "Saturn", "Mercury", "Ketu", "Venus",
  "Sun", "Moon", "Mars", "Rahu", "Jupiter",
  "Saturn", "Mercury",
];

const PLANET_LORDS_BY_SIGN: Record<number, string> = {
  0: "Mars", 1: "Venus", 2: "Mercury", 3: "Moon",
  4: "Sun", 5: "Mercury", 6: "Venus", 7: "Mars",
  8: "Jupiter", 9: "Saturn", 10: "Saturn", 11: "Jupiter",
};

const DASHA_ORDER = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
const DASHA_YEARS: Record<string, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7,
  Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
};

import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

function calcAllAntardashas(dashaList: { planet: string; start: string; end: string }[]) {
  const allAntardashas: { mahadasha: string; planet: string; start: string; end: string }[] = [];

  for (const md of dashaList) {
    const mdStart = new Date(md.start);
    const mdEnd = new Date(md.end);
    const startIdx = DASHA_ORDER.indexOf(md.planet);
    const totalMdYears = (mdEnd.getTime() - mdStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    let cursor = new Date(mdStart);

    for (let i = 0; i < 9; i++) {
      const idx = (startIdx + i) % 9;
      const adPlanet = DASHA_ORDER[idx];
      const adYears = (DASHA_YEARS[adPlanet] / DASHA_YEARS[md.planet]) * totalMdYears;
      const adMs = adYears * 365.25 * 24 * 60 * 60 * 1000;
      const adEnd = new Date(cursor.getTime() + adMs);

      allAntardashas.push({
        mahadasha: md.planet,
        planet: adPlanet,
        start: cursor.toISOString().slice(0, 10),
        end: adEnd.toISOString().slice(0, 10),
      });
      cursor = adEnd;
    }
  }

  return allAntardashas;
}

export function calculateChart(birth: BirthData): ChartData {
  const req = createRequire(import.meta.url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swisseph: any = req("swisseph");
  const swissephRoot = dirname(req.resolve("swisseph/package.json"));
  swisseph.swe_set_ephe_path(resolve(swissephRoot, "deps/ephe"));
  swisseph.swe_set_sid_mode(1);

  // Convert local time to UTC
  const offsetHours = birth.timezoneOffset || 0;
  const localMs = Date.UTC(birth.year, birth.month - 1, birth.day, birth.hour, birth.minute);
  const utcMs = localMs - offsetHours * 3600000;
  const utc = new Date(utcMs);

  const jd = swisseph.swe_julday(
    utc.getUTCFullYear(),
    utc.getUTCMonth() + 1,
    utc.getUTCDate(),
    utc.getUTCHours() + utc.getUTCMinutes() / 60,
    swisseph.SE_GREG_CAL,
  );

  const flags = swisseph.SEFLG_SWIEPH | swisseph.SEFLG_SIDEREAL;

  swisseph.swe_set_topo(birth.latitude, birth.longitude, 0);

  const housesResult = swisseph.swe_houses_ex(jd, flags, birth.latitude, birth.longitude, "W");
  console.log("JD:", jd);
  console.log("Houses:", housesResult);
  console.log("Asc:", housesResult.ascendant);
  const ascendant: number = housesResult.ascendant;
  const houses: number[] = housesResult.house;

  const planetMap: Record<string, PlanetData> = {};
  const planetHouseMap: Record<string, number> = {};

  const planetDefs = [
    { id: swisseph.SE_SUN, name: "Sun" },
    { id: swisseph.SE_MOON, name: "Moon" },
    { id: swisseph.SE_MERCURY, name: "Mercury" },
    { id: swisseph.SE_VENUS, name: "Venus" },
    { id: swisseph.SE_MARS, name: "Mars" },
    { id: swisseph.SE_JUPITER, name: "Jupiter" },
    { id: swisseph.SE_SATURN, name: "Saturn" },
    { id: swisseph.SE_MEAN_NODE, name: "Rahu" },
  ];

  for (const p of planetDefs) {
    const calc = swisseph.swe_calc_ut(jd, p.id, flags);
    const lon: number = calc.longitude;

    if (p.name === "Rahu") {
      const ketuLon = (lon + 180) % 360;
      const kd = buildPlanetData("Ketu", ketuLon, ascendant);
      planetMap["Ketu"] = kd;
      planetHouseMap["Ketu"] = kd.house;
    }

    const pd = buildPlanetData(p.name, lon, ascendant);
    planetMap[p.name] = pd;
    planetHouseMap[p.name] = pd.house;
  }

  const houseSigns: Record<number, number> = {};
  const houseSignNames: Record<number, string> = {};
  const houseLords: Record<number, string> = {};
  const houseOccupants: Record<number, string[]> = {};

  const ascSign = Math.floor(ascendant / 30);

  for (let h = 1; h <= 12; h++) {
    const signIdx = (ascSign + h - 1) % 12;
    houseSigns[h] = signIdx;
    houseSignNames[h] = SIGN_NAMES[signIdx];
    houseLords[h] = PLANET_LORDS_BY_SIGN[signIdx];
    houseOccupants[h] = [];
  }

  for (const [pName, pd] of Object.entries(planetMap)) {
    if (pd.house >= 1 && pd.house <= 12) {
      houseOccupants[pd.house].push(pName);
    }
  }

  const ascDegree = ascendant % 30;
  const ascSignIdx = Math.floor(ascendant / 30);

  const moonLon = planetMap["Moon"]?.longitude ?? 0;
  const moonNak = getNakshatra(moonLon);

  const [mahadashaName, balanceYears] = calcVimshottariMahadasha(moonNak, moonLon);
  const birthDateUTC = new Date(utcMs);
  const dashaList = calcFullDasha(mahadashaName, balanceYears, birthDateUTC);

  const now = new Date();
  const currentDasha = findCurrentDasha(dashaList, now);
  const mdStart = new Date(currentDasha.start);
  const mdEnd = new Date(currentDasha.end);
  const currentAntardasha = calcAntardasha(currentDasha.planet, mdStart, mdEnd, now);
  const allAntardashas = calcAllAntardashas(dashaList);

  const chart: ChartData = {
    ascendant,
    ascendantDegree: ascDegree,
    ascendantSign: ascSignIdx,
    ascendantSignName: SIGN_NAMES[ascSignIdx],
    planets: planetMap,
    planetHouseMap,
    houseSigns,
    houseSignNames,
    houseLords,
    houseOccupants,
    nakshatra: moonNak,
    nakshatraName: NAKSHATRA_NAMES[moonNak],
    pada: getPada(moonLon),
    nakshatraLord: NAKSHATRA_LORDS[moonNak],
    mahadasha: { planet: currentDasha.planet, start: currentDasha.start, end: currentDasha.end },
    antardasha: currentAntardasha,
    vimshottari: dashaList.map((d) => ({
      planet: d.planet,
      years: d.years,
      remaining: d.remaining,
      start: d.start,
      end: d.end,
    })),
    fullAntardashaTimeline: allAntardashas,
    ayanamsa: "Lahiri",
    houseSystem: "Whole Sign",
    source: "swiss_ephemeris_v2",
  };

  return chart;
}

function buildPlanetData(name: string, longitude: number, ascendant: number): PlanetData {
  const signIdx = Math.floor(longitude / 30);
  const degree = longitude % 30;
  const nak = getNakshatra(longitude);

  const ascSign = Math.floor(ascendant / 30);
  const pSign = Math.floor(longitude / 30);
  const house = ((pSign - ascSign + 12) % 12) + 1;

  return {
    name,
    longitude,
    sign: signIdx,
    signName: SIGN_NAMES[signIdx],
    degree,
    nakshatra: nak,
    nakshatraName: NAKSHATRA_NAMES[nak],
    pada: getPada(longitude),
    house,
  };
}

function getNakshatra(longitude: number): number {
  return Math.floor(longitude / 13.3333333);
}

function getPada(longitude: number): number {
  return Math.floor((longitude % 13.3333333) / 3.3333333) + 1;
}

function calcVimshottariMahadasha(moonNak: number, moonLon: number): [string, number] {
  const lord = NAKSHATRA_LORDS[moonNak];
  const totalYears = DASHA_YEARS[lord] || 0;
  const degreesInNak = moonLon % 13.3333333;
  const remainingDegrees = 13.3333333 - degreesInNak;
  const balanceYears = (remainingDegrees / 13.3333333) * totalYears;
  return [lord, balanceYears];
}

function calcFullDasha(mahadashaLord: string, balanceYears: number, birthDate: Date) {
  const startIdx = DASHA_ORDER.indexOf(mahadashaLord);
  const result: { planet: string; years: number; remaining: number; start: string; end: string }[] = [];
  let cursor = new Date(birthDate);

  for (let i = 0; i < 9; i++) {
    const idx = (startIdx + i) % 9;
    const planet = DASHA_ORDER[idx];
    const years = i === 0 ? balanceYears : DASHA_YEARS[planet];
    const start = new Date(cursor);
    const ms = years * 365.25 * 24 * 60 * 60 * 1000;
    cursor = new Date(cursor.getTime() + ms);
    result.push({
      planet,
      years,
      remaining: years,
      start: start.toISOString().slice(0, 10),
      end: cursor.toISOString().slice(0, 10),
    });
  }

  return result;
}

function findCurrentDasha(
  dashaList: { planet: string; start: string; end: string }[],
  referenceDate: Date
) {
  for (const d of dashaList) {
    const start = new Date(d.start);
    const end = new Date(d.end);
    if (referenceDate >= start && referenceDate < end) {
      return d;
    }
  }
  return dashaList[dashaList.length - 1];
}

function calcAntardasha(mahadashaPlanet: string, mdStart: Date, mdEnd: Date, birthDate: Date): { planet: string; start: string; end: string } {
  const startIdx = DASHA_ORDER.indexOf(mahadashaPlanet);
  const mdMs = mdEnd.getTime() - mdStart.getTime();
  const totalMdYears = mdMs / (365.25 * 24 * 60 * 60 * 1000);
  let cursor = new Date(mdStart);

  for (let i = 0; i < 9; i++) {
    const idx = (startIdx + i) % 9;
    const planet = DASHA_ORDER[idx];
    const adYears = (DASHA_YEARS[planet] / DASHA_YEARS[mahadashaPlanet]) * totalMdYears;
    const adMs = adYears * 365.25 * 24 * 60 * 60 * 1000;
    const adEnd = new Date(cursor.getTime() + adMs);

    if (birthDate >= cursor && birthDate < adEnd) {
      return {
        planet,
        start: cursor.toISOString().slice(0, 10),
        end: adEnd.toISOString().slice(0, 10),
      };
    }
    cursor = adEnd;
  }

  return { planet: mahadashaPlanet, start: mdStart.toISOString().slice(0, 10), end: mdEnd.toISOString().slice(0, 10) };
}
