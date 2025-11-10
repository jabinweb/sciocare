'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface ProgramFormData {
  id?: string;
  name: string;
  description: string;
  isActive: boolean;
  price?: string; // Keep as string for form input
  logo?: string;
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
    logo: '',
  });
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === 'edit') {
        setFormData({
          id: initialData.id,
          name: initialData.name || '',
          description: initialData.description || '',
          isActive: initialData.isActive !== undefined ? initialData.isActive : true,
          price: initialData.price || '299',
          logo: initialData.logo || '',
        });
        setLogoPreview(initialData.logo || '');
        setLogoFile(null);
      } else {
        setFormData({
          name: '',
          description: '',
          isActive: true,
          price: '299',
          logo: '',
        });
        setLogoPreview('');
        setLogoFile(null);
      }
    }
  }, [isOpen, initialData, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // If a new logo file is selected, upload it first
      let logoPath = formData.logo;
      if (logoFile) {
        const formDataObj = new FormData();
        formDataObj.append('file', logoFile);
        formDataObj.append('folder', 'program-logos');
        
        const uploadResponse = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formDataObj,
        });
        
        if (uploadResponse.ok) {
          const { filePath } = await uploadResponse.json();
          logoPath = filePath;
        }
      }
      
      await onSubmit({ ...formData, logo: logoPath });
      onClose();
    } catch (error) {
      console.error('Error submitting program:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
    updateFormData('logo', '');
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
            <Label className="mb-2 block">Program Logo</Label>
            <div className="space-y-2">
              {logoPreview ? (
                <div className="relative inline-block">
                  <div className="w-32 h-32 border rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={logoPreview}
                      alt="Program logo preview"
                      width={128}
                      height={128}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={removeLogo}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">Upload Logo</span>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Recommended: Square image (256x256px or larger). Max size: 2MB
              </p>
            </div>
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
              