import { getAllFeedback, updateFeedbackStatus } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const feedbackData = await getAllFeedback();

    // Serialize dates for client
    const serializedFeedback = feedbackData.map((item) => ({
      id: item.id,
      content: item.content,
      create_time: item.create_time.toISOString(),
      issue_category: item?.issue_category || "",
      issuer: item?.issuer || "",
      community: item?.community || "",
      status: item?.status || "待审核",
      issue_fixer: item?.issue_fixer || "",
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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, issue_fixer } = body;

    if (!id || !status || !issue_fixer) {
      return NextResponse.json(
        { error: "缺少必要参数：id, status, issue_fixer" },
        { status: 400 }
      );
    }

    const success = await updateFeedbackStatus(id, status, issue_fixer);

    if (success) {
      return NextResponse.json({ message: "状态更新成功" });
    } else {
      return NextResponse.json({ error: "更新失败" }, { status: 500 });
    }
  } catch (error) {
    console.error("Failed to update feedback status:", error);
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}
