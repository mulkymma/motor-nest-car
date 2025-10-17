import { Car, User, Booking, CartItem } from '@/types/car';
import { initialCars } from './mockData';

const CARS_KEY = 'cars_data';
const USER_KEY = 'current_user';
const USERS_KEY = 'users_data';
const BOOKINGS_KEY = 'bookings_data';
const CART_KEY = 'cart_data';

export const storage = {
  // Cars
  getCars: (): Car[] => {
    const data = localStorage.getItem(CARS_KEY);
    return data ? JSON.parse(data) : initialCars;
  },
  
  saveCars: (cars: Car[]) => {
    localStorage.setItem(CARS_KEY, JSON.stringify(cars));
  },
  
  // Current User
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  
  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  },
  
  // All Users
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  saveUsers: (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },
  
  // Bookings
  getBookings: (): Booking[] => {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  saveBookings: (bookings: Booking[]) => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  },
  
  // Cart
  getCart: (): CartItem[] => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  saveCart: (cart: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },
  
  clearCart: () => {
    localStorage.removeItem(CART_KEY);
  }
};
