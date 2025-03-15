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
              className="property-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md border border-gray-200 animate-fade-in flex-shrink-0 w-[280px] md:w-[330px]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 image-hover-zoom">
                <Image
                  src={property.imageUrl}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
                  {property.status}
                </div>
                <button 
                  onClick={(e) => toggleFavorite(e, property.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors z-10"
                  aria-label={favorites[property.id] ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    className={`h-4 w-4 ${favorites[property.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
                  <div className="font-bold">{formatPrice(property.price)}</div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 truncate">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-2 truncate">{property.address}</p>
                <div className="flex items-center text-sm text-gray-700 space-x-4">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1 text-gray-500" />
                    {property.bedrooms} bd
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1 text-gray-500" />
                    {property.bathrooms} ba
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1 text-gray-500" />
                    {property.sqft} sqft
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 