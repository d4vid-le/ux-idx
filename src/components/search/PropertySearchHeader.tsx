'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search, MapPin, ChevronDown, ArrowUpDown, Heart } from 'lucide-react';
import Link from 'next/link';

interface PropertySearchHeaderProps {
  filters: {
    status: string;
    price: string;
    propertyType: string;
    beds: string;
    baths: string;
  };
  onFilterChange: (filters: any) => void;
  propertyCount?: number;
  onSortChange: (sort: string) => void;
  sortOption?: string;
  pageTitle?: string;
  locationSubtitle?: string;
  searchCoordinates?: { lat: number; lng: number } | null;
}

const PropertySearchHeader: React.FC<PropertySearchHeaderProps> = ({ 
  filters,
  onFilterChange,
  propertyCount = 0,
  onSortChange,
  sortOption = 'Newest',
  pageTitle = 'Real Estate & Homes for Sale',
  locationSubtitle = 'New York, NY',
  searchCoordinates
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams ? searchParams.get('q') || '' : '');
  
  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new URLSearchParams instance 
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    
    // Add or update the search query parameter
    if (searchTerm.trim()) {
      params.set('q', searchTerm.trim());
    } else {
      params.delete('q');
    }
    
    // Navigate to the search page with the updated params
    router.push(`/search?${params.toString()}`);
  };

  const handleFilterSelect = (filterType: string, value: string) => {
    onFilterChange({ [filterType]: value });
    setOpenDropdown(null); // Close dropdown after selection
  };

  const toggleDropdown = (dropdown: string) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'newest':
        return 'Newest';
      case 'price-desc':
        return 'Price (High to Low)';
      case 'price-asc':
        return 'Price (Low to High)';
      case 'beds-desc':
        return 'Bedrooms';
      case 'baths-desc':
        return 'Bathrooms';
      case 'sqft-desc':
        return 'Square Feet';
      case 'distance':
        return 'Distance';
      default:
        return 'Newest';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      {/* Removed the main navigation section with IDX Solution, Home, Search, Saved links, and login/signup buttons */}

      {/* Search and filters - Improved padding and alignment */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-2">
          {/* Integrated search bar and filters on one line */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Bar - Enhanced with modern design */}
            <div className="relative w-64 md:w-80">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input
                  type="text"
                  placeholder="Address, City, ZIP"
                  className="pl-3 pr-12 py-2.5 w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 group-hover:border-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search for properties by address, city, or ZIP"
                />
                <button 
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center justify-center px-3 mr-0.5 my-0.5 rounded-r-md text-gray-500 hover:text-white hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  aria-label="Search properties"
                  title="Search properties"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Button 
                variant="outline" 
                className="border border-gray-300 rounded-md flex items-center gap-1 h-8 px-2 text-gray-700 text-sm font-normal"
                onClick={() => toggleDropdown('status')}
              >
                {filters.status} <ChevronDown size={14} />
              </Button>
              {openDropdown === 'status' && (
                <div className="absolute mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {['For sale', 'For rent', 'Sold', 'Pending'].map((status) => (
                      <button
                        key={status}
                        className={`block w-full text-left px-4 py-2 text-sm ${filters.status === status ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => handleFilterSelect('status', status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="relative">
              <Button 
                variant="outline" 
                className="border border-gray-300 rounded-md flex items-center gap-1 h-8 px-2 text-gray-700 text-sm font-normal"
                onClick={() => toggleDropdown('price')}
              >
                {filters.price} <ChevronDown size={14} />
              </Button>
              {openDropdown === 'price' && (
                <div className="absolute mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {['Any price', 'Under $500K', '$500K - $1M', '$1M - $2M', '$2M - $5M', 'Over $5M'].map((price) => (
                      <button
                        key={price}
                        className={`block w-full text-left px-4 py-2 text-sm ${filters.price === price ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => handleFilterSelect('price', price)}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Type Filter */}
            <div className="relative">
              <Button 
                variant="outline" 
                className="border border-gray-300 rounded-md flex items-center gap-1 h-8 px-2 text-gray-700 text-sm font-normal"
                onClick={() => toggleDropdown('propertyType')}
              >
                {filters.propertyType} <ChevronDown size={14} />
              </Button>
              {openDropdown === 'propertyType' && (
                <div className="absolute mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {['All property types', 'House', 'Condo', 'Townhouse', 'Multi-family', 'Land', 'Other'].map((type) => (
                      <button
                        key={type}
                        className={`block w-full text-left px-4 py-2 text-sm ${filters.propertyType === type ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => handleFilterSelect('propertyType', type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Beds Filter */}
            <div className="relative">
              <Button 
                variant="outline" 
                className="border border-gray-300 rounded-md flex items-center gap-1 h-8 px-2 text-gray-700 text-sm font-normal"
                onClick={() => toggleDropdown('beds')}
              >
                {filters.beds} <ChevronDown size={14} />
              </Button>
              {openDropdown === 'beds' && (
                <div className="absolute mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {['All beds', '1+ beds', '2+ beds', '3+ beds', '4+ beds', '5+ beds'].map((beds) => (
                      <button
                        key={beds}
                        className={`block w-full text-left px-4 py-2 text-sm ${filters.beds === beds ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => handleFilterSelect('beds', beds)}
                      >
                        {beds}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Baths Filter */}
            <div className="relative">
              <Button 
                variant="outline" 
                className="border border-gray-300 rounded-md flex items-center gap-1 h-8 px-2 text-gray-700 text-sm font-normal"
                onClick={() => toggleDropdown('baths')}
              >
                {filters.baths} <ChevronDown size={14} />
              </Button>
              {openDropdown === 'baths' && (
                <div className="absolute mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {['All baths', '1+ baths', '2+ baths', '3+ baths', '4+ baths'].map((baths) => (
                      <button
                        key={baths}
                        className={`block w-full text-left px-4 py-2 text-sm ${filters.baths === baths ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => handleFilterSelect('baths', baths)}
                      >
                        {baths}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Save Search */}
            <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 h-8 px-2 text-sm ml-auto">
              Save search
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count and Sort - Consistent padding */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{pageTitle}</h1>
            <div className="text-sm">
              <span className="font-medium">{propertyCount} homes</span> · {locationSubtitle}
              {searchCoordinates && (
                <span className="text-gray-500 ml-1">(Map view available)</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-700 text-sm">Sort:</span>
            <div className="relative">
              <Button 
                variant="ghost" 
                className="text-gray-900 flex items-center gap-1 h-8 px-2 text-sm"
                onClick={() => toggleDropdown('sort')}
              >
                {getSortLabel(sortOption || 'newest')} <ArrowUpDown size={14} />
              </Button>
              {openDropdown === 'sort' && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {[
                      { label: 'Newest', value: 'newest' },
                      { label: 'Price (High to Low)', value: 'price-desc' },
                      { label: 'Price (Low to High)', value: 'price-asc' },
                      { label: 'Bedrooms', value: 'beds-desc' },
                      { label: 'Bathrooms', value: 'baths-desc' },
                      { label: 'Square Feet', value: 'sqft-desc' },
                      ...(searchCoordinates ? [{ label: 'Distance', value: 'distance' }] : [])
                    ].map((option) => (
                      <button
                        key={option.value}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          onSortChange(option.value);
                          setOpenDropdown(null);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data to display the count
const mockProperties = Array(10).fill(null);

export default PropertySearchHeader; 