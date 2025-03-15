'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building, Users, Calendar, BarChart2, Home, Settings, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthContext } from '@/providers/AuthProvider';
import ScheduledViewings from '@/components/dashboard/ScheduledViewings';

const AgentDashboard = () => {
  const router = useRouter();
  const { user, loading, signOut } = useAuthContext();
  
  const [activeListings, setActiveListings] = useState(12);
  const [pendingSales, setPendingSales] = useState(3);
  const [upcomingAppointments, setUpcomingAppointments] = useState(5);
  const [newLeads, setNewLeads] = useState(8);
  const [isAgent, setIsAgent] = useState(false);
  const [agentId, setAgentId] = useState('agent-1'); // For demo purposes

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      router.push('/agent-login');
      return;
    }

    // Check if user has agent role
    const checkAgentRole = async () => {
      if (user) {
        try {
          // For demo purposes, check if the user has the agent role
          // In a real application, this would check the user's role in the database
          const storedUser = localStorage.getItem('idx_user');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.role === 'agent') {
              setIsAgent(true);
            } else {
              setIsAgent(false);
              toast.error('You do not have agent permissions');
              router.push('/dashboard');
            }
          } else {
            setIsAgent(false);
            router.push('/agent-login');
          }
        } catch (error) {
          console.error('Error checking agent role:', error);
          setIsAgent(false);
        }
      }
    };

    checkAgentRole();
  }, [loading, user, router]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Error logging out');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user is not an agent, show access denied message
  if (!isAgent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-md">
          <Building className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the agent dashboard. Please contact your administrator if you believe this is an error.
          </p>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Go to User Dashboard
            </Button>
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-500 mr-3" />
              <div className="text-3xl font-bold">{activeListings}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Home className="h-8 w-8 text-green-500 mr-3" />
              <div className="text-3xl font-bold">{pendingSales}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-500 mr-3" />
              <div className="text-3xl font-bold">{upcomingAppointments}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-500 mr-3" />
              <div className="text-3xl font-bold">{newLeads}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New listing added</p>
                    <p className="text-sm text-gray-500">123 Main St, Anytown, USA was added to your listings</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">New client inquiry</p>
                    <p className="text-sm text-gray-500">John Smith is interested in 456 Oak Ave</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Upcoming showing</p>
                    <p className="text-sm text-gray-500">Showing scheduled for 789 Pine St at 2:00 PM</p>
                    <p className="text-xs text-gray-400 mt-1">Tomorrow</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your sales and listing performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <BarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Performance charts will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Viewing Requests */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Property Viewing Requests
              </CardTitle>
              <CardDescription>Manage your scheduled property viewings</CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduledViewings userType="agent" agentId={agentId} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Building className="mr-2 h-4 w-4" />
                  Add New Listing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  View Client List
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Notifications</CardTitle>
              <CardDescription>Recent client activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1.5 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson viewed your listing</p>
                    <p className="text-xs text-gray-500">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Michael Brown saved your listing</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-1.5 rounded-full">
                    <Users className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emily Davis requested a showing</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;