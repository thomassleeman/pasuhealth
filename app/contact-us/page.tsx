import { EnquiryForm } from "@/components/trainingEnquiryForm/enquiryForm";

export default async function TrainingEnquiryPage({
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
    <div className="max-w-2xl container mx-auto py-8 mb-18">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <EnquiryForm success={success} error={error} />
    </div>
  );
}
