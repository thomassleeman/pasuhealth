import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ApplicationApprovalForm from "@/components/admin/ApplicationApprovalForm";
import type { PartnerApplication } from "@/types/partnerApplication";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch application details
  const supabase = await createClient();
  const { data: application, error } = await supabase
    .from("partner_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Application Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The application you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/admin/partner-applications"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const app = application as PartnerApplication;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link
                href="/admin/partner-applications"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-2 inline-block"
              >
                ← Back to Applications
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Application Details
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Review and manage this partner application
              </p>
            </div>
            <div>
              <span
                className={`px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(app.status)}`}
              >
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Application Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Applicant Information
              </h2>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{app.name}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={`mailto:${app.email}`}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      {app.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={`tel:${app.phone}`}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      {app.phone}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Company Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {app.company_name || "Not provided"}
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Application Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDate(app.created_at)}
                  </dd>
                </div>

                {app.reviewed_at && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Reviewed Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(app.reviewed_at)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Application Description
              </h2>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {app.description}
              </p>
            </div>

            {/* Admin Notes */}
            {app.admin_notes && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Admin Notes
                </h2>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {app.admin_notes}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Approval Form */}
          <div className="lg:col-span-1">
            <ApplicationApprovalForm application={app} />
          </div>
        </div>
      </main>
    </>
  );
}
