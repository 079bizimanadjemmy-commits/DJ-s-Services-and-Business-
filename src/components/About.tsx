import React from 'react';
import { motion } from 'motion/react';
import { Language, translations } from '../translations';

interface AboutProps {
  lang: Language;
}

const About = ({ lang }: AboutProps) => {
  const t = translations[lang].about;
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold"></div>
            <img 
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop" 
              alt="DJ Performing" 
              className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {t.title.split('DJ\'S SERVICES')[0]} <span className="gold-text-gradient">DJ'S SERVICES</span>
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-gold text-3xl font-bold">10+</h4>
                <p className="text-white/50 uppercase text-xs tracking-widest mt-1">{t.yearsExp}</p>
              </div>
              <div>
                <h4 className="text-gold text-3xl font-bold">500+</h4>
                <p className="text-white/50 uppercase text-xs tracking-widest mt-1">{t.eventsCompleted}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
