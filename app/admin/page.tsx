import { createClient } from "@/utils/supabase/server";
import { AdminOrderTable } from "@/components/admin/AdminOrderTable";
import AdminApplicationTable from "@/components/admin/AdminApplicationTable";
import type { PartnerApplication } from "@/types/partnerApplication";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderStatus?: string;
    orderSearch?: string;
    applicationStatus?: string;
    applicationSearch?: string;
  }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  // Fetch partner orders
  let ordersQuery = supabase
    .from("partner_orders")
    .select("*")
    .order("created_at", { ascending: false });

  // Apply order status filter
  if (params.orderStatus && params.orderStatus !== "all") {
    ordersQuery = ordersQuery.eq("status", params.orderStatus);
  }

  // Apply order search filter
  if (params.orderSearch) {
    ordersQuery = ordersQuery.or(
      `customer_organisation.ilike.%${params.orderSearch}%,course_title.ilike.%${params.orderSearch}%`
    );
  }

  const { data: ordersData, error: ordersError } = await ordersQuery;

  if (ordersError) {
    console.error("Error fetching orders:", ordersError);
  }

  // Fetch partner details for each order
  let orders = null;
  if (ordersData && ordersData.length > 0) {
    const partnerIds = [...new Set(ordersData.map((o) => o.partner_id))];

    // Fetch partners by matching user_id to partner_id
    const { data: partnersData, error: partnersError } = await supabase
      .from("partners")
      .select("user_id, first_name, last_name, email")
      .in("user_id", partnerIds);

    if (partnersError) {
      console.error("Error fetching partners:", partnersError);
    }

    // Map partner data to orders
    orders = ordersData.map((order) => ({
      ...order,
      partners: partnersData?.find((p) => p.user_id === order.partner_id) || {
        first_name: "Unknown",
        last_name: "Partner",
        email: "",
      },
    }));
  } else {
    orders = [];
  }

  // Fetch partner applications
  const { data: applications, error: applicationsError } = await supabase
    .from("partner_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (applicationsError) {
    console.error("Error fetching applications:", applicationsError);
  }

  const applicationsList = (applications || []) as PartnerApplication[];

  // Calculate order stats
  const orderStats = {
    total: orders?.length || 0,
    pending: orders?.filter((o) => o.status === "pending").length || 0,
    completed: orders?.filter((o) => o.status === "completed").length || 0,
    totalCommission:
      orders?.reduce((sum, o) => sum + o.partner_commission, 0) || 0,
  };

  // Calculate application stats
  const applicationStats = {
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
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage partner orders and applications
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Partner Orders Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Partner Orders</h2>
            <p className="text-gray-600 mt-1">
              Track and manage all partner training orders
            </p>
          </div>

          {/* Order Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {orderStats.total}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {orderStats.pending}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {orderStats.completed}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">
                Total Commission
              </h3>
              <p className="text-2xl font-bold text-emerald-600 mt-2">
                £{orderStats.totalCommission.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow">
            <AdminOrderTable
              orders={orders || []}
              currentStatus={params.orderStatus}
              currentSearch={params.orderSearch}
            />
          </div>
        </section>

        {/* Partner Applications Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Partner Applications
            </h2>
            <p className="text-gray-600 mt-1">
              Review and manage partner applications
            </p>
          </div>

          {/* Application Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase">
                Total Applications
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {applicationStats.total}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase">
                Pending Review
              </h3>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {applicationStats.pending}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase">
                Approved
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {applicationStats.approved}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase">
                Rejected
              </h3>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {applicationStats.rejected}
              </p>
            </div>
          </div>

          {/* Applications Table */}
          <AdminApplicationTable applications={applicationsList} />
        </section>
      </main>
    </>
  );
}
