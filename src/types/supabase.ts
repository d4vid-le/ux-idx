export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
      };
      agents: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          image?: string;
          bio?: string;
          title?: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          phone: string;
          image?: string;
          bio?: string;
          title?: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          image?: string;
          bio?: string;
          title?: string;
          updatedAt?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: number;
          address: string;
          bedrooms: number;
          bathrooms: number;
          sqft: number;
          imageUrl: string;
          images?: string[];
          features?: string[];
          amenities?: string[];
          neighborhood?: string;
          location?: { lat: number; lng: number };
          propertyType?: string;
          yearBuilt?: number;
          commonCharges?: number;
          realEstateTax?: number;
          status?: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id: string;
          title: string;
          description: string;
          price: number;
          address: string;
          bedrooms: number;
          bathrooms: number;
          sqft: number;
          imageUrl: string;
          images?: string[];
          features?: string[];
          amenities?: string[];
          neighborhood?: string;
          location?: { lat: number; lng: number };
          propertyType?: string;
          yearBuilt?: number;
          commonCharges?: number;
          realEstateTax?: number;
          status?: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          price?: number;
          address?: string;
          bedrooms?: number;
          bathrooms?: number;
          sqft?: number;
          imageUrl?: string;
          images?: string[];
          features?: string[];
          amenities?: string[];
          neighborhood?: string;
          location?: { lat: number; lng: number };
          propertyType?: string;
          yearBuilt?: number;
          commonCharges?: number;
          realEstateTax?: number;
          status?: string;
          updatedAt?: string;
        };
      };
      // ... other tables
    };
  };
}; 