import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  sqft,
  imageUrl,
  status
}) => {
  // Use our custom favorites hook
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Toggle favorite status on heart click
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation from Link component
    toggleFavorite(id);
  };

  // Format price with commas
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

  // Status color mapping
  const statusColorMap = {
    'For Sale': 'bg-green-100 text-green-800',
    'For Rent': 'bg-blue-100 text-blue-800',
    'Sold': 'bg-red-100 text-red-800',
    'Pending': 'bg-orange-100 text-orange-800'
  };
  
  const statusColor = statusColorMap[status] || 'bg-gray-100 text-gray-800';

  return (
    <Link href={`/properties/${id}`}>
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col">
        {/* Property Image */}
        <div className="relative h-48 w-full">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge className={statusColor}>{status}</Badge>
          </div>
          
          {/* Favorite Button */}
          <button 
            className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            onClick={handleFavoriteClick}
            aria-label={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite(id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>

        {/* Property Info */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Address with neighborhood */}
          <div className="text-gray-600 text-sm mb-2">
            <div>{address}</div>
            <div className="text-gray-500 text-xs mt-0.5">Upper East Side</div>
          </div>
          <p className="text-xl font-bold text-gray-900 mb-3">{formattedPrice}</p>
          
          {/* Property Details */}
          <div className="flex items-center space-x-2 text-gray-700 text-xs mt-auto">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{bedrooms}</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{bathrooms}</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <span>{sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard; 