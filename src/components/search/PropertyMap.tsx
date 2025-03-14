'use client';

import { useEffect, useRef, useState } from 'react';
import { Property } from '@/types/property';
import { ChevronUp, ChevronDown, X, Search, MapPin, Bed, Bath, Square } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedProperty,
  onPropertySelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [infoWindowOpen, setInfoWindowOpen] = useState<string | null>(null);

  // Format price for display on markers
  const formatPriceForMarker = (price: number): string => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  // Format price with commas
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Show info window for a property
  const showInfoWindow = (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation();
    setInfoWindowOpen(propertyId === infoWindowOpen ? null : propertyId);
  };

  // Close info window
  const closeInfoWindow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInfoWindowOpen(null);
  };

  // Navigate to property details page
  const navigateToProperty = (propertyId: string) => {
    window.location.href = `/properties/${propertyId}`;
  };

  return (
    <div className="relative h-full w-full">
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full bg-gray-100"
        style={{ minHeight: '100%' }}
      >
        {!mapLoaded ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading map...</p>
            </div>
          </div>
        ) : (
          // Map placeholder with markers
          <div className="relative h-full w-full bg-blue-50 flex flex-col">
            {/* Mock Map background - in a real implementation, this would be a Google Map */}
            <div className="absolute inset-0 bg-cover bg-center opacity-60" 
                style={{ backgroundImage: 'url("https://maps.googleapis.com/maps/api/staticmap?center=40.73,-73.99&zoom=14&size=1200x1200&key=DEMO_KEY")' }}>
            </div>
            
            {/* Property Markers */}
            <div className="absolute inset-0">
              {properties.map((property) => (
                <div key={property.id} className="absolute" style={{ 
                  top: `${Math.random() * 80 + 10}%`, 
                  left: `${Math.random() * 80 + 10}%` 
                }}>
                  {/* Price Marker */}
                  <div 
                    className={`
                      shadow-md rounded-full px-3 py-1 text-sm font-medium cursor-pointer
                      ${selectedProperty?.id === property.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-900 hover:bg-blue-100'
                      }
                    `}
                    onClick={(e) => {
                      onPropertySelect(property);
                      showInfoWindow(e, property.id);
                    }}
                    onDoubleClick={() => navigateToProperty(property.id)}
                  >
                    {formatPriceForMarker(property.price)}
                  </div>
                  
                  {/* Property Info Window - Flex Row Layout */}
                  {infoWindowOpen === property.id && (
                    <div className="absolute z-20 w-80 bg-white rounded-lg shadow-lg mt-2 -translate-x-1/2 left-1/2 overflow-hidden">
                      <div className="relative">
                        {/* Close button */}
                        <button 
                          className="absolute top-2 right-2 h-6 w-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center z-10 text-gray-600 hover:text-gray-900"
                          onClick={closeInfoWindow}
                        >
                          <X size={14} />
                        </button>
                        
                        <div className="flex flex-row h-28">
                          {/* Left: Property image - Now a clickable link with enhanced styling */}
                          <Link 
                            href={`/properties/${property.id}`}
                            className="relative h-full w-28 flex-shrink-0 overflow-hidden cursor-pointer transition-transform hover:brightness-90"
                            title="Click to view property details"
                          >
                            <div className="absolute inset-0 bg-blue-600 bg-opacity-0 hover:bg-opacity-10 transition-all z-10"></div>
                            <Image 
                              src={property.imageUrl} 
                              alt={property.title} 
                              fill 
                              className="object-cover" 
                            />
                            {/* Status Badge */}
                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded text-[10px] z-20">
                              {property.status}
                            </div>
                          </Link>
                          
                          {/* Right: Property details - NOT a link */}
                          <div className="p-3 flex-1 min-w-0 flex flex-col">
                            {/* Price */}
                            <p className="text-blue-600 font-bold text-sm">
                              {formatPrice(property.price)}
                            </p>
                            
                            {/* Location with neighborhood */}
                            <div className="text-gray-600 text-xs mt-1">
                              <div className="truncate">{property.address}</div>
                              <div className="text-gray-500 text-[10px] mt-0.5">Upper East Side</div>
                            </div>
                            
                            {/* Property Details */}
                            <div className="flex items-center space-x-2 text-gray-500 text-xs mt-auto pt-1">
                              <div className="flex items-center">
                                <Bed size={12} className="mr-1" />
                                <span>{property.bedrooms}</span>
                              </div>
                              <span className="text-gray-300 text-xs">|</span>
                              <div className="flex items-center">
                                <Bath size={12} className="mr-1" />
                                <span>{property.bathrooms}</span>
                              </div>
                              <span className="text-gray-300 text-xs">|</span>
                              <div className="flex items-center">
                                <Square size={12} className="mr-1" />
                                <span>{property.sqft.toLocaleString()} sqft</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <ChevronUp size={20} className="text-gray-700" />
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <ChevronDown size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Drawing Tools */}
      <div className="absolute top-4 left-4">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 flex items-center justify-center">
          <Search size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default PropertyMap; 