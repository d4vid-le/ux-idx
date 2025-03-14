import { Metadata } from 'next';
import AuthLayout from '@/components/layout/AuthLayout';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password | IDX Real Estate Solution',
  description: 'Create a new password for your IDX Real Estate Solution account',
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout 
      title="Create New Password"
      subtitle="Set a new secure password for your account"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
} 