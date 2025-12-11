import { getAllFeedback } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const feedbackData = await getAllFeedback();

    // Serialize dates for client
    const serializedFeedback = feedbackData.map((item) => ({
      content: item.content,
      create_time: item.create_time.toISOString(),
    }));

    return NextResponse.json(serializedFeedback);
  } catch (error) {
    console.error("Failed to fetch feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}

