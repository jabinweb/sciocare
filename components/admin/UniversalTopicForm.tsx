'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/ui/loading';

// Simple UUID generator using crypto API
const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

interface UniversalTopicFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TopicFormData) => Promise<void>;
}

interface TopicFormData {
  name: string;
  type: string;
  duration: string;
  orderIndex: number;
  chapterId: string;
  content?: {
    contentType: string;
    url?: string;
    videoUrl?: string;
    pdfUrl?: string;
    textContent?: string;
    widgetConfig?: Record<string, unknown>;
  };
}

export function UniversalTopicForm({ isOpen, onClose, onSubmit }: UniversalTopicFormProps) {
  interface ProgramItem {
    id: string;
    name: string;
  }
  
    const [programs, setPrograms] = useState<ProgramItem[]>([]);
  interface UnitItem {
    id: string;
    name: string;
  }
  const [units, setUnits] = useState<UnitItem[]>([]);
  interface ChapterItem {
    id: string;
    name: string;
  }
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [formData, setFormData] = useState<TopicFormData>({
    name: '',
    type: 'VIDEO',
    duration: '',
    orderIndex: 0,
    chapterId: '',
    content: { contentType: 'EXTERNAL_LINK' }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [addingUnit, setAddingUnit] = useState(false);
  const [addingChapter, setAddingChapter] = useState(false);
  const [newUnitName, setNewUnitName] = useState('');
  const [newChapterName, setNewChapterName] = useState('');
  const newUnitInputRef = useRef<HTMLInputElement>(null);
  const newChapterInputRef = useRef<HTMLInputElement>(null);

  // Fetch all programs on open
  useEffect(() => {
    if (!isOpen) return;
    const fetchPrograms = async () => {
      const res = await fetch('/api/admin/programs');
      const data = await res.json();
      setPrograms(Array.isArray(data) ? data : []);
    };
    fetchPrograms();
    setUnits([]);
    setChapters([]);
    setSelectedProgram('');
    setSelectedUnit('');
    setSelectedChapter('');
    setFormData({
      name: '',
      type: 'VIDEO',
      duration: '',
      orderIndex: 0,
      chapterId: '',
      content: { contentType: 'EXTERNAL_LINK' }
    });
  }, [isOpen]);

  // Fetch units when program changes
  useEffect(() => {
    if (!selectedProgram) return;
    const fetchUnits = async () => {
      const res = await fetch(`/api/admin/units?classId=${selectedProgram}`);
      const data = await res.json();
      setUnits(Array.isArray(data) ? data : []);
    };
    fetchUnits();
    setChapters([]);
    setSelectedUnit('');
    setSelectedChapter('');
  }, [selectedProgram]);

  // Fetch chapters when subject changes
  useEffect(() => {
    if (!selectedUnit) return;
    const fetchChapters = async () => {
      const res = await fetch(`/api/admin/chapters?subjectId=${selectedUnit}`);
      const data = await res.json();
      setChapters(Array.isArray(data) ? data : []);
    };
    fetchChapters();
    setSelectedChapter('');
  }, [selectedUnit]);

  // Set chapterId in formData when selectedChapter changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, chapterId: selectedChapter }));
  }, [selectedChapter]);

  const handleChange = (field: keyof TopicFormData, value: string | number | object) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
        contentType: field === 'contentType' ? value as string : prev.content?.contentType ?? 'EXTERNAL_LINK'
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch {
      // Optionally show error
    } finally {
      setIsLoading(false);
    }
  };

  // Add new unit
  const handleAddUnit = async () => {
    if (!selectedProgram || !newUnitName.trim()) return;
    setAddingUnit(true);
    try {
      const res = await fetch('/api/admin/units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: generateId(),
          name: newUnitName,
          icon: '📚',
          color: 'from-blue-400 to-blue-600',
          isLocked: false,
          orderIndex: units.length,
          classId: selectedProgram,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setUnits((prev) => [...prev, data]);
        setSelectedUnit(data.id);
        setNewUnitName('');
        setShowAddUnit(false);
      }
    } finally {
      setAddingUnit(false);
    }
  };

  // Add new chapter
  const handleAddChapter = async () => {
    if (!selectedUnit || !newChapterName.trim()) return;
    setAddingChapter(true);
    try {
      const res = await fetch('/api/admin/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newChapterName,
          orderIndex: chapters.length,
          subjectId: selectedUnit,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setChapters((prev) => [...prev, data]);
        setSelectedChapter(data.id);
        setNewChapterName('');
        setShowAddChapter(false);
      }
    } finally {
      setAddingChapter(false);
    }
  };

  // Fix: Only disable the Add Topic button if required fields are missing
  const isAddTopicDisabled =
    !selectedProgram ||
    !selectedUnit ||
    !selectedChapter ||
    !formData.name.trim() ||
    !formData.type ||
    !formData.duration.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Topic to Any Chapter</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Program Dropdown */}
          <div>
            <Label>Program</Label>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger>
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg z-50">
                {programs.map((prog) => (
                  <SelectItem key={prog.id} value={String(prog.id)}>
                    {prog.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Unit Dropdown with Add option */}
          <div>
            <Label>Unit</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select value={selectedUnit} onValueChange={setSelectedUnit} disabled={!selectedProgram}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg z-50">
                    {units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowAddUnit(true);
                  setTimeout(() => newUnitInputRef.current?.focus(), 100);
                }}
                disabled={!selectedProgram}
              >
                + Add
              </Button>
            </div>
            {showAddUnit && (
              <div className="flex gap-2 mt-2">
                <Input
                  ref={newUnitInputRef}
                  value={newUnitName}
                  onChange={(e) => setNewUnitName(e.target.value)}
                  placeholder="New subject name"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddUnit();
                    }
                  }}
                  disabled={addingUnit}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddUnit}
                  disabled={addingUnit || !newUnitName.trim()}
                >
                  Add
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => { setShowAddUnit(false); setNewUnitName(''); }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
          {/* Chapter Dropdown with Add option */}
          <div>
            <Label>Chapter</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select value={selectedChapter} onValueChange={setSelectedChapter} disabled={!selectedUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Chapter" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg z-50">
                    {chapters.map((ch) => (
                      <SelectItem key={ch.id} value={ch.id}>
                        {ch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowAddChapter(true);
                  setTimeout(() => newChapterInputRef.current?.focus(), 100);
                }}
                disabled={!selectedUnit}
              >
                + Add
              </Button>
            </div>
            {showAddChapter && (
              <div className="flex gap-2 mt-2">
                <Input
                  ref={newChapterInputRef}
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                  placeholder="New chapter name"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddChapter();
                    }
                  }}
                  disabled={addingChapter}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddChapter}
                  disabled={addingChapter || !newChapterName.trim()}
                >
                  Add
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => { setShowAddChapter(false); setNewChapterName(''); }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
          {/* Topic Fields */}
          <div>
            <Label htmlFor="name">Topic Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Introduction to Variables"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Topic Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="INTERACTIVE">Interactive</SelectItem>
                  <SelectItem value="EXERCISE">Exercise</SelectItem>
                  <SelectItem value="AUDIO">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="e.g., 15 min"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="orderIndex">Order Index</Label>
            <Input
              id="orderIndex"
              type="number"
              value={formData.orderIndex}
              onChange={(e) => handleChange('orderIndex', parseInt(e.target.value))}
              min="0"
              required
            />
          </div>
          {/* Content Section */}
          <div className="border-t pt-4 space-y-4">
            <h4 className="font-medium">Content Details</h4>
            <div>
              <Label htmlFor="contentType">Content Type</Label>
              <Select 
                value={formData.content?.contentType || 'EXTERNAL_LINK'} 
                onValueChange={(value) => handleContentChange('contentType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EXTERNAL_LINK">External Link</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="TEXT">Text</SelectItem>
                  <SelectItem value="INTERACTIVE_WIDGET">Interactive Widget</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(formData.content?.contentType === 'EXTERNAL_LINK' || formData.content?.contentType === 'PDF') && (
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.content?.url || ''}
                  onChange={(e) => handleContentChange('url', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            )}
            {formData.content?.contentType === 'VIDEO' && (
              <div>
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  value={formData.content?.videoUrl || ''}
                  onChange={(e) => handleContentChange('videoUrl', e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            )}
            {formData.content?.contentType === 'TEXT' && (
              <div>
                <Label htmlFor="textContent">Text Content</Label>
                <Textarea
                  id="textContent"
                  value={formData.content?.textContent || ''}
                  onChange={(e) => handleContentChange('textContent', e.target.value)}
                  placeholder="Enter the text content..."
                  rows={4}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isAddTopicDisabled || isLoading}>
              {isLoading && <LoadingSpinner className="mr-2" />}
              Add Topic
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
