'use client';

import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Location</h2>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="relative h-64 w-full">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin size={32} className="mx-auto text-gray-700 mb-2" />
                <p className="font-medium">Loading Map...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Location</h2>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="relative h-[400px] w-full">
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[location.lat, location.lng]}
              icon={new Icon({
                iconUrl: '/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: '/marker-shadow.png',
                shadowSize: [41, 41],
              })}
            >
              <Popup>
                <div className="text-gray-700 font-medium">{address}</div>
              </Popup>
            </Marker>
          </MapContainer>
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