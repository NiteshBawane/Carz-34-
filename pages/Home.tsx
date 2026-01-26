
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Smartphone, 
  MessageCircle,
  Clock,
  Car as CarIcon,
  BrainCircuit,
  Send
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import { useCars } from '../context/CarContext';
import CarCard from '../components/CarCard';
import { getCarRecommendation } from '../services/geminiService';

const Home: React.FC = () => {
  const { cars } = useCars();
  const featuredCars = cars.filter(car => car.featured).slice(0, 3);
  
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleConsultant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isThinking) return;
    
    setIsThinking(true);
    setAiResponse('');
    const result = await getCarRecommendation(query, cars);
    setAiResponse(result || '');
    setIsThinking(false);
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden car-gradient">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000" 
            alt="Premium Cars" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <span className="inline-block bg-red-600 text-white text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-sm mb-6 animate-bounce">
              Trusted in Chandrapur
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 font-heading uppercase">
              Drive Your <br/>
              <span className="text-red-600 italic">Dream</span> Home.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 font-medium leading-relaxed max-w-2xl">
              Quality Second-Hand Cars with Guaranteed 150-Point Inspection and Easy Financing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/inventory" 
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black uppercase text-lg tracking-widest flex items-center justify-center space-x-3 transition-all transform hover:scale-105"
              >
                <span>View All Cars</span>
                <ArrowRight size={24} />
              </Link>
              <a 
                href={`tel:${BUSINESS_INFO.phone}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase text-lg tracking-widest flex items-center justify-center space-x-3 transition-all"
              >
                <Smartphone size={24} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="bg-red-600 p-3 rounded-xl"><CheckCircle2 className="text-white" /></div>
              <div>
                <h4 className="text-white font-black uppercase text-sm">Verified History</h4>
                <p className="text-gray-400 text-xs">Certified inspection</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="bg-red-600 p-3 rounded-xl"><Clock className="text-white" /></div>
              <div>
                <h4 className="text-white font-black uppercase text-sm">Fast RC Transfer</h4>
                <p className="text-gray-400 text-xs">Hassle-free process</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="bg-red-600 p-3 rounded-xl"><Sparkles className="text-white" /></div>
              <div>
                <h4 className="text-white font-black uppercase text-sm">Quality Checked</h4>
                <p className="text-gray-400 text-xs">150+ point check</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="bg-red-600 p-3 rounded-xl"><MessageCircle className="text-white" /></div>
              <div>
                <h4 className="text-white font-black uppercase text-sm">Expert Support</h4>
                <p className="text-gray-400 text-xs">24/7 After-sales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Inventory */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase font-heading">Featured <span className="text-red-600">Arrivals</span></h2>
              <p className="text-gray-500 font-medium">Hand-picked premium vehicles available at our Chandrapur outlet.</p>
            </div>
            <Link 
              to="/inventory" 
              className="group flex items-center text-gray-900 font-black uppercase text-sm tracking-widest hover:text-red-600 transition-colors"
            >
              <span>Explore All Cars</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Smart Consultant Section */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full mb-6">
              <BrainCircuit className="text-red-600" size={18} />
              <span className="text-xs font-black uppercase tracking-widest text-red-500">Thinking Mode Enabled</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase font-heading mb-6 tracking-tight">
              Smart Car <span className="text-red-600 italic">Consultant</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
              Not sure which car fits your lifestyle? Our AI consultant thinks deeply to provide expert recommendations tailored to your specific needs.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl">
            <form onSubmit={handleConsultant} className="relative mb-8">
              <input 
                type="text"
                placeholder="Ex: I need a fuel-efficient SUV for a family of 5 within 12 Lakhs..."
                className="w-full bg-black/50 border-2 border-zinc-800 focus:border-red-600 px-8 py-6 rounded-3xl text-lg font-bold outline-none transition-all pr-16"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isThinking}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 p-4 rounded-2xl text-white hover:bg-red-700 transition-colors disabled:bg-zinc-700"
              >
                {isThinking ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </form>

            {(isThinking || aiResponse) && (
              <div className="bg-black/40 rounded-3xl p-8 border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {isThinking ? (
                  <div className="flex items-center space-x-4 text-red-500">
                    <div className="relative">
                      <div className="w-10 h-10 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
                      <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={16} />
                    </div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-sm">Consultant is Thinking Deeply...</p>
                      <p className="text-xs text-zinc-500 font-bold uppercase mt-1">Analyzing specs, market value, and user intent</p>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-red-600 p-2 rounded-lg">
                        <BrainCircuit size={20} className="text-white" />
                      </div>
                      <span className="font-black uppercase tracking-widest text-xs text-red-500">Expert Recommendation</span>
                    </div>
                    <p className="text-gray-300 font-medium leading-relaxed whitespace-pre-wrap">
                      {aiResponse}
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                      <Link to="/inventory" className="text-xs font-black uppercase text-red-500 hover:text-red-400 flex items-center space-x-2">
                        <span>Browse Matches in Inventory</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-10">
          <CarIcon size={600} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase font-heading">Sell Your Car at Best Price?</h2>
          <p className="text-xl md:text-2xl font-medium mb-10 opacity-90">Instant valuation, quick payment, and zero documentation hassle. Visit us today!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/contact" 
              className="bg-black text-white px-12 py-5 rounded-2xl font-black uppercase text-lg tracking-widest hover:scale-105 transition-transform"
            >
              Get Free Evaluation
            </Link>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/\s+/g, '')}`}
              className="bg-white text-red-600 px-12 py-5 rounded-2xl font-black uppercase text-lg tracking-widest hover:scale-105 transition-transform shadow-xl"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
