
import React, { useState, useRef } from 'react';
import { Car, FuelType, Transmission, CarBodyType } from '../types';
import { Upload, Link as LinkIcon, X, Image as ImageIcon } from 'lucide-react';

interface Props {
  initialData?: Car;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CarForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [imageMode, setImageMode] = useState<'upload' | 'url'>(initialData?.images?.[0]?.startsWith('data:') ? 'upload' : 'url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear(),
    price: initialData?.price || 0,
    mileage: initialData?.mileage || 0,
    fuelType: (initialData?.fuelType || 'Petrol') as FuelType,
    transmission: (initialData?.transmission || 'Manual') as Transmission,
    bodyType: (initialData?.bodyType || 'SUV') as CarBodyType,
    images: initialData?.images?.[0] || '',
    description: initialData?.description || '',
    verified: initialData?.verified ?? true,
    featured: initialData?.featured ?? false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size too large. Please select an image under 2MB for better performance.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, images: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.images) {
      alert("Please provide an image for the vehicle.");
      return;
    }
    onSubmit({
      ...formData,
      images: [formData.images], // Wrap current single image string in array
      year: Number(formData.year),
      price: Number(formData.price),
      mileage: Number(formData.mileage),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Brand</label>
          <input 
            required
            placeholder="e.g. Maruti Suzuki"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all"
            value={formData.brand}
            onChange={e => setFormData({...formData, brand: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Model</label>
          <input 
            required
            placeholder="e.g. Swift ZXI"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all"
            value={formData.model}
            onChange={e => setFormData({...formData, model: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Year</label>
          <input 
            type="number"
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all"
            value={formData.year}
            onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Price (Lakhs)</label>
          <input 
            type="number"
            step="0.01"
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all"
            value={formData.price}
            onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Mileage (km)</label>
          <input 
            type="number"
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all"
            value={formData.mileage}
            onChange={e => setFormData({...formData, mileage: parseInt(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Fuel Type</label>
          <select 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all appearance-none"
            value={formData.fuelType}
            onChange={e => setFormData({...formData, fuelType: e.target.value as FuelType})}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Transmission</label>
          <select 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all appearance-none"
            value={formData.transmission}
            onChange={e => setFormData({...formData, transmission: e.target.value as Transmission})}
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Body Type</label>
          <select 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all appearance-none"
            value={formData.bodyType}
            onChange={e => setFormData({...formData, bodyType: e.target.value as CarBodyType})}
          >
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase text-gray-400">Vehicle Image</label>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              type="button"
              onClick={() => setImageMode('upload')}
              className={`px-3 py-1 rounded-md text-[10px] font-black uppercase transition-all flex items-center space-x-1 ${imageMode === 'upload' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Upload size={12} />
              <span>Upload File</span>
            </button>
            <button 
              type="button"
              onClick={() => setImageMode('url')}
              className={`px-3 py-1 rounded-md text-[10px] font-black uppercase transition-all flex items-center space-x-1 ${imageMode === 'url' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LinkIcon size={12} />
              <span>Paste URL</span>
            </button>
          </div>
        </div>

        {imageMode === 'upload' ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all group"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {formData.images && formData.images.startsWith('data:') ? (
              <div className="relative inline-block">
                <img src={formData.images} alt="Preview" className="h-40 w-auto rounded-xl shadow-lg border-2 border-white object-cover" />
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFormData({...formData, images: ''}); }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-md"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-4 rounded-full mb-3 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                  <Upload size={32} />
                </div>
                <p className="text-sm font-bold text-gray-600">Click to upload image</p>
                <p className="text-[10px] text-gray-400 uppercase mt-1">PNG, JPG or WebP (Max 2MB)</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <input 
              required
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all"
              value={formData.images}
              onChange={e => setFormData({...formData, images: e.target.value})}
            />
            {formData.images && !formData.images.startsWith('data:') && (
              <div className="mt-2 flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <img src={formData.images} alt="URL Preview" className="h-20 w-32 object-cover rounded-lg shadow-sm" onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+Image+URL')} />
                <div>
                  <p className="text-xs font-black uppercase text-gray-400">URL Preview</p>
                  <p className="text-xs text-gray-600 truncate max-w-xs">{formData.images}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Description</label>
        <textarea 
          rows={3}
          placeholder="Brief details about vehicle condition, history, etc."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all resize-none"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="flex flex-wrap gap-8 py-2">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox"
              className="sr-only"
              checked={formData.featured}
              onChange={e => setFormData({...formData, featured: e.target.checked})}
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${formData.featured ? 'bg-red-600' : 'bg-gray-300'}`}></div>
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.featured ? 'translate-x-4' : ''}`}></div>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-600 group-hover:text-red-600 transition-colors">Featured Listing</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox"
              className="sr-only"
              checked={formData.verified}
              onChange={e => setFormData({...formData, verified: e.target.checked})}
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${formData.verified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.verified ? 'translate-x-4' : ''}`}></div>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-600 group-hover:text-green-600 transition-colors">Verified Car</span>
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
        <button 
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-200 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-8 py-3 bg-red-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95"
        >
          {initialData ? 'Save Changes' : 'List Vehicle'}
        </button>
      </div>
    </form>
  );
};

export default CarForm;
