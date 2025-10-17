import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { storage } from '@/lib/storage';
import { Booking, Car } from '@/types/car';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const allBookings = storage.getBookings();
    const userBookings = allBookings.filter(b => b.userId === user.id);
    setBookings(userBookings);
    setCars(storage.getCars());
  }, [user, navigate]);

  const getCarById = (id: string) => cars.find(c => c.id === id);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No bookings yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const car = getCarById(booking.carId);
            if (!car) return null;

            return (
              <Card key={booking.id} className="p-6 bg-card border-border">
                <div className="flex gap-4">
                  <img src={car.image} alt={car.name} className="w-48 h-32 object-cover rounded" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold">{car.name}</h3>
                      <Badge variant={booking.status === 'active' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-2">
                      {booking.type === 'purchase' ? 'Purchased' : 'Rental'}
                    </p>
                    
                    {booking.type === 'rental' && booking.startDate && booking.endDate && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                    )}
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                    
                    <p className="text-xl font-bold text-primary">
                      ${booking.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;
