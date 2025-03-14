'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, Calendar, MapPin, Phone, Mail, Info, FileText, Home, DollarSign, Printer, Grid } from 'lucide-react';
import { mockProperties } from '@/data/mockProperties';
import { Property } from '@/types/property';
import { formatPrice, formatDate } from '@/lib/utils';
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
import Footer from '@/components/layout/Footer';

// Tabs for property details
type Tab = 'overview' | 'features' | 'details' | 'location' | 'neighborhood' | 'floorplan' | 'pricehistory';

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

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // In a real app, we would fetch the property data from an API
    const foundProperty = mockProperties.find(p => p.id === params.id);
    setProperty(foundProperty || null);
    setLoading(false);
  }, [params.id]);

  // Keyboard navigation for tabs
  const handleTabKeyNav = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const tabs: Tab[] = ['overview', 'features', 'details'];
      if (property?.floorPlan) tabs.push('floorplan');
      tabs.push('pricehistory', 'location', 'neighborhood');
      
      const currentIndex = tabs.indexOf(activeTab);
      const newIndex = e.key === 'ArrowRight'
        ? (currentIndex + 1) % tabs.length
        : (currentIndex - 1 + tabs.length) % tabs.length;
      
      setActiveTab(tabs[newIndex]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Link href="/search" className="text-blue-600 hover:underline">
          Back to Search
        </Link>
      </div>
    );
  }

  const images = property.images || [property.imageUrl];
  
  // Format address parts for better display
  const addressParts = property.address.split(',');
  const streetAddress = addressParts[0].trim();
  const cityStateZip = addressParts.slice(1).join(',').trim();

  // Prepare property details for the details tab
  const propertyDetails = [
    { label: 'Property Type', value: property.propertyType },
    { label: 'Year Built', value: property.yearBuilt || 0 },
    { label: 'Status', value: property.status },
    { label: 'MLS ID', value: 'RLS20008574' },
    { label: 'Common Charges', value: property.commonCharges },
    { label: 'Real Estate Tax', value: property.realEstateTax },
    { label: 'Maintenance Fee Frequency', value: 'Monthly' },
    { label: 'Garage', value: 'Yes' },
    { label: 'Parking', value: 'Garage' },
    { label: 'View', value: 'Yes' },
    { label: 'County', value: 'New York' },
    { label: 'Pets Allowed', value: 'Yes' },
    { label: 'Listed Date', value: formatDate(property.createdAt) },
    { label: 'Last Updated', value: formatDate(property.createdAt) }
  ];

  return (
    <main className="min-h-screen bg-white relative custom-scrollbar">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300 ease-out"
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
            { label: streetAddress }
          ]}
        />
      </div>

      {/* Open House Banner (if applicable) */}
      <div className="bg-blue-600 text-white py-2 animate-fade-in">
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
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <button 
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart size={20} className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-700"} />
            </button>
            <button 
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              onClick={() => setShareModalOpen(true)}
            >
              <Share2 size={20} className="text-gray-700" />
            </button>
          </div>
          
          {/* Media Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
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
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-md font-medium">
            {property.status}
          </div>
        </div>
        
        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="container mx-auto px-4 -mt-16 relative z-10">
            <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 h-24 w-32 relative rounded overflow-hidden ${
                    activeImageIndex === index ? 'ring-2 ring-blue-600' : ''
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
              {streetAddress}
            </h1>
            <p className="text-gray-600 mb-2">
              {property.neighborhood ? `${property.neighborhood}, ` : ''}
              {cityStateZip}
            </p>
            <div className="text-3xl font-bold text-blue-600 mb-4 price-highlight">
              {formatPrice(property.price)}
            </div>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 animate-slide-in-right">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center px-3 py-2 rounded-md ${
                isFavorite 
                  ? 'bg-red-50 text-red-600 border border-red-200' 
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Heart size={18} className={`mr-2 ${isFavorite ? 'fill-red-500' : ''}`} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
            
            <button 
              onClick={() => setShareModalOpen(true)}
              className="flex items-center px-3 py-2 rounded-md bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
            >
              <Share2 size={18} className="mr-2" />
              Share
            </button>
            
            <button 
              onClick={() => window.print()}
              className="flex items-center px-3 py-2 rounded-md bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
            >
              <Printer size={18} className="mr-2" />
              Print
            </button>
            
            <a 
              href={`mailto:${property.agent?.email || 'agent@example.com'}?subject=Inquiry about ${property.address}`}
              className="flex items-center px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              <Mail size={18} className="mr-2" />
              Contact Agent
            </a>
          </div>
        </div>
      </div>
      
      {/* Key Facts */}
      <div className="container mx-auto px-4 mb-8 animate-slide-in-up animate-delay-200">
        <PropertyKeyFacts 
          price={property.price}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          sqft={property.sqft}
          propertyType={property.propertyType}
          yearBuilt={property?.yearBuilt || 0}
          commonCharges={property.commonCharges}
          realEstateTax={property.realEstateTax}
        />
      </div>

      {/* Tab Navigation - with sticky option */}
      <div 
        ref={tabsRef}
        className={`border-b border-gray-200 mb-6 sticky-tabs-container ${
          isHeaderSticky ? 'sticky top-0 z-30 bg-white shadow-md sticky' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex -mb-px overflow-x-auto scrollbar-hide" role="tablist">
            <button
              onClick={() => setActiveTab('overview')}
              onKeyDown={handleTabKeyNav}
              className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
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
                  ? 'border-blue-600 text-blue-600'
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
                  ? 'border-blue-600 text-blue-600'
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
            {property.floorPlan && (
              <button
                onClick={() => setActiveTab('floorplan')}
                onKeyDown={handleTabKeyNav}
                className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                  activeTab === 'floorplan'
                    ? 'border-blue-600 text-blue-600'
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
            )}
            <button
              onClick={() => setActiveTab('pricehistory')}
              onKeyDown={handleTabKeyNav}
              className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === 'pricehistory'
                  ? 'border-blue-600 text-blue-600'
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
            <button
              onClick={() => setActiveTab('location')}
              onKeyDown={handleTabKeyNav}
              className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === 'location'
                  ? 'border-blue-600 text-blue-600'
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
                Location
              </div>
            </button>
            <button
              onClick={() => setActiveTab('neighborhood')}
              onKeyDown={handleTabKeyNav}
              className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === 'neighborhood'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              role="tab"
              aria-selected={activeTab === 'neighborhood'}
              aria-controls="tab-neighborhood"
              id="tab-button-neighborhood"
              tabIndex={activeTab === 'neighborhood' ? 0 : -1}
            >
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                Neighborhood
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Property Content */}
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
                <div className="prose max-w-none mb-8">
                  <p className="whitespace-pre-line">{property.description}</p>
                </div>
                
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Location Preview */}
                <PropertyLocationMap 
                  address={property.address}
                  location={property.location}
                  neighborhood={property.neighborhood}
                />
                
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
              <PropertyDetails title="Property Details" details={propertyDetails} />
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
            </div>
            
            <div
              id="tab-neighborhood"
              role="tabpanel"
              aria-labelledby="tab-button-neighborhood"
              className={activeTab === 'neighborhood' ? '' : 'hidden'}
            >
              <PropertyNeighborhood 
                neighborhood={property.neighborhood}
                address={property.address}
              />
            </div>
            
            <div
              id="tab-floorplan"
              role="tabpanel"
              aria-labelledby="tab-button-floorplan"
              className={activeTab === 'floorplan' ? '' : 'hidden'}
            >
              {property.floorPlan && (
                <FloorPlanViewer
                  floorPlanUrl={property.floorPlan}
                  title={`${property.bedrooms} Bed ${property.bathrooms} Bath Floor Plan`}
                />
              )}
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
                yearBuilt={property?.yearBuilt || 0}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 animate-slide-in-right animate-delay-400">
            {/* Contact Form */}
            <PropertyContactForm 
              agent={property?.agent || undefined}
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
              <button className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors">
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
                  <div className="font-medium">Keller Williams NYC</div>
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
              <div className="font-bold text-lg">Keller Williams NYC</div>
              <div className="text-sm text-gray-600 mt-1">Licensed Real Estate Broker</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 relative mr-3">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 font-bold">
                REBNY
              </div>
            </div>
            <div className="text-sm text-gray-600">
              This listing is provided courtesy of the Real Estate Board of New York (REBNY) and complies with all REBNY Residential Listing Service (RLS) guidelines.
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
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

      {/* Photo Gallery Modal */}
      <ClientOnly>
        {galleryOpen && (
          <PhotoGallery 
            key={`gallery-${key}`}
            images={images}
            isOpen={galleryOpen}
            onClose={closeGallery}
            initialIndex={activeImageIndex}
          />
        )}
      </ClientOnly>
      
      {/* Share Modal */}
      <ClientOnly>
        {shareModalOpen && (
          <ShareModal 
            isOpen={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
            propertyAddress={property.address}
            propertyUrl={typeof window !== 'undefined' ? window.location.href : `https://example.com/properties/${property.id}`}
          />
        )}
      </ClientOnly>

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

      {/* Footer component */}
      <Footer />
    </main>
  );
} 