'use client';

import { formatPrice } from '@/lib/utils';
import { Bed, Bath, Square, Home, Calendar, DollarSign } from 'lucide-react';

interface PropertyKeyFactsProps {
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType?: string;
  yearBuilt?: number;
  commonCharges?: number;
  realEstateTax?: number;
}

export default function PropertyKeyFacts({
  price,
  bedrooms,
  bathrooms,
  sqft,
  propertyType,
  yearBuilt,
  commonCharges,
  realEstateTax
}: PropertyKeyFactsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
          <DollarSign size={24} className="text-blue-600 mb-2" />
          <div className="text-sm text-gray-500">Price</div>
          <div className="font-bold text-lg">{formatPrice(price)}</div>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
          <Bed size={24} className="text-blue-600 mb-2" />
          <div className="text-sm text-gray-500">Bedrooms</div>
          <div className="font-bold text-lg">{bedrooms}</div>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
          <Bath size={24} className="text-blue-600 mb-2" />
          <div className="text-sm text-gray-500">Bathrooms</div>
          <div className="font-bold text-lg">{bathrooms}</div>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
          <Square size={24} className="text-blue-600 mb-2" />
          <div className="text-sm text-gray-500">Square Feet</div>
          <div className="font-bold text-lg">{sqft.toLocaleString()}</div>
        </div>
        
        {propertyType && (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
            <Home size={24} className="text-blue-600 mb-2" />
            <div className="text-sm text-gray-500">Property Type</div>
            <div className="font-bold text-lg">{propertyType}</div>
          </div>
        )}
        
        {yearBuilt && (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
            <Calendar size={24} className="text-blue-600 mb-2" />
            <div className="text-sm text-gray-500">Year Built</div>
            <div className="font-bold text-lg">{yearBuilt}</div>
          </div>
        )}
      </div>
      
      {(commonCharges || realEstateTax) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonCharges && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Common Charges</div>
              <div className="font-bold text-lg">{formatPrice(commonCharges)}/month</div>
            </div>
          )}
          
          {realEstateTax && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Real Estate Tax</div>
              <div className="font-bold text-lg">{formatPrice(realEstateTax)}/year</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 