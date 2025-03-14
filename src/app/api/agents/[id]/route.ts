import { NextResponse } from 'next/server';
import { mockProperties } from '@/data/mockProperties';

/**
 * GET endpoint to fetch a specific agent by name
 * 
 * Route: /api/agents/:id
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In a real API, this would be an agent ID
    // For the mock data, we're using the agent name as the identifier
    const { id } = params;
    
    // Find all properties associated with this agent
    const agentProperties = mockProperties.filter(
      property => property.agent && property.agent.name.toLowerCase() === id.toLowerCase()
    );
    
    if (agentProperties.length === 0) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }
    
    // Get the agent details from the first property
    const agent = agentProperties[0].agent;
    
    // Return agent with their listings
    return NextResponse.json({
      agent,
      listingCount: agentProperties.length,
      listings: agentProperties.map(property => ({
        id: property.id,
        title: property.title,
        address: property.address,
        price: property.price,
        imageUrl: property.imageUrl,
        status: property.status
      }))
    });
    
  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent' },
      { status: 500 }
    );
  }
} 