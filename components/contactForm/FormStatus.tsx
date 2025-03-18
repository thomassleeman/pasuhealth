// app/components/FormStatus.tsx
"use client";

import { useEffect } from "react";
import { clearFormState } from "@/app/actions/clearContactFormState";

export function FormStatus({
  success,
  error,
}: {
  success?: boolean;
  error?: string;
}) {
  useEffect(() => {
    // If we have a success or error message, clear the form state cookie
    // This prevents the message from showing on refresh
    if (success || error) {
      clearFormState();
    }
  }, [success, error]);

  if (!success && !error) return null;

  if (success) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        Your message has been sent successfully!
      </div>
    );
  }

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  );
}
