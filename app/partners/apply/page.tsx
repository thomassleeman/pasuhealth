import { PartnerApplicationForm } from "@/components/partnerApplicationForm/PartnerApplicationForm";

export default async function PartnerApplicationPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }> & {
    success?: string;
    error?: string;
  };
}) {
  const params = await searchParams;
  const success = params.success === "true";
  const error = params.error;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Become a Partner
          </h1>
          <p className="text-gray-600 mb-8">
            We're always looking to partner with like-minded organisations.
            Please fill out the form below to apply to become a partner.
          </p>

          <PartnerApplicationForm success={success} error={error} />
        </div>
      </div>
    </div>
  );
}
