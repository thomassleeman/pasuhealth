"use client";

// components/HeroSection.tsx
import React, { useState } from "react";
import Image from "next/image";
import { CalendarDaysIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  AcademicCapIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import AaronGif from "@/public/thumb.gif";

interface CardProps {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  variant?: "primary" | "secondary";
}

const Card: React.FC<CardProps> = ({
  label,
  title,
  description,
  buttonText,
  buttonHref,
  variant = "secondary",
}) => {
  // Define unique visual elements for each card type
  const getCardVisuals = () => {
    switch (label.toLowerCase()) {
      case "training":
        return (
          <>
            {/* Icon with gradient background */}
            <div className="mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg">
                <AcademicCapIcon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-sky-600 to-transparent rounded-t-2xl" />
          </>
        );

      case "consultancy":
        return (
          <>
            {/* Icon with gradient background */}
            <div className="mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ChartBarIcon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent rounded-t-2xl" />
          </>
        );
      case "pasu.io":
        return (
          <>
            {/* Icon with gradient background */}
            <div className="mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ComputerDesktopIcon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-600 to-transparent rounded-t-2xl" />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Background pattern - very subtle */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent" />
      </div>

      {/* Card content */}
      <div className="relative p-8">
        {/* Unique visual elements */}
        {getCardVisuals()}

        <div className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">
          {label}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>

        <a
          href={buttonHref}
          className={`
            inline-flex items-center justify-center rounded-lg py-3 px-6 text-sm font-semibold
            transition-all duration-200 group-hover:translate-x-1
            ${
              variant === "primary"
                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md hover:shadow-lg"
                : "bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300"
            }
          `}
        >
          {buttonText}
          <svg
            className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100 transition-opacity"
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
        </a>
      </div>
    </div>
  );
};

const VideoCard: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative">
        <div className="uppercase text-xs font-semibold tracking-widest text-emerald-600 mb-4">
          Welcome
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Let Aaron take you through what we do
        </h3>

        {/* Video container */}
        <div className="relative rounded-xl overflow-hidden mb-6">
          {!isPlaying ? (
            // Thumbnail with play overlay
            <div
              className="relative group cursor-pointer"
              onClick={handlePlayVideo}
            >
              <Image
                src={AaronGif}
                alt="Aaron - Introduction Video"
                width={500}
                height={281} // Adjust based on your GIF's aspect ratio
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
                unoptimized // Important for GIFs to animate
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-white/15 group-hover:bg-white/10 transition-colors duration-300 flex items-center justify-center">
                <PlayCircleIcon className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          ) : (
            // Vimeo video embed
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src="https://player.vimeo.com/video/1106073662?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                title="PASU Health Introduction Video"
              />
            </div>
          )}
        </div>

        <button
          onClick={handlePlayVideo}
          className="inline-flex items-center cursor-pointer justify-center w-full rounded-lg py-3 px-6 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          <PlayCircleIcon className="w-5 h-5 mr-2" />
          Watch the video
        </button>
      </div>
    </div>
  );
};

export default function HeroSection() {
  return (
    <div className="relative mb-12">
      {/* Main Hero Section */}
      <section className="py-16 lg:py-20 2xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row xl:gap-x-12 items-center">
            <div className="xl:w-3/5 mb-12 xl:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Let&apos;s make a plan to tackle Burnout in{" "}
                <span className="relative">
                  <span className="relative z-10 text-emerald-700">
                    your team
                  </span>
                  {/* Decorative underline */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                  >
                    <path
                      d="M1 5.5C1 5.5 30 1 60 1C90 1 120 6 150 6C180 6 199 3 199 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-emerald-600"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Don&apos;t allow stress and burnout to take a toll on your
                people. We are a small team passionate about helping businesses
                like yours to create a healthier work culture and a happier
                team.
              </p>
              <a
                href="/schedule-a-consultation"
                className="inline-flex items-center gap-3 bg-emerald-600 text-white rounded-xl py-4 px-8 text-lg font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Book a free consultation
                <CalendarDaysIcon className="w-6 h-6" />
              </a>
            </div>

            <div className="xl:w-2/5 w-full max-w-md xl:max-w-none">
              <VideoCard />
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="pb-16 bg-white/50 p-8 pt-12 rounded-2xl shadow-lg">
        <h2 className="text-2xl text-center font-semibold text-gray-900 mb-8">
          Our Services
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              label="Training"
              title="Mental Health Training Courses"
              description="Courses covering stress and burnout and supporting employees, created by our experts and delivered virtually."
              buttonText="Explore courses"
              buttonHref="/#our-training-courses"
            />

            <Card
              label="Consultancy"
              title="Workplace wellness review and planning service"
              description="Proven strategies and resources designed to build resilience and foster wellbeing in your workplace."
              buttonText="Learn more"
              buttonHref="/#consultancy"
            />
            <Card
              label="pasu.io"
              title="Workplace wellness platform"
              description="Our comprehensive workplace mental health platform. On a mission to promote understanding and prevention of burnout."
              buttonText="Learn more"
              buttonHref="#what-is-pasu-dot-io"
              // variant="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// import React, { useState } from "react";
// import thumb from "@public/thumb.jpg";
// import Image from "next/image";
// import { CalendarDaysIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
// import {
//   ChartBarIcon,
//   AcademicCapIcon,
//   ComputerDesktopIcon,
// } from "@heroicons/react/24/outline";

// interface CardProps {
//   label: string;
//   title: string;
//   description: string;
//   buttonText: string;
//   buttonHref: string;
//   variant?: "primary" | "secondary";
// }

// const Card: React.FC<CardProps> = ({
//   label,
//   title,
//   description,
//   buttonText,
//   buttonHref,
//   variant = "secondary",
// }) => {
//   // Define unique visual elements for each card type
//   const getCardVisuals = () => {
//     switch (label.toLowerCase()) {
//       case "training":
//         return (
//           <>
//             {/* Icon with gradient background */}
//             <div className="mb-6">
//               <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <AcademicCapIcon className="w-7 h-7 text-white" />
//               </div>
//             </div>

//             {/* Decorative accent line */}
//             <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-sky-600 to-transparent rounded-t-2xl" />
//           </>
//         );

//       case "consultancy":
//         return (
//           <>
//             {/* Icon with gradient background */}
//             <div className="mb-6">
//               <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <ChartBarIcon className="w-7 h-7 text-white" />
//               </div>
//             </div>

//             {/* Decorative accent line */}
//             <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent rounded-t-2xl" />
//           </>
//         );
//       case "pasu.io":
//         return (
//           <>
//             {/* Icon with gradient background */}
//             <div className="mb-6">
//               <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <ComputerDesktopIcon className="w-7 h-7 text-white" />
//               </div>
//             </div>

//             {/* Decorative accent line */}
//             <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-600 to-transparent rounded-t-2xl" />
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 hover:border-gray-200">
//       {/* Background pattern - very subtle */}
//       <div className="absolute inset-0 opacity-[0.02]">
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent" />
//       </div>

//       {/* Card content */}
//       <div className="relative p-8">
//         {/* Unique visual elements */}
//         {getCardVisuals()}

//         <div className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">
//           {label}
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
//           {title}
//         </h3>
//         <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>

//         <a
//           href={buttonHref}
//           className={`
//             inline-flex items-center justify-center rounded-lg py-3 px-6 text-sm font-semibold
//             transition-all duration-200 group-hover:translate-x-1
//             ${
//               variant === "primary"
//                 ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md hover:shadow-lg"
//                 : "bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300"
//             }
//           `}
//         >
//           {buttonText}
//           <svg
//             className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100 transition-opacity"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </a>
//       </div>
//     </div>
//   );
// };

// const VideoCard: React.FC = () => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayVideo = () => {
//     setIsPlaying(true);
//   };

//   return (
//     <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
//       <div className="relative">
//         <div className="uppercase text-xs font-semibold tracking-widest text-emerald-600 mb-4">
//           Welcome
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900 mb-6">
//           Let Aaron take you through what we do
//         </h3>

//         {/* Video container */}
//         <div className="relative rounded-xl overflow-hidden mb-6">
//           {!isPlaying ? (
//             // Thumbnail with play overlay
//             <div
//               className="relative group cursor-pointer"
//               onClick={handlePlayVideo}
//             >
//               <Image
//                 src={thumb}
//                 alt="Aaron - Introduction Video"
//                 width={500}
//                 height={500}
//                 className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
//               />
//               {/* Play button overlay */}
//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
//                 <PlayCircleIcon className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-300" />
//               </div>
//             </div>
//           ) : (
//             // Vimeo video embed
//             <div className="relative pb-[56.25%] h-0">
//               <iframe
//                 src="https://player.vimeo.com/video/1106073662?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
//                 frameBorder="0"
//                 allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
//                 allowFullScreen
//                 className="absolute top-0 left-0 w-full h-full"
//                 title="PASU Health Introduction Video"
//               />
//             </div>
//           )}
//         </div>

//         <button
//           onClick={handlePlayVideo}
//           className="inline-flex items-center justify-center w-full rounded-lg py-3 px-6 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
//         >
//           <PlayCircleIcon className="w-5 h-5 mr-2" />
//           Watch the video
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function HeroSection() {
//   return (
//     <div className="relative mb-12">
//       {/* Main Hero Section */}
//       <section className="py-16 lg:py-20 2xl:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col xl:flex-row xl:gap-x-12 items-center">
//             <div className="xl:w-3/5 mb-12 xl:mb-0">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
//                 Let&apos;s make a plan to tackle Burnout in{" "}
//                 <span className="relative">
//                   <span className="relative z-10 text-emerald-700">
//                     your team
//                   </span>
//                   {/* Decorative underline */}
//                   <svg
//                     className="absolute -bottom-2 left-0 w-full"
//                     height="8"
//                     viewBox="0 0 200 8"
//                   >
//                     <path
//                       d="M1 5.5C1 5.5 30 1 60 1C90 1 120 6 150 6C180 6 199 3 199 3"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       fill="none"
//                       className="text-emerald-600"
//                     />
//                   </svg>
//                 </span>
//               </h1>
//               <p className="text-xl text-gray-600 mb-10 leading-relaxed">
//                 Don&apos;t allow stress and burnout to take a toll on your
//                 people. We are a small team passionate about helping businesses
//                 like yours to create a healthier work culture and a happier
//                 team.
//               </p>
//               <a
//                 href="/schedule-a-consultation"
//                 className="inline-flex items-center gap-3 bg-emerald-600 text-white rounded-xl py-4 px-8 text-lg font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
//               >
//                 Book a free consultation
//                 <CalendarDaysIcon className="w-6 h-6" />
//               </a>
//             </div>

//             <div className="xl:w-2/5 w-full max-w-md xl:max-w-none">
//               <VideoCard />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Cards Section */}
//       <section className="pb-16 bg-white/50 p-8 pt-12 rounded-2xl shadow-lg">
//         <h2 className="text-2xl text-center font-semibold text-gray-900 mb-8">
//           Our Services
//         </h2>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <Card
//               label="Training"
//               title="Mental Health Training Courses"
//               description="Courses covering stress and burnout and supporting employees, created by our experts and delivered virtually."
//               buttonText="Explore courses"
//               buttonHref="/#our-training-courses"
//             />

//             <Card
//               label="Consultancy"
//               title="Workplace wellness review and planning service"
//               description="Proven strategies and resources designed to build resilience and foster wellbeing in your workplace."
//               buttonText="Learn more"
//               buttonHref="/#consultancy"
//             />
//             <Card
//               label="pasu.io"
//               title="Workplace wellness platform"
//               description="Our comprehensive workplace mental health platform. On a mission to promote understanding and prevention of burnout."
//               buttonText="Learn more"
//               buttonHref="#what-is-pasu-dot-io"
//               // variant="primary"
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
