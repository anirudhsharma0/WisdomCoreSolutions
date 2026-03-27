import { motion } from 'framer-motion';
import { Globe, Database, ShieldCheck, Cpu, Smartphone, BarChart3 } from 'lucide-react';

const services = [
  {
    title: 'Web Arsenals',
    desc: 'High-performance React & Next.js web ecosystems designed for massive scale.',
    icon: Globe,
    color: 'from-purple-500 to-indigo-600',
    light: 'bg-purple-50',
    text: 'text-purple-600',
  },
  {
    title: 'Enterprise ERP',
    desc: 'Bespoke ERP solutions to streamline complex construction and dairy operations.',
    icon: Database,
    color: 'from-blue-500 to-cyan-600',
    light: 'bg-blue-50',
    text: 'text-blue-600',
  },
  {
    title: 'Cyber Security',
    desc: 'JWT-based authentication and end-to-end data encryption for enterprise safety.',
    icon: ShieldCheck,
    color: 'from-emerald-500 to-teal-600',
    light: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  {
    title: 'Core Backend',
    desc: 'Robust Node.js & Express servers optimized for Vercel serverless deployment.',
    icon: Cpu,
    color: 'from-orange-500 to-amber-600',
    light: 'bg-orange-50',
    text: 'text-orange-600',
  },
  {
    title: 'Mobile Apps',
    desc: 'React Native & Expo solutions for high-fidelity cross-platform experiences.',
    icon: Smartphone,
    color: 'from-pink-500 to-rose-600',
    light: 'bg-pink-50',
    text: 'text-pink-600',
  },
  {
    title: 'Data Intelligence',
    desc: 'Advanced analytics dashboards with real-time tracking and reporting.',
    icon: BarChart3,
    color: 'from-violet-500 to-purple-600',
    light: 'bg-violet-50',
    text: 'text-violet-600',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-28 bg-slate-50 relative overflow-hidden">
      {/* Subtle top/bottom dividers */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-5 font-dm"
          >
            What We Build
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-syne tracking-tight mb-5"
          >
            Precision <span className="premium-gradient-text">Services.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed font-dm"
          >
            We don't just build websites — we engineer high-performance digital engines that drive business growth.
          </motion.p>
        </div>

        {/* 3-column compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top accent line on hover (via CSS class) */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl`} />

              {/* Icon */}
              <div className={`w-11 h-11 ${service.light} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <service.icon size={20} className={service.text} />
              </div>

              {/* Content */}
              <h3 className={`text-base font-bold font-syne mb-2 ${service.text} group-hover:text-slate-900 transition-colors`}>
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-dm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
