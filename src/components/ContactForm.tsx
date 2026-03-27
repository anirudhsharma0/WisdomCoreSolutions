import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'Web Development', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const servicesList = [
    'Web Development',
    'Enterprise ERP',
    'Mobile Application',
    'Cyber Security',
    'Cloud Migration',
    'AI Solutions'
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', service: 'Web Development', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 text-slate-900">
        <div className="max-w-6xl mx-auto rounded-[3rem] bg-white border border-slate-100 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-slate-200/60">
          <div className="p-12 lg:w-[40%] bg-accent/10 flex flex-col justify-center">
            <h2 className="text-5xl font-bold font-syne mb-6 leading-tight text-slate-900">Let's build something <span className="premium-gradient-text uppercase tracking-tighter">Legendary.</span></h2>
            <p className="text-slate-500 mb-8 italic text-lg opacity-80">"We translate complex business logic into seamless, high-performance digital experiences for modern enterprises."</p>
          </div>
          
          <div className="p-12 lg:w-[60%]">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-2 font-syne uppercase tracking-tight">Transmission Received</h3>
                <p className="text-slate-500">Our engineering team will contact you within 24 hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-10 px-8 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold hover:bg-accent hover:text-white hover:border-accent transition-all text-slate-600"
                >
                  Send New Signal
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Full Identity</label>
                  <input 
                    type="text" 
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent transition-all placeholder:text-slate-400 text-slate-900"
                    placeholder="E.g. Alexander Pierce"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Digital Mail</label>
                  <input 
                    type="email" 
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent transition-all placeholder:text-slate-400 text-slate-900"
                    placeholder="name@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Direct Line</label>
                  <input 
                    type="tel" 
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent transition-all placeholder:text-slate-400 text-slate-900"
                    placeholder="+91 0000 000000"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Strategic Service</label>
                  <div className="relative">
                    <select 
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer text-slate-900"
                    >
                      {servicesList.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Project Blueprint</label>
                  <textarea 
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent transition-all placeholder:text-slate-400 text-slate-900"
                    placeholder="Describe your enterprise requirements..."
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button 
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all group disabled:opacity-50 shadow-xl"
                  >
                    {status === 'loading' ? 'Engineering Assets...' : (
                      <>Initiate Project Engagement <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                  </button>
                  {status === 'error' && <p className="text-red-500 text-sm mt-3 text-center font-bold uppercase tracking-tight">Signal Interference. Please try again.</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
