import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getTrainingCourses } from "@/sanity/accessData/getTrainingCoursesData";
import { PartnerOrderForm } from "@/components/partnerOrderForm/PartnerOrderForm";
import Link from "next/link";

export default async function NewOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/partners/login");
  }

  // Fetch training courses from Sanity
  const courses = await getTrainingCourses();

  // Get search params
  const params = await searchParams;
  const success = params.success === "true";
  const error = params.error;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/partners/dashboard"
            className="text-sm text-emerald-600 hover:text-emerald-700 mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Training Order
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Submit a training order for your customer. Pricing is calculated
            automatically as you complete the form.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PartnerOrderForm
          courses={courses}
          partnerId={user.id}
          success={success}
          error={error}
        />
      </main>
    </div>
  );
}
