import React from 'react';
import { motion } from 'motion/react';
import { Music, Globe } from 'lucide-react';
import { Language } from '../translations';

interface LanguageSelectorProps {
  onSelect: (lang: Language) => void;
}

const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
  const languages: { code: Language; name: string; label: string }[] = [
    { code: 'en', name: 'English', label: 'Welcome' },
    { code: 'rw', name: 'Kinyarwanda', label: 'Murakaza neza' },
    { code: 'fr', name: 'Français', label: 'Bienvenue' },
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl px-6 text-center"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="mb-12 inline-flex items-center justify-center p-4 bg-gold/10 rounded-full border border-gold/20"
        >
          <Music className="text-gold w-12 h-12" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
          DJ'S SERVICES <span className="gold-text-gradient">& BUSINESS</span>
        </h1>
        
        <div className="flex items-center justify-center gap-2 text-white/40 mb-12 uppercase tracking-[0.3em] text-xs font-bold">
          <Globe size={14} />
          <span>Select your language • Hitamo ururimi • Choisissez votre langue</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.05, translateY: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(lang.code)}
              className="group relative bg-zinc-900/50 border border-white/10 p-8 rounded-3xl hover:border-gold/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <p className="text-gold font-bold text-xs uppercase tracking-widest mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  {lang.label}
                </p>
                <h3 className="text-2xl font-bold text-white group-hover:gold-text-gradient transition-all">
                  {lang.name}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-white/20 text-[10px] uppercase tracking-widest"
        >
          Professional Entertainment Solutions
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LanguageSelector;
