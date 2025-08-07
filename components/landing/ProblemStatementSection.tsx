'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Users, Clock, TrendingDown, ArrowRight } from 'lucide-react';
import BookDemo from '@/components/BookDemo';

export default function ProblemStatementSection() {
  const painPoints = [
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      problem: "Communication Barriers",
      description: "Healthcare professionals struggle with patient interactions due to language barriers and lack of soft skills training.",
      stat: "67% report communication issues",
      impact: "Leads to patient dissatisfaction and medical errors"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      problem: "Lengthy Onboarding",
      description: "New hires take months to become workplace-ready, delaying productivity and increasing training costs.",
      stat: "4-6 months average onboarding",
      impact: "High training costs and delayed ROI"
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-purple-600" />,
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-red-50 text-red-700 text-sm font-semibold rounded-full mb-6">
            The Healthcare Communication Crisis
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Healthcare Professionals Struggle in the Workplace
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Despite having excellent clinical skills, many healthcare professionals face significant challenges when it comes to workplace communication. Here&apos;s what hospitals and healthcare institutions are dealing with:
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <Card key={index} className="p-8 border-l-4 border-l-red-500 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {point.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {point.problem}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {point.description}
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg mb-3">
                    <div className="text-2xl font-bold text-red-700 mb-1">
                      {point.stat}
                    </div>
                    <div className="text-sm text-red-600">
                      {point.impact}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Cost Impact */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Hidden Cost of Poor Communication
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Communication issues in healthcare don&apos;t just affect patient satisfaction - they impact your bottom line significantly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-700 mb-2">₹15L+</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">Average Annual Cost</div>
              <div className="text-xs text-gray-600">Per untrained professional (turnover + retraining)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-700 mb-2">40%</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">Productivity Loss</div>
              <div className="text-xs text-gray-600">During extended onboarding periods</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-700 mb-2">60%</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">Patient Complaints</div>
              <div className="text-xs text-gray-600">Related to communication issues</div>
            </div>
          </div>
        </div>

        {/* Solution Transition */}
        <div className="text-center bg-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            There&apos;s a Better Way
          </h3>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            What if you could hire healthcare professionals who are <strong>workplace-ready from day one</strong>? 
            What if communication barriers could be eliminated before they even start working?
          </p>
          <BookDemo>
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold">
              See How ScioCare Solves This
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </BookDemo>
        </div>

      </div>
    </section>
  );
}
