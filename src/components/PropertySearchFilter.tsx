import { useState } from 'react';
import { Button } from './ui/button';

interface PropertySearchFilterProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export interface PropertyFilters {
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string | null;
  status: string | null;
}

const PropertySearchFilter: React.FC<PropertySearchFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<PropertyFilters>({
    priceRange: [0, 2000000],
    bedrooms: null,
    bathrooms: null,
    propertyType: null,
    status: null,
  });

  const handleInputChange = (field: keyof PropertyFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(Number);
                handleInputChange('priceRange', [min, max]);
              }}
            >
              <option value="0-2000000">Any Price</option>
              <option value="0-300000">Up to $300,000</option>
              <option value="300000-500000">$300,000 - $500,000</option>
              <option value="500000-750000">$500,000 - $750,000</option>
              <option value="750000-1000000">$750,000 - $1,000,000</option>
              <option value="1000000-2000000">$1,000,000+</option>
            </select>
          </div>
          
          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleInputChange('bedrooms', e.target.value === 'any' ? null : Number(e.target.value))}
            >
              <option value="any">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          
          {/* Bathrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleInputChange('bathrooms', e.target.value === 'any' ? null : Number(e.target.value))}
            >
              <option value="any">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleInputChange('propertyType', e.target.value === 'any' ? null : e.target.value)}
            >
              <option value="any">Any</option>
              <option value="single-family">Single Family</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="multi-family">Multi-Family</option>
              <option value="land">Land</option>
            </select>
          </div>
          
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleInputChange('status', e.target.value === 'any' ? null : e.target.value)}
            >
              <option value="any">Any</option>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Search Properties
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearchFilter; 