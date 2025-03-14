'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Mail, Phone, Calendar, ArrowRight, Shield } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

interface PropertyInquiryModalProps {
  propertyId: string;
  propertyAddress: string;
  propertyPrice: number;
  propertyBedrooms: number;
  propertyBathrooms: number;
  propertyImage: string;
  agentImage?: string;
  agentName?: string;
  className?: string;
}

export default function PropertyInquiryModal({
  propertyId,
  propertyAddress,
  propertyPrice,
  propertyBedrooms,
  propertyBathrooms,
  propertyImage,
  agentImage,
  agentName,
  className = ''
}: PropertyInquiryModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`I'm interested in this property at ${propertyAddress}. Please contact me with more information.`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{email?: string; phone?: string}>({});
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Show modal when user scrolls near the end of the page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      // Check if user has seen this modal before in this session
      const hasSeenModal = sessionStorage.getItem('hasSeenInquiryModal');
      
      if (hasSeenModal) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show modal when user has scrolled through 75% of the page
      if (scrollPosition + windowHeight > documentHeight * 0.75) {
        setIsVisible(true);
        // Track the view event
        try {
          if (typeof window !== 'undefined' && 'dataLayer' in window) {
            (window as any).dataLayer.push({
              event: 'inquiry_modal_view',
              property_id: propertyId,
              property_price: propertyPrice
            });
          }
        } catch (error) {
          console.error('Analytics event failed', error);
        }
        sessionStorage.setItem('hasSeenInquiryModal', 'true');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [propertyId, propertyPrice]);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && !isMinimized) {
        handleMinimize();
      }
    };
    
    if (isVisible && !isMinimized && !isSubmitted) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, isMinimized, isSubmitted]);
  
  // Hide modal after 15 seconds if not interacted with
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isVisible && !isMinimized && !isSubmitted) {
      timeout = setTimeout(() => {
        setIsMinimized(true);
        // Track minimize event
        try {
          if (typeof window !== 'undefined' && 'dataLayer' in window) {
            (window as any).dataLayer.push({
              event: 'inquiry_modal_auto_minimize',
              property_id: propertyId
            });
          }
        } catch (error) {
          console.error('Analytics event failed', error);
        }
      }, 15000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isVisible, isMinimized, isSubmitted, propertyId]);
  
  const handleClose = () => {
    setIsVisible(false);
    // Track close event
    try {
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'inquiry_modal_close',
          property_id: propertyId
        });
      }
    } catch (error) {
      console.error('Analytics event failed', error);
    }
  };
  
  const handleMinimize = () => {
    setIsMinimized(true);
    // Track minimize event
    try {
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'inquiry_modal_minimize',
          property_id: propertyId
        });
      }
    } catch (error) {
      console.error('Analytics event failed', error);
    }
  };
  
  const handleMaximize = () => {
    setIsMinimized(false);
    // Track maximize event
    try {
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'inquiry_modal_maximize',
          property_id: propertyId
        });
      }
    } catch (error) {
      console.error('Analytics event failed', error);
    }
  };
  
  const validateForm = () => {
    const newErrors: {email?: string; phone?: string} = {};
    let isValid = true;
    
    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate phone if provided
    if (phone && !/^[0-9\-\+\(\)\s]{10,15}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Track form submission attempt
    try {
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'inquiry_form_submit',
          property_id: propertyId
        });
      }
    } catch (error) {
      console.error('Analytics event failed', error);
    }
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Track successful submission
      try {
        if (typeof window !== 'undefined' && 'dataLayer' in window) {
          (window as any).dataLayer.push({
            event: 'inquiry_form_success',
            property_id: propertyId
          });
        }
      } catch (error) {
        console.error('Analytics event failed', error);
      }
      
      // Close modal after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 1500);
  };
  
  const handleScheduleTour = () => {
    try {
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'schedule_tour_click',
          property_id: propertyId
        });
      }
    } catch (error) {
      console.error('Analytics event failed', error);
    }
    
    window.open(`/properties/${propertyId}/schedule`, '_blank');
    handleClose();
  };
  
  const handleCallAgent = () => {
    try {
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'call_agent_click',
          property_id: propertyId
        });
      }
    } catch (error) {
      console.error('Analytics event failed', error);
    }
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className={`fixed bottom-0 right-0 z-50 transition-all duration-300 ease-in-out max-w-md w-full md:w-96 ${className} animate-slide-in-up`}>
      {isMinimized ? (
        <div 
          className="bg-blue-600 text-white p-4 rounded-lg shadow-xl cursor-pointer flex items-center justify-between m-4 button-interactive"
          onClick={handleMaximize}
          role="button"
          aria-expanded="false"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleMaximize()}
        >
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-3" />
            <span className="font-medium">Interested in this property?</span>
          </div>
          <ArrowRight className="w-5 h-5" />
        </div>
      ) : (
        <div 
          ref={modalRef}
          className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 m-4"
          role="dialog"
          aria-labelledby="inquiry-modal-title"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 id="inquiry-modal-title" className="font-bold text-lg">Get More Info About This Property</h3>
            <div className="flex space-x-2">
              <button 
                onClick={handleMinimize}
                className="text-white p-1 hover:bg-blue-700 rounded"
                aria-label="Minimize"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              </button>
              <button 
                onClick={handleClose}
                className="text-white p-1 hover:bg-blue-700 rounded"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {isSubmitted ? (
            <div className="p-6 animate-fade-in">
              <div className="bg-green-50 p-4 rounded-md border border-green-100 mb-4">
                <h4 className="font-medium text-green-800 mb-1">Thank you for your interest!</h4>
                <p className="text-sm text-green-700">
                  We've received your inquiry and will get back to you shortly.
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleClose}
                  className="py-2 px-4 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
                <button
                  onClick={handleScheduleTour}
                  className="py-2 px-4 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Calendar className="w-4 h-4 inline-block mr-1" />
                  Schedule a Tour
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Property Brief */}
              <div className="flex p-4 border-b border-gray-200">
                <div className="w-20 h-20 relative flex-shrink-0 mr-3 rounded overflow-hidden image-hover-zoom">
                  <Image
                    src={propertyImage}
                    alt={propertyAddress}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold price-highlight">{formatPrice(propertyPrice)}</div>
                  <div className="text-sm text-gray-700">{propertyBedrooms} bd, {propertyBathrooms} ba</div>
                  <div className="text-sm text-gray-700 text-gradient-mask overflow-hidden text-ellipsis">{propertyAddress}</div>
                </div>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="your@email.com"
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="(123) 456-7890"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {agentImage && (
                      <div className="w-10 h-10 relative rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={agentImage}
                          alt={agentName || 'Listing Agent'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="text-sm">
                      <p>I'm interested in this property.</p>
                      <p className="text-gray-600">{agentName ? `Contact ${agentName}` : 'Contact the listing agent'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 button-interactive"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleCallAgent}
                      className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 button-interactive"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Agent
                    </button>
                    <button
                      type="button"
                      onClick={handleScheduleTour}
                      className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 button-interactive"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Tour
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 flex items-start">
                  <Shield size={14} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <p>
                    By submitting, you agree to receive communications from the listing agent or broker.
                    Message and data rates may apply. Your information is protected and will not be shared with third parties.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
} 