import Link from "next/link";

export default function CTASection() {
  return (
    <div className="bg-orange-300">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Ready to get started? <br />
          Schedule a free 30-minute consultation.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
          <Link
            href="/schedule-a-consultation"
            className="rounded-md bg-emerald-700 text-lg px-3.5 py-2.5 font-semibold text-white shadow-xs hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Choose a time
          </Link>
          {/* <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Arrange a demo <span aria-hidden="true">→</span>
          </a> */}
        </div>
      </div>
    </div>
  );
}
