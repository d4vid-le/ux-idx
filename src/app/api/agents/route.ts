import { NextResponse } from 'next/server';
import { mockProperties } from '@/data/mockProperties';

/**
 * GET endpoint to list all real estate agents
 * 
 * Route: /api/agents
 */
export async function GET() {
  try {
    // Extract unique agents from properties
    const agentsMap = new Map();
    
    mockProperties.forEach(property => {
      if (property.agent && property.agent.name) {
        agentsMap.set(property.agent.name, property.agent);
      }
    });
    
    const agents = Array.from(agentsMap.values());
    
    return NextResponse.json({
      count: agents.length,
      agents
    });
    
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
} 