// import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FullWidthContainer from "@/components/FullWidthContainer";
import FullWidthContainerRoundedBottom from "@/components/FullWidthContainerRoundedBottom";
import Container from "@/components/Container";
import WhatIsPasuDotIo from "@/components/WhatIsPasuDotIo";
import OurCourses from "@/components/OurCourses";
import VirtualTraining from "@/components/VirtualTraining";
import FaceToFaceTraining from "@/components/FaceToFaceTraining";
import SelfGuidedLearning from "@/components/SelfGuidedLearning";

export default function Home() {
  return (
    <>
      <FullWidthContainer bg="bg-amber-50">
        <Container>
          <HeroSection />
        </Container>
      </FullWidthContainer>
      <FullWidthContainer bg="bg-white">
        <Container>
          <div id="our-training-courses">
            <OurCourses />
          </div>
        </Container>
      </FullWidthContainer>
      <FullWidthContainer bg="bg-amber-50">
        <div id="virtual-training">
          <VirtualTraining />
        </div>
      </FullWidthContainer>
      <FullWidthContainer bg="bg-white">
        <div id="face-to-face-training">
          <FaceToFaceTraining />
        </div>
      </FullWidthContainer>
      <FullWidthContainer bg="bg-amber-50">
        <div id="self-guided-learning">
          <SelfGuidedLearning />
        </div>
      </FullWidthContainer>
      <FullWidthContainerRoundedBottom bg="bg-white">
        <Container>
          <div id="what-is-pasu-dot-io">
            <WhatIsPasuDotIo />
          </div>
        </Container>
      </FullWidthContainerRoundedBottom>
    </>
  );
}
