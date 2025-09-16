import Image from "next/image";
import Link from "next/link";
import { getTrainingCourses } from "@/sanity/accessData/getTrainingCoursesData";
import { urlForImage } from "@/sanity/lib/image";
import { VirtualCourseCard } from "@/types/virtualCourses";

export const revalidate = 3600;

// Helper function to parse duration and convert to minutes for sorting
function parseDurationToMinutes(duration: string | undefined): number {
  if (!duration) return 0;

  // Check for full day first (assuming 8 hours = 480 minutes)
  const fullDay = duration.match(/full\s*day/i);
  if (fullDay) return 480;

  // Check for half day (assuming 4 hours = 240 minutes)
  const halfDay = duration.match(/half\s*day/i);
  if (halfDay) return 240;

  // Original hour/minute parsing
  const hours = duration.match(/(\d+)\s*h/i);
  const minutes = duration.match(/(\d+)\s*m/i);

  const hoursValue = hours ? parseInt(hours[1]) * 60 : 0;
  const minutesValue = minutes ? parseInt(minutes[1]) : 0;

  return hoursValue + minutesValue;
}

interface BentoCourseCardProps {
  course: VirtualCourseCard;
  gridClass: string;
  roundedClass: string;
}

const BentoCourseCard = ({
  course,
  gridClass,
  roundedClass,
}: BentoCourseCardProps) => {
  return (
    <div className={`relative ${gridClass}`}>
      <div className="absolute inset-0 rounded-lg bg-white dark:bg-gray-800" />
      <Link
        href={`/our-courses/${course.slug.current}`}
        className={`relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] ${roundedClass} group ring-emerald-600 ring-offset-8 hover:ring-2`}
      >
        <div className="relative h-80 flex-shrink-0">
          <Image
            src={urlForImage(course.headerImage)}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
        </div>
        <div className="px-8 py-4 flex-grow flex flex-col justify-between">
          {course.duration && (
            <h3 className="text-sm/4 font-semibold text-emerald-600 dark:text-emerald-400">
              Duration: {course.duration}
            </h3>
          )}
          <p className="mt-2 text-xl font-medium tracking-tight text-gray-950 dark:text-white line-clamp-3">
            {course.title}
          </p>
          {/* <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400 flex-grow">
            {course.outline}
          </p> */}
          <span className="mt-4 inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
            Learn More
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </Link>
      <div
        className={`pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 ${roundedClass} dark:outline-white/15`}
      />
    </div>
  );
};

export default async function OurCourses() {
  const courses = await getTrainingCourses();

  // Sort courses by duration (longest first)
  const sortedCourses = [...courses].sort((a, b) => {
    const durationA = parseDurationToMinutes(a.duration);
    const durationB = parseDurationToMinutes(b.duration);
    return durationB - durationA;
  });

  // Take first 5 courses for the bento grid
  const displayCourses = sortedCourses.slice(0, 5);

  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <h2 className="text-base/7 font-semibold text-emerald-600 dark:text-emerald-400">
            Professional Development
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl dark:text-white">
            Our Mental Health Training Courses
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Empower your team to support their own and each other&apos;s mental
            health. Designed by our in-house psychologists and delivered
            virtually.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2 lg:h-[1000px]">
          {/* Large course cards - Top row (2 courses) */}
          {displayCourses[0] && (
            <BentoCourseCard
              course={displayCourses[0]}
              gridClass="lg:col-span-3"
              roundedClass="max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]"
            />
          )}

          {displayCourses[1] && (
            <BentoCourseCard
              course={displayCourses[1]}
              gridClass="lg:col-span-3"
              roundedClass="lg:rounded-tr-[calc(2rem+1px)]"
            />
          )}

          {/* Smaller course cards - Bottom row (up to 3 courses) */}
          {displayCourses[2] && (
            <BentoCourseCard
              course={displayCourses[2]}
              gridClass="lg:col-span-2"
              roundedClass="lg:rounded-bl-[calc(2rem+1px)]"
            />
          )}

          {displayCourses[3] && (
            <BentoCourseCard
              course={displayCourses[3]}
              gridClass="lg:col-span-2"
              roundedClass=""
            />
          )}

          {displayCourses[4] && (
            <BentoCourseCard
              course={displayCourses[4]}
              gridClass="lg:col-span-2"
              roundedClass="max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]"
            />
          )}
        </div>

        {/* Show remaining courses link if there are more than 5 */}
        {courses.length > 5 && (
          <div className="mt-10 text-center">
            <Link
              href="/our-courses/all"
              className="inline-flex items-center text-base font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              View all {courses.length} courses
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
