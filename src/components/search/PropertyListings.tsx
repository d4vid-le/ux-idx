'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import { Loader2, MapPin, BedDouble, Bath, Square, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyListingsProps {
  properties: Property[];
  loading: boolean;
  onPropertySelect: (property: Property) => void;
  selectedProperty: Property | null;
  showMap?: boolean;
}

const PropertyListings: React.FC<PropertyListingsProps> = ({
  properties,
  loading,
  onPropertySelect,
  selectedProperty,
  showMap = true
}) => {
  // Track favorite properties
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [propertyId]: !prev[propertyId]
    }));
  };

  // Format price with commas
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="p-4 md:p-6 lg:p-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search filters to see more results.
          </p>
        </div>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ${
          showMap 
            ? "lg:grid-cols-1 xl:grid-cols-1"
            : "lg:grid-cols-3 xl:grid-cols-3"
        } gap-6`}>
          {properties.map((property) => (
            <div 
              key={property.id}
              className={`
                bg-white rounded-lg overflow-hidden 
                shadow-lg transition-transform duration-300 
                hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full
                ${selectedProperty?.id === property.id ? 'ring-2 ring-blue-500' : ''}
                border border-gray-100
              `}
              onClick={() => onPropertySelect(property)}
            >
              {/* Property Card */}
              <div className="flex flex-col h-full">
                {/* Property Image */}
                <div className="relative h-64 w-full">
                  <Image 
                    src={property.imageUrl} 
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => toggleFavorite(e, property.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors z-10"
                    aria-label={favorites[property.id] ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites[property.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                  </button>
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {property.status}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Price */}
                  <p className="text-blue-600 font-bold text-xl mb-1">
                    {formatPrice(property.price)}
                  </p>
                  
                  {/* Location with neighborhood */}
                  <div className="text-gray-600 text-sm mb-4">
                    <div className="font-medium">{property.address}</div>
                    <div className="text-gray-500 text-xs mt-1">Upper East Side</div>
                  </div>
                  
                  {/* Property Details */}
                  <div className="flex items-center space-x-3 text-gray-500 border-t pt-4 mt-auto text-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{property.bathrooms} baths</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                  
                  {/* View Property Button */}
                  <div className="mt-4 flex justify-end">
                    <Link 
                      href={`/properties/${property.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Property →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListings; 