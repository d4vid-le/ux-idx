import SignupForm from '@/components/forms/SignupForm';
import AuthLayout from '@/components/layout/AuthLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | IDX Solution',
  description: 'Create an account to save properties and searches on IDX Solution.',
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join us to access exclusive features and saved properties"
    >
      <SignupForm />
    </AuthLayout>
  );
} 