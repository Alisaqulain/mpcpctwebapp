import { NextResponse } from "next/server";
import { getExamQuestions, getExamInfo, getExamSections } from "@/lib/examQuestions";

export async function GET() {
  try {
    const examData = getExamQuestions();
    const examInfo = getExamInfo();
    const sections = getExamSections();
    
    return NextResponse.json({
      success: true,
      data: {
        examInfo,
        sections,
        questions: examData.questions
      }
    });
  } catch (error) {
    console.error("Error fetching exam questions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch exam questions" },
      { status: 500 }
    );
  }
}
