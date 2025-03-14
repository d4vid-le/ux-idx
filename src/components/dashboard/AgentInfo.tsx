import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageSquare, X } from 'lucide-react';

interface AgentInfoProps {
  agent: {
    name: string;
    title: string;
    email: string;
    phone: string;
    imageUrl: string;
    office: string;
  };
}

export default function AgentInfo({ agent }: AgentInfoProps) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleEmailClick = () => {
    window.location.href = `mailto:${agent.email}?subject=Property Inquiry&body=Hello ${agent.name}, I am interested in learning more about your properties.`;
  };

  const handleCallClick = () => {
    window.location.href = `tel:${agent.phone}`;
  };

  const handleMessageClick = () => {
    setShowMessageModal(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to the backend
    console.log('Message sent to agent:', {
      agent: agent.name,
      message: message
    });
    setMessageSent(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setMessageSent(false);
      setMessage('');
      setShowMessageModal(false);
    }, 3000);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Your Agent</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
          {/* Agent Image */}
          <div className="flex-shrink-0">
            <img
              src={agent.imageUrl}
              alt={agent.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-gray-100 shadow-sm"
            />
          </div>
          
          {/* Agent Info */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h3 className="text-base font-semibold mb-0.5 truncate">{agent.name}</h3>
            <p className="text-xs text-gray-500 mb-0.5 truncate">{agent.title}</p>
            <p className="text-xs text-gray-500 mb-2 truncate">{agent.office}</p>
          </div>
        </div>
        
        {/* Contact Buttons - Moved out of the flex container for better spacing */}
        <div className="mt-4 grid grid-cols-3 gap-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center text-xs py-1 px-2 h-auto"
            onClick={handleEmailClick}
          >
            <Mail className="h-3 w-3 mr-1" />
            <span className="truncate">Email</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center text-xs py-1 px-2 h-auto"
            onClick={handleCallClick}
          >
            <Phone className="h-3 w-3 mr-1" />
            <span className="truncate">Call</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center text-xs py-1 px-2 h-auto"
            onClick={handleMessageClick}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            <span className="truncate">Message</span>
          </Button>
        </div>

        {/* Message Modal */}
        {showMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Message {agent.name}</h3>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {messageSent ? (
                <div className="p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">
                    {agent.name} will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="p-6">
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder={`Hello ${agent.name}, I am interested in...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowMessageModal(false)}
                      className="w-full sm:w-auto order-2 sm:order-1 sm:mr-2"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="w-full sm:w-auto order-1 sm:order-2 mb-2 sm:mb-0"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 