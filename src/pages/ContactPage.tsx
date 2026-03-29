import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission:', formData);
    // Add logic here to hit an API endpoint if needed
  };

  return (
    <main className="bg-slate-50 text-slate-900 selection:bg-accent selection:text-white">
      <Navbar />
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black font-syne text-slate-900 mb-4 tracking-tight">Contact Us</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-dm">
              Ready to start your next digital project? Get in touch with our IT Consulting and Software Solutions experts today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Contact Information */}
            <div className="bg-slate-900 text-white p-10 sm:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/10 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold font-syne mb-6">Let's Connect</h2>
                <p className="text-slate-300 mb-10 leading-relaxed font-dm text-sm sm:text-base">
                  Whether you have a question about our React.js/Node.js stack, need a quote for Custom Web Solutions, or just want to explore possibilities, our team in India is ready to respond.
                </p>
                
                <div className="space-y-8 font-dm">
                  <div className="flex items-start gap-4">
                    <div className="p-2 border border-white/10 rounded-lg bg-white/5 shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">Our Location</h3>
                      <p className="text-slate-400 mt-1 text-sm">Sirsa / Hisar<br/>Haryana, India</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 border border-white/10 rounded-lg bg-white/5 shrink-0">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">Call Us</h3>
                      <p className="text-slate-400 mt-1 text-sm">+91 [Your Phone Number]</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 border border-white/10 rounded-lg bg-white/5 shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">Email Us</h3>
                      <p className="text-slate-400 mt-1 text-sm">wisdomcoresolutions@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-10 sm:p-12">
              <h3 className="text-2xl font-bold font-syne text-slate-900 mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6 font-dm">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold font-syne text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors bg-slate-50 focus:bg-white text-sm"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold font-syne text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors bg-slate-50 focus:bg-white text-sm"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold font-syne text-slate-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors bg-slate-50 focus:bg-white resize-none text-sm"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-secondary text-white font-bold font-syne py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent/20 hover:shadow-accent/40"
                >
                  Send Message <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContactPage;
