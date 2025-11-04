// car.ts

export type CarCategory = 'Sport' | 'SUV' | 'Sedan' | 'Luxury' | 'Electric';
export type CarStatus = 'Available' | 'Rented' | 'Sold' | 'In Service';

export interface Car {
  id: string;
  brand?: string;
  model?: string;
  name: string;
  category: CarCategory;
  image: string;
  pricePerDay: number;
  salePrice: number;
  status: CarStatus;
  description: string;
  features: string[];
  year: number;
  transmission: string;
  fuel: string;
  quantity: number;
  // Location as geo coords or human readable
  location?: {
    lat: number;
    lng: number;
    label?: string;
  };
  // Demand tracking
  views?: number;
  timesRented?: number;
  // Service tracking
  lastServiceDate?: string; // ISO date
  nextServiceDue?: string; // ISO date
}

// ✅ Example car data
export const cars: Car[] = [
  {
    id: '1',
    name: 'Toyota Corolla',
    category: 'Sedan',
    image: '/cars/toyota.jpg',
    pricePerDay: 5000,
    salePrice: 4500,
    description: 'A compact, fuel-efficient car.',
    features: ['Air Conditioning', 'Bluetooth', 'Backup Camera'],
    year: 2023,
    transmission: 'Automatic',
    fuel: 'Petrol',
    quantity: 3,
    status: 'Available', // ✅ Matches CarStatus type
  },
];

export interface CartItem {
  carId: string;
  type: 'buy' | 'rent';
  rentalDays?: number;
  totalPrice: number;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  type: 'purchase' | 'rental';
  startDate?: string;
  endDate?: string;
  totalPrice: number;
  status: 'active' | 'completed';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}
