import { Metadata } from 'next';
import AuthLayout from '@/components/layout/AuthLayout';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | IDX Real Estate Solution',
  description: 'Reset your password for IDX Real Estate Solution',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout 
      title="Reset Your Password"
      subtitle="Enter your email to receive password reset instructions"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
} 