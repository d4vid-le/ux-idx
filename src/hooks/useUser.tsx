import { useEffect, useState, createContext, useContext } from "react";
import {
	useUser as useSupaUser,
	useSessionContext,
	User,
} from "@supabase/auth-helpers-react";
import { Subscription, UserDetails } from "../../types";

type UserContextType = {
	accessToken: string | null;
	user: User | null;
	userDetails: UserDetails | null;
	isLoading: boolean;
	subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

export interface Props {
	[propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
	// Always call hooks at the top level, regardless of conditions
	const {
		session,
		isLoading: isLoadingUser,
		supabaseClient: supabase,
	} = useSessionContext();
	const user = useSupaUser();
	const accessToken = session?.access_token ?? null;
	const [isLoadingData, setIsloadingData] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [subscription, setSubscription] = useState<Subscription | null>(null);
	
	// Check if we have Supabase credentials
	const isDevelopment = process.env.NODE_ENV === 'development';
	const noCredentials = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	
	// Define these functions regardless of whether we'll use them
	const getUserDetails = () => {
		if (isDevelopment && noCredentials) return Promise.resolve({ data: null });
		return supabase.from("users").select("*").single();
	};
	
	const getSubscription = () => {
		if (isDevelopment && noCredentials) return Promise.resolve({ data: null });
		return supabase
			.from("subscriptions")
			.select("*, prices(*, products(*))")
			.in("status", ["trialing", "active"])
			.single();
	};

	useEffect(() => {
		// Skip data fetching in development with no credentials
		if (isDevelopment && noCredentials) {
			return;
		}
		
		if (user && !isLoadingData && !userDetails && !subscription) {
			setIsloadingData(true);
			Promise.allSettled([getUserDetails(), getSubscription()]).then(
				(results) => {
					const userDetailsPromise = results[0];
					const subscriptionPromise = results[1];

					if (userDetailsPromise.status === "fulfilled")
						setUserDetails(userDetailsPromise.value.data as UserDetails);

					if (subscriptionPromise.status === "fulfilled")
						setSubscription(subscriptionPromise.value.data as Subscription);

					setIsloadingData(false);
				}
			);
		} else if (!user && !isLoadingUser && !isLoadingData) {
			setUserDetails(null);
			setSubscription(null);
		}
	}, [user, isLoadingUser, isDevelopment, noCredentials, userDetails, subscription, isLoadingData]);

	const value = {
		accessToken,
		user,
		userDetails,
		isLoading: isLoadingUser || isLoadingData,
		subscription,
	};

	// Use mock data in development if no credentials are provided
	if (isDevelopment && noCredentials) {
		return (
			<UserContext.Provider 
				value={{
					accessToken: null,
					user: null,
					userDetails: null,
					isLoading: false,
					subscription: null,
				}} 
				{...props} 
			/>
		);
	}

	return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error(`useUser must be used within a MyUserContextProvider.`);
	}
	return context;
};
