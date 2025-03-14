import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageSquare } from 'lucide-react';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src={agent.imageUrl}
              alt={agent.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.title}</p>
            <p className="text-sm text-gray-500">{agent.office}</p>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 