import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, DollarSign, Home, BedDouble, Bath } from 'lucide-react';

interface PropertySearchProps {
  onSearch: (filters: any) => void;
}

export default function PropertySearch({ onSearch }: PropertySearchProps) {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [propertyType, setPropertyType] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');

  const handleSearch = () => {
    onSearch({
      location,
      priceRange,
      propertyType,
      beds,
      baths,
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="location"
                placeholder="Enter city, neighborhood, or ZIP"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={5000000}
                step={100000}
                className="flex-1"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Bedrooms</Label>
            <Select value={beds} onValueChange={setBeds}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Bathrooms</Label>
            <Select value={baths} onValueChange={setBaths}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full">
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 