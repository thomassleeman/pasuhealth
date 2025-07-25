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
      className={`w-full py-3 px-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors ${
        isClient && pending
          ? "bg-emerald-400 text-white cursor-not-allowed"
          : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
      }`}
    >
      {isClient && pending ? "Submitting..." : "Call me back"}
    </button>
  );
}
