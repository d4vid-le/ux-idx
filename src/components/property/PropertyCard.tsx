import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils/formatting';
import { Heart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useFavorites } from '@/hooks/useFavorites';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { id, title, address, price, photos, bedrooms, bathrooms, squareFeet, propertyType, status } = property;
  
  // Default image if photos array is empty or undefined
  const defaultImage = '/images/property-placeholder.jpg';
  const imageUrl = photos && photos.length > 0 ? photos[0] : defaultImage;
  
  // Format square feet with fallback
  const formattedSquareFeet = squareFeet ? squareFeet.toLocaleString() : 'N/A';
  
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

  // Extract street address and unit number
  const addressParts = address?.split(',') || [];
  const streetAddress = addressParts[0] || '';
  
  // Extract neighborhood if available (usually the last part)
  const neighborhood = addressParts.length > 1 ? addressParts[addressParts.length - 1].trim() : '';

  return (
    <div className="bg-[#1D1D1D] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col w-full">
      {/* Property Image */}
      <div className="relative w-full" style={{ paddingBottom: "75%" }}> {/* 4:3 aspect ratio */}
        <Link href={`/properties/${id}`}>
          <div className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={`Photo of ${title}`}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        
        {/* Favorite Button */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full text-rose-500 hover:text-rose-600"
          aria-label="Add to favorites"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite(id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
      </div>
      
      {/* Property Details */}
      <div className="p-3 flex-grow flex flex-col text-white">
        {/* Divider line - now above the price */}
        <div className="h-[2px] w-full bg-white mb-3"></div>
        
        {/* Price - underneath the divider line */}
        <div className="mb-1.5">
          <span className="text-xl font-medium">{formattedPrice}</span>
        </div>
        
        {/* Key Property Features */}
        <div className="flex items-center space-x-2 mb-2 text-white text-xs">
          <div className="flex items-center">
            <span>{bedrooms} bd</span>
          </div>
          <div className="text-gray-500">|</div>
          <div className="flex items-center">
            <span>{bathrooms} ba</span>
          </div>
          <div className="text-gray-500">|</div>
          <div className="flex items-center">
            <span>{formattedSquareFeet} sq²</span>
          </div>
        </div>
        
        {/* Address */}
        <div className="mb-1">
          <h3 className="text-base font-medium text-white">{streetAddress}</h3>
          <p className="text-sm text-gray-400">{neighborhood}</p>
        </div>
        
        {/* Property Type and Status - Subtle badges */}
        <div className="mt-2 mb-1 flex space-x-2">
          {propertyType && (
            <span className="text-xs text-gray-300 bg-gray-800 px-2 py-0.5 rounded">
              {propertyType}
            </span>
          )}
          {status && (
            <span className="text-xs text-blue-300 bg-blue-900/60 px-2 py-0.5 rounded">
              {status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;