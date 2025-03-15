import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as a price string with currency symbol
 * @param price Number to format as price
 * @param locale Locale for formatting (default: 'en-US')
 * @param currency Currency code (default: 'USD')
 * @param includeDecimal Whether to include decimal places (default: false)
 * @returns Formatted price string
 */
export function formatPrice(
  price: number, 
  locale: string = 'en-US', 
  currency: string = 'USD',
  includeDecimal: boolean = false
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: includeDecimal ? 2 : 0,
    maximumFractionDigits: includeDecimal ? 2 : 0,
  }).format(price);
}

/**
 * Formats a date in a human-readable format
 * @param date Date object or string in ISO format
 * @param options Intl.DateTimeFormatOptions
 * @param locale Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  },
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Truncate a string to a specified length
 * @param str The string to truncate
 * @param length Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Format a number with commas
 * @param num - The number to format
 * @returns Formatted number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Format square footage
 * @param sqft - The square footage to format
 * @returns Formatted square footage with commas and "sq ft" suffix
 */
export function formatSquareFeet(sqft: number): string {
  return `${formatNumber(sqft)} sq ft`;
}

/**
 * Format a short address (without zip code or state)
 * @param address - The full address
 * @returns Shortened address
 */
export function formatShortAddress(address: string): string {
  // Attempts to remove zip code and state abbreviation
  return address.replace(/,\s*[A-Z]{2}\s*\d{5}(-\d{4})?$/, '');
}

/**
 * Format a phone number as (XXX) XXX-XXXX
 * @param phone - The phone number (can contain non-numeric characters)
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const digits = phone.replace(/\D/g, '');
  
  // Format based on the number of digits
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  
  // Return original if not formattable
  return phone;
}

/**
 * Format a mortgage payment amount
 * @param payment - Monthly payment amount
 * @returns Formatted payment with dollar sign and decimal
 */
export function formatMonthlyPayment(payment: number): string {
  return formatPrice(payment, 'en-US', 'USD', true) + '/mo';
}

/**
 * Format a full or partial URL to a properly formatted URL
 * @param url - The URL to format
 * @returns Properly formatted URL
 */
export function formatUrl(url: string): string {
  if (!url) return '';
  
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  
  return url;
}

/**
 * Check if a string is a valid email address
 * @param email - The email address to validate
 * @returns Boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if a string is a valid phone number
 * @param phone - The phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export function isValidPhone(phone: string): boolean {
  // Remove non-numeric characters for validation
  const digits = phone.replace(/\D/g, '');
  
  // Check if the number of digits is valid for US numbers
  return digits.length === 10 || (digits.length === 11 && digits[0] === '1');
}

/**
 * Check if a value is a valid price
 * @param price - The price to validate
 * @returns Boolean indicating if the price is valid
 */
export function isValidPrice(price: number | string): boolean {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  return !isNaN(numPrice) && numPrice >= 0;
}

/**
 * Check if a value is a valid ZIP code
 * @param zip - The ZIP code to validate
 * @returns Boolean indicating if the ZIP code is valid
 */
export function isValidZipCode(zip: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
}

/**
 * Check if a string contains a valid URL
 * @param url - The URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    // Using URL constructor for validation
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Check if a password meets strength requirements
 * @param password - The password to validate
 * @returns Object with validation result and reason if invalid
 */
export function validatePassword(password: string): { valid: boolean; reason?: string } {
  if (password.length < 8) {
    return { valid: false, reason: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one number' };
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one special character' };
  }
  
  return { valid: true };
}

/**
 * Validate required form fields
 * @param data - Form data object
 * @param requiredFields - Array of required field names
 * @returns Object with validation result and missing fields
 */
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): { valid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });
  
  return {
    valid: missingFields.length === 0,
    missingFields
  };
}

/**
 * Check if a date is valid and not in the past
 * @param date - The date to validate
 * @param allowPast - Whether to allow past dates
 * @returns Boolean indicating if the date is valid
 */
export function isValidFutureDate(date: Date | string, allowPast: boolean = false): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return false;
  }
  
  // Check if date is not in the past
  if (!allowPast) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj >= today;
  }
  
  return true;
}

/**
 * Sleep for a specified duration
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the specified duration
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate a random ID (useful for testing or temporary IDs)
 * @param length - The length of the ID to generate
 * @returns A random string ID
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Debounce a function call
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle a function call
 * @param fn - The function to throttle
 * @param limit - The limit in milliseconds
 * @returns A throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function(...args: Parameters<T>): void {
    const now = Date.now();
    if (now - lastCall >= limit) {
      fn(...args);
      lastCall = now;
    }
  };
}

/**
 * Get the browser's language preference
 * @returns The browser's language code
 */
export function getBrowserLanguage(): string {
  if (typeof navigator === 'undefined') {
    return 'en-US'; // Default for server-side
  }
  return navigator.language || 'en-US';
}

/**
 * Check if the code is running on the client side
 * @returns Boolean indicating if code is running in a browser
 */
export const isClient = typeof window !== 'undefined';

/**
 * Safely parse JSON with error handling
 * @param json - The JSON string to parse
 * @param fallback - The fallback value if parsing fails
 * @returns The parsed object or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    return fallback;
  }
}

// Re-export all utility functions from a single file
export * from './formatting';
export * from './validation';
export * from './common';
export * from './api';
