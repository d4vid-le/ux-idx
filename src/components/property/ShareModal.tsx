'use client';

import { useState } from 'react';
import { X, Copy, Mail, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyAddress: string;
  propertyUrl: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  propertyAddress,
  propertyUrl
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(propertyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareViaEmail = () => {
    const subject = `Check out this property: ${propertyAddress}`;
    const body = `I found this property and thought you might be interested: ${propertyUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`, '_blank');
  };
  
  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this property: ${propertyAddress}`)}&url=${encodeURIComponent(propertyUrl)}`, '_blank');
  };
  
  const shareViaLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(propertyUrl)}`, '_blank');
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">Share this property</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Share this property with friends and family
          </p>
          
          {/* Copy Link */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <LinkIcon size={16} className="text-gray-500 mr-2" />
              <span className="font-medium">Property Link</span>
            </div>
            <div className="flex">
              <input
                type="text"
                value={propertyUrl}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
              <button
                onClick={handleCopyLink}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 flex items-center"
              >
                {copied ? 'Copied!' : (
                  <>
                    <Copy size={16} className="mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Share Options */}
          <div>
            <div className="font-medium mb-3">Share via</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={shareViaEmail}
                className="flex items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <Mail size={18} className="text-gray-700 mr-2" />
                <span>Email</span>
              </button>
              <button
                onClick={shareViaFacebook}
                className="flex items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <Facebook size={18} className="text-blue-600 mr-2" />
                <span>Facebook</span>
              </button>
              <button
                onClick={shareViaTwitter}
                className="flex items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <Twitter size={18} className="text-blue-400 mr-2" />
                <span>Twitter</span>
              </button>
              <button
                onClick={shareViaLinkedin}
                className="flex items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <Linkedin size={18} className="text-blue-700 mr-2" />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 