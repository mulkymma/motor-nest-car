import { useState, useEffect } from 'react';
import { Car as CarType, CarCategory } from '@/types/car';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Cars = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadedCars = storage.getCars();
    setCars(loadedCars);
    setFilteredCars(loadedCars);
  }, []);

  useEffect(() => {
    let filtered = cars;
    
    if (searchTerm) {
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(car => car.category === categoryFilter);
    }
    
    setFilteredCars(filtered);
  }, [searchTerm, categoryFilter, cars]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Browse Our Fleet</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Sport">Sport</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Sedan">Sedan</SelectItem>
              <SelectItem value="Luxury">Luxury</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <Card key={car.id} className="overflow-hidden border-border hover:border-primary transition cursor-pointer" onClick={() => navigate(`/cars/${car.id}`)}>
              <div className="aspect-video overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{car.category}</Badge>
                  <Badge variant={car.status === 'Available' ? 'default' : 'secondary'}>
                    {car.status}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{car.year} • {car.transmission} • {car.fuel}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="text-lg font-bold text-primary">${car.pricePerDay}/day</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Buy at</p>
                    <p className="text-lg font-bold">${car.salePrice.toLocaleString()}</p>
                  </div>
                </div>
                
                <Button className="w-full mt-4" disabled={car.status !== 'Available'}>
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
