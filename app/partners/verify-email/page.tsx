export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Check your email
          </h2>
          <p className="text-gray-600">
            We&apos;ve sent you a confirmation email. Please click the link in
            the email to verify your account and complete your registration.
          </p>
          <p className="text-sm text-gray-500 pt-4">
            Didn&apos;t receive the email? Check your spam folder or contact
            support.
          </p>
        </div>
      </div>
    </div>
  );
}
