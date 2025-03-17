'use client';

import { formatPrice } from '@/lib/utils/formatting';
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
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mb-1.5">
            <DollarSign size={16} className="text-gray-700" />
          </div>
          <div className="text-xs text-gray-500">Price</div>
          <div className="text-sm font-medium text-center">{formatPrice(price)}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mb-1.5">
            <Bed size={16} className="text-gray-700" />
          </div>
          <div className="text-xs text-gray-500">Bedrooms</div>
          <div className="text-sm font-medium">{bedrooms}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mb-1.5">
            <Bath size={16} className="text-gray-700" />
          </div>
          <div className="text-xs text-gray-500">Bathrooms</div>
          <div className="text-sm font-medium">{bathrooms}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mb-1.5">
            <Square size={16} className="text-gray-700" />
          </div>
          <div className="text-xs text-gray-500">Square Feet</div>
          <div className="text-sm font-medium">{sqft.toLocaleString()}</div>
        </div>
        {propertyType && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mb-1.5">
              <Home size={16} className="text-gray-700" />
            </div>
            <div className="text-xs text-gray-500">Property Type</div>
            <div className="text-sm font-medium">{propertyType}</div>
          </div>
        )}
        {yearBuilt && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mb-1.5">
              <Calendar size={16} className="text-gray-700" />
            </div>
            <div className="text-xs text-gray-500">Year Built</div>
            <div className="text-sm font-medium">{yearBuilt}</div>
          </div>
        )}
        {commonCharges && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mb-1.5">
              <DollarSign size={16} className="text-gray-700" />
            </div>
            <div className="text-xs text-gray-500">Common Charges</div>
            <div className="text-sm font-medium">{formatPrice(commonCharges)}/mo</div>
          </div>
        )}
        {realEstateTax && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mb-1.5">
              <DollarSign size={16} className="text-gray-700" />
            </div>
            <div className="text-xs text-gray-500">Real Estate Tax</div>
            <div className="text-sm font-medium">{formatPrice(realEstateTax)}/yr</div>
          </div>
        )}
      </div>
    </div>
  );
} 