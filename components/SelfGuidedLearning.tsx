import { ClockIcon, ChartBarIcon, FilmIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import selfGuidedTraining from "@public/self-guided-training.jpg";

const features = [
  {
    name: "Complete Flexibility",
    description:
      "Access comprehensive training materials at any time, allowing employees to learn during periods of optimal focus, integrate training around existing responsibilities, and revisit content as needed.",
    icon: ClockIcon,
  },
  {
    name: "Progress Monitoring",
    description:
      "Track individual and team completion rates, assessment scores, and engagement levels through our intuitive dashboard, enabling managers to identify areas for additional support.",
    icon: ChartBarIcon,
  },
  {
    name: "Multi-Format Content",
    description:
      "Engage with diverse learning materials including expert video lectures, interactive quizzes, downloadable worksheets, and guided reflection exercises designed to accommodate different learning preferences.",
    icon: FilmIcon,
  },
];

export default function SelfGuidedLearning() {
  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-emerald-700">
                Self Guided Learning
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Flexible Mental Health Training on Your Schedule
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Our self-guided courses allow participants to develop mental
                health skills at their own pace. Professionally designed
                learning paths combine video content, interactive exercises, and
                assessments to ensure comprehensive understanding.
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
                Learn more about self guided training
              </button>
            </div>
          </div>
          <Image
            alt="Product screenshot"
            src={selfGuidedTraining}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
