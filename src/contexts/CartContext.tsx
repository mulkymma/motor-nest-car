import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types/car';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (carId: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(storage.getCart());
  }, []);

  const addToCart = (item: CartItem) => {
    const newCart = [...cart, item];
    setCart(newCart);
    storage.saveCart(newCart);
    toast.success('Added to cart');
  };

  const removeFromCart = (carId: string) => {
    const newCart = cart.filter(item => item.carId !== carId);
    setCart(newCart);
    storage.saveCart(newCart);
    toast.success('Removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    storage.clearCart();
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
