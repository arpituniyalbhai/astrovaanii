import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/chart-server-BfTmTwTC.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SIGN_NAMES = [
	"Aries",
	"Taurus",
	"Gemini",
	"Cancer",
	"Leo",
	"Virgo",
	"Libra",
	"Scorpio",
	"Sagittarius",
	"Capricorn",
	"Aquarius",
	"Pisces"
];
var NAKSHATRA_NAMES = [
	"Ashwini",
	"Bharani",
	"Krittika",
	"Rohini",
	"Mrigashira",
	"Ardra",
	"Punarvasu",
	"Pushya",
	"Ashlesha",
	"Magha",
	"Purva Phalguni",
	"Uttara Phalguni",
	"Hasta",
	"Chitra",
	"Swati",
	"Vishakha",
	"Anuradha",
	"Jyeshtha",
	"Mula",
	"Purva Ashadha",
	"Uttara Ashadha",
	"Shravana",
	"Dhanishta",
	"Shatabhisha",
	"Purva Bhadrapada",
	"Uttara Bhadrapada",
	"Revati"
];
var NAKSHATRA_LORDS = [
	"Ketu",
	"Venus",
	"Sun",
	"Moon",
	"Mars",
	"Rahu",
	"Jupiter",
	"Saturn",
	"Mercury",
	"Ketu",
	"Venus",
	"Sun",
	"Moon",
	"Mars",
	"Rahu",
	"Jupiter",
	"Saturn",
	"Mercury",
	"Ketu",
	"Venus",
	"Sun",
	"Moon",
	"Mars",
	"Rahu",
	"Jupiter",
	"Saturn",
	"Mercury"
];
var PLANET_LORDS_BY_SIGN = {
	0: "Mars",
	1: "Venus",
	2: "Mercury",
	3: "Moon",
	4: "Sun",
	5: "Mercury",
	6: "Venus",
	7: "Mars",
	8: "Jupiter",
	9: "Saturn",
	10: "Saturn",
	11: "Jupiter"
};
var DASHA_ORDER = [
	"Ketu",
	"Venus",
	"Sun",
	"Moon",
	"Mars",
	"Rahu",
	"Jupiter",
	"Saturn",
	"Mercury"
];
var DASHA_YEARS = {
	Ketu: 7,
	Venus: 20,
	Sun: 6,
	Moon: 10,
	Mars: 7,
	Rahu: 18,
	Jupiter: 16,
	Saturn: 19,
	Mercury: 17
};
function calcAllAntardashas(dashaList) {
	const allAntardashas = [];
	for (const md of dashaList) {
		const mdStart = new Date(md.start);
		const mdEnd = new Date(md.end);
		const startIdx = DASHA_ORDER.indexOf(md.planet);
		const totalMdYears = (mdEnd.getTime() - mdStart.getTime()) / (365.25 * 24 * 60 * 60 * 1e3);
		let cursor = new Date(mdStart);
		for (let i = 0; i < 9; i++) {
			const adPlanet = DASHA_ORDER[(startIdx + i) % 9];
			const adMs = DASHA_YEARS[adPlanet] / DASHA_YEARS[md.planet] * totalMdYears * 365.25 * 24 * 60 * 60 * 1e3;
			const adEnd = new Date(cursor.getTime() + adMs);
			allAntardashas.push({
				mahadasha: md.planet,
				planet: adPlanet,
				start: cursor.toISOString().slice(0, 10),
				end: adEnd.toISOString().slice(0, 10)
			});
			cursor = adEnd;
		}
	}
	return allAntardashas;
}
function calculateChart(birth) {
	const req = createRequire(import.meta.url);
	const swisseph = req("swisseph");
	const swissephRoot = dirname(req.resolve("swisseph/package.json"));
	swisseph.swe_set_ephe_path(resolve(swissephRoot, "deps/ephe"));
	swisseph.swe_set_sid_mode(1);
	const offsetHours = birth.timezoneOffset || 0;
	const utcMs = Date.UTC(birth.year, birth.month - 1, birth.day, birth.hour, birth.minute) - offsetHours * 36e5;
	const utc = new Date(utcMs);
	const jd = swisseph.swe_julday(utc.getUTCFullYear(), utc.getUTCMonth() + 1, utc.getUTCDate(), utc.getUTCHours() + utc.getUTCMinutes() / 60, swisseph.SE_GREG_CAL);
	const flags = swisseph.SEFLG_SWIEPH | swisseph.SEFLG_SIDEREAL;
	swisseph.swe_set_topo(birth.latitude, birth.longitude, 0);
	const housesResult = swisseph.swe_houses_ex(jd, flags, birth.latitude, birth.longitude, "W");
	console.log("JD:", jd);
	console.log("Houses:", housesResult);
	console.log("Asc:", housesResult.ascendant);
	const ascendant = housesResult.ascendant;
	housesResult.house;
	const planetMap = {};
	const planetHouseMap = {};
	const planetDefs = [
		{
			id: swisseph.SE_SUN,
			name: "Sun"
		},
		{
			id: swisseph.SE_MOON,
			name: "Moon"
		},
		{
			id: swisseph.SE_MERCURY,
			name: "Mercury"
		},
		{
			id: swisseph.SE_VENUS,
			name: "Venus"
		},
		{
			id: swisseph.SE_MARS,
			name: "Mars"
		},
		{
			id: swisseph.SE_JUPITER,
			name: "Jupiter"
		},
		{
			id: swisseph.SE_SATURN,
			name: "Saturn"
		},
		{
			id: swisseph.SE_MEAN_NODE,
			name: "Rahu"
		}
	];
	for (const p of planetDefs) {
		const lon = swisseph.swe_calc_ut(jd, p.id, flags).longitude;
		if (p.name === "Rahu") {
			const kd = buildPlanetData("Ketu", (lon + 180) % 360, ascendant);
			planetMap["Ketu"] = kd;
			planetHouseMap["Ketu"] = kd.house;
		}
		const pd = buildPlanetData(p.name, lon, ascendant);
		planetMap[p.name] = pd;
		planetHouseMap[p.name] = pd.house;
	}
	const houseSigns = {};
	const houseSignNames = {};
	const houseLords = {};
	const houseOccupants = {};
	const ascSign = Math.floor(ascendant / 30);
	for (let h = 1; h <= 12; h++) {
		const signIdx = (ascSign + h - 1) % 12;
		houseSigns[h] = signIdx;
		houseSignNames[h] = SIGN_NAMES[signIdx];
		houseLords[h] = PLANET_LORDS_BY_SIGN[signIdx];
		houseOccupants[h] = [];
	}
	for (const [pName, pd] of Object.entries(planetMap)) if (pd.house >= 1 && pd.house <= 12) houseOccupants[pd.house].push(pName);
	const ascDegree = ascendant % 30;
	const ascSignIdx = Math.floor(ascendant / 30);
	const moonLon = planetMap["Moon"]?.longitude ?? 0;
	const moonNak = getNakshatra(moonLon);
	const [mahadashaName, balanceYears] = calcVimshottariMahadasha(moonNak, moonLon);
	const dashaList = calcFullDasha(mahadashaName, balanceYears, new Date(utcMs));
	const now = /* @__PURE__ */ new Date();
	const currentDasha = findCurrentDasha(dashaList, now);
	const mdStart = new Date(currentDasha.start);
	const mdEnd = new Date(currentDasha.end);
	const currentAntardasha = calcAntardasha(currentDasha.planet, mdStart, mdEnd, now);
	const allAntardashas = calcAllAntardashas(dashaList);
	return {
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
		mahadasha: {
			planet: currentDasha.planet,
			start: currentDasha.start,
			end: currentDasha.end
		},
		antardasha: currentAntardasha,
		vimshottari: dashaList.map((d) => ({
			planet: d.planet,
			years: d.years,
			remaining: d.remaining,
			start: d.start,
			end: d.end
		})),
		fullAntardashaTimeline: allAntardashas,
		ayanamsa: "Lahiri",
		houseSystem: "Whole Sign",
		source: "swiss_ephemeris_v2"
	};
}
function buildPlanetData(name, longitude, ascendant) {
	const signIdx = Math.floor(longitude / 30);
	const degree = longitude % 30;
	const nak = getNakshatra(longitude);
	const ascSign = Math.floor(ascendant / 30);
	const house = (Math.floor(longitude / 30) - ascSign + 12) % 12 + 1;
	return {
		name,
		longitude,
		sign: signIdx,
		signName: SIGN_NAMES[signIdx],
		degree,
		nakshatra: nak,
		nakshatraName: NAKSHATRA_NAMES[nak],
		pada: getPada(longitude),
		house
	};
}
function getNakshatra(longitude) {
	return Math.floor(longitude / 13.3333333);
}
function getPada(longitude) {
	return Math.floor(longitude % 13.3333333 / 3.3333333) + 1;
}
function calcVimshottariMahadasha(moonNak, moonLon) {
	const lord = NAKSHATRA_LORDS[moonNak];
	const totalYears = DASHA_YEARS[lord] || 0;
	return [lord, (13.3333333 - moonLon % 13.3333333) / 13.3333333 * totalYears];
}
function calcFullDasha(mahadashaLord, balanceYears, birthDate) {
	const startIdx = DASHA_ORDER.indexOf(mahadashaLord);
	const result = [];
	let cursor = new Date(birthDate);
	for (let i = 0; i < 9; i++) {
		const planet = DASHA_ORDER[(startIdx + i) % 9];
		const years = i === 0 ? balanceYears : DASHA_YEARS[planet];
		const start = new Date(cursor);
		const ms = years * 365.25 * 24 * 60 * 60 * 1e3;
		cursor = new Date(cursor.getTime() + ms);
		result.push({
			planet,
			years,
			remaining: years,
			start: start.toISOString().slice(0, 10),
			end: cursor.toISOString().slice(0, 10)
		});
	}
	return result;
}
function findCurrentDasha(dashaList, referenceDate) {
	for (const d of dashaList) {
		const start = new Date(d.start);
		const end = new Date(d.end);
		if (referenceDate >= start && referenceDate < end) return d;
	}
	return dashaList[dashaList.length - 1];
}
function calcAntardasha(mahadashaPlanet, mdStart, mdEnd, birthDate) {
	const startIdx = DASHA_ORDER.indexOf(mahadashaPlanet);
	const totalMdYears = (mdEnd.getTime() - mdStart.getTime()) / (365.25 * 24 * 60 * 60 * 1e3);
	let cursor = new Date(mdStart);
	for (let i = 0; i < 9; i++) {
		const planet = DASHA_ORDER[(startIdx + i) % 9];
		const adMs = DASHA_YEARS[planet] / DASHA_YEARS[mahadashaPlanet] * totalMdYears * 365.25 * 24 * 60 * 60 * 1e3;
		const adEnd = new Date(cursor.getTime() + adMs);
		if (birthDate >= cursor && birthDate < adEnd) return {
			planet,
			start: cursor.toISOString().slice(0, 10),
			end: adEnd.toISOString().slice(0, 10)
		};
		cursor = adEnd;
	}
	return {
		planet: mahadashaPlanet,
		start: mdStart.toISOString().slice(0, 10),
		end: mdEnd.toISOString().slice(0, 10)
	};
}
var getChart_createServerFn_handler = createServerRpc({
	id: "0c2399c008f0faa53af1fe249e814d7fd339af0b2351bc3e63c5cfb0fb0bb3f1",
	name: "getChart",
	filename: "src/lib/chart-server.ts"
}, (opts) => getChart.__executeServer(opts));
var getChart = createServerFn({ method: "GET" }).validator((data) => data).handler(getChart_createServerFn_handler, async ({ data }) => {
	try {
		return {
			success: true,
			chart: calculateChart(data)
		};
	} catch (error) {
		console.error("Chart calculation error:", error);
		return {
			success: false,
			error: String(error)
		};
	}
});
//#endregion
export { getChart_createServerFn_handler };
