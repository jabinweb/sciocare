'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BookDemo from '@/components/BookDemo';
import { CheckCircle, Download, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function ProgramsSection() {
  const programs = [
    {
      id: 'carebridge',
      title: 'CareBridge English',
      subtitle: 'Builds job-specific English and workplace communication skills to help students thrive in clinical settings and prepare for global opportunities.',
      target: 'All students',
      duration: '80 hours',
      logo: '/logos/carebridge.png',
      image: '/carebridge.jpg',
      color: 'bg-blue-700',
      brochure: '/ScioCare_CareBridge.pdf',
      features: [
        'Workbook-first lessons with QR-coded video support',
        'Clinical English practice: LSRW',
        'IELTS/OET-inspired structure for international relevance',
        'Gamified tools for self-practice',
        'Classroom-led or self-paced delivery'
      ]
    },
    {
      id: 'caresteps',
      title: 'CareSteps',
      subtitle: 'A soft-skills foundation program that helps new students transition smoothly into nursing education.',
      target: 'First-year nursing students',
      duration: '20 hours',
      logo: '/logos/caresteps.png',
      image: '/caresteps.jpg',
      color: 'bg-orange-500',
      brochure: '/ScioCare_CareSteps.pdf',
      features: [
        'Essential personal and interpersonal skills',
        'Learning strategies and study discipline',
        'Communication skill for clinical settings',
        'Reflective tasks and video-based lessons',
        'On-campus mentor model with year-long support'
      ]
    },
    {
      id: 'pathways360',
      title: 'Pathways360°',
      subtitle: 'A workplace readiness and career grooming program that helps final-year students make a confident transition into professional roles.',
      target: 'Final-year nursing students',
      duration: '30 hours',
      logo: '/logos/pathways.png',
      image: '/pathways.jpg',
      color: 'bg-blue-600',
      brochure: '/ScioCare_Pathways 360.pdf',
      features: [
        'Workplace communication & interaction skills',
        'Collaboration & leadership in healthcare settings',
        'Professional presentation & public speaking',
        'Expert-led masterclasses on workplace trends',
        'AI-powered resume building & interview prep',
        'On-campus mentor model'
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
            const isEven = index % 2 === 0;
            
            return (
              <div key={program.id} className="space-y-8 lg:space-y-0">
                {/* Mobile: Image first, then content */}
                <div className="lg:hidden">
                  {/* Mobile Image */}
                  <div className="relative mb-8">
                    <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={program.image}
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

                  {/* Mobile Content */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center p-2`}>
                        <Image
                          src={program.logo}
                          alt={`${program.title} logo`}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2 text-xs">
                          For: {program.target}
                        </Badge>
                        <h3 className="font-heading text-2xl font-bold text-gray-900">
                          {program.title}
                        </h3>
                        {/* <Badge variant="outline" className="mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {program.duration}
                        </Badge> */}
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

                    <div className="flex md:flex-nowrap flex-wrap gap-3">
                      <a href={program.brochure} download>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download Brochure
                        </Button>
                      </a>
                      <BookDemo>
                        <Button className={`${program.color} hover:opacity-90 text-white`}>
                          <Calendar className="w-4 h-4 mr-1" />
                          Book a Demo
                        </Button>
                      </BookDemo>
                    </div>
                  </div>
                </div>

                {/* Desktop: Two column layout with alternating sides */}
                <div className={`hidden lg:grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Content */}
                  <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-white shadow-md border border-gray-200 rounded-2xl flex items-center justify-center p-2`}>
                        <Image
                          src={program.logo}
                          alt={`${program.title} logo`}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2 text-xs">
                          For: {program.target}
                        </Badge>
                        <h3 className="font-heading text-2xl font-bold text-gray-900">
                          {program.title}
                        </h3>
                        {/* <Badge variant="outline" className="mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {program.duration}
                        </Badge> */}
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
                      <a href={program.brochure} download>
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
                        src={program.image}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
