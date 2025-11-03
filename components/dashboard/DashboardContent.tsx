
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Star, GraduationCap, BookOpen, Users } from "lucide-react";
import { useProgramData } from '@/hooks/useProgramData';
import { SubscriptionDialog } from '@/components/dashboard/SubscriptionDialog';
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';
import { ProgramCard } from '@/components/dashboard/ProgramCard';
import type { DbProgram } from '@/hooks/useProgramData';

interface ProgramWithSubjects {
  id: number;
  name: string;
  slug?: string; // Add slug field
  description?: string;
  price?: number;
  accessType?: string;
  schoolAccess?: boolean;
  subscriptionAccess?: boolean;
  subjectAccess?: Record<string, {
    hasAccess: boolean;
    accessType: 'school' | 'class_subscription' | 'subject_subscription' | 'none';
  }>;
  hasPartialAccess?: boolean;
  subjects: Array<{
    id: string;
    name: string;
    icon?: string;
    color?: string;
    price?: number;
    chapters: Array<{
      id: string;
      name: string;
      topics: Array<{
        id: string;
        name: string;
      }>;
    }>;
  }>;
}



export function DashboardContent() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const { programs, userProgress, loading, error, accessMessage, accessType, userProfile } = useProgramData();
  const [selectedProgram, setSelectedProgram] = useState<ProgramWithSubjects | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  // The userProfile is now fetched via useProgramData hook from the dashboard API
  // No need for a separate effect here since the data comes from the same API call

  const handleProgramClick = (programData: ProgramWithSubjects) => {
    // Check if user has any access (school, full subscription, or partial subject access)
    if (programData.accessType === 'school' || programData.schoolAccess || programData.subscriptionAccess || programData.hasPartialAccess) {
      const identifier = programData.slug || programData.id;
      router.push(`/dashboard/program/${identifier}`);
    } else if (programData.price === 0 || programData.price === null) {
      // Free program (price is 0) - allow direct access without subscription dialog
      const identifier = programData.slug || programData.id;
      router.push(`/dashboard/program/${identifier}`);
    } else {
      // Paid program without access - show payment dialog
      setSelectedProgram(programData);
      setShowPaymentDialog(true);
    }
  };

  const handlePaymentDialogClose = () => {
    setShowPaymentDialog(false);
    setSelectedProgram(null);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading programs</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No programs Available</h2>
          <p className="text-muted-foreground">programs will appear here once they&apos;re added.</p>
        </div>
      </div>
    );
  }

  const calculateProgramProgress = (programData: ProgramWithSubjects) => {
    if (!programData.subjects || !Array.isArray(programData.subjects)) return 0;
    
    const allTopics = programData.subjects.flatMap((s) => 
      s.chapters?.flatMap((ch) => ch.topics || []) || []
    );
    
    if (allTopics.length === 0) return 0;
    
    const completedCount = allTopics.filter((topic) => userProgress.get(topic.id)).length;
    return Math.round((completedCount / allTopics.length) * 100);
  };

  // Helper to convert DbProgram to ProgramWithSubjects
  const toProgramWithSubjects = (cls: DbProgram): ProgramWithSubjects => ({
    ...cls,
    price: cls.price,
    accessType: cls.accessType,
    schoolAccess: cls.schoolAccess,
    subscriptionAccess: cls.subscriptionAccess,
    subjects: cls.subjects || [],
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Enhanced Header with School Info */}
        <div className="relative overflow-hidden bg-white border-b border-gray-200">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" />
          <div className="relative max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Welcome back, {user?.name || user?.email?.split('@')[0] || 'Student'}!
                  </h1>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-gray-600">Continue your learning journey</p>
                    {userProfile?.grade && (
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Grade {userProfile.grade}
                        </span>
                        {userProfile.school && (
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            userProfile.school.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {userProfile.school.name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Access Message */}
            {accessMessage && (
              <div className={`mt-4 p-3 rounded-lg border ${
                accessType === 'school' 
                  ? 'bg-green-50 border-green-200' 
                  : accessType === 'subscription'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className={`text-sm font-medium ${
                  accessType === 'school' 
                    ? 'text-green-800' 
                    : accessType === 'subscription'
                    ? 'text-blue-800'
                    : 'text-yellow-800'
                }`}>
                  {accessMessage}
                </p>
              </div>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Available programs</p>
                    <p className="text-3xl font-bold text-gray-100">{programs.length}</p>
                  </div>
                  <BookOpen className="w-10 h-10 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Total Subjects</p>
                    <p className="text-3xl font-bold text-gray-100">{programs.reduce((acc, cls) => acc + (cls.subjects?.length || 0), 0)}</p>
                  </div>
                  <Users className="w-10 h-10 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Avg Progress</p>
                    <p className="text-3xl font-bold text-gray-100">
                      {programs.length > 0 
                        ? Math.round(programs.reduce((acc, cls) => acc + calculateProgramProgress(toProgramWithSubjects(cls)), 0) / programs.length)
                        : 0}%
                    </p>
                  </div>
                  <Star className="w-10 h-10 text-purple-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Program Cards Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your programs {userProfile?.grade && `(Grade ${userProfile.grade})`}
            </h2>
            <p className="text-gray-600">
              {accessType === 'school' 
                ? 'Access content through your school enrollment and subscriptions'
                : 'Select a class to start or continue learning'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {programs.map((cls) => {
              const safeCls = toProgramWithSubjects(cls);
              const progress = calculateProgramProgress(safeCls);

              return (
                <ProgramCard
                  key={safeCls.id}
                  variant="dashboard"
                  programData={{
                    id: safeCls.id,
                    name: safeCls.name,
                    description: safeCls.description || '',
                    price: safeCls.price,
                    schoolAccess: cls.schoolAccess,
                    subscriptionAccess: cls.subscriptionAccess,
                    hasPartialAccess: safeCls.hasPartialAccess,
                    subjects: safeCls.subjects
                  }}
                  progress={progress}
                  onClick={() => handleProgramClick(safeCls)}
                />
              );
            })}
          </div>

          {/* Empty State for No Access */}
          {programs.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs Available</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {userProfile?.school ? 
                  (userProfile.school.isActive ? 
                    `No programs available for your grade level. Contact your school administrator.` :
                    'Your school account is currently inactive. Please contact your school.'
                  ) :
                  'You are not assigned to any school. Please contact an administrator.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Dialog - only show for programs without access */}
      {selectedProgram && !selectedProgram.schoolAccess && !selectedProgram.subscriptionAccess && (
        <SubscriptionDialog
          open={showPaymentDialog}
          onClose={handlePaymentDialogClose}
          disableAutoRedirect={true}
          classData={{
            id: selectedProgram.id,
            name: selectedProgram.name,
            description: selectedProgram.description || '',
            price: selectedProgram.price || 29900,
            subjects: selectedProgram.subjects?.map(subject => ({
              id: subject.id,
              name: subject.name,
              icon: subject.icon || '📚',
              color: subject.color || 'from-blue-500 to-blue-600',
              chapters: subject.chapters || [],
              price: subject.price || 9900,
            })) || []
          }}
          onSubscribe={(type, options) => {
            console.log('Subscription success:', type, options);
            // Close dialog after success message is shown
            setTimeout(() => {
              handlePaymentDialogClose();
            }, 3000);
            
            // Reload the page to refresh access information after dialog closes
            setTimeout(() => {
              window.location.reload();
            }, 3500);
          }}
        />
      )}
    </>
  );
}

