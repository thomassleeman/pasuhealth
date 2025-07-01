"use client";

import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function RiskCheckerCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Show after 1 second
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full z-50 isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-577/310 w-144.25 bg-linear-to-r from-[#14a92a] to-[#418ce8] opacity-30 animate-pulse"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-577/310 w-144.25 bg-linear-to-r from-[#418ce8] to-[#14a92a] opacity-30 animate-pulse"
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 w-full">
        <p className="text-sm/6 text-gray-900">
          <strong className="mr-2">
            How exposed is your organisation to mental health-related risks?
          </strong>
          Use our free online assessment to get a clearer idea in{" "}
          <em>just 5 minutes</em>.
        </p>
        <Link
          href="/mental-health-risk-checker"
          className="flex-none rounded-full bg-emerald-800 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Start now <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={handleDismiss}
          className="-m-3 p-3 focus-visible:-outline-offset-4"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-gray-900" />
        </button>
      </div>
    </div>
  );
}
