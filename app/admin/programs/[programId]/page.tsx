'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, ArrowLeft, Layers } from 'lucide-react';
import { UnitForm } from '@/components/admin/UnitForm';

interface Unit {
  id: string;
  name: string;
  icon: string;
  color: string;
  isLocked: boolean;
  orderIndex: number;
  programId: number;
  price?: number; // Price in paisa
  currency?: string;
  created_at: string;
  updated_at: string;
}

interface UnitFormData {
  id?: string;
  name: string;
  icon: string;
  color: string;
  isLocked: boolean;
  orderIndex: number;
  programId: number;
}

interface ProgramItem {
    id: number;
    name: string;
    // add other properties if needed
}

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const programParam = params.programId as string; // Can be either slug or ID
  
  const [programId, setProgramId] = useState<number | null>(null);
  const [programSlug, setProgramSlug] = useState<string | null>(null);
  const [subjects, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [className, setProgramName] = useState('');

  useEffect(() => {
    fetchProgramData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programParam]);

  useEffect(() => {
    if (programId) {
      fetchUnits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programId]);

  const fetchProgramData = async () => {
    try {
      // Try to parse as number first (legacy ID)
      const asNumber = parseInt(programParam);
      if (!isNaN(asNumber)) {
        // It's a numeric ID
        setProgramId(asNumber);
        setProgramSlug(null);
        const response = await fetch('/api/admin/programs');
        const programs = await response.json();
        const currentProgram = programs.find((p: ProgramItem) => p.id === asNumber);
        setProgramName(currentProgram?.name || 'Unknown Program');
      } else {
        // It's a slug
        setProgramSlug(programParam);
        const response = await fetch(`/api/admin/programs/${programParam}`);
        
        if (!response.ok) {
          console.error('API response not OK:', response.status, response.statusText);
          const errorData = await response.json();
          console.error('Error data:', errorData);
          setProgramName('Unknown Program');
          return;
        }
        
        const program = await response.json();
        console.log('Fetched program:', program);
        
        if (program && program.id) {
          setProgramId(program.id);
          setProgramName(program.name);
        } else {
          console.error('Invalid program data:', program);
          setProgramName('Unknown Program');
        }
      }
    } catch (error) {
      console.error('Error fetching program:', error);
      setProgramName('Unknown Program');
    }
  };

  const fetchUnits = async () => {
    if (!programId && !programSlug) return;
    
    setLoading(true);
    try {
      const queryParam = programSlug ? `programSlug=${programSlug}` : `programId=${programId}`;
      const response = await fetch(`/api/admin/units?${queryParam}`);
      const data = await response.json();
      setUnits(Array.isArray(data) ? data : []);
    } catch {
      setUnits([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUnit = async (formData: UnitFormData) => {
    const response = await fetch('/api/admin/units', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, programId }),
    });
    if (response.ok) fetchUnits();
    else throw new Error('Failed to create unit');
  };

  const handleUpdateUnit = async (formData: UnitFormData) => {
    const response = await fetch('/api/admin/units', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) fetchUnits();
    else throw new Error('Failed to update unit');
  };

  const handleDeleteUnit = async (unitId: string) => {
    if (!confirm('Delete this unit and all its chapters and topics?')) return;
    const response = await fetch(`/api/admin/units?id=${unitId}`, { method: 'DELETE' });
    if (response.ok) fetchUnits();
  };

  const goToChapters = (unitId: string) => {
    const identifier = programSlug || programId;
    router.push(`/admin/programs/${identifier}/units/${unitId}/chapters`);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push('/admin/programs')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold mb-2">{className} - Units</h1>
              <p className="text-muted-foreground">Manage units for this program</p>
            </div>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Unit
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <CardTitle className="text-xl">{subject.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Order: {subject.orderIndex}</p>
                      </div>
                    </div>
                    <Badge variant={subject.isLocked ? 'destructive' : 'default'}>
                      {subject.isLocked ? 'Locked' : 'Unlocked'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => goToChapters(subject.id)}
                    >
                      <Layers className="h-4 w-4 mr-2" />
                      Manage Chapters
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setEditingUnit(subject); setFormOpen(true); }}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUnit(subject.id)}
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {programId && (
          <UnitForm
            isOpen={formOpen}
            onClose={() => { setFormOpen(false); setEditingUnit(null); }}
            onSubmit={editingUnit ? handleUpdateUnit : handleCreateUnit}
            initialData={editingUnit || undefined}
            mode={editingUnit ? 'edit' : 'create'}
            programId={programId}
          />
        )}
      </div>
    </div>
  );
}
