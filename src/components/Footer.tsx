import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Code2 } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from '../icons/SocialIcons';

const TECH_STACK = [
  'React', 'Node.js', 'MongoDB', 'TypeScript', 'Next.js', 'Express',
  'AWS', 'Docker', 'JWT', 'Tailwind CSS', 'Framer Motion', 'Vercel',
  'React', 'Node.js', 'MongoDB', 'TypeScript', 'Next.js', 'Express',
  'AWS', 'Docker', 'JWT', 'Tailwind CSS', 'Framer Motion', 'Vercel',
];

const Footer = () => {
  const [settings, setSettings] = useState({
    github: 'https://github.com/wisdomcoresolutions',
    linkedin: 'https://linkedin.com/company/wisdomcoresolutions',
    twitter: 'https://twitter.com/wisdom_core',
    instagram: 'https://instagram.com/wisdomcoresolutions',
    email: 'hq@wisdomcore.com',
    phone: '+1 (555) 000-0000',
    address: 'Global Operations / Remote Excellence'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => { if (!res.ok) throw new Error('Settings signal lost'); return res.json(); })
      .then(data => setSettings(data))
      .catch(err => console.error('Using Local HQ Settings Archive:', err));
  }, []);

  const socialLinks = [
    { icon: GitHubIcon,    href: settings.github,    label: 'GitHub' },
    { icon: LinkedInIcon,  href: settings.linkedin,  label: 'LinkedIn' },
    { icon: TwitterIcon,   href: settings.twitter,   label: 'Twitter' },
    { icon: InstagramIcon, href: settings.instagram, label: 'Instagram' },
  ].filter(link => link.href);

  return (
    <footer className="bg-white border-t border-slate-100 overflow-hidden relative">
      {/* ── Tech Ticker Marquee ── */}
      <div className="border-b border-slate-100 py-4 overflow-hidden bg-slate-50">
        <div className="marquee-track">
          {TECH_STACK.map((tech, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap font-dm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Block with tagline */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold font-syne tracking-tight">
                WisdomCore<span className="text-accent">Solutions</span>
              </span>
            </div>
            {/* Tagline */}
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-accent font-dm">
              Build. Scale. Dominate.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-dm">
              Engineering premium IT ecosystems with absolute precision. Your vision, our technical excellence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 hover:text-accent hover:bg-accent/5 flex items-center justify-center transition-all border border-slate-100 hover:border-accent/20"
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black font-syne mb-6 uppercase text-[10px] tracking-[0.2em] text-slate-400">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Projects', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-600 hover:text-accent text-sm font-medium transition-colors font-dm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black font-syne mb-6 uppercase text-[10px] tracking-[0.2em] text-slate-400">Contact Control</h4>
            <ul className="space-y-3">
              {settings.email && (
                <li className="flex items-center gap-3 text-slate-600 text-sm group cursor-pointer" onClick={() => window.location.href = `mailto:${settings.email}`}>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-accent group-hover:bg-accent/5 transition-colors border border-slate-100">
                    <Mail size={13} />
                  </div>
                  <span className="group-hover:text-accent transition-colors font-dm">{settings.email}</span>
                </li>
              )}
              {settings.phone && (
                <li className="flex items-center gap-3 text-slate-600 text-sm group cursor-pointer" onClick={() => window.location.href = `tel:${settings.phone}`}>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-accent group-hover:bg-accent/5 transition-colors border border-slate-100">
                    <Phone size={13} />
                  </div>
                  <span className="group-hover:text-accent transition-colors font-dm">{settings.phone}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-black font-syne mb-6 uppercase text-[10px] tracking-[0.2em] text-slate-400">HQ Presence</h4>
            <div className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                <MapPin size={13} />
              </div>
              <span className="font-dm">{settings.address || 'Global Operations / Remote Excellence'}</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-medium font-dm">
            &copy; {new Date().getFullYear()} WisdomCoreSolutions. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-accent text-[10px] font-black uppercase tracking-widest transition-colors font-dm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-accent text-[10px] font-black uppercase tracking-widest transition-colors font-dm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
