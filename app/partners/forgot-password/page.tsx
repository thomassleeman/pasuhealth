"use client";

import { forgotPassword } from "../actions";
import Link from "next/link";
import { useActionState } from "react";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPassword, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>
        <form
          action={formAction}
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          {state?.error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{state.error}</p>
            </div>
          )}

          {state?.success && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-800">
                Check your email for a password reset link. If you don&apos;t
                see it, check your spam folder.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              disabled={pending || state?.success}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? "Sending..." : "Send reset link"}
            </button>

            <Link
              href="/partners/login"
              className="block text-center text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
