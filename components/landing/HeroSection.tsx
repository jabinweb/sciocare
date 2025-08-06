'use client';

import { Button } from '@/components/ui/button';
import { Heart, PlayCircle, Download } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/6130537/6130537-hd_1920_1080_30fps.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-green-600"></div>
        </video>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* <div className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-lg">
          <Heart className="w-4 h-4 text-orange-400 mr-2" />
          <span className="text-sm font-medium text-white/90">Healthcare Education Excellence</span>
        </div> */}
        
        <h1 className="font-heading mb-8">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            ScioCare
          </span>
          <span className="block text-xl md:text-2xl lg:text-3xl font-normal text-white/80 tracking-wide">
            Equipping Caregivers with Confidence
          </span>
        </h1>
        
        <p className="font-body text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-10">
          Our training solutions build the language, behavior, and workplace confidence caregivers need to succeed—from classrooms in India to hospitals around the globe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#brochures">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold text-base px-8 py-3 shadow-xl rounded-lg">
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch Overview
            </Button>
          </a>
          <a href="#brochures">
            <Button size="lg" variant="outline" className="border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 font-semibold text-base px-8 py-3 rounded-lg">
              <Download className="w-5 h-5 mr-2" />
              Download Brochures
            </Button>
          </a>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
