import { motion } from 'framer-motion';
import { TrendingUp, Award, Handshake } from 'lucide-react';

const PILLARS = [
  { icon: TrendingUp, label: '100% Project Delivery' },
  { icon: Award,      label: 'Proven Excellence' },
  { icon: Handshake,  label: 'Lasting Partnerships' },
];

const TrustBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#1e1040] to-slate-900 py-20">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60 font-dm">
              Our Mission
            </span>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black font-syne text-white leading-tight tracking-tight mb-14"
          >
            "Our success is measured by the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              growth of our clients.
            </span>{' '}
            With 100% project delivery and lasting digital partnerships, we don't just build software—we build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              trust.
            </span>
            "
          </motion.blockquote>

          {/* Pillar stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          >
            {PILLARS.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center gap-3">
                {i > 0 && (
                  <div className="hidden sm:block w-px h-8 bg-white/10" />
                )}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <span className="text-sm font-bold text-white/80 font-dm tracking-wide">{label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
