import Image from "next/image";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import faceToFaceTraining from "@public/face-to-face-training.jpg";

export default function InPersonTraining() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <p className="text-base/7 font-semibold text-emerald-600">
          On-Site Workshops
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          Mental Health at Work
        </h1>
        <p className="mt-6 text-xl/8">
          Our in-person workshops bring mental health expertise directly to your
          workplace. These immersive sessions create powerful learning
          environments where teams can develop essential skills together,
          facilitated by experienced mental health professionals.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            Face-to-face interaction enhances the learning experience for mental
            health topics, allowing for nuanced discussions and immediate
            feedback. Our on-site courses are carefully designed to maximize
            engagement and foster a collaborative atmosphere where sensitive
            topics can be addressed effectively and with appropriate care.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-emerald-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Collaborative Workshops.
                </strong>{" "}
                Participate in guided group exercises that build practical
                skills through shared experience. These collaborative sessions
                strengthen team bonds while developing a common understanding of
                mental health principles.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-emerald-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Personalized Guidance.
                </strong>{" "}
                Receive individualized attention from our facilitators who can
                address specific concerns and adapt techniques to your
                organization&apos;s unique culture and challenges.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-emerald-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Immediate Implementation.
                </strong>{" "}
                Practice new skills in a supportive environment with real-time
                feedback. This hands-on approach ensures participants leave with
                confidence in their ability to apply what they&apos;ve learned.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Our facilitators create a safe, confidential space where
            participants feel comfortable discussing mental health challenges.
            The physical presence of both facilitator and colleagues creates a
            unique dynamic that encourages authentic sharing and deeper learning
            that resonates throughout your organization.
          </p>
          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Create lasting change through shared experience
          </h2>
          <p className="mt-6">
            When teams learn together in person, the impact extends beyond the
            workshop itself. Shared vocabulary, techniques, and experiences
            become reference points that strengthen your workplace culture and
            create ongoing opportunities for mutual support and growth.
          </p>
          <figure className="mt-10 border-l border-emerald-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                &quot;Having our entire leadership team in the same room for the
                mental health workshop was transformative. The energy and
                connections formed during those sessions continue to influence
                how we support each other months later. It&apos;s changed our
                company culture in ways online training simply
                couldn&apos;t.&quot;
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-6 flex-none rounded-full bg-gray-50"
              />
              <div className="text-sm/6">
                <strong className="font-semibold text-gray-900">
                  Michael Chen
                </strong>{" "}
                – Operations Director
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            We manage all logistics for on-site sessions, bringing necessary
            materials and creating an optimal learning environment within your
            workplace. This minimizes disruption while maximizing the impact of
            the training investment.
          </p>
        </div>
        <figure className="mt-16">
          <Image
            alt="A group participating in an in-person mental health workshop"
            src={faceToFaceTraining}
            className="aspect-video rounded-xl bg-gray-50 object-cover"
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
            <InformationCircleIcon
              aria-hidden="true"
              className="mt-0.5 size-5 flex-none text-gray-300"
            />
            In-person workshops foster deeper connections and immediate skill
            application.
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Tailored to your organization&apos;s unique needs
          </h2>
          <p className="mt-6">
            Every workplace has distinct challenges and dynamics. Our in-person
            workshops are customized based on pre-session consultations that
            identify your specific needs. This targeted approach ensures the
            content directly addresses your organization&apos;s mental health
            priorities.
          </p>
          <p className="mt-8">
            Following each workshop, participants receive physical and digital
            resources to reinforce learning. Our facilitators remain available
            for follow-up questions, ensuring the momentum continues after the
            session concludes. This comprehensive approach creates sustainable
            change in how your organization approaches mental wellbeing.
          </p>
        </div>
      </div>
    </div>
  );
}
