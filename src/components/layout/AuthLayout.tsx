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
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/auth-bg.jpg"
          alt="Real estate background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gray-900/30" />
      </div>
      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="flex items-center mb-8">
            <div className="relative h-10 w-10 mr-3 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                UX <span className="text-gray-400">/</span> IDX
              </h1>
              <span className="ml-2 text-sm font-normal tracking-wider text-gray-400">IDX Solution</span>
            </div>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 