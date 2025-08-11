import {
  HeroSection,
  VideoSection,
  ProblemStatementSection,
  CounterSection,
  ProgramsSection,
  WhyChooseSection,
  SocialProofSection,
  BrochuresSection
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
    </>
  );
}
