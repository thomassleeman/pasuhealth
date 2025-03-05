// import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FullWidthContainer from "@/components/FullWidthContainer";
import Container from "@/components/Container";
import WhatIsPasuDotIo from "@/components/WhatIsPasuDotIo";

export default function Home() {
  return (
    <>
      <FullWidthContainer bg="bg-amber-50">
        <Container>
          <HeroSection />
        </Container>
      </FullWidthContainer>
      <FullWidthContainer bg="bg-amber-50/25">
        <Container>
          <div id="what-is-pasu-dot-io">
            <WhatIsPasuDotIo />
          </div>
        </Container>
      </FullWidthContainer>
    </>
  );
}
