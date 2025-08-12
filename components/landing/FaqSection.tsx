'use client';

import { useState } from 'react';
import { MessageCircle, Users, GraduationCap, Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface ProgramSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  duration: string;
  target: string;
  faqs: FaqItem[];
}

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeProgram, setActiveProgram] = useState<string>('carebridge');

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const programs: ProgramSection[] = [
    {
      id: 'carebridge',
      title: 'CareBridge English',
      icon: MessageCircle,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
      duration: '80h',
      target: 'All Students',
      faqs: [
        {
          id: 'cb-1',
          question: 'How is CareBridge English different from the usual English textbooks?',
          answer: 'Great question! Unlike traditional textbooks, CareBridge uses a workbook-first approach tailored for Gen Z learners, with QR-coded videos for easy learning and gamified revision activities that make lessons fun and interactive. Plus, it has a strong classroom engagement component to keep students involved.'
        },
        {
          id: 'cb-2',
          question: 'Does the college need a dedicated English teacher to run the program?',
          answer: 'It helps to have a dedicated English teacher, but it\'s not a must. One of your existing faculty members can take up the role and manage the program effectively.'
        },
        {
          id: 'cb-3',
          question: 'INC mandates only 40 hours of English training, but CareBridge requires 80 hours. Why the difference?',
          answer: 'Language learning takes time, especially since many students struggle with English. We recommend dedicating the full 80 hours within college hours if possible. If that\'s tough, some units can be done self-paced, with unit reviews and assessments done in groups to balance the load.'
        },
        {
          id: 'cb-4',
          question: 'Are the programs customizable to fit our college\'s academic calendar?',
          answer: 'Yes! The program is flexible. Many colleges use the start of the first year—when clinical loads are lighter—to cover initial modules, then spread later modules alongside self-learning components throughout the year.'
        },
        {
          id: 'cb-5',
          question: 'What does the group-facilitated model include?',
          answer: 'It\'s packed with engaging activities like group work, role plays, and revision games that help students learn faster and remember better—making the process lively and effective.'
        },
        {
          id: 'cb-6',
          question: 'Can students join as self-learners?',
          answer: 'Absolutely! But since language acquisition thrives on conversation and accountability, students usually get the best results when they participate in the group-facilitated sessions.'
        },
        {
          id: 'cb-7',
          question: 'How is student progress tracked and assessed?',
          answer: 'Students complete homework in their workbooks, and there are optional digital activities designed for Gen Z learning styles. We conduct unit assessments to evaluate understanding, with options for digital or written exams.'
        },
        {
          id: 'cb-8',
          question: 'How long do students have access to the program resources?',
          answer: 'Students get access for one full year, with access resetting every August 31. This gives them plenty of time to complete the program and review materials as needed.'
        },
        {
          id: 'cb-9',
          question: 'How does CareBridge English help students prepare for IELTS or OET exams?',
          answer: 'CareBridge is designed around the Listening, Speaking, Reading, and Writing (LSRW) skills these tests require—so it builds a strong foundation right from the start, making future attempts easier and more successful.'
        },
        {
          id: 'cb-10',
          question: 'Can hospital staff use this program too?',
          answer: 'Definitely! Anyone looking to improve their healthcare communication skills can benefit from CareBridge English.'
        },
        {
          id: 'cb-11',
          question: 'Will there be facilitator training available?',
          answer: 'Yes! We provide ongoing support with facilitator training, constant handholding through WhatsApp, and can even create custom learning games tailored for your students.'
        },
        {
          id: 'cb-12',
          question: 'Can we first see a demo of the program?',
          answer: 'Absolutely! Just sign up using the form on our website, and we\'ll send you all the details and arrange a call with your team to walk you through everything.'
        }
      ]
    },
    {
      id: 'caresteps',
      title: 'CareSteps',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-r from-orange-500 to-red-500',
      duration: '20h',
      target: 'First-year',
      faqs: [
        {
          id: 'cs-1',
          question: 'Are there live classes for CareSteps?',
          answer: 'Live sessions are optional. We can plan online live classes based on student convenience and are open to in-person sessions if discussed with your institution.'
        },
        {
          id: 'cs-2',
          question: 'Is CareSteps self-paced?',
          answer: 'CareSteps is designed for self-paced learning combined with mentor supervision. Students use a portal with short videos and actionable steps, plus a printed reflection workbook to document progress.'
        },
        {
          id: 'cs-3',
          question: 'Do you provide mentor training for CareSteps?',
          answer: 'Yes! We provide a detailed mentor manual along with ongoing handholding and support from the ScioCare team to help mentors track student progress and provide assistance as needed.'
        }
      ]
    },
    {
      id: 'pathways',
      title: 'Pathways360°',
      icon: GraduationCap,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      duration: '30h',
      target: 'Final-year',
      faqs: [
        {
          id: 'pw-1',
          question: 'Are there live classes for Pathways360°?',
          answer: 'Live sessions are held periodically online, each focusing on a specific career skill and led by an expert faculty member.'
        },
        {
          id: 'pw-2',
          question: 'Is Pathways360° self-paced?',
          answer: 'Yes, Pathways360° is designed for self-paced learning combined with mentor supervision. Students can access video resources along with the reflection workbook for self-learning.'
        },
        {
          id: 'pw-3',
          question: 'Do you provide mentor training for Pathways360°?',
          answer: 'We provide a detailed mentor manual along with ongoing handholding and support from the ScioCare team to help mentors track student progress and provide assistance.'
        },
        {
          id: 'pw-4',
          question: 'Do you offer personalized CV making and interview preparation?',
          answer: 'This is available as a premium package for Pathways360°. Our team works with individual students in two 30-minute online sessions to fine-tune their CVs and prep them for interviews.'
        }
      ]
    }
  ];

  const activeSection = programs.find(p => p.id === activeProgram);

  const FaqItem = ({ faq }: { faq: FaqItem; isLast: boolean }) => {
    const isOpen = openItems.includes(faq.id);
    
    return (
      <div className="group bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden">
        <button
          onClick={() => toggleItem(faq.id)}
          className="w-full p-4 md:p-6 flex items-start justify-between text-left group-hover:bg-blue-50/30 transition-all duration-200"
        >
          <div className="flex-1 pr-4 md:pr-6">
            <h3 className="text-gray-900 font-semibold text-sm md:text-base lg:text-lg leading-relaxed mb-1 md:mb-2 group-hover:text-blue-900 transition-colors duration-200">
              {faq.question}
            </h3>
          </div>
          
          <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
          }`}>
            {isOpen ? (
              <Minus className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </div>
        </button>
        
        <div className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <div className="pt-3 md:pt-4 border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed text-xs md:text-sm lg:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
        
        {/* Active indicator */}
        {isOpen && (
          <div className="h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        )}
      </div>
    );
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            Got Questions?
          </h2>
          
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Find answers to everything you need to know about our programs
          </p>
        </div>

        {/* Program Selector */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
          {programs.map((program) => {
            const IconComponent = program.icon;
            const isActive = activeProgram === program.id;
            
            return (
              <button
                key={program.id}
                onClick={() => setActiveProgram(program.id)}
                className={`group relative overflow-hidden px-3 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? `${program.bgColor} text-white shadow-lg shadow-blue-500/25` 
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-2 md:gap-3 relative z-10">
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">{program.title}</span>
                  <span className="sm:hidden text-xs">{program.title.split(' ')[0]}</span>
                  <div className={`text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${
                    isActive ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {program.duration}
                  </div>
                </div>
                
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                       style={{ background: `linear-gradient(135deg, ${program.color.split(' ')[1]}, ${program.color.split(' ')[3]})` }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-12 gap-4 md:gap-8">
          
          {/* FAQ List */}
          <div className="lg:col-span-12">
            {activeSection && (
              <div className="border border-gray-100 rounded-xl md:rounded-2xl bg-white overflow-hidden">
                <div className="p-4 md:p-8">                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                    {activeSection.faqs.map((faq, index) => (
                      <div key={faq.id} className={`${index < activeSection.faqs.length - 1 && activeSection.faqs.length % 2 !== 0 && index === activeSection.faqs.length - 1 ? 'lg:col-span-2' : ''}`}>
                        <FaqItem 
                          faq={faq} 
                          isLast={index === activeSection.faqs.length - 1}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

