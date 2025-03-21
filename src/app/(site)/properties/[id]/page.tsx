'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Phone, Mail, Info, FileText, Home, DollarSign, Printer, Grid, Heart } from 'lucide-react';
import { mockProperties } from '@/data/mockProperties';
import { Property } from '@/types/property';
import { formatPrice, formatDate } from '@/lib/utils/formatting';
import PhotoGallery from '@/components/property/PhotoGallery';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyKeyFacts from '@/components/property/PropertyKeyFacts';
import PropertyLocationMap from '@/components/property/PropertyLocationMap';
import PropertyContactForm from '@/components/property/PropertyContactForm';
import PropertyNeighborhood from '@/components/property/PropertyNeighborhood';
import SimilarProperties from '@/components/property/SimilarProperties';
import MortgageCalculator from '@/components/property/MortgageCalculator';
import ShareModal from '@/components/property/ShareModal';
import FloorPlanViewer from '@/components/property/FloorPlanViewer';
import PropertyPriceHistory from '@/components/property/PropertyPriceHistory';
import ClientOnly from '@/components/ClientOnly';

// Tabs for property details
type Tab = 'overview' | 'features' | 'details' | 'location' | 'floorplan' | 'pricehistory' | 'neighborhood';

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Force a re-render when the gallery opens/closes
  const [key, setKey] = useState(0);

  // More robust gallery management
  const openGallery = useCallback(() => {
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    setGalleryOpen(true);
    setKey(prev => prev + 1); // Force re-render with a new key
  }, []);

  const closeGallery = useCallback(() => {
    document.body.style.overflow = ''; // Restore scrolling
    setGalleryOpen(false);
  }, []);

  // Handle scroll behavior for sticky header and progress bar
  const handleScroll = useCallback(() => {
    if (tabsRef.current) {
      const headerOffset = tabsRef.current.offsetTop;
      setIsHeaderSticky(window.scrollY > headerOffset);

      // Calculate scroll progress for progress bar
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(scrollPercent * 100);
    }
  }, []);

  // Load property data
  useEffect(() => {
    // In a real app, we would fetch the property data from an API
    const foundProperty = mockProperties.find(p => p.id === params.id);
    if (!foundProperty) {
      console.error(`Property with ID ${params.id} not found.`);
    }
    setProperty(foundProperty || null);
    setLoading(false);
  }, [params.id]);

  // Load favorite state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
      setIsFavorite(!!favorites[params.id]);
    }
  }, [params.id]);

  // Handle scroll events
  useEffect(() => {
    // Add scroll event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return undefined;
  }, [handleScroll]);

  // Define the keyboard navigation callback - must be defined even if not used yet
  const handleKeyboardNav = useCallback((e: any) => {
    // Property might be null during loading, so check property and images first
    if (!property) return;
    
    const images: string[] = property.images || [property.imageUrl || ''];
    
    // Only handle keyboard navigation if we're not in a form input
    if (typeof window !== 'undefined' && 
        e.target && 
        'tagName' in e.target && 
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
      return;
    }
    
    if (e.key === 'ArrowRight' && images.length > 1) {
      setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'ArrowLeft' && images.length > 1) {
      setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    }
  }, [property]);

  // Safely attach keyboard event listeners only on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyboardNav);
      return () => {
        window.removeEventListener('keydown', handleKeyboardNav);
      };
    }
    return undefined;
  }, [handleKeyboardNav]);

  // Update the main image when active image index changes
  useEffect(() => {
    if (galleryOpen) {
      // If gallery is open, pass the active index to it
      closeGallery();
      openGallery();
    }
  }, [activeImageIndex, galleryOpen, closeGallery, openGallery]);

  // Keyboard navigation for tabs
  const handleTabKeyNav = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const tabs: Tab[] = ['overview', 'features', 'details', 'location', 'floorplan', 'pricehistory', 'neighborhood'];

      const currentIndex = tabs.indexOf(activeTab);
      const newIndex = e.key === 'ArrowRight'
        ? (currentIndex + 1) % tabs.length
        : (currentIndex - 1 + tabs.length) % tabs.length;

      setActiveTab(tabs[newIndex]);
    }
  };

  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
      if (newState) {
        favorites[params.id] = true;
      } else {
        delete favorites[params.id];
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  // Render error state if no property
  if (!property) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Link href="/search" className="text-gray-700 hover:underline">
          Back to Search
        </Link>
      </div>
    );
  }

  // Get the necessary data for the UI
  const images: string[] = property.images || [property.imageUrl || ''];
  const addressParts = property.address.split(',');
  const streetAddress = addressParts[0].trim();
  const cityStateZip = addressParts.slice(1).join(',').trim();

  // Default agent information if not provided
  const agent = property.agent || {
    name: "Alex Johnson",
    phone: "(212) 555-6789",
    email: "alex.johnson@example.com",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  };

  // Default floorplan
  const floorPlan = property.floorPlan || "https://images.unsplash.com/photo-1580820267682-426da823b514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  return (
    <main className="min-h-screen bg-white relative custom-scrollbar">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gray-700 z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      />

      {/* Back Button and Breadcrumb */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center animate-fade-in">
        <Link href="/search" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={18} className="mr-2" />
          <span>Back to Search</span>
        </Link>
        <Breadcrumb
          items={[
            { label: 'Search', href: '/search' },
            { label: property.address, href: '#' }
          ]}
        />
      </div>

      {/* Open House Banner (if applicable) */}
      <div className="bg-gray-700 text-white py-2 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Calendar size={18} className="mr-2" />
            <span className="font-medium">Open House: Sun, 1:00 PM - 2:30 PM</span>
          </div>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="relative parallax-container">
        <div className="h-[60vh] relative">
          <Image
            src={images[activeImageIndex]}
            alt={property.title}
            fill
            className="object-cover transition-opacity duration-500"
            priority
          />
          
          {/* Image Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { 
                  e.preventDefault();
                  setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <ArrowLeft size={20} />
              </button>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}
          
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              className="bg-white py-2.5 px-4 rounded-md shadow-md hover:bg-gray-100 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 active:scale-95"
              onClick={openGallery}
              aria-label="View all property photos"
              type="button"
              data-testid="view-all-photos-button"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>View All {images.length} Photos</span>
              </span>
            </button>
          </div>
          
          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
              {activeImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="container mx-auto px-4 absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent pt-12 pb-4">
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 h-20 w-28 relative rounded overflow-hidden border-2 transition-all duration-200 ${
                      activeImageIndex === index 
                        ? 'border-blue-500 scale-105' 
                        : 'border-white/40 hover:border-white hover:scale-105'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Property Header with Quick Actions */}
        <div className="container mx-auto px-4 py-6 border-b border-gray-200 animate-fade-in">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {property.address}
              </h1>
              <p className="text-gray-600">
                {property.neighborhood ? `${property.neighborhood}, ` : ''}
                {cityStateZip}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 animate-slide-in-right">
              <button
                onClick={() => window.print()}
                className="flex items-center px-3 py-2 rounded-md bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
              >
                <Printer size={18} className="mr-2" />
                Print
              </button>

              <button
                onClick={() => setShareModalOpen(true)}
                className="flex items-center px-3 py-2 rounded-md bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
              >
                <svg 
                  className="w-[18px] h-[18px] mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                Share
              </button>

              <button
                onClick={toggleFavorite}
                className={`flex items-center px-3 py-2 rounded-md border ${
                  isFavorite 
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Heart 
                  size={18} 
                  className={`mr-2 ${isFavorite ? 'fill-current' : ''}`} 
                />
                {isFavorite ? 'Saved' : 'Save'}
              </button>

              <a
                href={`mailto:${agent.email}?subject=Inquiry about ${property.address}`}
                className="flex items-center px-3 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800"
              >
                <Mail size={18} className="mr-2" />
                Contact Agent
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation - with sticky option */}
        <div
          ref={tabsRef}
          className={`border-b border-gray-200 mb-6 sticky-tabs-container ${isHeaderSticky ? 'sticky top-0 z-30 bg-white shadow-md sticky' : ''}`}
        >
          <div className="container mx-auto px-4">
            <nav className="flex -mb-px overflow-x-auto scrollbar-hide" role="tablist">
              <button
                onClick={() => setActiveTab('overview')}
                onKeyDown={handleTabKeyNav}
                className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-gray-700 text-gray-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                role="tab"
                aria-selected={activeTab === 'overview'}
                aria-controls="tab-overview"
                id="tab-button-overview"
                tabIndex={activeTab === 'overview' ? 0 : -1}
              >
                <div className="flex items-center">
                  <Home size={16} className="mr-2" />
                  Overview
                </div>
              </button>
              <button
                onClick={() => setActiveTab('features')}
                onKeyDown={handleTabKeyNav}
                className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                  activeTab === 'features'
                    ? 'border-gray-700 text-gray-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                role="tab"
                aria-selected={activeTab === 'features'}
                aria-controls="tab-features"
                id="tab-button-features"
                tabIndex={activeTab === 'features' ? 0 : -1}
              >
                <div className="flex items-center">
                  <Info size={16} className="mr-2" />
                  Features & Amenities
                </div>
              </button>
              <button
                onClick={() => setActiveTab('details')}
                onKeyDown={handleTabKeyNav}
                className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                  activeTab === 'details'
                    ? 'border-gray-700 text-gray-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                role="tab"
                aria-selected={activeTab === 'details'}
                aria-controls="tab-details"
                id="tab-button-details"
                tabIndex={activeTab === 'details' ? 0 : -1}
              >
                <div className="flex items-center">
                  <FileText size={16} className="mr-2" />
                  Property Details
                </div>
              </button>
              <button
                onClick={() => setActiveTab('location')}
                onKeyDown={handleTabKeyNav}
                className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                  activeTab === 'location'
                    ? 'border-gray-700 text-gray-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                role="tab"
                aria-selected={activeTab === 'location'}
                aria-controls="tab-location"
                id="tab-button-location"
                tabIndex={activeTab === 'location' ? 0 : -1}
              >
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Location & Neighborhood
                </div>
              </button>
              <button
                onClick={() => setActiveTab('floorplan')}
                onKeyDown={handleTabKeyNav}
                className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                  activeTab === 'floorplan'
                    ? 'border-gray-700 text-gray-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                role="tab"
                aria-selected={activeTab === 'floorplan'}
                aria-controls="tab-floorplan"
                id="tab-button-floorplan"
                tabIndex={activeTab === 'floorplan' ? 0 : -1}
              >
                <div className="flex items-center">
                  <Grid size={16} className="mr-2" />
                  Floor Plan
                </div>
              </button>
              <button
                onClick={() => setActiveTab('pricehistory')}
                onKeyDown={handleTabKeyNav}
                className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                  activeTab === 'pricehistory'
                    ? 'border-gray-700 text-gray-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                role="tab"
                aria-selected={activeTab === 'pricehistory'}
                aria-controls="tab-pricehistory"
                id="tab-button-pricehistory"
                tabIndex={activeTab === 'pricehistory' ? 0 : -1}
              >
                <div className="flex items-center">
                  <DollarSign size={16} className="mr-2" />
                  Price History
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 animate-fade-in animate-delay-300">
              <div
                id="tab-overview"
                role="tabpanel"
                aria-labelledby="tab-button-overview"
                className={activeTab === 'overview' ? '' : 'hidden'}
              >
                <div>
                  <h2 className="text-xl font-bold mb-4">Property Description</h2>
                  <div className="prose max-w-none mb-6">
                    <p className="whitespace-pre-line">{property.description || "This stunning property offers modern living in a desirable location. Contact us for more details about this exceptional home."}</p>
                  </div>

                  {/* Key Facts */}
                  <PropertyKeyFacts
                    price={property.price}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    sqft={property.sqft}
                    propertyType={property.propertyType || 'Condo'}
                    yearBuilt={property.yearBuilt || 1985}
                    commonCharges={property.commonCharges || 3200}
                    realEstateTax={property.realEstateTax || 2000}
                  />

                  {/* Quick Overview of Features */}
                  {property.features && property.features.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                          {property.features.slice(0, 6).map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                        {property.features.length > 6 && (
                          <div className="mt-3 text-center">
                            <button
                              onClick={() => setActiveTab('features')}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                            >
                              View all {property.features.length} features
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mortgage Calculator - Moved from sidebar to overview section */}
                  <div className="mt-8 mb-8 bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Mortgage Calculator</h3>
                    <MortgageCalculator propertyPrice={property.price} />
                  </div>
                </div>
              </div>

              <div
                id="tab-features"
                role="tabpanel"
                aria-labelledby="tab-button-features"
                className={activeTab === 'features' ? '' : 'hidden'}
              >
                <div>
                  {property.features && property.features.length > 0 && (
                    <PropertyFeatures
                      title="Interior Features"
                      features={property.features}
                      iconType="check"
                    />
                  )}

                  {property.amenities && property.amenities.length > 0 && (
                    <PropertyFeatures
                      title="Building Amenities"
                      features={property.amenities}
                      iconType="check"
                    />
                  )}
                </div>
              </div>

              <div
                id="tab-details"
                role="tabpanel"
                aria-labelledby="tab-button-details"
                className={activeTab === 'details' ? '' : 'hidden'}
              >
                <PropertyDetails
                  title="Property Details"
                  details={[
                    { label: 'Property Type', value: property.propertyType || 'Residential' },
                    { label: 'Year Built', value: property.yearBuilt || 2000 },
                    { label: 'Status', value: property.status },
                    { label: 'MLS ID', value: `RLS${property.id.padStart(8, '0')}` },
                    { label: 'Common Charges', value: property.commonCharges || 2000 },
                    { label: 'Real Estate Tax', value: property.realEstateTax || 1800 },
                    { label: 'Maintenance Fee Frequency', value: 'Monthly' },
                    { label: 'Garage', value: 'Yes' },
                    { label: 'Parking', value: 'Garage' },
                    { label: 'View', value: 'Yes' },
                    { label: 'County', value: 'New York' },
                    { label: 'Pets Allowed', value: 'Yes' },
                    { label: 'Listed Date', value: formatDate(property.createdAt) },
                    { label: 'Last Updated', value: formatDate(property.createdAt) }
                  ]}
                />
              </div>

              <div
                id="tab-location"
                role="tabpanel"
                aria-labelledby="tab-button-location"
                className={activeTab === 'location' ? '' : 'hidden'}
              >
                <PropertyLocationMap
                  address={property.address}
                  location={property.location}
                  neighborhood={property.neighborhood}
                />
                
                {/* Neighborhood section moved here */}
                <div className="mt-8">
                  <PropertyNeighborhood
                    neighborhood={property.neighborhood}
                    address={property.address}
                  />
                </div>
              </div>

              <div
                id="tab-floorplan"
                role="tabpanel"
                aria-labelledby="tab-button-floorplan"
                className={activeTab === 'floorplan' ? '' : 'hidden'}
              >
                <FloorPlanViewer
                  floorPlanUrl={floorPlan}
                  title={`${property.bedrooms} Bed ${property.bathrooms} Bath Floor Plan`}
                />
              </div>

              <div
                id="tab-pricehistory"
                role="tabpanel"
                aria-labelledby="tab-button-pricehistory"
                className={activeTab === 'pricehistory' ? '' : 'hidden'}
              >
                <PropertyPriceHistory
                  propertyId={property.id}
                  currentPrice={property.price}
                  estimatedValue={property.price * 0.95}
                  neighborhoodMedianPrice={1850000}
                  yearBuilt={property.yearBuilt || 2000}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 animate-slide-in-right animate-delay-400">
              {/* Contact Form */}
              <PropertyContactForm
                agent={agent}
                propertyId={property.id}
                propertyAddress={property.address}
              />

              {/* Open House Schedule */}
              <div className="border border-gray-200 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-gray-900 mb-4">Open House Schedule</h3>
                <div className="mb-4">
                  <div className="font-medium">Sun, Mar 16th</div>
                  <div className="text-gray-600">1:00 PM - 2:30 PM EDT</div>
                </div>
                <button className="w-full flex items-center justify-center bg-gray-700 text-white py-3 rounded font-medium hover:bg-gray-800 transition-colors">
                  <Calendar size={18} className="mr-2" />
                  Schedule a Viewing
                </button>
              </div>

              {/* REBNY Information */}
              <div className="border border-gray-200 rounded-lg p-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">MLS® ID</div>
                    <div className="font-medium">RLS20008574</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Listed</div>
                    <div className="font-medium">{formatDate(property.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Updated</div>
                    <div className="font-medium">{formatDate(property.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Listing Courtesy of</div>
                    <div className="font-medium">REBNY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REBNY Disclaimer */}
        <div className="bg-gray-50 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700 mb-2">Listed by</div>
                <div className="font-bold text-lg">Compass</div>
                <div className="text-sm text-gray-600 mt-1">Licensed Real Estate Broker</div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <Image
                src="https://www.compass.com/ucfe-assets/listing-assets/latest/img/compliance/NYCListingCompliance.png"
                alt="NYC Listing Compliance"
                width={120}
                height={60}
                className="max-h-[60px] w-auto object-contain"
                priority
              />
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Data last updated on {formatDate(new Date().toISOString())} at 4:48 PM UTC
            </p>

            <div className="flex flex-wrap justify-center mt-6 gap-4">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">FAIR</span>
                </div>
                <span className="text-xs text-gray-600">Fair Housing</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">EQUAL</span>
                </div>
                <span className="text-xs text-gray-600">Equal Opportunity</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">MLS</span>
                </div>
                <span className="text-xs text-gray-600">MLS Listing</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">REBNY</span>
                </div>
                <span className="text-xs text-gray-600">REBNY Listing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <SimilarProperties
          properties={mockProperties}
          currentPropertyId={property.id}
        />

        {/* Back to Top Button - appears when scrolled down */}
        {scrollProgress > 20 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-6 bottom-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 z-[100] button-interactive animate-pulse-blue"
            aria-label="Back to top"
            style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Full-screen Photo Gallery */}
      <ClientOnly>
        {galleryOpen && images.length > 0 && (
          <PhotoGallery
            images={images}
            isOpen={galleryOpen}
            onClose={closeGallery}
            initialIndex={activeImageIndex}
            key={key}
          />
        )}
      </ClientOnly>

      {/* Share Modal */}
      {shareModalOpen && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          propertyId={property.id}
          propertyAddress={property.address}
          propertyImage={images[0]}
        />
      )}
    </main>
  );
}
