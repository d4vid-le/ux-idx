import { useState, useEffect } from 'react';
import { Property } from '@/types/property';

interface UsePropertyResult {
  property: Property | null;
  loading: boolean;
  error: any;
  refetch: () => void;
}

/**
 * Custom hook for fetching a single property by ID
 */
export function useProperty(id: string): UsePropertyResult {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  // Function to fetch the property
  const fetchProperty = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch property from the API
      const response = await fetch(`/api/properties/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching property: ${response.status}`);
      }
      
      const data = await response.json();
      setProperty(data);
      
    } catch (err) {
      console.error('Error in useProperty hook:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch property on mount and when ID changes
  useEffect(() => {
    fetchProperty();
  }, [id]);
  
  return {
    property,
    loading,
    error,
    refetch: fetchProperty
  };
} 