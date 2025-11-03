'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { useProgramPageData } from '@/hooks/useProgramPageData';
import type { DbTopic } from '@/hooks/useProgramData';
import { ContentPlayer } from '@/components/learning/ContentPlayer';
import { useSession } from 'next-auth/react';
import { ProgramSubscriptionManager } from '@/components/dashboard/ProgramSubscriptionManager';
import { ProgramPageSkeleton } from '@/components/dashboard/dashboard-class-skeleton';
import { UnitContent } from '@/components/learning/UnitContent';
import { 
  getNextTopic, 
  isUnitCompleted,
  type UnitProgression 
} from '@/lib/topic-progression';

interface UnitData {
  id: string;
  name: string;
  icon: string;
  color: string;
  isLocked: boolean;
  orderIndex: number;
  chapters: ChapterData[];
}

interface ChapterData {
  id: string;
  name: string;
  orderIndex: number;
  topics: DbTopic[];
}

export default function ProgramPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { data: session } = useSession();
  const user = session?.user;
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<DbTopic & { completed: boolean } | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);
  const [topicRatings, setTopicRatings] = useState<Record<string, { userRating: number; hasRated: boolean }>>({});
  
  // Use unified hook that handles both class data and access verification
  const { 
    currentProgram, 
    userProgress, 
    markTopicComplete, 
    unitAccess, 
    accessType, 
    accessMessage, 
    loading, 
    error 
  } = useProgramPageData(slug);

  // Fetch topic difficulty ratings for the class
  useEffect(() => {
    const fetchTopicRatings = async () => {
      if (!currentProgram?.id) return;

      try {
        const response = await fetch(`/api/user/topic-ratings?classId=${currentProgram.id}`);
        if (response.ok) {
          const data = await response.json();
          // Convert array to object with topicId as key
          const ratingsMap = data.ratings.reduce((acc: Record<string, { userRating: number; hasRated: boolean }>, rating: { topicId: string; userRating: number; hasRated: boolean }) => {
            acc[rating.topicId] = {
              userRating: rating.userRating,
              hasRated: rating.hasRated
            };
            return acc;
          }, {});
          setTopicRatings(ratingsMap);
        }
      } catch (error) {
        console.error('Error fetching topic ratings:', error);
      }
    };

    fetchTopicRatings();
  }, [currentProgram?.id]);

  useEffect(() => {
    // Auto-select first unlocked unit
    const firstUnlockedUnit = currentProgram?.units.find(s => !s.isLocked);
    if (firstUnlockedUnit) {
      setSelectedUnit(firstUnlockedUnit.id);
    }
  }, [currentProgram]);

  if (loading) {
    return <ProgramPageSkeleton />;
  }

  if (error || !currentProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Program Not Found</h1>
          <Button onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleTopicClick = (topic: DbTopic) => {
    // Check if user has access to this unit
    const hasUnitAccess = unitAccess[selectedUnit] !== false;
    
    // For free programs (price === 0), don't show subscription manager
    if (!hasUnitAccess && currentProgram.price !== 0) {
      // Show subscription manager instead of playing content
      setShowSubscriptionManager(true);
      return;
    }

    // Game-based learning: Allow playing any topic/game without sequential restrictions
    // Convert DbTopic to the expected format with proper content structure
    const topicWithCompleted: DbTopic & { completed: boolean } = {
      ...topic,
      completed: userProgress.get(topic.id) || false,
      content: topic.content ? {
        contentType: topic.content.contentType, // Use contentType for the content type
        url: topic.content.url,
        videoUrl: topic.content.videoUrl,
        pdfUrl: topic.content.pdfUrl,
        textContent: topic.content.textContent,
        widgetConfig: topic.content.widgetConfig
      } : undefined
    };
    setSelectedTopic(topicWithCompleted);
    setIsPlayerOpen(true);
  };

  const handleTopicComplete = async () => {
    if (selectedTopic) {
      await markTopicComplete(selectedTopic.id, true);
      
      // Check if unit is completed using shared utility
      if (selectedUnitData) {
        const unitProgress: UnitProgression = {
          id: selectedUnitData.id,
          name: selectedUnitData.name,
          chapters: selectedUnitData.chapters.map(ch => ({
            id: ch.id,
            name: ch.name,
            topics: ch.topics.map(t => ({
              id: t.id,
              name: t.name,
              completed: userProgress.get(t.id) || false
            }))
          }))
        };

        // Create a Set from userProgress for compatibility with shared functions
        const completedTopicsSet = new Set<string>();
        userProgress.forEach((isCompleted, topicId) => {
          if (isCompleted) completedTopicsSet.add(topicId);
        });
        completedTopicsSet.add(selectedTopic.id); // Add the just completed topic

        if (isUnitCompleted(unitProgress, completedTopicsSet)) {
          // Unit completed logic can be added here
          console.log(`Unit ${selectedUnitData.name} completed!`);
        }
      }
      
      // Don't close the player dialog here for consistency with demo
      // setIsPlayerOpen(false);
      // setSelectedTopic(null);
    }
  };

  const handleTopicIncomplete = async () => {
    if (selectedTopic) {
      console.log(`Dashboard: Marking topic ${selectedTopic.id} as incomplete`);
      await markTopicComplete(selectedTopic.id, false);
    }
  };

  const handlePlayerClose = () => {
    setIsPlayerOpen(false);
    setSelectedTopic(null);
  };

  const handleNextTopic = () => {
    if (!selectedUnitData || !selectedTopic) return;
    
    // Create unit progression data for shared utility
    const unitProgress: UnitProgression = {
      id: selectedUnitData.id,
      name: selectedUnitData.name,
      chapters: selectedUnitData.chapters.map(ch => ({
        id: ch.id,
        name: ch.name,
        topics: ch.topics.map(t => ({
          id: t.id,
          name: t.name,
          completed: userProgress.get(t.id) || false
        }))
      }))
    };

    const currentTopicForProgression = {
      id: selectedTopic.id,
      name: selectedTopic.name,
      completed: selectedTopic.completed
    };

    // Create a Set from userProgress for compatibility with shared functions
    const completedTopicsSet = new Set<string>();
    userProgress.forEach((completed, topicId) => {
      if (completed) completedTopicsSet.add(topicId);
    });

    // Game-based learning: Always allow moving to next topic without restrictions
    const nextTopic = getNextTopic(currentTopicForProgression, unitProgress);
    
    if (nextTopic) {
      // Find the full DbTopic object
      const allTopics = selectedUnitData.chapters.flatMap((ch: ChapterData) => ch.topics);
      const fullNextTopic = allTopics.find((topic: DbTopic) => topic.id === nextTopic.id);
      
      if (fullNextTopic) {
        // Convert to the expected format with completed status
        const nextTopicWithCompleted: DbTopic & { completed: boolean } = {
          ...fullNextTopic,
          completed: userProgress.get(fullNextTopic.id) || false,
          content: fullNextTopic.content ? {
            contentType: fullNextTopic.content.contentType,
            url: fullNextTopic.content.url,
            videoUrl: fullNextTopic.content.videoUrl,
            pdfUrl: fullNextTopic.content.pdfUrl,
            textContent: fullNextTopic.content.textContent,
            widgetConfig: fullNextTopic.content.widgetConfig
          } : undefined
        };
        setSelectedTopic(nextTopicWithCompleted);
      }
    } else {
      // If no next topic, close the player
      handlePlayerClose();
    }
  };

  const getUnitProgress = (unit: UnitData) => {
    const allTopics = unit.chapters.flatMap((ch: ChapterData) => ch.topics);
    const completedCount = allTopics.filter((topic: DbTopic) => userProgress.get(topic.id)).length;
    return allTopics.length > 0 ? Math.round((completedCount / allTopics.length) * 100) : 0;
  };

  const handleDifficultyRate = async (topicId: string, rating: number) => {
    if (!user?.id) return;
    
    try {
      // Save the difficulty rating to the backend
      const response = await fetch('/api/user/topic-ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          topicId,
          rating,
          classId: currentProgram.id
        }),
      });

      if (response.ok) {
        console.log(`Difficulty rating saved: Topic ${topicId} rated ${rating} stars`);
        
        // Refresh topic ratings to show updated rating
        const ratingsResponse = await fetch(`/api/user/topic-ratings?classId=${currentProgram.id}`);
        if (ratingsResponse.ok) {
          const data = await ratingsResponse.json();
          const ratingsMap = data.ratings.reduce((acc: Record<string, { userRating: number; hasRated: boolean }>, ratingData: { topicId: string; userRating: number; hasRated: boolean }) => {
            acc[ratingData.topicId] = {
              userRating: ratingData.userRating,
              hasRated: ratingData.hasRated
            };
            return acc;
          }, {});
          setTopicRatings(ratingsMap);
        }
      } else {
        console.error('Failed to save difficulty rating');
      }
    } catch (error) {
      console.error('Error saving difficulty rating:', error);
    }
  };

  const selectedUnitData = currentProgram.units.find(s => s.id === selectedUnit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => router.push('/dashboard')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{currentProgram.name}</h1>
                {accessType === 'school' && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    School Access
                  </span>
                )}
                {accessType === 'subscription' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Subscribed
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{currentProgram.description}</p>
              {accessMessage && (
                <p className="text-sm text-green-600 mt-1">{accessMessage}</p>
              )}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {currentProgram.units.filter(s => !s.isLocked).length}
                </div>
                <div className="text-xs text-muted-foreground">Units</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {currentProgram.units.reduce((acc, s) => acc + s.chapters.length, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Chapters</div>
              </div>
              {currentProgram.price !== 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSubscriptionManager(!showSubscriptionManager)}
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Manage Access
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unit Content</h2>
          <p className="text-gray-600">
            Explore the interactive learning materials and track your progress
          </p>
        </div>

        {/* Subscription Management Panel */}
        {showSubscriptionManager && currentProgram.price !== 0 && (
          <div className="mb-6">
            <ProgramSubscriptionManager 
              classId={currentProgram.id}
              onSubscribe={async (type, options) => {
                console.log('Subscription request:', type, options);
                
                try {
                  // Handle different subscription types
                  if (type === 'class' || type === 'upgrade') {
                    // Redirect to class payment page for both full class and upgrade
                    router.push(`/payment/class/${currentProgram.id}`);
                  } else if (type === 'unit' && options?.unitId) {
                    // Redirect to unit payment page
                    router.push(`/payment/unit/${options.unitId}`);
                  } else {
                    // General subscription - could be a modal or redirect
                    router.push('/dashboard/subscriptions');
                  }
                } catch (error) {
                  console.error('Subscription handling error:', error);
                }
              }}
            />
          </div>
        )}

        <UnitContent
          units={currentProgram.units.map((unit) => {
            const hasUnitAccess = unitAccess[unit.id] !== false;
            return {
              id: unit.id,
              name: unit.name,
              icon: unit.icon,
              color: unit.color,
              chapters: unit.chapters.map(chapter => ({
                id: chapter.id,
                name: chapter.name,
                topics: chapter.topics.map(topic => ({
                  ...topic,
                  completed: userProgress.get(topic.id) || false
                })),
                isLocked: !hasUnitAccess
              })),
              isLocked: unit.isLocked || !hasUnitAccess
            };
          })}
          selectedUnit={selectedUnit}
          selectedUnitData={selectedUnitData ? {
            id: selectedUnitData.id,
            name: selectedUnitData.name,
            icon: selectedUnitData.icon,
            color: selectedUnitData.color,
            chapters: selectedUnitData.chapters.map(chapter => ({
              id: chapter.id,
              name: chapter.name,
              topics: chapter.topics.map(topic => ({
                ...topic,
                completed: userProgress.get(topic.id) || false
              })),
              isLocked: !unitAccess[selectedUnitData.id]
            })),
            isLocked: selectedUnitData.isLocked || !unitAccess[selectedUnitData.id]
          } : null}
          completedTopics={new Set(
            Array.from(userProgress.entries())
              .filter(([, completed]) => completed)
              .map(([topicId]) => topicId)
          )}
          topicRatings={topicRatings}
          useAccordion={true}
          showUpgradeButton={false}
          onUnitSelect={(unitId) => {
            const unit = currentProgram.units.find(s => s.id === unitId);
            const hasUnitAccess = unitAccess[unitId] !== false;
            const isAccessible = !unit?.isLocked && hasUnitAccess;
            if (isAccessible) {
              setSelectedUnit(unitId);
            }
          }}
          onTopicClick={(topic) => {
            const hasUnitAccess = selectedUnitData && (unitAccess[selectedUnitData.id] || false);
            if (hasUnitAccess) {
              // Find the actual DbTopic from the selected unit data
              const dbTopic = selectedUnitData.chapters
                .flatMap(ch => ch.topics)
                .find(t => t.id === topic.id);
              if (dbTopic) {
                handleTopicClick(dbTopic);
              }
            }
          }}
          onLockedClick={() => {
            console.log(`Topic is locked - unit access required`);
            setShowSubscriptionManager(true);
          }}
          getUnitProgress={(unitId) => {
            const unit = currentProgram.units.find(s => s.id === unitId);
            return unit ? getUnitProgress(unit) : 0;
          }}
        />
      </div>

      <ContentPlayer
        topic={selectedTopic}
        isOpen={isPlayerOpen}
        onClose={handlePlayerClose}
        onComplete={handleTopicComplete}
        onIncomplete={handleTopicIncomplete}
        onNext={handleNextTopic}
        onDifficultyRate={handleDifficultyRate}
        isCompleted={selectedTopic ? (userProgress.get(selectedTopic.id) || false) : false}
      />
    </div>
  );
}
