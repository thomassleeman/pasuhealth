import Link from "next/link";

export default async function Partners() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto relative">
        {/* Sign In Button */}
        <Link
          href="/partners/dashboard"
          className="absolute top-6 right-2 border-1 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-1 rounded-lg"
        >
          Sign In
        </Link>

        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Partner With Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Turn your professional network into a revenue stream while helping
            organisations prioritise workplace mental health
          </p>
          <div className="pt-4">
            <Link
              href="/partners/apply"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Connect</h3>
              <p className="text-gray-600">
                Leverage your existing relationships with HR professionals and
                business leaders who need workplace mental health services
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Sell</h3>
              <p className="text-gray-600">
                Introduce our services to your contacts and manage the sale on
                your terms. Log details through our simple partner portal
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Earn</h3>
              <p className="text-gray-600">
                Receive 15% commission on every sale once the client completes
                payment. Simple, transparent, profitable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Highlight */}
      <section className="px-6 py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Earn 15% Commission
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            On every sale you facilitate through your professional network
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Partner With Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Full Control
                </h3>
                <p className="text-gray-600">
                  You manage the relationship and the sale. We provide the
                  services and support
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  No Overhead
                </h3>
                <p className="text-gray-600">
                  No inventory, no delivery, no admin headaches. Just connect
                  and earn
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Simple Portal
                </h3>
                <p className="text-gray-600">
                  Easy-to-use partner dashboard to log sales and track your
                  earnings
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Proven Services
                </h3>
                <p className="text-gray-600">
                  Sell high-quality workplace mental health solutions that
                  organisations actually need
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Flexible Income
                </h3>
                <p className="text-gray-600">
                  Work at your own pace. Perfect as a supplementary income
                  stream
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Make an Impact
                </h3>
                <p className="text-gray-600">
                  Help organisations create healthier, more supportive
                  workplaces
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="px-6 py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Perfect For
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Workplace Mental Health Practitioners
              </h3>
              <p className="text-gray-600">
                Extend your impact and create additional income by connecting
                your network to comprehensive mental health services
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                HR Consultants
              </h3>
              <p className="text-gray-600">
                Add value to your client relationships by introducing workplace
                mental health solutions that support their teams
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Wellbeing Advisors
              </h3>
              <p className="text-gray-600">
                Complement your existing services with a trusted partner for
                organisational mental health programs
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Business Consultants
              </h3>
              <p className="text-gray-600">
                Offer your clients access to workplace mental health expertise
                while earning commission
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            Join our partner network today and start earning commission on sales
            to your professional contacts
          </p>
          <Link
            href="/partners/apply"
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            Apply to Become a Partner
          </Link>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Quick Questions
        </h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              When do I get paid?
            </h3>
            <p className="text-gray-600">
              You can claim your 15% commission once the client has completed
              payment for the services you sold
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Do I need to provide the services?
            </h3>
            <p className="text-gray-600">
              No, you simply facilitate the connection and sale. We handle all
              service delivery and client support
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Is there a cost to join?
            </h3>
            <p className="text-gray-600">
              Absolutely not. There are no fees to become a partner. You only
              earn when you make a sale
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
