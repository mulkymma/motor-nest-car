import { useState, useEffect, ChangeEvent } from 'react';
import { Car as CarType, CarCategory } from '@/types/car';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Search } from 'lucide-react';

const Cars = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [budget, setBudget] = useState<number | null>(null);
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  // Typed wrapper for SelectItem: SelectItem expects partial props in our relaxed wrappers
  const SelectItemWrapper: React.FC<React.ComponentProps<typeof SelectItem>> = (props) => <SelectItem {...props} />;

  useEffect(() => {
    storage.checkAndMarkService();
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

    if (brandFilter !== 'all') {
      filtered = filtered.filter(car => car.brand === brandFilter);
    }

    if (budget !== null) {
      filtered = filtered.filter(car => car.pricePerDay <= budget);
    }

    setFilteredCars(filtered);
  }, [searchTerm, categoryFilter, brandFilter, budget, cars]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Browse Our Fleet</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              className="w-full pl-10 pr-3 py-2 border rounded"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItemWrapper value="all">All Categories</SelectItemWrapper>
                <SelectItemWrapper value="Sport">Sport</SelectItemWrapper>
                <SelectItemWrapper value="SUV">SUV</SelectItemWrapper>
                <SelectItemWrapper value="Sedan">Sedan</SelectItemWrapper>
                <SelectItemWrapper value="Luxury">Luxury</SelectItemWrapper>
                <SelectItemWrapper value="Electric">Electric</SelectItemWrapper>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItemWrapper value="all">All Brands</SelectItemWrapper>
                {storage.getBrands().map((b) => (
                  <SelectItemWrapper key={b} value={b}>{b}</SelectItemWrapper>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <input
              type="number"
              placeholder="Max per day"
              className="w-full pl-3 pr-3 py-2 border rounded"
              onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : null)}
            />
          </div>
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
                    <p className="text-lg font-bold text-primary">{formatPrice(car.pricePerDay)}/day</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Buy at</p>
                    <p className="text-lg font-bold">{formatPrice(car.salePrice)}</p>
                  </div>
                </div>

                <div className="mt-3 text-sm text-muted-foreground">
                  Views: <strong className="text-foreground">{car.views || 0}</strong> • Rented: <strong className="text-foreground">{car.timesRented || 0}</strong>
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
