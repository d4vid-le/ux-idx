'use client';

import { useState } from 'react';
import { Bell, User } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/providers/AuthProvider';

const DashboardHeader = () => {
  const { user } = useAuthContext();
  
  // Use user data from auth context if available, otherwise fall back to mock data
  const userData = user || {
    name: 'Demo User',
    email: 'demo@idxsolution.com',
    avatarUrl: null,
  };
  
  // Mock notification count - in a real app this would come from a notifications system
  const unreadNotifications = 2;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Logo or brand */}
        <div className="flex items-center">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            
          </Link>
        </div>

        {/* Right: User menu and notifications */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Link href="/dashboard/notifications" className="block relative p-1">
              <Bell className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </Link>
          </div>

          {/* User menu */}
          <div className="relative flex items-center">
            <Link href="/dashboard/profile" className="flex items-center">
              {userData.avatarUrl ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={userData.avatarUrl}
                  alt={userData.name || ''}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
              )}
              <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">
                {userData.name || userData.email}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 