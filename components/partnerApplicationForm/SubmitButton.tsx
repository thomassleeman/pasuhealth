"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md disabled:bg-emerald-400 cursor-pointer"
    >
      {pending ? "Submitting..." : "Submit Application"}
    </button>
  );
}
