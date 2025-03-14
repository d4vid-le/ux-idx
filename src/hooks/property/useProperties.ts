import { useState, useEffect } from 'react';
import { Property } from '@/types/property';

interface UsePropertiesOptions {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  bedsMin?: number;
  bathsMin?: number;
  propertyType?: string;
  status?: string;
}

interface UsePropertiesResult {
  properties: Property[];
  loading: boolean;
  error: any;
  refetch: () => void;
}

/**
 * Custom hook for fetching properties with filters
 */
export function useProperties(options: UsePropertiesOptions = {}): UsePropertiesResult {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  // Function to fetch properties
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (options.location) queryParams.append('location', options.location);
      if (options.priceMin) queryParams.append('price_min', options.priceMin.toString());
      if (options.priceMax) queryParams.append('price_max', options.priceMax.toString());
      if (options.bedsMin) queryParams.append('beds_min', options.bedsMin.toString());
      if (options.bathsMin) queryParams.append('baths_min', options.bathsMin.toString());
      if (options.propertyType) queryParams.append('property_type', options.propertyType);
      if (options.status) queryParams.append('status', options.status);
      
      // Fetch properties from the API
      const response = await fetch(`/api/properties?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching properties: ${response.status}`);
      }
      
      const data = await response.json();
      setProperties(data.properties || []);
      
    } catch (err) {
      console.error('Error in useProperties hook:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch properties on mount and when options change
  useEffect(() => {
    fetchProperties();
  }, [
    options.location,
    options.priceMin,
    options.priceMax,
    options.bedsMin,
    options.bathsMin,
    options.propertyType,
    options.status
  ]);
  
  return {
    properties,
    loading,
    error,
    refetch: fetchProperties
  };
} 