import { RequestCallbackForm } from "@/components/requestCallbackForm/requestCallbackForm";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/outline/ChatBubbleLeftRightIcon";

export default async function RequestCallbackPage({
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
    <div className="max-w-md container mx-auto py-8 my-18">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="bg-emerald-50 p-4 mb-6 w-fit mx-auto rounded-full">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request a Callback
          </h1>
          <p className="text-gray-600">
            Fill in your details below and we&apos;ll call you back same day (or
            next working day if it&apos;s after 5!).
          </p>
        </div>

        <RequestCallbackForm success={success} error={error} />
      </div>
    </div>
  );
}
