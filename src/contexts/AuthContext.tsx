import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/car';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = storage.getUsers();
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      storage.setCurrentUser(foundUser);
      toast.success('Welcome back!');
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    const users = storage.getUsers();
    
    if (users.find(u => u.email === email)) {
      toast.error('Email already registered');
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      isAdmin: email === 'admin@luxedrive.com'
    };
    
    users.push(newUser);
    storage.saveUsers(users);
    setUser(newUser);
    storage.setCurrentUser(newUser);
    toast.success('Account created successfully!');
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.isAdmin || false }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
