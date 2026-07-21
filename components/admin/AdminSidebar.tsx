'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  MessageSquare,
  BookOpen,
  GraduationCap,
  ChevronLeft,
  School,
  DollarSign,
  AlertTriangle,
  Bell,
  Megaphone,
  Activity,
  LogOut,
  Tag,
  Layers,
  ShieldCheck,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'TEACHER', 'MODERATOR'],
  },
  {
    name: 'Batches',
    href: '/admin/batches',
    icon: Layers,
    roles: ['ADMIN', 'TEACHER', 'MODERATOR'],
  },
  { name: 'Colleges', href: '/admin/colleges', icon: School, roles: ['ADMIN'] },
  { name: 'Users', href: '/admin/users', icon: Users, roles: ['ADMIN', 'MODERATOR'] },
  {
    name: 'Programs',
    href: '/admin/programs',
    icon: GraduationCap,
    roles: ['ADMIN', 'MODERATOR', 'TEACHER'],
  },
  { name: 'Pricing', href: '/admin/pricing', icon: Tag, roles: ['ADMIN'] },
  { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard, roles: ['ADMIN'] },
  { name: 'Payments', href: '/admin/payments', icon: DollarSign, roles: ['ADMIN'] },
  { name: 'Activities', href: '/admin/activities', icon: Activity, roles: ['ADMIN'] },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell, roles: ['ADMIN'] },
  { name: 'Announcements', href: '/admin/announcements', icon: Megaphone, roles: ['ADMIN'] },
  { name: 'Error Logs', href: '/admin/error-logs', icon: AlertTriangle, roles: ['ADMIN'] },
  { name: 'Responses', href: '/admin/responses', icon: MessageSquare, roles: ['ADMIN'] },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BookOpen,
    roles: ['ADMIN', 'TEACHER', 'MODERATOR'],
  },
  { name: 'Role Management', href: '/admin/roles', icon: ShieldCheck, roles: ['ADMIN'] },
  { name: 'Settings', href: '/admin/settings', icon: Settings, roles: ['ADMIN'] },
];

interface AdminSidebarProps {
  isMobile?: boolean;
}

export function AdminSidebar({ isMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [settings, setSettings] = useState({
    programPlural: 'Programs',
    enablePricing: true,
  });
  const userRole = session?.user?.role || 'USER';

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings({
            programPlural: data.programPlural || 'Programs',
            enablePricing: data.enablePricing !== false,
          });
        }
      } catch (e) {
        console.error('Error fetching settings:', e);
      }
    };
    fetchSettings();
  }, []);

  const filteredNavigation = navigation
    .map((item) =>
      item.name === 'Programs' ? { ...item, name: settings.programPlural } : item
    )
    .filter((item) => {
      if (
        !settings.enablePricing &&
        (item.name === 'Pricing' || item.name === 'Subscriptions' || item.name === 'Payments')
      ) {
        return false;
      }
      return item.roles.includes(userRole);
    });

  const sidebarContent = (
    <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="flex items-center flex-shrink-0 px-4 mb-6">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-semibold">
          {userRole === 'TEACHER' ? 'Teacher Panel' : 'Admin Panel'}
        </span>
      </div>

      {!isMobile && (
        <div className="px-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 w-full justify-start"
            onClick={() => router.push('/')}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      )}

      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {filteredNavigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 flex-shrink-0 h-5 w-5',
                    isActive ? 'text-blue-500' : 'text-gray-400'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 pb-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 w-full justify-start text-gray-600 hover:bg-red-50 hover:text-red-600"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return sidebarContent;
  }

  return <div className="hidden md:flex md:w-64 md:flex-col h-full">{sidebarContent}</div>;
}
