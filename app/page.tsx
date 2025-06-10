// import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FullWidthContainer from "@/components/containers/FullWidthContainer";
import FullWidthContainerRoundedBottom from "@/components/containers/FullWidthContainerRoundedBottom";
import Container from "@/components/containers/Container";
import FullWidthContainerTop from "@/components/containers/FullWidthContainerTop";
import WhatIsPasuDotIo from "@/components/WhatIsPasuDotIo";
import OurCourses from "@/components/OurCourses";
import VirtualTraining from "@/components/VirtualTraining";
import FaceToFaceTraining from "@/components/FaceToFaceTraining";
import SelfGuidedLearning from "@/components/SelfGuidedLearning";
import CTASection from "@/components/CTASection";
import RiskCheckerCTA from "@/components/RiskCheckerCTA";

export default function Home() {
  return (
    <>
      <FullWidthContainerTop bg="bg-amber-50">
        <Container>
          <HeroSection />
        </Container>
      </FullWidthContainerTop>
      <FullWidthContainer bg="bg-white">
        <RiskCheckerCTA />
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
      <FullWidthContainer bg="bg-transparent">
        <CTASection />
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
