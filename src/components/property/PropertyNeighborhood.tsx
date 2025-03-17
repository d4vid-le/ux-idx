'use client';

import { MapPin, Train, School, ShoppingBag, Coffee } from 'lucide-react';

interface PropertyNeighborhoodProps {
  neighborhood?: string;
  address: string;
}

export default function PropertyNeighborhood({
  neighborhood,
  address
}: PropertyNeighborhoodProps) {
  // In a real application, we would fetch neighborhood data from an API
  // For now, we'll use static data
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Neighborhood</h2>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start mb-4">
            <MapPin size={20} className="text-gray-700 mt-1 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-gray-600">{neighborhood}</p>
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-700 mb-6">
            <p>
              {neighborhood || 'This area'} is one of New York City's most desirable neighborhoods, 
              known for its tree-lined streets, historic architecture, and vibrant community. 
              Residents enjoy easy access to public transportation, excellent schools, and a wide 
              variety of dining and shopping options.
            </p>
          </div>
          
          <h3 className="font-semibold text-lg mb-3">Neighborhood Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <Train size={18} className="text-gray-700 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Public Transit</h3>
                <p className="text-gray-600">
                  Multiple subway lines within 0.3 miles. Easy access to major highways.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <School size={18} className="text-gray-700 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Schools</h3>
                <p className="text-gray-600">
                  Top-rated public and private schools in the district.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <ShoppingBag size={18} className="text-gray-700 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Shopping</h3>
                <p className="text-gray-600">
                  Boutique shops, grocery stores, and major retailers nearby.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Coffee size={18} className="text-gray-700 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Dining</h3>
                <p className="text-gray-600">
                  Diverse restaurants, cafes, bars, and cultural venues.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>
              Walk Score: 95/100 (Walker's Paradise)<br />
              Transit Score: 98/100 (World-class Public Transportation)<br />
              Bike Score: 86/100 (Very Bikeable)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 