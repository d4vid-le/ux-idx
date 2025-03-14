import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { id, title, address, price, photos, bedrooms, bathrooms, squareFeet, propertyType, status } = property;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col w-full">
      {/* Property Image - Fixed aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}> {/* 16:9 aspect ratio */}
        <Link href={`/properties/${id}`}>
          <div className="absolute inset-0">
            <Image
              src={photos[0]}
              alt={`Photo of ${title}`}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {propertyType}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {status}
          </span>
        </div>
        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full text-rose-500 hover:text-rose-600"
          aria-label="Add to favorites"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Property Details */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-blue-600">
              <Link href={`/properties/${id}`}>
                {title}
              </Link>
            </h3>
          </div>
          <p className="text-gray-600 text-sm line-clamp-1">{address}</p>
        </div>
        
        <div className="mb-3">
          <span className="text-xl font-bold text-gray-900">{formatPrice(price)}</span>
        </div>
        
        {/* Property Features */}
        <div className="flex justify-between text-sm text-gray-600 mt-auto">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{bedrooms} bd</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>{bathrooms} ba</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <span>{squareFeet.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
      
      {/* View Details Link */}
      <div className="px-4 pb-4">
        <Link 
          href={`/properties/${id}`}
          className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard; 