'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, CreditCard, UserCheck, TrendingUp, DollarSign, Activity, Calendar, BookOpen, Package, Award, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus } from 'lucide-react';
import { UniversalTopicForm } from '@/components/admin/UniversalTopicForm';
import { Badge } from '@/components/ui/badge';

interface Signup {
  id: string;
  name: string;
  email: string;
  school: string;
  role: string;
  timestamp: string;
}

interface Subscription {
  id: string;
  userId: string;
  paymentId: string;
  amount: number;
  status: string;
  created_at: string;
}

interface RegisteredUser {
  uid: string;
  email: string;
  displayName: string | null;
  creationTime: string;
  lastSignInTime: string | null;
  subscription: Subscription | null;
  hasActiveSubscription: boolean;
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

export default function AdminPage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const userRole = user?.role;
  const loading = status === 'loading';
  const [signups, setSignups] = useState<Signup[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [topicFormOpen, setTopicFormOpen] = useState(false);

  // Admin check is now handled by layout, this is just for component state
  const isAdmin = userRole === 'ADMIN';
  const isLoadingAuth = loading || (user && !userRole);

  console.log('User:', user);
  console.log('User Role:', userRole);
  console.log('Loading:', loading);
  console.log('Is Loading Auth:', isLoadingAuth);
  console.log('Data Fetched:', dataFetched);

  useEffect(() => {
    // Fetch data when user is confirmed admin and data hasn't been fetched yet
    if (isAdmin && !dataFetched && !isLoadingAuth) {
      const fetchData = async () => {
        setDataLoading(true);
        try {
          const [responsesResponse, subscriptionsResponse, usersResponse] = await Promise.all([
            fetch('/api/admin/responses'),
            fetch('/api/admin/subscriptions'),
            fetch('/api/admin/users')
          ]);
          
          const responsesData = await responsesResponse.json();
          const subscriptionsData = await subscriptionsResponse.json();
          const usersData = await usersResponse.json();

          // Ensure arrays are returned, fallback to empty arrays if API returns errors
          setSignups(Array.isArray(responsesData) ? responsesData : []);
          setSubscriptions(Array.isArray(subscriptionsData) ? subscriptionsData : []);
          setRegisteredUsers(Array.isArray(usersData) ? usersData : []);
          setDataFetched(true);
        } catch (error) {
          console.error('Error fetching admin data:', error);
          // Set empty arrays on error
          setSignups([]);
          setSubscriptions([]);
          setRegisteredUsers([]);
          setDataFetched(true);
        } finally {
          setDataLoading(false);
        }
      };

      fetchData();
    }
  }, [isAdmin, isLoadingAuth, dataFetched]);

  const refreshData = async () => {
    setDataLoading(true);
    try {
      const [responsesResponse, subscriptionsResponse, usersResponse] = await Promise.all([
        fetch('/api/admin/responses'),
        fetch('/api/admin/subscriptions'),
        fetch('/api/admin/users')
      ]);
      
      const responsesData = await responsesResponse.json();
      const subscriptionsData = await subscriptionsResponse.json();
      const usersData = await usersResponse.json();
      
      // Ensure arrays are returned
      setSignups(Array.isArray(responsesData) ? responsesData : []);
      setSubscriptions(Array.isArray(subscriptionsData) ? subscriptionsData : []);
      setRegisteredUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error('Error refreshing data:', error);
      // Set empty arrays on error
      setSignups([]);
      setSubscriptions([]);
      setRegisteredUsers([]);
    } finally {
      setDataLoading(false);
    }
  };

  const handleUniversalTopicSubmit = async (formData: TopicFormData) => {
    const response = await fetch('/api/admin/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to add topic');
    }
  };

  // Show loading while checking auth and role - layout handles redirects
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Layout already handles non-admin users, so if we reach here, user is admin
  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeSubscriptions = Array.isArray(subscriptions) ? subscriptions.filter(s => s.status === 'ACTIVE') : [];
  const totalRevenue = Array.isArray(subscriptions) ? subscriptions.reduce((sum, s) => sum + (s.amount || 0), 0) : 0;
  const monthlyRevenue = Array.isArray(subscriptions) ? subscriptions
    .filter(s => new Date(s.created_at).getMonth() === new Date().getMonth())
    .reduce((sum, s) => sum + (s.amount || 0), 0) : 0;
  
  const todayRegistrations = registeredUsers.filter(u => 
    new Date(u.creationTime).toDateString() === new Date().toDateString()
  ).length;

  const weeklyRegistrations = registeredUsers.filter(u => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(u.creationTime) >= weekAgo;
  }).length;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={refreshData} disabled={dataLoading} variant="outline" size="lg">
                <RefreshCw className={`h-4 w-4 mr-2 ${dataLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button onClick={() => setTopicFormOpen(true)} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add Topic
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{registeredUsers.length}</div>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{todayRegistrations} today
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{activeSubscriptions.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                {((activeSubscriptions.length / (registeredUsers.length || 1)) * 100).toFixed(1)}% conversion rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₹{(totalRevenue/100).toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">
                ₹{(totalRevenue/(registeredUsers.length || 1)/100).toFixed(0)} per user
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₹{(monthlyRevenue/100).toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-blue-500" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Registrations</span>
                  <Badge variant="secondary">{weeklyRegistrations}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">User Activities</span>
                  <Badge variant="secondary">{signups.filter(s => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(s.timestamp) >= weekAgo;
                  }).length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
                Subscription Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Subscriptions</span>
                  <Badge variant="secondary">{subscriptions.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Subscription Value</span>
                  <Badge variant="secondary">₹{subscriptions.length > 0 ? (totalRevenue/subscriptions.length/100).toFixed(0) : 0}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-green-500" />
                Today's Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Users</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{todayRegistrations}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Subscriptions</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {subscriptions.filter(s => 
                      new Date(s.created_at).toDateString() === new Date().toDateString()
                    ).length}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Recent Registrations
              </CardTitle>
              <CardDescription>Latest users who joined the platform</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {registeredUsers.slice(0, 5).map((user) => (
                  <div key={user.uid} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                        {(user.displayName || user.email || 'A')[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.displayName || 'Anonymous'}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(user.creationTime).toLocaleDateString()}
                      </p>
                      {user.hasActiveSubscription && (
                        <Badge className="mt-1 bg-green-100 text-green-700 border-green-200">Active</Badge>
                      )}
                    </div>
                  </div>
                ))}
                {registeredUsers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No users found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                Recent Subscriptions
              </CardTitle>
              <CardDescription>Latest subscription payments received</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {subscriptions.slice(0, 5).map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">₹{((subscription.amount || 0)/100).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">ID: {subscription.userId.slice(0, 12)}...</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(subscription.created_at).toLocaleDateString()}
                      </p>
                      <Badge className={subscription.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                        {subscription.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {subscriptions.length === 0 && (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No subscriptions found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <UniversalTopicForm
          isOpen={topicFormOpen}
          onClose={() => setTopicFormOpen(false)}
          onSubmit={handleUniversalTopicSubmit}
        />
      </div>
    </div>
  );
}
