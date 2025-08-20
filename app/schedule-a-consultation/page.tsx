// app/schedule-a-consultation/page.tsx
import {
  CheckCircleIcon,
  ClockIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import CalendlyWidget from "@/components/CalendlyWidget";
import Link from "next/link";

export const metadata = {
  title: "Schedule a Consultation - PASU Health",
  description:
    "Book a free 30-minute consultation with our workplace wellness specialists to discuss your organisation's mental health needs.",
};

export default function ScheduleConsultationPage() {
  return (
    <div className="bg-white px-6 pt-24 pb-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Schedule Your Free Consultation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Book a 30-minute consultation with one of our workplace wellness
            specialists to discuss your organisation&apos;s mental health needs
            and explore tailored solutions.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-emerald-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <VideoCameraIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Expert Guidance
            </h3>
            <p className="text-gray-600">
              Speak directly with our certified workplace wellness specialists
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ClockIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              30-Minute Session
            </h3>
            <p className="text-gray-600">
              Focused discussion tailored to your specific workplace challenges
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Obligation
            </h3>
            <p className="text-gray-600">
              Completely free with no commitment required
            </p>
          </div>
        </div>

        {/* What We'll Cover Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What We&apos;ll Cover in Your Consultation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700">
                  Analysis of your current workplace mental health challenges
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700">
                  Customised training solutions for your team size and industry
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700">
                  Implementation strategies and timeline recommendations
                </span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700">
                  Overview of our PASU.io wellness platform
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700">
                  Pricing options and investment guidance
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700">
                  Next steps for getting started
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Additional Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Schedule a Consultation?
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Personalised Approach
                </h3>
                <p className="text-gray-600">
                  Every organisation is unique. Our consultation allows us to
                  understand your specific challenges, company culture, and
                  goals to recommend the most effective mental health solutions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Expert Insights
                </h3>
                <p className="text-gray-600">
                  Benefit from our team&apos;s extensive experience in workplace
                  mental health. We&apos;ll share insights from similar
                  organisations and discuss proven strategies that drive real
                  results.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Clear Next Steps
                </h3>
                <p className="text-gray-600">
                  Leave the consultation with a clear understanding of how we
                  can support your team&apos;s mental wellbeing and the
                  practical steps to get started.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Prefer to speak immediately?
              </h3>
              <p className="text-blue-800 mb-3">
                Just looking for a quick chat or prefer to discuss your needs
                right away, you can contact us directly...
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-blue-800">
                  <strong>Email us at:</strong> contact@pasuhealth.com
                </p>
                <span className="text-blue-800">or</span>
                <p className="text-blue-800">
                  <strong>
                    <Link className="underline" href="/request-a-callback">
                      Request a callback
                    </Link>
                  </strong>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Calendly Widget */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6 bg-gradient-to-r from-emerald-50 to-amber-50 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Choose Your Preferred Time
                </h3>
                <p className="text-gray-600">
                  Select a time that works best for you. All consultations are
                  conducted via Google Meet.
                </p>
              </div>

              {/* Calendly Widget Container */}
              <CalendlyWidget
                url="https://calendly.com/pasuhealth/30min?background_color=fffbeb&text_color=3f3f46&primary_color=047857"
                height="700px"
                minWidth="320px"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Workplace Mental Health?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join hundreds of organisations who have already improved their
              workplace culture and employee wellbeing with our expert guidance
              and proven solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
