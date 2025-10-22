import Image from "next/image";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import virtualTraining from "@public/virtual-training.jpg";

export default function VirtualTraining() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <p className="text-base/7 font-semibold text-emerald-600">
          How does it work?
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          Virtual Training Courses
        </h1>
        <p className="mt-6 text-xl/8">
          Our specialized virtual workshops provide practical tools and
          strategies to promote mental wellbeing in the workplace. Led by
          experienced mental health professionals, these interactive sessions
          are designed to fit into your team&apos;s schedule with maximum
          impact.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            Mental health challenges affect workplace productivity, employee
            retention, and overall company culture. Our courses provide the
            knowledge and skills needed to create a supportive environment where
            mental wellbeing is prioritized. Suitable for managers and team
            members alike, these workshops offer actionable insights that can be
            implemented immediately.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-emerald-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Stress Management.
                </strong>{" "}
                Learn practical techniques to identify, manage and reduce
                workplace stress. Our evidence-based approaches help teams
                develop resilience and maintain productivity even during
                challenging periods.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-emerald-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Burnout Prevention.
                </strong>{" "}
                Recognize early warning signs of burnout and implement effective
                prevention strategies. This module focuses on sustainable work
                practices and boundary-setting for long-term wellbeing.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-emerald-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Supportive Communication.
                </strong>{" "}
                Develop skills to foster open conversations about mental health.
                Learn how to create psychological safety and provide appropriate
                support for team members experiencing difficulties.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Each workshop combines theoretical knowledge with interactive
            exercises and real-world scenarios. Participants receive
            comprehensive resources to reference after the session, ensuring the
            learning continues beyond the workshop itself. Our approach
            emphasizes practical application in diverse workplace environments.
          </p>
          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Transform your workplace culture in just a few sessions
          </h2>
          <p className="mt-6">
            Creating a mentally healthy workplace doesn&apos;t happen overnight,
            but significant positive changes can be achieved through targeted
            education and consistent application of key principles. Our
            workshops are designed to catalyze meaningful cultural shifts with
            minimal disruption to your team&apos;s workflow.
          </p>
          <figure className="mt-10 border-l border-emerald-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                &quot;The virtual mental health workshops transformed our team
                dynamics. We now have a shared language for discussing wellbeing
                and practical tools that everyone uses daily. Productivity has
                improved, but more importantly, our people feel truly
                supported.&quot;
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <Image
                alt="Image of Sarah Johnson"
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-6 flex-none rounded-full bg-gray-50"
                height={200}
                width={200}
              />
              <div className="text-sm/6">
                <strong className="font-semibold text-gray-900">
                  Sarah Johnson
                </strong>{" "}
                – HR Director
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            All sessions are facilitated by certified mental health
            professionals with extensive experience in workplace wellbeing. Our
            facilitators understand the unique challenges of different
            industries and tailor content to address specific organisational
            needs.
          </p>
        </div>
        <figure className="mt-16">
          <Image
            alt="An image of a woman taking part in a virtual mental health training course"
            src={virtualTraining}
            className="aspect-video rounded-xl bg-gray-50 object-cover"
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
            <InformationCircleIcon
              aria-hidden="true"
              className="mt-0.5 size-5 flex-none text-gray-300"
            />
            Interactive virtual sessions designed for maximum engagement and
            learning.
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Comprehensive resources for ongoing support
          </h2>
          <p className="mt-6">
            Workshop participants receive access to our digital resource
            library, containing additional reading materials, exercise
            templates, and self-assessment tools. These resources support the
            continued implementation of workshop concepts and provide guidance
            for addressing new challenges as they arise.
          </p>
          <p className="mt-8">
            Our virtual format offers flexibility without sacrificing quality.
            Sessions can be scheduled to accommodate different time zones and
            work patterns, making it easier to include remote and distributed
            teams. All workshops include interactive elements to ensure
            engagement and knowledge retention.
          </p>
        </div>
      </div>
    </div>
  );
}
