
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCars } from '../context/CarContext';
import { Plus, Edit, Trash2, LayoutDashboard, LogOut, Search, X, ShieldAlert, AlertTriangle, Check, RotateCcw } from 'lucide-react';
import CarForm from '../components/CarForm';
import { Car } from '../types';

const Admin: React.FC = () => {
  const { isAdmin, login, logout } = useAuth();
  const { cars, addCar, updateCar, deleteCar } = useCars();
  const [password, setPassword] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(password)) {
      setPassword('');
    } else {
      setError('Incorrect passcode. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    deleteCar(id);
    setDeletingId(null);
  };

  const filteredCars = cars.filter(c => 
    `${c.brand} ${c.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
          <div className="text-center mb-8">
            <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-red-600/20">
              <LayoutDashboard size={32} />
            </div>
            <h1 className="text-3xl font-black uppercase font-heading text-gray-900 tracking-tight">Admin Portal</h1>
            <p className="text-gray-500 mt-2 font-medium">Please enter the security passcode to manage Carz-34 inventory.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type="password"
                required
                placeholder="Enter Passcode"
                className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none transition-all ${error ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-red-500'}`}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {error && (
                <div className="flex items-center mt-2 text-red-600 text-xs font-bold uppercase tracking-tight ml-2">
                  <ShieldAlert size={14} className="mr-1" />
                  {error}
                </div>
              )}
            </div>
            <button 
              type="submit"
              className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 shadow-xl"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Authorized</span>
              <h1 className="text-4xl font-black uppercase font-heading tracking-tight">Inventory <span className="text-red-600">Manager</span></h1>
            </div>
            <p className="text-gray-500 font-medium">Currently controlling {cars.length} vehicles in Chandrapur outlet.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold uppercase text-sm flex items-center space-x-2 shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors"
            >
              <Plus size={18} />
              <span>Add New Car</span>
            </button>
            <button 
              onClick={logout}
              className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold uppercase text-sm flex items-center space-x-2 hover:bg-black transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/30">
            <Search className="text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search by brand, model or fuel..."
              className="flex-grow font-bold outline-none bg-transparent text-gray-800"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-5">Vehicle Details</th>
                  <th className="px-6 py-5">Visibility</th>
                  <th className="px-6 py-5">Valuation</th>
                  <th className="px-6 py-5">MFG Year</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCars.length > 0 ? filteredCars.map(car => (
                  <tr key={car.id} className={`transition-all duration-300 ${deletingId === car.id ? 'bg-red-50' : 'hover:bg-gray-50/50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img src={car.images[0]} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                        <div>
                          <div className="font-black uppercase text-sm text-gray-900">{car.brand} {car.model}</div>
                          <div className="text-xs text-gray-500 font-bold uppercase tracking-tighter">{car.fuelType} • {car.transmission}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {deletingId === car.id ? (
                        <div className="flex items-center text-red-600 font-black text-[10px] uppercase tracking-widest">
                          <AlertTriangle size={14} className="mr-2" />
                          Removing from stock...
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {car.featured && <span className="bg-red-50 text-red-600 text-[9px] font-black px-2 py-0.5 rounded uppercase border border-red-100">Featured</span>}
                          {car.verified && <span className="bg-green-50 text-green-600 text-[9px] font-black px-2 py-0.5 rounded uppercase border border-green-100">Verified</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900">₹{car.price}L</td>
                    <td className="px-6 py-4 text-gray-500 font-bold">{car.year}</td>
                    <td className="px-6 py-4 text-right">
                      {deletingId === car.id ? (
                        <div className="flex justify-end space-x-2 animate-in slide-in-from-right-2 duration-200">
                          <button 
                            onClick={() => setDeletingId(null)}
                            className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase flex items-center hover:bg-gray-300 transition-colors"
                          >
                            <RotateCcw size={12} className="mr-1" />
                            Cancel
                          </button>
                          <button 
                            onClick={() => handleDelete(car.id)}
                            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase flex items-center hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                          >
                            <Check size={12} className="mr-1" />
                            Confirm
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-1">
                          <button 
                            onClick={() => setEditingCar(car)}
                            className="p-2.5 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors border border-transparent hover:border-blue-100"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => setDeletingId(car.id)}
                            className="p-2.5 hover:bg-red-50 text-red-600 rounded-xl transition-colors border border-transparent hover:border-red-100"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <Search size={32} className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-black uppercase text-sm tracking-widest">No matching vehicles found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isAdding || editingCar) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">{editingCar ? 'Update Car Details' : 'Add New Inventory'}</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Carz-34 Management System</p>
              </div>
              <button onClick={() => { setIsAdding(false); setEditingCar(null); }} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <CarForm 
                initialData={editingCar || undefined}
                onCancel={() => { setIsAdding(false); setEditingCar(null); }}
                onSubmit={(data) => {
                  if (editingCar) {
                    updateCar(editingCar.id, data);
                  } else {
                    addCar(data);
                  }
                  setIsAdding(false);
                  setEditingCar(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
