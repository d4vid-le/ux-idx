'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/providers/AuthProvider';
import { 
  Home, 
  User, 
  Heart, 
  Search, 
  Map, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigationItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Profile', icon: User, path: '/dashboard/profile' },
    { name: 'Saved Properties', icon: Heart, path: '/dashboard/saved' },
    { name: 'Saved Searches', icon: Search, path: '/dashboard/searches' },
    { name: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className={`
        fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 pt-5 pb-4 flex flex-col transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:static lg:w-64 lg:flex
      `}>
        {/* Logo */}
        <div className="flex items-center px-4 mb-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">IDX Solution</span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="ml-auto p-2 text-gray-500 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 px-2 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link 
                key={item.name}
                href={item.path}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                <item.icon 
                  className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} 
                  aria-hidden="true" 
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Log out button */}
        <div className="px-2 mt-6 mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 w-full text-left"
          >
            <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
            Log out
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar; 