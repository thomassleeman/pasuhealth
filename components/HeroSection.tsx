// components/HeroSection.tsx
import React from "react";
// import Image from "next/image";
import MentalHealth from "@/public/MentalHealthPuzzle";

interface CardProps {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

const Card: React.FC<CardProps> = ({
  label,
  title,
  description,
  buttonText,
  buttonHref,
}) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg h-fit">
      <div className="uppercase text-sm font-medium tracking-wider mb-4">
        {label}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-6">{description}</p>
      <a href={buttonHref}>
        <div
          className={`inline-block rounded-md py-3 px-4 w-full text-center font-semibold hover:outline-4 outline-sky-300/50 outline-offset-4 ${
            label === "pasu.io"
              ? "bg-emerald-800 text-white"
              : "border border-gray-300 text-black"
          }`}
        >
          {buttonText}
        </div>
      </a>
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="py-16 mt-20 2xl:mt-36">
      <div className="max-w-7xl mx-auto xl:max-w-full">
        <div className="flex flex-col xl:flex-row xl:gap-x-6 justify-between items-center">
          <div className="xl:w-2/3 mb-10 xl:mb-0 xl:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold mb-12 xl:pl-2">
              Workplace Mental Health is a{" "}
              <span className="underline underline-offset-4 decoration-4 text-emerald-700 drop-shadow-2xl">
                team effort.
              </span>{" "}
              <span>We&apos;re here to make it a reality for your team.</span>
              {/* <span className="underline decoration-2">products</span> */}
              {/* <br className="hidden md:block" /> that put safety at the */}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                label="pasu.io"
                title="Workplace wellness platform"
                description="Our comprehensive workplace mental health platform. On a mission to promote understanding and prevention of burnout."
                buttonText="Go to pasu.io ⤴"
                buttonHref="https://pasu.io"
              />

              <Card
                label="Mental Health Training"
                title="Expert-led learning"
                description="Workplace mental health training courses."
                buttonText="Learn more"
                buttonHref="/#virtual-training"
              />
            </div>
          </div>

          <div className="hidden xl:block xl:w-1/3">
            <div className="relative h-full">
              <MentalHealth />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
