import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminAuth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check admin authorization
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation Bar */}
      <nav className="bg-emerald-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <Link href="/" className="text-xl font-bold">
                  PASU Health Admin
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-4">
                  <Link
                    href="/admin/partner-orders"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Partner Orders
                  </Link>
                  <Link
                    href="/admin/partner-applications"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Partner Applications
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors"
              >
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {children}
    </div>
  );
}
