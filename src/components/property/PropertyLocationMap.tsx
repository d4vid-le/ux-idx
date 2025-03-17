'use client';

import { MapPin } from 'lucide-react';
import Image from 'next/image';

interface PropertyLocationMapProps {
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  neighborhood?: string;
}

export default function PropertyLocationMap({
  address,
  location,
  neighborhood
}: PropertyLocationMapProps) {
  // In a real application, we would use a proper map library like Google Maps or Mapbox
  // For now, we'll use a static map image as a placeholder
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${location.lat},${location.lng}&key=YOUR_API_KEY`;
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Location</h2>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="relative h-64 w-full">
          {/* In a real app, replace this with an actual map component */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center p-4">
              <MapPin size={32} className="mx-auto text-gray-700 mb-2" />
              <p className="font-medium">Map View</p>
              <p className="text-sm text-gray-600 mt-1">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="text-center mb-8">
            <MapPin size={32} className="mx-auto text-gray-700 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <div className="flex items-center justify-center text-gray-600">
              <MapPin size={20} className="text-gray-700 mt-1 mr-2 flex-shrink-0" />
              <p>{address}</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <p className="text-gray-600">
              This property is located in {neighborhood || 'New York City'}, known for its excellent schools, 
              convenient transportation options, and vibrant community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 