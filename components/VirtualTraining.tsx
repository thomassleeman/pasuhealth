import {
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

import virtualTraining from "@public/virtual-training.jpg";
import Image from "next/image";

const features = [
  {
    name: "Expert-Led Sessions",
    description:
      "Connect with certified mental health professionals who guide interactive sessions, answer questions in real-time, and tailor content to participants' specific concerns and workplace scenarios.",
    icon: VideoCameraIcon,
  },
  {
    name: "Collaborative Learning",
    description:
      "Engage in virtual breakout rooms where participants can discuss scenarios, share experiences, and practice techniques in smaller groups, fostering deeper understanding through peer interaction.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Instant Resources",
    description:
      "Access comprehensive digital workbooks, reference guides, and follow-up materials immediately after sessions, allowing participants to implement learned strategies without delay.",
    icon: DocumentTextIcon,
  },
];

export default function VirtualTraining() {
  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-emerald-700">
                Virtual Training
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Virtual Mental Health Training for Your Team
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Our virtual training courses deliver the same high-quality
                mental health education without geographical limitations. Expert
                facilitators guide participants through interactive sessions
                designed for engagement and knowledge retention.
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
                Learn more about virtual training
              </button>
            </div>
          </div>
          <Image
            alt="Product screenshot"
            src={virtualTraining}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
