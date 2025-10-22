import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/lib/adminAuth";
import Link from "next/link";
import { AdminOrderDetail } from "@/components/admin/AdminOrderDetail";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Check admin authorization
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    redirect("/");
  }

  const { id } = await params;
  const supabase = await createClient();

  // Fetch order
  const { data: orderData, error: orderError } = await supabase
    .from("partner_orders")
    .select("*")
    .eq("id", id)
    .single();

  if (orderError || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The order you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/admin/partner-orders"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  // Fetch partner details
  const { data: partnerData } = await supabase
    .from("partners")
    .select("user_id, first_name, last_name, email")
    .eq("user_id", orderData.partner_id)
    .single();

  // Combine order and partner data
  const order = {
    ...orderData,
    partners: partnerData || {
      user_id: orderData.partner_id,
      first_name: "Unknown",
      last_name: "Partner",
      email: "",
    },
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The order you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/admin/partner-orders"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/admin/partner-orders"
            className="text-emerald-600 hover:text-emerald-700 font-medium mb-2 inline-block"
          >
            ← Back to Orders
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order Details
              </h1>
              <p className="text-gray-600 mt-1">Order ID: {order.id}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminOrderDetail order={order} />
      </main>
    </div>
  );
}
