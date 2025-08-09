'use client';

import { Button } from '@/components/ui/button';
import BookDemo from '@/components/BookDemo';
import { Stethoscope, Download, Calendar, Users, Award } from 'lucide-react';

export default function BrochuresSection() {
  return (
    <section id="brochures" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-orange-900/10 to-slate-900/30"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-700 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Stethoscope className="w-16 h-16 text-white mx-auto mb-6" />
        
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
          <BookDemo>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 font-semibold">
              <Calendar className="w-5 h-5 mr-2" />
              Book a Demo
            </Button>
          </BookDemo>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span>1000+ Students Empowered</span>
          </div>
          <div className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            <span>INC Syllabus Aligned</span>
          </div>
          <div className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            <span>Compliant with NEP 2020</span>
          </div>
        </div>
      </div>
    </section>
  );
}
