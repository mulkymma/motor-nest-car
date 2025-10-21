import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] border-t border-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/logo2.png"
              alt="MotorNest Logo"
              className="h-10 w-10 object-contain"
            />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              MotorNest
            </h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your trusted car rental and sales platform — offering reliable, affordable, and premium rides across Kenya.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/cars" className="hover:text-blue-400 transition-colors">
                Browse Cars
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>info@motornest.co.ke</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+254 700 000 000</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Mombasa, Kenya</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-400 font-semibold">MotorNest</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
