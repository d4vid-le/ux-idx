'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

interface FloorPlanViewerProps {
  floorPlanUrl: string;
  title?: string;
}

export default function FloorPlanViewer({
  floorPlanUrl,
  title = 'Floor Plan'
}: FloorPlanViewerProps) {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };
  
  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };
  
  const resetZoom = () => {
    setScale(1);
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        {/* Controls */}
        <div className="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Zoom: {Math.round(scale * 100)}%
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <button 
              onClick={resetZoom}
              className="p-2 rounded hover:bg-gray-100"
              aria-label="Reset zoom"
            >
              <RefreshCw size={18} />
            </button>
            <button 
              onClick={zoomIn}
              disabled={scale >= 2.5}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>
        
        {/* Floor Plan Display */}
        <div className="p-4 overflow-auto h-[500px] flex items-center justify-center">
          <div className="relative" style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-in-out' }}>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
              </div>
            ) : (
              <Image
                src={floorPlanUrl}
                alt="Floor Plan"
                width={1000}
                height={800}
                className="max-w-full h-auto"
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
          Note: This floor plan is for illustrative purposes only. Dimensions and layout may vary.
        </div>
      </div>
    </div>
  );
} 