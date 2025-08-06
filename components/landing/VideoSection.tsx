'use client';

import { PlayCircle, Users, Award, CheckCircle } from 'lucide-react';

export default function VideoSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-orange-50/30"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            {/* Badge */}
            {/* <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <PlayCircle className="w-4 h-4 text-orange-400 mr-2" />
              <span className="text-sm font-medium text-white/90">Watch Our Story</span>
            </div> */}

            {/* Heading */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Discover ScioCare
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Explore our programs and see how we equip caregivers with skills, confidence, and workplace readiness.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                'Role-specific English & communication training',
                'Comprehensive soft-skills development',
                'Industry-recognized certifications',
                'Proven track record with 1000+ professionals'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200 p-2">
              {/* Video Container */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe 
                  className="absolute inset-0 w-full h-full rounded-xl"
                  src="https://videos.sproutvideo.com/embed/109bdbb71e1be7c69a/3d42d33d18df72bb" 
                  frameBorder="0" 
                  allowFullScreen 
                  referrerPolicy="no-referrer-when-downgrade" 
                  title="ScioCare Video - Healthcare Education Excellence"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
