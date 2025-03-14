import { useState } from 'react';
import PropertyCard from '../PropertyCard';
import { Property } from '../../../types/property';

interface PropertyGridProps {
  properties: Property[];
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  const [sortOption, setSortOption] = useState<string>('newest');

  // Sort properties based on the selected option
  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'beds-desc':
        return b.bedrooms - a.bedrooms;
      case 'sqft-desc':
        return b.sqft - a.sqft;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {properties.length} Properties Found
        </h2>
        <div className="flex items-center">
          <label htmlFor="sort" className="text-sm text-gray-700 mr-2">Sort by:</label>
          <select
            id="sort"
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="beds-desc">Most Bedrooms</option>
            <option value="sqft-desc">Largest Size</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            address={property.address}
            price={property.price}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            sqft={property.sqft}
            imageUrl={property.imageUrl}
            status={property.status}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid; 