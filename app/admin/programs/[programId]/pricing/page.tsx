'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowLeft, 
  Plus, 
  Pencil, 
  Trash2, 
  Save,
  IndianRupee,
  Clock,
  Star,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface PricingPlan {
  id: string;
  name: string;
  durationMonths: number;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  isActive: boolean;
  isPopular: boolean;
  features: string[];
  sortOrder: number;
  class?: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Program {
  id: number;
  name: string;
  slug: string;
}

export default function PricingManagementPage() {
  const params = useParams();
  const programId = params.programId as string;

  const [program, setProgram] = useState<Program | null>(null);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    durationMonths: 3,
    price: 0,
    originalPrice: 0,
    discount: 0,
    isActive: true,
    isPopular: false,
    features: '',
    sortOrder: 0
  });

  const fetchPricingPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Fetch program details
      const programRes = await fetch(`/api/admin/programs/${programId}`);
      if (programRes.ok) {
        const programData = await programRes.json();
        setProgram(programData.program || programData);
      }
      
      // Fetch pricing plans
      const res = await fetch(`/api/admin/pricing?classId=${programId}`);
      if (res.ok) {
        const data = await res.json();
        setPlans(data.plans || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load pricing plans');
    } finally {
      setIsLoading(false);
    }
  }, [programId]);

  useEffect(() => {
    fetchPricingPlans();
  }, [fetchPricingPlans]);

  const handleOpenDialog = (plan?: PricingPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        durationMonths: plan.durationMonths,
        price: plan.price / 100, // Convert from paise to rupees for display
        originalPrice: plan.originalPrice ? plan.originalPrice / 100 : 0,
        discount: plan.discount || 0,
        isActive: plan.isActive,
        isPopular: plan.isPopular,
        features: plan.features.join('\n'),
        sortOrder: plan.sortOrder
      });
    } else {
      setEditingPlan(null);
      setFormData({
        name: '',
        durationMonths: 3,
        price: 0,
        originalPrice: 0,
        discount: 0,
        isActive: true,
        isPopular: false,
        features: '',
        sortOrder: plans.length + 1
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const payload = {
        classId: parseInt(programId),
        name: formData.name,
        durationMonths: formData.durationMonths,
        price: Math.round(formData.price * 100), // Convert to paise
        originalPrice: formData.originalPrice ? Math.round(formData.originalPrice * 100) : null,
        discount: formData.discount || null,
        isActive: formData.isActive,
        isPopular: formData.isPopular,
        features: formData.features.split('\n').filter(f => f.trim()),
        sortOrder: formData.sortOrder
      };

      const url = editingPlan 
        ? `/api/admin/pricing/${editingPlan.id}`
        : '/api/admin/pricing';
      
      const method = editingPlan ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save pricing plan');
      }

      toast.success(editingPlan ? 'Pricing plan updated' : 'Pricing plan created');
      setIsDialogOpen(false);
      fetchPricingPlans();
    } catch (error) {
      console.error('Error saving pricing plan:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save pricing plan');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return;

    try {
      const res = await fetch(`/api/admin/pricing/${planId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete pricing plan');
      }

      toast.success('Pricing plan deleted');
      fetchPricingPlans();
    } catch (error) {
      console.error('Error deleting pricing plan:', error);
      toast.error('Failed to delete pricing plan');
    }
  };

  const handleToggleActive = async (plan: PricingPlan) => {
    try {
      const res = await fetch(`/api/admin/pricing/${plan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !plan.isActive })
      });

      if (!res.ok) {
        throw new Error('Failed to update pricing plan');
      }

      toast.success(`Plan ${!plan.isActive ? 'activated' : 'deactivated'}`);
      fetchPricingPlans();
    } catch (error) {
      console.error('Error toggling plan:', error);
      toast.error('Failed to update pricing plan');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/programs/${programId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Pricing Plans</h1>
            <p className="text-gray-500">{program?.name || 'Loading...'}</p>
          </div>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      {/* Pricing Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>
            Manage pricing tiers for this program. Prices are stored in paise (1 INR = 100 paise).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {plans.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <IndianRupee className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No pricing plans configured</p>
              <p className="text-sm">Add your first pricing plan to enable subscriptions</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Original Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Popular</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {plan.durationMonths} months
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">
                        ₹{(plan.price / 100).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {plan.originalPrice ? (
                        <span className="text-gray-400 line-through">
                          ₹{(plan.originalPrice / 100).toLocaleString()}
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {plan.discount ? (
                        <Badge variant="secondary">{plan.discount}% off</Badge>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={plan.isActive}
                        onCheckedChange={() => handleToggleActive(plan)}
                      />
                    </TableCell>
                    <TableCell>
                      {plan.isPopular && (
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleOpenDialog(plan)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(plan.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? 'Edit Pricing Plan' : 'Add Pricing Plan'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., 3 Months, 6 Months"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (months)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={formData.durationMonths}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    durationMonths: parseInt(e.target.value) || 1 
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    sortOrder: parseInt(e.target.value) || 0 
                  }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    price: parseFloat(e.target.value) || 0 
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    originalPrice: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="For showing discount"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  discount: parseInt(e.target.value) || 0 
                }))}
                placeholder="e.g., 25"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Features (one per line)</Label>
              <textarea
                id="features"
                className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                value={formData.features}
                onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                placeholder="Enter features, one per line"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="isPopular"
                  checked={formData.isPopular}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked }))}
                />
                <Label htmlFor="isPopular">Mark as Popular</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
