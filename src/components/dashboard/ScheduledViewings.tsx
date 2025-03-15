'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Home, MapPin, UserCheck, X, Check, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Viewing {
  id: string;
  propertyId: string;
  agentId: string;
  userId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  property?: {
    address: string;
    imageUrl: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
  };
  agent?: {
    name: string;
    email: string;
    phone: string;
    image: string;
  };
}

interface ScheduledViewingsProps {
  userType: 'client' | 'agent';
  userId?: string;
  agentId?: string;
}

export default function ScheduledViewings({ userType, userId, agentId }: ScheduledViewingsProps) {
  const [viewings, setViewings] = useState<Viewing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [expandedViewingId, setExpandedViewingId] = useState<string | null>(null);

  // Fetch scheduled viewings from localStorage (simulating API call)
  useEffect(() => {
    const fetchViewings = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, this would be an API call
        let storedViewings: Viewing[] = [];
        
        if (userType === 'client') {
          // Get user's viewings
          storedViewings = JSON.parse(localStorage.getItem('propertyViewings') || '[]');
          
          // Filter by userId if provided
          if (userId) {
            storedViewings = storedViewings.filter(v => v.userId === userId);
          }
        } else {
          // Get agent's viewings
          const agentViewings = JSON.parse(localStorage.getItem('agentViewings') || '{}');
          
          // Get viewings for specific agent or all if agentId not provided
          if (agentId && agentViewings[agentId]) {
            storedViewings = agentViewings[agentId];
          } else {
            // Combine all agent viewings
            Object.values(agentViewings).forEach((viewings: any) => {
              storedViewings = [...storedViewings, ...viewings];
            });
          }
        }
        
        // Attach mock property and agent data for display purposes
        const enhancedViewings = storedViewings.map(viewing => {
          // Mock property data
          const property = {
            address: "123 Main St, New York, NY 10001",
            imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            price: 1250000,
            bedrooms: 3,
            bathrooms: 2,
          };
          
          // Mock agent data
          const agent = {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "(212) 555-1234",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
          };
          
          return {
            ...viewing,
            property,
            agent,
          };
        });
        
        setViewings(enhancedViewings);
      } catch (error) {
        console.error('Error fetching viewings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchViewings();
  }, [userType, userId, agentId]);

  // Filter viewings based on selected tab
  const filteredViewings = viewings.filter(viewing => {
    const viewingDate = new Date(viewing.date + 'T' + viewing.timeSlot);
    const now = new Date();
    
    if (selectedTab === 'upcoming') {
      return viewingDate > now;
    } else if (selectedTab === 'past') {
      return viewingDate <= now;
    }
    return true; // 'all' tab
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (timeString: string) => {
    const [hour] = timeString.split(':');
    const hourNum = parseInt(hour, 10);
    return `${hourNum > 12 ? hourNum - 12 : hourNum}:00 ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };
  
  // Toggle viewing details
  const toggleViewingDetails = (viewingId: string) => {
    if (expandedViewingId === viewingId) {
      setExpandedViewingId(null);
    } else {
      setExpandedViewingId(viewingId);
    }
  };
  
  // Update viewing status (for agents)
  const updateViewingStatus = (viewingId: string, newStatus: 'confirmed' | 'cancelled') => {
    // In a real app, this would be an API call
    const updatedViewings = viewings.map(viewing => 
      viewing.id === viewingId ? { ...viewing, status: newStatus } : viewing
    );
    
    setViewings(updatedViewings);
    
    // Update localStorage to simulate persistence
    if (userType === 'agent' && agentId) {
      const agentViewings = JSON.parse(localStorage.getItem('agentViewings') || '{}');
      
      if (agentViewings[agentId]) {
        agentViewings[agentId] = agentViewings[agentId].map((viewing: Viewing) => 
          viewing.id === viewingId ? { ...viewing, status: newStatus } : viewing
        );
        
        localStorage.setItem('agentViewings', JSON.stringify(agentViewings));
      }
    }
    
    // Also update in user's viewings
    const userViewings = JSON.parse(localStorage.getItem('propertyViewings') || '[]');
    const updatedUserViewings = userViewings.map((viewing: Viewing) => 
      viewing.id === viewingId ? { ...viewing, status: newStatus } : viewing
    );
    
    localStorage.setItem('propertyViewings', JSON.stringify(updatedUserViewings));
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {userType === 'client' ? 'My Scheduled Viewings' : 'Property Viewing Requests'}
        </h2>
        
        {/* Status filter tabs */}
        <div className="flex bg-gray-100 p-1 rounded-md">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedTab === 'upcoming' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedTab === 'past' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past
          </button>
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedTab === 'all' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All
          </button>
        </div>
      </div>
      
      {filteredViewings.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No viewings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedTab === 'upcoming' 
              ? 'You have no upcoming property viewings scheduled.'
              : selectedTab === 'past'
                ? 'You have no past property viewings.'
                : 'You have no property viewings.'
            }
          </p>
          {userType === 'client' && (
            <div className="mt-6">
              <Link
                href="/search"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Properties
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredViewings.map((viewing) => (
            <div
              key={viewing.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Viewing summary */}
              <div 
                className="flex flex-col sm:flex-row sm:items-center p-4 cursor-pointer"
                onClick={() => toggleViewingDetails(viewing.id)}
              >
                {/* Property image */}
                <div className="flex-shrink-0 sm:mr-4 mb-4 sm:mb-0">
                  <div className="relative w-full sm:w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                    {viewing.property?.imageUrl && (
                      <Image
                        src={viewing.property.imageUrl}
                        alt="Property"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                
                {/* Viewing info */}
                <div className="flex-grow min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {viewing.property?.address || 'Property Address'}
                    </h3>
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${viewing.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        viewing.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        viewing.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                        'bg-yellow-100 text-yellow-800'}
                    `}>
                      {viewing.status.charAt(0).toUpperCase() + viewing.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                      <span>{formatDate(viewing.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-gray-400" />
                      <span>{formatTime(viewing.timeSlot)}</span>
                    </div>
                    {userType === 'client' && viewing.agent && (
                      <div className="flex items-center">
                        <UserCheck className="mr-1 h-4 w-4 text-gray-400" />
                        <span>{viewing.agent.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-4 text-gray-400">
                  <ChevronRight 
                    className={`h-5 w-5 transition-transform ${expandedViewingId === viewing.id ? 'rotate-90' : ''}`} 
                  />
                </div>
              </div>
              
              {/* Expanded details */}
              {expandedViewingId === viewing.id && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:gap-8">
                    {/* Property details */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Home className="mr-1 h-4 w-4 text-gray-400" />
                          <span>{viewing.property?.bedrooms || 0} Bed, {viewing.property?.bathrooms || 0} Bath</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                          <span>
                            {viewing.property?.address?.split(',')[0] || 'Address not available'}
                          </span>
                        </div>
                        <div className="col-span-2 mt-2">
                          <Link
                            href={`/properties/${viewing.propertyId}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline text-sm inline-flex items-center"
                          >
                            View Property
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    {/* Agent or Client details */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {userType === 'client' ? 'Agent' : 'Client'} Details
                      </h4>
                      {userType === 'client' && viewing.agent ? (
                        <div className="flex items-center">
                          <div className="relative w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                            {viewing.agent.image && (
                              <Image
                                src={viewing.agent.image}
                                alt={viewing.agent.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{viewing.agent.name}</div>
                            <div className="text-xs text-gray-500">{viewing.agent.email}</div>
                            <div className="text-xs text-gray-500">{viewing.agent.phone}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Client information will be available here
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action buttons for agents */}
                  {userType === 'agent' && viewing.status === 'pending' && (
                    <div className="mt-4 flex justify-end space-x-3 border-t border-gray-200 pt-4">
                      <button 
                        onClick={() => updateViewingStatus(viewing.id, 'cancelled')}
                        className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <X className="mr-1.5 h-4 w-4" />
                        Decline
                      </button>
                      <button 
                        onClick={() => updateViewingStatus(viewing.id, 'confirmed')}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <Check className="mr-1.5 h-4 w-4" />
                        Confirm
                      </button>
                    </div>
                  )}
                  
                  {/* Status message for clients */}
                  {userType === 'client' && (
                    <div className={`
                      mt-4 p-3 rounded-md text-sm
                      ${viewing.status === 'confirmed' ? 'bg-green-50 text-green-800' : 
                        viewing.status === 'cancelled' ? 'bg-red-50 text-red-800' : 
                        viewing.status === 'completed' ? 'bg-gray-50 text-gray-800' : 
                        'bg-yellow-50 text-yellow-800'}
                    `}>
                      {viewing.status === 'confirmed' ? (
                        <>
                          <span className="font-medium">Confirmed:</span> Your viewing has been approved by the agent. Please arrive on time.
                        </>
                      ) : viewing.status === 'cancelled' ? (
                        <>
                          <span className="font-medium">Cancelled:</span> This viewing was cancelled. Contact the agent for details.
                        </>
                      ) : viewing.status === 'completed' ? (
                        <>
                          <span className="font-medium">Completed:</span> This viewing has been completed. We hope it went well!
                        </>
                      ) : (
                        <>
                          <span className="font-medium">Pending:</span> Waiting for the agent to confirm your viewing request.
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
