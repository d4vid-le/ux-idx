'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/lib/utils/validation';
import { useAuthContext } from '@/providers/AuthProvider';

// Demo agent credentials
const DEMO_AGENT_EMAIL = 'agent@idxsolution.com';
const DEMO_AGENT_PASSWORD = 'Agent@2023';

const AgentLoginPage = () => {
  const router = useRouter();
  const { signIn } = useAuthContext();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // For demo purposes, check if using the demo agent credentials
      if (email === DEMO_AGENT_EMAIL && password === DEMO_AGENT_PASSWORD) {
        // Create a mock agent user
        const agentUser = {
          id: 'agent-demo-id',
          email: DEMO_AGENT_EMAIL,
          name: 'Demo Agent',
          role: 'agent'
        };
        
        // Store in localStorage for persistence
        localStorage.setItem('idx_user', JSON.stringify(agentUser));
        
        toast.success('Logged in as agent successfully!');
        router.push('/agent-dashboard');
        return;
      }
      
      // Otherwise use the regular sign in
      await signIn(email, password);
      
      // After successful login, check if the user is an agent
      const storedUser = localStorage.getItem('idx_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // Add agent role for demo purposes
        userData.role = 'agent';
        localStorage.setItem('idx_user', JSON.stringify(userData));
      }
      
      toast.success('Logged in successfully!');
      router.push('/agent-dashboard');
    } catch (error) {
      toast.error('Invalid credentials. For demo, use agent@idxsolution.com / Agent@2023');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image 
            src="/images/logo.png" 
            alt="IDX Solution Logo" 
            width={120} 
            height={40} 
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Agent Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your agent dashboard to manage properties and client interactions
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="agent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Need help? Contact your administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentLoginPage; 