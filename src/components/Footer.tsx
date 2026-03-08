import React from 'react';
import { Music, Instagram, Facebook, MessageSquare, Settings } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
}

const Footer = ({ lang }: FooterProps) => {
  const t = translations[lang].footer;
  return (
    <footer className="py-16 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Music className="text-gold w-6 h-6" />
          <span className="text-lg font-bold tracking-tighter gold-text-gradient uppercase">DJ'S SERVICES & BUSINESS</span>
        </div>
        <p className="text-white/40 text-sm mb-8">
          © {new Date().getFullYear()} DJ'S SERVICES & BUSINESS. {t.rights} <br />
          {t.designedBy}
        </p>
        <div className="flex justify-center gap-6">
          <a 
            href="https://www.instagram.com/djemmybz/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://www.facebook.com/emmy.bizimana.7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://wa.me/250798628085" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors"
          >
            <MessageSquare size={20} />
          </a>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-admin'))}
            className="text-white/10 hover:text-gold transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
