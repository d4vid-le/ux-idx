'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

// Create the auth context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmPasswordReset: (token: string, password: string) => Promise<void>;
};

// Create the auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  
  const resetPassword = async (email: string) => {
    try {
      // Simulating API call for password reset
      console.log('Requesting password reset for:', email);
      
      // In a real application, this would call your backend API 
      // to send a password reset email to the user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      return Promise.resolve();
    } catch (error) {
      console.error('Reset password error:', error);
      return Promise.reject(error);
    }
  };

  const confirmPasswordReset = async (token: string, newPassword: string) => {
    try {
      // Simulating API call for password reset confirmation
      console.log('Confirming password reset with token:', token);
      
      // In a real application, this would call your backend API
      // to verify the token and update the user's password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      return Promise.resolve();
    } catch (error) {
      console.error('Confirm reset password error:', error);
      return Promise.reject(error);
    }
  };

  const value: AuthContextType = {
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
    resetPassword,
    confirmPasswordReset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use the auth context
export function useAuthContext() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
} 