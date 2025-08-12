import {
  HeroSection,
  VideoSection,
  ProblemStatementSection,
  CounterSection,
  ProgramsSection,
  WhyChooseSection,
  SocialProofSection,
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
      <FaqSection />
      {/* <SocialProofSection /> */}
      <BrochuresSection />
    </>
  );
}
