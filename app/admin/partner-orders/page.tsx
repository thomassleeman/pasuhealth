import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/lib/adminAuth";
import Link from "next/link";
import { AdminOrderTable } from "@/components/admin/AdminOrderTable";

export default async function AdminPartnerOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    search?: string;
  }>;
}) {
  // Check admin authorization
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    redirect("/");
  }

  const supabase = await createClient();
  const params = await searchParams;

  // Build query for orders
  let query = supabase
    .from("partner_orders")
    .select("*")
    .order("created_at", { ascending: false });

  // Apply status filter
  if (params.status && params.status !== "all") {
    query = query.eq("status", params.status);
  }

  // Apply search filter
  if (params.search) {
    query = query.or(
      `customer_organisation.ilike.%${params.search}%,course_title.ilike.%${params.search}%`
    );
  }

  const { data: ordersData, error: ordersError } = await query;

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Partner Orders Admin
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and track all partner training orders
              </p>
            </div>
            <Link
              href="/"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {orders?.length || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600 mt-2">
              {orders?.filter((o) => o.status === "pending").length || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {orders?.filter((o) => o.status === "completed").length || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Total Commission
            </h3>
            <p className="text-2xl font-bold text-emerald-600 mt-2">
              £
              {orders
                ?.reduce((sum, o) => sum + o.partner_commission, 0)
                .toFixed(2) || "0.00"}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <AdminOrderTable
            orders={orders || []}
            currentStatus={params.status}
            currentSearch={params.search}
          />
        </div>
      </main>
    </div>
  );
}
