'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useAuthContext } from '@/providers/AuthProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      console.log("Dashboard: Checking authentication");
      // First check localStorage directly for faster initial load
      const storedUser = localStorage.getItem('idx_user');
      
      if (!storedUser && !loading) {
        console.log("Dashboard: No stored user, redirecting to login");
        
        // Check if we're on the agent dashboard path
        const isAgentPath = window.location.pathname.includes('agent-dashboard');
        
        // Redirect to the appropriate login page
        if (isAgentPath) {
          router.push('/agent-login');
        } else {
          router.push('/login');
        }
      } else {
        console.log("Dashboard: User found or still loading");
      }
      
      // After a short delay, update the loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    
    checkAuth();
  }, [loading, router, user]);

  // After the initial load, rely on the auth context
  useEffect(() => {
    if (!loading && !user) {
      console.log("Dashboard: Auth context shows no user, redirecting to login");
      
      // Check if we're on the agent dashboard path
      const isAgentPath = window.location.pathname.includes('agent-dashboard');
      
      // Redirect to the appropriate login page
      if (isAgentPath) {
        router.push('/agent-login');
      } else {
        router.push('/login');
      }
    }
  }, [loading, user, router]);

  // Show loading state while checking authentication
  if (isLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  // If no user and not loading, don't render the protected content
  if (!user && !isLoading && !loading) {
    // This will not show as we should redirect to login
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 