"use client";

// components/HeroSection.tsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  AcademicCapIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import AaronGif from "@/public/thumb.gif";

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

      {/* <section className="flex justify-center items-stretch">
        <Link
          href="/#our-training-courses"
          className="p-8 flex items-center text-center max-w-md gap-x-4 hover:underline underline-offset-8 decoration-emerald-600 decoration-2"
        >
          <AcademicCapIcon className="w-10 h-10 text-emerald-600 mb-4 " />
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Mental Health Training Courses
          </h3>
        </Link>
        <Link
          href="/#consultancy"
          className="p-8 flex items-center text-center max-w-md gap-x-4 hover:underline underline-offset-8 decoration-emerald-600 decoration-2"
        >
          <ChartBarIcon className="w-10 h-10 text-amber-600 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Review and Planning Service
          </h3>
        </Link>
        <Link
          href="/#what-is-pasu-dot-io"
          className="p-8 flex items-center text-center max-w-md gap-x-4 hover:underline underline-offset-8 decoration-emerald-600 decoration-2"
        >
          <ComputerDesktopIcon className="w-10 h-10 text-sky-600 mb-4 mr-2" />
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Workplace Wellbeing Platform
          </h3>
        </Link>
      </section> */}
    </div>
  );
}
