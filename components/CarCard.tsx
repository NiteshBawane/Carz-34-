
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { Fuel, Gauge, ShieldCheck, MapPin, Calendar, Smartphone } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface Props {
  car: Car;
}

const CarCard: React.FC<Props> = ({ car }) => {
  const whatsappLink = `https://wa.me/${BUSINESS_INFO.whatsapp.replace(/\s+/g, '')}?text=Hi, I am interested in the ${car.brand} ${car.model} (${car.year}) priced at ₹${car.price}L. Is it available?`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
      {/* Image Section - Clickable */}
      <Link to={`/car/${car.id}`} className="relative aspect-[16/10] overflow-hidden block">
        <img 
          src={car.images[0]} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
          {car.bodyType}
        </div>
        {car.verified && (
          <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full shadow-lg border-2 border-white">
            <ShieldCheck size={18} />
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-bold">
          ₹ {car.price} Lakhs
        </div>
      </Link>

      {/* Details Section */}
      <div className="p-5 flex-grow flex flex-col">
        <Link to={`/car/${car.id}`} className="block group/title">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-black text-gray-900 leading-tight tracking-tight uppercase group-hover/title:text-red-600 transition-colors">
                {car.brand} {car.model}
              </h3>
              <p className="text-gray-500 text-xs font-medium flex items-center mt-1">
                <Calendar size={14} className="mr-1" /> {car.year} Model
              </p>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 my-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Fuel size={16} className="text-red-500 mr-2" />
            <span className="font-semibold">{car.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Gauge size={16} className="text-red-500 mr-2" />
            <span className="font-semibold">{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Smartphone size={16} className="text-red-500 mr-2" />
            <span className="font-semibold">{car.transmission}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={16} className="text-red-500 mr-2" />
            <span className="font-semibold truncate">Chandrapur</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 mt-auto flex space-x-3">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Ask Detail</span>
          </a>
          <a 
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex-1 bg-black hover:bg-zinc-800 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-colors border border-zinc-700"
          >
            <span>Call Dealer</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
