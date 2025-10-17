import { Car } from '@/types/car';

export const initialCars: Car[] = [
  {
    id: '1',
    name: 'Porsche 911 Turbo S',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    pricePerDay: 500,
    salePrice: 185000,
    status: 'Available',
    description: 'Iconic sports car with breathtaking performance and timeless design.',
    features: ['Twin-Turbo Engine', 'Sport Chrono Package', 'Premium Sound System', 'Adaptive Suspension'],
    year: 2024,
    transmission: 'Automatic',
    fuel: 'Petrol'
  },
  {
    id: '2',
    name: 'Range Rover Sport',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    pricePerDay: 350,
    salePrice: 95000,
    status: 'Available',
    description: 'Luxury SUV combining off-road capability with premium comfort.',
    features: ['All-Wheel Drive', 'Terrain Response', 'Meridian Audio', 'Panoramic Roof'],
    year: 2024,
    transmission: 'Automatic',
    fuel: 'Diesel'
  },
  {
    id: '3',
    name: 'Mercedes S-Class',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    pricePerDay: 400,
    salePrice: 115000,
    status: 'Available',
    description: 'The pinnacle of luxury sedans with cutting-edge technology.',
    features: ['MBUX System', 'Air Suspension', 'Burmester Audio', 'Massage Seats'],
    year: 2024,
    transmission: 'Automatic',
    fuel: 'Petrol'
  },
  {
    id: '4',
    name: 'Tesla Model S Plaid',
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800',
    pricePerDay: 450,
    salePrice: 135000,
    status: 'Available',
    description: 'Fastest production sedan with revolutionary electric performance.',
    features: ['1020 HP', 'Autopilot', '396 Mile Range', 'Yoke Steering'],
    year: 2024,
    transmission: 'Automatic',
    fuel: 'Electric'
  },
  {
    id: '5',
    name: 'BMW M4 Competition',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    pricePerDay: 380,
    salePrice: 78000,
    status: 'Available',
    description: 'High-performance coupe with racing DNA.',
    features: ['503 HP Engine', 'M Sport Differential', 'Carbon Fiber Roof', 'Track Mode'],
    year: 2024,
    transmission: 'Automatic',
    fuel: 'Petrol'
  },
  {
    id: '6',
    name: 'Audi Q7',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    pricePerDay: 300,
    salePrice: 72000,
    status: 'Available',
    description: 'Spacious luxury SUV perfect for families.',
    features: ['7 Seats', 'Virtual Cockpit', 'Quattro AWD', 'Adaptive Cruise'],
    year: 2023,
    transmission: 'Automatic',
    fuel: 'Diesel'
  }
];
