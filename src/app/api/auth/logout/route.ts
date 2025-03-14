import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, this would call your auth service's logout method
  // For now, we'll just set a flag to clear client-side state on redirect

  // Set a redirect response 
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  
  // You could clear auth cookies here if using cookie-based auth

  return response;
} 