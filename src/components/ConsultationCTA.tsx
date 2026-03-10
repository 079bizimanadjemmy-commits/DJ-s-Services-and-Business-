import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { Language, translations } from '../translations';

interface ConsultationCTAProps {
  lang: Language;
}

const ConsultationCTA = ({ lang }: ConsultationCTAProps) => {
  const t = translations[lang].consultation;

  return (
    <section className="py-20 bg-gold/5 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-gold/10 rounded-full mb-6">
            <Calendar className="text-gold w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {t.title}
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block gold-gradient px-10 py-4 rounded-full text-black font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all"
          >
            {t.button}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
