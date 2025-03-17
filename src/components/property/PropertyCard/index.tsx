import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../../../components/ui/badge';
import { Heart, ArrowUpRight } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

export interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  sqft,
  imageUrl,
  status
}) => {
  // Use our custom favorites hook
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Toggle favorite status on heart click
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation from Link component
    toggleFavorite(id);
  };

  // Format price with commas
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

  // Extract neighborhood (dummy implementation for demo)
  const neighborhood = "Upper East Side";

  return (
    <Link href={`/properties/${id}`}>
      <div className="bg-[#1D1D1D] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer">
        {/* Property Image */}
        <div className="relative h-48 w-full">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover"
          />
          
          {/* Status Badge - Moved inside the image area */}
          <div className="absolute top-2 left-2">
            <Badge className="bg-black/70 text-white hover:bg-black/80">{status}</Badge>
          </div>
          
          {/* Favorite Button */}
          <button 
            className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full text-rose-500 hover:text-rose-600"
            onClick={handleFavoriteClick}
            aria-label={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite(id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>

        {/* Property Info */}
        <div className="p-3 flex-grow flex flex-col text-white">
          {/* Divider line - above the price */}
          <div className="h-[2px] w-full bg-white mb-3"></div>
          
          {/* Price */}
          <div className="mb-1.5">
            <span className="text-xl font-medium">{formattedPrice}</span>
          </div>
          
          {/* Key Property Features */}
          <div className="flex items-center space-x-2 mb-2 text-white text-xs">
            <div className="flex items-center">
              <span>{bedrooms} bd</span>
            </div>
            <div className="text-gray-500">|</div>
            <div className="flex items-center">
              <span>{bathrooms} ba</span>
            </div>
            <div className="text-gray-500">|</div>
            <div className="flex items-center">
              <span>{sqft.toLocaleString()} sq²</span>
            </div>
          </div>
          
          {/* Address */}
          <div className="mb-1">
            <h3 className="text-base font-medium text-white">{address}</h3>
            <p className="text-sm text-gray-400">{neighborhood}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;