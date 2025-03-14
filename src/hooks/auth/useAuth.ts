import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface UseAuthResult {
  user: User | null;
  loading: boolean;
  error: any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Demo credentials
const DEMO_EMAIL = 'demo@idxsolution.com';
const DEMO_PASSWORD = 'IDX@demo2023';

/**
 * Custom hook for authentication
 */
export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  // Check for user session on mount
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Checking for stored user in localStorage');
        // In a real implementation, this would check the Supabase session
        // For now, check localStorage for a mock user
        const storedUser = localStorage.getItem('idx_user');
        
        if (storedUser) {
          console.log('Found stored user, parsing');
          const userData = JSON.parse(storedUser);
          setUser(userData);
          console.log('User session restored:', userData.email);
        } else {
          console.log('No stored user found');
        }
        
      } catch (err) {
        console.error('Error checking auth session:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
    
    // Listen for storage events to handle login/logout in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'idx_user') {
        if (e.newValue) {
          try {
            const userData = JSON.parse(e.newValue);
            setUser(userData);
          } catch (err) {
            console.error('Error parsing user data from storage event:', err);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    
  }, []);
  
  // Sign in function
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting to sign in with email:', email);
      
      // Check for demo credentials
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        console.log('Demo credentials matched, creating demo user');
        // Handle successful demo login
        const demoUser = {
          id: 'demo-user-id',
          email: DEMO_EMAIL,
          name: 'Demo User'
        };
        
        // Store in localStorage for persistence
        console.log('Storing demo user in localStorage');
        localStorage.setItem('idx_user', JSON.stringify(demoUser));
        setUser(demoUser);
        console.log('Demo user logged in successfully');
        return;
      }
      
      // This is just for the demo - in a real app, this would validate against a real auth system
      console.log('Invalid credentials, only demo account is supported');
      throw new Error('Invalid credentials. For demo, use demo@idxsolution.com / IDX@demo2023');
      
    } catch (err) {
      console.error('Error signing in:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Sign up function
  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting to sign up with email:', email);
      // In a real implementation, this would call an auth service's signUp method
      // For now, just mock the sign up
      
      // Mock successful sign up
      const mockUser = {
        id: 'mock-user-id',
        email,
        name
      };
      
      // Store in localStorage for persistence
      console.log('Storing new user in localStorage');
      localStorage.setItem('idx_user', JSON.stringify(mockUser));
      setUser(mockUser);
      console.log('User signed up successfully:', email);
      
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Sign out function
  const signOut = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Signing out current user');
      // In a real implementation, this would call an auth service's signOut method
      // For now, just remove from localStorage
      localStorage.removeItem('idx_user');
      setUser(null);
      console.log('User signed out successfully');
      
    } catch (err) {
      console.error('Error signing out:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Reset password function
  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Requesting password reset for email:', email);
      // In a real implementation, this would call an auth service's resetPassword method
      // For now, just log
      console.log(`Password reset email sent to ${email}`);
      
    } catch (err) {
      console.error('Error resetting password:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword
  };
} 