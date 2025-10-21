// car.ts

export type CarCategory = 'Sport' | 'SUV' | 'Sedan' | 'Luxury' | 'Electric';
export type CarStatus = 'Available' | 'Rented' | 'Sold';

export interface Car {
  id: string;
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
