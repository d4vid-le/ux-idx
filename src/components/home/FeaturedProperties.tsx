"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for featured properties
const featuredProperties = [
  {
    id: 1,
    title: 'Luxury Waterfront Villa',
    description: 'Stunning 5-bedroom villa with panoramic ocean views and private beach access.',
    price: '$2,450,000',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beds: 5,
    baths: 4,
    sqft: 4200,
    location: 'Miami Beach, FL',
    address: '1234 Ocean Drive',
    neighborhood: 'South Beach'
  },
  {
    id: 2,
    title: 'Modern Downtown Loft',
    description: 'Spacious open-concept loft with high ceilings and floor-to-ceiling windows in the heart of downtown.',
    price: '$875,000',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beds: 2,
    baths: 2,
    sqft: 1800,
    location: 'Seattle, WA',
    address: '567 Pine Street',
    neighborhood: 'Downtown'
  },
  {
    id: 3,
    title: 'Charming Suburban Home',
    description: 'Beautiful family home with a large backyard, updated kitchen, and finished basement.',
    price: '$625,000',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beds: 4,
    baths: 3,
    sqft: 2800,
    location: 'Bellevue, WA',
    address: '8901 Maple Avenue',
    neighborhood: 'Eastgate'
  },
  {
    id: 4,
    title: 'Hillside Retreat',
    description: 'Secluded mountain home with breathtaking views, wrap-around deck, and modern amenities.',
    price: '$1,150,000',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 2.5,
    sqft: 2400,
    location: 'Aspen, CO',
    address: '345 Mountain View Road',
    neighborhood: 'Highland Park'
  },
  {
    id: 5,
    title: 'Beachfront Condo',
    description: 'Fully renovated beachfront condo with stunning ocean views and resort-style amenities.',
    price: '$950,000',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beds: 2,
    baths: 2,
    sqft: 1500,
    location: 'San Diego, CA',
    address: '789 Coastal Highway',
    neighborhood: 'La Jolla'
  },
  {
    id: 6,
    title: 'Historic Brownstone',
    description: 'Beautifully preserved brownstone with original details and modern updates in a prime location.',
    price: '$1,875,000',
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    location: 'Boston, MA',
    address: '123 Beacon Street',
    neighborhood: 'Back Bay'
  },
  {
    id: 7,
    title: 'Lakefront Cabin',
    description: 'Cozy cabin with private dock, fireplace, and panoramic lake views.',
    price: '$575,000',
    images: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 2,
    sqft: 1800,
    location: 'Lake Tahoe, NV',
    address: '456 Lakeshore Drive',
    neighborhood: 'North Shore'
  },
  {
    id: 8,
    title: 'Contemporary Townhouse',
    description: 'Sleek, energy-efficient townhouse with rooftop terrace and smart home features.',
    price: '$725,000',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    location: 'Portland, OR',
    address: '901 Pearl District Way',
    neighborhood: 'Pearl District'
  },
];

interface FeaturedPropertiesProps {
  title?: string;
  subtitle?: string;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ 
  title = "Featured Properties",
  subtitle = "Discover our handpicked selection of exceptional properties"
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 3;
  
  // Track current image index for each property
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{[key: number]: number}>({});
  // Track image transition state
  const [isTransitioning, setIsTransitioning] = useState<{[key: number]: boolean}>({});
  
  // Calculate total pages
  const totalPages = Math.ceil(featuredProperties.length / propertiesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = featuredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Handle image navigation
  const nextImage = (e: React.MouseEvent, propertyId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const property = featuredProperties.find(p => p.id === propertyId);
    if (!property || !property.images || isTransitioning[propertyId]) return;
    
    // Set transitioning state
    setIsTransitioning({
      ...isTransitioning,
      [propertyId]: true
    });
    
    const currentIndex = currentImageIndexes[propertyId] || 0;
    const nextIndex = (currentIndex + 1) % property.images.length;
    
    // Update image after a short delay for transition effect
    setTimeout(() => {
      setCurrentImageIndexes({
        ...currentImageIndexes,
        [propertyId]: nextIndex
      });
      
      // Reset transitioning state after transition completes
      setTimeout(() => {
        setIsTransitioning({
          ...isTransitioning,
          [propertyId]: false
        });
      }, 300);
    }, 100);
  };
  
  const prevImage = (e: React.MouseEvent, propertyId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const property = featuredProperties.find(p => p.id === propertyId);
    if (!property || !property.images || isTransitioning[propertyId]) return;
    
    // Set transitioning state
    setIsTransitioning({
      ...isTransitioning,
      [propertyId]: true
    });
    
    const currentIndex = currentImageIndexes[propertyId] || 0;
    const prevIndex = (currentIndex - 1 + property.images.length) % property.images.length;
    
    // Update image after a short delay for transition effect
    setTimeout(() => {
      setCurrentImageIndexes({
        ...currentImageIndexes,
        [propertyId]: prevIndex
      });
      
      // Reset transitioning state after transition completes
      setTimeout(() => {
        setIsTransitioning({
          ...isTransitioning,
          [propertyId]: false
        });
      }, 300);
    }, 100);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProperties.map((property) => (
            <Link href={`/properties/${property.id}`} key={property.id}>
              <div className="bg-[#1D1D1D] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
                {/* Property Image with Slider */}
                <div className="relative h-60 w-full group">
                  <Image 
                    src={property.images ? property.images[currentImageIndexes[property.id] || 0] : property.image} 
                    alt={property.title}
                    fill
                    className={`object-cover transition-all duration-500 ease-in-out ${isTransitioning[property.id] ? 'opacity-70 scale-105' : 'opacity-100 scale-100'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={indexOfFirstProperty <= property.id && property.id < indexOfFirstProperty + 2}
                  />
                  
                  {/* Navigation Buttons - Only visible on hover */}
                  {property.images && property.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => prevImage(e, property.id)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1.5 text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-opacity-100 hover:scale-110 hover:shadow-md z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={(e) => nextImage(e, property.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1.5 text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-opacity-100 hover:scale-110 hover:shadow-md z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Image Indicator Dots */}
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {property.images.map((_, index) => (
                          <div 
                            key={index} 
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${(currentImageIndexes[property.id] || 0) === index ? 'bg-white w-3' : 'bg-white bg-opacity-50'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Property Content */}
                <div className="p-3 text-white">
                  {/* Divider line - above the price */}
                  <div className="h-[2px] w-full bg-white mb-3"></div>
                  
                  {/* Price */}
                  <div className="mb-1.5">
                    <span className="text-xl font-medium">{property.price}</span>
                  </div>
                  
                  {/* Property Features */}
                  <div className="flex items-center space-x-2 mb-2 text-white text-xs">
                    <div className="flex items-center">
                      <span>{property.beds} bd</span>
                    </div>
                    <div className="text-gray-500">|</div>
                    <div className="flex items-center">
                      <span>{property.baths} ba</span>
                    </div>
                    <div className="text-gray-500">|</div>
                    <div className="flex items-center">
                      <span>{property.sqft} sq²</span>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="mb-1">
                    <h3 className="text-base font-medium text-white">{property.address}</h3>
                    <p className="text-sm text-gray-400">{property.neighborhood}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium  ${
                currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black hover:bg-gray-200'
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft size={18} />
            </button>
            
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === number
                    ? 'z-10 bg-black border-black text-white'
                    : 'bg-white border-gray-300 text-black hover:bg-gray-200'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-black hover:bg-gray-200'
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRight size={18} />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 