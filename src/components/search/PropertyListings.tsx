'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import { Loader2, MapPin, BedDouble, Bath, Square, Heart, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyListingsProps {
  properties: Property[];
  loading: boolean;
  onPropertySelect: (property: Property) => void;
  selectedProperty: Property | null;
  showMap?: boolean;
  showDistance?: boolean;
}

const PropertyListings: React.FC<PropertyListingsProps> = ({
  properties,
  loading,
  onPropertySelect,
  selectedProperty,
  showMap = true,
  showDistance = false
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
          <Loader2 className="h-8 w-8 animate-spin text-gray-700" />
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
            <Link 
              key={property.id}
              href={`/properties/${property.id}`}
              className={`
                bg-[#1D1D1D] rounded-lg overflow-hidden 
                shadow-lg transition-transform duration-300 
                hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full
                ${selectedProperty?.id === property.id ? 'ring-2 ring-blue-500' : ''}
              `}
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
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full text-rose-500 hover:text-rose-600"
                    aria-label={favorites[property.id] ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites[property.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                  </button>
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded hover:bg-black/80">
                      {property.status}
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4 flex-1 flex flex-col text-white">
                  {/* Divider line - above the price */}
                  <div className="h-[2px] w-full bg-white mb-3"></div>
                  
                  {/* Price */}
                  <div className="mb-1.5">
                    <span className="text-xl font-medium">{formatPrice(property.price)}</span>
                  </div>
                  
                  {/* Key Property Features */}
                  <div className="flex items-center space-x-2 mb-2 text-white text-xs">
                    <div className="flex items-center">
                      <span>{property.bedrooms} bd</span>
                    </div>
                    <div className="text-gray-500">|</div>
                    <div className="flex items-center">
                      <span>{property.bathrooms} ba</span>
                    </div>
                    <div className="text-gray-500">|</div>
                    <div className="flex items-center">
                      <span>{property.sqft.toLocaleString()} sq²</span>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="mb-1">
                    <h3 className="text-base font-medium text-white">{property.address}</h3>
                    <p className="text-sm text-gray-400 line-clamp-1">{property.neighborhood || 'Upper East Side'}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListings; 