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
 * @returns Formatted price string
 */
export function formatPrice(price: number, locale: string = 'en-US', currency: string = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats a date string in a human-readable format
 * @param dateString Date string in ISO format (YYYY-MM-DD)
 * @param locale Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Truncate a string to a specified length
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Validates an email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 */
export interface PasswordValidationResult {
  valid: boolean;
  reason?: string;
}

export function validatePassword(password: string): PasswordValidationResult {
  if (!password) {
    return {
      valid: false,
      reason: 'Password is required'
    };
  }

  if (password.length < 8) {
    return {
      valid: false,
      reason: 'Password must be at least 8 characters long'
    };
  }

  // This is a simple check, real validation would be more complex
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
    return {
      valid: false,
      reason: 'Password must contain uppercase, lowercase, and numbers'
    };
  }

  return { valid: true };
}
