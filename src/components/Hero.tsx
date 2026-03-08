import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Language, translations } from '../translations';

interface HeroProps {
  lang: Language;
}

const Hero = ({ lang }: HeroProps) => {
  const t = translations[lang].hero;
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop" 
          alt="DJ Background" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gold/10 border border-gold/30 px-4 py-1 rounded-full flex items-center gap-2 backdrop-blur-sm">
              <Sparkles size={14} className="text-gold animate-pulse" />
              <span className="text-[10px] text-gold font-bold uppercase tracking-[0.2em]">{t.aiPowered}</span>
            </div>
          </div>
          <span className="text-gold tracking-[0.5em] uppercase text-sm font-bold mb-4 block">{t.subtitle}</span>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-tight">
            DJ'S SERVICES <br />
            <span className="gold-text-gradient">& BUSINESS</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-10 font-light max-w-2xl mx-auto">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="gold-gradient px-10 py-4 rounded-full text-black font-bold text-lg uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
            >
              {translations[lang].nav.bookNow}
            </a>
            <a 
              href="#contact" 
              className="border border-gold/50 px-10 py-4 rounded-full text-gold font-bold text-lg uppercase tracking-widest hover:bg-gold/10 transition-all"
            >
              {t.contactDJ}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
