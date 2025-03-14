import React from 'react';
import { render, screen } from '../utils/test-utils';
import { PropertyCard } from '@/components/property/PropertyCard';
import { mockProperty } from '../utils/test-utils';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock Next.js image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} src={props.src} />;
  },
}));

describe('PropertyCard Component', () => {
  it('renders property details correctly', () => {
    // Render the component with mock data
    render(<PropertyCard property={mockProperty} />);

    // Check that key information is rendered
    expect(screen.getByText(mockProperty.title)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.address)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProperty.price.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.bedrooms} bd`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.bathrooms} ba`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.squareFeet.toLocaleString()} sqft`)).toBeInTheDocument();
  });

  it('renders property image', () => {
    render(<PropertyCard property={mockProperty} />);
    
    // Check that the image is rendered
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProperty.photos[0]);
    expect(image).toHaveAttribute('alt', `Photo of ${mockProperty.title}`);
  });

  it('renders property type and status badges', () => {
    render(<PropertyCard property={mockProperty} />);
    
    // Check that property type and status are rendered
    expect(screen.getByText(mockProperty.propertyType)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.status)).toBeInTheDocument();
  });

  it('renders favorite button', () => {
    render(<PropertyCard property={mockProperty} />);
    
    // Check that favorite button is rendered
    const favoriteButton = screen.getByLabelText('Add to favorites');
    expect(favoriteButton).toBeInTheDocument();
  });
}); 