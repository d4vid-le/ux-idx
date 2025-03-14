import { Property } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse',
    address: '201 E 21st Street PHJ, New York, NY 10010',
    price: 3750000,
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80',
    status: 'For Sale',
    createdAt: '2023-08-15T00:00:00.000Z',
    location: {
      lat: 40.735,
      lng: -73.990
    },
    description: "Perched atop a prestigious full-service building in Gramercy, this stunning penthouse offers breathtaking city views and luxurious living. The expansive living room features floor-to-ceiling windows, flooding the space with natural light and providing panoramic vistas of Manhattan's iconic skyline. The chef's kitchen boasts top-of-the-line appliances, custom cabinetry, and a spacious island perfect for entertaining. The primary suite includes a walk-in closet and a spa-like bathroom with dual vanities, a soaking tub, and a glass-enclosed shower. Two additional bedrooms, each with their own bathroom, provide comfortable accommodations for family or guests. A private terrace offers an ideal outdoor retreat for relaxation or al fresco dining while enjoying the spectacular views. Additional features include hardwood floors throughout, a powder room for guests, and a laundry room with washer and dryer. Building amenities include a 24-hour doorman, concierge service, fitness center, and roof deck.",
    propertyType: "Condo",
    yearBuilt: 1985,
    neighborhood: "Gramercy",
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      "24-Hour Doorman",
      "Concierge",
      "Elevator",
      "Fitness Center",
      "Package Room",
      "Storage Available",
      "Roof Deck",
      "Bike Room",
      "Pet Friendly",
      "Laundry in Building"
    ],
    features: [
      "Central Air Conditioning",
      "Dishwasher",
      "Hardwood Floors",
      "Washer/Dryer In-Unit",
      "Walk-in Closet",
      "Private Terrace",
      "Floor-to-Ceiling Windows",
      "Stainless Steel Appliances",
      "Marble Bathroom",
      "High Ceilings"
    ],
    taxAmount: 24000,
    commonCharges: 3200,
    realEstateTax: 2000,
    agent: {
      name: "Jane Smith",
      phone: "(212) 555-1234",
      email: "jane.smith@example.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80"
    },
    floorPlan: "https://images.unsplash.com/photo-1580820267682-426da823b514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    virtualTour: "https://my.matterport.com/show/?m=aSx1MpRRqif",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: '2',
    title: 'Modern Loft in SoHo',
    address: '456 Broadway, New York, NY 10013',
    price: 2100000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'For Sale',
    createdAt: '2023-08-10T00:00:00.000Z',
    location: {
      lat: 40.731,
      lng: -74.001
    },
    description: "Stunning loft in the heart of SoHo featuring soaring 12-foot ceilings and original cast-iron columns that showcase the neighborhood's industrial heritage. This meticulously renovated space offers an open floor plan with oversized windows that flood the interior with natural light. The chef's kitchen is equipped with professional-grade appliances, custom cabinetry, and a large center island. The primary bedroom includes a custom walk-in closet and an en-suite bathroom with a deep soaking tub and separate rain shower. A second bedroom can easily serve as a home office or guest room. Additional features include wide-plank hardwood floors, exposed brick walls, and a washer/dryer. Located in a historic building with a part-time doorman, this loft offers the perfect blend of classic SoHo charm and modern luxury.",
    propertyType: "Loft",
    yearBuilt: 1910,
    neighborhood: "SoHo",
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      "Part-time Doorman",
      "Elevator",
      "Package Room",
      "Storage Available",
      "Roof Access",
      "Bike Storage",
      "Pet Friendly"
    ],
    features: [
      "Central Air Conditioning",
      "Dishwasher",
      "Hardwood Floors",
      "Washer/Dryer In-Unit",
      "Exposed Brick",
      "High Ceilings",
      "Original Cast-Iron Columns",
      "Oversized Windows",
      "Open Floor Plan"
    ],
    taxAmount: 18000,
    commonCharges: 2400,
    realEstateTax: 1600,
    agent: {
      name: "Michael Johnson",
      phone: "(212) 555-5678",
      email: "michael.johnson@example.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    },
    floorPlan: "https://images.unsplash.com/photo-1580820267682-426da823b514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    virtualTour: "https://my.matterport.com/show/?m=aSx1MpRRqif"
  },
  {
    id: '3',
    title: 'Classic Brownstone',
    address: '789 West Village St, New York, NY 10014',
    price: 4500000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'For Sale',
    createdAt: '2023-08-05T00:00:00.000Z',
    location: {
      lat: 40.735,
      lng: -74.005
    },
    description: "Rare opportunity to own a meticulously restored 19th-century brownstone in the heart of the West Village. This historic four-story home offers a perfect blend of period details and modern amenities. The parlor floor features soaring 11-foot ceilings, original crown moldings, and two wood-burning fireplaces. The chef's kitchen has been completely renovated with custom cabinetry, marble countertops, and top-of-the-line appliances. Four generously sized bedrooms include a full-floor primary suite with a luxurious bathroom and walk-in closet. The garden level can function as a separate apartment with its own entrance, ideal for guests or rental income. A landscaped garden provides a private outdoor oasis, while the rooftop terrace offers panoramic views of the Manhattan skyline. Additional features include an elevator serving all floors, central air conditioning, and a full basement with laundry room and wine cellar.",
    propertyType: "Townhouse",
    yearBuilt: 1875,
    neighborhood: "West Village",
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    amenities: [
      "Private Garden",
      "Roof Terrace",
      "Elevator",
      "Wine Cellar",
      "Separate Apartment",
      "Multiple Fireplaces",
      "Central Air Conditioning"
    ],
    features: [
      "Original Crown Moldings",
      "Wood-Burning Fireplaces",
      "Hardwood Floors",
      "High Ceilings",
      "Marble Countertops",
      "Custom Cabinetry",
      "Walk-in Closet",
      "Garden Level Apartment",
      "Rooftop Terrace",
      "Full Basement"
    ],
    taxAmount: 32000,
    commonCharges: 0,
    realEstateTax: 32000,
    agent: {
      name: "Sarah Williams",
      phone: "(212) 555-9012",
      email: "sarah.williams@example.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80"
    },
    floorPlan: "https://images.unsplash.com/photo-1580820267682-426da823b514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    virtualTour: "https://my.matterport.com/show/?m=aSx1MpRRqif"
  },
  {
    id: '4',
    title: 'Riverside Apartment',
    address: '101 Riverside Dr, New York, NY 10025',
    price: 1800000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'For Sale',
    createdAt: '2023-09-01T00:00:00.000Z',
    location: {
      lat: 40.729,
      lng: -73.994
    }
  },
  {
    id: '5',
    title: 'Tribeca Luxury Condo',
    address: '222 Greenwich St, New York, NY 10007',
    price: 5200000,
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
    status: 'For Sale',
    createdAt: '2023-08-20T00:00:00.000Z',
    location: {
      lat: 40.739,
      lng: -73.998
    }
  },
  {
    id: '6',
    title: 'Chelsea Art District Loft',
    address: '333 W 22nd St, New York, NY 10011',
    price: 3100000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'For Sale',
    createdAt: '2023-09-05T00:00:00.000Z',
    location: {
      lat: 40.732,
      lng: -73.986
    }
  },
  {
    id: '7',
    title: 'Upper East Side Townhouse',
    address: '444 E 75th St, New York, NY 10021',
    price: 8750000,
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80',
    status: 'For Sale',
    createdAt: '2023-07-25T00:00:00.000Z',
    location: {
      lat: 40.737,
      lng: -73.989
    }
  },
  {
    id: '8',
    title: 'Gramercy Park Gem',
    address: '555 E 20th St, New York, NY 10003',
    price: 2950000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1900,
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'For Sale',
    createdAt: '2023-09-10T00:00:00.000Z',
    location: {
      lat: 40.743,
      lng: -73.993
    }
  },
  {
    id: '9',
    title: 'Financial District High-Rise',
    address: '666 Wall St, New York, NY 10005',
    price: 1950000,
    bedrooms: 1,
    bathrooms: 1.5,
    sqft: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'For Sale',
    createdAt: '2023-09-15T00:00:00.000Z',
    location: {
      lat: 40.726,
      lng: -73.996
    }
  },
  {
    id: '10',
    title: 'Brooklyn Heights Brownstone',
    address: '777 Columbia Heights, Brooklyn, NY 11201',
    price: 4100000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'For Sale',
    createdAt: '2023-08-28T00:00:00.000Z',
    location: {
      lat: 40.740,
      lng: -74.002
    }
  },
  {
    id: '11',
    title: 'Luxury Rental in Midtown',
    address: '888 5th Avenue, New York, NY 10022',
    price: 8500, // monthly rent
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'For Rent',
    createdAt: '2023-09-20T00:00:00.000Z',
    location: {
      lat: 40.745,
      lng: -73.980
    }
  },
  {
    id: '12',
    title: 'Downtown Rental Studio',
    address: '999 Broadway, New York, NY 10003',
    price: 3200, // monthly rent
    bedrooms: 0,
    bathrooms: 1,
    sqft: 600,
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7f34b5063c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'For Rent',
    createdAt: '2023-09-18T00:00:00.000Z',
    location: {
      lat: 40.728,
      lng: -73.992
    }
  },
  {
    id: '13',
    title: 'Recently Sold Townhouse',
    address: '123 West 87th St, New York, NY 10024',
    price: 4800000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'Sold',
    createdAt: '2023-08-01T00:00:00.000Z',
    location: {
      lat: 40.738,
      lng: -73.987
    }
  },
  {
    id: '14',
    title: 'Pending Sale Condo',
    address: '456 East 72nd St, New York, NY 10021',
    price: 2400000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1950,
    imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    status: 'Pending',
    createdAt: '2023-09-05T00:00:00.000Z',
    location: {
      lat: 40.741,
      lng: -73.995
    }
  }
];

export default mockProperties; 