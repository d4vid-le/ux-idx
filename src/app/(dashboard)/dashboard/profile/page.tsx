'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  // Demo user data - in a real app, this would be fetched from your backend
  const [userData, setUserData] = useState({
    name: 'Demo User',
    email: 'demo@idxsolution.com',
    password: 'IDX@demo2023', // Note: In a real app, you'd never store or display passwords like this
    phone: '(212) 555-1234',
    address: '123 Main St, New York, NY 10001',
    bio: 'I am a demo user account for the IDX Real Estate Solution. Feel free to explore the dashboard features!',
    avatar: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would make an API call here to update the user profile
    setUserData(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button 
          variant={isEditing ? "outline" : "default"} 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {/* Demo credentials card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">Demo Account</CardTitle>
          <CardDescription>
            This is a demo account for testing the IDX Solution dashboard. Use these credentials to log in:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Email:</span>
            <code className="bg-blue-100 px-2 py-1 rounded">{userData.email}</code>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Password:</span>
            <code className="bg-blue-100 px-2 py-1 rounded">{userData.password}</code>
          </div>
        </CardContent>
      </Card>

      {/* Profile information */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar */}
            <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <User size={36} />
                </div>
                {isEditing && (
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute bottom-0 right-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600"
                  >
                    <Camera className="h-4 w-4 text-white" />
                    <input id="avatar-upload" type="file" className="hidden" />
                  </label>
                )}
              </div>
              <div>
                <h3 className="font-medium text-lg">{userData.name}</h3>
                <p className="text-gray-500">{userData.email}</p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Your email address"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Your phone number"
              />
            </div>

            {/* Address */}
            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Your address"
              />
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>
          </CardContent>
          
          {isEditing && (
            <CardFooter className="justify-end">
              <Button type="submit" className="flex items-center">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          )}
        </Card>
      </form>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your password and account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Password</h3>
              <p className="text-gray-500 text-sm">Last changed 2 weeks ago</p>
            </div>
            <Button variant="outline" disabled={!isEditing}>
              Change Password
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-gray-500 text-sm">Add an extra layer of security</p>
            </div>
            <Button variant="outline" disabled={!isEditing}>
              Setup 2FA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 