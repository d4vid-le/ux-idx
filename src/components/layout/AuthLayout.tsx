"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const pathname = usePathname();
  
  // Get sidebar title based on the current path
  const getSidebarTitle = () => {
    switch(pathname) {
      case '/login':
        return 'IDX Solution - Log in';
      case '/signup':
        return 'IDX Solution - Sign up';
      case '/forgot-password':
        return 'IDX Solution - Forgot Password';
      case '/reset-password':
        return 'IDX Solution - Reset Password';
      default:
        return 'IDX Solution';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2 lg:w-2/3 relative">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
          alt="Modern real estate interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/30" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h2 className="text-3xl font-bold mb-2">{getSidebarTitle()}</h2>
          <p className="text-white/90">
            Browse thousands of properties with our industry-leading IDX platform.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 lg:w-1/3 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-3 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                <span className="absolute text-white font-bold text-sm">db</span>
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-gray-900">db</span>
                <span className="text-blue-500">/</span>
                <span className="text-gray-900">ux</span>
                <span className="ml-2 text-sm font-normal tracking-wider text-blue-400">IDX Solution</span>
              </h1>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>

          {/* Form content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 