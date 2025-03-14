'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Map, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SavedSearch {
  id: number;
  query: string;
  date: string;
  count?: number;
  filters?: {
    location?: string;
    priceMin?: number;
    priceMax?: number;
    beds?: number;
    baths?: number;
    propertyType?: string;
  };
}

export default function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching saved searches
  useEffect(() => {
    const fetchSavedSearches = async () => {
      try {
        // Mock data for demonstration
        const mockSavedSearches = [
          { 
            id: 1, 
            query: 'Condos in Miami', 
            date: '2023-10-15',
            count: 42,
            filters: {
              location: 'Miami, FL',
              priceMin: 200000,
              priceMax: 1000000,
              beds: 2,
              propertyType: 'Condo'
            }
          },
          { 
            id: 2, 
            query: 'Apartments in New York', 
            date: '2023-10-14',
            count: 156,
            filters: {
              location: 'New York, NY',
              priceMin: 500000,
              priceMax: 2000000,
              beds: 1,
              propertyType: 'Apartment'
            }
          },
          { 
            id: 3, 
            query: 'Houses with pool in Los Angeles', 
            date: '2023-10-12',
            count: 28,
            filters: {
              location: 'Los Angeles, CA',
              priceMin: 1000000,
              priceMax: 5000000,
              beds: 3,
              baths: 2,
              propertyType: 'House'
            }
          },
        ];
        
        setSavedSearches(mockSavedSearches);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved searches:', error);
        setLoading(false);
      }
    };
    
    fetchSavedSearches();
  }, []);

  // Simulate removing a saved search
  const handleRemoveSearch = (searchId: number) => {
    setSavedSearches(prevSearches => 
      prevSearches.filter(search => search.id !== searchId)
    );
  };

  // Create a search URL with filters (would be implemented differently in a real app)
  const getSearchUrl = (search: SavedSearch) => {
    return `/search?q=${encodeURIComponent(search.query)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Saved Searches</h1>
        <Button 
          variant="outline" 
          className="text-rose-600 border-rose-200 hover:bg-rose-50"
          onClick={() => {
            if (confirm('Are you sure you want to remove all saved searches?')) {
              setSavedSearches([]);
            }
          }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading your saved searches...</div>
        </div>
      ) : savedSearches.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-10 text-center">
          <div className="text-center py-10">
            <Map className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No saved searches</h3>
          </div>
          <p className="text-gray-500 mb-6 max-w-md">
            Save your search criteria to get notified when new properties match what you're looking for.
          </p>
          <Link href="/search">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Searching
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Saved Searches List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Query</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Saved</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Properties</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savedSearches.map((search) => (
                  <tr key={search.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{search.query}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {search.filters && (
                          <>
                            {search.filters.location && <span className="mr-2">{search.filters.location}</span>}
                            {search.filters.priceMin && search.filters.priceMax && (
                              <span className="mr-2">${search.filters.priceMin.toLocaleString()} - ${search.filters.priceMax.toLocaleString()}</span>
                            )}
                            {search.filters.beds && <span className="mr-2">{search.filters.beds}+ beds</span>}
                            {search.filters.baths && <span className="mr-2">{search.filters.baths}+ baths</span>}
                            {search.filters.propertyType && <span>{search.filters.propertyType}</span>}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{search.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{search.count || 0} properties</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-4">
                        <Link href={getSearchUrl(search)} className="text-blue-600 hover:text-blue-900">
                          View
                        </Link>
                        <button
                          onClick={() => handleRemoveSearch(search.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 