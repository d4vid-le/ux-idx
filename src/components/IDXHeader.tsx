"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/outline';

// Define search types
type SearchType = 'buy' | 'rent' | 'sell';

// Popular locations for suggestions
const POPULAR_LOCATIONS = [
  { id: 1, name: 'Manhattan, New York, NY', lat: 40.7831, lng: -73.9712 },
  { id: 2, name: 'Brooklyn, New York, NY', lat: 40.6782, lng: -73.9442 },
  { id: 3, name: 'Queens, New York, NY', lat: 40.7282, lng: -73.7949 },
  { id: 4, name: 'Bronx, New York, NY', lat: 40.8448, lng: -73.8648 },
  { id: 5, name: 'Staten Island, New York, NY', lat: 40.5795, lng: -74.1502 },
  { id: 6, name: 'Jersey City, NJ', lat: 40.7178, lng: -74.0431 },
  { id: 7, name: 'Hoboken, NJ', lat: 40.7439, lng: -74.0323 },
];

// Mock neighborhoods data
const NEIGHBORHOODS = [
  { id: 101, name: 'Upper East Side', city: 'Manhattan', lat: 40.7735, lng: -73.9565 },
  { id: 102, name: 'Upper West Side', city: 'Manhattan', lat: 40.7870, lng: -73.9754 },
  { id: 103, name: 'Chelsea', city: 'Manhattan', lat: 40.7465, lng: -74.0014 },
  { id: 104, name: 'Williamsburg', city: 'Brooklyn', lat: 40.7081, lng: -73.9571 },
  { id: 105, name: 'Park Slope', city: 'Brooklyn', lat: 40.6710, lng: -73.9814 },
  { id: 106, name: 'Astoria', city: 'Queens', lat: 40.7643, lng: -73.9235 },
  { id: 107, name: 'Long Island City', city: 'Queens', lat: 40.7447, lng: -73.9485 },
];

interface LocationSuggestion {
  id: number;
  name: string;
  lat?: number;
  lng?: number;
  type?: 'popular' | 'recent' | 'neighborhood' | 'prediction';
  city?: string;
}

