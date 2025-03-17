import React from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import { PropertyCard } from './index';
import { ArrowRight } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with updated spacing for tablet view */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">Featured Properties</h2>
          <Link 
            href="/search" 
            className="text-gray-700 hover:text-gray-800 font-medium flex items-center self-start sm:self-center sm:mt-[12px] md:mt-[12px] lg:mt-0"
          >
            View All
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {/* Property cards grid with consistent sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map(property => (
            <div key={property.id} className="w-full flex justify-center">
              <div className="w-full min-w-[280px] max-w-[400px]">
                <PropertyCard 
                  id={property.id}
                  title={property.title}
                  address={property.address}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  sqft={property.squareFeet || 0}
                  imageUrl={property.photos?.[0] || '/images/property-placeholder.jpg'}
                  status={property.status}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom pagination - with tablet-specific spacing of 18px */}
        <div className="mt-8 sm:mt-[18px] md:mt-[18px] lg:mt-10 text-center">
          <Link 
            href="/search" 
            className="inline-block bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 