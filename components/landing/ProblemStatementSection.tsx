'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, Users, Clock, TrendingDown, ArrowRight } from 'lucide-react';
import BookDemo from '@/components/BookDemo';

export default function ProblemStatementSection() {
  const painPoints = [
    {
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      problem: "Communication Barriers",
      description: "Healthcare professionals struggle with patient interactions due to language barriers and lack of soft skills training.",
      stat: "67% report communication issues",
      impact: "Leads to patient dissatisfaction and medical errors"
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      problem: "Lengthy Onboarding",
      description: "New hires take months to become workplace-ready, delaying productivity and increasing training costs.",
      stat: "4-6 months average onboarding",
      impact: "High training costs and delayed ROI"
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-yellow-600" />,
      problem: "High Turnover Rates",
      description: "Healthcare professionals leave due to inadequate communication skills and workplace confidence issues.",
      stat: "23% annual turnover rate",
      impact: "Constant recruitment and retraining costs"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
      problem: "Skills-Job Mismatch",
      description: "Clinical skills don&apos;t translate to workplace communication, creating a gap between education and employment.",
      stat: "78% feel unprepared for work",
      impact: "Lower job satisfaction and performance"
    }
  ];

  return (
    <section className="py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-yellow-500/80 backdrop-blur-md text-white text-sm font-semibold rounded-full mb-6 border border-yellow-400/50 shadow-lg">
            The Healthcare Communication Crisis
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
            Why Healthcare Professionals Struggle in the Workplace
          </h2>
          <p className="text-xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Despite having excellent clinical skills, many healthcare professionals face significant challenges when it comes to workplace communication. Here&apos;s what hospitals and healthcare institutions are dealing with:
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <div key={index} className="group p-8 bg-white/15 backdrop-blur-lg hover:bg-white/25 transition-all duration-500 rounded-2xl border border-white/30 shadow-2xl hover:shadow-3xl hover:scale-105">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 p-3 bg-white/90 rounded-full backdrop-blur-md shadow-lg">
                  {point.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">
                    {point.problem}
                  </h3>
                  <p className="text-white/90 mb-6 leading-relaxed text-lg">
                    {point.description}
                  </p>
                  <div className="bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/40 shadow-lg">
                    <div className="text-2xl font-bold text-yellow-200 mb-2 drop-shadow-md">
                      {point.stat}
                    </div>
                    <div className="text-sm text-yellow-100/90">
                      {point.impact}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Impact */}
        <div className="bg-gradient-to-r from-white/15 to-white/20 backdrop-blur-lg rounded-3xl p-10 mb-16 border border-white/40 shadow-2xl">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
              The Hidden Cost of Poor Communication
            </h3>
            <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
              Communication issues in healthcare don&apos;t just affect patient satisfaction - they impact your bottom line significantly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
              <div className="text-4xl font-bold text-yellow-300 mb-3 drop-shadow-lg">₹15L+</div>
              <div className="text-lg font-semibold text-white mb-2">Average Annual Cost</div>
              <div className="text-sm text-white/80">Per untrained professional (turnover + retraining)</div>
            </div>
            <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
              <div className="text-4xl font-bold text-yellow-300 mb-3 drop-shadow-lg">40%</div>
              <div className="text-lg font-semibold text-white mb-2">Productivity Loss</div>
              <div className="text-sm text-white/80">During extended onboarding periods</div>
            </div>
            <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
              <div className="text-4xl font-bold text-yellow-300 mb-3 drop-shadow-lg">60%</div>
              <div className="text-lg font-semibold text-white mb-2">Patient Complaints</div>
              <div className="text-sm text-white/80">Related to communication issues</div>
            </div>
          </div>
        </div>

        {/* Solution Transition */}
        <div className="text-center bg-white/15 backdrop-blur-lg rounded-3xl p-10 border border-white/30 shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
            There&apos;s a Better Way
          </h3>
          <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
            What if you could hire healthcare professionals who are <strong className="text-yellow-300">workplace-ready from day one</strong>? 
            What if communication barriers could be eliminated before they even start working?
          </p>
          <BookDemo>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-5 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              See How ScioCare Solves This
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </BookDemo>
        </div>

      </div>
    </section>
  );
}

