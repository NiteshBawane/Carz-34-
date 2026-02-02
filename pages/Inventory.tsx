import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { useAuth } from '../context/AuthContext';
import CarCard from '../components/CarCard';
import { Search, Filter, Edit, Trash2, Globe, Loader2 } from 'lucide-react';
import { FuelType } from '../types';

const Inventory: React.FC = () => {
  const { cars, loading, isCloudSync, deleteCar } = useCars();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedFuel, setSelectedFuel] = useState<FuelType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'year-new'>('year-new');

  const brands = useMemo(() => ['All', ...Array.from(new Set(cars.map(c => c.brand)))], [cars]);
  const fuelTypes: (FuelType | 'All')[] = ['All', 'Petrol', 'Diesel', 'CNG', 'Electric'];

  const filteredCars = useMemo(() => {
    return cars
      .filter(car => {
        const matchesSearch = car.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             car.model.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
        const matchesFuel = selectedFuel === 'All' || car.fuelType === selectedFuel;
        return matchesSearch && matchesBrand && matchesFuel;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return b.year - a.year;
      });
  }, [cars, searchQuery, selectedBrand, selectedFuel, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tight">Our <span className="text-red-600">Inventory</span></h1>
              {isCloudSync && (
                <div className="hidden sm:flex items-center space-x-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100 animate-pulse mt-4">
                  <Globe size={12} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Live Stock</span>
                </div>
              )}
            </div>
            <p className="text-gray-500 font-medium max-w-2xl text-lg">Browse through our wide range of certified pre-owned vehicles in Chandrapur.</p>
          </div>
        </header>

        {/* Filters Panel */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Search Cars</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="Brand or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl font-bold transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Brand</label>
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl font-bold outline-none appearance-none cursor-pointer"
              >
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Fuel Type</label>
              <select 
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value as any)}
                className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl font-bold outline-none appearance-none cursor-pointer"
              >
                {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl font-bold outline-none appearance-none cursor-pointer"
              >
                <option value="year-new">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="font-black uppercase text-sm tracking-widest">Fetching Latest Inventory...</p>
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <div key={car.id} className="relative group">
                <CarCard car={car} />
                {isAdmin && (
                  <div className="absolute top-4 left-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => navigate('/admin')} 
                      className="bg-white text-blue-600 p-2 rounded-lg shadow-xl border border-blue-100"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => { if(window.confirm('Delete this car?')) deleteCar(car.id); }}
                      className="bg-white text-red-600 p-2 rounded-lg shadow-xl border border-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <Filter size={64} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase">No Cars Found</h3>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedBrand('All'); setSelectedFuel('All'); }}
              className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest mt-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;