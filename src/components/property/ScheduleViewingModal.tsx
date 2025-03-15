'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Calendar, Clock, User, Phone, Mail, Check } from 'lucide-react';
import Image from 'next/image';

// Define the form validation schema
const scheduleFormSchema = z.object({
  date: z.string().min(1, { message: 'Please select a date' }),
  timeSlot: z.string().min(1, { message: 'Please select a time slot' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }).optional(),
  message: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to terms and conditions',
  }),
});

type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

// Generate available dates for the next 2 weeks
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  // Start from tomorrow
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip Sundays (0) and Saturdays (6)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
      });
    }
  }
  
  return dates;
};

// Time slots
const timeSlots = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
];

interface ScheduleViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyAddress: string;
  propertyImage: string;
  agent?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
  };
}

export default function ScheduleViewingModal({
  isOpen,
  onClose,
  propertyId,
  propertyAddress,
  propertyImage,
  agent,
}: ScheduleViewingModalProps) {
  const [step, setStep] = useState<'date' | 'info' | 'confirmation'>('date');
  const [availableDates] = useState(generateAvailableDates());
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }, 
    setValue,
    reset,
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      date: '',
      timeSlot: '',
      name: '',
      email: '',
      phone: '',
      message: '',
      agreeToTerms: false,
    }
  });

  // Reset component state when modal is opened
  useEffect(() => {
    if (isOpen) {
      setStep('date');
      reset();
    }
  }, [isOpen, reset]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Watch selected date to simulate time slot availability
  const selectedDate = watch('date');
  
  // Update available time slots when date changes (simulated availability)
  useEffect(() => {
    if (selectedDate) {
      // In a real app, we would fetch available time slots from the backend
      // Here we're just simulating by removing random time slots
      const date = new Date(selectedDate);
      const dayOfWeek = date.getDay();
      
      // Generate different available slots based on day of week for demo purposes
      let availableSlots = [...timeSlots];
      
      if (dayOfWeek === 1 || dayOfWeek === 3) { // Monday or Wednesday
        availableSlots = availableSlots.filter((slot, idx) => idx % 2 === 0);
      } else if (dayOfWeek === 2 || dayOfWeek === 4) { // Tuesday or Thursday
        availableSlots = availableSlots.filter((slot, idx) => idx % 2 === 1);
      } else if (dayOfWeek === 5) { // Friday
        availableSlots = availableSlots.filter((slot, idx) => idx > 2 && idx < 7);
      }
      
      setAvailableTimeSlots(availableSlots);
      setValue('timeSlot', ''); // Reset selected time slot
    }
  }, [selectedDate, setValue]);

  const onSubmit = async (data: ScheduleFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send the data to the backend
      // Here we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you'd typically send data to your API
      console.log('Scheduling viewing:', data);
      
      // Simulate API response
      const bookingResponse = {
        id: `booking-${Date.now()}`,
        propertyId,
        agentId: agent?.id || 'unknown',
        userId: 'current-user-id', // In a real app, you'd get this from auth context
        date: data.date,
        timeSlot: data.timeSlot,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // In a real app, you might dispatch this to your state management system
      // For now, we'll store it in localStorage to simulate persistence
      const existingBookings = JSON.parse(localStorage.getItem('propertyViewings') || '[]');
      localStorage.setItem('propertyViewings', JSON.stringify([
        ...existingBookings,
        bookingResponse
      ]));
      
      // Also update agent's pending viewings
      const agentViewings = JSON.parse(localStorage.getItem('agentViewings') || '{}');
      const agentId = agent?.id || 'unknown';
      
      localStorage.setItem('agentViewings', JSON.stringify({
        ...agentViewings,
        [agentId]: [
          ...(agentViewings[agentId] || []),
          bookingResponse
        ]
      }));
      
      // Move to confirmation step
      setStep('confirmation');
    } catch (error) {
      console.error('Error scheduling viewing:', error);
      alert('There was an error scheduling your viewing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal handler
  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  // Exit if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-viewing-title"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900" id="schedule-viewing-title">
            {step === 'confirmation' ? 'Viewing Scheduled!' : 'Schedule a Viewing'}
          </h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Property Summary */}
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
          <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden relative flex-shrink-0">
            <Image 
              src={propertyImage} 
              alt={propertyAddress}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 line-clamp-1">{propertyAddress}</h3>
            {agent && (
              <p className="text-sm text-gray-500">Listed by {agent.name}</p>
            )}
          </div>
        </div>

        {/* Modal content based on step */}
        <div className="overflow-y-auto flex-grow">
          {step === 'date' && (
            <div className="p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                Select a Date
              </h3>
              
              <div className="mb-6">
                <label htmlFor="date" className="sr-only">Date</label>
                <div className="grid grid-cols-2 gap-2 mb-1">
                  {availableDates.map((date) => (
                    <label 
                      key={date.value}
                      className={`
                        border rounded-md p-3 text-center cursor-pointer transition-colors hover:border-blue-500
                        ${watch('date') === date.value ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-gray-200 text-gray-700'}
                      `}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        value={date.value}
                        {...register('date')}
                      />
                      <span className="block">{date.label}</span>
                    </label>
                  ))}
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                )}
              </div>
              
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                {selectedDate ? 'Select a Time' : 'Select a date first'}
              </h3>
              
              <div className="mb-6">
                <label htmlFor="timeSlot" className="sr-only">Time Slot</label>
                <div className={`grid grid-cols-3 gap-2 mb-1 ${!selectedDate ? 'opacity-50' : ''}`}>
                  {availableTimeSlots.map((slot) => (
                    <label 
                      key={slot.value}
                      className={`
                        border rounded-md p-2 text-center cursor-pointer transition-colors
                        ${!selectedDate ? 'cursor-not-allowed' : 'hover:border-blue-500'}
                        ${watch('timeSlot') === slot.value ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-gray-200 text-gray-700'}
                      `}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        value={slot.value}
                        disabled={!selectedDate}
                        {...register('timeSlot')}
                      />
                      <span className="block text-sm">{slot.label}</span>
                    </label>
                  ))}
                </div>
                {errors.timeSlot && (
                  <p className="text-red-500 text-sm mt-1">{errors.timeSlot.message}</p>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  disabled={!watch('date') || !watch('timeSlot')}
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {step === 'info' && (
            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
              <div className="mb-5">
                <div className="p-3 bg-blue-50 rounded-md mb-5">
                  <div className="flex items-center text-sm text-blue-800 mb-1">
                    <Calendar size={16} className="mr-2 text-blue-600" />
                    <span>{availableDates.find(d => d.value === watch('date'))?.label}</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <Clock size={16} className="mr-2 text-blue-600" />
                    <span>{availableTimeSlots.find(t => t.value === watch('timeSlot'))?.label}</span>
                  </div>
                </div>
                
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <User size={18} className="text-blue-600" />
                  Your Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`
                        block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                        ${errors.name ? 'border-red-300' : 'border-gray-300'}
                      `}
                      placeholder="Enter your full name"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`
                        block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                        ${errors.email ? 'border-red-300' : 'border-gray-300'}
                      `}
                      placeholder="Enter your email"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className={`
                        block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                        ${errors.phone ? 'border-red-300' : 'border-gray-300'}
                      `}
                      placeholder="Enter your phone number"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Any questions? (optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-none"
                      placeholder="Enter any questions you have for the agent"
                      {...register('message')}
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeToTerms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        {...register('agreeToTerms')}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                        I agree to the <a href="/terms" target="_blank" className="text-blue-600 hover:underline">Terms and Conditions</a>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setStep('date')}
                  className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                      Scheduling...
                    </>
                  ) : (
                    'Schedule Viewing'
                  )}
                </button>
              </div>
            </form>
          )}
          
          {step === 'confirmation' && (
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Viewing Scheduled!</h3>
              <p className="text-gray-500 mb-6">
                Your viewing has been scheduled for{' '}
                <span className="font-medium text-gray-700">
                  {availableDates.find(d => d.value === watch('date'))?.label} at{' '}
                  {availableTimeSlots.find(t => t.value === watch('timeSlot'))?.label}
                </span>
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">1.</span>
                    <span>
                      {agent?.name || 'The agent'} will confirm your appointment within 24 hours
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">2.</span>
                    <span>
                      You'll receive confirmation details via email at {watch('email')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">3.</span>
                    <span>
                      You can manage your scheduled viewings in your dashboard
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Close
                </button>
                <a
                  href="/dashboard"
                  className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex justify-center"
                >
                  Go to My Dashboard
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
