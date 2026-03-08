import React, { useState, useEffect } from 'react';
import { Music, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../translations';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar = ({ lang, setLang }: NavbarProps) => {
  const t = translations[lang].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.about, href: '#about' },
    { name: t.services, href: '#services' },
    { name: t.gallery, href: '#gallery' },
    { name: t.videos, href: '#videos' },
    { name: t.testimonials, href: '#testimonials' },
    { name: t.location, href: '#location' },
    { name: t.contact, href: '#contact' },
  ];

  const languages: { code: Language, name: string }[] = [
    { code: 'en', name: 'EN' },
    { code: 'rw', name: 'RW' },
    { code: 'fr', name: 'FR' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gold/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Music className="text-gold w-8 h-8" />
            <span className="text-xl font-bold tracking-tighter gold-text-gradient uppercase">DJ'S SERVICES</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-gold transition-colors duration-200 text-sm font-medium uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Language Switcher */}
              <div className="flex items-center gap-2 border-l border-white/10 pl-8">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`text-[10px] font-bold px-2 py-1 rounded transition-all ${lang === l.code ? 'bg-gold text-black' : 'text-white/40 hover:text-white'}`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>

              <a 
                href="#contact" 
                className="gold-gradient px-6 py-2 rounded-full text-black font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
              >
                {t.bookNow}
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`text-[10px] font-bold px-2 py-1 rounded transition-all ${lang === l.code ? 'bg-gold text-black' : 'text-white/40'}`}
                >
                  {l.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gold p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-gold/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gold block px-3 py-4 text-base font-medium uppercase tracking-widest border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 pb-2">
                <a 
                  href="#contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full gold-gradient block text-center py-4 rounded-xl text-black font-bold uppercase tracking-widest"
                >
                  {t.bookNow}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
