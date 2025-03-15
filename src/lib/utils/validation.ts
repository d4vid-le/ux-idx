/**
 * Utility functions for data validation
 */

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
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if the cleaned number is 10 digits (US format)
  return cleaned.length === 10;
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
 * Password validation result interface
 */
export interface PasswordValidationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Validates password strength
 * @param password Password to validate
 * @returns Validation result with valid flag and optional reason
 */
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

  // Check for complexity requirements
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

  if (!hasSpecialChar) {
    return {
      valid: false,
      reason: 'Password should include at least one special character'
    };
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