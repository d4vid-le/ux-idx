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
    // In a real app, this would update the URL with the search params
    console.log('Search submitted:', searchTerm);
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
      {/* Main navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900">
                IDX Solution
              </Link>
              <nav className="hidden md:flex">
                <ul className="flex space-x-6">
                  <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                  <li><Link href="/search" className="text-blue-600 font-medium">Search</Link></li>
                  <li><Link href="/saved" className="text-gray-600 hover:text-gray-900">Saved</Link></li>
                </ul>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/saved" className="text-gray-700 hover:text-gray-900">
                <Heart className="h-5 w-5 text-gray-700 hover:text-gray-900" />
              </Link>
              <Button variant="outline" className="border-gray-300 text-gray-700">
                <Link href="/dashboard">Log in</Link>
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters - Improved padding and alignment */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-2">
          {/* Integrated search bar and filters on one line */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Bar - Smaller and inline */}
            <div className="relative w-64 md:w-72">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Address, City, ZIP"
                  className="pl-8 pr-2 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-gray-700 focus:border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filters.status === status
                            ? 'bg-gray-50 text-gray-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
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
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filters.price === price
                            ? 'bg-gray-50 text-gray-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
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
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filters.propertyType === type
                            ? 'bg-gray-50 text-gray-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
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
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filters.beds === beds
                            ? 'bg-gray-50 text-gray-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
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
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filters.baths === baths
                            ? 'bg-gray-50 text-gray-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
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
            <Button variant="ghost" className="text-gray-700 hover:bg-gray-50 h-8 px-2 text-sm ml-auto">
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