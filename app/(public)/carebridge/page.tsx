'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import BookDemo from '@/components/BookDemo';
import {
  CheckCircle,
  Download,
  Clock,
  Users,
  BookOpen,
  Award,
  Globe,
  MessageSquare,
  Gamepad2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function CareBridgePage() {
  const keyFeatures = [
    {
      icon: BookOpen,
      title: 'Integrated Learning Model',
      description: 'High-quality learning videos and responsive classroom activities'
    },
    {
      icon: MessageSquare,
      title: 'QR-Coded Video Lessons',
      description: 'Structured workbook with QR codes for easy review and reinforcement'
    },
    {
      icon: Globe,
      title: 'IELTS/OET Inspired',
      description: 'Framework designed for practical and global relevance'
    },
    {
      icon: Award,
      title: 'Healthcare Vocabulary',
      description: 'Strong emphasis on clinical communication and hospital documentation'
    },
    {
      icon: Gamepad2,
      title: 'Self-Learning Resources',
      description: 'Videos, notes, and review games for independent practice'
    },
    {
      icon: Users,
      title: 'Flexible Delivery',
      description: 'Classroom-facilitated or self-paced learning modes'
    }
  ];

  const courseModules = [
    {
      title: 'Foundations of Communication',
      duration: '10 hours',
      topics: [
        'Essential vocabulary and grammar for hospital interactions',
        'Greetings, introductions, and polite requests',
        'Basic healthcare terminology',
        'Professional communication basics'
      ]
    },
    {
      title: 'Patient Interaction',
      duration: '10 hours',
      topics: [
        'Asking and answering questions effectively',
        'Giving clear instructions to patients',
        'Using reassuring language',
        'Building patient rapport'
      ]
    },
    {
      title: 'Understanding & Giving Information',
      duration: '10 hours',
      topics: [
        'Listening and speaking skills for patient concerns',
        'Providing clear explanations of procedures',
        'Describing care routines',
        'Active listening techniques'
      ]
    },
    {
      title: 'Describing People & Conditions',
      duration: '10 hours',
      topics: [
        'Medical vocabulary for physical descriptions',
        'Body parts and anatomical terms',
        'Describing symptoms and conditions',
        'Using appropriate medical adjectives'
      ]
    },
    {
      title: 'Time, Schedules & Routines',
      duration: '10 hours',
      topics: [
        'Days, times, and frequency expressions',
        'Discussing appointments and schedules',
        'Medication timing communication',
        'Shift responsibilities and handovers'
      ]
    },
    {
      title: 'At the Nurse\'s Station',
      duration: '10 hours',
      topics: [
        'Workplace communication and note-taking',
        'Writing clear instructions',
        'Formal register with peers and seniors',
        'Professional documentation'
      ]
    },
    {
      title: 'Emergencies & Protocols',
      duration: '10 hours',
      topics: [
        'Emergency-related vocabulary',
        'Reporting incidents effectively',
        'Responding to urgent situations',
        'Protocol communication'
      ]
    },
    {
      title: 'Revision & Real-Life Application',
      duration: '10 hours',
      topics: [
        'Case studies and real scenarios',
        'Clinical dialogues and role-plays',
        'Comprehensive language reinforcement',
        'Practical application exercises'
      ]
    }
  ];

  const programHighlights = [
    {
      stat: '80',
      label: 'Training Hours',
      description: 'Comprehensive integrated curriculum'
    },
    {
      stat: '8',
      label: 'Core Units',
      description: 'Structured learning pathway'
    },
    {
      stat: '2',
      label: 'Delivery Modes',
      description: 'Classroom-led or self-paced'
    },
    {
      stat: 'IELTS',
      label: 'Inspired Framework',
      description: 'Global relevance guaranteed'
    }
  ];

  const learningOutcomes = [
    'Communicate confidently with patients and healthcare teams',
    'Understand and use medical terminology accurately',
    'Write clear, professional medical documentation',
    'Prepare effectively for IELTS/OET examinations',
    'Adapt communication for diverse cultural contexts',
    'Handle complex clinical conversations with ease',
    'Build workplace English confidence',
    'Navigate international healthcare opportunities'
  ];

  const deliveryMethods = [
    {
      title: 'Classroom-Facilitated Mode',
      description: 'Teacher-led learning with structured guidance',
      features: [
        'Facilitator training and support included',
        'Dedicated WhatsApp group for daily support',
        'Question papers & evaluation support for each unit',
        'Group activities & gamified classroom revision',
        'Access to digital revision portal with personalized tracking'
      ]
    },
    {
      title: 'Self-Paced Learning Mode',
      description: 'Independent learning at your own pace',
      features: [
        'Workbook-first lessons for healthcare-specific English',
        'QR-coded video support for every lesson',
        'Gamified self-practice tools',
        'One-year platform access',
        'Digital certificate upon completion'
      ]
    },
    {
      title: 'Both Modes Include',
      description: 'Core features available in all options',
      features: [
        'Clinical English practice: Listening, Speaking, Reading, Writing',
        'Structured workbook with integrated videos',
        'Healthcare vocabulary and communication skills',
        'Hospital documentation practice',
        'Self-learning resources and review games'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">80-Hour Comprehensive Program</span>
              </div>
              
              <div className="space-y-2">
                {/* <div className="w-32 h-12 relative mb-4">
                  <Image
                    src="/logos/carebridge.png"
                    alt="CareBridge English"
                    fill
                    className="object-contain"
                  />
                </div> */}
                <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight">
                  CareBridge English
                </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-medium">
                The Language of Care, Made Simple!
              </p>
            </div>

            <p className="text-lg text-blue-50 leading-relaxed">
              An 80-hour integrated curriculum that supports first-year healthcare students in developing core English language proficiency for academic and clinical settings. This structured, workbook-first English course bridges the gap between classroom learning and hospital communication.
            </p>              <div className="flex flex-wrap gap-4 pt-4">
                <BookDemo>
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
                    Book a Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </BookDemo>
                
                <Link href="/ScioCare_CareBridge.pdf" target="_blank">
                  <Button size="lg" variant="outline" className="border-white text-white bg-transparant hover:bg-white/10">
                    <Download className="w-5 h-5 mr-2" />
                    Download Brochure
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">80</div>
                  <div className="text-sm text-blue-100">Training Hours</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">8</div>
                  <div className="text-sm text-blue-100">Core Units</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">₹1,799</div>
                  <div className="text-sm text-blue-100">Starting Price</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/carebridge.jpg"
                  alt="CareBridge English Program"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">All Students</div>
                    <div className="text-sm text-gray-600">Target Audience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CareBridge Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Why Choose CareBridge</Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why 80 Hours, Not 40?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While INC mandates only 40 hours of English training, CareBridge provides 80 hours because real fluency and clinical communication mastery require deeper, sustained practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-blue-200 transition-all hover:shadow-lg">
                <CardContent>
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programHighlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-5xl font-bold text-blue-700 mb-2">{highlight.stat}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{highlight.label}</div>
                  <div className="text-sm text-gray-600">{highlight.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Curriculum</Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Eight Comprehensive Units
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thoughtfully designed units, each spanning 10 hours and focusing on practical English skills for nursing students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {courseModules.map((module, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-all">
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{module.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{module.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mt-6">
                    {module.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Learning Outcomes</Badge>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                What You&apos;ll Achieve
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                By completing CareBridge English, you&apos;ll gain the confidence and skills to excel in any healthcare environment, locally or internationally.
              </p>
              
              <BookDemo>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </BookDemo>
            </div>

            <div className="grid gap-4">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="text-lg">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Flexible Learning</Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Learning Style
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CareBridge offers multiple delivery methods to suit your schedule and learning preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {deliveryMethods.map((method, index) => (
              <Card key={index} className="border-2 hover:border-blue-200 hover:shadow-xl transition-all">
                <CardContent>
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <TrendingUp className="w-7 h-7 text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-6">{method.description}</p>
                  
                  <ul className="space-y-3">
                    {method.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Pricing</Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Affordable & Flexible Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that best fits your institution&apos;s needs. All prices inclusive of 18% GST.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Self-Learning Model */}
            <Card className="border-2 hover:border-blue-300 hover:shadow-2xl transition-all relative">
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Self-Learning Model</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-blue-700">₹1,799</span>
                    <span className="text-gray-600">/student/year</span>
                  </div>
                  <p className="text-gray-600">Perfect for independent learners</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Workbook-first lessons for healthcare-specific English</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">QR-coded video support for every lesson</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Clinical English practice: Listening, Speaking, Reading, Writing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Gamified self-practice tools</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">One-year platform access + digital certificate</span>
                  </div>
                </div>

                <BookDemo>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </BookDemo>
              </CardContent>
            </Card>

            {/* Classroom Model */}
            <Card className="border-2 border-blue-500 hover:border-blue-600 hover:shadow-2xl transition-all relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-700 text-white hover:bg-blue-800 px-4 py-1">Most Popular</Badge>
              </div>
              
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Classroom Model</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-blue-700">₹2,399</span>
                    <span className="text-gray-600">/student/year</span>
                  </div>
                  <p className="text-gray-600">Complete institutional support</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-semibold">Everything in Self-Learning Model, plus:</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Facilitator training and support</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Dedicated WhatsApp group for daily support from CareBridge team</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Question papers & evaluation support for each unit</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Group activities & gamified classroom revision</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Access to digital revision portal with personalized tracking</span>
                  </div>
                </div>

                <BookDemo>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </BookDemo>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Need a custom plan for your institution? <Link href="mailto:info@sciolabs.in" className="text-blue-700 font-semibold hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">FAQ</Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How is CareBridge English different from traditional textbooks?
                </h3>
                <p className="text-gray-700">
                  Unlike traditional textbooks, CareBridge uses a workbook-first approach tailored for Gen Z learners, with QR-coded videos for easy learning and gamified revision activities. It includes strong classroom engagement components to keep students actively involved.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Why 80 hours instead of the INC-mandated 40 hours?
                </h3>
                <p className="text-gray-700">
                  Real fluency and clinical communication mastery require deeper, sustained practice. The 80-hour program ensures students develop comprehensive LSRW skills and confidence for real-world healthcare scenarios and international examinations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How does CareBridge help with IELTS/OET preparation?
                </h3>
                <p className="text-gray-700">
                  CareBridge is designed around the Listening, Speaking, Reading, and Writing (LSRW) skills these tests require, building a strong foundation from the start and making future exam attempts easier and more successful.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Can working professionals take this program?
                </h3>
                <p className="text-gray-700">
                  Absolutely! Anyone looking to improve their healthcare communication skills can benefit from CareBridge English. The flexible delivery options make it suitable for both students and working professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Clinical Communication?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of healthcare professionals who have enhanced their English skills with CareBridge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookDemo>
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
                Book a Demo Session
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </BookDemo>
            
            <Link href="/ScioCare_CareBridge.pdf" target="_blank">
              <Button size="lg" variant="outline" className="border-white bg-transparnt text-white hover:bg-white/10">
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
