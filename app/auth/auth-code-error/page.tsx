import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Authentication Error
          </h2>
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">
              The authentication link is invalid or has expired. Please request a
              new password reset link.
            </p>
          </div>
          <Link
            href="/partners/forgot-password"
            className="block w-full text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            Request new reset link
          </Link>
        </div>
      </div>
    </div>
  );
}
