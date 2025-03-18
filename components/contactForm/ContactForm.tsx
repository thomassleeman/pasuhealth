"use client";
import { useState } from "react";
import { FormStatus } from "./FormStatus";
import { SubmitButton } from "./SubmitButton";
import { submitContactForm } from "@/app/actions/contact";
import { useRouter } from "next/navigation";

// Main form component
export function ContactForm({
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
  });

  async function handleSubmit(formData: FormData) {
    const result = await submitContactForm(formData);

    if (result.success) {
      // Update URL to show success
      router.push("/contact?success=true");
      setFormState({ success: true, error: undefined });
    } else {
      // Update URL to show error
      router.push(`/contact?error=${encodeURIComponent(result.error || "")}`);
      setFormState({ success: false, error: result.error });
    }
  }

  return (
    <div className="w-full">
      <FormStatus success={formState.success} error={formState.error} />

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
