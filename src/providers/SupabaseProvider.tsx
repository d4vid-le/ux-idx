"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "../../types_db";

interface SupabaseProviderProps {
	children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
	const [supabaseClient] = useState(() => {
		try {
			return createClientComponentClient<Database>();
		} catch (error) {
			console.warn("Failed to initialize Supabase client:", error);
			// Return a mock client or null when in development without proper credentials
			const isDevelopment = process.env.NODE_ENV === 'development';
			if (isDevelopment) {
				console.log("Using mock Supabase client for development");
				// This is a minimal mock that allows the app to render without real Supabase
				return {
					auth: {
						getSession: () => Promise.resolve({ data: { session: null }, error: null }),
						getUser: () => Promise.resolve({ data: { user: null }, error: null }),
						onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
					}
				} as any;
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
