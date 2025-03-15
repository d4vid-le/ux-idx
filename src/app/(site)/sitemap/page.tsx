'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  Search, 
  Building, 
  User, 
  Settings, 
  Bell, 
  Heart, 
  FileText, 
  LogIn, 
  UserPlus, 
  KeyRound, 
  Briefcase,
  Map,
  Filter,
  Clock,
  Lock,
  HelpCircle,
  Bookmark
} from 'lucide-react';

interface SitemapLink {
  title: string;
  href: string;
  icon: React.ElementType;
  description: string;
  isNew?: boolean;
}

interface SitemapSection {
  title: string;
  description?: string;
  links: SitemapLink[];
}

const SitemapPage = () => {
  const sitemapData: SitemapSection[] = [
    {
      title: 'Main Pages',
      description: 'Core pages for property browsing and searching',
      links: [
        {
          title: 'Home',
          href: '/',
          icon: Home,
          description: 'Main landing page with featured properties'
        },
        {
          title: 'Property Search',
          href: '/search',
          icon: Search,
          description: 'Search for properties with advanced filters'
        },
        {
          title: 'Property Details',
          href: '/properties/123',
          icon: Building,
          description: 'View detailed information about a specific property'
        },
        {
          title: 'Map View',
          href: '/search?view=map',
          icon: Map,
          description: 'View properties on an interactive map',
          isNew: true
        }
      ]
    },
    {
      title: 'Property Categories',
      description: 'Browse properties by type',
      links: [
        {
          title: 'Houses',
          href: '/search?type=house',
          icon: Home,
          description: 'Browse all houses for sale'
        },
        {
          title: 'Apartments',
          href: '/search?type=apartment',
          icon: Building,
          description: 'Browse all apartments for sale'
        },
        {
          title: 'Condos',
          href: '/search?type=condo',
          icon: Building,
          description: 'Browse all condos for sale'
        },
        {
          title: 'Luxury Properties',
          href: '/search?luxury=true',
          icon: Building,
          description: 'Browse luxury properties'
        }
      ]
    },
    {
      title: 'Authentication',
      description: 'Account access and management',
      links: [
        {
          title: 'Login',
          href: '/login',
          icon: LogIn,
          description: 'User login page'
        },
        {
          title: 'Sign Up',
          href: '/signup',
          icon: UserPlus,
          description: 'Create a new user account'
        },
        {
          title: 'Forgot Password',
          href: '/forgot-password',
          icon: KeyRound,
          description: 'Reset your password'
        },
        {
          title: 'Reset Password',
          href: '/reset-password',
          icon: Lock,
          description: 'Set a new password after reset'
        },
        {
          title: 'Agent Login',
          href: '/agent-login',
          icon: Briefcase,
          description: 'Real estate agent login page'
        }
      ]
    },
    {
      title: 'User Dashboard',
      description: 'Manage your account and saved properties',
      links: [
        {
          title: 'Dashboard',
          href: '/dashboard',
          icon: Home,
          description: 'User dashboard overview'
        },
        {
          title: 'Profile',
          href: '/dashboard/profile',
          icon: User,
          description: 'Manage your user profile'
        },
        {
          title: 'Saved Properties',
          href: '/dashboard/saved',
          icon: Heart,
          description: 'View your saved properties'
        },
        {
          title: 'Saved Searches',
          href: '/dashboard/searches',
          icon: Bookmark,
          description: 'View your saved property searches'
        },
        {
          title: 'Notifications',
          href: '/dashboard/notifications',
          icon: Bell,
          description: 'View your notifications'
        },
        {
          title: 'Settings',
          href: '/dashboard/settings',
          icon: Settings,
          description: 'Manage your account settings'
        }
      ]
    },
    {
      title: 'Agent Dashboard',
      description: 'Tools for real estate agents',
      links: [
        {
          title: 'Agent Dashboard',
          href: '/agent-dashboard',
          icon: Briefcase,
          description: 'Agent dashboard overview'
        },
        {
          title: 'Agent Profile',
          href: '/agent-dashboard/profile',
          icon: User,
          description: 'Manage your agent profile'
        },
        {
          title: 'Agent Notifications',
          href: '/agent-dashboard/notifications',
          icon: Bell,
          description: 'View your agent notifications'
        },
        {
          title: 'Agent Settings',
          href: '/agent-dashboard/settings',
          icon: Settings,
          description: 'Manage your agent account settings'
        }
      ]
    },
    {
      title: 'Legal & Help',
      description: 'Legal information and help resources',
      links: [
        {
          title: 'Privacy Policy',
          href: '/privacy',
          icon: FileText,
          description: 'Our privacy policy'
        },
        {
          title: 'Terms of Service',
          href: '/terms',
          icon: FileText,
          description: 'Our terms of service'
        },
        {
          title: 'Sitemap',
          href: '/sitemap',
          icon: Map,
          description: 'This sitemap page'
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Use this sitemap to navigate through all the pages available on our website.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sitemapData.map((section, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-800">{section.title}</CardTitle>
                {section.description && (
                  <CardDescription className="text-blue-600">
                    {section.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <div className="mr-4 mt-1">
                          <link.icon className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900">{link.title}</h3>
                            {link.isNew && (
                              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{link.description}</p>
                        </div>
                        <div className="text-gray-400 hover:text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            This sitemap was last updated on {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage; 