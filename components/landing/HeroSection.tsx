"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import BookDemo from "@/components/BookDemo";

export default function HeroSection() {
  const skills = [
    "English Skills",
    "Academic Skills",
    "Presentation Skills",
    "Communication Skills",
    "Critical Thinking Skills",
  ];

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-green-600"></div>
          {/* Fallback gradient background */}
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10 pt-24 pb-20">
        {/* Professional Trust Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-full mb-10 border border-white/30 shadow-lg">
          <span className="text-white">Trusted by 1000+ Learners</span>
        </div>

        {/* Professional Headline with Better Contrast */}
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-black text-white mb-8 leading-tight drop-shadow-lg">
          <span className="block mb-4">
            Equipping future-ready healthcare professionals with essential
          </span>
          <span className="block">
            <span
              className={`bg-yellow-400 text-gray-800 px-5 py-2 rounded-2xl font-black inline-block transform hover:scale-105 transition-all duration-300 shadow-xl min-w-[280px] sm:min-w-[350px] md:min-w-[420px] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {skills[currentSkillIndex]}
            </span>
          </span>
        </h1>

        {/* Professional Value Proposition */}
        <p className="text-lg md:text-xl text-white mb-14 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
          Your students’ journey to{" "}
          <span className="font-bold text-white">confident caregiving</span>
          starts here!
          <br />
          <span className="text-white/95">
            Evidence-based methods. Real-world results.
          </span>
        </p>

        {/* Professional CTA */}
        <div className="mb-14">
          <BookDemo>
            <Button
              size="lg"
              className="bg-white animate-shake text-blue-700 hover:bg-blue-50 px-10 py-5 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </BookDemo>
        </div>

        {/* Professional Program Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <div className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold text-sm shadow-md">
            English for Healthcare
          </div>
          <div className="bg-white/25 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-sm border border-white/40 hover:bg-white/35 transition-colors">
            Skills for Freshers
          </div>
          <div className="bg-white/25 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-sm border border-white/40 hover:bg-white/35 transition-colors">
            Finishing School Program
          </div>
        </div>

        {/* Enhanced Stats Display with Better Contrast */}
        {/* <div className="flex flex-wrap items-center justify-center gap-6 text-white text-sm drop-shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg">1000+</span>
            <span className="text-white/95">professionals trained</span>
          </div>
          <div className="w-1 h-1 bg-white/70 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg">95%</span>
            <span className="text-white/95">career advancement</span>
          </div>
          <div className="w-1 h-1 bg-white/70 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg">HIPAA</span>
            <span className="text-white/95">compliant training</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}

