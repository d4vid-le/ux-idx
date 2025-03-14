'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, Send, Loader2, Shield, Calendar, Phone } from 'lucide-react';
import Image from 'next/image';

// Define form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to our terms and privacy policy',
  }),
});

// Type for our form
type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface PropertyContactFormProps {
  propertyId: string;
  propertyAddress: string;
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
    rating?: number;
    reviews?: number;
  };
}

export default function PropertyContactForm({
  propertyId,
  propertyAddress,
  agent,
}: PropertyContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [interactionTime, setInteractionTime] = useState<number>(0);
  
  // Set up form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, touchedFields },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      message: `Hi${agent?.name ? ` ${agent.name}` : ''}, I'm interested in ${propertyAddress}. Please provide more information.`,
      terms: false,
    }
  });
  
  // Track interaction time for analytics
  useEffect(() => {
    if (isDirty && !interacted) {
      setInteracted(true);
      setInteractionTime(Date.now());
    }
  }, [isDirty, interacted]);
  
  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Track form submission with analytics
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'contact_form_submit',
          property_id: propertyId,
          interaction_time_seconds: interactionTime ? Math.floor((Date.now() - interactionTime) / 1000) : 0,
        });
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setIsSubmitted(true);
      reset();
      
      // Track successful submission
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'contact_form_success',
          property_id: propertyId,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('There was an error submitting your request. Please try again.');
      
      // Track form error
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'contact_form_error',
          property_id: propertyId,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleScheduleTour = () => {
    // Track schedule tour click
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as any).dataLayer.push({
        event: 'schedule_tour_click',
        property_id: propertyId,
        source: 'contact_form',
      });
    }
    
    window.open(`/properties/${propertyId}/schedule`, '_blank');
  };
  
  const handlePhoneCall = () => {
    // Track phone call click
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as any).dataLayer.push({
        event: 'call_agent_click',
        property_id: propertyId,
        source: 'contact_form',
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm property-contact-form">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Contact {agent?.name}</h3>
        <p className="text-sm text-gray-600">
          Ask a question or schedule a tour
        </p>
      </div>
      
      {/* Agent Info */}
      <div className="flex items-center mb-5 gap-3">
        {agent?.image ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            {agent?.name ? agent.name.charAt(0) : '?'}
          </div>
        )}
        <div>
          <div className="font-medium">{agent?.name}</div>
          {agent?.rating && (
            <div className="flex items-center text-sm">
              <div className="flex text-yellow-400 mr-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${i < Math.floor(agent.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">{agent.rating || 0} ({agent.reviews || 0} reviews)</span>
            </div>
          )}
        </div>
      </div>
      
      {isSubmitted ? (
        <div className="rounded-md bg-green-50 p-4 animate-fade-in">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Message Sent!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Thanks for reaching out! {agent?.name} will get back to you shortly.</p>
              </div>
              <div className="mt-4">
                <div className="flex space-x-3">
                  <button
                    onClick={handleScheduleTour}
                    className="inline-flex items-center rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 button-interactive"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
          {formError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{formError}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="Your name"
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="you@example.com"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone (Optional)
            </label>
            <input
              id="phone"
              type="tel"
              className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="(123) 456-7890"
              {...register('phone')}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              className={`w-full px-3 py-2 border ${errors.message ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              {...register('message')}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5 mt-1">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                {...register('terms')}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className={`font-medium ${errors.terms ? 'text-red-700' : 'text-gray-700'}`}>
                I agree to the terms and privacy policy
              </label>
              {errors.terms && (
                <p className="text-red-600">{errors.terms.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-colors button-interactive"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handlePhoneCall}
                className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors button-interactive"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call {agent?.name ? agent.name.split(' ')[0] : 'Agent'}
              </button>
              <button
                type="button" 
                onClick={handleScheduleTour}
                className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors button-interactive"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Tour
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500 flex items-start">
            <Shield className="text-gray-400 mt-0.5 mr-2 flex-shrink-0 h-3.5 w-3.5" />
            <p>
              Your information is secure and will only be shared with this agent. By contacting us, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </form>
      )}
    </div>
  );
} 