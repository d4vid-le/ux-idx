'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { User, Shield, LogOut, Mail, Phone, Home, Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
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
        <h1 className="text-3xl font-bold">Settings</h1>
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
                value="email" 
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'email' 
                    ? 'bg-blue-600 text-white font-medium shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Mail size={16} />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'privacy' 
                    ? 'bg-blue-600 text-white font-medium shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Shield size={16} />
                <span>Privacy</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            {/* Account Settings */}
            <TabsContent value="account" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="Smith"
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
                          defaultValue="john.smith@example.com"
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
                          defaultValue="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Update your location details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <div className="flex items-center">
                        <Home size={16} className="text-gray-400 mr-2" />
                        <input 
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="123 Main Street"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input 
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input 
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="NY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                        <input 
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue="10001"
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

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Permanent actions for your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-red-50 rounded-md border border-red-200">
                      <div>
                        <h3 className="font-medium text-red-800">Delete Account</h3>
                        <p className="text-sm text-red-600">
                          Once you delete your account, all your data will be permanently removed.
                        </p>
                      </div>
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Sign Out</h3>
                        <p className="text-sm text-gray-500">
                          Sign out from all devices
                        </p>
                      </div>
                      <Button variant="outline" className="text-gray-700">
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Email Preferences Tab */}
            <TabsContent value="email" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Preferences</CardTitle>
                  <CardDescription>Manage your email notifications for saved searches and property updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Daily Email Alerts</div>
                        <div className="text-sm text-gray-500">Receive daily notifications when new properties match your saved searches</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Price Drop Alerts</div>
                        <div className="text-sm text-gray-500">Get notified when prices drop for properties in your saved searches</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">New Listing Alerts</div>
                        <div className="text-sm text-gray-500">Receive alerts when new properties are listed in your areas of interest</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Weekly Market Updates</div>
                        <div className="text-sm text-gray-500">Get weekly updates about the real estate market in your saved areas</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Email Frequency</CardTitle>
                  <CardDescription>Control how often you receive emails from us</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notification Frequency</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="daily">Daily Digest</option>
                        <option value="instant">Instant (As they happen)</option>
                        <option value="weekly">Weekly Summary</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        This affects how frequently you'll receive notifications about your saved searches and favorite properties.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-gray-500">Receive promotional offers and updates about our services</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Privacy Settings */}
            <TabsContent value="privacy" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Control your privacy settings and security options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Public Profile</div>
                            <div className="text-sm text-gray-500">Allow others to see your profile information</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Show Contact Information</div>
                            <div className="text-sm text-gray-500">Display your contact information to verified users</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Data Usage</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Analytics Tracking</div>
                            <div className="text-sm text-gray-500">Allow us to collect usage data to improve your experience</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Personalized Recommendations</div>
                            <div className="text-sm text-gray-500">Receive property recommendations based on your browsing history</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Third-Party Data Sharing</div>
                            <div className="text-sm text-gray-500">Allow sharing your non-personal data with trusted partners</div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Login Notifications</div>
                            <div className="text-sm text-gray-500">Get notified about new login attempts</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                          Manage Account Security
                        </Button>
                      </div>
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