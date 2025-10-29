import {
  CurrencyPoundIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  UserIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
// import Logo from "@public/brainLogoCompressed.png";
import TrainingImages from "@public/trainingCourses.jpg";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
        <Link
          href="/partners/dashboard"
          className="absolute top-6 right-2 lg:right-8 border-1 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-1 rounded-lg"
        >
          Sign In
        </Link>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Join Our{" "}
            <span className="text-sky-500 font-bold">Partner Program</span>
          </h1>
          <h2 className="text-lg font-semibold md:text-xl text-gray-700 mb-4 text-balance">
            Earn generous commissions by connecting businesses to workplace
            mental health training solutions
          </h2>
          {/* <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 text-balance">
            Join Our{" "}
            <span className="text-sky-500 font-extrabold">Partner Program</span>
            <br />
            and earn generous commissions by connecting businesses to workplace
            mental
          </h1> */}

          <Link
            href="/partners/apply"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors shadow-lg mt-8 inline-block"
          >
            Become a Partner
          </Link>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 ">
        {/* Skewed Background */}
        {/* <div className="absolute inset-0 bg-amber-50 -skew-y-6 transform origin-top-left h-96"></div> */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 bg-amber-50 -skew-y-6 transform origin-top-left h-8/10 md:h-2/3"></div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="bg-white rounded-xl shadow-2xl p-3 border border-gray-100">
                <Image
                  src={TrainingImages}
                  alt="Dashboard Preview"
                  className="w-full rounded-lg"
                  priority={true}
                />
              </div>
              {/* <div className="absolute -left-4 lg:-left-6 top-1/4 -translate-y-1/2 bg-white rounded-full shadow-xl p-6 border border-gray-100">
                <Image
                  src={Logo}
                  alt="Logo"
                  className="w-16 h-auto lg:w-20 lg:h-auto object-contain"
                />
              </div> */}
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Who we are
              </h2>
              <p className="text-gray-600 text-base font-semibold lg:text-lg leading-relaxed mb-6">
                PASU Health is a UK/Irish workplace mental health and wellbeing
                provider, offering expert training courses to organisations of
                all sizes. Our mission is to empower employers to support
                employee mental health and wellbeing with a focus on preventing
                burnout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            <span className="text-sky-500">How</span> it works
          </h2>
          <div className="mx-auto max-w-2xl">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* Target Professionals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Who Is This <span className="text-sky-500">For?</span>
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Our partner program is designed for professionals who have
            connections to businesses and can introduce workplace wellness
            training solutions
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-gray-900">
                  HR Professionals
                </h3>
              </div>
              <p className="text-gray-600">
                HR consultants, advisors, and professionals with existing
                business relationships who can introduce workplace mental health
                training to their networks
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircleIcon className="h-6 w-6 text-orange-600 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Psychology Professionals
                </h3>
              </div>
              <p className="text-gray-600">
                Occupational psychologists, counsellors, and mental health
                practitioners looking to expand their service offerings and
                support more organizations
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircleIcon className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Wellbeing Consultants
                </h3>
              </div>
              <p className="text-gray-600">
                Workplace wellbeing specialists and consultants who can
                complement their existing services with comprehensive mental
                health training solutions
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Business Consultants
                </h3>
              </div>
              <p className="text-gray-600">
                Management consultants and business advisors with corporate
                connections who can offer workplace wellness as an additional
                value-added service
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircleIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Training Providers
                </h3>
              </div>
              <p className="text-gray-600">
                Learning and development professionals who want to expand their
                training portfolio with specialized mental health and wellbeing
                courses
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircleIcon className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Corporate Networkers
                </h3>
              </div>
              <p className="text-gray-600">
                Anyone with strong business connections and an interest in
                workplace wellness who wants to create a new revenue stream
                helping organizations
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Ready to get started?
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
              <Link
                href="/partners/apply"
                className="rounded-lg bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-emerald-500 dark:shadow-none dark:hover:bg-emerald-400 dark:focus-visible:outline-emerald-500"
              >
                {" "}
                Sign up now{" "}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const partnerSteps = [
  {
    id: 1,
    title: "Sign up",
    description:
      "Join our partner program and get access to pricing and participant caps for all of our training courses",
    icon: UserIcon,
    iconBackground: "bg-red-500",
  },
  {
    id: 2,
    title: "Connect",
    description:
      "Sell PASU Health training programs to your network of businesses and organisations",
    icon: UserGroupIcon,
    iconBackground: "bg-orange-500",
  },
  {
    id: 3,
    title: "Log bookings",
    description:
      "Upload booking details through our simple to use partner portal and await confirmation",
    icon: DocumentTextIcon,
    iconBackground: "bg-yellow-500",
  },
  {
    id: 4,
    title: "We take care of the rest",
    description:
      "All training programs are delivered by PASU Health experts remotely",
    icon: ComputerDesktopIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 5,
    title: "Earn commission",
    description: "Receive 15% commission as soon as payment is received",
    icon: CurrencyPoundIcon,
    iconBackground: "bg-blue-500",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {partnerSteps.map((step, stepIdx) => (
            <li key={step.id}>
              <div className="relative pb-8">
                {stepIdx !== partnerSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-300"
                  />
                ) : null}
                <div className="relative flex items-start space-x-4">
                  <div>
                    <span
                      className={classNames(
                        step.iconBackground,
                        "flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white"
                      )}
                    >
                      <step.icon
                        aria-hidden="true"
                        className="h-5 w-5 text-white"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5">
                    <div>
                      <p className="text-xl font-semibold text-gray-900 mb-1">
                        {step.title}
                      </p>
                      <p className="text-base text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// import Link from "next/link";

// export default async function Partners() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
//       {/* Hero Section */}
//       <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto relative">
//         {/* Sign In Button */}
//         <Link
//           href="/partners/dashboard"
//           className="absolute top-6 right-2 border-1 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-1 rounded-lg"
//         >
//           Sign In
//         </Link>

//         <div className="text-center space-y-6">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
//             Partner With Us
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
//             Turn your professional network into a revenue stream while helping
//             organisations prioritise workplace mental health
//           </p>
//           <div className="pt-4">
//             <Link
//               href="/partners/apply"
//               className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
//             >
//               Become a Partner
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Value Proposition */}
//       <section className="px-6 py-16 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
//             How It Works
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center space-y-4">
//               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
//                 <span className="text-2xl font-bold text-emerald-600">1</span>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900">Connect</h3>
//               <p className="text-gray-600">
//                 Leverage your existing relationships with HR professionals and
//                 business leaders who need workplace mental health services
//               </p>
//             </div>
//             <div className="text-center space-y-4">
//               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
//                 <span className="text-2xl font-bold text-emerald-600">2</span>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900">Sell</h3>
//               <p className="text-gray-600">
//                 Introduce our services to your contacts and manage the sale on
//                 your terms. Log details through our simple partner portal
//               </p>
//             </div>
//             <div className="text-center space-y-4">
//               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
//                 <span className="text-2xl font-bold text-emerald-600">3</span>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900">Earn</h3>
//               <p className="text-gray-600">
//                 Receive 15% commission on every sale once the client completes
//                 payment. Simple, transparent, profitable
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Commission Highlight */}
//       <section className="px-6 py-16 bg-emerald-600 text-white">
//         <div className="max-w-4xl mx-auto text-center space-y-6">
//           <h2 className="text-4xl md:text-5xl font-bold">
//             Earn 15% Commission
//           </h2>
//           <p className="text-xl md:text-2xl opacity-90">
//             On every sale you facilitate through your professional network
//           </p>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="px-6 py-16">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
//             Why Partner With Us
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="flex gap-4">
//               <div className="flex-shrink-0">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <span className="text-green-600 text-xl">✓</span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">
//                   Full Control
//                 </h3>
//                 <p className="text-gray-600">
//                   You manage the relationship and the sale. We provide the
//                   services and support
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="flex-shrink-0">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <span className="text-green-600 text-xl">✓</span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">
//                   No Overhead
//                 </h3>
//                 <p className="text-gray-600">
//                   No inventory, no delivery, no admin headaches. Just connect
//                   and earn
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="flex-shrink-0">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <span className="text-green-600 text-xl">✓</span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">
//                   Simple Portal
//                 </h3>
//                 <p className="text-gray-600">
//                   Easy-to-use partner dashboard to log sales and track your
//                   earnings
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="flex-shrink-0">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <span className="text-green-600 text-xl">✓</span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">
//                   Proven Services
//                 </h3>
//                 <p className="text-gray-600">
//                   Sell high-quality workplace mental health solutions that
//                   organisations actually need
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="flex-shrink-0">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <span className="text-green-600 text-xl">✓</span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">
//                   Flexible Income
//                 </h3>
//                 <p className="text-gray-600">
//                   Work at your own pace. Perfect as a supplementary income
//                   stream
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="flex-shrink-0">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <span className="text-green-600 text-xl">✓</span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">
//                   Make an Impact
//                 </h3>
//                 <p className="text-gray-600">
//                   Help organisations create healthier, more supportive
//                   workplaces
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Who This Is For */}
//       <section className="px-6 py-16 bg-amber-50">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
//             Perfect For
//           </h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold mb-3 text-gray-900">
//                 Workplace Mental Health Practitioners
//               </h3>
//               <p className="text-gray-600">
//                 Extend your impact and create additional income by connecting
//                 your network to comprehensive mental health services
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold mb-3 text-gray-900">
//                 HR Consultants
//               </h3>
//               <p className="text-gray-600">
//                 Add value to your client relationships by introducing workplace
//                 mental health solutions that support their teams
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold mb-3 text-gray-900">
//                 Wellbeing Advisors
//               </h3>
//               <p className="text-gray-600">
//                 Complement your existing services with a trusted partner for
//                 organisational mental health programs
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold mb-3 text-gray-900">
//                 Business Consultants
//               </h3>
//               <p className="text-gray-600">
//                 Offer your clients access to workplace mental health expertise
//                 while earning commission
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="px-6 py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
//         <div className="max-w-4xl mx-auto text-center space-y-8">
//           <h2 className="text-3xl md:text-5xl font-bold">
//             Ready to Get Started?
//           </h2>
//           <p className="text-xl md:text-2xl opacity-90">
//             Join our partner network today and start earning commission on sales
//             to your professional contacts
//           </p>
//           <Link
//             href="/partners/apply"
//             className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
//           >
//             Apply to Become a Partner
//           </Link>
//         </div>
//       </section>

//       {/* FAQ Preview */}
//       <section className="px-6 py-16 max-w-4xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
//           Quick Questions
//         </h2>
//         <div className="space-y-6">
//           <div className="border-b border-gray-200 pb-6">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">
//               When do I get paid?
//             </h3>
//             <p className="text-gray-600">
//               You can claim your 15% commission once the client has completed
//               payment for the services you sold
//             </p>
//           </div>
//           <div className="border-b border-gray-200 pb-6">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">
//               Do I need to provide the services?
//             </h3>
//             <p className="text-gray-600">
//               No, you simply facilitate the connection and sale. We handle all
//               service delivery and client support
//             </p>
//           </div>
//           <div className="border-b border-gray-200 pb-6">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">
//               Is there a cost to join?
//             </h3>
//             <p className="text-gray-600">
//               Absolutely not. There are no fees to become a partner. You only
//               earn when you make a sale
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
