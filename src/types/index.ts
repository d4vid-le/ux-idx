// User type for authentication
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  avatarUrl?: string | null;
  role?: 'user' | 'admin' | 'agent';
  created_at?: string;
  updated_at?: string;
}

// Property type for real estate listings
export interface Property {
  id: string;
  title: string;
  description?: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  propertyType: string;
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
  photos?: string[];
  features?: string[];
  agentId?: string;
  createdAt: string;
  updatedAt?: string;
}

// Agent type for real estate agents
export interface Agent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  photo?: string;
  specialties?: string[];
  licenseNumber?: string;
  properties?: Property[];
  createdAt?: string;
  updatedAt?: string;
} 