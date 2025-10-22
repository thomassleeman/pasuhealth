import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";

export default async function PartnerDashboard() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/partners/login");
  }

  // Get partner data for the logged-in user only
  const { data: partner, error: partnerError } = await supabase
    .from("partners")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (partnerError) {
    console.error("Error fetching partner:", partnerError);
  }

  // Fetch recent orders for this partner
  const { data: recentOrders, error: ordersError } = await supabase
    .from("partner_orders")
    .select(
      "id, course_title, customer_organization, total_price, partner_commission, status, created_at"
    )
    .eq("partner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (ordersError) {
    console.error("Error fetching orders:", ordersError);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Partner Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {partner?.first_name || user.email}
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/partners/dashboard/new-order"
            className="p-6 bg-emerald-700 text-white rounded-lg text-center"
          >
            <h3 className="text-2xl font-semibold mb-2">Create New Order</h3>
          </Link>
        </div>

        {/* Stats Overview */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">£0</p>
            <p className="text-sm text-gray-600 mt-1">No sales yet</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Pending Commission
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">£0</p>
            <p className="text-sm text-gray-600 mt-1">0 pending payments</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Earned</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">£0</p>
            <p className="text-sm text-gray-600 mt-1">All time commission</p>
          </div>
        </div> */}

        {/* Partner Profile */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Profile
            </h2>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900 mt-1">
                {partner?.first_name} {partner?.last_name}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900 mt-1">
                {partner?.email || user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          {!recentOrders || recentOrders.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No activity yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Start by creating your first order
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => {
                    const statusColors = {
                      pending: "bg-yellow-100 text-yellow-800",
                      approved: "bg-blue-100 text-blue-800",
                      completed: "bg-green-100 text-green-800",
                      cancelled: "bg-red-100 text-red-800",
                    };

                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.course_title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.customer_organization}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              statusColors[
                                order.status as keyof typeof statusColors
                              ]
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          £{order.total_price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                          £{order.partner_commission.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
