import { notFound } from "next/navigation";
import Image from "next/image";
import { getTrainingCourse } from "@/sanity/accessData/getTrainingCoursesData";
import { urlForImage } from "@/sanity/lib/image";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getTrainingCourse(slug);

  if (!course) {
    notFound();
  }

  const headerImageUrl = course.headerImage
    ? urlForImage(course.headerImage)
    : null;

  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <svg x="50%" y={-1} className="overflow-visible fill-emerald-500/10">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#d2158d6e-7d03-4cc4-a2bd-151760b470a0)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-emerald-700">
                Course Details
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {course.title}
              </h1>
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          {headerImageUrl && (
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-xl shadow-xl ring-1 ring-gray-400/10">
              <Image
                src={headerImageUrl}
                alt={course.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <div className="py-12 space-y-12">
                {/* Who is this course for */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-emerald-800">
                    Who is this course for?
                  </h2>
                  <p className="text-lg text-gray-700">{course.forWho}</p>
                </section>

                {/* Duration */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-emerald-800">
                    How long does it last?
                  </h2>
                  <p className="text-lg text-gray-700">{course.duration}</p>
                </section>

                {/* Course Aims */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-emerald-800">
                    What are the course&apos;s aims?
                  </h2>
                  <p className="text-lg text-gray-700">{course.aims}</p>
                </section>

                {/* Course Outline */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-emerald-800">
                    Course Outline
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                    {course.outline.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
