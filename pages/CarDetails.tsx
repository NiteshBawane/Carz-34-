
import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { 
  ChevronLeft, 
  Fuel, 
  Gauge, 
  Smartphone, 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  Tag, 
  Info,
  Phone,
  MessageSquare,
  ChevronRight,
  Zap,
  CheckCircle
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import CarCard from '../components/CarCard';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cars } = useCars();
  const navigate = useNavigate();

  const car = useMemo(() => cars.find(c => c.id === id), [cars, id]);
  const similarCars = useMemo(() => {
    if (!car) return [];
    return cars
      .filter(c => c.id !== car.id && (c.bodyType === car.bodyType || c.brand === car.brand))
      .slice(0, 3);
  }, [cars, car]);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-black uppercase mb-4">Vehicle Not Found</h2>
        <Link to="/inventory" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold uppercase">Back to Inventory</Link>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/${BUSINESS_INFO.whatsapp.replace(/\s+/g, '')}?text=Hi, I am interested in the ${car.brand} ${car.model} (${car.year}) priced at ₹${car.price}L. Can you provide more details?`;

  const specs = [
    { label: 'Year', value: car.year, icon: Calendar },
    { label: 'Fuel Type', value: car.fuelType, icon: Fuel },
    { label: 'Mileage', value: `${car.mileage.toLocaleString()} km`, icon: Gauge },
    { label: 'Transmission', value: car.transmission, icon: Smartphone },
    { label: 'Body Type', value: car.bodyType, icon: Tag },
    { label: 'Location', value: 'Chandrapur', icon: MapPin },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/inventory" 
            className="inline-flex items-center text-sm font-black uppercase text-gray-500 hover:text-red-600 transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Search
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Visuals & Description */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
              <div className="relative aspect-[16/9] overflow-hidden group">
                <img 
                  src={car.images[0]} 
                  alt={car.brand + ' ' + car.model} 
                  className="w-full h-full object-cover"
                />
                {car.featured && (
                  <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                    Featured Arrival
                  </div>
                )}
                {car.verified && (
                  <div className="absolute bottom-6 left-6 bg-green-500 text-white px-4 py-2 rounded-2xl flex items-center shadow-2xl border-2 border-white/20">
                    <ShieldCheck size={20} className="mr-2" />
                    <span className="font-black uppercase text-[10px] tracking-widest">150+ Point Quality Checked</span>
                  </div>
                )}
              </div>
            </div>

            {/* Overview Section */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 text-red-600 mb-4">
                <Info size={20} />
                <h2 className="text-xs font-black uppercase tracking-widest">Vehicle Overview</h2>
              </div>
              <p className="text-gray-700 text-lg font-medium leading-relaxed whitespace-pre-wrap">
                {car.description || `This well-maintained ${car.brand} ${car.model} from ${car.year} is an excellent choice for anyone looking for reliability and performance in Chandrapur. Features include a clean history and a smooth ${car.transmission.toLowerCase()} drive.`}
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <CheckCircle size={20} className="text-green-500 mr-3 shrink-0" />
                  <span className="text-sm font-bold text-gray-700">RC Transfer Assistance Included</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <CheckCircle size={20} className="text-green-500 mr-3 shrink-0" />
                  <span className="text-sm font-bold text-gray-700">Loan & Insurance Support Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Info & CTA */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">{car.brand}</span>
                    <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">In Stock</span>
                  </div>
                  <h1 className="text-4xl font-black uppercase text-gray-900 leading-tight mb-2 tracking-tighter">
                    {car.model} <span className="text-red-600">{car.year}</span>
                  </h1>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-5xl font-black text-gray-900 tracking-tighter">₹ {car.price}</span>
                    <span className="text-xl font-black text-gray-500 uppercase tracking-tighter">Lakhs</span>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="bg-gray-100 p-2.5 rounded-xl text-red-600">
                        <spec.icon size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{spec.label}</p>
                        <p className="text-sm font-black text-gray-900 uppercase">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="space-y-4">
                  <a 
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-zinc-800 transition-all shadow-xl active:scale-95"
                  >
                    <Phone size={20} />
                    <span>Call Dealer</span>
                  </a>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-green-600 transition-all shadow-xl active:scale-95"
                  >
                    <MessageSquare size={20} />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Zap size={20} className="text-red-600" />
                      <span className="text-sm font-black uppercase tracking-tight text-gray-800">Check Finance Offers</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-red-600 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Safety Tag */}
              <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-[2rem] text-white shadow-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <ShieldCheck size={24} />
                  <span className="font-black uppercase text-sm tracking-widest">Carz-34 Assurance</span>
                </div>
                <p className="text-xs font-medium opacity-90 leading-relaxed">
                  Every vehicle at Carz-34 undergoes a rigorous verification process. We guarantee genuine documentation and transparent vehicle history.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Inventory */}
        {similarCars.length > 0 && (
          <section className="mt-24 pt-24 border-t border-gray-100">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tight">Similar <span className="text-red-600">Stock</span></h2>
              <Link to="/inventory" className="text-xs font-black uppercase text-red-600 tracking-widest flex items-center hover:underline">
                View Full Inventory <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarCars.map(c => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
