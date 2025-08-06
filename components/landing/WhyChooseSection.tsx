import { Card, CardContent } from '@/components/ui/card';
import { Target, Clock, Users, Award } from 'lucide-react';

export default function WhyChooseSection() {
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
    <section id="why-choose" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
  );
}
