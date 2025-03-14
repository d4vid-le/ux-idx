'use client';

import { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import PropertyGrid from '@/components/PropertyGrid';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';

export default function SavedPropertiesPage() {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching saved properties
  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
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
          {
            id: '3',
            title: 'Brownstone in Brooklyn Heights',
            address: '789 Heights Street, Brooklyn, NY',
            price: 4250000,
            bedrooms: 4,
            bathrooms: 3,
            sqft: 3200,
            propertyType: 'House',
            status: 'For Sale',
            imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
            createdAt: new Date().toISOString(),
          },
        ];
        
        setSavedProperties(mockSavedProperties);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved properties:', error);
        setLoading(false);
      }
    };
    
    fetchSavedProperties();
  }, []);

  // Simulate removing a property from saved list
  const handleRemoveProperty = (propertyId: string) => {
    setSavedProperties(prevProperties => 
      prevProperties.filter(property => property.id !== propertyId)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Saved Properties</h1>
        <div className="flex items-center">
          <Heart className="h-5 w-5 text-rose-500 mr-2" />
          <span className="text-lg font-medium">{savedProperties.length} Properties</span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading your saved properties...</div>
        </div>
      ) : savedProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-10 text-center">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No saved properties yet</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Start saving properties you're interested in by clicking the heart icon on property listings.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Browse Properties
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" className="text-sm">
                Sort by: <span className="font-medium ml-1">Date Saved</span>
              </Button>
              <Button variant="outline" className="text-sm">
                Filter
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="text-rose-600 border-rose-200 hover:bg-rose-50"
              onClick={() => {
                if (confirm('Are you sure you want to remove all saved properties?')) {
                  setSavedProperties([]);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>

          <PropertyGrid properties={savedProperties} />
        </div>
      )}
    </div>
  );
} 