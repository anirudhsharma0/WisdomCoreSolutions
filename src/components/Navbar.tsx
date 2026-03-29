import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Sparkles } from 'lucide-react';

const TAGLINE = "Your Success is Our Priority. We Build Intelligent Solutions and Stronger Client Relations.";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home',     href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact',  href: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* ── Announcement Banner ── */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-accent via-accent-secondary to-accent text-white py-2.5 px-6 flex items-center justify-center gap-3 text-center overflow-hidden">
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite] pointer-events-none" />

              <Sparkles size={13} className="shrink-0 opacity-80" />
              <p className="text-[11px] sm:text-xs font-semibold tracking-wide font-dm leading-snug">
                {TAGLINE}
              </p>
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white"
                aria-label="Dismiss"
              >
                <X size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Navbar ── */}
      <nav className={`transition-all duration-300 ${isScrolled ? 'py-4 glass-morphism' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
          >
            <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-accent shrink-0" />
            <span className="text-lg sm:text-xl font-bold font-syne tracking-tight whitespace-nowrap">
              WisdomCore<span className="text-accent">Solutions</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Services', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={item === 'Home' ? '/' : item === 'Contact' ? '/contact' : `/#${item.toLowerCase()}`}
                className="text-gray-800 hover:text-accent font-medium transition-colors font-dm"
              >
                {item}
              </a>
            ))}
            <a href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-accent to-accent-secondary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all font-syne"
              >
                Get Started
              </motion.button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-slate-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden glass-morphism border-t border-white/10 px-6 py-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-lg hover:text-accent font-dm"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
