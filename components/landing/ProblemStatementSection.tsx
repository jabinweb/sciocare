'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, Users, ArrowRight, Globe, Monitor, ExternalLink } from 'lucide-react';
import BookDemo from '@/components/BookDemo';
import { useState } from 'react';

export default function ProblemStatementSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const painPoints = [
    {
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      problem: "Job-Ready ≠ Work-Ready",
      description: "Nursing graduates know the theory but struggle with practical, day-to-day communication—speaking to patients, reporting to doctors, handling tense moments, or even writing shift notes.",
      stat: "10% Employable",
      impact: "Most healthcare graduates lack the soft skills needed to succeed from day one.",
      source: {
        title: "Only 10% of healthcare graduates in India are considered employable.",
        publication: "The Hindu BusinessLine (April 2023)",
        article: "Skill gap hits healthcare sector — only 10% of graduates are job-ready",
        link: "https://businessline.com"
      }
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
      problem: "Transition Shock",
      description: "The leap from classroom to clinic is overwhelming. New nurses face anxiety, self-doubt, and burnout during their first year—especially when expected to handle patients and teams with confidence.",
      stat: "69% Want Soft Skills",
      impact: "Students say communication and emotional readiness should be part of their training throughout.",
      source: {
        title: "69% of nursing students believe soft skills should be part of their curriculum.",
        publication: "National Center for Biotechnology Information (NCBI), 2018",
        article: "Awareness and Importance of Soft Skills among Nursing Students",
        link: "https://ncbi.nlm.nih.gov"
      }
    },
    {
      icon: <Globe className="w-8 h-8 text-yellow-600" />,
      problem: "Global Dreams, English Gaps",
      description: "Thousands of nursing students aim to work abroad—but their spoken English, patient interaction, and documentation skills often fall short of global workplace standards.",
      stat: "7.0 IELTS Barrier",
      impact: "Most fall below the required IELTS score, missing out on international placements and global careers.",
      source: {
        title: "Most international nursing jobs require a 7.0 band in IELTS; many Indian candidates fall below 6.5.",
        publication: "NMC UK (Nursing and Midwifery Council)",
        article: "IELTS requirement for international nurses is overall 7.0, with no band below 7.0 in speaking, reading, or listening",
        link: "https://nmc.org.uk"
      }
    },
    {
      icon: <Monitor className="w-8 h-8 text-yellow-600" />,
      problem: "Not Ready for Tech-First Care",
      description: "With telemedicine, AI-assisted tools, and electronic health records becoming standard, many nurses lack practical training in technology-enabled healthcare workflows.",
      stat: "22% More Demand",
      impact: "Digital-first healthcare jobs are growing fast, but colleges aren't keeping pace.",
      source: {
        title: "Healthcare jobs in India saw a 22% rise between 2021 and 2023, driven by digital health.",
        publication: "The Hindu BusinessLine (March 2023)",
        article: "Demand for healthcare workers in India grew 22% during 2021–23",
        link: "https://businessline.com"
      }
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
      {/* Light Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-2 bg-yellow-500/80 backdrop-blur-md text-gray-900 text-xs md:text-sm font-medium rounded-full mb-8 md:mb-10 border border-yellow-400/50 shadow-lg pointer-events-none">
            <span className="text-white">The Healthcare Communication Crisis</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900 drop-shadow-sm px-4">
            Why Nursing Graduates Struggle in the Workplace
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
            Despite solid academic training, many nursing students are unprepared for the real-world demands of modern healthcare. The issue isn&apos;t clinical competence—it&apos;s a critical gap in communication, confidence, and digital readiness.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {painPoints.map((point, index) => (
            <div key={index} className="group p-6 md:p-8 bg-white/80 backdrop-blur-lg hover:bg-white/90 transition-all duration-500 rounded-2xl border border-white/60 shadow-xl hover:shadow-2xl hover:scale-105">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0 p-3 bg-white/90 rounded-full backdrop-blur-md shadow-lg self-center sm:self-start border border-gray-200">
                  {point.icon}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">
                    #{index + 1}. {point.problem}
                  </h3>
                  <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
                    {point.description}
                  </p>
                  <div 
                    className="relative bg-gradient-to-r from-orange-600/80 to-orange-700/80 backdrop-blur-sm p-4 rounded-xl border border-orange-500/50 shadow-lg cursor-pointer"
                    onMouseEnter={() => setHoveredStat(index)}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    <div className="text-xl md:text-2xl font-bold text-white mb-2">
                      {point.stat}
                    </div>
                    <div className="text-sm text-orange-50/90">
                      {point.impact}
                    </div>

                    {/* Hover Tooltip */}
                    {hoveredStat === index && (
                      <div 
                        className="tooltip absolute bottom-full left-0 right-0 mb-2 p-3 md:p-4 bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl z-10"
                        onMouseEnter={() => setHoveredStat(index)}
                        onMouseLeave={() => setHoveredStat(null)}
                      >
                        <div className="text-xs md:text-sm text-white mb-2 font-semibold">
                          {point.source.title}
                        </div>
                        <div className="text-xs text-gray-300 mb-1">
                          Source: {point.source.publication}
                        </div>
                        <div className="text-xs text-gray-400 mb-3">
                          &quot;{point.source.article}&quot;
                        </div>
                        <a 
                          href={point.source.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Source
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Solution Transition */}
        <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/60 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">
            Bridging the Readiness Gap
          </h3>
          <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            ScioCare prepares nursing students for the real world—by building <strong className="text-blue-700">communication confidence, workplace behavior, and digital fluency</strong>. Graduates walk in not just qualified—but ready.
          </p>
          <BookDemo>
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-6 md:px-10 py-4 md:py-5 text-lg md:text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              Book a Demo
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
            </Button>
          </BookDemo>
        </div>

      </div>
    </section>
  );
}

