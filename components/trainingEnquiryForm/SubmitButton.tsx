"use client";
import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";

export function SubmitButton({
  isSubmitted = false,
}: {
  isSubmitted?: boolean;
}) {
  const { pending } = useFormStatus();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDisabled = (isClient && pending) || isSubmitted;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
        isClient && pending ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {isClient && pending ? "Submitting..." : "Submit Enquiry"}
    </button>
  );
}
