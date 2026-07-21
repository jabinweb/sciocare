'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AVAILABLE_CAPABILITIES, DEFAULT_RBAC_CONFIG } from '@/lib/rbac-config';
import { Info, RotateCcw, Save, Settings2, Shield, ShieldAlert, ShieldCheck, Users, X } from 'lucide-react';
import { toast } from 'sonner';

const ROLE_METADATA = {
  ADMIN: { name: 'Administrator', description: 'Full system access and role management.', icon: ShieldCheck, color: 'bg-red-100 text-red-700' },
  MODERATOR: { name: 'Moderator', description: 'Manages users, batches, and platform operations.', icon: ShieldAlert, color: 'bg-amber-100 text-amber-700' },
  TEACHER: { name: 'Teacher', description: 'Views programs and manages assigned batches.', icon: Shield, color: 'bg-indigo-100 text-indigo-700' },
  USER: { name: 'Learner', description: 'Accesses available programs and learning content.', icon: Users, color: 'bg-emerald-100 text-emerald-700' },
} as const;

type RoleName = keyof typeof ROLE_METADATA;
type RoleConfig = Record<RoleName, string[]>;

export default function RolesPage() {
  const { data: session, status } = useSession();
  const [config, setConfig] = useState<RoleConfig>(DEFAULT_RBAC_CONFIG as RoleConfig);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user?.role !== 'ADMIN') return;
    fetch('/api/admin/settings')
      .then((response) => response.json())
      .then((data) => {
        if (!data.rbacConfig) return;
        const parsed = JSON.parse(data.rbacConfig) as Partial<RoleConfig>;
        setConfig((current) => ({ ...current, ...parsed }));
      })
      .catch(() => toast.error('Failed to load role configuration'));
  }, [session?.user?.role]);

  const updateRole = (role: RoleName, permissions: string[]) => {
    setConfig((current) => ({ ...current, [role]: permissions }));
  };

  const save = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rbacConfig: JSON.stringify(config) }),
      });
      if (!response.ok) throw new Error();
      toast.success('Role configuration updated');
      setEditing(false);
    } catch {
      toast.error('Failed to save role configuration');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading') return <div className="p-6">Loading role configuration...</div>;
  if (session?.user?.role !== 'ADMIN') {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <Alert variant="destructive" className="max-w-md">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Access denied</AlertTitle>
          <AlertDescription>Only administrators can manage global roles.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Roles & RBAC</h1>
            <p className="text-muted-foreground">Manage capabilities assigned to each system role.</p>
          </div>
          {editing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setConfig(DEFAULT_RBAC_CONFIG as RoleConfig)}>
                <RotateCcw className="mr-2 h-4 w-4" /> Restore defaults
              </Button>
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              <Button onClick={save} disabled={saving}>
                <Save className="mr-2 h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          ) : (
            <Button onClick={() => setEditing(true)}>
              <Settings2 className="mr-2 h-4 w-4" /> Customize capabilities
            </Button>
          )}
        </div>

        {editing && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Edit mode</AlertTitle>
            <AlertDescription>Add capabilities from the system registry or remove existing ones.</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {(Object.keys(ROLE_METADATA) as RoleName[]).map((role) => {
            const metadata = ROLE_METADATA[role];
            const Icon = metadata.icon;
            const permissions = config[role] || [];
            return (
              <Card key={role}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${metadata.color}`}><Icon className="h-5 w-5" /></div>
                    <div>
                      <CardTitle>{metadata.name}</CardTitle>
                      <Badge variant="outline">{role}</Badge>
                    </div>
                  </div>
                  <CardDescription>{metadata.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex min-h-10 flex-wrap gap-2">
                    {permissions.map((permission) => (
                      <Badge key={permission} variant="secondary" className="gap-1">
                        {permission}
                        {editing && (
                          <button
                            type="button"
                            aria-label={`Remove ${permission}`}
                            onClick={() => updateRole(role, permissions.filter((item) => item !== permission))}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {editing && (
                    <Select
                      value=""
                      onValueChange={(permission) => updateRole(role, [...new Set([...permissions, permission])])}
                    >
                      <SelectTrigger><SelectValue placeholder="Add capability..." /></SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_CAPABILITIES.filter((permission) => !permissions.includes(permission)).map((permission) => (
                          <SelectItem key={permission} value={permission}>{permission}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
