import LoginForm from '@/components/forms/LoginForm';
import AuthLayout from '@/components/layout/AuthLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | IDX Solution',
  description: 'Log in to your IDX Solution account to access your saved properties and searches.',
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="IDX Solution - Log in"
      subtitle="Enter your credentials to access your account"
    >
      <LoginForm />
    </AuthLayout>
  );
} 