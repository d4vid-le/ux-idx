'use client';

import { Check } from 'lucide-react';

interface PropertyFeaturesProps {
  title: string;
  features: string[];
  iconType?: 'dot' | 'check'; // Allow different icon options
}

export default function PropertyFeatures({ 
  title, 
  features,
  iconType = 'dot' 
}: PropertyFeaturesProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              {iconType === 'check' ? (
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-gray-700">
                  <Check size={12} />
                </div>
              ) : (
                <div className="w-2 h-2 bg-gray-700 rounded-full mr-3 flex-shrink-0"></div>
              )}
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 