import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { storage } from '@/lib/storage';
import { Car, CarCategory, CarStatus, Booking } from '@/types/car';
import { toast } from 'sonner';
import { Trash2, Edit, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TabsListAny: any = TabsList;
const TabsTriggerAny: any = TabsTrigger;
const TabsContentAny: any = TabsContent;

const Admin = () => {
  const { isAdmin } = useAuth();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      toast.error('Admin access required');
      return;
    }
    loadData();
  }, [isAdmin, navigate]);

  const loadData = () => {
    setCars(storage.getCars());
    setBookings(storage.getBookings());
  };

  const handleDeleteCar = (id: string) => {
    const updated = cars.filter(c => c.id !== id);
    setCars(updated);
    storage.saveCars(updated);
    toast.success('Car deleted');
  };

  const handleSaveCar = (car: Car) => {
    const updated: Car[] = car.id
      ? cars.map(c => c.id === car.id ? car : c)
      : [...cars, { ...car, id: Date.now().toString() } as Car];

    setCars(updated);
    storage.saveCars(updated);
    setEditingCar(null);
    toast.success('Car saved');
  };

  const toggleCarStatus = (id: string) => {
    const updated: Car[] = cars.map(c =>
      c.id === id
        ? { ...c, status: (c.status === 'Available' ? 'Unavailable' : 'Available') as CarStatus }
        : c
    );
    setCars(updated);
    storage.saveCars(updated);
    toast.success('Car status updated');
  };

  if (!isAdmin) return null;
  return (
    <div className="container mx-auto px-4 py-12">
      <Tabs defaultValue="cars">
        <TabsListAny>
          <TabsTriggerAny value="cars">Manage Cars</TabsTriggerAny>
          <TabsTriggerAny value="bookings">Bookings</TabsTriggerAny>
        </TabsListAny>
        <TabsContentAny value="cars" className="space-y-4 mt-6">
          <Button
            onClick={() =>
              setEditingCar({
                id: '',
                name: '',
                category: 'Sport',
                image: '',
                pricePerDay: 0,
                salePrice: 0,
                status: 'Available',
                description: '',
                features: [],
                year: 2024,
                transmission: 'Automatic',
                fuel: 'Petrol',
                quantity: 1, // ✅ new field
              })
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Car
          </Button>

          {editingCar && (
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold mb-4">
                {editingCar.id ? 'Edit Car' : 'Add New Car'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <input
                    className="w-full px-3 py-2 rounded border"
                    value={editingCar.name}
                    onChange={(e) =>
                      setEditingCar({ ...editingCar, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    className="w-full px-3 py-2 rounded border"
                    value={editingCar.category}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        category: e.target.value as CarCategory,
                      })
                    }
                  >
                    <option value="Sport">Sport</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <Label>Image URL</Label>
                  <input
                    className="w-full px-3 py-2 rounded border"
                    value={editingCar.image}
                    onChange={(e) =>
                      setEditingCar({ ...editingCar, image: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Price Per Day</Label>
                  <input
                    className="w-full px-3 py-2 rounded border"
                    type="number"
                    value={editingCar.pricePerDay}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        pricePerDay: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Sale Price</Label>
                  <input
                    className="w-full px-3 py-2 rounded border"
                    type="number"
                    value={editingCar.salePrice}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        salePrice: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <input
                    className="w-full px-3 py-2 rounded border"
                    type="number"
                    value={editingCar.year}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        year: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <input
                    className="w-full px-3 py-2 rounded border"
                    type="number"
                    value={editingCar.quantity || 1}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <select
                    className="w-full px-3 py-2 rounded border"
                    value={editingCar.status}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        status: e.target.value as CarStatus,
                      })
                    }
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <input
                    className="w-full px-3 py-2 rounded border"
                    value={editingCar.description}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => handleSaveCar(editingCar as Car)}>Save</Button>
                <Button variant="outline" onClick={() => setEditingCar(null)}>
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map((car) => (
              <Card key={car.id} className="p-4 bg-card border-border">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{car.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {car.category} – {car.status}
                </p>
                <p className="text-sm">Quantity: {car.quantity || 1}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingCar(car)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteCar(car.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" onClick={() => toggleCarStatus(car.id)}>
                    {car.status === 'Available' ? 'Set Unavailable' : 'Set Available'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContentAny>

        <TabsContentAny value="bookings" className="mt-6">
          <div className="space-y-4">
            {bookings.map((booking) => {
              const car = cars.find((c) => c.id === booking.carId);
              if (!car) return null;

              return (
                <Card key={booking.id} className="p-4 bg-card border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.type} - {formatPrice(booking.totalPrice)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-sm text-primary">{booking.status}</div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContentAny>
      </Tabs>
    </div>
  );
};

export default Admin;
