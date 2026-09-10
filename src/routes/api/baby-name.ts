import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { calculateChart, type BirthData } from "../../lib/chart-calc";

const NAME_SYLLABLES: Record<string, [string, string, string, string]> = {
  Ashwini: ["Chu", "Che", "Cho", "La"],
  Bharani: ["Li", "Lu", "Le", "Lo"],
  Krittika: ["A", "I", "U", "E"],
  Rohini: ["O", "Va", "Vi", "Vu"],
  Mrigashira: ["Ve", "Vo", "Ka", "Ki"],
  Ardra: ["Ku", "Gha", "Nga", "Chha"],
  Punarvasu: ["Ke", "Ko", "Ha", "Hi"],
  Pushya: ["Hu", "He", "Ho", "Da"],
  Ashlesha: ["Di", "Du", "De", "Do"],
  Magha: ["Ma", "Mi", "Mu", "Me"],
  "Purva Phalguni": ["Mo", "Ta", "Ti", "Tu"],
  "Uttara Phalguni": ["Te", "To", "Pa", "Pi"],
  Hasta: ["Pu", "Sha", "Na", "Tha"],
  Chitra: ["Pe", "Po", "Ra", "Ri"],
  Swati: ["Ru", "Re", "Ro", "Ta"],
  Vishakha: ["Ti", "Tu", "Te", "To"],
  Anuradha: ["Na", "Ni", "Nu", "Ne"],
  Jyeshtha: ["No", "Ya", "Yi", "Yu"],
  Mula: ["Ye", "Yo", "Bha", "Bhi"],
  "Purva Ashadha": ["Bhu", "Dha", "Pha", "Dha"],
  "Uttara Ashadha": ["Bhe", "Bho", "Ja", "Ji"],
  Shravana: ["Ju", "Je", "Jo", "Gha"],
  Dhanishta: ["Ga", "Gi", "Gu", "Ge"],
  Shatabhisha: ["Go", "Sa", "Si", "Su"],
  "Purva Bhadrapada": ["Se", "So", "Da", "Di"],
  "Uttara Bhadrapada": ["Du", "Tha", "Jha", "Da"],
  Revati: ["De", "Do", "Cha", "Chi"],
};

export const Route = createFileRoute("/api/baby-name")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const birth = (await request.json()) as BirthData & { timezone?: string };
          if (
            !Number.isInteger(birth.year) || !Number.isInteger(birth.month) || !Number.isInteger(birth.day) ||
            !Number.isInteger(birth.hour) || !Number.isInteger(birth.minute) ||
            !Number.isFinite(birth.latitude) || !Number.isFinite(birth.longitude) || !birth.timezone
          ) {
            return Response.json({ success: false, error: "Please provide complete, valid birth details." }, { status: 400 });
          }

          const timezoneOffset = getOffsetForLocalBirthTime(birth, birth.timezone);
          const chart = await calculateChart({ ...birth, timezoneOffset });
          const syllables = NAME_SYLLABLES[chart.nakshatraName];
          if (!syllables) throw new Error(`No naming syllables configured for ${chart.nakshatraName}`);

          return Response.json({
            success: true,
            nakshatra: chart.nakshatraName,
            pada: chart.pada,
            recommendedSyllable: syllables[chart.pada - 1],
            allSyllables: syllables,
            moonSign: chart.planets.Moon.signName,
            moonLongitude: chart.planets.Moon.longitude,
            ayanamsa: chart.ayanamsa,
            source: chart.source,
          });
        } catch (error) {
          console.error("Baby name calculation error:", error);
          return Response.json({ success: false, error: "Unable to calculate the birth Nakshatra. Please verify the birth details and try again." }, { status: 500 });
        }
      },
    },
  },
});

function getOffsetForLocalBirthTime(birth: BirthData, timezone: string): number {
  // A location's UTC offset can change with daylight saving time. Resolve it for
  // the supplied birth date rather than accepting a present-day offset from the browser.
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const localWallTime = Date.UTC(birth.year, birth.month - 1, birth.day, birth.hour, birth.minute);
  let instant = localWallTime;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const values = Object.fromEntries(
      formatter.formatToParts(new Date(instant))
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, Number(part.value)]),
    ) as Record<string, number>;
    const displayedLocalTime = Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute);
    instant = localWallTime - (displayedLocalTime - instant);
  }

  return (localWallTime - instant) / 3_600_000;
}
