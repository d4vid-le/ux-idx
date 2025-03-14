'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface PhotoGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const PhotoGallery = memo(function PhotoGallery({ 
  images, 
  isOpen, 
  onClose, 
  initialIndex = 0 
}: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [mounted, setMounted] = useState(false);
  
  // Client-side only mounting
  useEffect(() => {
    setMounted(true);
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  // Reset loading state when changing images
  useEffect(() => {
    setIsLoading(true);
    setIsZoomed(false);
  }, [currentIndex]);
  
  // Preload adjacent images for smoother experience
  useEffect(() => {
    const preloadImages = () => {
      // Preload current image
      const img = new window.Image();
      img.src = images[currentIndex];
      img.onload = () => {
        setIsLoading(false);
        setLoadedImages(prev => ({ ...prev, [currentIndex]: true }));
      };
      
      // Preload next and previous images if they exist
      [currentIndex + 1, currentIndex - 1].forEach(idx => {
        if (idx >= 0 && idx < images.length) {
          const neighborImg = new window.Image();
          neighborImg.src = images[idx];
          neighborImg.onload = () => {
            setLoadedImages(prev => ({ ...prev, [idx]: true }));
          };
        }
      });
    };
    
    preloadImages();
  }, [currentIndex, images]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'Escape':
          onClose();
          break;
        case 'z':
          toggleZoom();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Scroll the active thumbnail into view
  useEffect(() => {
    const activeThumb = document.querySelector('.gallery-current');
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentIndex]);
  
  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, images.length]);
  
  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);
  
  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);
  
  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);
  
  // Handle click away from image to close
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);
  
  if (!mounted || !isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 z-50 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close gallery"
      >
        <X size={24} />
      </button>
      
      {/* Main image */}
      <div className="relative w-full h-full flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        )}
        
        <div 
          className={`relative max-w-full max-h-[80vh] transition-all duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={toggleZoom}
        >
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            width={1200}
            height={800}
            className={`object-contain max-h-[80vh] transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            priority
          />
        </div>
        
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className={`absolute left-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              disabled={currentIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className={`absolute right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity ${
                currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              disabled={currentIndex === images.length - 1}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        {/* Zoom control */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
          className="absolute bottom-20 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
        </button>
        
        {/* Image counter */}
        <div className="absolute bottom-20 left-4 py-1 px-2 bg-black bg-opacity-50 text-white text-sm rounded">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex justify-center">
            <div className="flex space-x-2 overflow-x-auto p-2 custom-scrollbar">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                  className={`flex-shrink-0 h-16 w-24 relative rounded overflow-hidden border-2 gallery-thumbnail ${
                    currentIndex === index 
                      ? 'border-blue-500 gallery-current' 
                      : 'border-transparent hover:border-white'
                  }`}
                  aria-label={`View image ${index + 1}`}
                  aria-current={currentIndex === index}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      loadedImages[index] ? 'opacity-100' : 'opacity-50'
                    }`}
                  />
                  
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <Loader2 className="h-4 w-4 text-white animate-spin" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default PhotoGallery; 