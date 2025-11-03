import {
  HeroSection,
  VideoSection,
  ProblemStatementSection,
  ProgramsSection,
  WhyChooseSection,
  BrochuresSection,
  FaqSection
} from '@/components/landing';

export default function CarePage() {
  return (
    <>
      <HeroSection />
      <ProblemStatementSection />
      <VideoSection />
      {/* <CounterSection /> */}
      <ProgramsSection />
      <WhyChooseSection />
      {/* <SocialProofSection /> */}
      <BrochuresSection />
      <FaqSection />
    </>
  );
}
