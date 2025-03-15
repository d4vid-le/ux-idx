/**
 * Utility functions for formatting data
 */

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
 * Formats a number with commas for thousands
 * @param num Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Formats a phone number in a standard format
 * @param phone Phone number string
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if the input is of correct length
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  
  return phone;
}

/**
 * Formats square footage with commas and "sq ft" suffix
 * @param sqft Square footage number
 * @returns Formatted square footage string
 */
export function formatSquareFeet(sqft: number): string {
  return `${sqft.toLocaleString()} sq ft`;
}

/**
 * Formats an address for display
 * @param address Full address string
 * @param maxLength Maximum length before truncating
 * @returns Formatted address
 */
export function formatAddress(address: string, maxLength: number = 50): string {
  if (address.length <= maxLength) return address;
  
  // Try to find a good breaking point (after a comma)
  const commaIndex = address.indexOf(',');
  if (commaIndex > 0 && commaIndex < maxLength) {
    return address.substring(0, commaIndex + 1) + '...';
  }
  
  // Otherwise just truncate
  return address.substring(0, maxLength) + '...';
}

/**
 * Format a mortgage payment amount
 * @param payment - Monthly payment amount
 * @returns Formatted payment with dollar sign and decimal
 */
export function formatMonthlyPayment(payment: number): string {
  return formatPrice(payment, 'en-US') + '/mo';
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