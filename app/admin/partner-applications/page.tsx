import { createClient } from "@/utils/supabase/server";
import AdminApplicationTable from "@/components/admin/AdminApplicationTable";
import type { PartnerApplication } from "@/types/partnerApplication";

export default async function PartnerApplicationsPage() {

  // Fetch all partner applications
  const supabase = await createClient();
  const { data: applications, error } = await supabase
    .from("partner_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching applications:", error);
  }

  const applicationsList = (applications || []) as PartnerApplication[];

  // Calculate stats
  const stats = {
    total: applicationsList.length,
    pending: applicationsList.filter((app) => app.status === "pending").length,
    approved: applicationsList.filter((app) => app.status === "approved")
      .length,
    rejected: applicationsList.filter((app) => app.status === "rejected")
      .length,
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Partner Applications
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Review and manage partner applications
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Total Applications
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Pending Review
            </h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {stats.pending}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Approved
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.approved}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Rejected
            </h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {stats.rejected}
            </p>
          </div>
        </div>

        {/* Applications Table */}
        <AdminApplicationTable applications={applicationsList} />
      </main>
    </>
  );
}
