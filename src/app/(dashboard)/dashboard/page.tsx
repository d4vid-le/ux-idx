'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PropertyGrid from '@/components/PropertyGrid';
import AgentInfo from '@/components/dashboard/AgentInfo';
import { Property } from '@/types/property';
import { Activity, Map, Bell, User, Search, Settings, Heart, Home, TrendingUp, Calendar } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import ScheduledViewings from '@/components/dashboard/ScheduledViewings';

export default function DashboardPage() {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Property[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { favoriteIds } = useFavorites();
  const [agent] = useState({
    name: 'John Smith',
    title: 'Senior Real Estate Agent',
    email: 'john.smith@idxsolution.com',
    phone: '(555) 123-4567',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    office: 'IDX Solution Real Estate',
  });
  const [userId] = useState('user-1'); // For demo purposes

  useEffect(() => {
    // Simulate fetching user data
    const mockProperties: Property[] = [
      {
        id: '1',
        title: 'Luxury Condo with Ocean View',
        address: 'Ocean Drive, Miami, FL',
        price: 1250000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2100,
        imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop',
        status: 'For Sale',
        createdAt: new Date().toISOString(),
        location: { lat: 25.7617, lng: -80.1918 },
        description: 'Beautiful 3-bedroom condo with stunning ocean views',
        propertyType: 'Condo',
        amenities: ['Pool', 'Gym', 'Parking', 'Security']
      },
      {
        id: '2',
        title: 'Modern Penthouse in Downtown',
        address: 'Downtown, Austin, TX',
        price: 1850000,
        bedrooms: 4,
        bathrooms: 3.5,
        sqft: 3200,
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        status: 'For Sale',
        createdAt: new Date().toISOString(),
        location: { lat: 30.2672, lng: -97.7431 },
        description: 'Exquisite penthouse with panoramic city views',
        propertyType: 'Penthouse',
        amenities: ['Rooftop Terrace', 'Smart Home', 'Concierge', 'Wine Cellar']
      },
      {
        id: '3',
        title: 'Charming Townhouse Near Park',
        address: 'Park Avenue, Brooklyn, NY',
        price: 950000,
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
        status: 'For Sale',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        location: { lat: 40.6782, lng: -73.9442 },
        description: 'Lovely townhouse with modern amenities near Central Park',
        propertyType: 'Townhouse',
        amenities: ['Backyard', 'Fireplace', 'Renovated Kitchen', 'Hardwood Floors']
      },
      {
        id: '4',
        title: 'Industrial Loft in Arts District',
        address: 'Arts District, Los Angeles, CA',
        price: 875000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1650,
        imageUrl: 'https://images.unsplash.com/photo-1565953554309-d181306db7b5?q=80&w=2127&auto=format&fit=crop',
        status: 'For Sale',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        location: { lat: 34.0522, lng: -118.2437 },
        description: 'Spacious loft with high ceilings and original features',
        propertyType: 'Loft',
        amenities: ['Exposed Brick', 'Large Windows', 'Open Floor Plan', 'Artist Studio']
      }
    ];

    // Filter properties based on favoriteIds
    const filteredSavedProperties = mockProperties.filter(property => 
      favoriteIds.includes(property.id)
    );
    
    // If no saved properties, use the first two as defaults for demo purposes
    setSavedProperties(filteredSavedProperties.length > 0 ? filteredSavedProperties : mockProperties.slice(0, 2));
    setRecentlyViewed(mockProperties.slice(1, 3));  // Default recently viewed

    // Mock recent searches
    setRecentSearches([
      { id: 1, query: 'Condos in Miami', date: '2023-10-15' },
      { id: 2, query: 'Apartments in New York', date: '2023-10-14' },
      { id: 3, query: 'Houses with pool in Los Angeles', date: '2023-10-12' },
    ]);

    // Mock notifications
    setNotifications([
      { id: 1, message: 'Price drop on Luxury Condo with Ocean View', date: '2023-10-16', read: false },
      { id: 2, message: 'New properties matching your search', date: '2023-10-15', read: false },
      { id: 3, message: 'Your saved property has been sold', date: '2023-10-13', read: true },
    ]);

    setLoading(false);
  }, [favoriteIds]);

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  // Format date to display in a nice format
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-blue-100">{formatDate()}</p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Bell className="h-5 w-5 text-blue-200" />
              <span className="text-sm font-medium">{unreadNotificationCount} new notifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Stats Cards */}
        <div className="md:col-span-8 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Your Activity Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
                <Heart className="h-5 w-5 text-rose-500" fill="#f43f5e" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{savedProperties.length}</div>
                <p className="text-xs text-gray-500 mt-1">
                  Properties you've favorited
                </p>
                <Link href="/dashboard/saved" className="text-blue-600 text-sm font-medium mt-4 inline-block hover:underline">
                  View all →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Searches</CardTitle>
                <Map className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{recentSearches.length}</div>
                <p className="text-xs text-gray-500 mt-1">
                  Search criteria you've saved
                </p>
                <Link href="/dashboard/searches" className="text-blue-600 text-sm font-medium mt-4 inline-block hover:underline">
                  View all →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <Bell className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{notifications.length}</div>
                <p className="text-xs text-gray-500 mt-1">
                  Updates and alerts for you
                </p>
                <Link href="/dashboard/notifications" className="text-blue-600 text-sm font-medium mt-4 inline-block hover:underline">
                  View all →
                </Link>
              </CardContent>
            </Card>
          </div>
          
          {/* Scheduled Viewings Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Your Property Viewings
            </h2>
            <ScheduledViewings userType="client" userId={userId} />
          </div>

          {/* Featured Properties Section */}
          <div className="space-y-4 mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Home className="h-5 w-5 mr-2 text-blue-600" />
                Featured Properties
              </h2>
            </div>
            
            {/* Custom Property Grid with better spacing */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedProperties.map((property) => (
                  <div key={property.id} className="h-full">
                    <PropertyCard
                      id={property.id}
                      title={property.title}
                      address={property.address}
                      price={property.price}
                      bedrooms={property.bedrooms}
                      bathrooms={property.bathrooms}
                      sqft={property.sqft}
                      imageUrl={property.imageUrl}
                      status={property.status}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Agent Information */}
        <div className="md:col-span-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Your Agent
          </h2>
          <div className="bg-white rounded-lg shadow-md p-1">
            <AgentInfo agent={agent} />
          </div>
          
          {/* Recent Activity Timeline */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-md font-semibold text-gray-800 flex items-center mb-4">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              Recent Updates
            </h3>
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  <div>
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 mt-3 w-full hover:bg-blue-50">
              Clear All Notifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}