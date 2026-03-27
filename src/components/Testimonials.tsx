import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, CheckCircle2 } from 'lucide-react';

interface ReviewType {
  _id: string;
  name: string;
  text: string;
  rating: number;
}

const DEFAULT_REVIEWS: ReviewType[] = [
  {
    _id: 'default-rev-1',
    name: "Satoshi Nakamoto",
    text: "The decentralized architecture implemented by WCS is second to none. Absolute precision in their React ecosystems.",
    rating: 5
  },
  {
    _id: 'default-rev-2',
    name: "Vitalik Buterin",
    text: "Remarkable engineering. Their attention to detail in system optimization and UI performance is world-class.",
    rating: 5
  }
];

const Testimonials = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (!res.ok) throw new Error('Review signal interrupted');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Testimonial Signal Lost - Loading Local Archives:', err);
      setReviews(DEFAULT_REVIEWS);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // We'll create a public POST /api/reviews for users
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus('idle');
          setNewReview({ name: '', text: '', rating: 5 });
          fetchReviews(); // Optional: Re-fetch to show the new review immediately
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="reviews" className="py-28 bg-slate-50 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-syne mb-4 tracking-tight text-slate-900">Voices of <span className="premium-gradient-text">Impact.</span></h2>
            <p className="text-slate-500 text-lg italic uppercase tracking-widest text-xs font-bold">Client Testimonials & Feedback</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold hover:bg-accent hover:text-white hover:border-accent transition-all group text-slate-700"
          >
            Leave a Review <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="testimonial-quote relative p-8 bg-white border border-slate-100 rounded-2xl group hover:border-accent/30 transition-all shadow-sm hover:shadow-lg hover:shadow-accent/5 overflow-hidden"
            >
              <Quote className="absolute top-8 right-8 text-slate-100 w-12 h-12 group-hover:text-accent/10 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed font-dm text-sm">{review.text}</p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center font-bold text-accent shadow-[0_0_10px_rgba(6,182,212,0.1)]">{review.name[0]}</div>
                <div className="font-bold text-slate-900">{review.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 text-slate-900">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="relative w-full max-w-lg bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full text-slate-400"><X/></button>
              
              {status === 'success' ? (
                <div className="text-center py-20">
                    <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
                    <h3 className="text-3xl font-bold font-syne uppercase">Signal Sent</h3>
                    <p className="text-slate-500 mt-2">Thank you for your valuable feedback.</p>
                </div>
              ) : (
                <>
                <h3 className="text-3xl font-bold font-syne mb-8 uppercase tracking-tight">Express Your <span className="text-accent">Impact</span></h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Identity</label>
                        <input required value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-accent outline-none transition-colors placeholder:text-slate-400" placeholder="E.g. Elon Musk"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Excellence Rating (1-5)</label>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4, 5].map(num => (
                                <button 
                                    key={num} 
                                    type="button"
                                    onClick={() => setNewReview({...newReview, rating: num})}
                                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${newReview.rating === num ? 'bg-accent border-accent text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-slate-50 border-slate-200 hover:border-accent/40 text-slate-500'}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Terminal Feedback</label>
                        <textarea required rows={4} value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:border-accent outline-none transition-colors placeholder:text-slate-400" placeholder="Describe your experience with our engineering..."></textarea>
                    </div>
                    <button className="w-full py-5 bg-slate-900 text-white hover:bg-accent rounded-2xl font-bold transition-all shadow-xl">
                        {status === 'loading' ? 'Encrypting Archive...' : 'Broadcast Feedback'}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-sm mt-3 text-center font-bold uppercase tracking-tight">Signal Interference. Please try again.</p>}
                </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
