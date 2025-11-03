'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TopicItem } from '@/components/learning/TopicItem';
import { type Topic, type TopicContent } from '@/hooks/useProgramData';
import { 
  BookOpen, 
  Lock, 
  Star, 
  ChevronDown, 
  ChevronRight 
} from 'lucide-react';

// Base interfaces for the component
export interface BaseTopic {
  id: string;
  name: string;
  completed?: boolean;
  [key: string]: unknown; // Allow additional properties for flexibility
}

export interface BaseChapter {
  id: string;
  name: string;
  topics: BaseTopic[];
  isLocked?: boolean;
}

export interface BaseUnit {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: BaseChapter[];
  isLocked?: boolean;
}

interface UnitContentProps {
  units: BaseUnit[];
  selectedUnit: string | null;
  selectedUnitData: BaseUnit | null;
  completedTopics?: Set<string>;
  topicRatings?: Record<string, { userRating: number; hasRated: boolean }>;
  useAccordion?: boolean;
  showUpgradeButton?: boolean;
  showFreeBadge?: boolean;
  onUnitSelect: (unitId: string) => void;
  onTopicClick: (topic: BaseTopic, chapterIndex?: number) => void;
  onLockedClick: () => void;
  onUpgradeClick?: () => void;
  getUnitProgress: (unitId: string) => number;
  convertTopicForItem?: (topic: BaseTopic) => Topic;
}

interface EmptyUnitContentProps {
  title?: string;
  description?: string;
}

export const EmptyUnitContent: React.FC<EmptyUnitContentProps> = ({
  title = "Select a Unit",
  description = "Choose a unit from above to start exploring"
}) => (
  <Card className="p-8 sm:p-12 text-center">
    <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-muted-foreground">
      {description}
    </p>
  </Card>
);

