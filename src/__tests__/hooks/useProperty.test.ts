import { renderHook, act, waitFor } from '@testing-library/react';
import { useProperty } from '@/hooks/property';
import { mockProperty } from '../utils/test-utils';

// Mock the fetch function
global.fetch = jest.fn();

describe('useProperty hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch property data successfully', async () => {
    // Mock successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ property: mockProperty }),
    });

    // Render the hook
    const { result } = renderHook(() => useProperty('1'));

    // Initially should be in loading state with no property
    expect(result.current.loading).toBe(true);
    expect(result.current.property).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should have loaded the property
    expect(result.current.property).toEqual(mockProperty);
    expect(result.current.error).toBeNull();

    // Check that the fetch was called with the correct parameters
    expect(global.fetch).toHaveBeenCalledWith('/api/properties/1');
  });

  it('should handle errors when fetching property', async () => {
    // Mock failed API response
    const errorMessage = 'Property not found';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: errorMessage,
    });

    // Render the hook
    const { result } = renderHook(() => useProperty('999'));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should have error but no property
    expect(result.current.property).toBeNull();
    expect(result.current.error).toBeTruthy();
    expect(result.current.error.message).toContain('404');
  });

  it('should refetch property when refetch is called', async () => {
    // Mock API responses
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ property: mockProperty }),
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ property: { ...mockProperty, price: 800000 } }),
    });

    // Render the hook
    const { result } = renderHook(() => useProperty('1'));

    // Wait for initial fetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Initial property data
    expect(result.current.property).toEqual(mockProperty);

    // Call refetch
    act(() => {
      result.current.refetch();
    });

    // Should be in loading state again
    expect(result.current.loading).toBe(true);

    // Wait for refetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should have updated property data
    expect(result.current.property?.price).toBe(800000);
  });
}); 