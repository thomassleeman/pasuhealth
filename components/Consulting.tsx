import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  DocumentCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const features = [
  {
    name: "Strategic Assessment",
    description:
      "Comprehensive evaluation of your organization's current mental health provisions, identifying gaps and opportunities.",
    icon: ClipboardDocumentListIcon,
    color: "emerald",
  },
  {
    name: "Tailored Solutions",
    description:
      "Bespoke mental health strategies designed specifically for your organization's needs, culture, and objectives.",
    icon: DocumentCheckIcon,
    color: "sky",
  },
  {
    name: "Implementation Support",
    description:
      "Guidance through the implementation process, including policy development, training program design, and measurement frameworks.",
    icon: UserGroupIcon,
    color: "amber",
  },
];

export default function Consulting() {
  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pt-4 lg:pl-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-emerald-700">
                Consultancy Services
              </h2>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Workplace wellness review and planning service
              </h1>

              <p className="mt-6 text-lg/8 text-gray-600">
                Partner with our expert consultants to transform your workplace
                mental health approach. We provide strategic guidance,
                evidence-based solutions, and practical tools to help you create
                a mentally healthy workplace that drives performance and
                employee satisfaction.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-emerald-700"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                className="hover:outline-2 outline-emerald-600 outline-offset-4 rounded-md mt-12 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset cursor-pointer"
              >
                <Link href="/mental-health-consultancy">
                  Learn more about our consultancy services
                </Link>
              </button>
            </div>
          </div>

          {/* Desktop visual element */}
          <div className="hidden md:flex items-center justify-center lg:order-first">
            <div className="relative w-full max-w-lg">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-sky-50 to-amber-100 rounded-3xl blur-3xl opacity-60" />

              {/* Main visual */}
              <div className="relative">
                {/* Process flow visualization */}
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200 p-12 shadow-2xl">
                  <div className="space-y-8">
                    {/* Step indicators */}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold shadow-lg">
                            1
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-semibold text-gray-900">
                              Assess
                            </p>
                            <p className="text-xs text-gray-500">
                              Current state analysis
                            </p>
                          </div>
                        </div>
                      </div>
                      <ClipboardDocumentListIcon className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-white font-bold shadow-lg">
                            2
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-semibold text-gray-900">
                              Design
                            </p>
                            <p className="text-xs text-gray-500">
                              Tailored strategies
                            </p>
                          </div>
                        </div>
                      </div>
                      <DocumentCheckIcon className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold shadow-lg">
                            3
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-semibold text-gray-900">
                              Implement
                            </p>
                            <p className="text-xs text-gray-500">
                              Guided execution
                            </p>
                          </div>
                        </div>
                      </div>
                      <UserGroupIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Results indicator */}
                  <div className="mt-12 rounded-xl bg-gradient-to-r from-emerald-50 to-sky-50 p-6">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-900">
                          A mentally healthy workplace for all
                        </p>
                        <p className="text-xs text-gray-600">
                          Measurable improvements in workplace wellbeing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements for visual interest */}
                <div className="absolute -top-4 -right-4 h-24 w-24 bg-emerald-200 rounded-full blur-2xl opacity-40" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-sky-200 rounded-full blur-2xl opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
