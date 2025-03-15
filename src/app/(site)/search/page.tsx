'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertySearchHeader from '@/components/search/PropertySearchHeader';
import PropertyListings from '@/components/search/PropertyListings';
import PropertyMap from '@/components/search/PropertyMap';
import { Property } from '@/types/property';

interface SearchInfo {
  location?: string;
  coordinates?: { lat: number; lng: number };
  radius?: number;
  type?: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [sortOption, setSortOption] = useState<string>('newest');
  const [searchInfo, setSearchInfo] = useState<SearchInfo>({});
  
  // Filter state
  const [filters, setFilters] = useState({
    status: 'For sale',
    price: 'Any price',
    propertyType: 'All property types',
    beds: 'All beds',
    baths: 'All baths'
  });

  // Load properties from API based on search parameters
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Build query params from URL search params
        const queryParams = new URLSearchParams();
        
        // Add all search params to the query
        if (searchParams) {
          for (const [key, value] of Array.from(searchParams.entries())) {
            queryParams.append(key, value);
          }
        }
        
        // Default sort by newest if not specified
        if (!searchParams?.get('sort')) {
          queryParams.append('sort', sortOption);
        }
        
        // Fetch properties from API
        const response = await fetch(`/api/properties?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching properties: ${response.status}`);
        }
        
        const data = await response.json();
        
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
        setSearchInfo(data.searchInfo || {});
        
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
        setAllProperties([]);
        setFilteredProperties([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [searchParams, sortOption]);

  // Apply additional client-side filters
  useEffect(() => {
    if (allProperties.length === 0) return;
    
    let result = [...allProperties];
    
    // Filter by status - this might be redundant with the server filter but ensures consistency
    if (filters.status !== 'For sale') {
      result = result.filter(property => {
        // Convert both to lowercase for case-insensitive comparison
        const filterStatus = filters.status.toLowerCase();
        const propertyStatus = property.status.toLowerCase();
        
        if (filterStatus === 'for rent') return propertyStatus === 'for rent';
        if (filterStatus === 'sold') return propertyStatus === 'sold';
        if (filterStatus === 'pending') return propertyStatus === 'pending';
        return true;
      });
    }
    
    // Filter by price
    if (filters.price !== 'Any price') {
      result = result.filter(property => {
        const price = property.price;
        if (filters.price === 'Under $500K') return price < 500000;
        if (filters.price === '$500K - $1M') return price >= 500000 && price < 1000000;
        if (filters.price === '$1M - $2M') return price >= 1000000 && price < 2000000;
        if (filters.price === '$2M - $5M') return price >= 2000000 && price < 5000000;
        if (filters.price === 'Over $5M') return price >= 5000000;
        return true;
      });
    }
    
    // Filter by beds
    if (filters.beds !== 'All beds') {
      const minBeds = parseInt(filters.beds.split('+')[0]);
      result = result.filter(property => property.bedrooms >= minBeds);
    }
    
    // Filter by baths
    if (filters.baths !== 'All baths') {
      const minBaths = parseInt(filters.baths.split('+')[0]);
      result = result.filter(property => property.bathrooms >= minBaths);
    }
    
    // Filter by property type
    if (filters.propertyType !== 'All property types' && filters.propertyType !== 'All property types') {
      result = result.filter(property => {
        return property.propertyType?.toLowerCase() === filters.propertyType.toLowerCase();
      });
    }
    
    setFilteredProperties(result);
  }, [filters, allProperties]);

  const handleFilterChange = (newFilters: any) => {
    // Check if this is a complete reset (all default values provided)
    if (
      newFilters.status !== undefined &&
      newFilters.price !== undefined &&
      newFilters.propertyType !== undefined &&
      newFilters.beds !== undefined &&
      newFilters.baths !== undefined
    ) {
      // This is a complete reset from the Clear Filters button
      setFilters(newFilters);
    } else {
      // This is a partial update from individual filter changes
      setFilters({ ...filters, ...newFilters });
    }
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  // Calculate the number of properties after filtering
  const propertyCount = useMemo(() => {
    return filteredProperties.length;
  }, [filteredProperties]);

  // Sort properties based on the selected option
  const sortedProperties = useMemo(() => {
    if (sortOption === 'distance' && searchInfo.coordinates) {
      // If sorted by distance, use the pre-calculated distance from the API
      return [...filteredProperties].sort((a, b) => {
        if (a.distance !== undefined && b.distance !== undefined) {
          return a.distance - b.distance;
        }
        return 0;
      });
    }
    
    return [...filteredProperties].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'beds-desc':
          return b.bedrooms - a.bedrooms;
        case 'baths-desc':
          return b.bathrooms - a.bathrooms;
        case 'sqft-desc':
          return b.sqft - a.sqft;
        default:
          return 0;
      }
    });
  }, [filteredProperties, sortOption, searchInfo]);

  // Generate page title based on search
  const getPageTitle = () => {
    if (searchInfo.location) {
      const type = searchInfo.type === 'rent' ? 'For Rent' : 'For Sale';
      return `Properties ${type} in ${searchInfo.location}`;
    }
    
    if (searchInfo.type === 'rent') {
      return 'Properties For Rent';
    }
    
    return 'Properties For Sale';
  };

  // Get the location subtitle
  const getLocationSubtitle = () => {
    let subtitle = '';
    
    if (searchInfo.location) {
      subtitle = searchInfo.location;
      
      if (searchInfo.coordinates && searchInfo.radius) {
        subtitle += ` (within ${searchInfo.radius} miles)`;
      }
    } else if (searchInfo.coordinates && searchInfo.radius) {
      subtitle = `Within ${searchInfo.radius} miles of selected location`;
    } else {
      subtitle = 'All locations';
    }
    
    return subtitle;
  };

  return (
    <main className="min-h-screen">
      {error && (
        <div className="bg-red-50 p-4 border-l-4 border-red-500">
          <p className="text-red-700">{error}</p>
        </div>
      )}
    
      {/* Search Header with Filters */}
      <PropertySearchHeader 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        propertyCount={propertyCount}
        onSortChange={handleSortChange}
        sortOption={sortOption}
        pageTitle={getPageTitle()}
        locationSubtitle={getLocationSubtitle()}
        searchCoordinates={searchInfo.coordinates}
      />
      
      {/* Main Content - Property Listings and Map */}
      <div className="flex h-auto lg:h-[calc(100vh-200px)]">
        {/* Property Listings Column - Full width on mobile/tablet, narrower on desktop when map is shown */}
        <div className={`${showMap ? "w-full lg:w-1/3 xl:w-1/3" : "w-full"} h-full overflow-y-auto`}>
          <PropertyListings 
            properties={sortedProperties}
            loading={loading}
            onPropertySelect={handlePropertySelect}
            selectedProperty={selectedProperty}
            showMap={showMap}
            showDistance={sortOption === 'distance' || Boolean(searchInfo.coordinates)}
          />
        </div>
        
        {/* Map Column - Only visible on desktop (lg breakpoint and above), wider than before */}
        {showMap && (
          <div className="hidden lg:block lg:w-2/3 xl:w-2/3 h-full sticky top-0">
            <PropertyMap 
              properties={sortedProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
              centerCoordinates={searchInfo.coordinates}
              searchRadius={searchInfo.radius}
            />
          </div>
        )}
      </div>

      {/* Map Toggle Button - Only visible on desktop */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block">
        <button 
          className="bg-white shadow-md px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>
    </main>
  );
} 