"use client";

import { useState } from "react";
import type { AssessmentResults } from "@/types/riskChecker";

interface ServerPDFDownloadButtonProps {
  results: AssessmentResults;
  className?: string;
  children: React.ReactNode;
}

export const PDFDownloadButton: React.FC<ServerPDFDownloadButtonProps> = ({
  results,
  className = "px-6 py-3 border border-emerald-600 text-emerald-600 font-medium rounded-md hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500",
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Using API route approach
      const response = await fetch("/api/render-to-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(results),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Get the blob and create download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const fileName = `Mental_Health_Assessment_${results.contactDetails.company}_${results.completedAt}.pdf`;

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleDownload} disabled={isLoading} className={className}>
      {isLoading ? "Generating PDF..." : error ? "Error - Try Again" : children}
    </button>
  );
};
