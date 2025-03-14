import { render, RenderOptions } from '@testing-library/react';
import React from 'react';

// Mock property data
export const mockProperty = {
  id: '1',
  title: 'Modern Downtown Apartment',
  address: '123 Main St, New York, NY 10001',
  price: 750000,
  bedrooms: 2,
  bathrooms: 2,
  squareFeet: 1200,
  description: 'A beautiful modern apartment in the heart of downtown.',
  features: ['Central AC', 'Hardwood Floors', 'Stainless Steel Appliances'],
  photos: [
    '/images/properties/property-1-1.jpg',
    '/images/properties/property-1-2.jpg',
    '/images/properties/property-1-3.jpg',
  ],
  propertyType: 'Apartment',
  status: 'For Sale',
  yearBuilt: 2015,
  location: {
    lat: 40.7128,
    lng: -74.006,
  },
};

// Mock properties list data
export const mockProperties = [
  mockProperty,
  {
    id: '2',
    title: 'Luxury Penthouse with Views',
    address: '456 Park Ave, New York, NY 10022',
    price: 2500000,
    bedrooms: 3,
    bathrooms: 3.5,
    squareFeet: 2800,
    description: 'Stunning penthouse with panoramic city views.',
    features: ['Doorman', 'Gym', 'Roof Deck'],
    photos: [
      '/images/properties/property-2-1.jpg',
      '/images/properties/property-2-2.jpg',
    ],
    propertyType: 'Condo',
    status: 'For Sale',
    yearBuilt: 2010,
    location: {
      lat: 40.7631,
      lng: -73.9712,
    },
  },
  {
    id: '3',
    title: 'Charming Brownstone',
    address: '789 Greene Ave, Brooklyn, NY 11216',
    price: 1850000,
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 3200,
    description: 'Historic brownstone with original details and modern amenities.',
    features: ['Garden', 'Fireplace', 'High Ceilings'],
    photos: [
      '/images/properties/property-3-1.jpg',
      '/images/properties/property-3-2.jpg',
    ],
    propertyType: 'Single Family',
    status: 'For Sale',
    yearBuilt: 1920,
    location: {
      lat: 40.6895,
      lng: -73.9496,
    },
  },
];

// Mock user data
export const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
};

// Mock agent data
export const mockAgent = {
  id: 'agent-1',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: '(212) 555-1234',
  photo: '/images/agents/agent-1.jpg',
  bio: 'Jane has 10+ years of experience in NYC real estate.',
  specializations: ['Luxury Properties', 'First-time Buyers'],
  listings: ['1', '2'],
};

// Custom render function
function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {
    // Add custom wrapper here if needed (e.g., for providers)
    ...options,
  });
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render }; 