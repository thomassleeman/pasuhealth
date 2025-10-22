interface FormStatusProps {
  success?: boolean;
  error?: string;
}

export function FormStatus({ success, error }: FormStatusProps) {
  if (success) {
    return (
      <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-md">
        <p className="text-emerald-800">
          Order submitted successfully! We&apos;ll review it and be in touch
          soon.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return null;
}
