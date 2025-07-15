import { CheckCircleIcon } from "@heroicons/react/24/outline";

export function FormStatus({
  success,
  error,
}: {
  success?: boolean;
  error?: string;
}) {
  if (!success && !error) return null;

  return (
    <div
      className={`mb-6 p-4 rounded-md ${
        success
          ? "bg-green-50 border border-green-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      {success ? (
        <div className="flex items-center text-green-700">
          <CheckCircleIcon className="h-12 w-12 mr-2" />
          <p>
            Your callback request has been submitted successfully. We&apos;ll be
            in touch soon.
          </p>
        </div>
      ) : (
        <div className="flex items-center text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p>{error || "An error occurred. Please try again."}</p>
        </div>
      )}
    </div>
  );
}
