import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { storage } from '@/lib/storage';
import { Car, CarCategory, CarStatus, Booking } from '@/types/car';
import { toast } from 'sonner';
import { Trash2, Edit, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Admin = () => {
  const { isAdmin } = useAuth();
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
    const updated = car.id 
      ? cars.map(c => c.id === car.id ? car : c)
      : [...cars, { ...car, id: Date.now().toString() }];
    
    setCars(updated);
    storage.saveCars(updated);
    setEditingCar(null);
    toast.success('Car saved');
  };

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="cars">
        <TabsList>
          <TabsTrigger value="cars">Manage Cars</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="cars" className="space-y-4 mt-6">
          <Button onClick={() => setEditingCar({
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
            fuel: 'Petrol'
          })}>
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
                  <Input value={editingCar.name} onChange={e => setEditingCar({...editingCar, name: e.target.value})} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={editingCar.category} onValueChange={v => setEditingCar({...editingCar, category: v as CarCategory})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sport">Sport</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input value={editingCar.image} onChange={e => setEditingCar({...editingCar, image: e.target.value})} />
                </div>
                <div>
                  <Label>Price Per Day</Label>
                  <Input type="number" value={editingCar.pricePerDay} onChange={e => setEditingCar({...editingCar, pricePerDay: parseFloat(e.target.value)})} />
                </div>
                <div>
                  <Label>Sale Price</Label>
                  <Input type="number" value={editingCar.salePrice} onChange={e => setEditingCar({...editingCar, salePrice: parseFloat(e.target.value)})} />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input type="number" value={editingCar.year} onChange={e => setEditingCar({...editingCar, year: parseInt(e.target.value)})} />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Input value={editingCar.description} onChange={e => setEditingCar({...editingCar, description: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => handleSaveCar(editingCar)}>Save</Button>
                <Button variant="outline" onClick={() => setEditingCar(null)}>Cancel</Button>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map(car => (
              <Card key={car.id} className="p-4 bg-card border-border">
                <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="font-semibold">{car.name}</h3>
                <p className="text-sm text-muted-foreground">{car.category} - {car.status}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingCar(car)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteCar(car.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <div className="space-y-4">
            {bookings.map(booking => {
              const car = cars.find(c => c.id === booking.carId);
              if (!car) return null;
              
              return (
                <Card key={booking.id} className="p-4 bg-card border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.type} - ${booking.totalPrice.toLocaleString()}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
