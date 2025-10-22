import Image from "next/image";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import selfGuidedTraining from "@public/virtual-training.jpg";

export default function SelfGuidedTraining() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <p className="text-base/7 font-semibold text-emerald-600">
          Digital Resources
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          Mental Health at Work
        </h1>
        <p className="mt-6 text-xl/8">
          Our comprehensive self-guided resources empower individuals to develop
          mental health skills at their own pace. Designed by workplace
          wellbeing experts, these materials offer flexibility while delivering
          professional-grade mental health education.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            Self-directed learning allows employees to access mental health
            resources when they&apos;re most receptive to the content. Our
            carefully structured materials build knowledge progressively,
            allowing learners to revisit challenging concepts and integrate
            practices into their daily work routines in a personalized way.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-emerald-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  On-Demand Access.
                </strong>{" "}
                Access evidence-based resources anytime, anywhere through our
                secure digital platform. Perfect for distributed teams, shift
                workers, and busy professionals who need flexibility in their
                learning schedule.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-emerald-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Interactive Modules.
                </strong>{" "}
                Engage with interactive exercises, reflective prompts, and
                self-assessments that deepen understanding and encourage
                practical application of mental health concepts in the
                workplace.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-emerald-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Progress Tracking.
                </strong>{" "}
                Monitor learning progress with built-in tracking tools that help
                maintain motivation and identify areas for further focus.
                Optional organisational dashboards provide anonymized completion
                metrics.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Each self-guided module combines educational content with actionable
            strategies that can be immediately applied. From quick reference
            guides to comprehensive learning paths, our resources accommodate
            different learning preferences and time constraints, ensuring mental
            health education is accessible to everyone in your organisation.
          </p>
          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Learn at your own pace, implement with confidence
          </h2>
          <p className="mt-6">
            Self-guided learning removes many barriers to mental health
            education. By allowing individuals to engage with sensitive topics
            privately and progress at a comfortable speed, our resources create
            a safe space for genuine growth. This approach often results in
            deeper internalization of concepts and greater willingness to adopt
            new practices.
          </p>
          <figure className="mt-10 border-l border-emerald-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                &quot;The self-guided modules were exactly what I needed. I
                could review the materials during quiet periods and really take
                time to reflect on how they applied to my situation. I&apos;ve
                implemented several of the stress management techniques, and
                they&apos;ve made a tangible difference in how I handle
                workplace pressure.&quot;
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <Image
                alt=""
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-6 flex-none rounded-full bg-gray-50"
                width={200}
                height={200}
              />
              <div className="text-sm/6">
                <strong className="font-semibold text-gray-900">
                  Amira Hassan
                </strong>{" "}
                – Project Manager
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            Our self-guided resources are regularly updated to incorporate the
            latest research and best practices in workplace mental health.
            Subscribing organisations receive automatic access to new and
            updated materials, ensuring your mental health resources remain
            current and effective.
          </p>
        </div>
        <figure className="mt-16">
          <Image
            alt="A person engaging with self-guided mental health learning materials on a tablet"
            src={selfGuidedTraining}
            className="aspect-video rounded-xl bg-gray-50 object-cover"
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
            <InformationCircleIcon
              aria-hidden="true"
              className="mt-0.5 size-5 flex-none text-gray-300"
            />
            Self-guided resources available across multiple devices for
            convenient learning.
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Comprehensive library of specialized content
          </h2>
          <p className="mt-6">
            Our self-guided library covers a wide range of workplace mental
            health topics, from foundational concepts to specialized content for
            specific roles and industries. organisations can curate recommended
            learning paths or allow employees to explore topics based on
            personal interest and relevance to their role.
          </p>
          <p className="mt-8">
            Self-guided resources complement our virtual and in-person
            workshops, creating a holistic approach to mental health education.
            Many organisations implement a blended learning strategy, using
            self-guided materials to reinforce and extend concepts introduced in
            facilitated sessions. This comprehensive approach accelerates
            cultural change and improves return on investment.
          </p>
        </div>
      </div>
    </div>
  );
}
