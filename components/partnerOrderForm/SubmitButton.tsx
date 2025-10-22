"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ isSubmitted }: { isSubmitted?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || isSubmitted}
      className="px-6 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
    >
      {pending ? "Submitting..." : isSubmitted ? "Submitted" : "Submit Order"}
    </button>
  );
}
