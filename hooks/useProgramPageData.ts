'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useProgramData, type DbProgram } from '@/hooks/useProgramData';

interface UnitAccessData {
  id: string;
  name: string;
  hasAccess: boolean;
  accessType: string;
  accessibleChapters?: string[];
}

interface ProgramAccessResponse {
  hasFullAccess: boolean;
  accessType: string;
  unitAccess: UnitAccessData[];
  error?: string;
}

interface UseProgramPageDataResult {
  currentProgram: DbProgram | null;
  userProgress: Map<string, boolean>;
  markTopicComplete: (topicId: string, completed?: boolean) => Promise<void>;
  unitAccess: Record<string, boolean>;
  unitAccessTypes: Record<string, string>;
  chapterAccess: Record<string, boolean>;
  accessType: string;
  accessMessage: string;
  loading: boolean;
  error: string | null;
}

export function useProgramPageData(programId: string): UseProgramPageDataResult {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  
  // Use the existing program data hook
  const { currentProgram, userProgress, loading: programDataLoading, error: programDataError, markTopicComplete } = useProgramData(programId);
  
  // Access verification state
  const [unitAccess, setUnitAccess] = useState<Record<string, boolean>>({});
  const [unitAccessTypes, setUnitAccessTypes] = useState<Record<string, string>>({});
  const [chapterAccess, setChapterAccess] = useState<Record<string, boolean>>({});
  const [accessType, setAccessType] = useState<string>('');
  const [accessMessage, setAccessMessage] = useState<string>('');
  const [accessLoading, setAccessLoading] = useState(true);
  const [accessError, setAccessError] = useState<string | null>(null);

  // Combined loading state
  const loading = programDataLoading || accessLoading;
  const error = programDataError || accessError;

  // Get unit-level access data when user and programId are available
  useEffect(() => {
    const getUnitAccess = async () => {
      if (!user?.id || !programId) {
        setAccessLoading(false);
        return;
      }

      try {
        setAccessLoading(true);
        const response = await fetch(`/api/programs/${programId}/access?userId=${user.id}`);
        const data: ProgramAccessResponse = await response.json();

        if (response.ok) {
          // With free trial, all logged-in users have access to at least the first unit
          // No need to redirect - let the program page handle showing locked/unlocked units
          
          setAccessType(data.accessType);
          setAccessMessage(
            data.hasFullAccess 
              ? 'Full Access'
              : data.unitAccess.some((s: UnitAccessData) => s.hasAccess)
              ? 'Partial access - some units available'
              : 'Limited access'
          );

          // Set unit-level access
          const unitAccessMap: Record<string, boolean> = {};
          const unitAccessTypesMap: Record<string, string> = {};
          const chapterAccessMap: Record<string, boolean> = {};
          
          data.unitAccess.forEach((unit: UnitAccessData) => {
            unitAccessMap[unit.id] = unit.hasAccess;
            unitAccessTypesMap[unit.id] = unit.accessType;
            
            // Build chapter-level access map
            if (unit.accessibleChapters) {
              unit.accessibleChapters.forEach(chapterId => {
                chapterAccessMap[chapterId] = true;
              });
            }
          });
          
          setUnitAccess(unitAccessMap);
          setUnitAccessTypes(unitAccessTypesMap);
          setChapterAccess(chapterAccessMap);
        } else {
          console.error('Error checking access:', data.error);
          setAccessError(data.error || 'Failed to check access');
        }
      } catch (error) {
        console.error('Error getting unit access:', error);
        setAccessError('Network error while checking access');
      } finally {
        setAccessLoading(false);
      }
    };

    getUnitAccess();
  }, [user?.id, programId, router]);

  return {
    currentProgram,
    userProgress,
    markTopicComplete,
    unitAccess,
    unitAccessTypes,
    chapterAccess,
    accessType,
    accessMessage,
    loading,
    error,
  };
}