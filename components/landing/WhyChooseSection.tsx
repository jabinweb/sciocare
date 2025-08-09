import { Card, CardContent } from '@/components/ui/card';
import { Target, Clock, Users, Award } from 'lucide-react';

export default function WhyChooseSection() {
  const whyChooseFeatures = [
    {
      icon: Target,
      emoji: '✅',
      title: 'Role‑Specific Learning',
      description: 'Designed exclusively for nursing and caregiving—focused on real clinical language, communication, and behavior.'
    },
    {
      icon: Clock,
      emoji: '🔄',
      title: 'Flexible Delivery Models',
      description: 'Available in classroom, self-paced, or hybrid formats—adaptable to your institution\'s needs.'
    },
    {
      icon: Users,
      emoji: '👩‍⚕️',
      title: 'Aligned with Standards',
      description: 'Supports NEP 2020 goals—integrating soft skills, communication, and career-readiness and follows INC syllabus.'
    },
    {
      icon: Award,
      emoji: '📊',
      title: 'Trackable Progress & Outcomes',
      description: 'Periodic assessments, reflection journals, edited resumes, and completion certificates—so institutions and students can see measurable growth.'
    }
  ];

  return (
    <section id="why-choose" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ScioCare?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Purpose-built for healthcare education. Proven to build confident, career-ready caregivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-blue-700 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                    {/* <div className="absolute -top-2 -right-2 text-2xl">
                      {feature.emoji}
                    </div> */}
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
  );
}
