import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from './translations';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import AdminDashboard from './components/AdminDashboard';
import LanguageSelector from './components/LanguageSelector';
import ConsultationCTA from './components/ConsultationCTA';

export default function App() {
  const [lang, setLang] = useState<Language | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_lang') as Language | null;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const handleOpenAdmin = () => setShowLogin(true);
    window.addEventListener('open-admin', handleOpenAdmin);
    return () => window.removeEventListener('open-admin', handleOpenAdmin);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        setShowLogin(false);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    }
  };

  const handleLanguageSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    localStorage.setItem('preferred_lang', selectedLang);
  };

  if (!lang) {
    return <LanguageSelector onSelect={handleLanguageSelect} />;
  }

  if (isAdmin) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar lang={lang} setLang={(l) => {
          setLang(l);
          localStorage.setItem('preferred_lang', l);
        }} />
        <AdminDashboard onLogout={() => setIsAdmin(false)} />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen font-sans selection:bg-gold selection:text-black scroll-smooth"
    >
      <Navbar lang={lang} setLang={(l) => {
        setLang(l);
        localStorage.setItem('preferred_lang', l);
      }} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Services lang={lang} />
      <Gallery lang={lang} />
      <Videos lang={lang} />
      <Testimonials lang={lang} />
      <ConsultationCTA lang={lang} />
      <Location lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      <AIChatbot lang={lang} />

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-zinc-900 border border-gold/30 p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="text-gold" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white">Admin Access</h2>
                <p className="text-white/40 text-sm mt-2">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {loginError && <p className="text-red-500 text-xs mt-2 text-center">{loginError}</p>}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 pr-12 text-sm focus:border-gold outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full gold-gradient py-4 rounded-xl text-black font-bold uppercase tracking-widest hover:scale-[1.02] transition-all">
                  Login
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
