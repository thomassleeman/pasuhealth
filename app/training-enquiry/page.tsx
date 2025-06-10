import { TrainingEnquiryForm } from "@/components/trainingEnquiryForm/TrainingEnquiryForm";
import Container from "../../components/containers/Container";

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
    <div className="max-w-2xl container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Training Enquiries</h1>
      <TrainingEnquiryForm success={success} error={error} />
    </div>
  );
}
