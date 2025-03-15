'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { User, Shield, LogOut, Mail, Phone, Home, Bell, Building, FileText, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AgentSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>('account');
  const [saving, setSaving] = useState(false);

  // Simulate saving settings
  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agent Settings</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Tabs 
          defaultValue="account" 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="w-full"
        >
          <div className="border-b">
            <TabsList className="ml-4 mt-2 flex gap-4 h-12 bg-transparent justify-start">
              <TabsTrigger 
                value="account" 
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'account' 
                    ? 'bg-blue-600 text-white font-medium shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <User size={16} />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger 
                value="listings" 
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'listings' 
                    ? 'bg-blue-600 text-white font-medium shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Home size={16} />
                <span>Listings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="clients" 
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'clients' 
                    ? 'bg-blue-600 text-white font-medium shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Users size={16} />
                <span>Clients</span>
              </TabsTrigger>
              <TabsTrigger 
                value="compliance" 
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'compliance' 
                    ? 'bg-blue-600 text-white font-medium shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <FileText size={16} />
                <span>Compliance</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            {/* Account Settings */}
            <TabsContent value="account" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Information</CardTitle>
                  <CardDescription>Update your professional information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="Jane"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="Realtor"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="flex items-center">
                        <Mail size={16} className="text-gray-400 mr-2" />
                        <input 
                          type="email"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="agent@idxsolution.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-400 mr-2" />
                        <input 
                          type="tel"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="(212) 555-9876"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                      <input 
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue="NY12345678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brokerage</label>
                      <div className="flex items-center">
                        <Building size={16} className="text-gray-400 mr-2" />
                        <input 
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="IDX Realty Group"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input 
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input 
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter a new password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input 
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Confirm your new password"
                      />
                    </div>
                    
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Listings Settings */}
            <TabsContent value="listings" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Listing Preferences</CardTitle>
                  <CardDescription>Configure how your listings are displayed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Display Contact Information</h3>
                        <p className="text-sm text-gray-500">Show your contact details on listing pages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Show Brokerage Logo</h3>
                        <p className="text-sm text-gray-500">Display your brokerage logo on listings</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Enable Open House Scheduling</h3>
                        <p className="text-sm text-gray-500">Allow clients to schedule open house visits</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Listing Visibility</label>
                      <Select defaultValue="public">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Visible to everyone</SelectItem>
                          <SelectItem value="private">Private - Visible only to you</SelectItem>
                          <SelectItem value="clients">Clients Only - Visible to your clients</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Listing Notifications</CardTitle>
                  <CardDescription>Configure alerts for your property listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Listing View Alerts</h3>
                        <p className="text-sm text-gray-500">Get notified when someone views your listing</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Listing Expiration Reminders</h3>
                        <p className="text-sm text-gray-500">Receive alerts before listings expire</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Price Change Suggestions</h3>
                        <p className="text-sm text-gray-500">Get market-based price change recommendations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Client Settings */}
            <TabsContent value="clients" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Communication</CardTitle>
                  <CardDescription>Configure how you interact with clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Automatic Responses</h3>
                        <p className="text-sm text-gray-500">Send automatic replies to client inquiries</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Client Inquiry Notifications</h3>
                        <p className="text-sm text-gray-500">Get notified when clients contact you</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Follow-up Reminders</h3>
                        <p className="text-sm text-gray-500">Receive reminders to follow up with clients</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
                      <Select defaultValue="email">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select contact method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Privacy</CardTitle>
                  <CardDescription>Manage client data and privacy settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Client Data Sharing</h3>
                        <p className="text-sm text-gray-500">Share client data with your brokerage</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Client Contact Visibility</h3>
                        <p className="text-sm text-gray-500">Allow other agents to see your client contacts</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Client Data Retention</h3>
                        <p className="text-sm text-gray-500">Keep client data after transactions complete</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Settings */}
            <TabsContent value="compliance" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>REBNY Compliance</CardTitle>
                  <CardDescription>Manage settings related to REBNY regulations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Fair Housing Compliance</h3>
                        <p className="text-sm text-gray-500">Enable fair housing compliance checks for listings</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Automatic Disclosures</h3>
                        <p className="text-sm text-gray-500">Add required disclosures to listings automatically</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Compliance Notifications</h3>
                        <p className="text-sm text-gray-500">Receive alerts about compliance issues</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data Sharing Agreement</label>
                      <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                        <p className="text-sm text-gray-700 mb-2">
                          You have agreed to the REBNY data sharing agreement on <strong>October 15, 2023</strong>.
                        </p>
                        <Button variant="outline" size="sm">
                          View Agreement
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legal & Terms</CardTitle>
                  <CardDescription>Review and accept legal agreements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Terms of Service</h3>
                        <p className="text-sm text-gray-500">Last accepted: October 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Terms
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Privacy Policy</h3>
                        <p className="text-sm text-gray-500">Last accepted: October 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Policy
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Agent Agreement</h3>
                        <p className="text-sm text-gray-500">Last accepted: October 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Agreement
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
} 