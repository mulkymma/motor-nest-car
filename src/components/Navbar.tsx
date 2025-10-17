import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          LuxeDrive
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/cars" className="text-foreground hover:text-primary transition">
            Browse Cars
          </Link>
          
          {user ? (
            <>
              <Link to="/profile" className="text-foreground hover:text-primary transition">
                My Bookings
              </Link>
              
              {isAdmin && (
                <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
              
              <Button variant="outline" size="sm" onClick={() => navigate('/cart')}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cart.length})
              </Button>
              
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.name}</span>
              </div>
              
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
