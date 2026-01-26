
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Car, LayoutDashboard } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-500 transition-colors">
              <Car className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter text-white font-heading">CARZ-34</span>
              <p className="text-[10px] uppercase tracking-widest text-red-500 font-bold leading-none">Chandrapur</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium text-sm tracking-wide uppercase transition-colors hover:text-red-500 ${
                  isActive(link.path) ? 'text-red-500 font-bold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-zinc-800 text-white p-2 rounded-lg hover:bg-zinc-700 transition-colors"
                title="Admin Dashboard"
              >
                <LayoutDashboard size={20} />
              </Link>
            )}

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center space-x-2 transition-transform active:scale-95"
            >
              <Phone size={18} />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-red-900/50 absolute w-full left-0 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 rounded-md text-lg font-bold border-b border-white/5 ${
                  isActive(link.path) ? 'text-red-500 bg-black/40' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 rounded-md text-lg font-bold border-b border-white/5 text-blue-400"
              >
                Admin Dashboard
              </Link>
            )}
            <div className="pt-4 flex flex-col space-y-4">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full bg-red-600 text-center text-white py-4 rounded-xl font-black uppercase text-lg flex justify-center items-center space-x-3"
              >
                <Phone size={24} />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
