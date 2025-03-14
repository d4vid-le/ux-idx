import { NextRequest } from 'next/server';
import { GET as getProperties } from '@/app/api/properties/route';
import { GET as getPropertyById } from '@/app/api/properties/[id]/route';
import { mockProperties, mockProperty } from '../utils/test-utils';

// Mock the database client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    data: mockProperties,
  },
}));

describe('Properties API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/properties', () => {
    it('should return all properties', async () => {
      // Create mock NextRequest
      const req = new NextRequest('http://localhost:3000/api/properties', {
        method: 'GET',
      });

      // Call the API route handler
      const response = await getProperties(req);
      
      // Check the response
      expect(response.status).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.properties).toHaveLength(mockProperties.length);
      expect(responseData.properties[0].id).toBe(mockProperties[0].id);
    });

    it('should filter properties by location', async () => {
      // Create mock NextRequest with location filter
      const req = new NextRequest(
        'http://localhost:3000/api/properties?location=New%20York'
      );

      // Mock the filtered response
      const filteredProperties = mockProperties.filter(
        (p) => p.address.includes('New York')
      );

      // Override the mock for this specific test
      jest.mock('@/lib/supabase', () => ({
        supabase: {
          from: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          ilike: jest.fn().mockReturnThis(),
          data: filteredProperties,
        },
      }));

      // Call the API route handler
      const response = await getProperties(req);
      
      // Check the response
      expect(response.status).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.properties).toHaveLength(filteredProperties.length);
    });
  });

  describe('GET /api/properties/[id]', () => {
    it('should return a specific property by ID', async () => {
      // Create mock NextRequest with params
      const req = new NextRequest('http://localhost:3000/api/properties/1');
      
      // Mock the params
      const params = { id: '1' };

      // Call the API route handler
      const response = await getPropertyById(req, { params });
      
      // Check the response
      expect(response.status).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.property.id).toBe('1');
      expect(responseData.property.title).toBe(mockProperty.title);
    });

    it('should return 404 for non-existent property', async () => {
      // Create mock NextRequest with params
      const req = new NextRequest('http://localhost:3000/api/properties/999');
      
      // Mock the params
      const params = { id: '999' };

      // Override the mock to return empty data
      jest.mock('@/lib/supabase', () => ({
        supabase: {
          from: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          data: [],
        },
      }));

      // Call the API route handler
      const response = await getPropertyById(req, { params });
      
      // Check the response
      expect(response.status).toBe(404);
    });
  });
}); 