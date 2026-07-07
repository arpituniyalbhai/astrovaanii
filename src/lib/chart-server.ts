import { createServerFn } from "@tanstack/react-start";
import { calculateChart, type BirthData, type ChartData } from "./chart-calc";

export const getChart = createServerFn({ method: "GET" })
  .validator((data: BirthData) => data)
  .handler(async ({ data }) => {
    try {
      const chart = calculateChart(data);
      return { success: true, chart } as const;
    } catch (error) {
      console.error("Chart calculation error:", error);
      return { success: false, error: String(error) } as const;
    }
  });
