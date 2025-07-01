// app/api/render-to-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePDFBuffer } from "@/lib/pdf-generator";
import type { AssessmentResults } from "@/types/riskChecker";

export async function POST(request: NextRequest) {
  try {
    const rawResults: AssessmentResults = await request.json();

    const results: AssessmentResults = {
      ...rawResults,
      completedAt: new Date(rawResults.completedAt),
    };

    const buffer = await generatePDFBuffer(results);

    const fileName = `Mental_Health_Assessment_${results.contactDetails.company}_${results.completedAt.toISOString().split("T")[0]}.pdf`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
