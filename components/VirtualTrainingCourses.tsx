import React from "react";
import Image from "next/image";
import { getVirtualTrainingCourses } from "@/sanity/accessData/getVirtualTrainingCoursesData";
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

// const CourseCard = ({
//   title,
//   description,
//   duration,
//   imageUrl,
//   slug,
// }: CourseCardProps) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:outline-2 hover:outline-emerald-600 hover:outline-offset-4 cursor-pointer">
//       <div className="relative h-48 w-full">
//         <Image src={imageUrl} alt={title} fill className="object-cover" />
//       </div>
//       <div className="p-8">
//         <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
//         <p className="mt-2 text-gray-600">{description}</p>
//         <div className="mt-4 flex items-center justify-between">
//           <div className="text-sm text-gray-500">
//             {duration && (
//               <span className="inline-block mr-4">
//                 <span className="font-medium">Duration:</span> {duration}
//               </span>
//             )}
//           </div>
//           <button className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer">
//             <Link href={`/virtual-training/${slug}`}>Learn More</Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

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

export default async function VirtualTrainingCourses() {
  const courses = await getVirtualTrainingCourses();
  console.log("courses: ", courses);

  return (
    <div className="py-24 sm:py-32" id="virtual-training-courses">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Virtual Training Courses
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Enhance your mental wellbeing at work with our specialized training
          courses designed for individuals and teams.
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

// import React from "react";
// import Image from "next/image";

// interface CourseCardProps {
//   title: string;
//   description: string;
//   duration: string;
//   imageUrl: string;
// }

// const CourseCard = ({
//   title,
//   description,
//   duration,
//   imageUrl,
// }: CourseCardProps) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:outline-2 hover:outline-emerald-600 hover:outline-offset-4 cursor-pointer">
//       <div className="relative h-48 w-full">
//         <Image src={imageUrl} alt={title} fill className="object-cover" />
//       </div>
//       <div className="p-8">
//         <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
//         <p className="mt-2 text-gray-600">{description}</p>
//         <div className="mt-4 flex items-center justify-between">
//           <div className="text-sm text-gray-500">
//             <span className="inline-block mr-4">
//               <span className="font-medium">Duration:</span> {duration}
//             </span>
//             {/* <span className="inline-block">
//               <span className="font-medium">Level:</span> {level}
//             </span> */}
//           </div>
//           <button className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function VirtualTrainingCourses() {
//   const courses = [
//     {
//       title: "Stress Management at Work (in depth)",
//       description:
//         "In-depth full-day course focussing on techniques to manage workplace stress and improve your mental wellbeing.",
//       duration: "1 day",
//       // level: "Beginner",
//       imageUrl: "/virtualTrainingCoursesImages/meditation-mountains.jpg",
//     },
//     {
//       title: "Stress Management at Work",
//       description:
//         "Learn effective techniques to manage workplace stress and improve your mental wellbeing.",
//       duration: "4 hours",
//       // level: "Intermediate",
//       imageUrl: "/virtualTrainingCoursesImages/meditation-mountains.jpg",
//     },
//   ];

//   return (
//     <div className="py-24 sm:py-32" id="virtual-training-courses">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           Virtual Training Courses
//         </h2>
//         <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
//           Enhance your mental wellbeing at work with our specialized training
//           courses designed for individuals and teams.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {courses.map((course, index) => (
//           <CourseCard key={index} {...course} />
//         ))}
//       </div>
//     </div>
//   );
// }
