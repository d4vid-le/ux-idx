import { NextResponse } from 'next/server';
import { mockProperties } from '@/data/mockProperties';

/**
 * GET endpoint to fetch a specific property by ID
 * 
 * Route: /api/properties/:id
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Find the property with the matching ID
    const property = mockProperties.find(prop => prop.id === id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(property);
    
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
} 