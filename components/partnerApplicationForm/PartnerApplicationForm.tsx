"use client";
import { useState } from "react";
import { FormStatus } from "./FormStatus";
import { SubmitButton } from "./SubmitButton";
import { submitPartnerApplication } from "@/app/actions/partnerApplication";
import { useRouter } from "next/navigation";

type FieldErrors = {
  [key: string]: string[] | undefined;
};

// Main form component
export function PartnerApplicationForm({
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
    fieldErrors: {} as FieldErrors,
  });

  async function handleSubmit(formData: FormData) {
    const result = await submitPartnerApplication(formData);

    if (result.success) {
      // Update URL to show success
      router.push("/partners/apply?success=true");
      setFormState({ success: true, error: undefined, fieldErrors: {} });
    } else {
      // Update URL to show error
      router.push(`/partners/apply?error=${encodeURIComponent(result.error || "")}`);
      setFormState({
        success: false,
        error: result.error,
        fieldErrors: result.fieldErrors || {},
      });
    }
  }

  return (
    <div className="w-full">
      <FormStatus success={formState.success} error={formState.error} />

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`mt-1 block w-full px-3 py-2 border rounded-md ${
              formState.fieldErrors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
            required
          />
          {formState.fieldErrors.name && (
            <p className="mt-1 text-sm text-red-600">
              {formState.fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-1 block w-full px-3 py-2 border rounded-md ${
              formState.fieldErrors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            required
          />
          {formState.fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">
              {formState.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`mt-1 block w-full px-3 py-2 border rounded-md ${
              formState.fieldErrors.phone
                ? "border-red-500"
                : "border-gray-300"
            }`}
            required
          />
          {formState.fieldErrors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {formState.fieldErrors.phone[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium">
            Company Name (if applicable)
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className={`mt-1 block w-full px-3 py-2 border rounded-md ${
              formState.fieldErrors.companyName
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formState.fieldErrors.companyName && (
            <p className="mt-1 text-sm text-red-600">
              {formState.fieldErrors.companyName[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description *
          </label>
          <p className="text-sm text-gray-600 mt-1 mb-2">
            Please provide a short description of what you do (minimum 10 characters)
          </p>
          <textarea
            id="description"
            name="description"
            rows={5}
            className={`mt-1 block w-full px-3 py-2 border rounded-md ${
              formState.fieldErrors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
            required
          ></textarea>
          {formState.fieldErrors.description && (
            <p className="mt-1 text-sm text-red-600">
              {formState.fieldErrors.description[0]}
            </p>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
