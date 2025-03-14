export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  squareFeet?: number;
  imageUrl: string;
  photos?: string[];
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
  createdAt: string;
  location: {
    lat: number;
    lng: number;
  };
  description?: string;
  features?: string[];
  propertyType?: string;
  yearBuilt?: number;
  neighborhood?: string;
  city?: string;
  images?: string[];
  amenities?: string[];
  taxAmount?: number;
  commonCharges?: number;
  realEstateTax?: number;
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  floorPlan?: string;
  virtualTour?: string;
  video?: string;
  distance?: number;
} 