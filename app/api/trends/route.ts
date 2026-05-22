import { getAllTrendConfigs } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const configs = await getAllTrendConfigs();

    const yearlyTotals: Record<string, unknown>[] = [];
    const categoryBreakdown: Record<string, unknown>[] = [];
    const wordCloud: Record<string, unknown>[] = [];

    for (const row of configs) {
      try {
        const value = row.config_value as Record<string, unknown>;
        switch (row.config_type) {
          case "yearly_total":
            yearlyTotals.push({ year: row.config_key, ...value });
            break;
          case "category":
            categoryBreakdown.push({ year: row.config_key, ...value });
            break;
          case "wordcloud":
            wordCloud.push({ text: row.config_key, ...value });
            break;
        }
      } catch {
        // skip malformed JSON
      }
    }

    return NextResponse.json({ yearlyTotals, categoryBreakdown, wordCloud });
  } catch (error) {
    console.error("Failed to fetch trend configs:", error);
    return NextResponse.json(
      { error: "Failed to fetch trend configs" },
      { status: 500 }
    );
  }
}
