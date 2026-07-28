import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { calculateChart, type BirthData } from "../../lib/chart-calc";
import { computeMatching, type PersonData, type MatchingResult } from "../../lib/kundali-matching";

export const Route = createFileRoute("/api/kundali-matching")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await request.json() as {
            boy: BirthData & { name: string };
            girl: BirthData & { name: string };
          };

          const [boyChart, girlChart] = await Promise.all([
            calculateChart({
              year: data.boy.year,
              month: data.boy.month,
              day: data.boy.day,
              hour: data.boy.hour,
              minute: data.boy.minute,
              latitude: data.boy.latitude,
              longitude: data.boy.longitude,
              timezoneOffset: data.boy.timezoneOffset,
            }),
            calculateChart({
              year: data.girl.year,
              month: data.girl.month,
              day: data.girl.day,
              hour: data.girl.hour,
              minute: data.girl.minute,
              latitude: data.girl.latitude,
              longitude: data.girl.longitude,
              timezoneOffset: data.girl.timezoneOffset,
            }),
          ]);

          const boyPerson: PersonData = {
            name: data.boy.name,
            moonRashi: boyChart.planets.Moon?.sign ?? 0,
            nakshatra: boyChart.nakshatra,
            nakshatraPada: boyChart.pada,
          };

          const girlPerson: PersonData = {
            name: data.girl.name,
            moonRashi: girlChart.planets.Moon?.sign ?? 0,
            nakshatra: girlChart.nakshatra,
            nakshatraPada: girlChart.pada,
          };

          const matchResult: MatchingResult = computeMatching(boyPerson, girlPerson);

          return new Response(JSON.stringify({
            success: true,
            boy: {
              name: data.boy.name,
              moonRashi: boyChart.planets.Moon?.signName ?? "",
              nakshatra: boyChart.nakshatraName,
              pada: boyChart.pada,
            },
            girl: {
              name: data.girl.name,
              moonRashi: girlChart.planets.Moon?.signName ?? "",
              nakshatra: girlChart.nakshatraName,
              pada: girlChart.pada,
            },
            matching: matchResult,
          }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Kundali matching error:", error);
          return new Response(JSON.stringify({
            success: false,
            error: String(error),
          }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
