import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  Calendar, 
  Phone, 
  Instagram, 
  Facebook, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronLeft,
  ChevronRight,
  Star,
  Camera,
  Mic2,
  PartyPopper,
  Briefcase,
  Heart,
  Send,
  Bot,
  Loader2,
  User,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { Language, translations } from './translations';

// --- AI Service ---
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// --- Components ---

const AIChatbot = ({ lang }: { lang: Language }) => {
  const t = translations[lang].ai;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: t.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      const response = await genAI.models.generateContent({
        model,
        contents: userMessage,
        config: {
          systemInstruction: `You are a professional AI assistant for 'DJ'S SERVICES & BUSINESS', a luxury DJ service for weddings and events. Your goal is to be helpful, elegant, and professional. You should answer questions about our services (Wedding DJ, Ceremony DJ, Birthday Parties, etc.), our DJs (DJ Emmy & DJ Peter), and encourage users to book via the contact form. Keep responses concise and high-end. If asked about pricing, suggest they contact us for a custom quote. Respond in the language of the user's query (English, Kinyarwanda, or French). Current website language is ${lang}.`,
        }
      });

      const botResponse = response.text || t.error;
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-black border border-gold/30 w-[350px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="gold-gradient p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-black">
                <Bot size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">{t.assistant}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-black hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold/20">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold text-black rounded-tr-none' 
                      : 'bg-zinc-900 text-white border border-white/5 rounded-tl-none'
                  }`}>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="w-4 h-4 text-gold animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-zinc-950">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.placeholder}
                  className="flex-1 bg-black border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:border-gold outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-gold text-black p-2 rounded-full hover:scale-110 transition-transform disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="gold-gradient p-4 rounded-full shadow-2xl relative group"
      >
        <div className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">AI</div>
        <Sparkles className="text-black group-hover:rotate-12 transition-transform" />
      </motion.button>
    </div>
  );
};

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
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
                  className="text-white block px-3 py-4 text-base font-medium border-b border-white/5 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <div className="px-3 py-6">
                <a 
                  href="#contact" 
                  onClick={() => setIsOpen(false)}
                  className="gold-gradient block w-full text-center py-4 rounded-xl text-black font-bold uppercase tracking-widest"
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


const Hero = ({ lang }: { lang: Language }) => {
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

const About = ({ lang }: { lang: Language }) => {
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

const Services = ({ lang }: { lang: Language }) => {
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

const Gallery = ({ lang }: { lang: Language }) => {
  const t = translations[lang].gallery;
  const images = [
    { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop", title: "DJ Performing" },
    { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop", title: "Dance Floor" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", title: "Wedding Celebration" },
    { src: "https://images.unsplash.com/photo-1514525253361-bee8718a340b?q=80&w=1974&auto=format&fit=crop", title: "DJ Equipment" },
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", title: "Event Lighting" },
    { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop", title: "Party Atmosphere" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold">
              {lang === 'en' ? (
                <>Event <span className="gold-text-gradient">Gallery</span></>
              ) : lang === 'rw' ? (
                <>Amafoto y' <span className="gold-text-gradient">ibirori</span></>
              ) : (
                <>Galerie d' <span className="gold-text-gradient">événements</span></>
              )}
            </h2>
            <p className="text-white/50 mt-2">{t.subtitle}</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => paginate(-1)}
              className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-black transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-black transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden group">
                <img 
                  src={images[currentIndex].src} 
                  alt={images[currentIndex].title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 md:p-12">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Camera className="text-gold w-5 h-5" />
                      <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Featured Moment</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-wider">{images[currentIndex].title}</h3>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails/Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === index ? 'w-8 bg-gold' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ lang }: { lang: Language }) => {
  const t = translations[lang].testimonials;

  return (
    <section id="testimonials" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {lang === 'en' ? (
              <>What Our <span className="gold-text-gradient">Clients Say</span></>
            ) : lang === 'rw' ? (
              <>Ibyo abakiriya <span className="gold-text-gradient">bacu bavuga</span></>
            ) : (
              <>Ce que disent <span className="gold-text-gradient">nos clients</span></>
            )}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-zinc-900/50 border border-gold/10 p-8 rounded-3xl relative group hover:border-gold/30 transition-all duration-500 flex flex-col h-full"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-white/80 italic mb-6 leading-relaxed">"{item.text}"</p>
              <div className="mt-auto">
                <h4 className="text-gold font-bold text-lg">{item.name}</h4>
                <p className="text-white/40 text-xs uppercase tracking-widest">{item.event}</p>
              </div>
              <div className="absolute top-8 right-8 text-gold/5 opacity-20 group-hover:opacity-40 transition-opacity">
                <MessageSquare size={64} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location = ({ lang }: { lang: Language }) => {
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

const Contact = ({ lang }: { lang: Language }) => {
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

  const handleSubmit = (type: 'whatsapp' | 'email') => {
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

    if (type === 'whatsapp') {
      const whatsappUrl = `https://wa.me/250798628085?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
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
                        <label className="block text-white/50 text-sm uppercase tracking-widest mb-2">{t.phone}</label>
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
                        className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                          touched.message && errors.message 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-white/10 focus:border-gold'
                        }`}
                        placeholder={t.messagePlaceholder}
                      ></textarea>
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
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => handleSubmit('whatsapp')}
                        className="flex items-center justify-center gap-2 bg-emerald-600 py-4 rounded-xl text-white font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MessageSquare size={20} />
                        {t.sendWhatsapp}
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleSubmit('email')}
                        className="flex items-center justify-center gap-2 gold-gradient py-4 rounded-xl text-black font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={20} />
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
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} className="text-gold" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 gold-text-gradient">{t.successTitle}</h3>
                  <p className="text-white/70 mb-8 max-w-md">
                    {t.successSubtitle}
                  </p>
                  
                  <div className="w-full bg-zinc-900/50 border border-gold/10 rounded-2xl p-6 mb-8 text-left">
                    <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4 border-b border-gold/10 pb-2">
                      {t.bookingSummary}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/40 text-sm">{t.name}</span>
                        <span className="text-white font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40 text-sm">{t.date}</span>
                        <span className="text-white font-medium">{formData.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gold/10 border border-gold/20 rounded-xl px-6 py-3 mb-8">
                    <p className="text-gold text-sm font-medium">
                      {t.estimatedResponse}
                    </p>
                  </div>

                  <button 
                    onClick={resetForm}
                    className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-widest font-bold"
                  >
                    <ArrowLeft size={16} />
                    {t.backToForm}
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

const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;
  return (
    <footer className="bg-black py-12 border-t border-white/5">
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
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen font-sans selection:bg-gold selection:text-black scroll-smooth"
    >
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Services lang={lang} />
      <Gallery lang={lang} />
      <Testimonials lang={lang} />
      <Location lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      <AIChatbot lang={lang} />
    </motion.div>
  );
}
