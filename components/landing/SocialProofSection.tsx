'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Quote, Star, Users, TrendingUp, Award } from 'lucide-react';
import BookDemo from '@/components/BookDemo';
import Image from 'next/image';

export default function SocialProofSection() {
  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Senior Nurse, Apollo Hospitals",
      content: "ScioCare's training helped me communicate confidently with international patients. My confidence improved dramatically in just 8 weeks.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Rajesh Kumar",
      role: "Medical Assistant, Fortis Healthcare",
      content: "The role-specific English training was exactly what I needed. I got promoted within 3 months of completing the program.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Sarah Johnson",
      role: "HR Director, Max Healthcare",
      content: "ScioCare transformed our hiring process. We now have healthcare professionals who are truly workplace-ready from day one.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    }
  ];

  const partners = [
    { name: "Apollo Hospitals", logo: "🏥" },
    { name: "Fortis Healthcare", logo: "🏥" },
    { name: "Max Healthcare", logo: "🏥" },
    { name: "Manipal Hospitals", logo: "🏥" },
    { name: "Narayana Health", logo: "🏥" },
    { name: "AIIMS", logo: "🏥" }
  ];

  const outcomes = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      metric: "1000+",
      label: "Professionals Trained",
      description: "Successfully upskilled healthcare workers"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      metric: "95%",
      label: "Job Placement Rate",
      description: "Within 6 months of completion"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      metric: "4.9/5",
      label: "Average Rating",
      description: "From learners and employers"
    },
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      metric: "50+",
      label: "Partner Institutions",
      description: "Leading healthcare organizations"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Leaders Across India
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of healthcare professionals who have advanced their careers with ScioCare&apos;s proven training programs.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {outcomes.map((outcome, index) => (
            <Card key={index} className="p-6 text-center border-0 shadow-lg bg-white">
              <div className="flex justify-center mb-4">
                {outcome.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {outcome.metric}
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {outcome.label}
              </div>
              <div className="text-xs text-gray-500">
                {outcome.description}
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            What Our Learners Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg bg-white">
                <div className="flex items-center mb-4">
                  <Quote className="w-6 h-6 text-blue-600 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Trusted by Leading Healthcare Institutions
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{partner.logo}</div>
                <div className="text-sm text-gray-600 font-medium">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {/* <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            See how our training can transform your healthcare team&apos;s communication skills and career prospects.
          </p>
          <BookDemo>
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold">
              Schedule Your Demo
            </Button>
          </BookDemo>
        </div> */}

      </div>
    </section>
  );
}
