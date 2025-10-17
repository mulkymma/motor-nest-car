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
}

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
