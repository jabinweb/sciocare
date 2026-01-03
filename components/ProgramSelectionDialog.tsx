'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProgramSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgramSelectionDialog({ isOpen, onClose }: ProgramSelectionDialogProps) {
  const router = useRouter();

  const programs = [
    {
      id: 'carebridge',
      title: 'CareBridge English',
      subtitle: 'Job-specific English and workplace communication skills',
      target: 'All students',
      logo: '/logos/carebridge.png',
      color: 'from-blue-600 to-blue-700',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: BookOpen,
      action: () => {
        onClose();
        router.push('/carebridge#pricing');
      }
    },
    {
      id: 'caresteps',
      title: 'CareSteps',
      subtitle: 'Soft-skills foundation for new nursing students',
      target: 'First-year students',
      logo: '/logos/caresteps.png',
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: GraduationCap,
      action: () => {
        onClose();
        router.push('/#caresteps');
      }
    },
    {
      id: 'pathways360',
      title: 'Pathways360°',
      subtitle: 'Workplace readiness and career grooming',
      target: 'Final-year students',
      logo: '/logos/pathways.png',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: Briefcase,
      action: () => {
        onClose();
        router.push('/#pathways360');
      }
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
            Choose Your Program
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Select the program that best fits your students&apos; needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-1 gap-4 mt-6">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.id}
                className={`group relative overflow-hidden rounded-xl border-2 ${program.borderColor} ${program.bgColor} hover:shadow-xl transition-all duration-300 cursor-pointer`}
                onClick={program.action}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center p-2 flex-shrink-0 shadow-sm">
                      <Image
                        src={program.logo}
                        alt={`${program.title} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`text-xl font-bold ${program.textColor} mb-1`}>
                            {program.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            For: {program.target}
                          </p>
                        </div>
                        <Icon className={`w-6 h-6 ${program.textColor} opacity-60`} />
                      </div>
                      <p className="text-gray-700 mb-4">
                        {program.subtitle}
                      </p>

                      {/* CTA */}
                      <Button
                        className={`bg-gradient-to-r ${program.color} text-white hover:opacity-90 group-hover:shadow-lg transition-all w-full md:w-auto`}
                        onClick={(e) => {
                          e.stopPropagation();
                          program.action();
                        }}
                      >
                        {program.id === 'carebridge' ? 'View Pricing' : 'Learn More'}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${program.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help choosing? <button onClick={onClose} className="text-blue-600 hover:underline font-medium">Book a demo</button> to speak with our team
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
