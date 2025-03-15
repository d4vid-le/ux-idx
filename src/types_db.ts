export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          created_at?: string
          title: string
          description?: string
          address: string
          price: number
          bedrooms: number
          bathrooms: number
          square_feet?: number
          property_type: string
          status: string
          photos?: string[]
          features?: string[]
          agent_id?: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string
          address: string
          price: number
          bedrooms: number
          bathrooms: number
          square_feet?: number
          property_type: string
          status: string
          photos?: string[]
          features?: string[]
          agent_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          address?: string
          price?: number
          bedrooms?: number
          bathrooms?: number
          square_feet?: number
          property_type?: string
          status?: string
          photos?: string[]
          features?: string[]
          agent_id?: string
        }
      }
      agents: {
        Row: {
          id: string
          created_at?: string
          name: string
          email: string
          phone?: string
          bio?: string
          photo?: string
          specialties?: string[]
          license_number?: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string
          bio?: string
          photo?: string
          specialties?: string[]
          license_number?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          bio?: string
          photo?: string
          specialties?: string[]
          license_number?: string
        }
      }
      users: {
        Row: {
          id: string
          created_at?: string
          email: string
          name?: string
          avatar_url?: string
          billing_address?: Json
          payment_method?: Json
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name?: string
          avatar_url?: string
          billing_address?: Json
          payment_method?: Json
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          avatar_url?: string
          billing_address?: Json
          payment_method?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 