'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface ProgramFormData {
  id?: string;
  name: string;
  description: string;
  isActive: boolean;
  price?: string; // Keep as string for form input
}

interface ProgramFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProgramFormData) => Promise<void>;
  initialData?: ProgramFormData;
  mode: 'create' | 'edit';
}

export function ProgramForm({ isOpen, onClose, onSubmit, initialData, mode }: ProgramFormProps) {
  const [formData, setFormData] = useState<ProgramFormData>({
    name: '',
    description: '',
    isActive: true,
    price: '299', // Default price in rupees
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === 'edit') {
        setFormData({
          id: initialData.id,
          name: initialData.name || '',
          description: initialData.description || '',
          isActive: initialData.isActive !== undefined ? initialData.isActive : true,
          price: initialData.price || '299',
        });
      } else {
        setFormData({
          name: '',
          description: '',
          isActive: true,
          price: '299',
        });
      }
    }
  }, [isOpen, initialData, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting program:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof ProgramFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit Program' : 'Create New Program'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2 block">Program Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="e.g., CBSE : Class 5"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2 block">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Brief description of the program"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="price" className="mb-2 block">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => updateFormData('price', e.target.value)}
              placeholder="299"
              min="0"
              step="1"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Price for accessing this program. Set to 0 for free access.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) => updateFormData('isActive', checked)}
            />
            <Label htmlFor="active">Active</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : mode === 'edit' ? 'Update Program' : 'Create Program'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
              