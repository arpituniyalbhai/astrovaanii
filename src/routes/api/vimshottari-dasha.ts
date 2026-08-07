import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { calculateChart, type BirthData } from "../../lib/chart-calc";

export const Route = createFileRoute("/api/vimshottari-dasha")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const birth = await request.json() as BirthData & { name?: string };

          if (
            !Number.isInteger(birth.year) || !Number.isInteger(birth.month) || !Number.isInteger(birth.day) ||
            !Number.isInteger(birth.hour) || !Number.isInteger(birth.minute) ||
            !Number.isFinite(birth.latitude) || !Number.isFinite(birth.longitude)
          ) {
            return Response.json({ success: false, error: "Please provide complete, valid birth details." }, { status: 400 });
          }

          const chart = await calculateChart(birth);
          return Response.json({
            success: true,
            name: birth.name?.trim() || "Your",
            moon: {
              longitude: chart.planets.Moon.longitude,
              sign: chart.planets.Moon.signName,
              nakshatra: chart.nakshatraName,
              pada: chart.pada,
              lord: chart.nakshatraLord,
            },
            current: {
              mahadasha: chart.mahadasha,
              antardasha: chart.antardasha,
            },
            vimshottari: chart.vimshottari,
            antardashas: chart.fullAntardashaTimeline,
            ayanamsa: chart.ayanamsa,
            source: chart.source,
          });
        } catch (error) {
          console.error("Vimshottari dasha error:", error);
          return Response.json({ success: false, error: "Unable to calculate the Dasha timeline. Please try again." }, { status: 500 });
        }
      },
    },
  },
});
