import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase } from 'lucide-react';
import { Language, translations } from '../translations';

interface LocationProps {
  lang: Language;
}

const Location = ({ lang }: LocationProps) => {
  const t = translations[lang].location;
  return (
    <section id="location" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.title.split('Headquarters')[0]} <span className="gold-text-gradient">Headquarters</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-zinc-900/50 border border-gold/20 p-8 rounded-3xl h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gold/10 p-3 rounded-full">
                  <MapPin className="text-gold w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{t.office}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gold font-bold text-sm uppercase tracking-widest mb-1">{t.address}</p>
                  <p className="text-white/70 leading-relaxed">
                    {t.addressLine1}<br />
                    {t.addressLine2}<br />
                    {t.addressLine3}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/5">
                  <p className="text-gold font-bold text-sm uppercase tracking-widest mb-1">{t.serviceArea}</p>
                  <p className="text-white/50 text-sm">
                    {t.serviceAreaDesc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gold/5 border border-gold/10 p-8 rounded-3xl h-full">
              <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                <Briefcase size={18} className="text-gold" />
                {t.businessHours}
              </h4>
              <div className="space-y-4 text-sm text-white/60">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span>{t.monFri}</span>
                  <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span>{t.sat}</span>
                  <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t.sun}</span>
                  <span className="text-gold font-bold">{t.eventBookings}</span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-gold/10 rounded-2xl border border-gold/20">
                <p className="text-gold text-[10px] uppercase font-bold tracking-widest text-center">
                  {t.appointments}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
