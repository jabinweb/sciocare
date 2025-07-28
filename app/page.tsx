'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, GraduationCap, CheckCircle, Download, Calendar, Clock, PlayCircle, BookOpen, Target, Award } from 'lucide-react';
import Image from 'next/image';

export default function CarePage() {
  const programs = [
    {
      id: 'carebridge',
      title: 'CareBridge English',
      subtitle: 'Empowering caregivers with role‑specific English and workplace communication skills',
      duration: '80 hours',
      icon: Heart,
      color: 'bg-blue-500',
      features: [
        'Interactive, workbook‑first lessons with QR‑coded video support',
        'Clinical communication practice in listening, speaking, reading & writing',
        'IELTS/OET‑inspired structure for global and practical relevance',
        'Classroom‑facilitated or fully self‑paced delivery',
        'Self‑learning resources (videos, notes, review games) for independent practice'
      ]
    },
    {
      id: 'caresteps',
      title: 'CareSteps',
      subtitle: 'Foundational soft‑skills training for freshers entering caregiving professions',
      duration: '20 hours',
      icon: Users,
      color: 'bg-green-500',
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
      color: 'bg-purple-500',
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

  const whyChooseFeatures = [
    {
      icon: Target,
      title: 'Role‑Specific Design',
      description: 'Built for healthcare languages & behaviours, not generic English.'
    },
    {
      icon: Clock,
      title: 'Blended & Flexible',
      description: 'Classroom‑led, self‑paced, or hybrid delivery to fit your schedule.'
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: 'Trainers & mentors with real‑world nursing, clinical, and pedagogy experience.'
    },
    {
      icon: Award,
      title: 'Measurable Outcomes',
      description: 'Assessments, CV audits, and completion certificates to track learner progress.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
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
          <div className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-lg">
            <Heart className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-sm font-medium text-white/90">Healthcare Education Excellence</span>
          </div>
          
          <h1 className="font-heading mb-8">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              ScioCare
            </span>
            <span className="block text-xl md:text-2xl lg:text-3xl font-normal text-white/80 tracking-wide">
              Professional Healthcare Training
            </span>
          </h1>
          
          <p className="font-body text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-10">
            Equipping healthcare professionals with essential communication and professional skills through evidence-based training programs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold text-base px-8 py-3 shadow-xl rounded-lg">
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch Overview
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 font-semibold text-base px-8 py-3 rounded-lg">
              <Download className="w-5 h-5 mr-2" />
              Download Brochure
            </Button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Healthcare Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive skill development programs designed specifically for healthcare professionals
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
                      <Button className={`${program.color} hover:opacity-90 text-white`}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Get Brochure
                      </Button>
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

      {/* Why Choose ScioCare Section */}
      <section id="why-choose" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ScioCare?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our programs are specifically designed for healthcare professionals with proven methodologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <Card key={index} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-heading text-lg font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-slate-900/30"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Heart className="w-16 h-16 text-white mx-auto mb-6" />
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to empower your students?
          </h2>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Download our full program brochures or schedule a demo with our team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold">
              <Download className="w-5 h-5 mr-2" />
              Download PDFs
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 font-semibold">
              <Calendar className="w-5 h-5 mr-2" />
              Book a Demo
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>500+ Healthcare Professionals Trained</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              <span>95% Course Completion Rate</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
