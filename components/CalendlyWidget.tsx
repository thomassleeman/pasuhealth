// components/CalendlyWidget.tsx
"use client";

import { useEffect, useState } from "react";

interface CalendlyWidgetProps {
  url: string;
  height?: string;
  minWidth?: string;
}

export default function CalendlyWidget({
  url,
  height = "700px",
  minWidth = "320px",
}: CalendlyWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded to true after component mounts (client-side only)
    setIsLoaded(true);

    // Load Calendly script if not already loaded
    if (!document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Only render the widget after hydration to prevent mismatch
  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center bg-gray-50 rounded-lg"
        style={{ height, minWidth }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth, height }}
    />
  );
}
