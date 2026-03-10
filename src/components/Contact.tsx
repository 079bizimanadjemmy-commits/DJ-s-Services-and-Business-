import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Instagram, Facebook, Calendar, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { Language, translations } from '../translations';

interface ContactProps {
  lang: Language;
}

const Contact = ({ lang }: ContactProps) => {
  const t = translations[lang].contact;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    date: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    date: false,
    message: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = t.errors.nameRequired;
        else if (value.trim().length < 2) error = t.errors.nameMin;
        break;
      case 'phone':
        const phoneRegex = /^\+?[\d\s-]{8,}$/;
        if (!value.trim()) error = t.errors.phoneRequired;
        else if (!phoneRegex.test(value)) error = t.errors.phoneInvalid;
        break;
      case 'date':
        if (!value) error = t.errors.dateRequired;
        else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) error = t.errors.datePast;
        }
        break;
      case 'message':
        if (!value.trim()) error = t.errors.messageRequired;
        else if (value.trim().length < 10) error = t.errors.messageMin;
        break;
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (type: 'whatsapp' | 'email' | 'sms') => {
    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      date: validateField('date', formData.date),
      message: validateField('message', formData.message)
    };

    setErrors(newErrors);
    setTouched({ name: true, phone: true, date: true, message: true });

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    const message = `${t.bookingRequest}:
${t.name}: ${formData.name}
${t.phone}: ${formData.phone}
${t.date}: ${formData.date}
${t.message}: ${formData.message}`;

    // Save to database
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.error("Failed to save booking to DB", error);
    }

    if (type === 'whatsapp') {
      const whatsappUrl = `https://wa.me/250798628085?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else if (type === 'sms') {
      const smsUrl = `sms:+250798628085?body=${encodeURIComponent(message)}`;
      window.location.href = smsUrl;
    } else {
      const emailUrl = `mailto:079bizimanadjemmy@gmail.com?subject=${t.emailSubject}&body=${encodeURIComponent(message)}`;
      window.location.href = emailUrl;
    }

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', date: '', message: '' });
    setTouched({ name: false, phone: false, date: false, message: false });
    setErrors({ name: '', phone: '', date: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.title.split('Touch')[0]} <span className="gold-text-gradient">Touch</span></h2>
            <p className="text-white/60 mb-12 text-lg">
              {t.subtitle}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-gold/10 p-4 rounded-full">
                  <Phone className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{t.phoneWhatsapp}</h4>
                  <p className="text-white/50">+250 798 628 085</p>
                  <p className="text-white/50">+250 783 863 119</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-gold/10 p-4 rounded-full">
                  <Instagram className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Instagram</h4>
                  <a 
                    href="https://www.instagram.com/djemmybz/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-gold transition-colors"
                  >
                    @djemmybz
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-gold/10 p-4 rounded-full">
                  <Facebook className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Facebook</h4>
                  <a 
                    href="https://www.facebook.com/emmy.bizimana.7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-gold transition-colors"
                  >
                    Emmy Bizimana
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black p-8 md:p-12 rounded-3xl border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.05)] min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Calendar className="text-gold" />
                    {t.bookTitle}
                  </h3>
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/50 text-sm uppercase tracking-widest mb-2">{t.name}</label>
                        <input 
                          name="name"
                          type="text" 
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                            touched.name && errors.name 
                              ? 'border-red-500/50 focus:border-red-500' 
                              : 'border-white/10 focus:border-gold'
                          }`}
                          placeholder={t.namePlaceholder}
                        />
                        <AnimatePresence>
                          {touched.name && errors.name && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-red-500 text-xs mt-1 ml-1"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm uppercase tracking-widest mb-2">{t.phoneLabel}</label>
                        <input 
                          name="phone"
                          type="tel" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                            touched.phone && errors.phone 
                              ? 'border-red-500/50 focus:border-red-500' 
                              : 'border-white/10 focus:border-gold'
                          }`}
                          placeholder={t.phonePlaceholder}
                        />
                        <AnimatePresence>
                          {touched.phone && errors.phone && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-red-500 text-xs mt-1 ml-1"
                            >
                              {errors.phone}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm uppercase tracking-widest mb-2">{t.date}</label>
                      <input 
                        name="date"
                        type="date" 
                        value={formData.date}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                          touched.date && errors.date 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-white/10 focus:border-gold'
                        }`}
                      />
                      <AnimatePresence>
                        {touched.date && errors.date && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-xs mt-1 ml-1"
                          >
                            {errors.date}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm uppercase tracking-widest mb-2">{t.message}</label>
                      <textarea 
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all resize-none ${
                          touched.message && errors.message 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-white/10 focus:border-gold'
                        }`}
                        placeholder={t.messagePlaceholder}
                      />
                      <AnimatePresence>
                        {touched.message && errors.message && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-xs mt-1 ml-1"
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <button 
                        type="button" 
                        onClick={() => handleSubmit('whatsapp')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all uppercase tracking-widest text-[10px]"
                      >
                        <MessageSquare size={18} />
                        {t.sendWhatsapp}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleSubmit('sms')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all uppercase tracking-widest text-[10px]"
                      >
                        <Phone size={18} />
                        {t.sendSMS}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleSubmit('email')}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all uppercase tracking-widest text-[10px]"
                      >
                        <Send size={18} />
                        {t.sendEmail}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="bg-gold/10 p-6 rounded-full mb-8">
                    <CheckCircle2 size={80} className="text-gold" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{t.successTitle}</h3>
                  <p className="text-white/60 mb-8 max-w-md">
                    {t.successSubtitle}
                  </p>
                  <div className="bg-zinc-900/50 p-6 rounded-2xl border border-gold/20 w-full mb-8">
                    <p className="text-gold font-bold text-xs uppercase tracking-widest mb-4">{t.bookingSummary}</p>
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-white/40">{t.name}</span>
                        <span className="text-white font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-white/40">{t.phoneLabel}</span>
                        <span className="text-white font-medium">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-white/40">{t.date}</span>
                        <span className="text-white font-medium">{formData.date}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-white/40 block mb-1">{t.message}</span>
                        <span className="text-white italic text-xs line-clamp-2">"{formData.message}"</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gold/60 text-sm font-medium mb-8">
                    {t.estimatedResponse}
                  </p>
                  <button 
                    onClick={resetForm}
                    className="text-gold hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold"
                  >
                    ← {t.backToForm}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
