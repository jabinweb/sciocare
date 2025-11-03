/**
 * Shared utilities for topic progression and sequential unlock logic
 * Used by both demo and dashboard program pages
 */

// Generic topic type that works for both demo and dashboard
export interface TopicProgression {
  id: string;
  name: string;
  completed?: boolean;
}

export interface ChapterProgression {
  id: string;
  name: string;
  topics: TopicProgression[];
}

export interface UnitProgression {
  id: string;
  name: string;
  chapters: ChapterProgression[];
}

/**
 * Check if a topic should be enabled based on sequential unlock logic
 * @param topic - The topic to check
 * @param unitData - The unit containing the topic
 * @param completedTopics - Set of completed topic IDs
 * @returns boolean indicating if the topic should be enabled
 */
export function isTopicEnabled(
  topic: TopicProgression,
  unitData: UnitProgression,
  completedTopics: Set<string>
): boolean {
  if (!unitData) return false;
  
  const allTopics = unitData.chapters.flatMap(ch => ch.topics);
  const topicIndex = allTopics.findIndex(t => t.id === topic.id);
  
  if (topicIndex === 0) {
    return true; // First topic is always enabled
  }
  
  // Check if all previous topics are completed
  for (let i = 0; i < topicIndex; i++) {
    const previousTopic = allTopics[i];
    if (!completedTopics.has(previousTopic.id) && !previousTopic.completed) {
      return false;
    }
  }
  
  return true;
}

/**
 * Check if a topic is completed
 * @param topicId - The topic ID to check
 * @param completedTopics - Set of completed topic IDs
 * @returns boolean indicating if the topic is completed
 */
export function isTopicCompleted(
  topicId: string,
  completedTopics: Set<string>
): boolean {
  return completedTopics.has(topicId);
}

/**
 * Handle topic completion and update completion state
 * @param topicId - The topic ID to mark as completed
 * @param completedTopics - Current set of completed topics
 * @param setCompletedTopics - Function to update completed topics
 * @returns new Set of completed topics
 */
export function handleTopicCompletion(
  topicId: string,
  completedTopics: Set<string>,
  setCompletedTopics: (topics: Set<string>) => void
): Set<string> {
  const newCompletedTopics = new Set(completedTopics);
  newCompletedTopics.add(topicId);
  setCompletedTopics(newCompletedTopics);
  return newCompletedTopics;
}

/**
 * Get the next topic in the sequence
 * @param currentTopic - The current topic
 * @param unitData - The unit containing the topics
 * @returns next topic or null if no next topic
 */
export function getNextTopic(
  currentTopic: TopicProgression,
  unitData: UnitProgression
): TopicProgression | null {
  if (!unitData) return null;
  
  const allTopics = unitData.chapters.flatMap(ch => ch.topics);
  const currentIndex = allTopics.findIndex(topic => topic.id === currentTopic.id);
  
  if (currentIndex !== -1 && currentIndex < allTopics.length - 1) {
    return allTopics[currentIndex + 1];
  }
  
  return null; // No more topics
}

/**
 * Check if we can navigate to the next topic (current topic must be completed)
 * @param currentTopic - The current topic
 * @param unitData - The unit containing the topics
 * @param completedTopics - Set of completed topic IDs
 * @returns boolean indicating if we can move to next topic
 */
export function canNavigateToNext(
  currentTopic: TopicProgression,
  unitData: UnitProgression,
  completedTopics: Set<string>
): boolean {
  if (!unitData || !currentTopic) return false;
  
  // Check if current topic is completed
  const isCurrentCompleted = completedTopics.has(currentTopic.id) || currentTopic.completed;
  
  if (!isCurrentCompleted) {
    return false; // Cannot proceed if current topic is not completed
  }
  
  // Check if there's a next topic
  const nextTopic = getNextTopic(currentTopic, unitData);
  return nextTopic !== null;
}

/**
 * Check if unit is completed
 * @param unitData - The unit to check
 * @param completedTopics - Set of completed topic IDs
 * @returns boolean indicating if all topics in unit are completed
 */
export function isUnitCompleted(
  unitData: UnitProgression,
  completedTopics: Set<string>
): boolean {
  if (!unitData) return false;
  
  const allTopics = unitData.chapters.flatMap(ch => ch.topics);
  return allTopics.every(topic => 
    topic.completed || completedTopics.has(topic.id)
  );
}

/**
 * Get completion progress for a unit
 * @param unitData - The unit to calculate progress for
 * @param completedTopics - Set of completed topic IDs
 * @returns progress percentage (0-100)
 */
export function getUnitProgress(
  unitData: UnitProgression,
  completedTopics: Set<string>
): number {
  if (!unitData) return 0;
  
  const allTopics = unitData.chapters.flatMap(ch => ch.topics);
  if (allTopics.length === 0) return 0;
  
  const completedCount = allTopics.filter(topic => 
    topic.completed || completedTopics.has(topic.id)
  ).length;
  
  return Math.round((completedCount / allTopics.length) * 100);
}