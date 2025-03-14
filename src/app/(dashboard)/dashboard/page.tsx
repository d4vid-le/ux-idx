'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyGrid from '@/components/PropertyGrid';
import PropertySearch from '@/components/dashboard/PropertySearch';
import AgentInfo from '@/components/dashboard/AgentInfo';
import ProfileSettings from '@/components/dashboard/ProfileSettings';
import { Property } from '@/types/property';
import { Activity, Heart, Map, Bell, User, Search, Settings } from 'lucide-react';

export default function DashboardPage() {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Property[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState('saved');
  const [agent] = useState({
    name: 'John Smith',
    title: 'Senior Real Estate Agent',
    email: 'john.smith@idxsolution.com',
    phone: '(555) 123-4567',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    office: 'IDX Solution Real Estate',
  });

  const [userProfile, setUserProfile] = useState({
    name: 'Demo User',
    email: 'demo@idxsolution.com',
    phone: '(555) 987-6543',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    twoFactorEnabled: false,
  });

  // Simulate fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, these would be API calls to fetch user-specific data
        // Mock data for demonstration
        const mockSavedProperties = [
          {
            id: '1',
            title: 'Luxury Condo in Manhattan',
            address: '123 Park Avenue, New York, NY',
            price: 1250000,
            bedrooms: 2,
            bathrooms: 2,
            sqft: 1500,
            propertyType: 'Condo',
            status: 'For Sale',
            imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Penthouse with City Views',
            address: '456 5th Avenue, New York, NY',
            price: 3500000,
            bedrooms: 3,
            bathrooms: 3.5,
            sqft: 2800,
            propertyType: 'Penthouse',
            status: 'For Sale',
            imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
            createdAt: new Date().toISOString(),
          },
        ];
        
        const mockSearches = [
          { id: 1, query: 'Manhattan, 2 bed, Under $2M', date: '2023-10-15', count: 156 },
          { id: 2, query: 'Brooklyn Heights', date: '2023-10-14', count: 73 },
          { id: 3, query: 'Upper East Side, 3+ bed', date: '2023-10-10', count: 42 },
        ];
        
        const mockNotifications = [
          { id: 1, message: 'Price reduced on 123 Park Avenue', date: '2023-10-15', read: false },
          { id: 2, message: 'New property matching your search', date: '2023-10-14', read: false },
          { id: 3, message: 'Saved search updated with 5 new properties', date: '2023-10-12', read: true },
        ];
        
        setSavedProperties(mockSavedProperties);
        setRecentSearches(mockSearches);
        setRecentlyViewed(mockSavedProperties.slice().reverse());
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleSearch = (filters: any) => {
    setLoading(true);
    // In a real app, this would be an API call to search properties
    // For now, we'll simulate a search with the mock data
    const filteredProperties = savedProperties.filter(property => {
      if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
      if (filters.beds && property.bedrooms < parseInt(filters.beds)) return false;
      if (filters.baths && property.bathrooms < parseInt(filters.baths)) return false;
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) return false;
      if (filters.location && !property.address.toLowerCase().includes(filters.location.toLowerCase())) return false;
      return true;
    });
    
    setSearchResults(filteredProperties);
    setActiveTab('search');
    setLoading(false);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const handleProfileUpdate = (data: any) => {
    setUserProfile(data);
    // In a real app, this would be an API call to update the user's profile
    console.log('Profile updated:', data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadNotificationCount}
              </span>
            )}
          </div>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* User Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Heart className="h-7 w-7 text-rose-500 mr-2" />
              <div className="text-2xl font-bold">{savedProperties.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saved Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Map className="h-7 w-7 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{recentSearches.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-7 w-7 text-emerald-500 mr-2" />
              <div className="text-2xl font-bold">{recentlyViewed.length}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PropertySearch onSearch={handleSearch} />
        </div>
        <div>
          <AgentInfo agent={agent} />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="saved">Saved Properties</TabsTrigger>
          <TabsTrigger value="searches">Saved Searches</TabsTrigger>
          <TabsTrigger value="viewed">Recently Viewed</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="search">Search Results</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved" className="space-y-4">
          <h2 className="text-xl font-semibold">Your Saved Properties</h2>
          {loading ? (
            <div className="text-center py-10">Loading saved properties...</div>
          ) : savedProperties.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No saved properties yet</h3>
              <p className="text-gray-500">
                Properties you save will appear here for easy access.
              </p>
            </div>
          ) : (
            <PropertyGrid properties={savedProperties} />
          )}
        </TabsContent>
        
        <TabsContent value="searches" className="space-y-4">
          <h2 className="text-xl font-semibold">Your Saved Searches</h2>
          {loading ? (
            <div className="text-center py-10">Loading saved searches...</div>
          ) : recentSearches.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Map className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No saved searches yet</h3>
              <p className="text-gray-500">
                Save your searches to get notified when new properties match your criteria.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Query</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Saved</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Properties</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentSearches.map((search) => (
                    <tr key={search.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{search.query}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{search.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{search.count} properties</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">View</a>
                        <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="viewed" className="space-y-4">
          <h2 className="text-xl font-semibold">Recently Viewed Properties</h2>
          {loading ? (
            <div className="text-center py-10">Loading recently viewed properties...</div>
          ) : recentlyViewed.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No recently viewed properties</h3>
              <p className="text-gray-500">
                Properties you view will appear here for quick reference.
              </p>
            </div>
          ) : (
            <PropertyGrid properties={recentlyViewed} />
          )}
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          {loading ? (
            <div className="text-center py-10">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-gray-500">
                You'll be notified about property updates and saved search results.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li key={notification.id} className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <Bell className={`h-5 w-5 ${!notification.read ? 'text-blue-500' : 'text-gray-400'}`} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500">{notification.date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          {loading ? (
            <div className="text-center py-10">Searching properties...</div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No properties found</h3>
              <p className="text-gray-500">
                Try adjusting your search criteria to find more properties.
              </p>
            </div>
          ) : (
            <PropertyGrid properties={searchResults} />
          )}
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <ProfileSettings user={userProfile} onUpdate={handleProfileUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 