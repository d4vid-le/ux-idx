import { useState, useEffect } from 'react';

/**
 * Custom hook to manage property favorites
 * @returns Methods and state for managing favorites
 */
export function useFavorites() {
  // State to store the favorite property IDs
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
        setFavoriteIds(savedFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavoriteIds([]);
      }
    };
    
    loadFavorites();
    
    // Listen for favorites updates from other components
    const handleFavoritesUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setFavoriteIds(customEvent.detail.favorites);
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);
  
  /**
   * Check if a property is favorited
   * @param id - Property ID to check
   * @returns True if the property is favorited
   */
  const isFavorite = (id: string): boolean => {
    return favoriteIds.includes(id);
  };
  
  /**
   * Toggle favorite status for a property
   * @param id - Property ID to toggle
   * @returns The new favorite status (true if favorited, false if unfavorited)
   */
  const toggleFavorite = (id: string): boolean => {
    let updatedFavorites: string[];
    
    if (isFavorite(id)) {
      // Remove from favorites
      updatedFavorites = favoriteIds.filter(favId => favId !== id);
    } else {
      // Add to favorites
      updatedFavorites = [...favoriteIds, id];
    }
    
    // Update localStorage
    localStorage.setItem('favoriteProperties', JSON.stringify(updatedFavorites));
    
    // Update state
    setFavoriteIds(updatedFavorites);
    
    // Notify other components about the change
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { 
      detail: { favorites: updatedFavorites } 
    }));
    
    return !isFavorite(id);
  };
  
  return {
    favoriteIds,
    isFavorite,
    toggleFavorite
  };
}

// Make sure we export both as named export and default export
export default useFavorites; 