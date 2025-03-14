'use client';

import { formatPrice } from '@/lib/utils';

interface PropertyDetailsProps {
  details: {
    label: string;
    value: string | number | null | undefined;
  }[];
  title: string;
}

export default function PropertyDetails({ details, title }: PropertyDetailsProps) {
  // Filter out undefined or null values
  const filteredDetails = details.filter(detail => detail.value !== null && detail.value !== undefined);
  
  // Format values if needed
  const formattedDetails = filteredDetails.map(detail => {
    let formattedValue = detail.value;
    
    // Format price values
    if (typeof detail.value === 'number' && 
        (detail.label.toLowerCase().includes('price') || 
         detail.label.toLowerCase().includes('fee') || 
         detail.label.toLowerCase().includes('tax') ||
         detail.label.toLowerCase().includes('charges'))) {
      formattedValue = formatPrice(detail.value);
    }
    
    return {
      ...detail,
      value: formattedValue
    };
  });

  if (formattedDetails.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
        {formattedDetails.map((detail, index) => (
          <div key={index}>
            <div className="font-medium text-gray-700 mb-1">{detail.label}</div>
            <div className="text-lg">{detail.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 