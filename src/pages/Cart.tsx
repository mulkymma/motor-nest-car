import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { storage } from '@/lib/storage';
import { Car, Booking } from '@/types/car';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    setCars(storage.getCars());
  }, []);

  const getCarById = (id: string) => cars.find(c => c.id === id);

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to complete purchase');
      navigate('/login');
      return;
    }

    const bookings: Booking[] = cart.map(item => ({
      id: Date.now().toString() + Math.random(),
      carId: item.carId,
      userId: user.id,
      type: item.type === 'buy' ? 'purchase' : 'rental',
      totalPrice: item.totalPrice,
      status: 'active',
      createdAt: new Date().toISOString(),
      ...(item.type === 'rent' && {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + (item.rentalDays || 1) * 86400000).toISOString()
      })
    }));

    const existingBookings = storage.getBookings();
    storage.saveBookings([...existingBookings, ...bookings]);

    // Update car status
    const updatedCars = cars.map(car => {
      const cartItem = cart.find(item => item.carId === car.id);
      if (cartItem) {
        return {
          ...car,
          status: cartItem.type === 'buy' ? 'Sold' : 'Rented'
        } as Car;
      }
      return car;
    });
    storage.saveCars(updatedCars);

    clearCart();
    toast.success('Booking confirmed!');
    navigate('/profile');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/cars')}>Browse Cars</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, idx) => {
            const car = getCarById(item.carId);
            if (!car) return null;

            return (
              <Card key={idx} className="p-6 bg-card border-border">
                <div className="flex gap-4">
                  <img src={car.image} alt={car.name} className="w-32 h-24 object-cover rounded" />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.type === 'rent' ? `Rental - ${item.rentalDays} days` : 'Purchase'}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.carId)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div>
          <Card className="p-6 bg-card border-border sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(cartTotal * 0.1)}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(cartTotal * 1.1)}</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full" onClick={handleCheckout}>
              Complete Checkout
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
