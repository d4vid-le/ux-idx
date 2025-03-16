'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Bed, Bath, Square, Heart } from 'lucide-react';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils/formatting';

interface SimilarPropertiesProps {
  properties: Property[];
  currentPropertyId: string;
}

export default function SimilarProperties({
  properties,
  currentPropertyId
}: SimilarPropertiesProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Get more similar properties to make the slider worthwhile
  const similarProperties = properties
    .filter(property => property.id !== currentPropertyId)
    .slice(0, 10); // Include more properties for scrolling
  
  const toggleFavorite = (e: React.MouseEvent, propertyId: string) => {
    e.preventDefault();
    setFavorites(prev => ({
      ...prev,
      [propertyId]: !prev[propertyId]
    }));
  };
  
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  
  if (similarProperties.length === 0) return null;
  
  return (
    <div className="mt-12 mb-8 py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Similar Properties</h2>
          <div className="flex space-x-2">
            <button 
              onClick={handleScrollLeft}
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleScrollRight}
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 space-x-4 custom-scrollbar scrollbar-hide -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {similarProperties.map((property, index) => (
            <Link 
              key={property.id} 
              href={`/properties/${property.id}`}
              className="property-card bg-[#1D1D1D] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex-shrink-0 w-[280px] md:w-[330px] cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48">
                <Image
                  src={property.imageUrl}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs font-medium rounded">
                  {property.status}
                </div>
                <button 
                  onClick={(e) => toggleFavorite(e, property.id)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full text-rose-500 hover:text-rose-600"
                  aria-label={favorites[property.id] ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    className={`h-5 w-5 ${favorites[property.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>
              <div className="p-3 text-white">
                {/* Divider line - above the price */}
                <div className="h-[2px] w-full bg-white mb-3"></div>
                
                {/* Price */}
                <div className="mb-1.5">
                  <span className="text-xl font-medium">{formatPrice(property.price)}</span>
                </div>
                
                {/* Property Features */}
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
                    <span>{property.sqft} sq²</span>
                  </div>
                </div>
                
                {/* Address */}
                <div className="mb-1">
                  <h3 className="text-base font-medium text-white truncate">{property.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{property.address}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 