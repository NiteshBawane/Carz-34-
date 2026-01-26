
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', carInterest: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-black py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase font-heading">Get in <span className="text-red-600">Touch</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">Have questions about a car or want to sell yours? Our team in Chandrapur is here to help.</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info & Details */}
          <div>
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="bg-red-600 p-4 rounded-2xl shadow-xl shadow-red-600/20">
                  <Phone className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Call Support</h3>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-3xl font-black text-gray-900 hover:text-red-600 transition-colors">
                    {BUSINESS_INFO.phone}
                  </a>
                  <p className="text-gray-500 mt-2 font-medium">Available 10:00 AM - 08:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-green-500 p-4 rounded-2xl shadow-xl shadow-green-600/20">
                  <MessageSquare className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">WhatsApp Us</h3>
                  <a href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/\s+/g, '')}`} className="text-3xl font-black text-gray-900 hover:text-green-600 transition-colors">
                    Chat Now
                  </a>
                  <p className="text-gray-500 mt-2 font-medium">Instant response during business hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-zinc-900 p-4 rounded-2xl shadow-xl shadow-black/10">
                  <MapPin className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Visit Outlet</h3>
                  <p className="text-2xl font-black text-gray-900 leading-tight">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="text-gray-500 mt-2 font-medium">Chandrapur, Maharashtra 442401</p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl h-80 border-4 border-gray-50">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119564.08502319082!2d79.2062!3d19.9511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2d04344d32a49b%3A0x6a059d04f14d9b40!2sChandrapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-gray-50 p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase font-heading">Online <span className="text-red-600">Enquiry</span></h2>
            
            {submitted ? (
              <div className="text-center py-20 animate-in zoom-in duration-300">
                <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">Message Sent!</h3>
                <p className="text-gray-600 mb-8 font-medium">Thank you for reaching out. Our team will contact you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Full Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 bg-white border-2 border-transparent focus:border-red-500 rounded-2xl font-bold transition-all outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 00000 00000"
                      className="w-full px-6 py-4 bg-white border-2 border-transparent focus:border-red-500 rounded-2xl font-bold transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Car Interest</label>
                    <input 
                      type="text"
                      value={formData.carInterest}
                      onChange={(e) => setFormData({...formData, carInterest: e.target.value})}
                      placeholder="e.g. Maruti Swift"
                      className="w-full px-6 py-4 bg-white border-2 border-transparent focus:border-red-500 rounded-2xl font-bold transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Your Message</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-6 py-4 bg-white border-2 border-transparent focus:border-red-500 rounded-2xl font-bold transition-all outline-none resize-none"
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-6 rounded-2xl font-black uppercase text-lg tracking-widest flex items-center justify-center space-x-4 transition-all transform active:scale-95 shadow-xl shadow-red-600/20"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
