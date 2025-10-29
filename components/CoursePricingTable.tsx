import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface Course {
  title: string;
  headerImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  pricing: {
    pricePerParticipant: number;
    pricingNotes?: string;
  };
  maxParticipants: number;
  duration?: string;
}

interface CoursePricingTableProps {
  courses: Course[];
}

export default function CoursePricingTable({
  courses,
}: CoursePricingTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Course Pricing</h2>
        <p className="text-sm text-gray-600 mt-1">
          View pricing and participant limits for all available courses
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price per Participant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Participants
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course, index) => (
              <tr key={index} className="">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {course.headerImage && (
                      <div className="flex-shrink-0 h-12 w-12 relative rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={urlForImage(course.headerImage) || ""}
                          alt={course.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <div className="text-sm font-medium text-gray-900">
                      {course.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {course.duration || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-semibold">
                    £{course.pricing.pricePerParticipant.toFixed(2)}
                  </div>
                  {course.pricing.pricingNotes && (
                    <div className="text-xs text-gray-500 mt-1">
                      {course.pricing.pricingNotes}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {course.maxParticipants}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
