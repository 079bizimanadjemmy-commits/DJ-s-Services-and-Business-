import React from 'react';
import { motion } from 'motion/react';
import { Heart, Mic2, PartyPopper, Briefcase, Star } from 'lucide-react';
import { Language, translations } from '../translations';

interface ServicesProps {
  lang: Language;
}

const Services = ({ lang }: ServicesProps) => {
  const t = translations[lang].services;
  const services = [
    {
      title: t.wedding.title,
      description: t.wedding.desc,
      icon: <Heart className="w-10 h-10 text-gold" />,
    },
    {
      title: t.ceremony.title,
      description: t.ceremony.desc,
      icon: <Mic2 className="w-10 h-10 text-gold" />,
    },
    {
      title: t.birthday.title,
      description: t.birthday.desc,
      icon: <PartyPopper className="w-10 h-10 text-gold" />,
    },
    {
      title: t.corporate.title,
      description: t.corporate.desc,
      icon: <Briefcase className="w-10 h-10 text-gold" />,
    },
    {
      title: t.private.title,
      description: t.private.desc,
      icon: <Star className="w-10 h-10 text-gold" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.title.split('Elite Services')[0]} <span className="gold-text-gradient">Elite Services</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-black border border-white/5 p-8 rounded-2xl hover:border-gold/50 transition-all duration-500 group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-white/60 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
