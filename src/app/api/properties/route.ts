import { NextResponse } from 'next/server';
import { mockProperties } from '@/data/mockProperties';

/**
 * Calculate distance between two coordinates using the Haversine formula
 * @param lat1 - Latitude of first point
 * @param lng1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lng2 - Longitude of second point
 * @returns Distance in miles
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

/**
 * GET endpoint to search properties with various filters
 * 
 * Example query params:
 * - location: string
 * - price_min: number
 * - price_max: number
 * - beds_min: number
 * - baths_min: number
 * - property_type: string
 * - status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending'
 * - lat: number (latitude for location-based search)
 * - lng: number (longitude for location-based search)
 * - radius: number (search radius in miles)
 * - sort: string (sorting criteria)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const location = searchParams.get('location')?.toLowerCase();
    const priceMin = searchParams.get('price_min') ? Number(searchParams.get('price_min')) : undefined;
    const priceMax = searchParams.get('price_max') ? Number(searchParams.get('price_max')) : undefined;
    const bedsMin = searchParams.get('beds_min') ? Number(searchParams.get('beds_min')) : undefined;
    const bathsMin = searchParams.get('baths_min') ? Number(searchParams.get('baths_min')) : undefined;
    const propertyType = searchParams.get('property_type')?.toLowerCase();
    const status = searchParams.get('status');
    
    // New location-based parameters
    const lat = searchParams.get('lat') ? Number(searchParams.get('lat')) : undefined;
    const lng = searchParams.get('lng') ? Number(searchParams.get('lng')) : undefined;
    const radius = searchParams.get('radius') ? Number(searchParams.get('radius')) : 10; // Default to 10 miles
    const searchType = searchParams.get('type') || 'buy'; // Default to 'buy'
    
    // Parse sorting criteria
    const sort = searchParams.get('sort') || 'newest';
    
    // Filter properties based on query parameters
    let filteredProperties = [...mockProperties];
    
    // Apply search type filter (buy/rent)
    if (searchType === 'rent') {
      filteredProperties = filteredProperties.filter(property => 
        property.status.toLowerCase() === 'for rent'
      );
    } else if (searchType === 'buy') {
      filteredProperties = filteredProperties.filter(property => 
        property.status.toLowerCase() === 'for sale'
      );
    }
    
    // Filter by text location (address or neighborhood)
    if (location) {
      filteredProperties = filteredProperties.filter(property => 
        property.address.toLowerCase().includes(location) || 
        property.neighborhood?.toLowerCase().includes(location) ||
        (property.city && property.city.toLowerCase().includes(location))
      );
    }
    
    // Filter by coordinates within radius
    if (lat !== undefined && lng !== undefined) {
      filteredProperties = filteredProperties.filter(property => {
        if (!property.location?.lat || !property.location?.lng) return false;
        
        const distance = calculateDistance(
          lat, 
          lng, 
          property.location.lat, 
          property.location.lng
        );
        
        return distance <= radius;
      });
      
      // Add distance property to each property for sorting/display
      filteredProperties = filteredProperties.map(property => ({
        ...property,
        distance: property.location?.lat && property.location?.lng 
          ? calculateDistance(lat, lng, property.location.lat, property.location.lng) 
          : undefined
      }));
    }
    
    if (priceMin !== undefined) {
      filteredProperties = filteredProperties.filter(property => property.price >= priceMin);
    }
    
    if (priceMax !== undefined) {
      filteredProperties = filteredProperties.filter(property => property.price <= priceMax);
    }
    
    if (bedsMin !== undefined) {
      filteredProperties = filteredProperties.filter(property => property.bedrooms >= bedsMin);
    }
    
    if (bathsMin !== undefined) {
      filteredProperties = filteredProperties.filter(property => property.bathrooms >= bathsMin);
    }
    
    if (propertyType) {
      filteredProperties = filteredProperties.filter(property => 
        property.propertyType?.toLowerCase() === propertyType
      );
    }
    
    if (status) {
      filteredProperties = filteredProperties.filter(property => 
        property.status.toLowerCase() === status.toLowerCase()
      );
    }
    
    // Sort properties based on criteria
    filteredProperties.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'beds-desc':
          return b.bedrooms - a.bedrooms;
        case 'distance':
          // Sort by distance if available (closest first)
          if (a.distance !== undefined && b.distance !== undefined) {
            return a.distance - b.distance;
          }
          return 0;
        default:
          return 0;
      }
    });
    
    return NextResponse.json({ 
      properties: filteredProperties,
      total: filteredProperties.length,
      searchInfo: {
        location,
        coordinates: lat && lng ? { lat, lng } : null,
        radius: radius,
        type: searchType
      }
    });
    
  } catch (error) {
    console.error('Error processing property search:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
} 