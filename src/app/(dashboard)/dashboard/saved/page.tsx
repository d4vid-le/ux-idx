'use client';

import { useState, useEffect } from 'react';
import { Trash2, Heart } from 'lucide-react';
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
        const mockSavedProperties: Property[] = [
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
            location: {
              lat: 40.7128,
              lng: -74.0060
            }
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
            location: {
              lat: 40.7580,
              lng: -73.9855
            }
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
            location: {
              lat: 40.6935,
              lng: -73.9917
            }
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
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading your saved properties...</div>
        </div>
      ) : savedProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-10 text-center">
          <div className="text-center py-10">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No saved properties</h3>
          </div>
          <p className="text-gray-500 mb-6 max-w-md">
            Start saving properties you're interested in by clicking the heart icon on property listings.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <PropertyGrid properties={savedProperties} />
        </div>
      )}
    </div>
  );
} 