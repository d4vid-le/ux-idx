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