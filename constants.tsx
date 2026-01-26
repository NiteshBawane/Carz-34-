
import React from 'react';
import { Car, ServiceItem, Testimonial } from './types';
import { 
  Car as CarIcon, 
  ShieldCheck, 
  Banknote, 
  FileText, 
  Wrench, 
  RefreshCcw 
} from 'lucide-react';

export const BUSINESS_INFO = {
  name: 'Carz-34',
  tagline: 'Trusted Pre-Owned Cars in Chandrapur',
  phone: '+91 97653 05539',
  whatsapp: '+919765305539',
  email: 'info@carz34.in',
  address: 'Civil Lines, Near District Court, Chandrapur, Maharashtra 442401',
  location: {
    lat: 19.9511,
    lng: 79.2961
  }
};

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    brand: 'Maruti Suzuki',
    model: 'Swift ZXI',
    year: 2021,
    price: 6.75,
    mileage: 24000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    images: ['https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&q=80&w=800'],
    description: 'Single owner, pristine condition, regularly serviced at authorized service center.',
    verified: true,
    featured: true,
  },
  {
    id: '2',
    brand: 'Hyundai',
    model: 'Creta SX(O)',
    year: 2022,
    price: 15.50,
    mileage: 12000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'],
    description: 'Fully loaded variant with panoramic sunroof and ventilated seats.',
    verified: true,
    featured: true,
  },
  {
    id: '3',
    brand: 'Honda',
    model: 'City VX',
    year: 2019,
    price: 9.25,
    mileage: 45000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Sedan',
    images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800'],
    description: 'Elegant white color, smooth engine, excellent highway performance.',
    verified: true,
    featured: false,
  },
  {
    id: '4',
    brand: 'Mahindra',
    model: 'Thar LX 4x4',
    year: 2023,
    price: 16.80,
    mileage: 8500,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    images: ['https://images.unsplash.com/photo-1626242858760-705844e1160d?auto=format&fit=crop&q=80&w=800'],
    description: 'Off-road ready, hard top, like-new condition.',
    verified: true,
    featured: true,
  },
  {
    id: '5',
    brand: 'Tata',
    model: 'Nexon EV Max',
    year: 2022,
    price: 14.20,
    mileage: 18000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'SUV',
    images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800'],
    description: 'Zero emission, high range, fast charging support.',
    verified: true,
    featured: false,
  },
  {
    id: '6',
    brand: 'Toyota',
    model: 'Innova Crysta',
    year: 2018,
    price: 18.50,
    mileage: 82000,
    fuelType: 'Diesel',
    transmission: 'Manual',
    bodyType: 'SUV',
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800'],
    description: 'The king of reliability. Well maintained 7-seater.',
    verified: true,
    featured: false,
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Buy & Sell Used Cars',
    description: 'Get the best market value for your old car or buy a certified pre-owned one.',
    iconName: 'Car'
  },
  {
    id: 's2',
    title: 'Car Exchange',
    description: 'Upgrade your ride seamlessly with our hassle-free exchange program.',
    iconName: 'RefreshCcw'
  },
  {
    id: 's3',
    title: 'RC Transfer Support',
    description: 'Complete documentation support for a smooth ownership transition.',
    iconName: 'FileText'
  },
  {
    id: 's4',
    title: 'Loan Assistance',
    description: 'Low-interest rates and quick approval from top national banks.',
    iconName: 'Banknote'
  },
  {
    id: 's5',
    title: 'Quality Checked',
    description: 'Every car undergoes a rigorous 150-point inspection by experts.',
    iconName: 'ShieldCheck'
  },
  {
    id: 's6',
    title: 'Insurance Help',
    description: 'Comprehensive insurance plans at competitive premiums.',
    iconName: 'ShieldCheck'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahul Meshram',
    rating: 5,
    comment: 'Best experience buying a car in Chandrapur. The staff is very transparent about the vehicle history.',
    date: 'Jan 2024'
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Got a great deal on my Swift. The RC transfer was surprisingly fast. Highly recommended!',
    date: 'Dec 2023'
  }
];
