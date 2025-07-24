import {
  CheckCircleIcon,
  ChartBarIcon,
  LightBulbIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function MentalHealthConsultancy() {
  return (
    <div className="bg-white">
      {/* Hero Section with Gradient Background */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50 to-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20">
              <span className="font-semibold text-emerald-600">
                Strategic Partnership
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Mental Health Consultancy
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Transform your workplace culture with expert guidance. Build
            comprehensive mental health strategies that drive business
            performance while prioritizing employee wellbeing.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="mx-auto max-w-3xl">
          <p className="text-lg text-gray-700 leading-8">
            Creating a mentally healthy workplace requires more than good
            intentions—it demands strategic planning, evidence-based approaches,
            and sustained commitment. Our consultancy service provides the
            expertise and framework to develop mental health initiatives that
            are both impactful and sustainable, tailored to your
            organization&apos;s unique challenges and opportunities.
          </p>
        </div>

        {/* Core Benefits Grid */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="relative bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600">
                  <ChartBarIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Evidence-Based Strategies
                </h3>
              </div>
              <p className="text-gray-600">
                Our recommendations are grounded in the latest research and best
                practices. We translate academic insights into practical
                solutions that work in real-world business environments.
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-sky-50 to-white p-8 rounded-2xl border border-sky-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-600">
                  <LightBulbIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  ROI-Focused Approach
                </h3>
              </div>
              <p className="text-gray-600">
                We help build the business case for mental health investment,
                demonstrating how improved wellbeing translates to reduced
                absenteeism, increased productivity, and enhanced talent
                retention.
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border border-amber-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-600">
                  <ArrowPathIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sustainable Implementation
                </h3>
              </div>
              <p className="text-gray-600">
                Beyond recommendations, we provide practical implementation
                roadmaps, change management support, and measurement frameworks
                to ensure lasting positive change.
              </p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Consultancy Approach
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              We&apos;ve developed a structured methodology based on established
              best practices in organizational psychology and change management.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-600 via-emerald-600 to-transparent hidden lg:block" />

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative flex gap-x-8">
                <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="flex-auto">
                  <h3 className="text-xl font-semibold leading-8 text-gray-900">
                    Discovery & Assessment
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    We begin with a comprehensive evaluation of your current
                    workplace culture, existing mental health provisions, and
                    organizational readiness for change. This includes
                    stakeholder interviews, employee surveys, policy reviews,
                    and analysis of relevant metrics like absence rates and
                    engagement scores.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-x-8">
                <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="flex-auto">
                  <h3 className="text-xl font-semibold leading-8 text-gray-900">
                    Strategic Planning
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    Based on our findings, we develop a bespoke mental health
                    strategy aligned with your business objectives. This
                    includes identifying priority areas, setting measurable
                    goals, and creating a phased implementation plan that
                    considers your resources, timeline, and organizational
                    capacity.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex gap-x-8">
                <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="flex-auto">
                  <h3 className="text-xl font-semibold leading-8 text-gray-900">
                    Stakeholder Engagement
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    We work with you to secure buy-in from leadership, managers,
                    and employees. This includes developing communication
                    strategies, facilitating workshops, and creating champions
                    networks to ensure your mental health initiatives have broad
                    support and engagement.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex gap-x-8">
                <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <span className="text-xl font-bold">4</span>
                </div>
                <div className="flex-auto">
                  <h3 className="text-xl font-semibold leading-8 text-gray-900">
                    Implementation Support
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    We guide you through the rollout of your mental health
                    strategy, providing hands-on support for policy development,
                    training program design, and system implementation. Our
                    consultants remain available to troubleshoot challenges and
                    adjust approaches based on real-time feedback.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative flex gap-x-8">
                <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <span className="text-xl font-bold">5</span>
                </div>
                <div className="flex-auto">
                  <h3 className="text-xl font-semibold leading-8 text-gray-900">
                    Measurement & Optimization
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    We establish metrics and monitoring systems to track the
                    impact of your mental health initiatives. Regular reviews
                    allow us to demonstrate ROI, identify areas for improvement,
                    and continuously refine your approach to maximize
                    effectiveness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research-backed Benefits */}
        <div className="mx-auto mt-32 max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-emerald-50 to-sky-50 p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Mental Health Consultancy Matters
            </h3>
            <p className="text-gray-700 mb-8">
              Research consistently shows that organizations with comprehensive
              mental health strategies experience:
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-4">
                <CheckCircleIcon className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">30% reduction</p>
                  <p className="text-gray-600">in sickness absence rates</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircleIcon className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Improved engagement
                  </p>
                  <p className="text-gray-600">and employee productivity</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircleIcon className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Enhanced retention
                  </p>
                  <p className="text-gray-600">and talent attraction</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircleIcon className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Better resilience
                  </p>
                  <p className="text-gray-600">
                    during organizational challenges
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-8 italic">
              Sources: World Health Organization, Deloitte Mental Health Report
              2023, CIPD Health and Wellbeing at Work Survey
            </p>
          </div>
        </div>

        {/* Industry Expertise */}
        <div className="mx-auto mt-32 max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Expertise Across Industries
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Mental health challenges manifest differently across sectors. Our
            consultants bring together expertise in organizational psychology,
            workplace wellbeing, and change management to deliver solutions that
            work for your specific industry context.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm font-semibold text-gray-600">
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-600" />
              Healthcare
            </span>
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-600" />
              Technology
            </span>
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-600" />
              Finance
            </span>
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-600" />
              Retail
            </span>
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-600" />
              Manufacturing
            </span>
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-600" />
              Public Services
            </span>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="mx-auto mt-32 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Consultancy Commitment
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="relative pl-9">
              <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <div className="h-2 w-2 rounded-full bg-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Expert Team</h3>
              <p className="mt-2 text-gray-600">
                Clinical and organizational psychology backgrounds
              </p>
            </div>
            <div className="relative pl-9">
              <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <div className="h-2 w-2 rounded-full bg-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Evidence-Based</h3>
              <p className="mt-2 text-gray-600">
                Recommendations grounded in current research
              </p>
            </div>
            <div className="relative pl-9">
              <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <div className="h-2 w-2 rounded-full bg-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Collaborative</h3>
              <p className="mt-2 text-gray-600">
                Approach that respects your organizational culture
              </p>
            </div>
            <div className="relative pl-9">
              <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <div className="h-2 w-2 rounded-full bg-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Practical</h3>
              <p className="mt-2 text-gray-600">
                Implementable solutions tailored to your context
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-32 max-w-4xl text-center">
          <div className="rounded-3xl bg-gray-900 px-6 py-16 sm:px-12 sm:py-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your workplace?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Take the first step towards building a mentally healthier
              workplace. Schedule a consultation to explore how our service can
              support your organization&apos;s goals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/training-enquiry"
                className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Schedule Consultation
              </a>
              <a
                href="/contact"
                className="text-sm font-semibold leading-6 text-white"
              >
                Contact us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
