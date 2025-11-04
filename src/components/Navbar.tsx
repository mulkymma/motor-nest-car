// removed @ts-nocheck to address types properly
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  User,
  LogOut,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const { currency, setCurrency } = useCurrency();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1E1E1E]/80 border-b border-[#2A2A2A] backdrop-blur-md text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={closeMenu}
        >
          <img
            src="/logo2.png"
            alt="MotorNest Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-[#00BFFF] to-blue-400 bg-clip-text text-transparent">
            MotorNest
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/cars"
            className="hover:text-[#00BFFF] transition-colors"
          >
            Browse Cars
          </Link>

          {/* Currency Selector */}
          <Select
            value={currency}
            onValueChange={(value) => setCurrency(value as Currency)}
          >
            <SelectTrigger className="w-24 bg-transparent border-[#2A2A2A] text-white">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="KES">KES</SelectItem>
            </SelectContent>
          </Select>

          {user ? (
            <>
              <Link
                to="/profile"
                className="hover:text-[#00BFFF] transition-colors"
              >
                My Bookings
              </Link>

              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/admin")}
                  className="border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/20"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}

              {/* Cart */}
              <Button
                variant="outline"
                size="sm"
                className="relative border-[#2A2A2A]"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                <AnimatePresence>
                  {cart.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#00BFFF] text-[10px] font-bold text-white"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {/* User Info */}
              <div className="flex items-center gap-2 px-2">
                <User className="w-4 h-4 text-[#00BFFF]" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                title="Logout"
                className="text-gray-400 hover:text-[#00BFFF]"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
                className="border-[#2A2A2A] hover:border-[#00BFFF] hover:text-[#00BFFF]"
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/register")}
                className="bg-[#00BFFF] hover:bg-[#00BFFF]/90 text-white"
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-[#00BFFF] transition-colors"
          onClick={toggleMenu}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-[#2A2A2A] bg-[#121212]/95 backdrop-blur-md"
          >
            <div className="flex flex-col items-start p-4 gap-4 text-gray-200">
              <Link
                to="/cars"
                onClick={closeMenu}
                className="hover:text-[#00BFFF] transition-colors"
              >
                Browse Cars
              </Link>

              {/* Currency Selector */}
              <Select
                value={currency}
                onValueChange={(value) => setCurrency(value as Currency)}
              >
                <SelectTrigger className="w-24 bg-transparent border-[#2A2A2A] text-white">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="KES">KES</SelectItem>
                </SelectContent>
              </Select>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="hover:text-[#00BFFF] transition-colors"
                  >
                    My Bookings
                  </Link>

                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigate("/admin");
                        closeMenu();
                      }}
                      className="border-[#00BFFF] text-[#00BFFF]"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-[#2A2A2A]"
                    onClick={() => {
                      navigate("/cart");
                      closeMenu();
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                    {cart.length > 0 && (
                      <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-[#00BFFF] text-[11px] font-bold text-white">
                        {cart.length}
                      </span>
                    )}
                  </Button>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00BFFF]" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="text-gray-400 hover:text-[#00BFFF]"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate("/login");
                      closeMenu();
                    }}
                    className="border-[#2A2A2A] hover:border-[#00BFFF]"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate("/register");
                      closeMenu();
                    }}
                    className="bg-[#00BFFF] hover:bg-[#00BFFF]/90 text-white"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
