
export type FuelType = 'Petrol' | 'Diesel' | 'CNG' | 'Electric';
export type Transmission = 'Manual' | 'Automatic';
export type CarBodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'Luxury';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // In Lakhs
  mileage: number; // in km
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: CarBodyType;
  images: string[];
  description: string;
  verified: boolean;
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
