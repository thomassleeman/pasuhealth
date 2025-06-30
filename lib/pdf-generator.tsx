// lib/pdf-generator.tsx
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import AssessmentReportPDF from "@/app/mental-health-risk-checker/components/AssessmentReportPDF";
import type { AssessmentResults } from "@/types/riskChecker";

export async function generatePDFBuffer(results: AssessmentResults) {
  return renderToBuffer(<AssessmentReportPDF results={results} />);
}

// import React from "react";
// import { renderToStream } from "@react-pdf/renderer";
// import AssessmentReportPDF from "@/app/mental-health-risk-checker/components/AssessmentReportPDF";
// import type { AssessmentResults } from "@/types/riskChecker";

// export async function generatePDFStream(results: AssessmentResults) {
//   return renderToStream(<AssessmentReportPDF results={results} />);
// }
