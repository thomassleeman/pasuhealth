// import Image from "next/image";
import HeroSection from "@/components/HeroSectionNew";
import FullWidthContainer from "@/components/containers/FullWidthContainer";
import FullWidthContainerRoundedBottom from "@/components/containers/FullWidthContainerRoundedBottom";
import Container from "@/components/containers/Container";
import FullWidthContainerTop from "@/components/containers/FullWidthContainerTop";
import WhatIsPasuDotIo from "@/components/WhatIsPasuDotIo";
import OurCourses from "@/components/OurCourses";
import Consulting from "@/components/Consulting";
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
        <Container>
          <div id="consultancy">
            <Consulting />
          </div>
        </Container>
      </FullWidthContainer>
      <FullWidthContainer bg="bg-white">
        <Container>
          <div id="what-is-pasu-dot-io">
            <WhatIsPasuDotIo />
          </div>
        </Container>
      </FullWidthContainer>
      <FullWidthContainerRoundedBottom bg="bg-transparent">
        <CTASection />
      </FullWidthContainerRoundedBottom>
    </>
  );
}
