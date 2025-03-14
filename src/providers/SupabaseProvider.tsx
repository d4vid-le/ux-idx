"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "../../types_db";

interface SupabaseProviderProps {
	children: React.ReactNode;
}

// Create a minimal mock client for development without credentials
const createMockClient = () => {
	console.log("Using mock Supabase client for development");
	return {
		auth: {
			getSession: () => Promise.resolve({ data: { session: null }, error: null }),
			getUser: () => Promise.resolve({ data: { user: null }, error: null }),
			onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
			signIn: () => Promise.resolve({ data: null, error: null }),
			signOut: () => Promise.resolve({ error: null }),
		},
		from: () => ({
			select: () => ({
				single: () => Promise.resolve({ data: null, error: null }),
				in: () => ({
					single: () => Promise.resolve({ data: null, error: null }),
				}),
			}),
		}),
	} as any;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
	const [supabaseClient] = useState(() => {
		// Check if we're in browser environment
		const isBrowser = typeof window !== 'undefined';
		
		// Check if we have Supabase credentials
		const noCredentials = 
			!process.env.NEXT_PUBLIC_SUPABASE_URL || 
			!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

		// For development without credentials or in SSR where credentials might not be available
		if ((!isBrowser || noCredentials) && process.env.NODE_ENV === 'development') {
			return createMockClient();
		}
		
		try {
			return createClientComponentClient<Database>();
		} catch (error) {
			console.warn("Failed to initialize Supabase client:", error);
			// Return a mock client when in development
			if (process.env.NODE_ENV === 'development') {
				return createMockClient();
			}
			throw error;
		}
	});

	return (
		<SessionContextProvider supabaseClient={supabaseClient}>
			{children}
		</SessionContextProvider>
	);
};

export default SupabaseProvider;
