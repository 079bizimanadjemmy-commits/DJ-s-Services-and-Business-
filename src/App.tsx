import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Calendar, 
  Phone, 
  Instagram, 
  Facebook, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  Camera,
  Mic2,
  PartyPopper,
  Briefcase,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
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
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-gold transition-colors duration-200 text-sm font-medium uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="gold-gradient px-6 py-2 rounded-full text-black font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
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
          <span className="text-gold tracking-[0.5em] uppercase text-sm font-bold mb-4 block">Weddings • Ceremonies • Events</span>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-tight">
            DJ'S SERVICES <br />
            <span className="gold-text-gradient">& BUSINESS</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-10 font-light max-w-2xl mx-auto">
            Professional DJ for Weddings, Ceremonies and Elite Events. Creating unforgettable experiences through sound.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="gold-gradient px-10 py-4 rounded-full text-black font-bold text-lg uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
            >
              Book Now
            </a>
            <a 
              href="#contact" 
              className="border border-gold/50 px-10 py-4 rounded-full text-gold font-bold text-lg uppercase tracking-widest hover:bg-gold/10 transition-all"
            >
              Contact DJ
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

const About = () => {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold"></div>
            <img 
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop" 
              alt="DJ Performing" 
              className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              About <span className="gold-text-gradient">DJ'S SERVICES</span>
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                DJ'S SERVICES & BUSINESS is a professional DJ service provider known for creating unforgettable experiences at weddings, ceremonies, and special events.
              </p>
              <p>
                With professional sound equipment and excellent music selection, <span className="text-gold font-bold">DJ EMMY & DJ PETER</span> keep the dance floor alive and guests entertained throughout the night.
              </p>
              <p>
                We believe every event is unique. Our mission is to blend your personal style with our professional expertise to create a seamless, high-energy atmosphere that resonates with every guest.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-gold text-3xl font-bold">10+</h4>
                <p className="text-white/50 uppercase text-xs tracking-widest mt-1">Years Experience</p>
              </div>
              <div>
                <h4 className="text-gold text-3xl font-bold">500+</h4>
                <p className="text-white/50 uppercase text-xs tracking-widest mt-1">Events Completed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Wedding DJ",
      description: "Elegant music curation for your special day, from the first dance to the final party anthem.",
      icon: <Heart className="w-10 h-10 text-gold" />,
    },
    {
      title: "Ceremony DJ",
      description: "Perfectly timed audio and background music for a flawless and emotional ceremony experience.",
      icon: <Mic2 className="w-10 h-10 text-gold" />,
    },
    {
      title: "Birthday Parties",
      description: "High-energy sets tailored to your favorite genres to make your birthday celebration legendary.",
      icon: <PartyPopper className="w-10 h-10 text-gold" />,
    },
    {
      title: "Corporate Events",
      description: "Professional entertainment solutions for galas, product launches, and company celebrations.",
      icon: <Briefcase className="w-10 h-10 text-gold" />,
    },
    {
      title: "Private Parties",
      description: "Exclusive DJ services for intimate gatherings, anniversaries, and luxury home events.",
      icon: <Star className="w-10 h-10 text-gold" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="gold-text-gradient">Elite Services</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto">Tailored entertainment solutions designed to elevate your event to the next level of luxury.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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

const Gallery = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop", title: "DJ Performing" },
    { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop", title: "Dance Floor" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", title: "Wedding Celebration" },
    { src: "https://images.unsplash.com/photo-1514525253361-bee8718a340b?q=80&w=1974&auto=format&fit=crop", title: "DJ Equipment" },
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", title: "Event Lighting" },
    { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop", title: "Party Atmosphere" },
  ];

  return (
    <section id="gallery" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold">Event <span className="gold-text-gradient">Gallery</span></h2>
            <p className="text-white/50 mt-2">A glimpse into the unforgettable moments we've created.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-xl aspect-square"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <Camera className="text-gold w-8 h-8 mx-auto mb-2" />
                  <p className="text-white font-bold uppercase tracking-widest text-sm">{img.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your booking request! We will contact you shortly.');
    setFormData({ name: '', phone: '', date: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Get in <span className="gold-text-gradient">Touch</span></h2>
            <p className="text-white/60 mb-12 text-lg">
              Ready to make your event legendary? Contact us today to check availability and get a custom quote for your celebration.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-gold/10 p-4 rounded-full">
                  <Phone className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Phone & WhatsApp</h4>
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
                  <p className="text-white/50">@djemmybz</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-gold/10 p-4 rounded-full">
                  <Facebook className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Facebook</h4>
                  <p className="text-white/50">Emmy Bizimana</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black p-8 md:p-12 rounded-3xl border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.05)]"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Calendar className="text-gold" />
              Book Your Date
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/50 text-sm uppercase tracking-widest mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-sm uppercase tracking-widest mb-2">Phone</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/50 text-sm uppercase tracking-widest mb-2">Event Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/50 text-sm uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  placeholder="Tell us about your event..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full gold-gradient py-4 rounded-xl text-black font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Submit Booking Request
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Music className="text-gold w-6 h-6" />
          <span className="text-lg font-bold tracking-tighter gold-text-gradient uppercase">DJ'S SERVICES & BUSINESS</span>
        </div>
        <p className="text-white/40 text-sm mb-8">
          © {new Date().getFullYear()} DJ'S SERVICES & BUSINESS. All rights reserved. <br />
          Luxury Entertainment for Weddings and Elite Events.
        </p>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-white/40 hover:text-gold transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-white/40 hover:text-gold transition-colors"><Facebook size={20} /></a>
          <a href="#" className="text-white/40 hover:text-gold transition-colors"><MessageSquare size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