export const UnitContent: React.FC<UnitContentProps> = ({
  units,
  selectedUnit,
  selectedUnitData,
  completedTopics = new Set(),
  topicRatings = {},
  useAccordion = false,
  showUpgradeButton = false,
  showFreeBadge = false,
  onUnitSelect,
  onTopicClick,
  onLockedClick,
  onUpgradeClick,
  getUnitProgress,
  convertTopicForItem
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const toggleChapter = (chapterId: string) => {
    if (!useAccordion) return;
    
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const getChapterProgress = (chapter: BaseChapter) => {
    if (chapter.topics.length === 0) return 0;
    const completedCount = chapter.topics.filter(topic => 
      topic.completed || completedTopics.has(topic.id)
    ).length;
    return Math.round((completedCount / chapter.topics.length) * 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
      {/* Unit Sidebar */}
      <div className="lg:col-span-1 order-1">
        <Card className="lg:sticky lg:top-6 gap-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">Units</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            {units.map((unit) => (
              <div
                key={unit.id}
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all ${
                  selectedUnit === unit.id 
                    ? `bg-gradient-to-r ${unit.color} text-white shadow-lg` 
                    : 'bg-gray-50 hover:bg-gray-100'
                } ${unit.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !unit.isLocked && onUnitSelect(unit.id)}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-lg sm:text-xl">{unit.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base truncate">{unit.name}</div>
                    <div className={`text-xs ${selectedUnit === unit.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {unit.chapters.length} chapters
                    </div>
                  </div>
                  {unit.isLocked ? (
                    <Lock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  ) : (
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-medium">{getUnitProgress(unit.id)}%</div>
                      <div className="w-6 sm:w-8 h-1 bg-white/30 rounded-full mt-1">
                        <div 
                          className="h-full bg-white rounded-full transition-all"
                          style={{ width: `${getUnitProgress(unit.id)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Upgrade Now Button */}
            {showUpgradeButton && onUpgradeClick && (
              <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-200">
                <Button
                  onClick={onUpgradeClick}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 lg:py-3 px-3 lg:px-4 rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs lg:text-sm"
                >
                  <Star className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                  Upgrade Now
                </Button>
                <p className="text-xs text-gray-500 text-center mt-1 lg:mt-2">
                  Unlock all units & chapters
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 order-2">
        {selectedUnitData ? (
          <Card className="overflow-hidden p-0">
            <CardHeader className={`bg-gradient-to-r ${selectedUnitData.color} text-white py-2`}>
              <CardTitle className="flex flex-row justify-between sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">{selectedUnitData.icon}</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl">{selectedUnitData.name}</h2>
                    <p className="text-white/80 text-sm sm:text-base">{selectedUnitData.chapters.length} chapters to explore</p>
                  </div>
                </div>
                <div className="text-left sm:text-right sm:ml-auto">
                  <div className="text-xl sm:text-2xl font-bold">{getUnitProgress(selectedUnitData.id)}%</div>
                  <div className="text-sm text-white/80">Complete</div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* Chapters */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {selectedUnitData.chapters.map((chapter, chapterIndex) => {
                  const chapterProgress = getChapterProgress(chapter);
                  const isExpanded = useAccordion ? expandedChapters.has(chapter.id) : true;
                  
                  return (
                    <div key={chapter.id} className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
                      <div 
                        className={`bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b transition-colors ${
                          useAccordion ? 'cursor-pointer hover:bg-gray-100' : ''
                        }`}
                        onClick={() => useAccordion && toggleChapter(chapter.id)}
                      >
                        <div className="flex flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r ${selectedUnitData.color} text-white flex items-center justify-center text-xs sm:text-sm font-bold`}>
                              {chapterIndex + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <h3 className="text-lg sm:text-xl font-semibold truncate">{chapter.name}</h3>
                                <div className="flex gap-1 sm:gap-2">
                                  {chapter.isLocked && (
                                    <Badge variant="secondary" className="gap-1 text-xs">
                                      <Lock className="h-3 w-3" />
                                      Locked
                                    </Badge>
                                  )}
                                  {showFreeBadge && chapterIndex === 0 && (
                                    <Badge variant="default" className="bg-green-600 text-xs">
                                      Free
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground">{chapter.topics.length} activities</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right flex-shrink-0">
                              <div className="text-sm font-medium">{chapterProgress}%</div>
                              <Progress value={chapterProgress} className="w-16 sm:w-20 h-2" />
                            </div>
                            {useAccordion && (
                              <div className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-gray-500" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Topics Grid - Show when expanded or when accordion is disabled */}
                      {isExpanded && (
                        <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {[...chapter.topics]
                            .sort((a, b) => {
                              const order = { 'BEGINNER': 0, 'INTERMEDIATE': 1, 'ADVANCED': 2 };
                              type DiffKey = keyof typeof order;
                              const aDiff = typeof a.difficulty === 'string' ? a.difficulty.toUpperCase() as DiffKey : undefined;
                              const bDiff = typeof b.difficulty === 'string' ? b.difficulty.toUpperCase() as DiffKey : undefined;
                              return (aDiff !== undefined ? order[aDiff] : 99) - (bDiff !== undefined ? order[bDiff] : 99);
                            })
                            .map((topic: BaseTopic) => {
                              const isCompleted = topic.completed || completedTopics.has(topic.id);
                              const isDisabled = chapter.isLocked || false;
                              // Get rating for this topic
                              const topicRating = topicRatings[topic.id];
                              // Convert topic for TopicItem - use converter or create default Topic structure
                              const topicForItem: Topic = convertTopicForItem 
                                ? convertTopicForItem(topic)
                                : {
                                    id: topic.id,
                                    name: topic.name,
                                    type: ('type' in topic && typeof topic.type === 'string') ? topic.type : 'INTERACTIVE_WIDGET',
                                    duration: ('duration' in topic && typeof topic.duration === 'string') ? topic.duration : null,
                                    orderIndex: ('orderIndex' in topic && typeof topic.orderIndex === 'number') ? topic.orderIndex : 0,
                                    completed: topic.completed,
                                    difficulty: ('difficulty' in topic && typeof topic.difficulty === 'string') ? topic.difficulty : undefined,
                                    description: ('description' in topic && typeof topic.description === 'string') ? topic.description : undefined,
                                    content: ('content' in topic) ? topic.content as TopicContent : undefined
                                  } as Topic;
                              return (
                                <TopicItem
                                  key={topic.id}
                                  topic={topicForItem}
                                  isCompleted={isCompleted}
                                  isDisabled={isDisabled}
                                  userRating={topicRating?.userRating}
                                  hasRated={topicRating?.hasRated}
                                  onClick={() => onTopicClick(topic, chapterIndex)}
                                  onLockedClick={onLockedClick}
                                />
                              );
                            })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <EmptyUnitContent />
        )}
      </div>
    </div>
  );
};