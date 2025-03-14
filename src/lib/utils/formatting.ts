/**
 * Utility functions for formatting data
 */

/**
 * Format a price in USD
 * @param price - The price to format
 * @param includeDecimal - Whether to include decimal places
 * @returns Formatted price string with dollar sign
 */
export function formatPrice(price: number, includeDecimal: boolean = false): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: includeDecimal ? 2 : 0,
    maximumFractionDigits: includeDecimal ? 2 : 0,
  });

  return formatter.format(price);
}

/**
 * Format a date in the user's locale
 * @param date - The date to format (Date object or ISO string)
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
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
  return formatPrice(payment, true) + '/mo';
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