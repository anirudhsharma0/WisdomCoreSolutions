import { motion } from 'framer-motion';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Cloud Migrations', value: '450+' },
    { label: 'Uptime SLA', value: '99.9%' },
    { label: 'Enterprise Partners', value: '120+' },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 text-slate-900">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-syne mb-8 tracking-tight text-slate-900 leading-tight">
              We Architect <span className="premium-gradient-text">Future-Proof</span> Infrastructure.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Founded on the principles of precision and innovation, WisdomCoreSolutions has evolved from a boutique consultancy into a specialized IT powerhouse. We don't just solve problems; we engineer ecosystems.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
              <div className="flex gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Target className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-sm sm:text-base">Our Mission</h4>
                  <p className="text-xs sm:text-sm text-slate-500 text-balance">To empower global enterprises with secure, scalable, and sophisticated digital assets.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Lightbulb className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-sm sm:text-base">Our Vision</h4>
                  <p className="text-xs sm:text-sm text-slate-500 text-balance">Leading the transition to AI-integrated ERP and high-fidelity React ecosystems.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-12 border-t border-slate-100 pt-8 sm:pt-12">
              {stats.map(stat => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-3xl font-bold font-syne text-accent mb-1">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent p-12 flex items-center justify-center">
                <TrendingUp size={200} className="text-accent/10 absolute -right-10 -bottom-10" />
                <div className="relative z-10 text-center">
                    <div className="w-32 h-32 bg-accent rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl shadow-accent/20">
                        <span className="text-4xl font-bold text-white">WCS</span>
                    </div>
                    <div className="text-2xl font-bold font-syne italic">"Excellence by Design"</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
