import Image from "next/image";
import { getTrainingCourses } from "@/sanity/accessData/getTrainingCoursesData";
import { urlForImage } from "@/sanity/lib/image";
import { VirtualCourseCard } from "@/types/virtualCourses";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  description?: string;
  duration?: string;
  imageUrl: string;
  slug: string;
}

const CourseCard = ({
  title,
  description,
  duration,
  imageUrl,
  slug,
}: CourseCardProps) => {
  return (
    <Link href={`/virtual-training/${slug}`} className="block">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:outline-2 hover:outline-emerald-600 hover:outline-offset-4 cursor-pointer group">
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {duration && (
                <span className="inline-block mr-4">
                  <span className="font-medium">Duration:</span> {duration}
                </span>
              )}
            </div>
            <span className="text-lg font-medium underline underline-offset-8 decoration-transparent text-emerald-600 transition-all group-hover:text-emerald-700 group-hover:decoration-emerald-600 cursor-pointer">
              Learn More
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default async function OurCourses() {
  const courses = await getTrainingCourses();

  return (
    <div className="py-24 sm:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our Courses
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Empower your team to support their own and each other&apos;s mental
          health. Designed and delivered by our in-house psychologists, our
          courses are available in-person or virtually and can also be taken in
          a self-guided learning format.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course: VirtualCourseCard) => (
          <CourseCard
            key={course.slug.current}
            title={course.title}
            description={course.outline}
            duration={course.duration}
            imageUrl={urlForImage(course.headerImage)}
            slug={course.slug.current}
          />
        ))}
      </div>
    </div>
  );
}
