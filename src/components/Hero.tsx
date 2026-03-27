import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Shield, Globe } from 'lucide-react';

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '5yr', label: 'Industry Experience' },
];

const FEATURES = [
  { icon: Zap,    label: 'High-Performance Backends' },
  { icon: Shield, label: 'Enterprise-Grade Security' },
  { icon: Globe,  label: 'Scalable Cloud Infrastructure' },
];

const FloatingCard = ({
  delay = 0,
  className = '',
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/60 p-4 ${className}`}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white hero-grid">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-accent/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-accent-secondary/6 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase font-dm">Next-Gen IT Ecosystems</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-syne leading-[1.08] tracking-tight mb-6"
            >
              Crafting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">
                Digital
              </span>
              <br />
              Excellence.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-slate-500 text-base leading-relaxed max-w-lg mb-8 font-dm"
            >
              Empowering enterprises with bespoke React ecosystems, high-performance 
              Node.js backends, and scalable cloud infrastructure.
            </motion.p>

            {/* Feature checklist */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col gap-2.5 mb-10"
            >
              {FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-slate-600 font-medium font-dm">
                  <Icon size={15} className="text-accent shrink-0" />
                  {label}
                </li>
              ))}
            </motion.ul>

            {/* CTAs — primary has shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                className="btn-shimmer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-secondary text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all group font-dm"
              >
                Start Your Project
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-800 px-8 py-4 rounded-xl font-bold text-sm border border-slate-200 hover:border-slate-300 transition-all font-dm"
              >
                View Our Work
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="flex gap-8 mt-12 pt-8 border-t border-slate-100"
            >
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black font-syne text-slate-900">{value}</p>
                  <p className="text-[11px] text-slate-400 font-semibold tracking-wide mt-0.5 font-dm">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Floating Dashboard Visual ── */}
          <div className="relative hidden lg:block h-[540px]">
            {/* Main chart card */}
            <FloatingCard delay={0.4} className="absolute inset-x-4 top-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-dm">Live Dashboard</p>
                  <p className="text-sm font-bold text-slate-800 font-syne mt-0.5">Project Overview</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-dm">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  All Systems Live
                </span>
              </div>
              {/* Animated bar chart */}
              <div className="flex items-end gap-1.5 h-16">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.6 + i * 0.04, duration: 0.4 }}
                    style={{ height: `${h}%`, originY: 1 }}
                    className={`flex-1 rounded-sm ${i === 11 ? 'bg-gradient-to-t from-accent to-accent-secondary' : 'bg-slate-100 hover:bg-slate-200 transition-colors'}`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[9px] text-slate-300 font-medium font-dm">Jan</span>
                <span className="text-[9px] text-slate-300 font-medium font-dm">Dec</span>
              </div>
            </FloatingCard>

            {/* Delivered metric */}
            <FloatingCard delay={0.6} className="absolute bottom-12 left-0 w-44">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                  <CheckCircle size={14} className="text-accent" />
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider font-dm">Delivered</p>
              </div>
              <p className="text-3xl font-black font-syne text-slate-900">50+</p>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium font-dm">Projects this year</p>
            </FloatingCard>

            {/* Tech stack chips */}
            <FloatingCard delay={0.7} className="absolute bottom-0 right-0 w-52">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 font-dm">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript', 'Docker'].map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-accent/8 text-accent text-[9px] font-black uppercase tracking-wide rounded-lg border border-accent/10 font-dm">
                    {tech}
                  </span>
                ))}
              </div>
            </FloatingCard>

            {/* Deployment notification */}
            <FloatingCard delay={0.8} className="absolute top-6 -right-2 w-52 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shrink-0">
                <Zap size={13} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-800 leading-tight font-syne">New deployment live</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-dm">Construction ERP v2.1</p>
              </div>
            </FloatingCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
