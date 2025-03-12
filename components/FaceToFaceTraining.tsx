import {
  MapPinIcon,
  AcademicCapIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import Image from "next/image";
import faceToFaceTraining from "@public/face-to-face-training.jpg";

const features = [
  {
    name: "Workplace Integration",
    description:
      "Training delivered directly in your environment, addressing specific workplace stressors and cultural factors while demonstrating how mental health principles apply within your organization's unique context.",
    icon: MapPinIcon,
  },
  {
    name: "Hands-On Learning",
    description:
      "Participate in immersive activities and role-play scenarios facilitated by trainers who provide immediate guidance, ensuring techniques are properly understood and correctly applied.",
    icon: AcademicCapIcon,
  },
  {
    name: "Personalized Guidance",
    description:
      "Receive direct, nuanced feedback from experienced facilitators who can address individual questions, clarify complex concepts, and provide additional context tailored to specific roles.",
    icon: UserIcon,
  },
];

export default function FaceToFaceTraining() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pt-4 lg:pl-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-emerald-700">
                Face to face Training
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Immersive Mental Health Training at Your Location
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Experience our comprehensive mental health training in person at
                your workplace. Our facilitators create a supportive environment
                where teams can develop mental health skills through hands-on
                activities and meaningful discussions.
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
                Learn more about face to face training
              </button>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <Image
              alt="Product screenshot"
              src={faceToFaceTraining}
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
