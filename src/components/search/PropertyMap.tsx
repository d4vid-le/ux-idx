'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { X, Bed, Bath, Square, Home, Calendar, DollarSign } from 'lucide-react';
import { Property } from '@/types/property';
import type { LatLngTuple } from 'leaflet';
import { Icon } from 'leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property;
  onPropertySelect: (property: Property) => void;
  centerCoordinates?: { lat: number; lng: number };
  searchRadius?: number;
  isLoading?: boolean;
  error?: string;
}

// Dynamically import the map components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Component to handle map view updates
const ChangeView = dynamic(
  () => {
    return import('react-leaflet').then((mod) => {
      const Component = ({ center }: { center: LatLngTuple }) => {
        const map = mod.useMap();
        useEffect(() => {
          map.setView(center);
        }, [center, map]);
        return null;
      };
      return Component;
    });
  },
  { ssr: false }
);

const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedProperty,
  onPropertySelect,
  centerCoordinates,
  searchRadius,
  isLoading,
  error
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [infoWindowOpen, setInfoWindowOpen] = useState<string | null>(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeInfoWindow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInfoWindowOpen(null);
    setInfoWindowPosition(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMonthlyCosts = (property: Property) => {
    const costs = [];
    if (property.commonCharges) {
      costs.push(`Common Charges: ${formatPrice(property.commonCharges)}`);
    }
    if (property.realEstateTax) {
      costs.push(`Tax: ${formatPrice(property.realEstateTax)}`);
    }
    return costs.join(' | ');
  };

  const defaultCenter: LatLngTuple = [40.7128, -74.0060];
  const center: LatLngTuple = centerCoordinates ? [centerCoordinates.lat, centerCoordinates.lng] : defaultCenter;

  // Get the selected property for the info window
  const selectedPropertyData = properties.find(p => p.id === infoWindowOpen);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Map Container */}
      <div className="w-full h-full bg-gray-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <MapContainer
              center={center}
              zoom={14}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <ChangeView center={center} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={[property.location.lat, property.location.lng] as LatLngTuple}
                  icon={new Icon({
                    iconUrl: selectedProperty?.id === property.id ? '/marker-icon-selected.png' : '/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowUrl: '/marker-shadow.png',
                    shadowSize: [41, 41],
                  })}
                  eventHandlers={{
                    click: () => onPropertySelect(property),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <div className="text-gray-700 font-medium">{property.address}</div>
                      <div className="text-sm text-gray-600">{formatPrice(property.price)}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>{property.bedrooms} bd</span>
                        <span>•</span>
                        <span>{property.bathrooms} ba</span>
                        <span>•</span>
                        <span>{property.sqft.toLocaleString()} sq²</span>
                      </div>
                      {property.propertyType && (
                        <div className="text-xs text-gray-500 mt-1">
                          {property.propertyType}
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>

      {/* Property Info Window */}
      {infoWindowOpen && selectedPropertyData && (
        <div className="fixed inset-0 z-50 pointer-events-none" onClick={(e) => closeInfoWindow(e)}>
          <Link 
            href={`/properties/${infoWindowOpen}`}
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
              
              <div className="flex">
                {/* Left: Property image */}
                <Link 
                  href={`/properties/${infoWindowOpen}`}
                  className="relative h-32 w-28 flex-shrink-0 overflow-hidden rounded-l-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all z-10"></div>
                  <Image 
                    src={selectedPropertyData.imageUrl} 
                    alt="Property" 
                    fill 
                    className="object-cover" 
                  />
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded text-[10px] z-20">
                    {selectedPropertyData.status}
                  </div>
                </Link>
                
                {/* Right: Property details */}
                <div className="flex-1 p-3 flex flex-col">
                  {/* Price */}
                  <Link 
                    href={`/properties/${infoWindowOpen}`}
                    className="text-white font-medium text-sm hover:text-gray-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {formatPrice(selectedPropertyData.price)}
                  </Link>
                  
                  {/* Location with neighborhood */}
                  <div className="text-white text-xs mt-1">
                    <Link 
                      href={`/properties/${infoWindowOpen}`}
                      className="truncate hover:text-gray-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {selectedPropertyData.address}
                    </Link>
                    <div className="text-gray-400 text-[10px] mt-0.5">
                      {selectedPropertyData.neighborhood || 'New York City'}
                    </div>
                  </div>
                  
                  {/* Property Details */}
                  <div className="flex items-center space-x-2 text-white text-xs mt-1">
                    <div className="flex items-center">
                      <Bed size={12} className="mr-1" />
                      <span>{selectedPropertyData.bedrooms} bd</span>
                    </div>
                    <span className="text-gray-500 text-xs">|</span>
                    <div className="flex items-center">
                      <Bath size={12} className="mr-1" />
                      <span>{selectedPropertyData.bathrooms} ba</span>
                    </div>
                    <span className="text-gray-500 text-xs">|</span>
                    <div className="flex items-center">
                      <Square size={12} className="mr-1" />
                      <span>{selectedPropertyData.sqft.toLocaleString()} sq²</span>
                    </div>
                  </div>

                  {/* Additional REBNY Details */}
                  <div className="mt-2 text-xs text-gray-400">
                    {selectedPropertyData.propertyType && (
                      <div className="flex items-center">
                        <Home size={12} className="mr-1" />
                        <span>{selectedPropertyData.propertyType}</span>
                      </div>
                    )}
                    {selectedPropertyData.yearBuilt && (
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        <span>Built in {selectedPropertyData.yearBuilt}</span>
                      </div>
                    )}
                    {formatMonthlyCosts(selectedPropertyData).length > 0 && (
                      <div className="flex items-center">
                        <DollarSign size={12} className="mr-1" />
                        <span>{formatMonthlyCosts(selectedPropertyData)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PropertyMap; 