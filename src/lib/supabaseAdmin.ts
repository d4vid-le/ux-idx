import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY');
}

// Create a Supabase client with admin privileges
export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Add any IDX-specific admin functions here
export const getProperties = async () => {
    const { data, error } = await supabaseAdmin
        .from('properties')
        .select('*');
    
    if (error) throw error;
    return data;
};

export const getPropertyById = async (id: string) => {
    const { data, error } = await supabaseAdmin
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) throw error;
    return data;
};

export const getAgents = async () => {
    const { data, error } = await supabaseAdmin
        .from('agents')
        .select('*');
    
    if (error) throw error;
    return data;
};

export const getAgentById = async (id: string) => {
    const { data, error } = await supabaseAdmin
        .from('agents')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) throw error;
    return data;
};