const IDXHeader: React.FC = () => {
  const router = useRouter();
  
  // Track the active search type
  const [activeSearchType, setActiveSearchType] = useState<SearchType>('buy');
  
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    minBeds: '',
    minBaths: '',
    minSize: '',
    maxSize: '',
    keywords: '',
    radius: '10',
    lat: '',
    lng: '',
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        const parsedSearches = JSON.parse(savedSearches);
        setRecentSearches(parsedSearches.slice(0, 5)); // Only keep last 5 searches
      } catch (e) {
        console.error('Error parsing recent searches:', e);
      }
    }
  }, []);

  // Add click outside listener to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'location') {
      handleLocationInput(value);
    }
  };

  const handleLocationInput = (value: string) => {
    if (!value.trim()) {
      // If input is empty, show recent searches and popular locations
      const suggestions = [
        ...recentSearches.map(search => ({ ...search, type: 'recent' as const })),
        ...POPULAR_LOCATIONS.map(loc => ({ ...loc, type: 'popular' as const }))
      ];
      setLocationSuggestions(suggestions);
      setShowSuggestions(true);
      return;
    }

    setIsLoading(true);
    
    // Search in neighborhoods
    const neighborhoodMatches = NEIGHBORHOODS.filter(n => 
      n.name.toLowerCase().includes(value.toLowerCase()) || 
      n.city.toLowerCase().includes(value.toLowerCase())
    ).map(n => ({ ...n, type: 'neighborhood' as const }));
    
    // Search in popular locations
    const popularMatches = POPULAR_LOCATIONS.filter(loc => 
      loc.name.toLowerCase().includes(value.toLowerCase())
    ).map(loc => ({ ...loc, type: 'popular' as const }));
    
    // This would normally use a geocoding API like Google Places Autocomplete
    // For this demo, we'll just simulate it
    setTimeout(() => {
      const combinedResults = [...neighborhoodMatches, ...popularMatches];
      
      // Add some "prediction" results if we have few matches
      if (combinedResults.length < 3) {
        combinedResults.push(
          { id: 1000, name: `${value} area, New York, NY`, type: 'prediction' },
          { id: 1001, name: `${value} neighborhood, Brooklyn, NY`, type: 'prediction' }
        );
      }
      
      setLocationSuggestions(combinedResults.slice(0, 7)); // Limit to 7 suggestions
      setShowSuggestions(true);
      setIsLoading(false);
    }, 300);
  };

  const selectLocationSuggestion = (suggestion: LocationSuggestion) => {
    setSearchParams(prev => ({
      ...prev,
      location: suggestion.name,
      lat: suggestion.lat?.toString() || '',
      lng: suggestion.lng?.toString() || ''
    }));
    setShowSuggestions(false);
    
    // Add to recent searches
    const updatedRecentSearches = [
      suggestion,
      ...recentSearches.filter(s => s.id !== suggestion.id)
    ].slice(0, 5);
    
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setActiveSearchType(type);
    // Reset or adjust form fields as needed when switching search types
    if (type === 'sell') {
      // Different fields might be relevant for selling
      setSearchParams(prev => ({
        ...prev,
        propertyType: '',
        priceRange: '',
      }));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save search parameters
    const searchQuery = new URLSearchParams();
    
    if (searchParams.location) {
      searchQuery.append('location', searchParams.location);
    }
    
    if (searchParams.lat && searchParams.lng) {
      searchQuery.append('lat', searchParams.lat);
      searchQuery.append('lng', searchParams.lng);
      searchQuery.append('radius', searchParams.radius);
    }
    
    if (activeSearchType) {
      searchQuery.append('type', activeSearchType);
    }
    
    // Additional parameters for advanced search
    if (searchParams.minBeds) searchQuery.append('beds_min', searchParams.minBeds);
    if (searchParams.minBaths) searchQuery.append('baths_min', searchParams.minBaths);
    if (searchParams.propertyType) searchQuery.append('property_type', searchParams.propertyType);
    if (searchParams.priceRange) searchQuery.append('price_range', searchParams.priceRange);
    
    // Navigate to search results page
    router.push(`/search?${searchQuery.toString()}`);
  };

  // Get placeholder text based on active search type
  const getLocationPlaceholder = () => {
    switch (activeSearchType) {
      case 'rent': return 'Where do you want to rent?';
      case 'buy': return 'Where do you want to buy?';
      case 'sell': return 'Where is your property located?';
      default: return 'City, Neighborhood, or ZIP';
    }
  };

  // Toggle auth dropdown
  const toggleAuthDropdown = () => {
    setShowAuthDropdown(!showAuthDropdown);
  };

  // Render suggestion item with appropriate styling
  const renderSuggestionItem = (suggestion: LocationSuggestion) => {
    let icon;
    let labelText;
    
    switch (suggestion.type) {
      case 'recent':
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
        labelText = 'Recent';
        break;
      case 'popular':
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
        labelText = 'Popular';
        break;
      case 'neighborhood':
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
        labelText = suggestion.city;
        break;
      case 'prediction':
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
        labelText = 'Prediction';
        break;
      default:
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
        labelText = '';
    }
    
    return (
      <div className="flex items-start p-2">
        <div className="mr-2 mt-0.5">
          {icon}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{suggestion.name}</div>
          {labelText && <div className="text-xs text-gray-500">{labelText}</div>}
        </div>
      </div>
    );
  };

  return (
    <header className="relative text-white">
      {/* Hero background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          alt="Luxury real estate"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/60" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 py-4 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-3 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                <span className="absolute text-white font-bold text-sm">db</span>
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-white">db</span>
                <span className="text-blue-400">/</span>
                <span className="text-white">ux</span>
                <span className="ml-2 text-sm font-normal tracking-wider text-blue-200">IDX Solution</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              <Link href="/" className="px-2 lg:px-3 py-2 text-white hover:text-blue-300 font-medium whitespace-nowrap text-sm lg:text-base">Home</Link>
              <Link href="/search" className="px-2 lg:px-3 py-2 text-white hover:text-blue-300 font-medium whitespace-nowrap text-sm lg:text-base">Properties</Link>
              <Link href="/agents" className="px-2 lg:px-3 py-2 text-white hover:text-blue-300 font-medium whitespace-nowrap text-sm lg:text-base">Agents</Link>
              <Link href="/about" className="px-2 lg:px-3 py-2 text-white hover:text-blue-300 font-medium whitespace-nowrap text-sm lg:text-base">About</Link>
              <Link href="/contact" className="px-2 lg:px-3 py-2 text-white hover:text-blue-300 font-medium whitespace-nowrap text-sm lg:text-base">Contact</Link>
            </div>

            {/* Auth Buttons - ONLY for large screens, not tablet */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link 
                href="/login" 
                className="hidden md:flex items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                <span>Login</span>
              </Link>
              <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white h-auto py-2 px-4">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
            
            {/* Mobile/Tablet Menu Button */}
            <button 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile and Tablet Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 py-3 border-t border-white/10">
              <Link href="/" className="block py-2 text-white hover:text-blue-300">Home</Link>
              <Link href="/search" className="block py-2 text-white hover:text-blue-300">Properties</Link>
              <Link href="/agents" className="block py-2 text-white hover:text-blue-300">Agents</Link>
              <Link href="/about" className="block py-2 text-white hover:text-blue-300">About</Link>
              <Link href="/contact" className="block py-2 text-white hover:text-blue-300">Contact</Link>
              
              {/* Auth links with appropriate width for mobile and tablet */}
              <div className="border-t border-white/10 mt-3 pt-3">
                <h3 className="text-white font-semibold mb-2">Account</h3>
                <div className="flex flex-wrap gap-3">
                  <Link 
                    href="/login" 
                    className="bg-blue-500 hover:bg-blue-600 text-white w-auto px-5"
                  >
                    <UserIcon className="h-5 w-5 mr-2 text-white" />
                    <span>Login</span>
                  </Link>
                  <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white w-auto px-5">
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Hero text content */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">IDX for Realtors</h2>
          <p className="text-xl text-gray-200 mb-8">
            Discover the perfect property with our comprehensive listings and expert guidance.
          </p>
        </div>

        {/* Search form */}
        <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
          {/* Search Tabs - Aligned to the left */}
          <div className="flex justify-start border-b">
            <div className="flex w-full md:w-1/2">
              <button
                className={`py-2 px-6 text-base font-medium flex-1 ${
                  activeSearchType === 'buy'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => handleSearchTypeChange('buy')}
              >
                Buy
              </button>
              <button
                className={`py-2 px-6 text-base font-medium flex-1 ${
                  activeSearchType === 'rent'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => handleSearchTypeChange('rent')}
              >
                Rent
              </button>
              <button
                className={`py-2 px-6 text-base font-medium flex-1 ${
                  activeSearchType === 'sell'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => handleSearchTypeChange('sell')}
              >
                Sell
              </button>
            </div>
          </div>

          {/* Search Form Content */}
          <div className="px-4 py-4">
            <form onSubmit={handleSearch}>
              <div className="w-full">
                {/* Location with Autocomplete - always visible for all search types */}
                <div className="w-full relative">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input 
                      ref={inputRef}
                      type="text" 
                      name="location"
                      placeholder={getLocationPlaceholder()}
                      className="w-full p-3 pl-10 pr-28 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      value={searchParams.location}
                      onChange={handleInputChange}
                      onFocus={() => {
                        if (!searchParams.location) {
                          const combinedSuggestions = [
                            ...recentSearches.map(search => ({ ...search, type: 'recent' as const })),
                            ...POPULAR_LOCATIONS.slice(0, 3).map(loc => ({ ...loc, type: 'popular' as const }))
                          ];
                          setLocationSuggestions(combinedSuggestions);
                        }
                        setShowSuggestions(true);
                      }}
                      autoComplete="off"
                    />
                    {isLoading && (
                      <div className="absolute top-1/2 right-24 transform -translate-y-1/2">
                        <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                    
                    {/* Search button */}
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-all duration-200 shadow-sm hover:shadow-md"
                      aria-label={activeSearchType === 'sell' ? 'Get Home Value' : 'Search Properties'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Search</span>
                    </button>
                  </div>
                  
                  {/* Location Suggestions Dropdown */}
                  {showSuggestions && (
                    <div 
                      ref={suggestionsRef}
                      className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-72 overflow-y-auto"
                    >
                      {locationSuggestions.length > 0 ? (
                        <div>
                          {locationSuggestions.map((suggestion) => (
                            <div 
                              key={suggestion.id} 
                              className="cursor-pointer hover:bg-blue-50"
                              onClick={() => selectLocationSuggestion(suggestion)}
                            >
                              {renderSuggestionItem(suggestion)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 text-sm text-gray-500">
                          No locations found. Try a different search.
                        </div>
                      )}
                      
                      {/* Radius selector - shown after location is selected */}
                      {searchParams.location && (searchParams.lat || searchParams.lng) && (
                        <div className="p-3 border-t border-gray-200">
                          <div className="flex items-center">
                            <label className="text-sm text-gray-600 mr-2">Distance:</label>
                            <select
                              name="radius"
                              value={searchParams.radius}
                              onChange={handleInputChange}
                              className="text-sm border border-gray-300 rounded p-1"
                            >
                              <option value="1">1 mile</option>
                              <option value="3">3 miles</option>
                              <option value="5">5 miles</option>
                              <option value="10">10 miles</option>
                              <option value="15">15 miles</option>
                              <option value="30">30 miles</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Advanced Search Options - could be expanded in the future */}
                {false && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                    <div>
                      <select 
                        name="propertyType" 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={searchParams.propertyType}
                        onChange={handleInputChange}
                      >
                        <option value="">Any Property Type</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="apartment">Apartment</option>
                        <option value="townhouse">Townhouse</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        name="minBeds" 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={searchParams.minBeds}
                        onChange={handleInputChange}
                      >
                        <option value="">Any Beds</option>
                        <option value="1">1+ Beds</option>
                        <option value="2">2+ Beds</option>
                        <option value="3">3+ Beds</option>
                        <option value="4">4+ Beds</option>
                        <option value="5">5+ Beds</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        name="priceRange" 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={searchParams.priceRange}
                        onChange={handleInputChange}
                      >
                        <option value="">Any Price</option>
                        <option value="0-500000">Under $500K</option>
                        <option value="500000-1000000">$500K - $1M</option>
                        <option value="1000000-2000000">$1M - $2M</option>
                        <option value="2000000-5000000">$2M - $5M</option>
                        <option value="5000000-999999999">$5M+</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default IDXHeader; 