# Utils Directory Structure

This directory contains utility functions organized by category for better maintainability and organization.

## Directory Structure

- `index.ts` - Re-exports all utility functions from a single file
- `common.ts` - General utility functions like `cn` for class name merging
- `formatting.ts` - Functions for formatting data (prices, dates, numbers, etc.)
- `validation.ts` - Functions for validating data (emails, passwords, etc.)
- `api.ts` - Functions for making API requests and handling responses

## Usage

You can import utility functions directly from their specific files:

```typescript
import { formatPrice } from '@/lib/utils/formatting';
import { isValidEmail } from '@/lib/utils/validation';
import { cn } from '@/lib/utils/common';
import { postData } from '@/lib/utils/api';
```

Or you can import them from the index file:

```typescript
import { formatPrice, isValidEmail, cn, postData } from '@/lib/utils';
```

## Available Utilities

### Common Utilities (`common.ts`)

- `cn(...inputs: ClassValue[])` - Combines class names using clsx and tailwind-merge
- `truncateString(str: string, length: number)` - Truncates a string to a specified length
- `toDateTime(secs: number)` - Converts Unix timestamp to Date object
- `getURL()` - Gets the base URL for the application

### Formatting Utilities (`formatting.ts`)

- `formatPrice(price: number, locale?: string, currency?: string)` - Formats a number as a price string
- `formatDate(dateString: string, locale?: string)` - Formats a date string in a human-readable format
- `formatNumber(num: number)` - Formats a number with commas for thousands
- `formatPhoneNumber(phone: string)` - Formats a phone number in a standard format
- `formatSquareFeet(sqft: number)` - Formats square footage with commas and "sq ft" suffix
- `formatAddress(address: string, maxLength?: number)` - Formats an address for display

### Validation Utilities (`validation.ts`)

- `isValidEmail(email: string)` - Checks if a string is a valid email address
- `validatePassword(password: string)` - Validates password strength
- `isValidPhone(phone: string)` - Checks if a string is a valid phone number
- `isValidZipCode(zipCode: string)` - Checks if a string is a valid ZIP code
- `isValidURL(url: string)` - Checks if a string is a valid URL
- `isNotEmpty(value: string | null | undefined)` - Checks if a value is not empty

### API Utilities (`api.ts`)

- `postData<T>({ url, data })` - Makes a POST request to a specified URL
- `getData<T>({ url })` - Makes a GET request to a specified URL
- `handleApiError(error: any)` - Handles API errors and returns a user-friendly error message 