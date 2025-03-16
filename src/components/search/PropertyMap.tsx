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
  centerCoordinates?: { lat: number; lng: number };
  searchRadius?: number;
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedProperty,
  onPropertySelect,
  centerCoordinates,
  searchRadius
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [infoWindowOpen, setInfoWindowOpen] = useState<string | null>(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState<{ x: number; y: number } | null>(null);

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
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    setInfoWindowPosition({ x: rect.left, y: rect.top });
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
                        ? 'bg-black text-white' 
                        : 'bg-black/70 text-white hover:bg-black/80'
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
                    <div className="fixed inset-0 z-50 pointer-events-none" onClick={(e) => closeInfoWindow(e)}>
                      <Link 
                        href={`/properties/${property.id}`}
                        className="absolute z-20 w-80 bg-[#1D1D1D] rounded-lg shadow-lg pointer-events-auto overflow-hidden"
                        style={{
                          top: `${infoWindowPosition?.y || 0}px`,
                          left: `${infoWindowPosition?.x || 0}px`,
                          transform: 'translate(-50%, 10px)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative">
                          {/* Close button */}
                          <button 
                            className="absolute top-2 right-2 h-6 w-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center z-10 text-gray-600 hover:text-gray-900"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              closeInfoWindow(e);
                            }}
                          >
                            <X size={14} />
                          </button>
                          
                          <div className="flex flex-row h-28">
                            {/* Left: Property image */}
                            <div className="relative h-full w-28 flex-shrink-0 overflow-hidden rounded-l-lg">
                              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all z-10"></div>
                              <Image 
                                src={property.imageUrl} 
                                alt={property.title} 
                                fill 
                                className="object-cover" 
                              />
                              {/* Status Badge */}
                              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded text-[10px] z-20">
                                {property.status}
                              </div>
                            </div>
                            
                            {/* Right: Property details */}
                            <div className="p-3 flex-1 min-w-0 flex flex-col">
                              {/* Price */}
                              <p className="text-white font-medium text-sm">
                                {formatPrice(property.price)}
                              </p>
                              
                              {/* Location with neighborhood */}
                              <div className="text-white text-xs mt-1">
                                <div className="truncate">{property.address}</div>
                                <div className="text-gray-400 text-[10px] mt-0.5">Upper East Side</div>
                              </div>
                              
                              {/* Property Details */}
                              <div className="flex items-center space-x-2 text-white text-xs mt-auto pt-1">
                                <div className="flex items-center">
                                  <span>{property.bedrooms} bd</span>
                                </div>
                                <span className="text-gray-500 text-xs">|</span>
                                <div className="flex items-center">
                                  <span>{property.bathrooms} ba</span>
                                </div>
                                <span className="text-gray-500 text-xs">|</span>
                                <div className="flex items-center">
                                  <span>{property.sqft.toLocaleString()} sq²</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
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