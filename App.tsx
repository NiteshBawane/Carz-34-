
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import CarDetails from './pages/CarDetails';
import { BUSINESS_INFO } from './constants';
import { MessageCircle } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { CarProvider } from './context/CarContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Placeholder pages
const ServicesPage = () => (
  <div className="py-24 text-center">
    <h1 className="text-4xl font-black uppercase mb-4">Our Services</h1>
    <p className="text-gray-500">Full details coming soon. Visit our Chandrapur outlet for immediate support.</p>
  </div>
);

const AboutPage = () => (
  <div className="py-24 max-w-4xl mx-auto px-6">
    <h1 className="text-5xl font-black uppercase mb-12">About <span className="text-red-600">Carz-34</span></h1>
    <div className="prose prose-lg max-w-none space-y-8 text-gray-600">
      <p className="text-xl font-bold text-gray-900">Carz-34 is Chandrapur's premier destination for high-quality, pre-owned automobiles.</p>
      <p>Founded on the principles of transparency and trust, we have served the people of Chandrapur and surrounding districts for years, building a reputation as the most reliable second-hand car dealer in the region.</p>
      <div className="bg-black p-10 rounded-[3rem] text-white my-12">
        <h3 className="text-3xl font-black text-red-600 mb-4 uppercase">Our Mission</h3>
        <p className="text-gray-300 italic">"To redefine the pre-owned car buying experience by providing genuine, well-maintained vehicles at fair market prices with total transparency."</p>
      </div>
      <p>Our fleet undergoes a rigorous inspection process before it ever reaches our showroom floor. From engine health to aesthetic detailing, we ensure that every car leaving our lot is ready for thousands of kilometers of safe driving.</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp.replace(/\s+/g, '')}`;

  return (
    <AuthProvider>
      <CarProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/car/:id" element={<CarDetails />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white pt-20 pb-10 border-t border-red-900/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <div className="bg-red-600 p-2 rounded-lg">
                        <div className="w-6 h-6 flex items-center justify-center font-black text-white">C</div>
                      </div>
                      <span className="text-2xl font-black font-heading uppercase tracking-tighter">CARZ-34</span>
                    </div>
                    <p className="text-gray-400 font-medium leading-relaxed">
                      Trusted Pre-Owned Cars in Chandrapur. Quality assured, price guaranteed.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-red-500 mb-6">Quick Links</h4>
                    <ul className="space-y-4 font-bold text-gray-300 uppercase text-xs tracking-widest">
                      <li><Link to="/inventory" className="hover:text-red-500 transition-colors">Browse Cars</Link></li>
                      <li><Link to="/about" className="hover:text-red-500 transition-colors">About Dealer</Link></li>
                      <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact Us</Link></li>
                      <li><Link to="/admin" className="hover:text-red-500 transition-colors">Admin Portal</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-red-500 mb-6">Contact Us</h4>
                    <ul className="space-y-4 font-medium text-gray-300">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">A:</span>
                        {BUSINESS_INFO.address}
                      </li>
                      <li>
                        <span className="text-gray-500 mr-2">P:</span>
                        {BUSINESS_INFO.phone}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-red-500 mb-6">Business Hours</h4>
                    <ul className="space-y-2 text-gray-400 font-medium">
                      <li className="flex justify-between"><span>Mon - Sat:</span> <span>10:00 - 20:00</span></li>
                      <li className="flex justify-between"><span>Sunday:</span> <span className="text-red-500">Closed</span></li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    © 2026 Carz-34 Chandrapur.
                  </p>
                  <div className="flex space-x-6">
                    <Link to="/admin" className="text-[10px] text-gray-700 hover:text-red-500 font-black uppercase tracking-tighter">Admin Access</Link>
                  </div>
                </div>
              </div>
            </footer>

            {/* Floating Action Button (WhatsApp) */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-8 right-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-600/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
            >
              <MessageCircle size={32} />
            </a>
          </div>
        </Router>
      </CarProvider>
    </AuthProvider>
  );
};

export default App;
