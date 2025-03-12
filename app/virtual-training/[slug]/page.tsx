import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import { getTrainingCourse } from "@/sanity/accessData/getTrainingCoursesData";
import { urlForImage } from "@/sanity/lib/image";

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const course = await getTrainingCourse(slug);

  if (!course) {
    notFound();
  }

  const headerImageUrl = course.headerImage
    ? urlForImage(course.headerImage)
    : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Header Image */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        {headerImageUrl && (
          <Image
            src={headerImageUrl}
            alt={course.title}
            fill={true}
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
            {course.title}
          </h1>
        </div>
      </div>

      <Container>
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
      </Container>
    </main>
  );
}
