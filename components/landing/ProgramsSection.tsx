'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BookDemo from '@/components/BookDemo';
import { Heart, Users, GraduationCap, CheckCircle, Download, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';

export default function ProgramsSection() {
  const programs = [
    {
      id: 'carebridge',
      title: 'CareBridge English',
      subtitle: 'Empowering caregivers with role‑specific English and workplace communication skills',
      duration: '80 hours',
      icon: Heart,
      color: 'bg-blue-700',
      features: [
        'Interactive, workbook‑first lessons with QR‑coded video support',
        'Clinical communication practice in listening, speaking, reading & writing',
        'IELTS/OET‑inspired structure for global and practical relevance',
        'Classroom‑facilitated or fully self‑paced delivery',
        'Gamified resources for independent practice'
      ]
    },
    {
      id: 'caresteps',
      title: 'CareSteps',
      subtitle: 'Foundational soft‑skills training for freshers entering caregiving professions',
      duration: '20 hours',
      icon: Users,
      color: 'bg-orange-500',
      features: [
        'Core self‑management and emotional resilience practices',
        'Communication essentials for academic and clinical settings',
        'Learning strategies and college-readiness tools',
        'Reflective assignments and interactive video lessons',
        'On-campus mentor model with year-long access to resources'
      ]
    },
    {
      id: 'pathways360',
      title: 'Pathways360°',
      subtitle: 'Finishing‑school program for healthcare professionals for personal, social, and professional readiness',
      duration: '30 hours',
      icon: GraduationCap,
      color: 'bg-blue-600',
      features: [
        'Core self‑management and emotional resilience practices',
        'Communication essentials for clinical settings',
        'Presentation and Public speaking Skills',
        'Periodic Live Sessions with Experts',
        'AI-powered portfolio building and Interview preparation',
        'On-campus mentor model with year-long access to resources'
      ]
    }
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Learning Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover three specialized programs designed to prepare caregivers for every stage of their journey.
          </p>
        </div>

        <div className="space-y-16">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={program.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {program.duration}
                      </Badge>
                      <h3 className="font-heading text-2xl font-bold text-gray-900">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    {program.subtitle}
                  </p>

                  <div className="space-y-3">
                    {program.features.map((feature, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a href="#brochures">
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Brochure
                      </Button>
                    </a>
                    <BookDemo>
                      <Button className={`${program.color} hover:opacity-90 text-white`}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Book a Demo
                      </Button>
                    </BookDemo>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={`https://images.unsplash.com/photo-${
                        index === 0 ? '1725870953863-4ad4db0acfc2' : // Healthcare professionals
                        index === 1 ? '1559757148-5c350d0d3c56' : // Training session
                        '1582750433449-648ed127bb54' // Medical education
                      }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{program.duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
