"use client";
import { useState } from "react";
import { FormStatus } from "./FormStatus";
import { SubmitButton } from "./SubmitButton";
import { submitCallbackRequest } from "@actions/requestCallback";
import { useRouter } from "next/navigation";

// Main form component
export function RequestCallbackForm({
  success: initialSuccess,
  error: initialError,
}: {
  success?: boolean;
  error?: string;
}) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    success: initialSuccess,
    error: initialError,
    isSubmitted: false,
  });

  async function handleSubmit(formData: FormData) {
    const result = await submitCallbackRequest(formData);

    if (result.success) {
      // Update URL to show success
      router.push("/request-a-callback?success=true");
      setFormState({ success: true, error: undefined, isSubmitted: true });
    } else {
      // Update URL to show error
      router.push(
        `/request-a-callback?error=${encodeURIComponent(result.error || "")}`
      );
      setFormState({ success: false, error: result.error, isSubmitted: false });
    }
  }

  return (
    <div className="w-full">
      <FormStatus success={formState.success} error={formState.error} />

      <form action={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="organisation"
            className="block text-sm font-medium text-gray-700"
          >
            Organisation <span className="text-red-500">*</span>
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="telephone"
            className="block text-sm font-medium text-gray-700"
          >
            Telephone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm"
            required
          />
        </div>

        <SubmitButton isSubmitted={formState.isSubmitted} />
      </form>
    </div>
  );
}
