import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Car } from '@/types/car';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Calendar, Clock, Fuel, Settings } from 'lucide-react';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [car, setCar] = useState<Car | null>(null);
  const [rentalDays, setRentalDays] = useState(1);

  useEffect(() => {
    const cars = storage.getCars();
    const foundCar = cars.find(c => c.id === id);
    setCar(foundCar || null);
  }, [id]);

  if (!car) {
    return <div className="container mx-auto px-4 py-12">Car not found</div>;
  }

  const handleRent = () => {
    if (!user) {
      toast.error('Please login to rent a car');
      navigate('/login');
      return;
    }
    
    addToCart({
      carId: car.id,
      type: 'rent',
      rentalDays,
      totalPrice: car.pricePerDay * rentalDays
    });
  };

  const handleBuy = () => {
    if (!user) {
      toast.error('Please login to buy a car');
      navigate('/login');
      return;
    }
    
    addToCart({
      carId: car.id,
      type: 'buy',
      totalPrice: car.salePrice
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate('/cars')} className="mb-6">
          ← Back to Cars
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="rounded-lg overflow-hidden">
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">{car.category}</Badge>
              <Badge variant={car.status === 'Available' ? 'default' : 'secondary'}>
                {car.status}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold mb-4">{car.name}</h1>
            <p className="text-muted-foreground mb-6">{car.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold">{car.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-semibold">{car.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-semibold">{car.fuel}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Section */}
            <Card className="p-6 mb-4 bg-secondary border-border">
              <h3 className="text-lg font-semibold mb-4">Rent this car</h3>
              <div className="mb-4">
                <Label htmlFor="days">Number of Days</Label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="mt-2"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ${(car.pricePerDay * rentalDays).toLocaleString()}
                </span>
              </div>
              <Button className="w-full" onClick={handleRent} disabled={car.status !== 'Available'}>
                <Clock className="w-4 h-4 mr-2" />
                Add to Cart (Rent)
              </Button>
            </Card>

            {/* Buy Section */}
            <Card className="p-6 bg-secondary border-border">
              <h3 className="text-lg font-semibold mb-4">Buy this car</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Price</span>
                <span className="text-2xl font-bold">
                  ${car.salePrice.toLocaleString()}
                </span>
              </div>
              <Button className="w-full" variant="outline" onClick={handleBuy} disabled={car.status !== 'Available'}>
                Add to Cart (Buy)
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
