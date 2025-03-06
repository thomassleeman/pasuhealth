import React from "react";
import Image from "next/image";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
}

const CourseCard = ({
  title,
  description,
  duration,
  imageUrl,
}: CourseCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:outline-2 hover:outline-emerald-600 hover:outline-offset-4 cursor-pointer">
      <div className="relative h-48 w-full">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="inline-block mr-4">
              <span className="font-medium">Duration:</span> {duration}
            </span>
            {/* <span className="inline-block">
              <span className="font-medium">Level:</span> {level}
            </span> */}
          </div>
          <button className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default function VirtualTrainingCourses() {
  const courses = [
    {
      title: "Stress Management in the Workplace",
      description:
        "Learn effective techniques to manage workplace stress and improve your mental wellbeing.",
      duration: "6 hours",
      // level: "Beginner",
      imageUrl: "/virtualTrainingCoursesImages/meditation-mountains.jpg",
    },
    {
      title: "Building Resilience for Teams",
      description:
        "Develop resilience strategies for your team to thrive in challenging work environments.",
      duration: "8 hours",
      // level: "Intermediate",
      imageUrl: "/virtualTrainingCoursesImages/meditation-mountains.jpg",
    },
  ];

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
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
}
