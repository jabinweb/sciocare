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
      <VideoSection />
      <ProblemStatementSection />
      {/* <CounterSection /> */}
      <ProgramsSection />
      <WhyChooseSection />
      <SocialProofSection />
      <BrochuresSection />
    </>
  );
}
