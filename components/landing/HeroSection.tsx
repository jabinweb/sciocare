'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import BookDemo from '@/components/BookDemo';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500 relative overflow-hidden pt-24 pb-20">
      {/* Subtle Cloud Elements - Acadru Style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-16 w-32 h-20 bg-white/8 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-24 bg-white/6 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-28 h-16 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-16 bg-white/5 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        
        {/* Professional Trust Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-full mb-10 border border-white/30 shadow-lg">
          🏥 <span className="text-white">Trusted by 50+ Healthcare Institutions</span>
        </div>
        
        {/* Professional Headline with Better Contrast */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-tight drop-shadow-lg">
          <span className="block mb-4">Healthcare Communication Training</span>
          <span className="block">
            <span className="text-white">That </span>
            <span className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-2xl font-black inline-block transform hover:scale-105 transition-transform duration-200 shadow-xl">
              Actually Works
            </span>
          </span>
        </h1>
        
        {/* Professional Value Proposition */}
        <p className="text-lg md:text-xl text-white mb-14 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
          Transform from clinical expert to <span className="font-bold text-white">confident communicator</span> in just 8 weeks.<br />
          <span className="text-white/95">Evidence-based methods. Real-world results.</span>
        </p>

        {/* Professional CTA */}
        <div className="mb-14">
          <BookDemo>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-5 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Start Your Training
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </BookDemo>
        </div>

        {/* Professional Program Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <div className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold text-sm shadow-md">
            Foundation Program
          </div>
          <div className="bg-white/25 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-sm border border-white/40 hover:bg-white/35 transition-colors cursor-pointer">
            Advanced Certification
          </div>
          <div className="bg-white/25 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-sm border border-white/40 hover:bg-white/35 transition-colors cursor-pointer">
            Leadership Excellence
          </div>
        </div>

        {/* Enhanced Stats Display with Better Contrast */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white text-sm drop-shadow-sm">
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
        </div>

      </div>
    </section>
  );
}
        
        